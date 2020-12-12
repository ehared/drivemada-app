export class User {
    // User table
    id?: number;
    stripe_customer_id?: string;
    email: string;
    password: string;
    profile_picture?: Blob;
    is_caregiver?: boolean;
    register_date?: Date;
    avg_rating?: number;
    total_reviews?: number;
    verification_token?: string;
    is_verfied?: boolean;
    is_banned?: boolean;
    is_twofactor?: boolean;
    fingerprint?: string;

    // User info table
    firstName: string;
    lastName: string;
    birthDate: Date;
    phoneNumber: string;
    about?: string;

    // location date table
    addressLine1: string;
    addressLine2: string;
    area: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;

    constructor(){
        this.email = '';
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.birthDate = null;
        this.phoneNumber = '';
        this.addressLine1 = '';
        this.addressLine2 = '';
        this.city = '';
        this.area = '';
        this.postalCode = '';
        this.country = 'CA';

    }
   
}