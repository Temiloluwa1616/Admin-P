
import React, { useEffect, useState } from 'react';
// import QRCode from 'qrcode.react'; 
import axios from "axios";
import { ClipLoader } from 'react-spinners';
import DataTable from "react-data-table-component";
import ClientTable from './ClientTable';
import StaffTable from './StaffTable';
import { useParams } from 'react-router-dom';
import 'animate.css';


const AdminPanel = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [client, setClient] = useState(false)
  const [visitor, setVisitor] = useState(false)
  const [interns, setInterns] = useState(true)
  const [staffs, setStaffs] = useState(false)


  const [getclient, setGetClient] = useState([])
  const [getintern, setGetIntern] = useState([])
  const [getvisitors, setGetVisitors] = useState([])
  const [getstaffs, setGetStaffs] = useState([])

  const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const { userType } = useParams();

  
  


 useEffect(() => {
  const Clients = () => {
    axios.get('https://wild-gold-coyote-wear.cyclic.app/api/client/get-all-clients')
    .then(response => {
      console.log(response.data)
      setGetClient(response.data.data);
    })

    .catch(function(error){
      console.log(error)
    })
  }
  Clients()
  
 }, [])


 useEffect(() => {
  const Staffs = () => {
    axios.get('https://wild-gold-coyote-wear.cyclic.app/api/staff/get-all-staffs')
    .then(response => {
     
      setGetStaffs(response.data.data);
    })

    .catch(function(error){
      console.log(error)
    })
  }
  Staffs()
  
 }, [])

 useEffect(() => {
  const Visitors = () => {
    axios.get('https://wild-gold-coyote-wear.cyclic.app/api/visitor/get-all-visitors')
    .then(response => {
      
      setGetVisitors(response.data.data);
    })
    .catch(function(error){
      console.log(error)
    })
  }
  Visitors()
  
 }, [])

 useEffect(() => {
  const Interns = () => {
    axios.get('https://wild-gold-coyote-wear.cyclic.app/api/intern/get-all-interns')
    .then(response => {
      
      setGetIntern(response.data.data);
    })
    .catch(function(error){
      console.log(error)
    })
  }
  Interns()
  
 }, [])


 useEffect(()=>{   
  const imgs = () => {
      setLoading(true);
      axios.get('https://wild-gold-coyote-wear.cyclic.app/api/client/get-qrcode/65367aca4657f89d586cba8a')
        .then(response => {
          console.log(response.data.data)
          setImage(response.data.data) 
          setLoading(false)})
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          setLoading(false)
        });
  }
  imgs();
},[]);

  const adminName = "Temiloluwa"; 
  const handleClientClick = () => {
    setClient(true);
    setShowQRCode(false)
    setInterns(false)
    setVisitor(false)
    setStaffs(false)
  }

  const handleStaffClick = ()=>{
    setStaffs(true);
    setClient(false)
    setShowQRCode(false)
    setInterns(false)
    setVisitor(false)
    
  }

  const handleVisitorClick = () => {
    setVisitor(true)
    setShowQRCode(false)
    setClient(false)
    setInterns(false)
    setStaffs(false)
  }

  const handleInternClick = () => {
    setInterns(true)
    setClient(false)
    setVisitor(false)
    setShowQRCode(false)
    setStaffs(false)
  }

  const handleQRCodeClick = () => {
    setShowQRCode(true);
    setInterns(false)
    setVisitor(false)
    setClient(false)
    setStaffs(false)
  };

  

  



  return (
    <div className="bg-gray-100 h-screen flex">
      
      <div className="w-1/5 bg-white text-white p-4 flex flex-col justify-center items-center">

      <button className=" text-gray-400 py-2 px-4 mb-2 rounded-full w-full font-semibold" onClick={handleInternClick}>
         INTERNS
        </button>

        <button className=" text-gray-400 py-2 px-4 mb-2 rounded-full w-full font-semibold" onClick={handleClientClick}>
         CLIENTS
        </button>

        <button className=" text-gray-400 py-2 px-4 mb-2 rounded-full w-full font-semibold" onClick={handleVisitorClick}>
          VISITORS
        </button>

        <button className=" text-gray-400 py-2 px-4 mb-2 rounded-full w-full font-semibold" onClick={handleStaffClick}>
          STAFFS
        </button>


        <button className=" text-gray-400 py-2 px-4 mb-2 rounded-full w-full font-semibold" onClick={handleQRCodeClick}>
          QR Code
        </button>
      </div>

      
      <div className="w-4/5 ">
       
        <div className="bg-white p-4 mb-4 shadow-lg">
          <h1 className="text-2xl  font-semibold">Admin Panel</h1>
          <p className=''>Welcome, {adminName}</p>
        </div>

        <div className='p-4'>
        {client && getclient.length > 0 &&(
            <div className='animate__animated animate__fadeInRight rounded-lg'>
                <div>
                    <h1 className='text-center font-bold text-[25px] text-black'>Clients</h1>
                </div>

                <div>
                <ClientTable clients={getclient} userType= 'client'/>
                </div>
            </div>
        )}

       {interns && (
            <div className='animate__animated animate__fadeInRight rounded-lg'>
                <div>
                    <h1 className=' font-bold text-[25px]'>Interns</h1>
                </div>

                <div className='mt-9'>
                <ClientTable clients={getintern} userType='intern'/>
                </div>
            </div>
        )}






       {visitor && (
            <div className='animate__animated animate__fadeInRight rounded-lg'>
                <div>
                    <h1 className='text-center font-bold text-[25px] text-black'>Visitor</h1>
                </div>

                <div>
                <ClientTable clients={getvisitors} userType='visitor' />
                </div>
            </div>
        )}



{staffs && (
            <div className='animate__animated animate__fadeInRight rounded-lg'>
                <div>
                    <h1 className='text-center font-bold text-[25px] text-black'>Staffs</h1>
                </div>

                <div>
                <StaffTable staffs={getstaffs}  />
                </div>
            </div>
        )}

        
        {showQRCode && (
          <div className="bg-[#44B3BB] p-4  h-[33rem] rounded-lg">
            <h2 className="text-xl font-semibold text-white">QR Code</h2>
            <div>
            {loading ? (
              <ClipLoader color="#d67036" loading={loading} size={150} />
            ) : (
            <img src={image} alt="" />
            )}
            </div>
          </div>
        )}
        </div>
       
      </div>
    </div>
  );
};

export default AdminPanel;
