import { useState, useRef, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import AuthContext from '../store/auth-context';
import classes from './AuthForm.module.css';

let obj:string ; 
  const AuthForm = () => {

  const history = useHistory();
  const emailInputRef:any = useRef<HTMLInputElement>(null);
  const passwordInputRef : any= useRef<HTMLInputElement>(null);

  const AuthCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);


  const submitHandler = (event :React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);

    fetch("https://anisoft.us/chatapp/api/user/validateuser", {
      method: "POST",
      body: JSON.stringify({
        username: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.text();
        } else {
          return res.json().then((data) => {
            let errorMessage = "authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
         obj = data;
         AuthCtx.login(obj);
         console.log(obj);
         history.replace('/');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

      
  return (
    <section className={classes.auth}>
      <h1>{'Login'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{ 'Login' }</button>
          )}
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
