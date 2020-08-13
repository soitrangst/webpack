import {CREATEPOST} from "../constants";
import {put,call,takeLatest} from "redux-saga/effects";

import {createPost} from "../api"

function* handlePostSaga(payload){
    try {
        const response = yield call(createPost,payload)
        yield put({type:CREATEPOST.CREATEPOST_LOAD_SUCCESS,response})
    } catch (error) {
        yield put({type:CREATEPOST.CREATEPOST_LOAD_FAIL,error})
    }
}


function* watchPost (){
    yield takeLatest(CREATEPOST.CREATEPOST_LOAD,handlePostSaga)
}
export default watchPost