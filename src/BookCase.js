import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import './App.css'

class BookCase extends Component {

  //
  render() {

    //get the necessary baooks in each shelf
    const { books, bookShelfChgHandler } = this.props

    //get currently reading books
    const currentlyReadingBooks = books.filter((b) => (
      b.shelf === 'currentlyReading'
    ))
    //get want to read books
    const wantToReadBooks = books.filter((b) => (
      b.shelf === 'wantToRead'
    ))
    //get read books
    const readBooks = books.filter((b) => (
      b.shelf === 'read'
    ))


    //return
    return (
    <div className="list-books-content">
      <BookShelf 
      title='Currently Reading' 
      books={currentlyReadingBooks} 
      bookShelfChgHandler={bookShelfChgHandler} />
      
      <BookShelf 
      title='Want to Read' 
      books={wantToReadBooks} 
      bookShelfChgHandler={bookShelfChgHandler} />
      
      <BookShelf 
      title='Already Read' 
      books={readBooks}  
      bookShelfChgHandler={bookShelfChgHandler} />
    </div>
    )
  }//render  

}//BookCase

//propTypes
BookCase.propTypes = {
  books: PropTypes.array.isRequired,
  bookShelfChgHandler: PropTypes.func.isRequired
};

//
export default BookCase