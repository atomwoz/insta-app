import logger from "node-color-log";
import { postFile, getPhoto, getPhotos, deletePhoto } from "./fileController.js";

function error_404(response) {
    response.statusCode = 404;
    response.headers = { "Content-Type": "application/json" };
    response.end("{status: 'error', message: 'Not found'}");
}

function error_400(response) {
    response.statusCode = 400;
    response.headers = { "Content-Type": "application/json" };
    response.end("{status: 'error', message: 'Bad request'}");
}

function ok_200(response) {
    response.statusCode = 200;
    response.headers = { "Content-Type": "application/json" };
}

export default (request, response) => {
    if (request.method == "GET") {
        if (request.url.startsWith("/api/photos?album=")) {
            const url = new URL(request.url, `http://${request.headers.host}`);
            const album_name = url.searchParams.get("album");
            getPhotos(request, response, album_name);
        }
        else if (request.url.startsWith("/api/photos/")) {
            getPhoto(request, response);
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
    }
    else if (request.method == "PATCH") {
    }
    else if (request.method == "DELETE") {
    }
    else {
        error_400(response)
    }

}