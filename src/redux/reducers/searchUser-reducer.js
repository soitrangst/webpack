import { SEARCH_USER } from "../constants"

const initSearch = {
    response: [],
    loading: false,
    error:false
}

export default function (state = initSearch, action) {
    const response = action.response;
    const err = action.error;
    switch (action.type) {
        case SEARCH_USER.SEARCH_USER_LOAD:
            return { error:false,loading: true, response:[] };
        case SEARCH_USER.SEARCH_USER_LOAD_SUCCESS:
            return { error:false,loading: false, response };
        case SEARCH_USER.SEARCH_USER_LOAD_FAIL:
            return { loading: false,error:true, response:err }
        default:
            return state;
    }
}