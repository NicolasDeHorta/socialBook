import { Main } from './Routes/Main';
import { Signin } from './Routes/Signin';


import {
  BrowserRouter as Router, Route , Switch 
} from 'react-router-dom'
import { useState } from 'react';
import firebase from './firebase';


export default function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser"))

  return (
    <Router>
      <div>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
      </div>
    </Router>
 
  )
}
