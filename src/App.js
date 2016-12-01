import React, { Component } from 'react';
import './App.css';

function nextPos(p) {
  return p.position + (p.direction === 'left' ? -1 : 1);
}

const DEAD_POSITION = -1000;

class App extends Component {
  constructor() {
    super();
    const people = [];
    for (var i = 0; i < 100; ++i) {
      people.push({
        direction: Math.random() > 0.5 ? 'left' : 'right',
        position: Math.floor(Math.random() * 1000),
        color: Math.floor(Math.random() * 256 * 256 * 256),
      });
    }
    window.GLOBAL_STATE = this.state = {
      people
    };
    setInterval(this.loop.bind(this), 10);
  }

  loop() {
    var board = [];
    this.state.people.forEach(p => {
      if (p.position === DEAD_POSITION) {
        return;
      }
      board[p.position] = p;
    });

    for (var i = 0; i < 1000; ++i) {
      var p = board[i];
      if (!p) {
        continue;
      }

      let next = nextPos(p);
      if (next === -1 || next === 1000) {
        next = DEAD_POSITION;
      }
      const nextP = board[next];
      if (nextP) {
        p.direction = p.direction === 'left' ? 'right' : 'left';
      } else {
        p.position = next;
      }
    }

    this.forceUpdate();
  }

  render() {
    return (
      <div className="App">
        <div style={{position: 'relative', width: 1000, borderBottom: '3px solid black'}}>
          {this.state.people.map((p, i) =>
            p.position !== DEAD_POSITION && <div key={'_' + i} style={{position: 'absolute', left: p.position, color: '#' + p.color.toString(16)}}>
              {p.direction === 'left' ? '<' : '>'}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
