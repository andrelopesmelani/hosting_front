export interface Users {
    id: number
    name: string
    email: string
    role: number
    created_at: Date | string;
    updated_at: Date | string
}

export interface Hosting {
    id: number;
    name: string;
    plan: string;
    price: string;
    description: string[];
    created_at: string;
    status: string;
}

export interface Domains {
    id: number;
    domain_name: string;
    status: string
    hosting_id: number;
    user_id: number;
    created_at: Date | string;
    updated_at: Date | string;
    expiration_date: Date| string;
}