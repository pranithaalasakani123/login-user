import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './MainNavigation.module.css';

interface values{
  setUserValues:any;
}


const MainNavigation:React.FC<values> = ({setUserValues}) => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn; 

  const proHandler = async (event : any) =>{
    console.log("clicked");
    let bearerToken = 'Bearer '+authCtx.token;
    const profile = await fetch('https://anisoft.us/chatapp/api/user/getuserdetails', {
      method: 'POST',
      headers: {
        'Authorization': bearerToken,
      }
    });
    try{
      const response = await profile.text();
      console.log(response);
      setUserValues(JSON.parse(response));
    }catch(error){
      console.log('error');
    }
    // .then((res)=>{
      // if(res.ok){
        // return res.text(); 
      // }else{
        // return res.json().then((data)=>{
          // let errMes = 'error';
          // throw new Error(errMes);
        // });
      // }
    // }).then((data)=>{ 
      // console.log(data);
      // setUserValues(data)
    // })
  }


  const logoutHandler =()=>{
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>ReactAuth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
             <li>
               <Link to='/auth'>Login</Link>
             </li>)}
          {isLoggedIn && (
             <li>
               <Link to='/profile' onClick={proHandler}>Profile</Link>
             </li>
          )}
          {isLoggedIn && (
            <li>
               <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;