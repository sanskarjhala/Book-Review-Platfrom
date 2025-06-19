
import { Link } from 'react-router-dom';
import { Book, User, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">BookReview</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/books" className="text-gray-700 hover:text-blue-600 transition-colors">
              Browse Books
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">
              Profile
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/books" className="text-gray-700 hover:text-blue-600">
              <Search className="h-5 w-5" />
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
