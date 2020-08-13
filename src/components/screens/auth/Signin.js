import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { checkAuth } from "../../../redux/actions/index"
import M from "materialize-css"
import './styles.css'

export default function Signin() {

    const response = useSelector(state => state.signinReducer)
    const announcement = response.response

    const dispatch = useDispatch()
    let history = useHistory();
    let location = useLocation();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const _submit = (e) => {
        e.preventDefault()
        if (email && password) {
            let user = {
                email,
                password
            }
            dispatch(checkAuth(user))
        } else {
            M.toast({
                html: "Please fill all the fields",
                classes: "red",
            })
        }
        setEmail("")
        setPassword("")
    }

    useEffect(() => {
        let auth = localStorage.getItem('auth')
        if (auth) {
            if (announcement) {
                MoveHome()
                M.toast({
                    html: announcement,
                    classes: "light-green darken-3",
                    completeCallback: MoveHome,
                    inDuration: 100,
                    outDuration: 10
                })
            }
            function MoveHome() {
                let { from } = location.state || { from: { pathname: "/" } };
                history.replace(from)

            }

        } else if (!response.loading) {
            if (response.error) {
                M.toast({ html: announcement, classes: "red" })
            }
        }
    }, [response]);

    return (
        <div className="mycard">
            <div className="card auth-card input-field ">
                <h2 className="brand-logo">didi</h2>
                <form action="#" onSubmit={_submit}>

                    <input className="input-auth" type="text"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input className="input-auth" type="password"
                        placeholder="Your password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btn-large waves-effect  red"
                        type="submit" name="action">
                        Login
                    </button>

                </form>
                <div className="my-2">
                    <span>
                        Don't have a account?
                    </span>
                    <Link to="/signup" className=" indigo-text text-darken-3"><span>Sign up</span></Link>
                </div>
            </div>
        </div>
    )
}
