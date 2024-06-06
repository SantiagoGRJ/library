export interface IUser {
    id : string
    name : string
    email : string
    password : string
}

export type INotIdUser = Omit<IUser,'id'>