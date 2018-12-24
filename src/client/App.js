import React, { Component } from 'react';
var FileInput = require('react-simple-file-input');
import './app.css';

export default class App extends Component {
  state = {
    username: null ,
    value: '',
    privateKey: '',
    fileInput: null
  };

  updateIDRSAValue = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state.fileInput);

    fetch('/api/convertRSA', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ idRSA: this.state.value })
    })
      .then(res => res.json())
      .then(jsonData => this.setState({ privateKey: jsonData.key }))
  }

  render() {
    const { username } = this.state;
    return (
      <div className="row">
        <h1>{`RSA konverteris`}</h1>
        <div className="column">
          <p>ID_RSA content</p>
          <form onSubmit={this.handleSubmit}>
            <textarea rows="30" cols="80" value={this.state.value} onChange={this.updateIDRSAValue} />
            <br/>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="column">
          <p>PRIVATE KEY content</p>
          <textarea rows="30" cols="80" value={this.state.privateKey} readOnly="readonly"></textarea>
        </div>
      </div>
    );
  }
}
