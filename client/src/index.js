import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Chef from './Components/Chef/Chef'
import Header from './Components/Header/Header'
import Create from './Components/Create/Create'

import {Router, navigate} from '@reach/router'
import  firebase from './Firebase';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: [],
      commentItem: [],
      user: null,
      displayName: null,
      userID: null,
      recipeId: null,
      commentId: null,  
    };
}
componentDidMount() {
  firebase.auth().onAuthStateChanged(FBUser => {
    if(FBUser) {
      this.setState({
        user: FBUser,
        displayName: FBUser.displayName,
        userID: FBUser.uid,
      });
    }
});

const recipeData = 'http://localhost:4000/recipes/';
const commentData = 'http://localhost:4000/comment/';

fetch(recipeData)
  .then((response) => {
    return response.json();
  })
                .then((data) => {
                    console.log(data)
                    this.setState({
                        dataItem: data
                    })
                })
                .catch((error)=>console.log(error))

            // fetch comment
            fetch(commentData)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    this.setState({
                        commentItem: data
                    })
                })
                .catch((error)=>console.log(error))
            }


            renderItems(userName) {
                return this.state.dataItem.map(item => {
                    let comments = this.state.commentItem.filter(comment => comment.foreignID === item._id);
                    return (
                        <Router>
                            <Chef path="/" userName= {userName} key={item._id} item={item} comments={comments} />                    
                        </Router>
                    )
                });
            }

        registerUser = userName => {
            firebase.auth().onAuthStateChanged(FBUser => {
                FBUser.updateProfile({
                    displayName: userName
                }).then(()=>{
                    this.setState({
                        user: FBUser,
                        displayName: FBUser.displayName,
                        userID: FBUser.uid
                    });
                    navigate('/');
                })
            })
        }

        logOutUser = e => {
            e.preventDefault();
            this.setState({
               displayName: null,
               userID: null,
               user: null 
            });

            firebase.auth().signOut().then(() => {
                navigate('/Login');
            })
        }

    render() {
      return (
        <div>
          <div>
            <Header userName= {this.state.displayName} logOutUser={this.logOutUser} />
          </div>
            <Router><Register path="/Register" userName= {this.state.user} registerUser = {this.registerUser} /></Router>
            <Router><Login path="/Login" userName= {this.state.user} /></Router>
            <Router><Create path="/Create" /></Router>
          <div className="row">
            {this.renderItems(this.state.displayName)}
          </div>
        </div>
      );            
    }
  }
ReactDOM.render(<Main/>, document.getElementById('root'));
