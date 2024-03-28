
// UserDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetailsInterns = () => {
  const { userType, id } = useParams();
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let apiUrl;
  
    switch (userType) {
      case 'client':
        apiUrl = `https://wild-gold-coyote-wear.cyclic.app/api/client/get-single-client/${id}`;
        break;

      case 'intern':
        apiUrl = `https://wild-gold-coyote-wear.cyclic.app/api/intern/get-qrcode/${id}`;
        break;

        case 'visitor':
          apiUrl = `https://wild-gold-coyote-wear.cyclic.app/api/visitor/get-single-visitor/${id}`
          break;
      default:
       
    }
  
   
    axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        setUserData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, [userType, id]);
  

  useEffect(() => {
    const imgs = () => {
      axios.get(`https://wild-gold-coyote-wear.cyclic.app/api/intern/get-qrcode/${id}`)
      .then(response => {
        console.log(response.data.data)
        setImage(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
    }
    imgs()
  }, [id])

  return (
    <div className='bg-[#17E9A3]'>
    <h1 className='text-white'>User Details</h1>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className='flex items-center justify-center min-h-screen'>
      <div>
        <img src={image} alt="" />
        {/* <p className='text-white text-[20px]'>User ID: {userData._id}</p> */}
        <p  className='text-white text-[20px] font-bold'> {userData.firstname}</p>
        {/* Display other user details as needed */}
      </div>
      </div>
     
    )}
  </div>
  );
};

export default UserDetailsInterns;
