import React, { Component } from 'react';
import './App.css';
import Door from './Components/Door.js';
import Welcome from './Components/Welcome.js';

const door1 = require('./img/door1.jpg');
const door2 = require('./img/door2.jpg');
const door3 = require('./img/door3.jpg');
const GOAT = require('./img/the-goat.png');
// const prize = require('./img/prize.jpg');

class App extends Component {
  constructor() {
    super();
    this.state = {
      prizeDoor: null,
      firstPick: null,
      revealDoor: null,
      secondPick: null,
      switchWin: 0,
      switchLose: 0,
      stayWin: 0,
      stayLose: 0,
      intro: true,
    }
    this.beginSim = this.beginSim.bind(this);
    this.assignPrize = this.assignPrize.bind(this);
    this.firstDoorPick = this.firstDoorPick.bind(this);
    this.stayDoor = this.stayDoor.bind(this);
    this.switchDoor = this.switchDoor.bind(this);
    this.tally = this.tally.bind(this);
  }

  componentDidMount() {
    this.assignPrize();
  }


// BEGIN SIMULATION
  beginSim = () => {
    this.setState({intro: false});
  }

// ASSIGNS A PRIZE DOOR
  assignPrize = () => {
    const random = Math.ceil(Math.random() * 3);
    this.setState({prizeDoor: random});
  };

// RECORDS THE FIRST DOOR THE PLAYER PICKS
firstDoorPick = (door) => {
  this.setState({firstPick: door});
  const doors = [1,2,3];
  const options = doors.filter(n => n !== door && n !== this.state.prizeDoor);
  this.setState({revealDoor: options[Math.floor(Math.random()*options.length)]});
};

// CONFIRMS THE USER WANTS TO STICK WITH THEIR ORIGINAL DOOR
  stayDoor = () => {
    this.setState({secondPick: this.state.firstPick});
  };

// CONFIRMS THE USER WANTS TO SWITCH TO THE OTHER REMAINING DOOR
  switchDoor = () => {
    const pick = this.state.firstPick;
    const reveal = this.state.revealDoor;
    if (pick !== 1 && reveal !== 1) {this.setState({secondPick: 1})};
    if (pick !== 2 && reveal !== 2) {this.setState({secondPick: 2})};
    if (pick !== 3 && reveal !== 3) {this.setState({secondPick: 3})};
  };

// TALLY THE RESULTS OF THIS ROUND
  tally = () => {
    const first = this.state.firstPick;
    const second = this.state.secondPick;
    const prize = this.state.prizeDoor;
    // IF THEY STAYED:
    if (first === second) {
      if (second === prize) {
        this.setState({stayWin: this.state.stayWin+1});
        return;
      }
      this.setState({stayLose: this.state.stayLose+1})
      return;
    }
    // IF THEY SWITCHED:
    if (second === prize) {
      this.setState({switchWin: this.state.switchWin+1});
      return;
    }
    this.setState({switchLose: this.state.switchLose+1});
  }

// RESET THE SIMULATION
  reset = () => {
    this.tally();    
    this.setState({
      prizeDoor: null,
      firstPick: null,
      revealDoor: null,
      secondPick: null
    });
    this.assignPrize();
  }

  render() {
    return (
      <div className="container">
      <div className="App">
      <div className="Simulation column">
        {(this.state.intro)
          ? null
          : <div className="door-row box">
            <Door door="1" doorImg = {door1} firstDoorPick = {() => this.firstDoorPick(1)} revealDoor={this.state.revealDoor} secondPick={this.state.secondPick} prizeDoor={this.state.prizeDoor}/>
            <Door door="2" doorImg = {door2} firstDoorPick = {() => this.firstDoorPick(2)} revealDoor={this.state.revealDoor} secondPick={this.state.secondPick} prizeDoor={this.state.prizeDoor}/>
            <Door door="3" doorImg = {door3} firstDoorPick = {() => this.firstDoorPick(3)} revealDoor={this.state.revealDoor} secondPick={this.state.secondPick} prizeDoor={this.state.prizeDoor}/>
            </div>}
        <div className="Text box">
          <div className="title">Monty Hall Simulator</div>
          {(this.state.firstPick === null)
            ? (this.state.intro)
              ?<Welcome begin={this.beginSim}/>
              :<div>Pick a door!<br/><br/></div>
            : (this.state.secondPick === null)
          ? (<div>You picked door {this.state.firstPick}. Monty tells me there's a goat behind door {this.state.revealDoor}. <br/>
            Do you want to STAY or SWAP?</div>)
          : (this.state.secondPick === this.state.prizeDoor)
            ? 'You won!'
            : 'You lost!'}
          <div>
          {(this.state.firstPick !== null && this.state.secondPick === null)
            ?<button className="buttons" onClick={this.stayDoor}>STAY</button>
            : ''}
          {(this.state.firstPick !== null && this.state.secondPick === null)
            ?<button className="buttons" onClick={this.switchDoor}>SWAP</button>
            : ''}
          {(this.state.firstPick !== null && this.state.secondPick !== null)
            ?<button className="buttons" onClick={this.reset}>TRY AGAIN</button>
            : ''}
          </div>
        </div>
      </div>
      <div className="results box">
        <img className="goatimg" src={GOAT}/>
        <div className="results-table">
          <h3>RESULTS:</h3>
          <tr>
            <th>&nbsp;</th>
            <th>stay</th>
            <th>swap</th>
          </tr>
            <th>win</th>
            <td>{this.state.stayWin}</td>
            <td>{this.state.switchWin}</td>
          <tr>
            <th>lose</th>
            <td>{this.state.stayLose}</td>
            <td>{this.state.switchLose}</td>
          </tr>
        </div>
      </div>
      </div>
      </div>
    );
  };
};

export default App;
