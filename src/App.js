import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: '',
      key: '',
      token: '',
      express: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, field) {
    this.setState({ [field]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/keytest?domain=${encodeURIComponent(this.state.key.split("-")[1])}&key=${encodeURIComponent(this.state.key)}&token=${encodeURIComponent(this.state.token)}`)
      .then(response => response.json())
      .then(state => this.setState(state))
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="key">Key: </label>
          <input
            id="key"
            type="text"
            onChange={(event) => this.handleChange(event, "key")}
            required
          />
          <label htmlFor="token">Token: </label>
          <input
            id="token"
            type="text"
            onChange={(event) => this.handleChange(event, "token")}
            required
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.express}</p>
      </div>
    );
  }
}

export default App;