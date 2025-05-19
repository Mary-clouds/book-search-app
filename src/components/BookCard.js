// displaying individual book details

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img src={book.coverUrl} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.authors.join(', ')}</p>
      <a href={book.url} target="_blank" rel="noopener noreferrer">
        More Info
      </a>
    </div>
  );
};

export default BookCard;
