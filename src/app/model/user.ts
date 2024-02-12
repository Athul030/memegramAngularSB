
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

    roles?:Role[];
    
    
}




export interface Post {
    id?:number;
    title?:string;
    content: string;
    imageName?: string;
    imageUrl?: string;
    addedDate?: Date;
    category?:Category;
    user?:User;
  }

  export interface Category{
    id:number;
    categoryTitle:string,
    categoryDescription:string,
    Post:Post;
  }

export interface Role{
    id:number;
    name:string;
}

export interface UserCred{
    username:string;
    password:string;
}


export interface CustomToken{
    accessToken:string;
    username:string;
    refreshToken:string;
    user:User;
}


export interface JwtAuthResponse{
    accessToken:string;
    username:string;
    refreshToken:string;
    user:User;
}


export interface refershTokenForSending{
    refreshToken:string;
}

export interface AuthResponse {
    accessToken: string;
    username: string | null;
    user: {
      id: number;
      fullName: string;
      userHandle: string;
      email: string;
      password: string | null;
      bio: string | null;
      provider: string;
      roles: { id: number; name: string }[];
    };
    refreshToken: string | null;
  }
  

