import React from 'react';
import './stopwatch.scss';

class Stopwatch extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            miliseconds: 0,
            seconds: 0,
            minutes: 0,
            show: false
        };
      }
    
    format = () => `${this.pad0(this.state.minutes)}:${this.pad0(this.state.seconds)}:${this.pad0(Math.floor(this.state.miliseconds))}`;

    pad0 = (value) => {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

    start = () => {
        this.setState({ show: false });
        this.timer = setInterval(() => {
            this.calculate();
        }, 10);
    };

    stop = () => {
        this.setState({ show: true });
        clearInterval(this.timer)
    };

    calculate = () => {
        this.setState({miliseconds: this.state.miliseconds + 1});
        if (this.state.miliseconds >= 100) {
            this.setState({seconds: this.state.seconds + 1});
            this.setState({miliseconds: 0});
        }
        if (this.state.seconds >= 60) {
            this.setState({minutes: this.state.minutes + 1});
            this.setState({seconds: 0});
        }
    }


    render() {
        return (
            <div className="stopwatch">
                <h1>{this.format()}</h1>
                <button className="start-btn" onClick={this.start}>Start</button>
                <button className="start-btn" onClick={this.stop}>Stop</button>
                {this.state.show === true ? <button>Reset</button> : null}
            </div>
        );
    }
}


export default Stopwatch;