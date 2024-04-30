function postPhoto(req, res) {
    const formData = new FormData();
    formData.append("file", req.body.photo);
}