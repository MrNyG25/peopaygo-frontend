export interface EmployeeResponse {
    data: Employee[];
}

export interface Employee {
    id:              number;
    name:            string;
    pay_rate:        number;
    payment_type_id: number;
    customer_id:     number;
    created_at:      string;
    updated_at:      string;
}


