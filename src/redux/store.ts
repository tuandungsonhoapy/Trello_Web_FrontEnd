import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './boardsSlice'
import authReducer from './authSlice'
import activeCardReducer from './activeCardSlice'
import notificationsReducer from './notificationsSlice'
import { combineReducers } from 'redux'

// * Reudx persist
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'boards']
}

const rootReducer = combineReducers({
  boards: boardsReducer,
  auth: authReducer,
  activeCard: activeCardReducer,
  notifications: notificationsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
