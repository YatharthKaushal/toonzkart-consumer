import React, { useState } from "react";
import StoresView from "./StoresView";

const authors = [
  { id: 1, name: "J.K. Rowling", image: "https://source.unsplash.com/100x100/?author" },
  { id: 2, name: "George R.R. Martin", image: "https://source.unsplash.com/100x100/?writer" },
  { id: 3, name: "Stephen King", image: "https://source.unsplash.com/100x100/?novel" },
  { id: 4, name: "Agatha Christie", image: "https://source.unsplash.com/100x100/?literature" },
  { id: 5, name: "Paulo Coelho", image: "https://source.unsplash.com/100x100/?story" },
  { id: 6, name: "Dan Brown", image: "https://source.unsplash.com/100x100/?mystery" },
  { id: 7, name: "J.R.R. Tolkien", image: "https://source.unsplash.com/100x100/?fantasy" },
  { id: 8, name: "C.S. Lewis", image: "https://source.unsplash.com/100x100/?books" },
  { id: 9, name: "Haruki Murakami", image: "https://source.unsplash.com/100x100/?japan" },
  { id: 10, name: "Mark Twain", image: "https://source.unsplash.com/100x100/?classic" },
];

const books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", image: "https://source.unsplash.com/150x200/?book" },
  { id: 2, title: "It", author: "Stephen King", image: "https://source.unsplash.com/150x200/?horror" },
  { id: 3, title: "Game of Thrones", author: "George R.R. Martin", image: "https://source.unsplash.com/150x200/?fantasy" },
  { id: 4, title: "Murder on the Orient Express", author: "Agatha Christie", image: "https://source.unsplash.com/150x200/?mystery" },
  { id: 5, title: "Harry Potter", author: "J.K. Rowling", image: "https://source.unsplash.com/150x200/?magic" },
  { id: 6, title: "Inferno", author: "Dan Brown", image: "https://source.unsplash.com/150x200/?thriller" },
  { id: 7, title: "The Hobbit", author: "J.R.R. Tolkien", image: "https://source.unsplash.com/150x200/?adventure" },
  { id: 8, title: "The Chronicles of Narnia", author: "C.S. Lewis", image: "https://source.unsplash.com/150x200/?mythology" },
  { id: 9, title: "Kafka on the Shore", author: "Haruki Murakami", image: "https://source.unsplash.com/150x200/?fiction" },
  { id: 10, title: "The Adventures of Huckleberry Finn", author: "Mark Twain", image: "https://source.unsplash.com/150x200/?classic" },
];

const ShopByDemand = () => {
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  // Filter books based on search
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedBook) {
    return <StoresView selectedBook={selectedBook} onBack={() => setSelectedBook(null)} />;
  }

  return (
    <div className="w-screen min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for books or authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Scrollable Authors List */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Authors</h2>
        <div className="w-full overflow-x-auto whitespace-nowrap pb-4">
          <div className="flex gap-6">
            {authors.map((author) => (
              <div key={author.id} className="flex flex-col items-center min-w-[100px]">
                <img src={author.image} alt={author.name} className="w-20 h-20 rounded-full shadow-md border-2 border-gray-300" />
                <p className="text-sm text-gray-700 mt-2">{author.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Books Section */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Trending Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition-all cursor-pointer" onClick={() => setSelectedBook(book.title)}>
              <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopByDemand;
