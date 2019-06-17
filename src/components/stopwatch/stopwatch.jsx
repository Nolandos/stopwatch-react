import React from 'react';
import './Stopwatch.scss';

import ScoreList from '../ScoreList/ScoreList.jsx';

class Stopwatch extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            miliseconds: 0,
            seconds: 0,
            minutes: 0,
            show: false,
            scores: []
        };
      }
    
    /*Generowanie formatu zegara*/
    format = () => `${this.pad0(this.state.minutes)}:${this.pad0(this.state.seconds)},${this.pad0(Math.floor(this.state.miliseconds))}`;

    pad0 = (value) => {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

    /*Przeliczanie czasu*/
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
    /*Tak stwierdziłem że na potrzeby zadania będę sobie generował klucz (funkcja z poprzedniego), pewnie przy jakiś bazach bym miał klucz podany z każdym obiektem ale tutaj dlaczego nie skorzystać ? :)*/
    randomString = () => {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    /*Funkcje przycisków*/

    start = (e) => {
        e.target.disabled = true;

        this.setState({ show: false });
        this.timer = setInterval(() => {
            this.calculate();
        }, 10);
    };

    stop = () => {
        document.querySelector('.start-btn').disabled = false;
        this.setState({ show: true });
        clearInterval(this.timer)
    };

    reset = () => {
        document.querySelector('.start-btn').disabled = false;
        this.setState({ show: false });
        this.setState({ minutes: 0, seconds: 0, miliseconds: 0 })
    };

    save = () => { 
        let temp = this.state.scores;
        temp.push(this.format());
        this.setState({scores: temp});
    }

     clear = () => {
         this.setState({scores: []});
     }
   
     /*Renderowanie*/
    render() {
        const {show, seconds, miliseconds, minutes, scores } = this.state;
        return (
            <div className="stopwatch">
                <p className="time-result">{this.format()}</p>
                <div class="btn-container">
                <button className="start-btn" onClick={this.start}>Start</button>
                <button className="start-btn" onClick={this.stop}>Stop</button>
                {show === true && (seconds > 0 || miliseconds > 0 || minutes > 0) && <button className="reset-btn" onClick={this.reset}>Reset</button>}
                {show === true && (seconds > 0 || miliseconds > 0 || minutes > 0) && <button className="save-btn" onClick={this.save}>Zapisz</button>}
                </div>
                <div class="score-container">
                    <ul class="score-list">
                        {scores.map(item => <ScoreList key={this.randomString()} score={item} />)}
                    </ul>
                    {show === true && scores.length > 0 && <button className="clear-btn" onClick={this.clear}>Wyczyść tablicę</button>}
                </div>
            </div>
        );
    }
}


export default Stopwatch;