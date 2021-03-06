import React, { Component } from 'react';
import store from "./js/store/index";
import { addArticle } from "./js/actions/index";


window.store = store;
window.addArticle = addArticle;

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: [],
      isLoaded: false,
    }
  }

  toggleComments = (postId) =>  {
    const {posts} = this.state;
    this.setState({
      posts : posts.map(function(post){
        if(post.id === postId){ 
        return {...post,showComment : !post.showComment}}
        else{
          return post;
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
          .then(([data1, data2]) => {
            //data1.forEach(x => x.showComment = false)
            this.setState({
              posts: data1, 
              comments: data2,
              isLoaded: true
            })
          });
      }

    render() {
  
      var { isLoaded, posts, comments } = this.state;
  
      if (!isLoaded) {
        return <div>Loading...</div>
      }
      else {
        return ( 
          <div className="App">
            {posts.map(post => {
  
                const postComments = comments.filter(function(comment){ 
                  return (comment.postId === post.id)
                  })
                return ( 
                  <div key={post.id}>
                    <hr></hr>
                    <span>{post.name}</span>
                    <div><h1>Title: {post.title}</h1><br></br><h2>Body: {post.body}</h2></div>
                    {post.showComment ?
                    (<div>
                      {postComments.map(comment => (
                      <div key={comment.id}> ----> {comment.body}<br></br></div>
                    ))}
                    </div>) :
                      (
                        <button onClick={() => this.toggleComments(post.id)}>Pokaż komentarze</button>
                      )
                    }
                  </div>
                    )
                  })}
                  </div>
            )
      }
    }
  }

export default App;
