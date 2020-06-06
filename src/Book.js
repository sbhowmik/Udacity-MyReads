import React, { Component } from 'react'

import './App.css'

class Book extends Component {

  //
  render() {
    //destructure
    const book = this.props.book
    const bookShelfChgHandler = this.props.bookShelfChgHandler

    //process for incomplete data eg in search results
    //if no author, set empty
    if (typeof(book.authors) === "undefined"){
      book.authors = []
    }

    //
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select 
                value={book.shelf} 
                onChange={(event) => bookShelfChgHandler(book, event.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors.join(', ')}</div>
    </div>
    )
  }

}//Book

export default Book