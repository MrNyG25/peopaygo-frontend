export interface TimesheetsResponse {
    data: Timesheet[];
    timesheetsTotal: number;
}

export interface Timesheet {
    id:                  number;
    amount:              null | number;
    note:                string;
    total:               number;
    employee:            Employee;
    timesheet_status:    TimesheetStatus;
}

export interface Employee {
    id:                  number;
    name:                string;
    pay_rate:            number;
    timesheet_status_id: number;
}

export interface TimesheetStatus {
    id:         number;
    name:       string;
}
