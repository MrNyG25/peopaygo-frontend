export interface CustomerResponse {
    data: Customer[];
}

export interface Customer {
    id:         number;
    name:       string;
    user_id:    number;
    created_at: string;
    updated_at: string;
}
