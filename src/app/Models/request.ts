/**
 * Filename: request.ts
 * Purpose: Request class to generate a request object
 * Author: Eltire Hared
 * 
 */
export class Request {

    id?: Number;
    userId: Number;
    driverId?: Number;
    latitude: Number;
    longitude: Number;
    sourceAddress: string;
    destinationAddress: string;
    fare: Number;
    distance: Number;
    requestDate: any; // should be date ISO string
    completionDate?: any;

    constructor(){}
}