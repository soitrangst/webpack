import { combineReducers } from 'redux';
import signinReducer from "./signin-reducer";
import signupReducer from "./signup-reducer";
import createPost from "./createPost-reducer";
import social from "./social-reducer";
import myPosts from './myPosts-reducer';
import myFollower from "./myFollower-reducer";
import myFollowing from "./myFollowing-reducer";
import searchUser from "./searchUser-reducer";
import postID from "./postID-reducer"

const rootReducer = combineReducers({
    signinReducer,
    signupReducer,
    createPost,
    social,
    myPosts,
    myFollower,
    myFollowing,
    searchUser,
    postID
})

export default rootReducer