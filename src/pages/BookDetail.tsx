import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import ReviewForm from '../components/ReviewForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Star } from 'lucide-react';
import { fetchBookById } from '../store/slices/booksSlice';
import { fetchReviews, submitReview } from '../store/slices/reviewsSlice';
import type { RootState, AppDispatch } from '../store/store';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentBook, loading: bookLoading, error: bookError } = useSelector((state: RootState) => state.books);
  const { reviews, loading: reviewsLoading, error: reviewsError } = useSelector((state: RootState) => state.reviews);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
      dispatch(fetchReviews(id));
    }
  }, [dispatch, id]);

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    if (user && id) {
      dispatch(submitReview({
        userId: user.id,
        bookId: id,
        rating: review.rating,
        comment: review.comment
      }));
    }
  };

  if (bookLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner message="Loading book details..." />
        </div>
      </div>
    );
  }

  if (bookError || !currentBook) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message={bookError || 'Book not found.'} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <img 
                src={currentBook.cover} 
                alt={currentBook.title}
                className="w-full max-w-sm mx-auto rounded-lg shadow-md"
              />
            </div>
            
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentBook.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {currentBook.author}</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold">{currentBook.rating.toFixed(1)}</span>
                <span className="text-gray-500">({currentBook.reviewCount} reviews)</span>
              </div>
              
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {currentBook.genre}
                </span>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{currentBook.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {isAuthenticated && (
            <div>
              <ReviewForm onSubmit={handleReviewSubmit} />
            </div>
          )}
          
          <div className={isAuthenticated ? '' : 'lg:col-span-2'}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
            
            {reviewsLoading && <LoadingSpinner message="Loading reviews..." />}
            {reviewsError && <ErrorMessage message={reviewsError} />}
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-700">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
              
              {reviews.length === 0 && !reviewsLoading && (
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
