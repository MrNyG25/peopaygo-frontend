export interface CustomerResponse {
    data: Customer[];
}

export interface Customer {
    id:         number;
    name:       string;
    created_at: string;
}
