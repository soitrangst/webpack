import { all } from "redux-saga/effects";

import authSaga from "./auth-saga";
import createPostSaga from "./createPost-saga";
import getSaga from "./get-saga";
import myFollower from "./myFollower-saga";
import search from "./search-saga";
import postID from "./postID-saga"

export default function* rootSaga() {
    yield all([
        authSaga(),
        createPostSaga(),
        getSaga(),
        myFollower(),
        search(),
        postID()
    ])
}