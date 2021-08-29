var store = require('json-fs-store')('../public/media');


function StoreData(backupData) {
    return new Promise((resolve, reject) => {
        store.add(backupData, function (err) {
            if (err) reject(err);
            else resolve(true);
        })
    })
}

function LoadData(fileName) {
    return new Promise((resolve, reject) => {
        store.load(fileName, function (err, object) {
            if (err) reject(err);
            else resolve(object);
        })
    })
}

function RemoveData(fileName) {
    return new Promise((resolve, reject) => {
        store.remove(fileName, function (err) {
            if (err) reject(err);
            else resolve(true);
        })
    })
}

module.exports = {
    StoreData,
    LoadData,
    RemoveData
}