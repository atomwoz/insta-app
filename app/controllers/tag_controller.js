import { TAGS, putTag } from "../models/tags.js";
import { addTags, getTagsModel } from "../models/photo.js";
import logger from "node-color-log";

export function getRawTags(request, response) {
    try {
        response.statusCode = 200;  // OK
        response.headers = { "Content-Type": "text/csv" };
        response.end(TAGS.join("; "));
    } catch (error) {
        response.statusCode = 500;  // Internal Server Error
        response.end(JSON.stringify({ status: 'error', message: error.message }));
    }
}

export function getTags(request, response) {
    try {
        response.statusCode = 200;  // OK
        response.headers = { "Content-Type": "application/json" };
        response.end(JSON.stringify(TAGS));
    } catch (error) {
        response.statusCode = 500;  // Internal Server Error
        response.end(JSON.stringify({ status: 'error', message: error.message }));
    }
}

export function getFirstNTags(request, response, tags) {
    try {
        response.statusCode = 200;  // OK
        response.headers = { "Content-Type": "application/json" };
        response.end(JSON.stringify(TAGS.slice(0, tags) || TAGS));
    } catch (error) {
        response.statusCode = 500;  // Internal Server Error
        response.end(JSON.stringify({ status: 'error', message: error.message }));
    }
}

export function postTag(request, response, body) {
    try {
        const decoded = JSON.parse(body);
        putTag(decoded.tag);
        response.statusCode = 200;  // OK
        response.headers = { "Content-Type": "application/json" };
        response.end(JSON.stringify({ status: 'ok', message: 'Tag added' }));
    } catch (error) {
        response.statusCode = 500;  // Internal Server Error
        response.end(JSON.stringify({ status: 'error', message: error.message }));
    }
}

export function patchTag(request, response, photoId, body) {
    try {
        const decoded = JSON.parse(body);
        addTags(photoId, decoded.tags);
        response.statusCode = 200;  // OK
        response.headers = { "Content-Type": "application/json" };
        response.end(JSON.stringify({ status: 'ok', message: 'Tags added to photo', id: photoId }));
    } catch (error) {
        response.statusCode = 500;  // Internal Server Error
        response.end(JSON.stringify({ status: 'error', message: error.message }));
    }
}

export function getTagsForPhoto(request, response, photoId) {
    try {
        response.statusCode = 200;  // OK
        response.headers = { "Content-Type": "application/json" };
        response.end(JSON.stringify({ tags: getTagsModel(photoId) }));
    } catch (error) {
        response.statusCode = 500;  // Internal Server Error
        response.end(JSON.stringify({ status: 'error', message: error.message }));
    }
}