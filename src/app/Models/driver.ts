export class Driver {
    userid : number;
    carMake: string;
    carModel: string;
    carColor: string;
    licensePlate: string;
    driversLicense: string;
    licensePhoto: Blob;
    isVerified: boolean;

    constructor  (id: number, cMake: string, cModel:string, cColor:string, licensePlate: string){
        this.userid = id;
        this.carMake = cMake;
        this.carModel = cModel;
        this.carColor = cColor;
        this.licensePlate = licensePlate;
    }
}