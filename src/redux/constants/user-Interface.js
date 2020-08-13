export const userInterface = {
    user: {
        _id: "",
        email: "",
        name: "",
        follower:[],
        following:[]
    },
    post: [
        {
            like: [],
            _id: "",
            title: "",
            body: "",
            photo: {
                url: "",
                photoId: "",
                width: "",
                height: "",
            },
            postedBy: {
                _id: "",
                name: ""
            },
            comment: [
                {
                    _id: "",
                    text: "",
                    postedBy: ""
                }
            ]
        }
    ]
}

export const postInterface =  {
    like: [],
    _id: "",
    title: "",
    body: "",
    photo: {
        url: "",
        photoId: "",
        width: "",
        height: "",
    },
    postedBy: {
        _id: "",
        name: ""
    },
    comment: [
        {
            _id: "",
            text: "",
            postedBy: ""
        }
    ]
}