
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  genre: string;
  description: string;
  rating: number;
  reviewCount: number;
}

interface BooksState {
  books: Book[];
  filteredBooks: Book[];
  currentBook: Book | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedGenre: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: BooksState = {
  books: [],
  filteredBooks: [],
  currentBook: null,
  loading: false,
  error: null,
  searchTerm: '',
  selectedGenre: 'All Genres',
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get(`/books?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch books');
    }
  }
);

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch book');
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredBooks = state.books.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(action.payload.toLowerCase()) ||
                             book.author.toLowerCase().includes(action.payload.toLowerCase());
        const matchesGenre = state.selectedGenre === 'All Genres' || book.genre === state.selectedGenre;
        return matchesSearch && matchesGenre;
      });
    },
    setSelectedGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenre = action.payload;
      state.filteredBooks = state.books.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                             book.author.toLowerCase().includes(state.searchTerm.toLowerCase());
        const matchesGenre = action.payload === 'All Genres' || book.genre === action.payload;
        return matchesSearch && matchesGenre;
      });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.books || action.payload;
        state.filteredBooks = action.payload.books || action.payload;
        state.pagination = {
          page: action.payload.page || 1,
          limit: action.payload.limit || 10,
          total: action.payload.total || action.payload.length,
        };
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchTerm, setSelectedGenre, clearError } = booksSlice.actions;
export default booksSlice.reducer;
