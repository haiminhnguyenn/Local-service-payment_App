import React, { useState,useEffect } from "react";
import {
  FaUser,
  FaKey,
  FaCalendar,
  FaPhone,
  FaHouseUser,
} from "react-icons/fa";
import { fetchFunction } from "../utils/Fetch";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from 'moment-timezone';
import LoadingScreen from "../components/LoadingScreen";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CreateUser = () => {
  const {userId} = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [FailAttempt, setFailAttempt] = useState(null);
  const [userID, setUserID] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [hk_number, setHK_number] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [fetchUserInfoDone, setFetchUserInfoDone] = useState(false);
  const [onAttempt, setOnAttempt] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [password,setPassword]=useState("")
  const [formData, setFormData] = useLocalStorage("createuser", {userID: "", fullName: "", dob: "", hk_number: "", phone_number: ""});

  function title() {
    if(userId) return "Chỉnh sửa thông tin nhân khẩu"
    else return "Tạo nhân khẩu mới"
  }

  const savainfor = (e) =>
  {
    if(userId) {
      e.preventDefault();
      setOpenPopover(true);
    }
    else addNewUser(e);
  }

  const updateUser = async (e) => {
    e.preventDefault();
    setOnAttempt(true);
    const response = await fetchFunction({
      reqType: "/UpdateUserInfo", 
      RootId: user.UserId,
      accessToken: user.token,
      UserId: userID,
      dateOfBirth: dob,
      PhoneNumber: phone_number,
      FamilyId: hk_number,
      RootPassword: password
    });

    if(response.code === "200"){
      setFailAttempt(null);
      setOnAttempt(false);
      navigate("/admin/quanlynhankhau");
    }
    else{
      setFailAttempt("fail");
      setOnAttempt(false);
    }
  };

  const addNewUser = async (e) => {
    e.preventDefault();
    setOnAttempt(true);
    const response = await fetchFunction({
      reqType: "/addUser", 
      RootId: user.UserId,
      accessToken: user.token,
      UserId: userID,
      UserName: fullName,
      dateOfBirth: dob,
      PhoneNumber: phone_number,
      FamilyId: hk_number
    });

    if(response.code === "200"){
      setFormData({userID: "", fullName: "", dob: "", hk_number: "", phone_number: ""});
      setFailAttempt(null);
      setOnAttempt(false);
      navigate("/admin/quanlynhankhau");
    }
    else{
      setFailAttempt("fail");
      setOnAttempt(false);
    }
  };
 
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await fetchFunction({
          reqType: '/GetUserInfo',
          UserId: user.UserId,
          accessToken: user.token,
          userIdToFind: userId
        });
  
        if (userData.code === "200") {
          setUserID(userData.data[0].userId); 
          setFullName(userData.data[0].userName);
          setDob(moment.utc(userData.data[0].dateOfBirth).tz("Asia/Bangkok").format("YYYY-MM-DD"));
          setHK_number(userData.data[0].familyId);
          setPhone_Number(userData.data[0].phoneNumber);
          setFetchUserInfoDone(true);
        } else {
          console.log("fail to fetch! code != 200");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    if(userId){
      fetchUserInfo();
    }
    else{
      setUserID(formData.userID);
      setFullName(formData.fullName);
      setDob(formData.dob);
      setHK_number(formData.hk_number);
      setPhone_Number(formData.phone_number);
      setFetchUserInfoDone(true);
    }
  }, []);
  
  useEffect(() => {
    if(!userId){
      setFormData({userID, fullName, dob, hk_number, phone_number});
    }
  }, [userID, fullName, dob, hk_number, phone_number]);

  return (
    <div>
      {fetchUserInfoDone ? 
        <div>
          {onAttempt && <div className='fixed top-0 h-screen w-screen bg-black bg-opacity-50 text-white'><LoadingScreen color='secondary'/></div>}
          <form
            className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md"
          >
            <div className="flex items-center justify-center">
              <h1 className="text-red-600 font-bold rounded text-[28px]">{title()}</h1>
            </div>
            <div className="mb-4 block items-center">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 relative"
                htmlFor="userID"
              >
                Số CCCD
              </label>
              <div className="flex justify-center items-center">
                <FaKey className="mr-2 scale-125" />
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="userID"
                  id="userID"
                  placeholder="UserId"
                  value={userID}
                  onChange={(e) => {
                    setUserID(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="mb-4 block items-center">
              <label
                className="block justify-center items-center text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Họ tên
              </label>
              <div className="flex justify-center items-center">
                <FaUser className="mr-2 scale-125" />
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="FullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4 block items-center">
              <label
                className="block justify-center items-center text-gray-700 text-sm font-bold mb-2"
                htmlFor="date_of_birth"
              >
                Ngày sinh
              </label>
              <div className="flex items-center">
                <FaCalendar className="mr-2 scale-125" />
                <input
                  className="border-gray-900 border-2 w-36 ml-3 "
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4 block items-center">
              <label
                className="block justify-center items-center text-gray-700 text-sm font-bold mb-2"
                htmlFor="HK_num"
              >
                Số Hộ khẩu
              </label>
              <div className="flex justify-center items-center">
                <FaHouseUser className="mr-2 scale-125" />
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="HK_num"
                  id="HK_num"
                  placeholder="HK_number"
                  value={hk_number}
                  onChange={(e) => setHK_number(e.target.value)}
                />
              </div>
            </div>

            <div className="block mb-4 items-center">
              <label
                className="block justify-center items-center text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone_number"
              >
                Số điện thoại liên lạc
              </label>
              
              <div className="flex justify-center items-center">
                <FaPhone className="mr-2 scale-125" />
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  placeholder="Phone Number"
                  value={phone_number}
                  onChange={(e) => setPhone_Number(e.target.value)}
                  maxLength={10} 
                />
              </div>
            </div>

            {FailAttempt && <div className="text-red-500 py-2">Có lỗi gì đó</div>}

            <div className="grid grid-cols-2 gap-4">
              <button
                className="col-span-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                type="submit"
                onClick={e=>savainfor(e)}
              >
                Lưu thông tin
              </button>
              <button
                className="col-span-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                type="reset"
                onClick={e => {navigate("/admin/quanlynhankhau");}}
              >
                Hủy
              </button>
            </div>
          </form>
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
          onClick={(e) => {
            if (password === "") {
              window.alert("Mật khẩu rỗng, yêu cầu nhập lại");
            } else {
              setOpenPopover(false);
              updateUser(e);
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
      </div> : <LoadingScreen/> }
    </div>
  );
};

export default CreateUser;
