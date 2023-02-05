export interface TokenResponse {
    email: string,
    exp: number,
    iat: number,
    iss: string,
    name: string,
    profilePicUrl: string,
    roles: string[]
  }
  export interface TokenGoogle {
    credential: string,
    select_by: string
  }