import React from 'react';
import { useState } from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs'
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const StaffTable = ({ staffs }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [adminStatus, setAdminStatus] = useState({});
  console.log('Selected Staff ID:', selectedStaffId);

  const handleEllipsisClick = (staffId) => {
    setShowDropdown(!showDropdown);
    setSelectedStaffId(staffId);
  };

  
  const handleMakeAdmin = () => {
    const selectedStaff = staffs.find(staff => staff._id === selectedStaffId);

  if (!selectedStaff) {
    console.error('Selected staff not found');
    return;
  }

  const staffEmail = selectedStaff.email;
  console.log(staffEmail)
    axios
      .post(`https://wild-gold-coyote-wear.cyclic.app/api/admin/make-admin/${selectedStaffId}`, {

      email: staffEmail
      })
      .then((response) => {
       
        if (response.status === 200) {
            alert("Admin status updated successfully:")
          console.log('Admin status updated successfully:', response.data);
  
          // Update the local state only if the API call was successful
          setAdminStatus((prevStatus) => ({
            ...prevStatus,
            [selectedStaffId]: !prevStatus[selectedStaffId],
          }));

          localStorage.setItem(`is_admin_${selectedStaffId}`, JSON.stringify(!selectedStaff.is_admin));
  
        } else {
          console.error('Error updating admin status:', response.data);
        
        }
      })
      .catch((error) => {
        console.error('Error updating admin status:', error);
      
      });
  };
  
  const handleRevokeAdmin = () => {
    const selectedStaff = staffs.find((staff) => staff._id === selectedStaffId);

    if (!selectedStaff) {
      console.error('Selected staff not found');
      return;
    }

    const staffEmail = selectedStaff.email;

    axios
      .delete(`https://wild-gold-coyote-wear.cyclic.app/api/admin/revoke-admin/${selectedStaffId}`, {
        data: {
          email: staffEmail,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Admin status has been Revoked");

          // Update the local state only if the API call was successful
          setAdminStatus((prevStatus) => ({
            ...prevStatus,
            [selectedStaffId]: false,
          }));

          localStorage.setItem(`is_admin_${selectedStaffId}`, JSON.stringify(false));
        } else {
          console.error('Error updating admin status:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error updating admin status:', error);
      });
  };



  useEffect(() => {
    const initialAdminStatus = {};
    staffs.forEach((staff) => {
      const storedStatus = localStorage.getItem(`is_admin_${staff._id}`);
      initialAdminStatus[staff._id] = storedStatus ? JSON.parse(storedStatus) : staff.is_admin;
    });
    setAdminStatus(initialAdminStatus);
  }, [staffs]);

  
    
    if (!Array.isArray(staffs)) {
        return null;
      }


  return (
    <div className="overflow-x-auto shadow-lg rounded">
      <div className='max-h-[29rem] '>
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead>
            <tr className=''>
              <th className="px-6  py-3 bg-[#00c691] text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                No
              </th>
              <th className="px-6  py-3 bg-[#00c691] text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 bg-[#00c691]  text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                Firstname
              </th>
              <th className="px-6 py-3 bg-[#00c691]  text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                LastName
              </th>
              <th className="px-6 py-3 bg-[#00c691] text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
               Email
              </th>
              <th className="px-6 py-3 bg-[#00c691]  text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
               Phone
              </th>
              <th className="px-6 py-3 bg-[#00c691]  text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                Action
              </th>
              
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 rounded-xl ">
            {staffs.map((staff, index) => (
              <tr key={staff._id} className='rounded-xl '>
                <td className="px-6 py-4 whitespace-no-wrap ">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap ">
                  {staff.designation}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {staff.firstname}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {staff.lastname}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {staff.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {staff.phone_number}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="relative">
                    <div>
                    <button
                      onClick={() => handleEllipsisClick(staff._id)}
                      className="focus:outline-none"
                    >
                      <BsThreeDotsVertical/>
                    </button>

                    <Link to={`/user/${staff._id}`} className="text-[#00c691]">
                      View Details
                    </Link>
                    </div>
                    

                    {showDropdown && selectedStaffId === staff._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg flex flex-col gap-2 justify-center items-center p-2">
                      {adminStatus[staff._id] ? (
                        <button
                          onClick={handleRevokeAdmin}
                          className={`text-left bg-red-500 w-40 px-4 py-2 text-sm text-white rounded-lg`}
                        >
                          Revoke Admin
                        </button>
                      ) : (
                        <button
                          onClick={handleMakeAdmin}
                          className={`text-left bg-[#00c691] w-40 px-4 py-2 text-sm text-white rounded-lg`}
                        >
                          Make Admin
                        </button>
                      )}
                    </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default StaffTable;


