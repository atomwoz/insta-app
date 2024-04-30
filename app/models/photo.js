import { v4 as uuid } from 'uuid';

class Photo {
    constructor(id, album, originalName, lastChange, editHistory) {
        this.id = id;
        this.album = album;
        this.originalName = originalName;
        this.editHistory = editHistory;
        this.lastChange = lastChange;
    }
}
let photoes = [];
const addPhoto = (album, originalName) => {
    const photo = new Photo(uuid(), album, originalName, []);
    photoes.push(photo);
    return photo;
}
const removePhoto = (id) => {
    photoes = photoes.filter(photo => photo.id !== id);
}
const editPhoto = (id, editHistory) => {
    const photo = photoes.find(photo => photo.id === id);
    if (photo) {
        photo.album = album;
        photo.originalName = originalName;
        photo.editHistory.push(editHistory);
        photo.lastChange = photo.editHistory.sort((a, b) => a.timestamp - b.timestamp)[0];
        return photo;
    }

}
const getPhoto = (id) => {
    return photoes.find(photo => photo.id === id);
}
const listPhotos = () => {
    return photoes;
}
export { addPhoto, removePhoto, editPhoto, listPhotos, Photo, getPhoto };
