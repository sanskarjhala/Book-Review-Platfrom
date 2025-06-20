
import { useEffect } from 'react';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import { Search } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { fetchBooks } from '../store/slices/booksSlice';

const BookListing = () => {
  const dispatch = useAppDispatch();
  const { books, loading, error } = useAppSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading books...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Books</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              cover={book.cover}
              rating={book.rating}
              reviewCount={book.reviewCount}
            />
          ))}
        </div>

        {books.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No books found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookListing;
