import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
var Carousel = require('react-responsive-carousel').Carousel;


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            counter: 0
        }
    }

    componentDidMount() {
        axios.get('https://www.reddit.com/r/funny.json')
            .then((response) => {
                this.setState({
                    data: response.data.data.children
                })
                console.log(response.data.data.children[0].data.author);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getNewCard() {
        if (this.state.counter >= 25) {
            return this.setState({ counter: 1 })
        }
        return this.setState({ counter: this.state.counter + 1})
    }

    getOldCard() {
        if (this.state.counter > 0) {
            return this.setState({counter: this.state.counter - 1})
        }
    }




  render() {
        if (this.state.data.length < 1) {
            return (
                <div className="App">
                    <p>Loading....</p>
                </div>
            )
        } else {
            return (
                <div className="App">
                    <p>{this.state.data[this.state.counter].data.author}</p>
                    <img alt='thumbnail' style={{height: "300px", width: "300px"}} src={this.state.data[this.state.counter].data.thumbnail}/>
                    <p>SCORE: {this.state.data[this.state.counter].data.ups}</p>
                    <button style={{fontSize: "50px"}} hidden={!this.state.counter > 0} onClick={() => this.getOldCard()}>⬅️</button>
                    <button style={{fontSize: "50px"}} onClick={() => this.getNewCard()}>➡️</button>
                </div>
            )
        }
  }
}

export default App;

