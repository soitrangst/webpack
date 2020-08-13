import {MYFOLLOWER} from "../constants";
import {put,call,takeLatest} from "redux-saga/effects";

import {putFollow} from "../api"

function* myFollowerSaga(payload){
    try {
        const response = yield call(putFollow,payload)
        yield put({type:MYFOLLOWER.MYFOLLOWER_LOAD_SUCCESS,response})
    } catch (error) {
        yield put({type:MYFOLLOWER.MYFOLLOWER_LOAD_FAIL,error})
    }
}


function* watchPost (){
    yield takeLatest(MYFOLLOWER.MYFOLLOWER_LOAD,myFollowerSaga)
}
export default watchPost