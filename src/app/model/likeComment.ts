import { PostDTO, User, UserDTO } from "./user";

export interface LikeRequestBody{
    userIdOfPersonLiking : number;
    postId : number;
}


export interface LikeResponse{
    likeCount : number;
    likeDTO : LikeDTO;
}


export interface LikeDTO{
    likeId : number;
    postDTO : PostDTO;
    userDTO: UserDTO;
    likedDate: string;
}

export interface AddCommentRequest{
    postId:number;
    userId:number;
    commentText:string;
}

export interface CommentDTO{
    commentId:number;
    commentText:string;
    commentedDate:string;
    user:UserDTO;
    post:PostDTO;
}

export interface ApiResponseCustom{
    message:string,
    httpStatus:string;
}