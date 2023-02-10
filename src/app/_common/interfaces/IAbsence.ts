export interface IAbsenceRequest{
    user_id?:string;
    absenceDate?:string;
}
export interface IAbsenceFilterRequest{
    startDate?: Date,
    endDate?: Date
}