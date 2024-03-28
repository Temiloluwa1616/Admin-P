import React from 'react';
import { useState } from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs'
import { Link } from 'react-router-dom';

const ClientTable = ({ clients, userType  }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  
  const handleEllipsisClick = (clientId) => {
    setShowDropdown(!showDropdown);
    setSelectedClientId(clientId);
  };

  const handleEdit = () => {
    // Implement your edit logic here using selectedClientId
    console.log('Edit client with ID:', selectedClientId);
    setShowDropdown(false);
  };

  const handleDelete = () => {
    // Implement your delete logic here using selectedClientId
    console.log('Delete client with ID:', selectedClientId);
    setShowDropdown(false);
  };
    
    if (!Array.isArray(clients)) {
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
              <th className="px-6 py-3 bg-[#00c691]  text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                Fullname
              </th>
              <th className="px-6 py-3 bg-[#00c691]  text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-[#00c691] text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 bg-[#00c691]  text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 bg-[#00c691]  text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                Details
              </th>
             
              
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 rounded-xl ">
            {clients.map((client, index) => (
              <tr key={client._id} className='rounded-xl '>
                <td className="px-6 py-4 whitespace-no-wrap font-semibold">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {client.fullname}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {client.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {client.phone_number}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {client.duration}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="relative">
                    <button
                      onClick={() => handleEllipsisClick(client._id)}
                      className="focus:outline-none"
                    >
                      <BsThreeDotsVertical/>
                    </button>

                    {showDropdown && selectedClientId === client._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg flex flex-col gap-2 justify-center items-center p-2">
                        {/* Add link to user details page */}
                        <Link to={`/user/${userType}/${client._id}`}>
                          <button className={`text-left w-40 px-4 py-2 text-sm rounded-lg`}>
                            View Details
                          </button>
                        </Link>
                        {/* ... other actions */}
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


export default ClientTable;


