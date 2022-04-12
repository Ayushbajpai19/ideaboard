import './App.css';
// import firebase from 'firebase/app';
import 'firebase/auth';
// import { useEffect, useState } from 'react';

import Register from './pages/Register';

function App() {

  // const [auth, setAuth] = useState(
	// 	false || window.localStorage.getItem('auth') === 'true'
	// );
	// const [token, setToken] = useState('');

	// useEffect(() => {
  //   loginWithEmail("email", "password");
	// 	firebase.auth().onAuthStateChanged((userCred) => {
	// 		if (userCred) {
	// 			setAuth(true);
	// 			window.localStorage.setItem('auth', 'true');
	// 			userCred.getIdToken().then((token) => {
	// 				setToken(token);
	// 			});
	// 		}
	// 	});
	// }, []);

	// const loginWithEmail = (email, password) => {
	// 	firebase
	// 		.auth()
	// 		.signInWithEmailAndPassword("email@gmail.com", "password")
	// 		.then((userCred) => {
	// 			if (userCred) {
	// 				setAuth(true);
	// 				window.localStorage.setItem('auth', 'true');
	// 			}
	// 		});
	// };

  return (
    <div className="App">
      <header className="App-header">
       <Register />
      </header>
    </div>
  );
}

export default App;
