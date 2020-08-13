import {MYFOLLOWINGPOSTS} from "../constants/index"

const initMyFollowing = {
    response: [],
    loading: true,
    error:false
}

export default function (state = initMyFollowing, action) {
    const response = action.response;
    const err = action.error;
    switch (action.type) {
        case MYFOLLOWINGPOSTS.MYFOLLOWINGPOSTS_LOAD_SUCCESS:
            return { error:false,loading: false, response };
        case MYFOLLOWINGPOSTS.MYFOLLOWINGPOSTS_LOAD_FAIL:
            return { loading: false,error:true, response:err }
        default:
            return state;
    }
}