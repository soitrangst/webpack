import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getSearchUser } from '../../redux/actions'
import { Link } from "react-router-dom"
import M from "materialize-css"
import './search.css'
export default function SearchLine() {
    const [users, setUsers] = useState([])
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()
    const searchState = useSelector(state => state.searchUser)
    let isQuery = users.length !== 0

    const fetchUser = async (e) => {
        setQuery(e)
        if (e) {
            dispatch(getSearchUser(e))
        }else{
            setUsers([])
        }
    }

    const refreshSearch = () => {
        setUsers([])
        setQuery('')
    }
    useEffect(() => {

        const options={
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%",
        }
        M.Modal.init()
        const response = searchState.response
        if (searchState.error) {
            M.toast({ html: response, classes: 'red' })
        }
        if (response.length !== 0) {
            setUsers(response)
        }

    }, [searchState.loading])

    if (localStorage.getItem('auth')) {
        return (
            <React.Fragment>
                <div className="search-input ">
                    <form>
                        <div className="input-field " style={{ padding: '10px' }}>
                            <input
                                onBlur={()=>{
                                    setTimeout(
                                        ()=> setUsers([]),100)
                                }}
                                autoComplete="off"
                                placeholder="search"
                                style={{ borderBottom: '0.5px ridge ' }}
                                id="search"
                                type="search"
                                value={query}
                                onChange={(e) => fetchUser(e.target.value)} />
                            <label className="label-icon" htmlFor="search"><i className="material-icons black-text">search</i></label>
                            <i className="material-icons" onClick={() => refreshSearch()} >close</i>
                        </div>
                    </form>
                    <div className={isQuery ? "collection" : ""}>
                        {users.map((e) => {
                            let name = e.name
                            let id = e._id
                            let url = `/profile/${id}`
                            let imgUrl = e.photo.url
                            return (
                                <li key={e._id}
                                    className="collection-item avatar"
                                >
                                    <Link
                                        onClick={() => refreshSearch()}
                                        to={url}
                                    >
                                        <img src={imgUrl} alt="" className="circle" />
                                        <span className="title">{name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </div>
                </div>
            </React.Fragment>
        )
    } else {
        return ''
    }
}
