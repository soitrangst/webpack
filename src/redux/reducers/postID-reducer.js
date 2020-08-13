import {POST_ID} from "../constants/index"
import {postInterface} from "../constants/user-Interface"
const initPostID = {
    response: postInterface,
    loading: false,
    error:false
}

export default function (state = initPostID, action) {
    const response = action.response;
    const err = action.error;
    switch (action.type) {
        case POST_ID.POST_ID_LOAD:
            return {response: postInterface,loading: true,error:false};
        case POST_ID.POST_ID_SUCCESS:
            return { error:false,loading: false, response };
        case POST_ID.POST_ID_FAIL:
            return { loading: false,error:true, response:err }
        default:
            return state;
    }
}