import React, { Component } from 'react';
import './App.css';
import { Button, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

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
        <p>Este é um teste de requisição para <br />https://nome-da-conta.vtexcommercestable.com.br/api/oms/pvt/orders/ <br />utilizando a chave abaixo.</p>
        <form onSubmit={this.handleSubmit}>
          <TextField
            fullWidth
            id="key"
            InputLabelProps={{
              shrink: true,
            }}
            label="Access key"
            margin="normal"
            placeholder="vtexappkey-xxxxxx-XXXXXX"
            variant="outlined"
            onChange={(event) => this.handleChange(event, "key")}
            required
          />
          <TextField
            fullWidth
            id="token"
            InputLabelProps={{
              shrink: true,
            }}
            label="Secret"
            margin="normal"
            multiline
            placeholder="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            rows={4}
            variant="outlined"
            onChange={(event) => this.handleChange(event, "token")}
            required
          />
          <Button 
            color="primary"
            fontWeight={500}
            type="submit"
            variant="contained"
          >
            Testar chave
          </Button>
        </form>
        <br />
        {this.state.express ? <Alert severity="info">{this.state.express}</Alert> : ""}
      </div>
    );
  }
}

export default App;