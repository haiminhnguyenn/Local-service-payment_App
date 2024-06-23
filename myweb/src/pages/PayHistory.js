import React, { useState, useEffect } from 'react';
import HistoryFeeList from '../components/HistoryFeeList';
import { useAuth } from '../hooks/useAuth';
import { fetchFunction } from '../utils/Fetch';
import LoadingScreen from '../components/LoadingScreen';
import DatePicker from "react-datepicker";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import moment from 'moment-timezone';

import "react-datepicker/dist/react-datepicker.css";

export default function PayHistory() {
  const { user } = useAuth();
  const [feeUserComplete, setFeeUserComplete] = useState();
  const [historyList, setHistoryList] = useState();
  const [findMode, setFindMode] = useState(false);
  const [advancedFind, setAdvancedFind] = useState(false);
  const [nameToFind, setNameToFind] = useState('');
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [fromMoney, setFromMoney] = useState();
  const [toMoney, setToMoney] = useState();
  const [findError, setFindError] = useState();

  const fetchFeeUser = async () => {
    try {
      const list = await fetchFunction({
        reqType: "/Bill/GetListByFamilyId/User", 
        UserId: user.UserId,
        accessToken: user.token
      });
      const fInfo = await fetchFunction({
        reqType: "/GetUserInfoByFamilyId", 
        UserId: user.UserId,
        accessToken: user.token
      });
      if(list.code === "200" && fInfo.code === "200"){
        for(let i = 0; i < list.data.length; i++){
          for(let j = 0; j < fInfo.data.length; j++){
            if(list.data[i].userId === fInfo.data[j].userId){
              list.data[i].userName = fInfo.data[j].userName;
            }
          }
        }
        setFeeUserComplete(list.data);
      }
      else{
        console.log({message: "get fee user fail? code !== 200", data: user});
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeeUser();
  }, []);
  //const items = [{tid: "1", fee: {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, date: "1/1/2023", state: "Thành công"}, {tid: "1", fee: {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, date: "1/1/2023", state: "Thành công"}];
  
  const findBtn_Click = () => {
    if(feeUserComplete){
      let newList = [];
      for(let i = 0; i < feeUserComplete.length; i++){
        if(feeUserComplete[i].userName.includes(nameToFind)){
          var utcFeeTime = feeUserComplete[i].date ? moment.utc(feeUserComplete[i].date).tz("Asia/Bangkok") : -1;
          if(utcFeeTime != -1){
            if(fromDate && utcFeeTime < moment.utc(fromDate)){
              continue;
            }
            if(toDate && utcFeeTime > moment.utc(toDate)){
              continue;
            }
          }
          if(feeUserComplete[i].money){
            if(fromMoney && feeUserComplete[i].money < fromMoney){
              continue;
            }
            if(toMoney && feeUserComplete[i].money > toMoney){
              continue;
            }
          }
          newList.push(feeUserComplete[i]);
        }
      }
      if(newList.length > 0){
        setHistoryList(newList);
        setFindError("success");
      }
      else{
        setFindError("fail");
      }
    }
  };

  return (
    <div className='flex-grow' style={{marginTop: '30px'}}>
      {feeUserComplete ?
      <div>
        <h1 className="text-center font-semibold text-[1.5rem]" style={{marginBottom: '30px'}}>Các giao dịch nộp phí đã thực hiện</h1>
        <button className='border border-gray-400 text-red-700 text-xl font-semibold mb-3 px-1 py-1 hover:bg-red-700 hover:text-white' type='button' onClick={() => {setFindMode(!findMode);}}>Tìm kiếm</button>
        {findMode &&
          <div className='ml-4'>
            <div className='flex'>
              <p className='self-center'>Người thực hiện:</p>
              <input className='border border-gray-400 mx-3 px-1 py-1 rounded-xl w-[20rem]' placeholder='Enter name here if you want to filter it' onChange={e => {setNameToFind(e.target.value);}}/>
              <button className='border border-gray-400 px-1 py-1 rounded-[3rem] bg-transparent hover:bg-gray-500 hover:text-white' type='button' onClick={findBtn_Click}><SearchIcon/></button>
            </div>
            <div>
              <div className='flex my-2'>
                <p className='font-semibold self-center'>Tìm kiếm nâng cao</p>
                <button className='border rounded-xl bg-blue-500 hover:bg-blue-800 text-white mx-3 px-2 py-1' type='button' onClick={() => {setAdvancedFind(!advancedFind);}}>{advancedFind ? "Hide" : "Show"}</button>
              </div>
              {advancedFind && 
                <div>
                  <div className='flex my-2'>
                    <p>Ngày nộp từ</p>
                    <DatePicker className='border border-gray-400 rounded text-center mx-3' selected={fromDate} onChange={(date) => {setFromDate(date);}} dateFormat="dd/MM/yyyy"/>
                    {fromDate && <button className='rounded-xl bg-red-500 hover:bg-red-800 text-white mr-2' type='button' onClick={() => {setFromDate();}}><ClearIcon/></button>}
                    <p>đến</p>
                    <DatePicker className='border border-gray-400 rounded text-center mx-3' selected={toDate} onChange={(date) => {setToDate(date);}} dateFormat="dd/MM/yyyy"/>
                    {toDate && <button className='rounded-xl bg-red-500 hover:bg-red-800 text-white' type='button' onClick={() => {setToDate();}}><ClearIcon/></button>}
                  </div>
                  <div className='flex'>
                    <p>Số tiền giao dịch dao động từ</p>
                    <input id='fromMoneyInput' className='border border-gray-400 rounded text-center mx-3' selected={fromMoney} onChange={e => {setFromMoney(e.target.value);}}/>
                    {fromMoney && <button className='rounded-xl bg-red-500 hover:bg-red-800 text-white mr-2' type='button' onClick={() => {var inputElement = document.getElementById("fromMoneyInput");inputElement.value="";setFromMoney();}}><ClearIcon/></button>}
                    <p>đến</p>
                    <input id='toMoneyInput' className='border border-gray-400 rounded text-center mx-3' onChange={e => {setToMoney(e.target.value);}}/>
                    {toMoney && <button className='rounded-xl bg-red-500 hover:bg-red-800 text-white' type='button' onClick={() => {var inputElement = document.getElementById("toMoneyInput");inputElement.value="";setToMoney();}}><ClearIcon/></button>}
                  </div>
                  <p className='text-red-700 font-semibold my-2'>Lưu ý: Điền 1 ô để tìm kiếm 1 phía</p>
                </div>
              }
              {findError &&
                <div>
                  {findError === "fail" && <span className='text-red-500 font-semibold text-[1.2rem]'>Couldn't find any</span>}
                  {findError === "success" && <span className='text-green-500 font-semibold text-[1.2rem]'>Found {historyList.length} items</span>}
                </div>
              }
            </div>
          </div>
        }
        <HistoryFeeList items={historyList ? historyList : feeUserComplete}/>
      </div> : (<LoadingScreen/>)}
    </div>
  )
};