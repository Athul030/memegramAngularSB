import { User } from "../model/user";
import {EntityState, createEntityAdapter} from "@ngrx/entity"

export interface StoreState extends EntityState<User>{

    list:User[];
    errorMessage:string;
    userObj:User;
}

export const UserAdapter = createEntityAdapter<User>({
    selectId:(user: User) => user.email
})

export const intitalState:StoreState = UserAdapter.getInitialState({
    list:[],
    errorMessage:'',
    userObj:{
        fullName:'',
        email:'',
    userHandle:'',
    password:'',
    bio:'',
    phoneNumber:'',
    authorities:[
        {
            authority:''
        }
    ]
    }
    
}); 


//userPresence
export interface UserPresenceState{
    userIds:number[];
}

export const initialUserPrsesenceState: UserPresenceState={
    userIds:[],
}

