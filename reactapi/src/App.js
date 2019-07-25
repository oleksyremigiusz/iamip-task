import React, { Component } from 'react';

class App extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        comments: [],
        isLoaded: false,
        showComment: []
      }
    }
  
    toggleComment(id) {
      this.setState({
        showComment : !this.state.showComment
      });
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
    var shownComment = {
			display: this.state.showComment ? "block" : "none"
		};
		
		var hiddenComment = {
			display: this.state.showComment ? "none" : "block"
		}

    if (!isLoaded) {
      return <div>Loading...</div>
    }
    else {
  
      return ( 
        <div className="App">
          {posts.map(post => (
              <div>
              <h1>{post.title}</h1>
              <h4 name={post.id} style={ shownComment }>{comments[post.id].body}</h4>
				      <button className={post.id} style={ hiddenComment } onClick={this.toggleComment.bind(this[post.id])}>Pokaż komentarze</button>
              </div>
          ))}
          </div>
      );
    }
  }
}

export default App;
