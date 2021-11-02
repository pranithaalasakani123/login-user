import { useContext, useState } from 'react';
import { Switch, Route,Redirect, BrowserRouter } from 'react-router-dom';
import AuthPage from './Pages/AuthPage';
import HomePage from './Pages/HomePage';
import AuthContext from './store/auth-context';
import ProfileForm from './Profile/ProfileForm';
import MainNavigation from './Layout/MainNavigation';

function App() {
  const [userValues,setUserValues] = useState('');
  const authCtx = useContext(AuthContext)
  return (
    <BrowserRouter>
    <MainNavigation setUserValues={setUserValues}/>
      <Switch >
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth' exact>
          <AuthPage />
        </Route>
        <Route path='/profile'>
        {authCtx.isLoggedIn && <ProfileForm userValues={userValues}  />}
        {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>
        <Route path='*'>
          <Redirect to="/" />
        </Route>
      </Switch>
      </BrowserRouter>

  );
}

export default App;