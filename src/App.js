import React, { Component } from 'react';
import './App.css';
import dbRef from './firebase.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      userInput: '',
      newBook: '',
    }
  }
  
  componentDidMount() {
    dbRef.on('value', snapshot => {
      const books = snapshot.val();
      const newBooks = [];
      
      for (let key in books){
        const eachBookObject = {
          id: key,
          title: books[key]
        }

        newBooks.push(eachBookObject);
      }

      this.setState({
        books: newBooks
      })
    })

  }

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const bookToAdd = this.state.userInput;
    
    if (bookToAdd !== '') {
      dbRef.push(bookToAdd)
      this.setState({
        userInput: ''
      })
    }
  }

  byebyeBookie = (event) => {
    dbRef.child(event.target.id).remove();
  }
  
  render() {
    return (
      <div className="App">
          <h1><span role="img" aria-hidden="true">🌧</span> Rainy Day Bookshelf <span role="img" aria-hidden="true">📖</span></h1>
          <ul>
            {this.state.books.map((book, index) => {
              return(
                <li key={index}>{book.title}<span className="delete" id={book.id} onClick={this.byebyeBookie}>x</span></li>
              )
            })}
          </ul>
          <form onSubmit={this.handleSubmit}>
              <label htmlFor="bookTitle">What book are you adding to your bookshelf?</label>
              <input value={this.state.userInput} id="bookTitle" type="text" onChange={this.handleChange} />
              <button type="submit" >Add to List</button>
            </form>
      </div>
    );
  }
}

export default App;