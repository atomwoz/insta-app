import sharp from 'sharp';
import dirname from '../utils/dirname.js';
import { editPhoto } from '../models/photo.js';

export async function patchFilter(request, response, id, body) {
    try {
        const { filterName, filterParams } = JSON.parse(body);
        const image = sharp(`${dirname()}/upload_bucket/${id}`);

        switch (filterName) {
            case 'greyscale':
                await image.greyscale().toFile(`${dirname()}/upload_bucket/${id}`);
                break;
            case 'blur':
                await image.blur(filterParams.intensity).toFile(`${dirname()}/upload_bucket/${id}`);
                break;
            case 'resize':
                await image.resize(filterParams.width, filterParams.height).toFile(`${dirname()}/upload_bucket/${id}`);
                break;
            case 'rotate':
                await image.rotate(filterParams.angle).toFile(`${dirname()}/upload_bucket/${id}`);
                break;
            case 'flip':
                await image.flip().toFile(`${dirname()}/upload_bucket/${id}`);
                break;
            case 'sepia':
                await image.sepia().toFile(`${dirname()}/upload_bucket/${id}`);
                break;
            case 'sharpen':
                await image.sharpen(filterParams.sigma).toFile(`${dirname()}/upload_bucket/${id}`);
                break;
            case 'brightness':
                await image.brightness(filterParams.level).toFile(`${dirname()}/upload_bucket/${id}`);
                break;
            // Add more cases for other filters
            default:
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ status: 'error', message: 'Invalid filter name' }));
                return;
        }
        editPhoto(id, { filter: filterName, params: filterParams });
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ status: 'ok', message: 'Filter applied successfully' }));

    } catch (error) {
        console.error(error);
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ status: 'error', message: 'An error occurred while applying the filter' }));
    }
}

export function getPhotoMetadata(request, response, id) {
    sharp(`${dirname()}/upload_bucket/${id}`)
        .metadata()
        .then(metadata => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(metadata));
        })
        .catch(error => {
            console.error(error);
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ status: 'error', message: 'An error occurred while fetching the photo metadata' }));
        });
}
