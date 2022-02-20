import React, { Component } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Book from './Book';
const terms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    props.onUpdateQuery('');
  }
  handleChange = (query) => {
    this.setState(() => ({
      query: query
    }))
    this.props.onUpdateQuery(query);
  };
  onLabelClick = (label) => {
    this.setState(() => ({
      query: label
    }))
    this.props.onUpdateQuery(label);
  }
  render() {
    const { books, onShelfUpdate } = this.props;
    const { query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search">Close</button>
          </Link> 
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Enter New Item"
              value={query}
              onChange={(event) => this.handleChange(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
            {books.length === 0 ? (
              <div>
                <h2>Probably try terms:</h2>
                {terms.map((label) => (
                  <button key={label} className="search-label" onClick={() => this.onLabelClick(label)}>
                    {label}
                  </button>)
                )}
              </div>
              ) : (
              <ol className="books-grid">
                {Object.values(books).map((book)=>(
                <Book key={book.id} book={book} onShelfUpdate={onShelfUpdate} />
                ))}
              </ol>
            )}
        </div>
      </div>
    )
  }
}
export default SearchBook