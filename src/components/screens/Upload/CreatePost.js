import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createPost } from "../../../redux/actions/index"
import Spinner from "../../common/Spinner"
import M from "materialize-css"

export default function CreatePost() {
    const stateCreate = useSelector(state => state.createPost)
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState()

    const refresh = () => {
        setBody("")
        setImage("")
        setTitle("")
    }

    useEffect(() => {
        const response = stateCreate.response
        if (response ) {
            if (stateCreate.error) {
                M.toast({ html: response, classes: "red" })
            } else {
                M.toast({
                    html: response,
                    classes: "light-green darken-3",
                    inDuration: 100,
                    outDuration: 10
                })
                refresh()
            }
        }
    }, [stateCreate.loading]);

    const _onSubmit = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('file', image)
        data.append('title', title)
        data.append('body', body)

        if (title && body && image) {
            dispatch(createPost(data))
        } else {
            M.toast({ html: "you must fill all the fields", classes: "red" })
        }
    }

    return (
        (stateCreate.loading) ? <Spinner /> :
            <div
                className="card input-field"
                style={{
                    margin: "10px auto",
                    maxWidth: "500px",
                    padding: "20px",
                    textAlign: "center"
                }}
            >
                <form action="#" onSubmit={_onSubmit}>
                    <input
                        type="text"
                        placeholder="title"
                        value={title}
                        maxLength='100'
                        minLength='1'
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="body"
                        value={body}
                        maxLength='300'
                        minLength='1'
                        onChange={(e) => setBody(e.target.value)}
                    />

                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Upload</span>
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <button className="btn-large waves-effect red" type="submit">
                        Post
            </button>
                </form>
            </div>

    )
}
