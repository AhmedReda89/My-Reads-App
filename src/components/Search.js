import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BookItem from './BookItem';

class SearchView extends React.Component {

    state = {
        Books: [],
        query: '',
        searches: [],
        goodSearch: true
    }
    componentDidMount() {
        BooksAPI.getAll().then((Books) => {
            this.setState({ Books })
            console.log('Search state books');
            console.log(this.state.Books);
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

    updateQuery = (query) => {

        this.setState({ query })
        this.searchOutput(query)

    }

    searchOutput = (query) => {
        if (query) {

            BooksAPI.search(query).then((searches) => {
                console.log(searches)

                if (searches.error) {
                    this.setState({
                        searches: [],
                        goodSearch: false
                    })

                } else {
                    searches.map((bookFromSearch) => {
                        this.state.Books.map(function (book) {
                            if (book.id === bookFromSearch.id) {
                                bookFromSearch.shelf = book.shelf;
                                bookFromSearch.authors = book.authors;
                            } else {
                                bookFromSearch.shelf = "";
                                bookFromSearch.authors = [];

                            }
                            return bookFromSearch;
                        })
                        return bookFromSearch;
                    }
                    )

                    this.setState({
                        searches: searches,
                        goodSearch: true
                    })
                }
            })

        } else {
            this.setState({
                searches: [],
                goodSearch: true
            })
        }
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/"></Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author"
                            value={this.state.query} onChange={(e) => this.updateQuery(e.target.value)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searches.map((book) => (
                            <BookItem src={book} changeShelf={this.changeShelf}></BookItem>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchView