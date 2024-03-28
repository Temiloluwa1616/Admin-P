


// UserDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetailsVisitors = () => {
  const { id,  } = useParams();
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user details by ID
    axios.get(`https://wild-gold-coyote-wear.cyclic.app/api/visitor/get-single-visitor/${id}`)
      .then(response => {
        console.log(response.data)
        setUserData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, [id]);

  useEffect(() => {
    const imgs = () => {
      axios.get(`https://wild-gold-coyote-wear.cyclic.app//api/client/get-qrcode/${id}`)
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

        {/* <p className='text-white text-[20px]'>User ID: {userData._id}</p> */}
        <img src={image} alt="" />
        <p  className='text-white text-[20px] text-center font-bold'> {userData.name}</p>
        
        
      </div>
      </div>
     
    )}
  </div>
  );
};

export default UserDetailsVisitors;
