export interface IUser {
   
    _id ?: string
    name:string
    email:string
    password:string
}

export type IuserToken = Omit<IUser,'_id' | 'password' >

