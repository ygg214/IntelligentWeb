var dbPromise;

const DB_NAME= 'db_pwa_1';
const USER_STORE_NAME= 'user';
const STORY_STORE_NAME= 'story';
const RATING_STORE_NAME= 'rating';

/**
 * it inits the database
 */
function initDatabase(){
    dbPromise = idb.openDb(DB_NAME, 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains(USER_STORE_NAME)) {
            var userDB = upgradeDb.createObjectStore(USER_STORE_NAME, {keyPath: 'userId', autoIncrement: true});
        }
        if (!upgradeDb.objectStoreNames.contains(STORY_STORE_NAME)) {
            var storyDB = upgradeDb.createObjectStore(STORY_STORE_NAME, {keyPath: 'storyId', autoIncrement: true});
            storyDB.createIndex('userId', 'userId', {unique: false});
            storyDB.createIndex('text', 'text', {unique: false});
            storyDB.createIndex('picture','picture', {unique: false})
        }
        if (!upgradeDb.objectStoreNames.contains(RATING_STORE_NAME)) {
            var ratingDB = upgradeDb.createObjectStore(STORY_STORE_NAME, {keyPath: 'ratingId', autoIncrement: true});
            ratingDB.createIndex('userId ', 'userId', {unique: false});
            ratingDB.createIndex('rating','rating', {unique: false})
        }
    });
}
// /**
//  * it saves the users
//  * @param user
//  * @param userObject
//  */
// function storeCatchedData(user, userObject) {
//     console.log('inserting: '+JSON.stringify(userObject));
//     if (dbPromise) {
//         dbPromise.then(async db => {
//             var tx = db.transaction(USER_STORE_NAME, 'readwrite');
//             var store = tx.objectStore(USER_STORE_NAME);
//             await store.put(userObject);
//             return tx.complete;
//         }).then(function () {
//             console.log('added item to the store! '+ JSON.stringify(userObject));
//         }).catch(function (error) {
//             localStorage.setItem(user, JSON.stringify(userObject));
//         });
//     }
//     else localStorage.setItem(user, JSON.stringify(userObject));
// }
/**
 * it saves the rating
 * @param user
 * @param rating
 */
function addRating(userId, rating) {
    if (dbPromise) {
        dbPromise.then(async db => {
            var tx = db.transaction(RATING_STORE_NAME, 'readwrite');
            var store = tx.objectStore(RATING_STORE_NAME);
            await store.add({userId:userId,rating:rating});
            return tx.complete;
        }).then(function () {
            console.log('add a new rating to the store! ');
        }).catch(function (error) {
            // localStorage.setItem(user, JSON.stringify(userObject));
        });
    }
    // else localStorage.setItem(user, JSON.stringify(userObject));
}

/**
 * it saves new story
 * @param userId
 * @param text
 * @param picture
 */
function addStory(userId, text, picture) {
    if (dbPromise) {
        dbPromise.then(async db => {
            var tx = db.transaction(STORY_STORE_NAME, 'readwrite');
            var store = tx.objectStore(STORY_STORE_NAME);
            await store.add({userId:userId, text:text, picture:picture});
            return tx.complete;
        }).then(function () {
            console.log('add a new story to the store! ');
        }).catch(function (error) {
            // localStorage.setItem(user, JSON.stringify(userObject));
        });
    }
    // else localStorage.setItem(user, JSON.stringify(userObject));
}

/**
 * it find all story
 * @param userId
 * @param text
 * @param picture
 */
function readAllStory() {
    if (dbPromise) {
        dbPromise.then(async db => {
            var tx = db.transaction(STORY_STORE_NAME, 'readonly');
            var store = tx.objectStore(STORY_STORE_NAME);
            store.openCursor().onsuccess = function (event){
                var flag = 0;
                var itemJson;
                var storeJson = '"story":[';
                var cursor = event.target.result;

                if (cursor) {
                    if(flag++ < 1){
                        itemJson='{';
                    } else {
                        itemJson=',{';
                    }
                    itemJson+='"storyId":' + cursor.key + ',';
                    itemJson+='"userId":' + cursor.value.userId + ',';
                    itemJson+='"text":"' + cursor.value.text + '",';
                    itemJson+='"picture":"' + cursor.value.picture + '"}';
                    storeJson+=itemJson;
                    cursor.continue();
                } else {
                    console.log('no more stories');
                }
                storeJson+=']';
                //return storeJson
                console.log(storeJson);
            }
            return tx.complete;
        }).then(function () {
            console.log('find all stories and return json of stories ');
        }).catch(function (error) {
            // localStorage.setItem(user, JSON.stringify(userObject));
        });
    }
}

function readAllStoryByUserId(userId) {
    if (dbPromise) {
        dbPromise.then(async db => {
            var tx = db.transaction(STORY_STORE_NAME, 'readonly');
            var store = tx.objectStore(STORY_STORE_NAME);
            store.openCursor().onsuccess = function (event){
                var storeJson = '"story":[';
                var itemJson = '';
                var flag = 0;
                var cursor = event.target.result;

                if (cursor && cursor.value.userId==userId) {
                    if(flag++ < 1) {
                        itemJson='{';
                    } else {
                        itemJson=',{';
                    }
                    itemJson+='"storyId":' + cursor.key + ',';
                    itemJson+='"userId":' + cursor.value.userId + ',';
                    itemJson+='"text":"' + cursor.value.text + '",';
                    itemJson+='"picture":"' + cursor.value.picture + '"}';
                    storeJson+=itemJson;
                    cursor.continue();
                } else {
                    console.log('no more stories');
                }
                storeJson+=']';
                //return storeJson
                console.log(storeJson);
            }
            return tx.complete;
        }).then(function () {
            console.log('find all stories and return json of stories ');
        }).catch(function (error) {
            // localStorage.setItem(user, JSON.stringify(userObject));
        });
    }
}




/**
 * given the server data, it returns the value of the field ratings
 * @param dataR the data returned by the server
 * @returns {*}
 */
function getRating(dataR) {
    if (dataR.rating == null && dataR.rating === undefined)
        return "unavailable";
    return dataR.rating
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
 * given the server data, it returns the value of the field storyId
 * @param dataR the data returned by the server
 * @returns {*}
 */
function getStoryId(dataR) {
    if (dataR.storyId == null && dataR.storyId === undefined)
        return "unavailable";
    else return dataR.text;
}

/**
 * given the server data, it returns the value of the field text
 * @param dataR the data returned by the server
 * @returns {*}
 */
function gettext(dataR) {
    if (dataR.text == null && dataR.text === undefined)
        return "unavailable";
    else return dataR.text;
}

/**
 * given the server data, it returns the value of the field picture
 * @param dataR the data returned by the server
 * @returns {*}
 */
function getpicture(dataR) {
    if (dataR.picture == null && dataR.picture === undefined)
        return "unavailable";
    else return dataR.text;
}