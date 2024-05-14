import logger from 'node-color-log';
import { v4 as uuid } from 'uuid';

class Photo {
    constructor(id, album, originalName, lastChange, editHistory, tags = []) {
        this.id = id;
        this.album = album;
        this.originalName = originalName;
        this.editHistory = editHistory;
        this.lastChange = lastChange;
        this.tags = tags;
    }
}
let photoes = [];
const addPhoto = (album, originalName, tags = []) => {
    const photo = new Photo(uuid(), album, originalName, "", tags);
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

const addTags = (id, tags) => {
    const photo = photoes.find(photo => photo.id === id);
    if (photo) {
        photo.tags = photo.tags.concat(tags);
    }
    else {
        logger.color("red").log("Photo not found");

    }
}

const removeTags = (id, tags) => {
    const photo = photoes.find(photo => photo.id === id);
    if (photo) {
        photo.tags = photo.tags.filter(tag => !tags.includes(tag));
    }
}

const getTags = (id) => {
    const photo = photoes.find(photo => photo.id === id);
    if (photo) {
        return photo.tags;
    }
}

export { addPhoto, removePhoto, editPhoto, listPhotos, Photo, getPhotoModel, addTags, removeTags, getTags };
