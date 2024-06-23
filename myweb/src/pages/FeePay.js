import React, { useState, useEffect } from 'react';
import FeeList from '../components/FeeList';
import { fetchFunction } from '../utils/Fetch';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../components/LoadingScreen';
import SearchIcon from '@mui/icons-material/Search';

export default function FeePay() {
  const { user } = useAuth();
  const [feeUser, setFeeUser] = useState();
  const [searchName, setSearchName] = useState("");
  const [searchFeeMode, setSearchFeeMode] = useState();
  const [searchStatus, setSearchStatus] = useState();

  const handlePaymentStatusChange = (status) => setSearchFeeMode(() => (searchFeeMode === status ? null : status));

  const fetchFeeUser = async () => {
    try {
      const feeList = await fetchFunction({
        reqType: "/Fee/getListFee/NotComplete", 
        UserId: user.UserId,
        accessToken: user.token
      });

      if(feeList.code === "200"){
        let tempList = feeList.data;
        if(searchFeeMode != null){
          tempList = tempList.filter((fee) => fee.isRequired === searchFeeMode);
        }
        if(searchName){
          tempList = tempList.filter((fee) => fee.feeName.includes(searchName));
        }
        setFeeUser(tempList);
        if(tempList.length > 0){
          setSearchStatus("success");
        }
        else{
          setSearchStatus("fail");
        }
      }
      else{
        console.log(feeList.message);
      }
    } 
    catch (error) {
      console.log("get list fail?");
    }
  };

  useEffect(() => {
    fetchFeeUser();
  }, []);

  //const items = [{name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}];
  return (
    <div className='flex-grow' style={{marginTop: '30px'}}>
      {feeUser ?
      <div>
        <h1 className="text-center font-semibold text-[1.5rem]" style={{marginBottom: '30px'}}>Các khoản phí chưa thanh toán</h1>
        <div className='flex ml-4 mb-4'>
          <div>
            <div>
              <span className='font-semibold'>Name:</span>
              <input className='border border-gray-400 ml-3 px-1 rounded-[1rem]' placeholder='Enter to search fee name' onChange={e => setSearchName(e.target.value)}/>
            </div>
            <div>
              <label className="mr-2">
                <input
                  type="checkbox"
                  checked={searchFeeMode === 1}
                  onChange={() => handlePaymentStatusChange(1)}
                  className="mr-2 form-checkbox text-blue-500 focus:ring focus:border-blue-300"
                />
                <span className="text-blue-500">Bắt buộc</span>
              </label>
              <label className="mr-2 ml-3">
                <input
                  type="checkbox"
                  checked={searchFeeMode === 0}
                  onChange={() => handlePaymentStatusChange(0)}
                  className="mr-2 form-checkbox text-blue-500 focus:ring focus:border-blue-300"
                />
                <span className="text-blue-500">Không bắt buộc</span>
              </label>
            </div>
          </div>
          <button className='border border-gray-400 rounded-[2rem] h-[45px] ml-10 px-1 py-1 hover:text-white hover:bg-gray-600 self-center' type='button' onClick={fetchFeeUser}><SearchIcon fontSize='large'/></button>
        </div>
        {searchStatus === "success" && <span className='font-semibold text-green-500 text-[1.2rem] ml-4'>Found {feeUser.length} items!</span>}
        {searchStatus === "fail" && <span className='font-semibold text-red-500 text-[1.2rem] ml-4'>Couldn't find any!</span>}
        <FeeList items={feeUser} />
      </div> : (<LoadingScreen/>)}
    </div>
  )
};