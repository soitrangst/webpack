import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getPostID } from '../../../redux/actions'
import { like, commentPut, deletePost } from "../../../redux/api"
import M from "materialize-css"
import { Link, useParams,useHistory } from 'react-router-dom'
import { postInterface } from "../../../redux/constants/user-Interface"
import Spinner from "../../common/Spinner"

export default function Post() {
    let userID = !JSON.parse(localStorage.getItem('user')) ? null : JSON.parse(localStorage.getItem('user'))._id
    const [post, setPost] = useState(postInterface)
    const [text, setText] = useState('')
    let history = useHistory()

    const postIDState = useSelector(state => state.postID)
    const dispatch = useDispatch()
    const postID = useParams()

    useEffect(() => {
        dispatch(getPostID(postID))
    }, [])

    useEffect(() => {
        if (!postIDState.error) {
            setPost(postIDState.response)
        }
    }, [postID, postIDState.loading])

    const responseReact = async (req) => {
        try {
            const data = await like(req)
            let newLike = data.like
            setPost({...post,like:newLike})
        } catch (error) {
            M.toast({ html: error, classes: 'red' })
        }
    }

    const react = (id) => {
                let isLike = post.like.indexOf(userID)
                if (isLike === -1) {
                    responseReact({ id, dislike: false })
                } else {
                    responseReact({ id, dislike: true })
                }
    }

    const _post = id => async event => {
        event.preventDefault()
        try {
            if (text) {
                const data = await commentPut(id, text)
                setPost({...post,comment:data.comment})
            }
        } catch (error) {
            M.toast({ html: error, classes: 'red' })
        }
        setText('')
    }

    const _delete = async (id) => {
        try {
            const response = await deletePost(id)
            M.toast({ html: response, classes: 'light-green darken-3' })
            history.push('')
        } catch (error) {
            M.toast({ html: error, classes: 'red' })
        }
    }

    let url = post.photo.url,
        posterID = post.postedBy._id,
        id = post._id,
        poster = post.postedBy.name,
        longLike = post.like.length,
        comments = post.comment,
        commentLong = comments.length,
        isLike = post.like.indexOf(userID) !== -1,
        title = post.title,
        body = post.body

    return (
        !post._id ? <Spinner /> :
            <div className="home">
                <div key={id} className="card home-card">
                    <div className="rowC">
                        <span><Link to={`profile/${id}`}>{poster}</Link></span>
                        {posterID === userID ? <i className="material-icons small" onClick={() => _delete(id)}>delete</i> : ''}
                    </div>
                    <div className="card-image" onClick={() => react(id)}>
                        <img
                            src={url}
                            alt="user" />
                    </div>
                    {!userID ? '' :
                        <div className="card-content">
                            <section>
                                {isLike ? <i className="small red-text text-accent-4 material-icons" onClick={() => react(id)}>favorite</i> :
                                    <i className="small material-icons" onClick={() => react(id)}>favorite_border</i>
                                }
                            </section>
                            <span >{longLike > 1 ? `${longLike} likes` : `${longLike} like`}</span>
                            <h5>{title}</h5>
                            <p style={{ fontWeight: '500' }}>{body}</p>
                            {
                                comments.map((e) => {
                                    return (
                                        <h6 key={e._id}><span style={{ fontWeight: '300' }}>{e.postedBy.name}: </span>{e.text}</h6>
                                    )
                                })
                            }
                            <form action="#" onSubmit={_post(id)}>

                                <div className="row">
                                    <div className="input-field input-button">
                                        <input
                                            type="text"
                                            minLength="1"
                                            maxLength='200'
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="comment" />
                                        <a className="btn-flat" onClick={_post(id)}>Post</a>
                                    </div>
                                </div>
                            </form>

                        </div>
                    }
                </div>

            </div>
    )
}
