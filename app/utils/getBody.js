export default async (request, _) => {
    return new Promise((resolve, reject) => {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            resolve(body);
        }).on('error', (err) => {
            reject(err);
        });
    });
}