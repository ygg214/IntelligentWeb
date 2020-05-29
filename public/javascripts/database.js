/** class User{
 *  constructor (userId, ratings) {
 *    this.userId= userId;
 *    this.ratings= ratings;
 *  }
 *}
 */

/** class Story{
 *  constructor (userId, storyId, text) {
 *    this.userId= userId;
 *    this.storyId= storyId;
 *    this.text= text;
 *
 *  }
 *}
 */

var dbPromise;

const DB_NAME= 'db_pwa_1';
const USER_STORE_NAME= 'store_user';
const STORY_STORE_NAME= 'store_user';

/**
 * it inits the database
 */
function initDatabase(){
    dbPromise = idb.openDb(DB_NAME, 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains(USER_STORE_NAME)) {
            var userDB = upgradeDb.createObjectStore(USER_STORE_NAME, {keyPath: 'userId', autoIncrement: true});
            userDB.createIndex('userId', 'userId', {unique: true});
            userDB.createIndex('ratings', 'ratings', {unique: false});

            var storyDB = upgradeDb.createObjectStore(STORY_STORE_NAME, {keyPath: 'storyId', autoIncrement: true});
            storyDB.createIndex('storyId', 'storyId', {unique: true});
            storyDB.createIndex('userId', 'userId', {unique: false});
            storyDB.createIndex('text', 'text', {unique: false});

        }
    });
}
/**
 * it saves the users
 * @param user
 * @param userObject
 */
function storeUserData(user, userObject) {
    console.log('inserting: '+JSON.stringify(userObject));
    if (dbPromise) {
        dbPromise.then(async db => {
            var tx = db.transaction(USER_STORE_NAME, 'readwrite');
            var store = tx.objectStore(USER_STORE_NAME);
            await store.put(userObject);
            return tx.complete;
        }).then(function () {
            console.log('added item to the store! '+ JSON.stringify(userObject));
        }).catch(function (error) {
            localStorage.setItem(user, JSON.stringify(userObject));
        });
    }
    else localStorage.setItem(user, JSON.stringify(userObject));
}

/**
 * it retrieves the forecasts data for a city from the database
 * @param user
 * @param date
 * @returns {*}
 */
function getUserData(userObject) {
    var obj;
    if (dbPromise) {
        dbPromise.then(function (db) {
            console.log('fetching: '+userObject+'from database');
            var tx = db.transaction(USER_STORE_NAME, 'readonly');
            var store = tx.objectStore(USER_STORE_NAME);
            var index = store.index('userId');
            return index.getAll(IDBKeyRange.only(userObject));
        }).then(function (itemsList) {
            if (itemsList && itemsList.length>0) {
                for (var i = 0; i < itemsList.length; i++) {
                    obj = {
                        userId: itemsList[i].userId,
                        ratings: itemsList[i].ratings,
                    };
                    var userIdList = JSON.parse(localStorage.getItem("userId"));
                    var userSet = new Set(userIdList);
                    userSet.delete(id);
                    var arr = Array.from(userSet);
                    localStorage.setItem("userId", JSON.stringify(arr))
                }
            }
        });
    }
}

/**
 * given the server data, it returns the value of the field ratings
 * @param dataR the data returned by the server
 * @returns {*}
 */
function getRatings(dataR) {
    if (dataR.ratings == null && dataR.ratings === undefined)
        return "unavailable";
    return dataR.ratings
}

/**
 * given the server data, it returns the value of the field userId
 * @param dataR the data returned by the server
 * @returns {*}
 */
function getUserId(dataR) {
    if (dataR.userId == null && dataR.userId === undefined)
        return "unavailable";
    else return dataR.userId;
}

/**
 * given the server data, it returns the value of the field text
 * @param dataR the data returned by the server
 * @returns {*}
 */
function getText(dataR) {
    if (dataR.text == null && dataR.tex === undefined)
        return "unavailable";
    else return dataR.text;
}