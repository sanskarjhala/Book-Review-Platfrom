
import api from '../services/api';

export const bookApi = {
  getAllBooks: async (page = 1, limit = 10) => {
    const response = await api.get(`/books?page=${page}&limit=${limit}`);
    return response.data;
  },

  getBookById: async (id: string) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  addBook: async (bookData: any) => {
    const response = await api.post('/books', bookData);
    return response.data;
  }
};
