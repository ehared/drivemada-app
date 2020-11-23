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

    constructor(private storage: Storage) {}

    /**
     * This method adds an item to the local storage
     * @param item - item to be added to local storage
     */
    add(item: Item): Promise<any>{
        return this.storage.get(STORAGE_KEY).then((items: Item[]) => {
            if(items){
                items.push(item);
                return this.storage.set(STORAGE_KEY, items);
            } else {
                return this.storage.set(STORAGE_KEY, [item]);
            }
        })
    }

    get(key: string){
        return this.storage.get(STORAGE_KEY).then( (items: Item[]) => {
           if(!items || items.length === 0){ // no items
                return null;
           } else{
                for(let i of items){
                    if(i.key === key){
                        return i;
                    }
                } 
           }
        })
    }

    getItems(): Promise<Item[]> {
        return this.storage.get(STORAGE_KEY);
    }

    update(item: Item): Promise<any> {
        return this.storage.get(STORAGE_KEY).then((items: Item[])=> {
            if(!items || items.length === 0){
                return null;
            }
            else{
                let newItems: Item[] = [];

                for(let i of items){
                    if(i.key === item.key){
                        newItems.push(item); // add new updated items
                    } else{
                        newItems.push(i); // add other items back to new array
                    }
                }
                return this.storage.set(STORAGE_KEY, newItems);
            }
        })
    }
    delete(item: Item): Promise<any>{
        return this.storage.get(STORAGE_KEY).then((items: Item[]) => {
            if(!items || items.length === 0){
                return null;
            } else {

                let newItems: Item[] = [];

                for(let i of items){
                    if(i.key !== item.key){
                        newItems.push(i);
                    }
                }
                return this.storage.set(STORAGE_KEY, newItems); 
            }
        })

    }
}