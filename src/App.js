import React, { useState, useEffect } from 'react';
import './App.css';
import Door from './Components/Door.js';
import Welcome from './Components/Welcome.js';

const door1 = require('./img/door1.jpg');
const door2 = require('./img/door2.jpg');
const door3 = require('./img/door3.jpg');
const GOAT = require('./img/the-goat.png');
// const prize = require('./img/prize.jpg');

const initScores = {
  switch: {
    win: 0,
    lose: 0
  },
  stay: {
    win: 0,
    lose: 0
  }
}

function App(){
  const [prizeDoor, setPrizeDoor] = useState(null);
  const [firstPick, setFirstPick] = useState(null);
  const [revealDoor, setRevealDoor] = useState(null);
  const [secondPick, setSecondPick] = useState(null);
  const [switchWin, setSwitchWin] = useState(0);
  const [switchLose, setSwitchLose] = useState(0);
  const [stayWin, setStayWin] = useState(0);
  const [stayLose, setStayLose] = useState(0);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    assignPrize();
  }, [])

  const beginSim = () => {
    setIntro(false)
  }

  const assignPrize = () => {
    const random = Math.ceil(Math.random() * 3);
    setPrizeDoor(random)
  }

  const firstDoorPick = (door) => {
    setFirstPick(door);
    const doors = [1,2,3]
    const options = doors.filter(n => n !== door && n !== prizeDoor);
    const doorToReveal = options[Math.floor(Math.random()*options.length)]
    setRevealDoor(doorToReveal);
  }

  const stayDoor = () => {
    setSecondPick(firstPick)
  }

  const switchDoor = () => {
    const doors = [1,2,3]
    const remainingDoor = doors.filter(n => n !== firstPick && n !== revealDoor)
    setSecondPick(remainingDoor)
  }

  const tally = () => {
    // if they stuck with their original choice
    if (firstPick === secondPick){
      if (secondPick === prizeDoor) {
        setStayWin(stayWin + 1)
      } else {
        setStayLose(stayLose + 1)
      }
    }
    // if they changed doors
    if (firstPick !== secondPick){
      if (secondPick === prizeDoor) {
        setSwitchWin(switchWin + 1)
      } else {
        setSwitchLose(switchLose + 1)
      }
    }
  }

  const reset = () => {
    tally();
    setPrizeDoor(null)
    setFirstPick(null)
    setRevealDoor(null)
    setSecondPick(null)
    assignPrize()
  }

  return(
    <div>
      <section className='info'>
        <div className="Text box">
          <div className="title">Monty Hall Simulator</div>
          {(firstPick === null)
            ? (intro)
              ?<Welcome begin={beginSim}/>
              :<div>Pick a door!<br/><br/></div>
            : (secondPick === null)
          ? (<div>You picked door {firstPick}. Monty tells me there's a goat behind door {revealDoor}. <br/>
            Do you want to STAY or SWAP?</div>)
          : (secondPick === prizeDoor)
            ? 'You won!'
            : 'You lost!'}
          <div>
          {(firstPick !== null && secondPick === null)
            ?<button className="buttons" onClick={stayDoor}>STAY</button>
            : ''}
          {(firstPick !== null && secondPick === null)
            ?<button className="buttons" onClick={switchDoor}>SWAP</button>
            : ''}
          {(firstPick !== null && secondPick !== null)
            ?<button className="buttons" onClick={reset}>TRY AGAIN</button>
            : ''}
          </div>
        </div>
      </section>
      <section className='simulation'>
        {(intro)
          ? null
          : <div className="door-row box">
            <Door door="1" doorImg = {door1} firstDoorPick = {() => firstDoorPick(1)} revealDoor={revealDoor} secondPick={secondPick} prizeDoor={prizeDoor}/>
            <Door door="2" doorImg = {door2} firstDoorPick = {() => firstDoorPick(2)} revealDoor={revealDoor} secondPick={secondPick} prizeDoor={prizeDoor}/>
            <Door door="3" doorImg = {door3} firstDoorPick = {() => firstDoorPick(3)} revealDoor={revealDoor} secondPick={secondPick} prizeDoor={prizeDoor}/>
            </div>}
      </section>
    </div>
  )
}

function Scores({stayWin, switchWin, stayLose, switchLose}) {
  return (
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
          <td>{stayWin}</td>
          <td>{switchWin}</td>
        <tr>
          <th>lose</th>
          <td>{stayLose}</td>
          <td>{switchLose}</td>
        </tr>
      </div>
    </div>
  );
};

export default App;
