export class Vehicle {
    id?: number;
    make: string;
    model: string;
    colour: string;
    year?: number;
    licensePlate: string;
    userId: number;

    constructor() {

        this.make = '';
        this.model = '';
        this.colour = '';
        this.licensePlate = '';
    }
}