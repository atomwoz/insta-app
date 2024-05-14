import logger from "node-color-log";
import { getFirstNTags, getRawTags, getTags, postTag, patchTag } from "../controllers/tag_controller.js";
import { error_400, error_404 } from "../utils/router_utils.js";
import getRequestBody from "../utils/getBody.js";

const api_prefix = "/api/tags"

export default function (request, response) {
    if (request.method == "GET") {
        if (request.url.startsWith(api_prefix + "/raw")) {
            getRawTags(request, response);
        }
        else if (request.url == api_prefix) {
            getTags(request, response);
        }
        else if (request.url.startsWith(api_prefix + "/")) {
            const nTAGS = parseInt(request.url.split("/").pop());
            getFirstNTags(request, response, nTAGS);
        }
        else {
            error_404(response);
        }
    }
    else if (request.method == "POST") {
        if (request.url == api_prefix) {
            getRequestBody(request).then((body) => {
                postTag(request, response, body);
            });
        }
        else {
            error_404(response);
        }
    }
    else if (request.method == "PATCH") {
        if (request.url.startsWith(api_prefix + "/photo?id=")) {
            let url = new URL(request.url, `http://${request.headers.host}`);
            let id = url.searchParams.get("id");
            getRequestBody(request).then((body) => {
                patchTag(request, response, id, body);
            });

        }
        else {
            error_404(response);
        }
    }
    else {
        error_400(response);
    }
}