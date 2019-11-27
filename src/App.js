import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
import Book from './Book';

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: []
    }
  }
  
  componentDidMount() {
    const dbRef = firebase.database().ref();
    
    dbRef.on('value', snapshot => {
      const database = snapshot.val();
      const bookTitles = Object.values(database);
      
      this.setState({
        books: bookTitles
      })
    })
  }

  handleChange = (e) => {
    console.log(e.target.value);
  }
  
  render() {
    return (
      <div className="App">
          <h1><span role="img" aria-hidden="true">🌧</span> Rainy Day Bookshelf <span role="img" aria-hidden="true">📖</span></h1>
          <ul>
            {this.state.books.map((book, index) => {
              console.log(book, index);
              return <Book title={book} key={index}></Book>
            })}
          </ul>
          <form>
                <input id="bookTitle" type="text" onChange={this.handleChange} />
                <button type="submit">Add to List</button>
            </form>
      </div>
    );
  }
}

export default App;