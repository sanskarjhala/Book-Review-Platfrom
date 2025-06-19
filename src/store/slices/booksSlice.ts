
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { books } from '../../data/mockData';

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
  searchTerm: string;
  selectedGenre: string;
}

const initialState: BooksState = {
  books: books,
  filteredBooks: books,
  searchTerm: '',
  selectedGenre: 'All Genres',
};

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
    updateBookRating: (state, action: PayloadAction<{ bookId: string; rating: number; reviewCount: number }>) => {
      const book = state.books.find(b => b.id === action.payload.bookId);
      if (book) {
        book.rating = action.payload.rating;
        book.reviewCount = action.payload.reviewCount;
      }
    },
  },
});

export const { setSearchTerm, setSelectedGenre, updateBookRating } = booksSlice.actions;
export default booksSlice.reducer;
