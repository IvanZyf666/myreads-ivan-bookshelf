import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'

class BookShelf extends Component {
  render() {
    const { books, shelfFilter } = this.props;
    return (
      <div className="list-books-content">
        {shelfFilter.map(({ shelf, shelfName, index }) => (
          <section id={shelf} key={index} className="bookshelf">
            {/* <Link to= className="link">
              <h2 className="books-row">{shelfName}</h2>
            </Link> */}
            <a className="books-row" href={'/#' + shelf}>{shelfName}</a>
            <ol className="books-grid">
              {Object.values(books).filter(book => book.shelf === shelf).map((book) => (
                <Book key={book.id} book={book} onShelfUpdate={this.props.onShelfUpdate} />
              ))}
            </ol>
          </section>
        ))}
      </div>
    )
  }
}
export default BookShelf