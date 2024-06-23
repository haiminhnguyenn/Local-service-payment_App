import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import LoadingScreen from "../components/LoadingScreen";
import BillList from "../components/BillList";
import SearchIcon from '@mui/icons-material/Search';

function BillManage() {
  const { user } = useAuth();

  const [feeList, setFeeList] = useState();
  
  
  const [searchValue, setSearchValue] = useState('');
  const [searchMode, setSearchMode] = useState(null);

  const handleSearchStatusChange = (status) => setSearchMode(() => (searchMode === status ? null : status));

  const fetchBillList = async () => {
    try {
      const list = await fetchFunction({
        reqType: "/Bill/GetListAll", 
        RootId: user.UserId,
        accessToken: user.token
      });
      const uList = await fetchFunction({
        reqType: "/GetListUser", 
        UserId: user.UserId,
        accessToken: user.token
      });
      if(list.code == "200"){
        for(let i = 0; i < list.data.length; i++){
          for(let j = 0; j < uList.data.length; j++){
            if(list.data[i].userId === uList.data[j].userId){
              list.data[i].userName = uList.data[j].userName;
            }
          }
        }
        setFeeList(list.data);
      }
      else{
        console.log({message: "get user list fail? code !== 200", data: user});
      }
    } catch (error) {
      console.log("get fee list fail?");
    }
  };

  const fetchBillListWithSearch = async () => {
    if(searchValue.trim()!=='') {
      if(searchMode===null) {
        try {
          const list = await fetchFunction({
            reqType: "/Bill/GetListAll", 
            RootId: user.UserId,
            accessToken: user.token
          });
          const uList = await fetchFunction({
            reqType: "/GetListUser", 
            UserId: user.UserId,
            accessToken: user.token
          });
          if (list.code == "200") {
            for(let i = 0; i < list.data.length; i++){
              for(let j = 0; j < uList.data.length; j++){
                if(list.data[i].userId === uList.data[j].userId){
                  list.data[i].userName = uList.data[j].userName;
                }
              }
            }
            let tempList = list.data.filter((bill) => bill.userName.includes(searchValue));
            setFeeList(tempList);
          } else {
            setFeeList([])
            console.error({ message: "Lấy danh sách phí thất bại", data: list });
          }
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phí:", error);
        }
      } 
      else if(searchMode==='familyId') {
        try {
          const list = await fetchFunction({
            reqType: "/Bill/GetListAll", 
            RootId: user.UserId,
            accessToken: user.token
          });
          if (list.code === "200") {
            let tempList = list.data.filter((bill) => bill.familyId.includes(searchValue));
            setFeeList(tempList);
          } else {
            setFeeList([]);
            console.error({ message: "Lấy danh sách phí thất bại", data: list });
          }
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phí:", error);
        }
      }
      else {
        try {
          const list = await fetchFunction({
            reqType: "/Bill/GetListAll", 
            RootId: user.UserId,
            accessToken: user.token
          });
          
          if (list.code == "200") {
            let tempList = list.data.filter((bill) => bill.feeId.includes(searchValue));
            setFeeList(tempList);
          } else {
            setFeeList([])
            console.error({ message: "Lấy danh sách phí thất bại", data: list });
          }
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phí:", error);
        }
      }
    }
    else {
      fetchBillList();
    }
  };
  

  useEffect(() => {
    fetchBillList();
  }, []);

  return (
    <div>
      {feeList ? 
        <div className="ml-8 mt-10 h-screen">
          <h1 className="text-center mb-5 text-2xl mt-4 font-bold text-[28px]">
            Thông tin các hoá đơn đã thanh toán
          </h1>

          <div className=" w-full flex">
            <Link to='/admin/addbill' className="h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
              Thanh toán hoá đơn mới
            </Link>

            <form className="container w-2/3 mx-auto justify-center items-center">
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo mã"
                  id="FamilyId"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full px-3 py-2 text-default border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="button"
                  className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={fetchBillListWithSearch}
                >
                  <SearchIcon />
                </button>
              </div>

              <div className="flex items-center ml-3 mt-2">
                <label className="mr-2">
                  <input
                    type="checkbox"
                    checked={searchMode === 'familyId'}
                    onChange={() => handleSearchStatusChange('familyId')}
                    className="mr-2 form-checkbox text-blue-500 focus:ring focus:border-blue-300"
                  />
                  <span className="text-blue-500">Mã hộ</span>
                </label>


                <label className="mr-2">
                  <input
                    type="checkbox"
                    checked={searchMode === 'feeId'}
                    onChange={() => handleSearchStatusChange('feeId')}
                    className="mr-2 form-checkbox text-red-500 focus:ring focus:border-red-300"
                  />
                  <span className="text-red-500">Mã phí</span>
                </label>
              </div>
            </form>
          </div>
          <BillList items={feeList}/>
        </div> : <LoadingScreen/>
      }
    </div>
  );
}

export default BillManage;
