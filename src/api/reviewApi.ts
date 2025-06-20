
import api from '../services/api';

export const reviewApi = {
  getReviewsByBook: async (bookId: string) => {
    const response = await api.get(`/reviews?bookId=${bookId}`);
    return response.data;
  },

  submitReview: async (reviewData: { userId: string; bookId: string; rating: number; comment: string }) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  }
};
