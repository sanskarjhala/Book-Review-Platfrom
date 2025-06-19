
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ReviewForm from '../components/ReviewForm';
import { Star } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addReview } from '../store/slices/reviewsSlice';
import { updateBookRating } from '../store/slices/booksSlice';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state.books);
  const { reviews } = useAppSelector((state) => state.reviews);
  const { currentUser } = useAppSelector((state) => state.user);
  
  const book = books.find(b => b.id === id);
  const bookReviews = reviews.filter(review => review.bookId === id);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">Book not found.</p>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    const newReview = {
      id: Date.now().toString(),
      bookId: book.id,
      userName: currentUser,
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    dispatch(addReview(newReview));
    
    // Update book rating
    const allBookReviews = [...bookReviews, newReview];
    const newRating = allBookReviews.reduce((sum, r) => sum + r.rating, 0) / allBookReviews.length;
    dispatch(updateBookRating({
      bookId: book.id,
      rating: newRating,
      reviewCount: allBookReviews.length
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <img 
                src={book.cover} 
                alt={book.title}
                className="w-full max-w-sm mx-auto rounded-lg shadow-md"
              />
            </div>
            
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold">{book.rating.toFixed(1)}</span>
                <span className="text-gray-500">({book.reviewCount} reviews)</span>
              </div>
              
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {book.genre}
                </span>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ReviewForm onSubmit={handleReviewSubmit} />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
            <div className="space-y-6">
              {bookReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-700">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              ))}
              
              {bookReviews.length === 0 && (
                <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to write one!</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;
