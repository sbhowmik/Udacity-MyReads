import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import './App.css'

class BookShelf extends Component {

//
render() {

  //destructure props
  const shelfName = this.props.title
  const shelfBooks = this.props.books
  const bookShelfChgHandler = this.props.bookShelfChgHandler

  //now return the books on this shelf
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            shelfBooks.map((sb) => (
              <li key={sb.id}><Book 
                  book={sb} 
                  bookShelfChgHandler={bookShelfChgHandler} />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}//render  

}//BookShelf

//propTypes
BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  bookShelfChgHandler: PropTypes.func.isRequired
};

//
export default BookShelf