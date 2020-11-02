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
    phone_number: string;
    about?: string;

    // location date table
    address_line_1: string;
    address_line_2: string;
    area?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;

    constructor(){
        this.firstName = '';
        this.lastName = '';
        this.birthDate = null;
        this.phone_number = '';
        this.address_line_1 = '';
        this. address_line_2 = '';
        this.city = '';
        this.state = '';
        this.postal_code = '';
        this.country = '';

    }
   
}