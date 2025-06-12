import { openDB } from 'idb';

const DATABASE_NAME = 'artikel';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'artikel';

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade: (db) => {
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
    }
});

const database  = {
    async createArtikel(id, value) {
        (await dbPromise).put(OBJECT_STORE_NAME, value, id);
    },
    async deleteArtikel(id) {
        (await dbPromise).delete(OBJECT_STORE_NAME, id);
    },
    async findArtikel(id) {
        (await dbPromise).get(OBJECT_STORE_NAME, id);
    }
}

export default database;