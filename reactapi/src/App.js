import React, { Component } from 'react';

class App extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        comments: [],
        isLoaded: false,
        showComment: [],
      }
    }
  
    toggleComment = (id) =>  {
      console.log(id);
      var { showComment } = this.state;
      this.setState({
        showComment : showComment.map(function(x){
          if (x.postId === id){
            return {...x,show : !x.show}
          }
          else{
            return x;
          }
        }) 
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
          showComment: data2.map(function(x){
            return {
              show : false,
              id : x.id,
              postId : x.postId
            }
          }),
          isLoaded: true
        }));
    }

  render() {
  
    var { isLoaded, posts, comments, showComment } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>
    }
    else {
  
      return ( 
        <div className="App">
          {posts.map(post => {
              
              var findComment = showComment.find(x => {
                return post.id === x.postId
              })
              var commentShow;
              
              if(findComment){
                 commentShow = findComment.show
              }
              

              var shownComment = {
                display: commentShow ? "block" : "none"
              };
              
              var hiddenComment = {
                display: commentShow ? "none" : "block"
              }        
              return(
              <div key = {post.id}>
                <h1>{post.title}</h1>
                <h4 name={post.id} style={ shownComment }>{comments[post.id].body}</h4>
				        <button className={post.id} style={ hiddenComment } onClick={() => this.toggleComment(post.id)}>Pokaż komentarze</button>
              </div>
          )})}
          </div>
      );
    }
  }
}

export default App;
