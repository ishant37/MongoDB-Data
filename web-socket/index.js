import http from 'http';
import WebSocket,{WebSocketServer} from 'ws';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer((req, res) => {
    console.log((new Date()) + " Received request for " + req.url);
    res.end('Hello World');
});


const wss = new WebSocketServer({ server });
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    ws.on("message", function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    ws.send("Hello from server");
});

server.listen(process.env.PORT || 5000, () => {
    console.log((new Date()) + ` Server is listening on port ${process.env.PORT || 5000}`);
});