
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import { useAppSelector } from '../store/hooks';

const Home = () => {
  const { books } = useAppSelector((state) => state.books);
  const featuredBooks = books.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next Great Read
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Share reviews, discover books, and connect with fellow readers
          </p>
          <Link 
            to="/books" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Books
          </Link>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
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
        </section>
      </main>
    </div>
  );
};

export default Home;
