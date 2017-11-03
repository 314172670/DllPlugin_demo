import React, { Component } from 'react';
import './App.css';
import {withRouter} from 'react-router-dom'
class App extends Component {
  
  render() {
    console.log(this.props.children)
    return (
      <div className="App">
         header
         {this.props.children}
      </div>
    );
  }
}

export default withRouter(App);
