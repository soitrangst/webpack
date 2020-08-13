import { SOCIAL } from "../constants"

const initalSocial = {
    response: [],
    loading: true,
    error:false
}

export default function (state = initalSocial, action) {
    const response = action.response;
    const err = action.error;
    switch (action.type) {
        case SOCIAL.SOCIAL_LOAD_SUCCESS:
            return { error:false,loading: false, response };
        case SOCIAL.SOCIAL_LOAD_FAIL:
            return { loading: false,error:true, response:err }
        default:
            return state;
    }
}