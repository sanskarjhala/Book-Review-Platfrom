
import Header from '../components/Header';
import { Star, User } from 'lucide-react';
import { useAppSelector } from '../store/hooks';

const UserProfile = () => {
  const { reviews } = useAppSelector((state) => state.reviews);
  const { books } = useAppSelector((state) => state.books);
  const { currentUser } = useAppSelector((state) => state.user);
  
  const userReviews = reviews.filter(review => review.userName === currentUser);
  
  const getBookTitle = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    return book?.title || 'Unknown Book';
  };

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
              <h1 className="text-2xl font-bold text-gray-900">{currentUser}</h1>
              <p className="text-gray-600">Book enthusiast</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{userReviews.length}</div>
              <div className="text-sm text-gray-600">Reviews Written</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">
                {userReviews.length > 0 ? (userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length).toFixed(1) : '0'}
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <div className="text-sm text-gray-600">Books Read</div>
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
                <p className="text-sm text-gray-500">Reviewed on {review.date}</p>
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
