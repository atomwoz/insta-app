export function error_404(response) {
    response.statusCode = 404;
    response.headers = { "Content-Type": "application/json" };
    response.end("{status: 'error', message: 'Not found'}");
}

export function error_400(response) {
    response.statusCode = 400;
    response.headers = { "Content-Type": "application/json" };
    response.end("{status: 'error', message: 'Bad request'}");
}

export function ok_200(response) {
    response.statusCode = 200;
    response.headers = { "Content-Type": "application/json" };
}
