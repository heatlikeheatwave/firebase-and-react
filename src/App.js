import React, { Component } from 'react';
import './App.css';
import dbRef from './firebase.js';
import Book from './Book';

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
      const database = snapshot.val();
      const bookTitles = Object.values(database);
      
      this.setState({
        books: bookTitles
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
    
    dbRef.push(bookToAdd)
  }
  
  render() {
    return (
      <div className="App">
          <h1><span role="img" aria-hidden="true">🌧</span> Rainy Day Bookshelf <span role="img" aria-hidden="true">📖</span></h1>
          <ul>
            {this.state.books.map((book, index) => {
              return <Book title={book} key={index}></Book>
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