import formidable from 'formidable';
import fs from 'fs';
import pwd from './utils/dirname.js';
import logger from 'node-color-log';
import { addPhoto, listPhotos, editPhoto, removePhoto } from './models/photo.js';

export function postFile(req, res) {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            // Handle error
            res.statusCode = 500;
            res.end(JSON.stringify({ status: 'error', error: 'Failed to parse form data' }));
            return
        }

        // Access the uploaded file
        const file = files.file;
        const albumName = fields.album;
        // Save the file to a desired location
        const filePath = pwd() + "\\upload_bucket\\" + file.name;
        logger.color("blue").log("Saving file to: " + filePath);
        addPhoto(albumName, file.name);
        fs.rename(file.path, filePath, (err) => {
            if (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ status: 'error', error: 'Failed to save file' }));
                return
            }

            // File saved successfully
            res.statusCode = 200;
            res.end(JSON.stringify({ status: 'ok', message: 'File uploaded and saved' }));
            return
        });
        logger.color("yellow").log(listPhotos());
    });
}
export function getPhotos(req, res) {
    res.statusCode = 200;
    res.end(JSON.stringify(listPhotos()));
}
export function getPhoto(req, res) {
    const id = req.url.split("/").pop();
    const photo = getPhoto(id);
    if (photo) {
        res.statusCode = 200;
        res.end(JSON.stringify(photo));
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ status: 'error', message: 'Not found' }));
    }
}
export function deletePhoto(req, res) {
    const id = req.url.split("/").pop();
    const photo = getPhoto(id);
    if (photo) {
        removePhoto(id);
        res.statusCode = 200;
        res.end(JSON.stringify({ status: 'ok', message: `Photo with id ${id} deleted` }));
    }
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ status: 'error', message: 'Not found' }));
    }
}
