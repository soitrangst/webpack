import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tab from "./Tab";
import { putFollower } from "../../../redux/actions";
import M from "materialize-css"
import Avatar from "./common/Avartar"

export default function MHeaderProfile(props) {
    const { userid, myData } = props
    let photoUrl = myData.user.photo ? myData.user.photo.url : null
    const [photo, setPhoto] = useState(photoUrl)
    const [data, setData] = useState({
        name: myData.user.name,
        _userid: userid,
        email: myData.user.email,
        post: myData.post.length,
        follower: myData.user.follower.length,
        followerArr: myData.user.follower,
        following: myData.user.following.length,
    })
    let { name, email, post, follower, followerArr, following } = data
    const headerState = useSelector(state => state.myFollower)
    const dispatch = useDispatch()

    useEffect(() => {
        let dataResponse = headerState.response.result
        if (!headerState.loading) {
            if (headerState.error) {
                M.toast({ html: headerState.error, classes: "red" })
            } else if (dataResponse) {
                let newFollower = dataResponse.follower
                let newFollowing = dataResponse.following
                setData({ ...data, follower: newFollower.length, following: newFollowing.length, followerArr: newFollower })
            }
        }
    }, [headerState.loading,userid])

    const _follow = (passFollower) => {
        dispatch(putFollower(passFollower))
    }

    return (
        <div className="profile-title-M">
            <div className='rowC'>
            <Avatar photo={photo} />
                <div className='rowD'>
                    <h4>{name}</h4>
                    <Tab _follow={_follow} userid={userid} followerArr={followerArr} />
                </div>
            </div>
            <h4 style={{ textAlign: 'center' }}>{email}</h4>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{post > 1 ? `${post} posts` : `${post} post`}</span>
                <span>
                    {follower > 1 ?
                        `${follower} followers` :
                        `${follower} follower`}
                </span>
                <span>
                    {following > 1 ?
                        `${following} followings` :
                        `${following} following`}
                </span>
            </div>

        </div>
    )
}
