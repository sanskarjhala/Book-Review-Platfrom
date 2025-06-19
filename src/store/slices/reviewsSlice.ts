
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reviews } from '../../data/mockData';

interface Review {
  id: string;
  bookId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsState {
  reviews: Review[];
}

const initialState: ReviewsState = {
  reviews: reviews,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.unshift(action.payload);
    },
  },
});

export const { addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;
