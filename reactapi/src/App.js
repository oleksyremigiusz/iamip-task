import React, { Component } from 'react';

class App extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: [],
      isLoaded: false
    }
  }
  
  async componentDidMount() {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/comments')
    ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => this.setState({
          posts: data1, 
          comments: data2,
          isLoaded: true
        }));
    }
  
  render() {

    var { isLoaded, posts, comments } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>
    }
    else {
  
      return ( 
        <div className="App">
          <div> {posts.map(post => (
            <div>
              <h1>{post.title}</h1>
              {post.body}
              <h2>{comments[1].body}</h2>
            </div>
            
          ))}
          </div>
        </div>
      );
    }
  }
}

export default App;
