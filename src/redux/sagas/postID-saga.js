import {POST_ID} from "../constants";
import {put,call,takeLatest} from "redux-saga/effects";
import {getPostID} from "../api"

function* myPostIDSaga(payload){
    try {
        const response = yield call(getPostID,payload)
        yield put({type:POST_ID.POST_ID_SUCCESS,response})
    } catch (error) {
        yield put({type:POST_ID.POST_ID_FAIL,error})
    }
}


function* watchPostID (){
    yield takeLatest(POST_ID.POST_ID_LOAD,myPostIDSaga)
}
export default watchPostID