import logger from 'node-color-log';
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
    const photo = new Photo(uuid(), album, originalName, "", []);
    photoes.push(photo);
    return photo.id;
}
const removePhoto = (id) => {
    photoes = photoes.filter(photo => photo.id !== id);
}
const editPhoto = (id, editHistory, album = undefined, originalName = undefined) => {
    const photo = photoes.find(photo => photo.id === id);
    if (photo) {
        if (album) photo.album = album;
        if (originalName) photo.originalName = originalName;
        logger.color("yellow").log(typeof photo.editHistory, photo.editHistory);
        photo.editHistory.push({ album, originalName, timestamp: new Date().getTime() });
        photo.lastChange = photo.editHistory[photo.editHistory.length - 1].timestamp;
        return photo;
    }

}
const getPhotoModel = (id) => {
    return photoes.find(photo => photo.id === id);
}
const listPhotos = () => {
    return photoes;
}
export { addPhoto, removePhoto, editPhoto, listPhotos, Photo, getPhotoModel };
