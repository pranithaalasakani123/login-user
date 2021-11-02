import { Fragment, ReactChild, ReactFragment, ReactPortal, useState } from 'react';
import MainNavigation from './MainNavigation';


const Layout = (props: { children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => {
    const [setUserValues]=useState('');
  return (
    <Fragment>
      <MainNavigation setUserValues={setUserValues}  />
      <main >{props.children}</main>
    </Fragment>
  );
};

export default Layout;