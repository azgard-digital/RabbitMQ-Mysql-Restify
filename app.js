const restify = require('restify');
var errors = require('restify-errors');
const corsMiddleware = require('restify-cors-middleware')
const crypto = require('crypto');
const path = require('path');

const EventsModel = require('./Events');
const queue = require('./queueFactory')();
const db = require('./dbFactory')();

require('child_process').fork(path.resolve('./','subprocess.js'));

const server = restify.createServer({
    formatters: {
        'text/html': function (req, res, body) {
            if (body instanceof Error) {
                return '<html><body>' + body.message + '</body></html>';
            }
        }
    }
});

const cors = corsMiddleware({
    origins: ['http://localhost:8080', 'http://127.0.0.1:8080'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(`<html><body><h1>Home page</h1></body></html>`);
    next();
});

server.post('/add', async (req, res, next) => {
    try {
        const data = req.body;
        const hash = crypto.createHash('md5').update(JSON.stringify(data.message)).digest("hex");
        const events = new EventsModel(db);
        let result = await events.exist(hash);

        if (Array.isArray(result) && result.length <= 0) {
            result = await events.add(data.event, hash, data.message);
            queue.publish(hash)
        }

        res.send({message: "success"})
        return next();
    } catch (e) {
        console.error(e)
        return next(new errors.InternalServerError());
    }
});

server.on('uncaughtException', function(req, res, route, err) {
    console.error(err);
});

server.listen(8080, '127.0.0.1', function() {
    console.info('%s listening at %s', server.name, server.url);
});