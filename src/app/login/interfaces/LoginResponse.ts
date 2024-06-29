export interface LoginResponse {
    data: Response;
}

export interface Response {
    token: string;
    user:  User;
}

interface User {
    id:         number;
    name:       string;
    email:      string;
    created_at: Date;
    updated_at: Date;
    role:       Role;
}

interface Role {
    id:   number;
    name: string;
}