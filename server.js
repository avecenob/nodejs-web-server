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
            response.end(JSON.stringify({
                message: "Ini adalah homepage."
            }));
        }
        else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request.`
            }))
        }
    }
    else if (url === "/about") {
        if (method === "GET") {
            response.end(JSON.stringify({
                message: "Halo! Ini adalah halaman about."
            }))
        }
        else if (method === "POST") {
            let body = [];

            request.on("data", (chunk) => {
                body.push(chunk);
            })

            request.on("end", () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(JSON.stringify({
                    message: `Halo, ${name}! Ini adalah halaman about.`
                }))
            })
        }
        else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request.`
            }))
        }
    }
    else {
        response.statusCode = 418;
        response.end(JSON.stringify({
            message: "Halaman tidak ditemukan!"
        }))
    }
}

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})