import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getSocial } from "../../redux/actions"
import { like, commentPut, deletePost } from "../../redux/api"
import M from "materialize-css"
import { Link } from 'react-router-dom'
import { userInterface } from "../../redux/constants/user-Interface"
import Spinner from "../common/Spinner"
import api from '../../redux/api/api'

export default function Home() {
    const [images, setImages] = useState(userInterface.post)
    const [text, setText] = useState('')
    const { social } = useSelector(state => state)
    const dispatch = useDispatch()
    let userID = !JSON.parse(localStorage.getItem('user')) ? null : JSON.parse(localStorage.getItem('user'))._id

    useEffect(() => {
        dispatch(getSocial())
        if (!social.error) {
            setImages(social.response)
        }

    }, [social.loading])

    const responseReact = async (req) => {
        try {
            const data = await like(req)
            let index = images.findIndex(e => e._id === data._id)
            images[index].like = data.like
            setImages([...images])
        } catch (error) {
            M.toast({ html: error, classes: 'red' })
        }
    }

    const react = (id) => {
        images.map(image => {
            if (image._id === id) {
                let isLike = image.like.indexOf(userID)
                if (isLike === -1) {
                    responseReact({ id, dislike: false })
                } else {
                    responseReact({ id, dislike: true })
                }
            }
        })
    }

    const _post = id => async event => {
        event.preventDefault()
        try {
            if (text) {
                const data = await commentPut(id, text)
                let index = images.findIndex(e => e._id === id)
                images[index].comment = [...data.comment]
                setImages([...images])
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
            const newData = images.filter(e => e._id !== id)
            setImages([...newData])
        } catch (error) {
            M.toast({ html: error, classes: 'red' })
        }
    }

    return (
        images.length == 0 ? <Spinner /> :
            <div className="home">
                {images.map((e) => {
                    let url = e.photo.url
                    let id = e._id
                    let poster = e.postedBy._id
                    let like = e.like.length
                    let comments = e.comment
                    let commentLong = comments.length
                    let isLike = e.like.indexOf(userID) !== -1
                    let urlPost = `/post/`+id
                    return (
                        <div key={id} className="card home-card">
                            <div className="rowC">
                                <span><Link to={`profile/${e.postedBy._id}`}>{e.postedBy.name}</Link></span>
                                {poster === userID ? <i className="material-icons small" onClick={() => _delete(id)}>delete</i> : ''}
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
                                    <span >{like > 1 ? `${like} likes` : `${like} like`}</span>
                                    <h5>{e.title}</h5>
                                    <p style={{ fontWeight: '500' }}>{e.body}</p>
                                    {/* {
                                        comments.map((e) => {
                                            return (
                                                <h6 key={e._id}><span style={{ fontWeight: '300' }}>{e.postedBy.name}: </span>{e.text}</h6>
                                            )
                                        })
                                    } */}
                                   {commentLong === 0 ? '':
                                    <Link to={urlPost}>Read {commentLong >1? `${commentLong} comments` : `${commentLong} comment` }</Link>
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
                    )
                })}
            </div>
    )
}
