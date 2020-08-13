import {MYPOSTS} from "../constants/index"

const initMyposts = {
    response: [],
    loading: true,
    error:false
}

export default function (state = initMyposts, action) {
    const response = action.response;
    const err = action.error;
    switch (action.type) {
        case MYPOSTS.MYPOSTS_LOAD_SUCCESS:
            return { error:false,loading: false, response };
        case MYPOSTS.MYPOSTS_LOAD_FAIL:
            return { loading: false,error:true, response:err }
        default:
            return state;
    }
}