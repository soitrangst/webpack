import {MYFOLLOWER} from "../constants/index"

const initMyFollower = {
    response: [],
    loading: true,
    error:false
}

export default function (state = initMyFollower, action) {
    const response = action.response;
    const err = action.error;
    switch (action.type) {
        case MYFOLLOWER.MYFOLLOWER_LOAD:
            return initMyFollower;
        case MYFOLLOWER.MYFOLLOWER_LOAD_SUCCESS:
            return { error:false,loading: false, response };
        case MYFOLLOWER.MYFOLLOWER_LOAD_FAIL:
            return { loading: false,error:true, response:err }
        default:
            return state;
    }
}