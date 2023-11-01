import { combineReducers } from 'redux'

import { loginReducer, registerReducer } from './Reducer'
//import registerReducer from './registerReducer'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
