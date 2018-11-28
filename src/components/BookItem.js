import React from 'react';

class BookItem extends React.Component {
    render() {
      return (
          <li>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${this.props.src.imageLinks?this.props.src.imageLinks.smallThumbnail:"https://via.placeholder.com/128x193?text=No%20Cover%20Image"})` }}></div>
                <div className="book-shelf-changer">
                  <select onChange={(e) => this.props.changeShelf(this.props.src, e.target.value)}
                          value={this.props.src.shelf ? this.props.src.shelf : "none"}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.src.title}</div>
              <div className="book-authors">{this.props.src.authors.map((author)=> author+', ')}</div>
            </div>
          </li>
      );
    }
  }

export default BookItem