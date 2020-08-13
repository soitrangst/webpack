const env = 'https://apididi.herokuapp.com'
//const env = 'http://localhost:5000'

const api = {
    signup: `${env}/signup`,
    signin: `${env}/signin`,
    createPost:`${env}/createpost`,
    posts:`${env}/posts`,
    myposts:`${env}/mypost`,
    like: `${env}/like`,
    unlike:`${env}/unlike`,
    comment:`${env}/comment`,
    delete: `${env}/deletepost/`,
    userProfile:`${env}/user/`,
    follow:`${env}/follow`,
    unfollow:`${env}/unfollow`,
    myfollowingPosts:`${env}/subposts`,
    updateAvartar: `${env}/updateavartar`,
    searchUser: `${env}/search-users`,
    env,
    postUrl: `${env}/post/`
}

export default api;