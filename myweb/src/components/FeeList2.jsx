import React, { useState } from 'react';

import { fetchFunction } from '../utils/Fetch';
import { useAuth } from '../hooks/useAuth';
import moment from 'moment-timezone';
import { Pagination } from '@mui/material';

const FeeList2 = ({ items,setFeeList }) => {
    const { user } = useAuth();
    const itemsPerPage = 5; 
    const [currentPage, setCurrentPage] = useState(1);
    const [openPopover, setOpenPopover] = useState(false);
    const [feeid,setFeeId]=useState("")
    const[password,setPassword]=useState("")
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);


   
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const deleteFee = async () => {
        try {
          const response = await fetchFunction({
            reqType: "/Fee/Delete",
            RootId: user.UserId,
            RootPassword: password,
            accessToken: user.token,
            FeeId: feeid
          });
          
          if (response.code === "200") {
            const updatedUserList = items.filter((fee) => fee.feeId != feeid);
            setFeeList(updatedUserList);
          } else {
            window.alert(response.message);
            console.log({ message: "delete fee fail? code !== 200", data: response });
          }
        } catch (error) {
          console.log("Failed to delete fee.", error);
        }
      };
      
    const click_Btn = async (e, feeId) => {
        e.preventDefault();
        try{
            const response = await fetchFunction({
                reqType: '/CompleteFee',
                UserId: user.UserId,
                accessToken: user.token,
                FeeId: feeId
            });
            if(response.code === "200"){
                console.log("success");
                window.location.reload();
            }
            else{
                console.log({message: "fail"});
            }
        }
        catch(error){
            console.log("error?!");
        }
    };

    return (
      <div style={{margin: '10px'}}>
          <table className="mt-4 table w-full">
              <thead>
                  <tr>
                      <th className="py-2 px-4 border-2"> Mã phí </th>
                      <th className="py-2 px-4 border-2"> Tên phí </th>
                      <th className="py-2 px-4 border-2"> Chi tiết </th>
                      <th className="py-2 px-4 border-2"> Ngày tạo </th>
                      <th className="py-2 px-4 border-2"> Loại phí </th>
                      <th className="py-2 px-4 border-2"> Thao tác </th>
                  </tr>
              </thead>
              <tbody>
                  {currentItems.map((item, index) => (
                  <tr key={index}>
                      <td className="px-4 py-2 border-2">{item.feeId}</td>
                      <td className="px-4 py-2 border-2">{item.feeName}</td>
                      <td className="px-4 py-2 border-2">{item.detail}</td>
                      <td className="px-4 py-2 border-2">{moment.utc(item.dateCreate).tz('Asia/Bangkok').format("DD/MM/YYYY")}</td>
                      <td className="px-4 py-2 border-2">{item.isRequired ? "Bắt buộc" : "Không bắt buộc"}</td>
                      <td className="px-4 py-2 border-2">
                        <div className='flex justify-center'>
                          <button className="hover:text-gray-400 px-3 py-1 bg-red-600 font-bold text-white rounded-md" onClick={()=>{setOpenPopover(true); setFeeId(item.feeId)}}> Delete</button>
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
                      deleteFee(feeid);
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

export default FeeList2;