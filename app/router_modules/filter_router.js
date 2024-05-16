import logger from "node-color-log";
import { patchFilter, getPhotoMetadata } from "../controllers/filter_controller.js";
import { error_400, error_404 } from "../utils/router_utils.js";
import getRequestBody from "../utils/getBody.js";

const api_prefix = "/api/filter"

export default function (request, response) {
    if (request.method == "GET") {
        if (request.url.startsWith(api_prefix + "/photo_metadata?id=")) {
            let url = new URL(request.url, `http://${request.headers.host}`);
            let id = url.searchParams.get("id");
            getPhotoMetadata(request, response, id);
        }
        else {
            error_404(response);
        }
    }
    else if (request.method == "PATCH") {
        if (request.url.startsWith(api_prefix + "?id=")) {
            let url = new URL(request.url, `http://${request.headers.host}`);
            let id = url.searchParams.get("id");
            getRequestBody(request).then((body) => {
                patchFilter(request, response, id, body);
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