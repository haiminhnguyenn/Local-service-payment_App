import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';

import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";

const FamilyList = ({ items,setFamilyList }) => {
  const itemsPerPage = 5; // Adjust the number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const { user} = useAuth();
  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const [openPopover, setOpenPopover] = useState(false);
  const [familyId,setFamilyId]=useState("")
  const[password,setPassword]=useState("")
  
  
  // Function to handle page change
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
};

const deleteFamily = async () => {
  try {
    const response = await fetchFunction({
      reqType: "/Family/Delete",
      RootId: user.UserId,
      RootPassword: password,
      accessToken: user.token,
      FamilyId: familyId
    });
    
    if (response.code === "200") {
      const updatedFamilyList = items.filter((family) => family.familyId !== familyId);
      setFamilyList(updatedFamilyList);


    } else {
      window.alert("Bạn đã nhập sai mật khẩu, vui lòng thao tác lại");
      console.log({ message: "delete family fail? code !== 200", data: response });
    }
  } catch (error) {
    console.log("Failed to delete family.", error);
  }
};

  return (
    <div style={{margin: '10px'}}>
      <table className="mt-4 table w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border-2">Mã hộ khẩu</th>
            <th className="py-2 px-4 border-2">Chủ hộ</th>
            <th className="py-2 px-4 border-2">Địa chỉ</th>
            <th className="py-2 px-4 border-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
          <tr key={index}>
              <td className="px-4 py-2 border-2">{item.familyId}</td>
              <td className="px-4 py-2 border-2">{item.ownerName}</td>
              <td className="px-4 py-2 border-2">{item.address}</td>
              <td className="px-4 py-2 border-2">
                <div className='flex justify-center'>
                  <Link className="hover:text-gray-400 bg-green-400 px-3 py-1 font-bold text-white rounded-md" to={`/admin/edit-family/${item.familyId}`}>Update</Link>
                  <button className="hover:text-gray-400 bg-red-600 px-3 py-1 font-bold text-white rounded-md" style={{ marginLeft: "10px" }} onClick={()=>{setOpenPopover(true); setFamilyId(item.familyId)}}> Delete</button>
                </div>
              </td>
          </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="flex justify-center mt-4" size="large" variant="outlined" color="primary" count={Math.ceil(items.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />

      {openPopover && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded-md">
      <input
        className="border-2 rounded-md px-4 py-2 mr-2"
        type="password"
        placeholder="Xác thực mật khẩu Admin"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={() => {
          if (password === "") {
            window.alert("Mật khẩu rỗng, yêu cầu nhập lại");
          } else {
            setOpenPopover(false);
            deleteFamily();
          }
        }}
      >
        OK
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        type="button"
        onClick={() => setOpenPopover(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}


    </div>
  );
};

export default FamilyList;