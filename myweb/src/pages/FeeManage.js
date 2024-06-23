import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import FeeList2 from "../components/FeeList2";
import LoadingScreen from "../components/LoadingScreen";
import SearchIcon from '@mui/icons-material/Search';

function FeeManage() {
  const { user } = useAuth();
  const [feeList, setFeeList] = useState();
  const [searchFeeNameValue, setSearchFeeNameValue] = useState('');
  const [searchFeeType, setSearchFeeType] = useState();
  const [searchStatus, setSearchStatus] = useState();

  const handleFeeTypeStatusChange = (status) => setSearchFeeType(() => (searchFeeType === status ? null : status));

  const fetchFeeList = async () => {
    try {
      const list = await fetchFunction({
        reqType: "/Fee/getListFee", 
        UserId: user.UserId,
        accessToken: user.token
      });
      if(list.code == "200"){
        setFeeList(list.data);
      }
      else{
        console.log({message: "get user list fail? code !== 200", data: user});
      }
    } catch (error) {
      console.log("get fee list fail?");
    }
  };

  const fetchFeeListByFeeName = async () => {
    if(searchFeeNameValue.trim()!=='') {
      if(searchFeeType) {
        try {
          const list = await fetchFunction({
            reqType: "/Fee/getListFee" + searchFeeType, 
            UserId: user.UserId,
            accessToken: user.token
          });
      
          if (list.code == "200") {
            let tempList = list.data.filter((fee) => fee.feeName.includes(searchFeeNameValue));
            setFeeList(tempList);
            if(tempList.length > 0) {
              setSearchStatus("success");
            }
            else {
              setSearchStatus("fail");
            }
          } else {
            setFeeList([]);
            setSearchStatus("fail");
            console.error({ message: "Lấy danh sách phí thất bại", data: list });
          }
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phí:", error);
        }
      } 
      else {
        try {
          const list = await fetchFunction({
            reqType: "/Fee/getListFee", 
            UserId: user.UserId,
            accessToken: user.token
          });
          
          if (list.code == "200") {
            let tempList = list.data.filter((fee) => fee.feeName.includes(searchFeeNameValue));
            setFeeList(tempList);
            if(tempList.length > 0) {
              setSearchStatus("success");
            }
            else {
              setSearchStatus("fail");
            }
          } else {
            setFeeList([]);
            setSearchStatus("fail");
            console.error({ message: "Lấy danh sách phí thất bại", data: list });
          }
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phí:", error);
        }
      }
    }
    else {
      if(searchFeeType) {
        try {
          const list = await fetchFunction({
            reqType: "/Fee/getListFee" + searchFeeType, 
            UserId: user.UserId,
            accessToken: user.token,
          });
          
          if (list.code == "200") {
            setFeeList(list.data);
            setSearchStatus("success");
          } else {
            setFeeList([]);
            setSearchStatus("fail");
            console.error({ message: "Lấy danh sách phí thất bại", data: list });
          }
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phí:", error);
        }
      }
      else{
        try {
          const list = await fetchFunction({
            reqType: "/Fee/getListFee", 
            UserId: user.UserId,
            accessToken: user.token,
          });
          
          if (list.code === "200") {
            setFeeList(list.data);
            setSearchStatus("success");
          } else {
            setFeeList([]);
            setSearchStatus("fail");
            console.error({ message: "Lấy danh sách phí thất bại", data: list });
          }
        } catch (error) {
          console.error("Lỗi khi lấy danh sách phí:", error);
        }
      }
    }
  };
  

  useEffect(() => {
    fetchFeeList();
  }, []);

  return (
    <div>
      {feeList ? 
        <div className="ml-8 mt-10 h-screen">
          <h1 className="text-center mb-5 text-2xl mt-4 font-bold text-[28px]">
            Thông tin chi tiết các phí hiện hành
          </h1>

          <div className=" w-full flex">
            <Link to='/admin/addfee' className=" h-10 w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
              Thêm khoản phí mới
            </Link>

            <form className="container w-2/3 mx-auto justify-center items-center">
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên phí"
                  id="FeeId"
                  value={searchFeeNameValue}
                  onChange={(e) => setSearchFeeNameValue(e.target.value)}
                  className="w-full px-3 py-2 text-default border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="button"
                  className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={fetchFeeListByFeeName}
                >
                  <SearchIcon />
                </button>
              </div>

              <div className="flex items-center ml-3 mt-2">
                <label className="mr-2">
                  <input
                    type="checkbox"
                    checked={searchFeeType === '/Required'}
                    onChange={() => handleFeeTypeStatusChange('/Required')}
                    className="mr-2 form-checkbox text-blue-500 focus:ring focus:border-blue-300"
                  />
                  <span className="text-blue-500">Bắt buộc</span>
                </label>


                <label className="mr-2">
                  <input
                    type="checkbox"
                    checked={searchFeeType === '/NotRequired'}
                    onChange={() => handleFeeTypeStatusChange('/NotRequired')}
                    className="mr-2 form-checkbox text-red-500 focus:ring focus:border-red-300"
                  />
                  <span className="text-red-500">Không bắt buộc</span>
                </label>
              </div>
            </form>
          </div>
          {searchStatus === "fail" && <p className="ml-4 font-semibold text-[1.2rem] text-red-500">Couldn't find any!</p>}
          {searchStatus === "success" && <p className="ml-4 font-semibold text-[1.2rem] text-green-500">Found {feeList.length} items!</p>}
          <FeeList2 items={feeList} setFeeList={setFeeList}/>
        </div> : <LoadingScreen/>
      }
    </div>
  );
}

export default FeeManage;
