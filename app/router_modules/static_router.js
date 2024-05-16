import logger from "node-color-log";
import dirname from "../utils/dirname.js";
import fs from "fs";
import exif from "exif";
import Exif from "exif";

export default (request, response) => {
    const endpoint = '/static/';
    const filePath = request.url.slice(endpoint.length); // Remove the leading endpoint from the URL
    logger.color('blue').log(`GET ${endpoint}${filePath}`);
    const staticPath = dirname() + `/upload_bucket/${filePath}`;

    // Check if the file exists
    if (fs.existsSync(staticPath)) {
        // Read the file and send it as the response
        fs.readFile(staticPath, (err, data) => {
            if (err) {
                response.statusCode = 500;
                response.end('Internal Server Error');
            } else {
                // Get the file type using exif

                //TODO::
                Exif(staticPath, (err, exifData) => {
                    logger.color('blue').log(`Serving file: ${exifData.mime}`);
                    response.statusCode = 200;
                    response.setHeader('Content-Type', exifData.mime);
                    response.end(data);
                });

            }
        });
    } else {
        response.statusCode = 404;
        response.end('File Not Found');
    }
}
