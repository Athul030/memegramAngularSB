
import { createAction, props } from "@ngrx/store";
import { User, UserCred } from "../model/user";

export const BEGIN_REGISTER='[auth] begin register'
export const SHOW_ALERT ='[app] show alert'
export const EMPTY_ACTION = '[app] empty'
export const BEGIN_LOGIN = '[auth] begin login'
export const LOGIN_SUCCESS = '[auth] login success'

    export const setProfilePicture = createAction('[Profile Picture] Set',props<{imageUrl:string}>())

export const beginRegister=createAction(BEGIN_REGISTER,props<{userdata:User}>())
export const showalert=createAction(SHOW_ALERT,props<{message:string,resulttype:string}>())
export const emptyaction = createAction(EMPTY_ACTION)
export const beginLogin = createAction(BEGIN_LOGIN,props<{usercred:UserCred}>())
export const loginSuccess = createAction(LOGIN_SUCCESS)
