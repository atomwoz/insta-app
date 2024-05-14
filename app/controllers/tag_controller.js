import { TAGS, putTag } from "../models/tags.js";
import { addTags, } from "../models/photo.js";

export function getRawTags(request, response) {
    response.statusCode = 200;  // OK
    response.headers = { "Content-Type": "text/csv" };
    response.end(TAGS.join("; "));
}

export function getTags(request, response) {
    response.statusCode = 200;  // OK
    response.headers = { "Content-Type": "application/json" };
    response.end(JSON.stringify(TAGS));
}

export function getFirstNTags(request, response, tags) {
    response.statusCode = 200;  // OK
    response.headers = { "Content-Type": "application/json" };
    response.end(JSON.stringify(TAGS.slice(0, tags) || TAGS));
}

export function postTag(request, response, body) {
    const decoded = JSON.parse(body);
    putTag(decoded.tag);
    response.statusCode = 200;  // OK
    response.headers = { "Content-Type": "application/json" };
    response.end(JSON.stringify({ status: 'ok', message: 'Tag added' }));
}

export function patchTag(request, response, photoId, body) {
    //Add tags from body to photo with photoId
    const decoded = JSON.parse(body);
    addTags(photoId, decoded.tags);
    response.statusCode = 200;  // OK
    response.headers = { "Content-Type": "application/json" };
    response.end(JSON.stringify({ status: 'ok', message: 'Tags added to photo', id: photoId }));
}