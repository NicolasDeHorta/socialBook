import {useState} from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useUser, useFirebaseApp } from 'reactfire';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const Signin = () => {
    let initialState = ""
    const [email, setEmail] = useState(initialState)
    const [password, setPassword] = useState(initialState)


    const signInWithFirebase = (e) => {
        e.preventDefault()
        console.log("register form triggered")
        
        const auth = getAuth();
        console.log(email, password)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const MySwal = withReactContent(Swal)
             
                MySwal.fire({
                      title: <strong>Error</strong>,
                      html: <i>Ha ocurrido un error, lo sentimos</i>,
                      icon: "error"
                    })
                
                // ..
            });
            setEmail("")
            setPassword("")
            let currentUser = email.split("@")[0]
            localStorage.setItem("currentUser", currentUser)
        }

    return (
        <form className="m-4 card p-5">
            <div className="form-group">
                <label htmlFor="mail">Email</label>
                <input type="email" onChange={e => setEmail(e.target.value)} placeholder="example@mail.com" name="email" className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">password</label>
                <input type="password"  onChange={e => setPassword(e.target.value)} placeholder="Type your password" name="password" className="form-control" value={password}/>
            </div>
            <button className="btn btn-primary m-4" type="submit" onClick={signInWithFirebase}>SignIn</button>
        </form>
        
    )
}