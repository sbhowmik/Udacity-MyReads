import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './App.css'


class BookSearchButton extends Component {

  //displays the main page link to /search, a search page
  render() {
    return (
      <Link to="/search" >
          <div className="open-search">
            <button>Add a book</button>
          </div>
      </Link>
    )//return
  }//render
}// BookSearchButton


export default BookSearchButton