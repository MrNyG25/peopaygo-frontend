export interface TimesheetResponse {
    data: Timesheet
}

export interface Timesheet {
    id:                  number;
    amount:              null;
    note:                string;
    employee_id:         number;
    timesheet_status_id: number;
}
