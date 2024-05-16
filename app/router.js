import logger from "node-color-log";
import { postFile, getPhoto, getPhotos, deletePhoto, putPhoto } from "./controllers/file_controller.js";
import { error_404, error_400 } from "./utils/router_utils.js";
import tag_router from "./router_modules/tag_router.js";
import filter_router from "./router_modules/filter_router.js";
import static_router from "./router_modules/static_router.js";

export default (request, response) => {
    if (request.url.startsWith('/api/tags')) {
        tag_router(request, response);
    }
    else if (request.url.startsWith('/api/filter')) {
        filter_router(request, response);
    }
    else if (request.url.startsWith('/static')) {
        static_router(request, response)
    }
    else if (request.method == "GET") {
        if (request.url.startsWith("/api/photos?album=")) {
            const url = new URL(request.url, `http://${request.headers.host}`);
            const album_name = url.searchParams.get("album");
            getPhotos(request, response, album_name);
        }
        else if (request.url.startsWith("/api/photo?id=")) {
            const url = new URL(request.url, `http://${request.headers.host}`);
            const id = url.searchParams.get("id");
            logger.color("blue").log(`GET /api/photo?id=${id}`);
            getPhoto(request, response, id);
        }
        else {
            error_404(response)
        }
    }
    else if (request.method == "POST") {
        switch (request.url) {
            case "/api/photos": +
                logger.color("blue").log("POST /api/photos");
                postFile(request, response);
                break;
            default:
                error_404(response)
        }
    }
    else if (request.method == "PUT") {
        if (request.url.startsWith("/api/photo?id=")) {
            const url = new URL(request.url, `http://${request.headers.host}`);
            const id = url.searchParams.get("id");
            logger.color("blue").log(`PUT /api/photo?id=${id}`);
            putPhoto(request, response, id);
        }
        else {
            error_404(response)
        }
    }
    else if (request.method == "DELETE") {
        if (request.url.startsWith("/api/photo?id=")) {
            const url = new URL(request.url, `http://${request.headers.host}`);
            const id = url.searchParams.get("id");
            logger.color("blue").log(`DELETE /api/photo?id=${id}`);
            deletePhoto(request, response, id);
        }
        else {
            error_404(response)
        }
    }




}