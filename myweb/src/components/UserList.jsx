import React, { useState } from 'react';
import moment from 'moment-timezone';
import { Button, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import {Popover,TextField} from '@mui/material';

const UserList = ({ items,setUserList, mode }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const [openPopover, setOpenPopover] = useState(false);
const [userId,setUserId]=useState("")
const[password,setPassword]=useState("")

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };




  const deleteUser = async () => {
    try {
      const response = await fetchFunction({
        reqType: "/DeleteUser",
        UserId: userId,
        RootId: user.UserId,
        RootPassword: password,
        accessToken: user.token
      });
      
      if (response.code === "200") {
       
        const updatedUserList = items.filter((user) => user.userId !== userId);
        setUserList(updatedUserList);

      } else {
        console.log({ message: "delete user list fail? code !== 200", data: response });
      }
    } catch (error) {
      console.log("Failed to delete user.", error);
    }
  };

  return (
    <div style={{ margin: '10px' }}>
      <table className="mt-4 table w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border-2"> Số CCCD </th>
            <th className="py-2 px-4 border-2"> Họ tên </th>
            <th className="py-2 px-4 border-2"> Ngày sinh </th>
            <th className="py-2 px-4 border-2"> Số điện thoại </th>
            <th className="py-2 px-4 border-2"> Mã hộ khẩu </th>
            {mode && <th className="py-2 px-4 border-2"> Thao tác </th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-2">{item.userId}</td>
              <td className="px-4 py-2 border-2">{item.userName}</td>
              <td className="px-4 py-2 border-2">{moment.utc(item.dateOfBirth).tz("Asia/Bangkok").format("DD/MM/YYYY")}</td>
              <td className="px-4 py-2 border-2">{item.phoneNumber}</td>
              <td className="px-4 py-2 border-2">{item.familyId}</td>
              {mode &&
                <td className="px-4 py-2 border-2">
                  <div className='flex justify-center'>
                    <Link className="hover:text-gray-400 bg-green-400 px-3 py-1 font-bold text-white rounded-md" to={`/admin/edit-user/${item.userId}`}>Update</Link>
                    <button className="hover:text-gray-400 bg-red-600 px-3 py-1 font-bold text-white rounded-md" style={{ marginLeft: "10px" }} onClick={()=>{setOpenPopover(true); setUserId(item.userId)}}> Delete</button>
                  </div>
                </td>
              }
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
            deleteUser();
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

export default UserList;