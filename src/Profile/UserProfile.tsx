import { useState } from 'react';
import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const [userValues,setUserValues] = useState('');
  return (
    <section  className={classes.profile}>
      {/* <MainNavigation setValue={setValue} /> */}
      <ProfileForm userValues={setUserValues}   />
    </section>
  );
};

export default UserProfile;