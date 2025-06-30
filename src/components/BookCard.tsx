
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating?: number;
  reviewCount?: number;
}

const BookCard = ({ id, title, author, cover, rating = 0, reviewCount = 0 }: BookCardProps) => {
  return (
    <Link to={`/book/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
        <div className="aspect-[3/4] bg-gray-200 rounded-md mb-3 overflow-hidden">
          <img 
            src={cover} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">by {author}</p>
        {rating > 0 && (
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-700">{rating}</span>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default BookCard;
