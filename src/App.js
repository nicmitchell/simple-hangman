import React, { Component } from 'react';
import './App.css';
import Game from './Game';

class App extends Component {
  constructor() {
    super();
    this.state = {
      games: [1]
    }
  }

  addNewGame = (e) => {
    e.preventDefault();
    const num = this.state.games.length + 1;
    const oldState = this.state;
    oldState.games.push(num);
    this.setState(oldState);
  }

  render() {
    return(
      <div className="App">
        <div className="App-header">
          <h2>Coursera Hangman</h2>
        </div>
        <button onClick={ (e) => this.addNewGame(e) } className="add-new">New Game</button>
        {
          this.state.games.map((game, idx) => <Game key={ idx }/>)
        }
      </div>
    );
  }
}

export default App;