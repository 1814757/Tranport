/* import { ActionType } from '../acrtion-types'
import { Dispatch } from '@reduxjs/toolkit'
import { Action } from '../action'
export const loginDispatch = () => {
  console.log('loginDispatch')
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGIN_USER_BEGIN,
    })
  }
}
export const registerDispatch = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REGISTER_USER_BEGIN,
      payload: amount,
    })
  }
}
 */
