export interface IAbsenceRequest{
    user_id?:string;
    absenceDate:string;
}
export interface IAbsenceFilterRequest{
    userId?: number,
    begin: string,
    end: string
}