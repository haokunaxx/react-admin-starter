import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { SYSTEM_ROLE } from '../mock/userInfo'
type Recordable<T = any> = Record<string, T>

interface GlobalState {
  token?: string
  userInfo: {
    username: string
    role?: SYSTEM_ROLE
    modules: Recordable<string>
  }
  userLoading: boolean
  settings: Recordable //TODO:
}

const initialState: GlobalState = {
  settings: {},
  userInfo: {
    username: '',
    modules: {}
  },
  userLoading: true
}

export const globalStateSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUserInfo(state, action: PayloadAction<GlobalState['userInfo']>) {
      state.userInfo = action.payload
    },
    updateSettings(state, action: PayloadAction<GlobalState['settings']>) {
      state.settings = action.payload
    },
    updateToken(state, action: PayloadAction<string>) {
      state.token !== action.payload && (state.token = action.payload)
    },
    updateUserLoading(state, action: PayloadAction<boolean>) {
      state.userLoading = action.payload
    }
  }
})

export const {
  updateUserInfo,
  updateSettings,
  updateToken,
  updateUserLoading
} = globalStateSlice.actions

export const getUserModules = (state: RootState) =>
  state.globalState.userInfo.modules

export const getUserToken = (state: RootState) => state.globalState.token
export const getUserLoading = (state: RootState) =>
  state.globalState.userLoading
export default globalStateSlice.reducer
