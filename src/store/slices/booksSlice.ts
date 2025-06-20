
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookApi } from '../../api/bookApi';

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
  currentBook: Book | null;
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  currentBook: null,
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  return await bookApi.getAllBooks();
});

export const fetchBookById = createAsyncThunk('books/fetchBookById', async (id: string) => {
  return await bookApi.getBookById(id);
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.books || action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch books';
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
        state.error = action.error.message || 'Failed to fetch book';
      });
  },
});

export default booksSlice.reducer;
