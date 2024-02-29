import { Like } from "./followDetails";
import { CommentDTO, LikeDTO } from "./likeComment";

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
    profilePicUrl?:string;
    blocked?:boolean;

    roles?:Role[];
    
    
}


export interface UserDTO {
  id?:number;
  fullName:string;
  email:string;
  userHandle:string;
  password:string;
  bio:string;
  provider?:string;
  phoneNumber?:string;
  enabled?:boolean;
  accountNonExpired?:boolean;
  acccountNonLocked?:boolean;
  credentialsNonExpired?:boolean;
  profilePicUrl?:string;
  isBlocked?:boolean;
  roles?:Role[];
  followers:FollowerDTO[];
  following:FollowingDTO[];
  blockedUsers:UserDTO[];
  blocked?:boolean;
  
}

export interface FollowerDTO {
  id: number;
  email: string;
  user: UserDTO;
  role: Role;
  isBlocked: boolean;
  

}

export interface FollowingDTO {
  id: number;
  email: string;
  user: UserDTO;
  role: Role;
  isBlocked: boolean;
 

}


export interface Post {
    postId?:number;
    title?:string;
    content: string;
    imageName?: string;
    imageUrl?: string;
    addedDate?: Date;
    category?:Category;
    user?:User;
    isDeleted?:boolean;
    likes?:LikeDTO[];
    lastComment?:CommentDTO;
  }

  export interface PostDTO {
    postId?:number;
    title?:string;
    content: string;
    imageName?: string;
    addedDate?: Date;
    category?:Category;
    imageUrl?: string;
    user?:UserDTO;
    isDeleted?:boolean;
    likes?:LikeDTO[];
    lastComment?: CommentDTO;

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
    user:UserDTO;
    refreshToken:string;
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

  export interface ChangeDPResponse {
    fileUrl: string;
  }

  export interface Page<T> {
    content: T[];          // Array of items on the current page
    totalElements: number;  // Total number of items across all pages
    totalPages: number;     // Total number of pages
    size: number;           // Number of items on the current page
    number: number;         // Current page number
    // Other pagination details if needed
  }
  

export interface UserBlockRequest{
  blockingUserId:number,
  blockedUserId:number
}