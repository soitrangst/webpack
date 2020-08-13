import apiURL from "./api"


const Signin = async (resquest) => {
    const { user } = resquest
    const requestOption = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }
    try {
        const response = await fetch(apiURL.signin, requestOption)
        const data = await response.json()

        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            localStorage.setItem('auth', true)
            localStorage.setItem('accessToken', data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            return data.message
        }
    } catch (error) {
        throw error
    }

}

const Signup = async (resquest) => {
    const { user } = resquest
    const requestOption = {
        method: 'POST',
        body: user
    }

    try {
        const response = await fetch(apiURL.signup, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data.message
            return response
        }
    } catch (error) {
        throw error
    }
}

const createPost = async (resquest) => {
    const { post } = resquest
    const requestOption = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: post
    }
    try {
        const response = await fetch(apiURL.createPost, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data.message
            return response
        }
    } catch (error) {
        throw error
    }
}

const social = async () => {
    const requestOption = {
        method: 'GET'
    }
    try {
        const response = await fetch(apiURL.posts, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data.posts
            return response
        }
    } catch (error) {
        throw error
    }
}

const myposts = async () => {
    const requestOption = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
    try {
        const response = await fetch(apiURL.myposts, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data.myPosts
            return response
        }
    } catch (error) {
        throw error
    }
}

const like = async (req) => {
    const { id, dislike } = req
    let url = dislike ? apiURL.unlike : apiURL.like
    let body = {
        postID: id
    }
    const requestOption = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(body)
    }
    try {
        const response = await fetch(url, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data
            return response
        }
    } catch (error) {
        throw error
    }
}

const commentPut = async (id, text) => {
    let body = {
        postID: id,
        text
    }
    const requestOption = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(body)
    }
    try {
        const response = await fetch(apiURL.comment, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data
            return response
        }
    } catch (error) {
        throw error
    }
}

const deletePost = async (id) => {

    const requestOption = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }
    try {
        const response = await fetch(apiURL.delete + id, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data.message
            return response
        }
    } catch (error) {
        throw error
    }
}

const getUserProfile = async (id) => {

    const requestOption = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }
    try {
        const response = await fetch(apiURL.userProfile + id, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data
            return response
        }
    } catch (error) {
        throw error
    }
}

const putFollow = async (req) => {
    const { passFollower } = req
    const { id, unfollow } = passFollower
    let url = unfollow ? apiURL.unfollow : apiURL.follow
    let body = {
        userID: id
    }
    const requestOption = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(body)
    }
    try {
        const response = await fetch(url, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data
            return response
        }
    } catch (error) {
        throw error
    }
}

const myfollowing = async () => {
    const requestOption = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
    try {
        const response = await fetch(apiURL.myfollowingPosts, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data.posts
            return response
        }
    } catch (error) {
        throw error
    }
}

const putAvartar = async (photo) => {
    console.log(photo);
    const requestOption = {
        method: 'PUT',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: photo
    }
    try {
        const response = await fetch(apiURL.updateAvartar, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data
            return response
        }
    } catch (error) {
        throw error
    }
}
const search = async (payload) => {
    const {query} = payload
    let search = {
        query
    }
    const requestOption = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(search)
    }
    try {
        const response = await fetch(apiURL.searchUser, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let responses = data.user
            console.log(responses);
            return responses
        }
    } catch (error) {
        throw error
    }
}

const getPostID = async (payload) => {
    const {postID} = payload
    const id = postID.id
    const requestOption = {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
    }
    try {
        const response = await fetch(apiURL.postUrl + id, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data.post
            return response
        }
    } catch (error) {
        throw error
    }
}
export {
    Signin,
    Signup,
    createPost,
    social,
    myposts,
    like,
    commentPut,
    deletePost,
    getUserProfile,
    putFollow,
    myfollowing,
    putAvartar,
    search,
    getPostID
}