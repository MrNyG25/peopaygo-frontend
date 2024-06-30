export interface UserData {
    token: string;
    user:  User;
    role_name: string;
    user_id: number;
    
}

export interface User {
    id:         number;
    name:       string;
    email:      string;
    created_at: Date;
    updated_at: Date;
    role:       Role;
    customer: Customer | null
}

export interface Role {
    id:   number;
    name: string;
}

export interface Customer {
    id:         number;
    name:       string;
}