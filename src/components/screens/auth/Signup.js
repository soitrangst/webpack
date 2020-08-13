import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import M from "materialize-css"
import './styles.css'
import { signUp } from "../../../redux/actions/index"

export default function Signup() {
    const dispatch = useDispatch()
    const response = useSelector(state => state.signupReducer)
    const annoucement = response.response
    let history = useHistory();
    let location = useLocation();

    const [name, setName] = useState({ text: "", invalid: false })
    const [email, setEmail] = useState({ text: "", invalid: false })
    const [password, setPassword] = useState({ text: "", invalid: false })
    const [repassword, setReassword] = useState({ text: "", invalid: false })
    const [image, setImage] = useState()
    const [warning, setWarning] = useState({ invalid: false, content: "" })

    const refreshForm = () => {
        setName({ text: "", invalid: false })
        setEmail({ text: "", invalid: false })
        setPassword({ text: "", invalid: false })
        setReassword({ text: "", invalid: false })
        setWarning({ content: "", invalid: false })
        setImage()
    }
    useEffect(() => {
        if (!response.loading) {
            if (response.error) {
                M.toast({ html: annoucement, classes: "red" })
            } else {
                M.toast({
                    html: annoucement,
                    classes: "light-green darken-3",
                    completeCallback: MoveSignin,
                    inDuration: 100,
                    outDuration: 10
                })
                function MoveSignin() {
                    let { from } = location.state || { from: { pathname: "/signin" } };
                    history.replace(from)
                }
            }
        }
    }, [response]);

    const validateEmail = (email) => {
        if (email.match(/\S+@\S+\.\S+/)) {
            return (true)
        }
        return (false)
    }

    const validatePass = (pass) => {
        if (pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
            return (true)
        }
        return (false)
    }

    const _post = (e) => {
        e.preventDefault()
        console.log(image);
        if (!name.text && !email.text && !password.text && !repassword.text && !image) {
            M.toast({
                html: "Please fill all the fields",
                classes: "red",
            })
            refreshForm()
        }
        else {
            let emailValid = validateEmail(email.text)
            let passwordValid = validatePass(password.text)
            //pass has at least 6 to 20 charactes and special symbol
            if (!emailValid) {
                setEmail({ text: "", invalid: true })
            }
            else if (!passwordValid) {
                setPassword({ text: "", invalid: true })
            }
            else if (password.text !== repassword.text) {
                setWarning({ invalid: true, content: "your two password weren't match" })
            } else {
                const user = new FormData()
                user.append('name', name.text)
                user.append('email', email.text)
                user.append('password', password.text)
                user.append('image', image)

                dispatch(signUp(user))
                refreshForm()
            }
        }

    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field ">
                <h2 className="brand-logo" >didi</h2>
                <form action="#" onSubmit={_post}>

                    <input className="input-auth" type="text"
                        placeholder="Your account"
                        value={name.text}
                        onChange={(e) => setName({ invalid: false, text: e.target.value })}
                    />

                    <input className="input-auth" type="text"
                        placeholder="Your email"
                        value={email.text}
                        onChange={(e) => setEmail({ invalid: false, text: e.target.value })}
                    />
                    {email.invalid ? <span className="red-text text-accent-4">your email wasn't right</span> : ""}
                    <input className="input-auth" type="password"
                        placeholder="Your password"
                        value={password.text}
                        autoComplete="off"
                        onChange={(e) => setPassword({ invalid: false, text: e.target.value })}
                    />
                    {password.invalid ?
                        <span className="red-text text-accent-4">
                            Input Password and Submit 6 to 20
                            characters which contain at least one numeric digit, one uppercase and one lowercase letter
                        </span> : ""}
                    <input className="input-auth" type="password"
                        placeholder=" Please re-password"
                        value={repassword.text}
                        autoComplete="off"
                        onChange={(e) => setReassword({ invalid: false, text: e.target.value })}
                    />
                    {repassword.invalid ? <span className="red-text text-accent-4"><span>Input Password and Submit 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter</span></span> : ""}
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>your avartar</span>
                            <input
                                className="input-auth" type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="input-auth" className="file-path validate" type="text" />
                        </div>
                    </div>
                    <button
                        className="btn-large waves-effect  red" type="submit">
                        Sign Up
                    </button>
                    {warning.invalid ? <span className="red-text text-accent-4">your passwords weren't match</span> : ""}
                </form>
                <div className="my-2">
                    <span>
                        Already have a account?
                    </span>
                    <Link to="/signin" className=" indigo-text text-darken-3"><span>Sign in</span></Link>
                </div >
            </div>
        </div>
    )
}
