import { PostDTO, UserDTO } from "./user";

export interface FollowerFollowingCount{

    followerNumber:number;
    followingNumber:number;

}

export interface FollowerFollowingDetails{

    followerNumber:number;
    followingNumber:number;

    followerList:UserDTO[];
    followingList:UserDTO[];
}

export interface Like{
    likeId:number;
    postDTO:PostDTO;
    userDTO:UserDTO;
    likedDate:string;
}

//used for follow, unfollow and remove follow
export interface FollowRequestBody{
    followerId:number;
    followingId:number;
}