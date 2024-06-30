export interface EmployeeResponse {
    data: Employee[];
}

export interface Employee {
    id:              number;
    name:            string;
    pay_rate:        number;
    created_at:      string;
    payment_type:    PaymentType;
}

export interface PaymentType {
    id:         number;
    name:       string;
}


