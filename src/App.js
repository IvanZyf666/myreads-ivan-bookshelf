import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Routes,Route } from 'react-router-dom';
import './App.css'
import MainPage from './MainPage';
import SearchBook from './SearchBook';
import PageNotFound from './PageNotFound';
import bg from './images/bg.jfif';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: '',   
    searchResult: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((data) => this.setState({
      // name: user.name,
      // age: user.age
      books: data
    }));
  }
  addBookButtonClick = () => (
    this.setState({showSearchPage: true})
  )
  backButtonClick = () => (
    this.setState({showSearchPage: false})
  )

  updateBookShelf = (book, shelf) => {
    if(book.shelf === shelf)
      return;
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    }).catch(err => console.log(err))
  }

  onUpdateQuery = (query) => {
    if(query) BooksAPI.search(query).then((result) => {
      if(!result.error) result.map((book) => {
        this.state.books.map((b) => {
          if(book.id === b.id) book.shelf = b.shelf;
        })
        if(!book.shelf) book.shelf = 'none';
      })
      this.setState(() => ({
        searchResult: !result.error ? result : []
      }));
    }).catch(err => console.log(err));
    else this.setState(() => ({searchResult: []}));
  }

  render() {
    return (
      <div className="app" >
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route exact path='/' element={
            <MainPage
              books={this.state.books} 
              onShelfUpdate={this.updateBookShelf}
            />
          }/>
          <Route exact path='/search' element={
            <SearchBook
              books={this.state.searchResult}
              onShelfUpdate={this.updateBookShelf}
              onUpdateQuery={this.onUpdateQuery}
            />
          }/>
        </Routes>
      </div>
    )
  }
}

export default BooksApp
