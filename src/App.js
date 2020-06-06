import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookCase from './BookCase'
import BookSearchButton from './BookSearchButton'
import BookSearchPage from './BookSearchPage'
import * as BooksAPI from './BooksAPI'

import './App.css'

class App extends Component {

  //state
  state = {
    books:[] //to keep of books of the app
  }

  //fetch all the user's books on mount & update state
  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
    })
  }

  //bookShelfChgHandler
  bookShelfChgHandler = (changedBook, newShelf) => {
    
    //call API to make the update...then state change
    BooksAPI.update(changedBook, newShelf).then(() => {
    
      //change the shelf of the book
      changedBook.shelf = newShelf

      //generate updated books list
      const updatedBooks = this.state.books.filter((b) => (
        b.id !== changedBook.id
      )).concat([changedBook])

      //update the state
      this.setState(() => ({
        books: updatedBooks
      }))
    })
  }

  //
  render() {
    //return
    return (
      <div className="app">
        {/*Home Page Display*/}
        <Route exact path='/' render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <BookCase 
            books={this.state.books} 
            bookShelfChgHandler={this.bookShelfChgHandler} />
          <BookSearchButton />
        </div>     
        )} />
        <Route path='/search' render={({history}) => (
          <BookSearchPage 
          books={this.state.books} 
          backButton={() =>{history.push('/')}}
          bookShelfChgHandler={this.bookShelfChgHandler} />
        )} />
      </div>
    )//return

  }//render

}//BooksApp

export default App


