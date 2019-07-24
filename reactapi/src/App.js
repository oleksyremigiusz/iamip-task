import React, { Component } from 'react';

class App extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    }
  }
  
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          items: data,
        })
      });
    }
  
  render() {

    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>
    }
    else {
  
      return ( 
        <div className="App">
          <div> {items.map(item => (
            <div>
              <h1>{item.title}</h1>
              {item.body}
            </div>
            
          ))}
          </div>
        </div>
      );
    }
  }
}

export default App;
