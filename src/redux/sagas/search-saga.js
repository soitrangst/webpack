import {SEARCH_USER} from "../constants";
import {put,call,debounce} from "redux-saga/effects";

import {search} from "../api"

function* handleSearchSaga(payload){
    try {
        const response = yield call(search,payload)
        yield put({type:SEARCH_USER.SEARCH_USER_LOAD_SUCCESS,response})
    } catch (error) {
        yield put({type:SEARCH_USER.SEARCH_USER_LOAD_FAIL,error})
    }
}


function* watchPost (){
    yield debounce(300,SEARCH_USER.SEARCH_USER_LOAD,handleSearchSaga)
}
export default watchPost