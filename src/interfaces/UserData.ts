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
}

export interface Role {
    id:   number;
    name: string;
}
