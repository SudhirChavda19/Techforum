import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface ImageDB extends DBSchema {
  images: {
    key: number;
    value: { imageData: ArrayBuffer };
  };
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  public userid: any = localStorage.getItem('userId');
  private dbPromise: Promise<IDBPDatabase<ImageDB>>;
  constructor() { 
    this.initDB(); 
  }

  private async initDB() {
    this.dbPromise = openDB<ImageDB>('UserProfilePic', 1, {
      upgrade(db) {
        const store = db.createObjectStore('images', { keyPath: 'id' });
      },
    });
  }

  async addImage(imageData: ArrayBuffer) {
    const db = await this.dbPromise;
    const tx = db.transaction('images', 'readwrite');
    const store = tx.objectStore('images');
    const id = await store.put({ id: this.userid, imageData } as { id: any, imageData: ArrayBuffer });
    await tx.done;
    return id;
  }

  async getImage(id: number) {
    const db = await this.dbPromise;
    const tx = db.transaction('images', 'readonly');
    const store = tx.objectStore('images');
    const imageData = await store.get(id);
    await tx.done;
    return imageData;
  }
}
