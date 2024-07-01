export interface PaymentPeriod {
    id:         number;
    note:       string;
    start_at:   Date;
    end_at:     Date;
    check_date: Date;
    created_at: Date;
}
