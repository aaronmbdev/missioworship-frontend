export interface IUser{
    id: number,
    name: string,
    email: string
}
export interface IUserRequest{
    name: string,
    email: string,
    roles: number[]
}
export interface IUserFilter{
    profilePicUrl: string,
    roles: string[],
    name: string,
    iss: string,
    exp: string,
    iat: string,
    email: string
}