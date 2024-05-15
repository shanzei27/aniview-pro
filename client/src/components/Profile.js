import React, { useState } from 'react';
import ProfileHeader from './Profile/ProfileHeader';

const Profile = (props) => {
  const [pageData, setPageData] = useState({...props.data});

  return (
   <>
    <ProfileHeader pageData={pageData}/>
   </>
  )
}

export default Profile