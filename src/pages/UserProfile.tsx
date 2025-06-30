
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Star, User } from 'lucide-react';
import { fetchUserProfile } from '../store/slices/userSlice';
import type { RootState, AppDispatch } from '../store/store';

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile, loading: profileLoading, error: profileError } = useSelector((state: RootState) => state.user);
  const { reviews } = useSelector((state: RootState) => state.reviews);
  const { books } = useSelector((state: RootState) => state.books);
  
  const userReviews = reviews.filter(review => review.userId === user?.id);
  
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [dispatch, user?.id]);

  const getBookTitle = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    return book?.title || 'Unknown Book';
  };

  const calculateAverageRating = () => {
    if (userReviews.length === 0) return '0.0';
    const validRatings = userReviews.filter(review => typeof review.rating === 'number' && !isNaN(review.rating));
    if (validRatings.length === 0) return '0.0';
    const sum = validRatings.reduce((acc, review) => acc + review.rating, 0);
    return (sum / validRatings.length).toFixed(1);
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSpinner message="Loading profile..." />
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message={profileError} />
        </div>
      </div>
    );
  }

  // Use profile data if available, otherwise fall back to user data
  const displayUser = profile || user;

  if (!displayUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message="User not found. Please log in again." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {displayUser.username || 'User'}
              </h1>
              <p className="text-gray-600">{displayUser.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{userReviews.length}</div>
              <div className="text-sm text-gray-600">Reviews Written</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">
                {calculateAverageRating()}
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">
                {new Set(userReviews.map(r => r.bookId)).size}
              </div>
              <div className="text-sm text-gray-600">Books Reviewed</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">My Reviews</h2>
          
          <div className="space-y-6">
            {userReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{getBookTitle(review.bookId)}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-700">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
            
            {userReviews.length === 0 && (
              <p className="text-gray-500 text-center py-8">No reviews written yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
