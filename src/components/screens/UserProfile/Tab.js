import React from 'react'


export default function Tab(props) {

    const { userid, _follow, followerArr } = props
    let ownerID = !JSON.parse(localStorage.getItem('user')) ? null : JSON.parse(localStorage.getItem('user'))._id

    function _followAction(userid) {
        _follow(userid)
    }

    const profile = () => {
        let isFollower = followerArr.indexOf(ownerID)
        if (ownerID === userid || !userid) {
            return <i className="material-icons small">settings</i>
        } if (isFollower !== -1) {
            return (<div className='rowC' style={{ width: 'max-content' }}>
                <i className="material-icons small  green-text text-accent-3">beenhere</i>
                <a className="waves-effect  cyan lighten-5 btn ">chat</a>
                <a className="waves-effect  cyan lighten-5 btn " onClick={() => { _followAction({ id: userid, unfollow: true }) }}>unfollow</a>
            </div>)
        } else {
            return <a className="waves-effect  cyan lighten-5 btn " onClick={() => { _followAction({ id: userid, unfollow: false }) }}>follow</a>
        }

    }
    return (
        <React.Fragment>
            {profile()}
        </React.Fragment>
    )
}


// const _toggleFollow = () => {
//     let isFollower = followerArr.indexOf(ownerID)
//     if (isFollower === -1) {
//         <a className="waves-effect  cyan lighten-5 btn " onClick={() => { _followAction(userid) }}>follow</a>
//     } else {
//         <a className="waves-effect  cyan lighten-5 btn " onClick={() => { _followAction(userid) }}>unfollow</a>
//     }
// }

//<a className="waves-effect green accent-3 btn" onClick={()=>_follow(userid)}>follow</a>
// const Profile = (props) => {

//     const { userid, _follow,followerArr,ownerID } = props

//     console.log(followerArr);
//     if (ownerID === userid || !userid) {
//         return <i className="material-icons small">settings</i>
//     } else {
//         return (
//             <div className='rowC' style={{ width: 'max-content' }}>
//                 <i className="material-icons small  green-text text-accent-3">beenhere</i>
//                 <a className="waves-effect  cyan lighten-5 btn ">chat</a>
//                 {/* {_toggleFollow()} */}
//             </div>
//         )
//     }
// }