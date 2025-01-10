import fs from 'fs';
import http2 from 'http2';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
}, (request, response) => {

    console.log(request.url);


    // response.writeHead(200, {'Content-Type': 'text/html'});
    // response.write('<h1>Here, this is your answer :)</h1>')
    // response.write(`<h1>The URL is: ${ request.url }</h1>`);
    // response.end();

    // const data = { name: 'John Doe', age: 30, city: 'Mexico City' };
    // response.writeHead(200, { 'Content-Type': 'application/json' });
    // response.end( JSON.stringify(data) );

    if (request.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(htmlFile);
        return;
    }

    if (request.url?.endsWith('.js')) {
        response.writeHead(200, { 'Content-Type': 'application/javascript' });

    } else if (request.url?.endsWith('.css')) {
        response.writeHead(200, { 'Content-Type': 'text/css' });
    }

    try {
        const responseContent = fs.readFileSync(`./public${request.url}`, 'utf8');
        response.end(responseContent);

    } catch (error) {

        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end();
    }


});

server.listen(8080, () => {
    console.log(`Server running on port 8080`);
});

