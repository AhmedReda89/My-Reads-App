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
    Books: [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    alreadyReadBooks: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      this.setState({ Books })

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
          Books: state.Books.filter(b => b.id !== book.id).concat([book]),
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
        <Route exact path="/search" render={() =>
          <SearchView changeShelf={this.changeShelf}></SearchView>
        }></Route>
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
              <Link to="/search"></Link>
            </div>
          </div>
        }></Route>
      </div>
    )
  }
}


export default BooksApp
