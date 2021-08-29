const MongoClient = require('mongodb').MongoClient;
const config = require('../config/default');
const {
    connect
} = require('mongodb');

const dbConfig = config.MongoClient;
const dbURL = dbConfig.dbURL;
const dbName = dbConfig.dbName;
const dbMember = dbConfig.dbCollection.members;
const db_ars = dbConfig.dbCollection.db_ars;


async function findDataMembers(username) {
    const db = await connectDB();
    const res = await findDB(db, username);
    return res;
}

async function UpdateMembers(username, setData) {
    const db = await connectDB();
    const res = await updateDB(db, username, setData);
    return res;
}
async function SaveDataMembers(username, shortcode, tweet, media, media_contents) {
    try {
        let res = "";
        let db = await connectDB();
        let docs = await findShortCode(db, shortcode);
        if (docs.length <= 0) {
            //No Data Yet
            console.log("No Data on DB Yet");
            res = await insertDB(db, username, shortcode, tweet, media, media_contents);
            return res;
        } else {
            //Data Exist then update
            console.log("Data Exist");
            var setData = {
                "tweet": tweet,
                "media": media,
                "media_contents": media_contents
            }
            res = await updateShortCodeDB(db, shortcode, setData)
            return res;
        }
    } catch (e) {
        return e.message;
    }



}

async function FindShortCodeFromDB(shortcode) {
    let db = await connectDB();
    let res = await findShortCode(db, shortcode);
    return res;
}
const connectDB = async () => {
    try {
        const client = await MongoClient.connect(dbURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        const db = client.db(dbName);
        return db;
    } catch (e) {
        // return [e, null];
        throw new Error(e);
    }
}

const findDB = (db, username) => {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.collection(dbMember);
            collection.find({
                'username': username
            }).toArray(function (err, docs) {
                if (err) reject(err);
                else resolve(docs);
            });
        } catch (e) {
            reject(e);
        }
    })
}

const findShortCode = (db, shortcode) => {
    return new Promise((resolve, reject) => {
        try {
            console.log(db_ars);
            db.collection(db_ars).find({
                shortcode: shortcode
            }).toArray(function (err, docs) {
                if (err) reject(err);
                else {
                    resolve(docs);
                }
            });

        } catch (e) {
            reject(e);
        }
    })
}
const updateDB = (db, username, setData) => {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.collection(dbMember);
            collection.updateOne({
                    username: username
                }, {
                    $set: setData
                },
                function (err, result) {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        } catch (e) {
            reject(e);
        }
    })
}

const updateShortCodeDB = (db, shortcode, setData) => {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.collection(db_ars);
            collection.updateOne({
                    shortcode: shortcode
                }, {
                    $set: setData
                },
                function (err, result) {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        } catch (e) {
            reject(e);
        }
    })
}
const insertDB = (db, username, shortcode, tweet, media, media_contents) => {
    return new Promise((resolve, reject) => {
        try {
            const collection = db.collection(db_ars);
            collection.insertOne({
                "username": username,
                "shortcode": shortcode,
                "active": "yes",
                "tweet": tweet,
                "media": media,
                "media_contents": media_contents
            }, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else resolve(result);

            });
        } catch (e) {
            console.log(e);
            reject(e);
        }

    });

};

module.exports = {
    findDataMembers,
    UpdateMembers,
    SaveDataMembers,
    FindShortCodeFromDB
}