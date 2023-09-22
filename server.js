const http = require("http");

/**
 * Logic for handling request is coded here
 * 
 * @param request: object contains request data
 * @param response: object contains response data
 */

const requestListener = (request, response) => {
    response.setHeader("Content-Type", "application/json");
    response.setHeader("X-Powered-By", "NodeJS");
    response.statusCode = 200;

    const { url, method } = request;

    if (url === "/") {
        if (method === "GET") {
            response.end("<h1>Ini adalah halaman homepage.</h1>");
        }
        else {
            response.statusCode = 400;
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request.</h1>`);
        }
    }
    else if (url === "/about") {
        if (method === "GET") {
            response.end("<h1>Halo! ini adalah halaman about.</h1>");
        }
        else if (method === "POST") {
            let body = [];

            request.on("data", (chunk) => {
                body.push(chunk);
            })

            request.on("end", () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(`<h1>Hai, ${name}! Ini adalah halaman about.</h1>`);
            })
        }
        else {
            response.statusCode = 400;
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request.</h1>`);
        }
    }
    else {
        response.statusCode = 418;
        response.end("<h1>Halaman tidak dapat ditemukan!</h1>");
    }
}

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})