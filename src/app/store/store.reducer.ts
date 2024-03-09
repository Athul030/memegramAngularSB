import { createReducer, on } from "@ngrx/store";
import * as StoreActions from './store.actions'
import { initialUserPrsesenceState } from "./store.state";

export interface DpState{
    imageUrl: string | null;
}

export const initialState:DpState ={
    imageUrl:null,
};

export const dpReducer = createReducer(
    initialState,
    on(
        StoreActions.setProfilePicture,(state,{imageUrl})=>({
            ...state,
            imageUrl
        })
        ),
    on(
        StoreActions.resetProfilePicture,()=> initialState
    )
);

// export const userPresenceReducer = createReducer(
//     initialUserPrsesenceState,
//     on(StoreActions.addUserToPresence,(state,{userId}) => ({...state,userIds:[...state.userIds,userId]})),
//     on(StoreActions.removeUserFromPresence,(state,{userId})=>({...state,userIds:state.userIds.filter(id=>id !== userId)}))
//     );
