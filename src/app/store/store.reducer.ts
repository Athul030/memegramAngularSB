import { createReducer, on } from "@ngrx/store";
import * as StoreActions from './store.actions'

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
        }))
);