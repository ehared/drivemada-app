/**
 * Filename: storage.service.ts
 * Purpose: Handles addings, retrieving, and removing items from local storage
 * Author: Eltire Hared
 */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
    key: string,
    value: string
}

const STORAGE_KEY = "my-storage";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: Storage) { }

    /**
     * This method adds an item to the local storage
     * @param item - item to be added to local storage
     */
    add(item: Item): Promise<any> {
        return this.storage.get(STORAGE_KEY).then((items: Item[]) => {
            if (items) {
                items.push(item);
                return this.storage.set(STORAGE_KEY, items);
            } else {
                return this.storage.set(STORAGE_KEY, [item]);
            }
        })
    }

    /**
     * Retrieves item(s) from local storage with the 'STORAGE_KEY' key
     * @param key - key to be used
     */
    get(key: string) {
        return this.storage.get(STORAGE_KEY).then((items: Item[]) => {
            if (!items || items.length === 0) { // no items
                return null;
            } else {
                for (let i of items) {
                    if (i.key === key) {
                        return i;
                    }
                }
            }
        })
    }
    /**
     *  Returns list of items from storage.
     */
    getItems(): Promise<Item[]> {
        return this.storage.get(STORAGE_KEY);
    }

    /**
     * Updates the item stored in storage
     * @param item - item to be updated
     */
    update(item: Item): Promise<any> {
        return this.storage.get(STORAGE_KEY).then((items: Item[]) => {
            if (!items || items.length === 0) {
                return null;
            }
            else {
                let newItems: Item[] = [];

                for (let i of items) {
                    if (i.key === item.key) {
                        newItems.push(item); // add new updated items
                    } else {
                        newItems.push(i); // add other items back to new array
                    }
                }
                return this.storage.set(STORAGE_KEY, newItems);
            }
        })
    }
    /**
     * Deletes the item from storage
     * @param item  - item to be deleted
     */
    delete(item: Item): Promise<any> {
        return this.storage.get(STORAGE_KEY).then((items: Item[]) => {
            if (!items || items.length === 0) {
                return null;
            } else {

                let newItems: Item[] = [];

                for (let i of items) {
                    if (i.key !== item.key) {
                        newItems.push(i);
                    }
                }
                return this.storage.set(STORAGE_KEY, newItems);
            }
        })

    }
    /**
     * Deletes the item with the matching key from storage
     * @param key - key of the item being deleted
     */
    async deleteKey(key: string): Promise<void> {
        return this.storage.remove(key);
    }
    /**
     *  Stores the key value pair in storage
     * @param key  
     * @param value 
     */
    setKey(key: string, value: any): Promise<any> {
        return this.storage.set(key, value);
    }
    /**
     *  Retrieves the value of the item with the matching key from storage
     * @param key - key
     */
    getValue(key: string): Promise<any> {
        return this.storage.get(key);
    }
}