import { PostDTO, UserDTO } from "./user";

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