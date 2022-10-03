import React, {Component} from 'react';

const door1 = require('../img/door1.jpg');
const door2 = require('../img/door2.jpg');
const door3 = require('../img/door3.jpg');
const goat = require('../img/goat.jpg');
const prize = require('../img/prize.jpg');

export default class Door extends Component {
    constructor(props){
        super(props);
    }
    render(props) {
        console.log(this.props.door);
        return(
            <div className="door">
                {(this.props.revealDoor == this.props.door)
                    ? <img className="doorWidth" src={goat}/>
                    : (this.props.secondPick === null)
                        ? <img className="doorWidth" src={this.props.doorImg} onClick={() => this.props.firstDoorPick(this.props.door)}/>
                        : (this.props.prizeDoor == this.props.door)
                            ? <img className="doorWidth" src={prize}/>
                            : <img className="doorWidth" src={goat}/>
                            }
            </div>
        )
    }
}