import { ActionType } from '../action-types'

interface LoginUserBegin {
  type: ActionType.LOGIN_USER_BEGIN
}

interface LoginUserSuccess {
  type: ActionType.LOGIN_USER_SUCCESS
  payload: {
    user: []
    token: string
    msg: string
  }
}
interface LoginUserError {
  type: ActionType.LOGIN_USER_ERROR
  payload: {
    msg: string
  }
}
interface RegisterUserBegin {
  type: ActionType.REGISTER_USER_BEGIN
  payload: number
}
interface RegisterUserSuccess {
  type: ActionType.REGISTER_USER_SUCCESS
  payload: number
}
interface RegisterUserError {
  type: ActionType.REGISTER_USER_ERROR
  payload: number
}
export type Action =
  | RegisterUserError
  | RegisterUserSuccess
  | RegisterUserBegin
  | LoginUserBegin
  | LoginUserSuccess
  | LoginUserError
