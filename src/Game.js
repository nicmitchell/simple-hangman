import React, { Component } from 'react';
import './App.css';

class Game extends Component {
  constructor() {
    super();
    this.fetchGame();
    this.state = {
      game_key: '',
      num_tries_left: '',
      phrase: '',
      state: 'alive',
      current_guess: '',
      last_guess: '',
      already_guessed: [],
    };
  }

  fetchGame() {
    const data = this.key;
    const api = this.api;
    fetch(api, {
      method: 'POST',
      mode: 'cors',
      body: data,
    })
    .then((response) => { 
      return response.json()
    })
    .then((json) => {
      console.log('Starting new game:', json)
      this.updateGameState(json);
      return json;
    })
    .catch((error) => {
      throw Error(error);
    });
  }

  updateGameState(newState) {
    const oldState = this.state;
    const last_guess = oldState.current_guess;

    // update view of already guessed
    // if (newState.phrase.indexOf(last_guess) === -1 && oldState.already_guessed.length === 0) {
    //   oldState.already_guessed.push(last_guess);
    // }

    this.setState({ 
      oldState, 
      ...newState,
      last_guess,
      current_guess: '',
    });

    // if lost, end game
    if (newState.state !== "alive") {  // lols
      this.endGame(newState.state);
    }
  }

  endGame(gameState) {
    this.resetInput();
    if (gameState === 'won') {

    }

    if (gameState === 'lost') {

    }
  }

  handleChange(e) {
    const current_guess = e.target.value;
    this.setState({ current_guess });
  }

  handleSubmit(e) {
    e.preventDefault();
    const guess = this.state.current_guess;
    this.sendData(guess);

    // const already_guessed = this.state.already_guessed;
    // already_guessed.push(guess);
    this.setState({ last_guess: guess });
  }

  sendData(guess) {
    const api = this.api + '/' + this.state.game_key;
    const data = JSON.stringify({ guess });
    fetch(api, {
      method: 'POST',
      mode: 'cors',
      body: data,
    })
    .then((response) => { 
      return response.json()
    })
    .then((json) => {
      console.log('Posted data successfully', json)
      this.updateGameState(json);
      return json;
    })
    .catch((error) => {
      throw Error(error);
    });
  }

  resetInput() {
    this.setState({ current_guess: '' });
  }

  render() {
    return (
      <div className="game-board">
        <div className="game-display">
          <div className={ `banner lost ${ this.state.state === 'lost' ? 'show' : 'hide' }` }>Oh Noes! You lost!</div>
          <div className={ `banner won ${ this.state.state === 'won' ? 'show' : 'hide' }` }>Yay! You won!</div>
          <div className={ `tries ${ this.state.num_tries_left > -1 ? 'show' : 'hide' } ` }>Guesses remaining: { this.state.num_tries_left }</div>
          <div className="phrase">{ this.state.phrase }</div>
          <div className="already-guessed">
            { 
            /* 
              this.state.already_guessed.map((char, idx) => <span key={ char + idx } className="guessed-char">{ char } </span>)
            */
            }
          </div>
        </div>
        <div className="game-input">
          <form onSubmit={ (e) => this.handleSubmit(e) }>
            <label>Guess a letter: </label>
            <input onChange={ (e) => this.handleChange(e) } type="text" maxLength="1" value={ this.state.current_guess }/>
            <button type="submit" className="guess-button" disabled={ this.state.current_guess.length < 1 }>Guess</button>
          </form>
        </div>
      </div>
    );
  }

  get api() {
    return 'https://hangman.coursera.org/hangman/game';
  }

  get key() {
    return JSON.stringify({ email: 'nic@nicmitchell.com' });
  }
}

export default Game;
