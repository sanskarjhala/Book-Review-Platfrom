
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import reviewsReducer from './slices/reviewsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    reviews: reviewsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
