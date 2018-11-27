import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ListHeader from './components/listingHeader';
import BookItem from './components/BookItem';
import SearchView from './components/Search';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    
    
    Books: [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    alreadyReadBooks: [],
    showSearchPage: false
  }
  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      this.setState({ Books })
      console.log(this.state.Books)

      this.setState((state) => ({
        currentlyReadingBooks: state.Books.filter((book) => book.shelf === "currentlyReading"),
        wantToReadBooks: state.Books.filter((book) => book.shelf === 'wantToRead'),
        alreadyReadBooks: state.Books.filter((book) => book.shelf === 'read')
      }))
    });
  }

  changeShelf = (book, shelf) => {

    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf
        this.setState(state => ({
          books: state.Books.filter(b => b.id !== book.id).concat([book]),
          currentlyReadingBooks: state.Books.filter((book) => book.shelf === "currentlyReading"),
          wantToReadBooks: state.Books.filter((book) => book.shelf === 'wantToRead'),
          alreadyReadBooks: state.Books.filter((book) => book.shelf === 'read')
        }))
      })
    }

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/Search" component={SearchView}></Route>
        <Route exact path="/" render={() =>
          <div className="list-books">
            <ListHeader></ListHeader>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.currentlyReadingBooks.map((book) => (
                        <BookItem key={book.id} src={book} changeShelf={this.changeShelf}></BookItem>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.wantToReadBooks.map((book) => (
                        <BookItem key={book.id} src={book} changeShelf={this.changeShelf}></BookItem>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.alreadyReadBooks.map((book) => (
                        <BookItem key={book.id} src={book} changeShelf={this.changeShelf}></BookItem>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/Search"></Link>
            </div>
          </div>
        }></Route>
      </div>
    )
  }
}


export default BooksApp
