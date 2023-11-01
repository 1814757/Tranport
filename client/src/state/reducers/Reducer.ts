import { Action } from '../actions'
import { ActionType } from '../action-types'

interface dataType {
  isLoading: boolean
  user: [] | null // Hier kannst du den Benutzerdaten-Typ anpassen
  token: string | null
  showAlert: boolean
  alertType: string
  alertText: string
  status: boolean
  alertMessage: string
}

const initialState: dataType = {
  user: [],
  status: false,
  isLoading: false,
  token: '',
  showAlert: false,
  alertType: '',
  alertText: '',
  alertMessage: '',
}

export const loginReducer = (
  state: dataType = initialState,
  action: Action
) => {
  if (action.type === ActionType.LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === ActionType.LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.msg,
    }
  }
  if (action.type === ActionType.LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertMessage: 'Ein Fehler ist aufgetreten',
    }
  }

  // Wenn keine Aktion zutrifft, gib den aktuellen Zustand zurück
  return state
}

export const registerReducer = (
  state: dataType = initialState,
  action: any
) => {
  switch (action.type) {
    case ActionType.REGISTER_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      }
    case ActionType.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        showAlert: true,
        alertType: 'success',
        alertText: action.payload.msg,
      }
    case ActionType.REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      }
    default:
      return state
  }
}
