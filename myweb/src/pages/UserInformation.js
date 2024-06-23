import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from '../utils/Fetch';
import UserList from '../components/UserList';
import LoadingScreen from '../components/LoadingScreen';
import {
  FaUser,
  FaKey,
  FaCalendar,
  FaPhone,
  FaHouseUser,
} from "react-icons/fa";

export default function UserInformation() {
  const { user } = useAuth();
  const [userInformation, setUserInformation] = useState(null);
  const [userFamily, setUserFamily] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserInformation = async () => {
    try {
      const userData = await fetchFunction({
        reqType: '/GetUserInfo',
        UserId: user.UserId,
        accessToken: user.token,
        userIdToFind: ""
      });

      if(userData.code === "200"){
        setUserInformation(userData.data);
      }
      else{
        console.log("fetch error! code !== 200", user);
      }
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  const fetchUserFamily = async () => {
    try {
      const familyData = await fetchFunction({
        reqType: '/GetUserInfoByFamilyId',
        UserId: user.UserId,
        accessToken: user.token
      });

      if(familyData.code === "200"){
        setUserFamily(familyData.data);
      }
      else{
        console.log("fetch error! code !== 200", user);
      }
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  useEffect(() => {
    fetchUserInformation();
    fetchUserFamily();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className='flex-grow'>
      <div style={{marginTop: '30px'}}>
          {error && <div>Something is wrong!</div>}
          {(userInformation && userFamily) ? (
            <div>
              <h1 className="text-center font-semibold text-[1.5rem]">Thông tin người dùng</h1>
              <div className="mb-4 block items-center">
                <label
                  className="block text-gray-700 text-l font-bold mb-2 relative"
                  htmlFor="userID"
                >
                  Số CCCD
                </label>
                <div className="flex justify-center items-center">
                  <FaKey className="mr-2 scale-125" />
                  <p className="appearance-none border rounded bg-gray-200 mr-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{userInformation[0].userId}</p>
                </div>
              </div>

              <div className="mb-4 block items-center">
                <label
                  className="block justify-center items-center text-gray-700 text-l font-bold mb-2"
                  htmlFor="name"
                >
                  Họ tên
                </label>
                <div className="flex justify-center items-center">
                  <FaUser className="mr-2 scale-125" />
                  <p className="appearance-none border rounded bg-gray-200 mr-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{userInformation[0].userName}</p>
                </div>
              </div>

              <div className="mb-4 block items-center">
                <label
                  className="block justify-center items-center text-gray-700 text-l font-bold mb-2"
                  htmlFor="date_of_birth"
                >
                  Ngày sinh
                </label>
                <div className="flex items-center">
                  <FaCalendar className="mr-2 scale-125" />
                  <p className="appearance-none border rounded bg-gray-200 mr-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{moment.utc(userInformation[0].dateOfBirth).tz("Asia/Bangkok").format("DD/MM/YYYY")}</p>
                </div>
              </div>

              <div className="mb-4 block items-center">
                <label
                  className="block justify-center items-center text-gray-700 text-l font-bold mb-2"
                  htmlFor="HK_num"
                >
                  Số Hộ khẩu
                </label>
                <div className="flex justify-center items-center">
                  <FaHouseUser className="mr-2 scale-125" />
                  <p className="appearance-none border rounded bg-gray-200 mr-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{userInformation[0].familyId}</p>
                </div>
              </div>

              <div className="block mb-4 items-center">
                <label
                  className="block justify-center items-center text-gray-700 text-l font-bold mb-2"
                  htmlFor="phone_number"
                >
                  Số điện thoại liên lạc
                </label>
                <div className="flex justify-center items-center">
                  <FaPhone className="mr-2 scale-125" />
                  <p className="appearance-none border rounded bg-gray-200 mr-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">{userInformation[0].phoneNumber}</p>
                </div>
              </div>
              <h2 className="text-center font-semibold text-[1.5rem]" style={{marginTop: '30px'}}>Thông tin những người dùng cùng mã hộ</h2>
              <UserList items={userFamily}></UserList>
            </div>
          ) : (<LoadingScreen/>)}
        </div>
    </div>
    
  );
}