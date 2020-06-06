import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'
import './App.css'

class BookSearchPage extends Component {

  //state
  state = {
    query: '', // searchterm 
    searchedBooks: [], //to keep track of the books returned by the search
    apiReturnedData: [], //API returned data/books for debug purposes
    qsl: 0 //query string length for debug
  }

  //updateSearchTerm in state
  updateSearchTerm = (searchTerm) => {
    //update state @ search input change
    this.setState(() => ({
      query: searchTerm,
      searchedBooks: [], 
      apiReturnedData: [], 
    }))
  }

  //performBookSearch
  performBookSearch = (searchTerm) => {

    const queryStringLength = (searchTerm.trim()).length //search term length after trim

    //update state @ search beginning
    this.setState(() => ({
      query: searchTerm, // searchterm 
      searchedBooks: [], //blank to begin with
      apiReturnedData: [],
      qsl:queryStringLength
    }))
  
    //call API only when trimmed search term is not completely empty
    if (queryStringLength > 0){
      //call API to perform search
      BooksAPI.search(searchTerm)
        .then((apiResponse) => {
          //log data from API
          this.setState(() => ({
            apiReturnedData: apiResponse //blank to begin with
          }))

          //console.log(foundBooks.error)

          //for valid response, update state
          if(apiResponse.length){
            //console.log("..book processing loop..")
            //filter out books if missing data eg thumbnail
            let foundBooks = this.filterMissingEssentialData(apiResponse)
            //set the shelf for the found books
            foundBooks = this.setBookShelfInfo(foundBooks)
            //update state for positive date
            if (foundBooks.length){
              this.setState(() => ({
                searchedBooks: foundBooks
              }))
            }
          } 
        }
      )
    }

  }//performBookSearch

  //filter out data not having imageLinks..ie Thumbnails
  filterMissingEssentialData = (foundBooks) => {
    //
    const filteredFoundBooks = foundBooks.filter(
      (book) => book.hasOwnProperty('imageLinks')
    ) 
    return filteredFoundBooks
  }

  //
  setBookShelfInfo = (foundBooks) => {
    //get current books on shelves
    const myBooks = this.props.books
    //check for each found book
    foundBooks.forEach((thisFoundBook) => {
      //assume not in shelf and assign none
      thisFoundBook.shelf = 'none'
      //check and update if found in shelf
      myBooks.forEach((thisMyBook) => {
        if(thisMyBook.id === thisFoundBook.id){
          thisFoundBook.shelf = thisMyBook.shelf
        }
      })
    })
    //return the revised foundBooks
    return foundBooks
  }

  //
  onInputValueChange = (searchString) => {
      //
      const searchTerm = searchString
      //call in sequence
      this.updateSearchTerm(searchTerm) //this blanks out the display on backspace etc
      this.performBookSearch(searchTerm) //for calling api
  }

  //displays the main page link to /search, a search page
  render() {
    //gather infos
    const query = this.state.query
    const searchedBooks = this.state.searchedBooks
    //gather additional infos
    const bookShelfChgHandler = this.props.bookShelfChgHandler
    const backButton = this.props.backButton

    return(
      <div className="search-books">
        <div className="search-books-bar">
            <button className="close-search"  onClick = {backButton} >Close</button>
          <div className="search-books-input-wrapper">
            <input 
              type='text' 
              placeholder="Search by title or author" 
              value={query} 
              onChange={(event) => {this.onInputValueChange(event.target.value)}}  />
          </div>
        </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {searchedBooks.length > 0 && (
                searchedBooks.map((sb) => (
                  <li key={sb.id}>
                    <Book 
                      book={sb} 
                      bookShelfChgHandler={bookShelfChgHandler} />
                  </li>
                ))
              )}
            </ol>
          </div>
      </div>
    );//return

  }//render

}// BookSearchButton

//propTypes
BookSearchPage.propTypes = {
  books: PropTypes.array.isRequired,
  backButton: PropTypes.func.isRequired,
  bookShelfChgHandler: PropTypes.func.isRequired
};

//
export default BookSearchPage