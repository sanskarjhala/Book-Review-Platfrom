
export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  genre: string;
  rating: number;
  reviewCount: number;
}

export interface Review {
  id: string;
  bookId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    description: 'A classic American novel about the Jazz Age and the American Dream.',
    genre: 'Classic Literature',
    rating: 4.2,
    reviewCount: 156
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    description: 'A gripping tale of racial injustice and loss of innocence in the American South.',
    genre: 'Classic Literature',
    rating: 4.5,
    reviewCount: 203
  },
  {
    id: '3',
    title: 'Dune',
    author: 'Frank Herbert',
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
    description: 'An epic science fiction novel set on the desert planet Arrakis.',
    genre: 'Science Fiction',
    rating: 4.3,
    reviewCount: 89
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    description: 'A romantic novel about manners, upbringing, morality, and marriage.',
    genre: 'Romance',
    rating: 4.6,
    reviewCount: 312
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    cover: 'https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&h=400&fit=crop',
    description: 'A fantasy adventure about Bilbo Baggins and his unexpected journey.',
    genre: 'Fantasy',
    rating: 4.4,
    reviewCount: 178
  },
  {
    id: '6',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=300&h=400&fit=crop',
    description: 'A dystopian novel about totalitarianism and surveillance.',
    genre: 'Dystopian Fiction',
    rating: 4.3,
    reviewCount: 267
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    bookId: '1',
    userName: 'Alice Johnson',
    rating: 5,
    comment: 'A masterpiece of American literature. Fitzgerald\'s prose is absolutely beautiful.',
    date: '2024-01-15'
  },
  {
    id: '2',
    bookId: '1',
    userName: 'Bob Smith',
    rating: 4,
    comment: 'Great character development and symbolism, though the pacing can be slow at times.',
    date: '2024-01-10'
  },
  {
    id: '3',
    bookId: '2',
    userName: 'Carol Davis',
    rating: 5,
    comment: 'An incredibly powerful story that remains relevant today. A must-read.',
    date: '2024-01-12'
  }
];

export const genres = [
  'All Genres',
  'Classic Literature',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Mystery',
  'Dystopian Fiction',
  'Biography',
  'History'
];
