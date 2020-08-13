import React,{useEffect} from 'react';
import "./App.css";
import { BrowserRouter, Switch, Route,useHistory } from "react-router-dom"
import {useStore} from "react-redux"
import { Provider } from "react-redux";
import configure from "./redux/store"

import Navbar from "./components/navbar/Navbar";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Signin from "./components/screens/auth/Signin";
import Signup from "./components/screens/auth/Signup";
import CreatePost from "./components/screens/Upload/CreatePost";
import UserProfile from "./components/screens/UserProfile/UserProfile";
import MyFollowing from "./components/screens/MyFollowing";
import PostDetail from "./components/screens/PostDetail/Post";

const store = configure()

const Routing = () => {
  const state = useStore(state=>state.signinReducer)
  const history = useHistory()
  useEffect(()=>{
    const auth = localStorage.getItem('auth')
    if(auth){
    }else{
      history.push('/signin')
    }
  },[state.loading])

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/create" component={CreatePost} />
      <Route path="/profile/:userid" component={UserProfile} />
      <Route path="/myfollowing" component={MyFollowing} />
      <Route path="/post/:id" component={PostDetail} />
      <Route path="**" />
    </Switch>
  )
}


function App() {
  return (
    <Provider store={store}>

      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>

    </Provider>
  );
}

export default App;
