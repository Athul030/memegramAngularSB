
export interface User {
    id?:number;
    fullName:string;
    email:string;
    userHandle:string;
    password:string;
    bio:string;
    phoneNumber?:string;
    enabled?:boolean;
    accountNonExpired?:boolean;
    acccountNonLocked?:boolean;
    credentialsNonExpired?:boolean;
    
    deleted?:boolean

    authorities?:[
        {
            authority:string;
        }
    ]
    
    
}

export interface UserCred{
    username:string;
    password:string;
}


export interface CustomToken{
    token:string;
    username:string;
    user:User;
}