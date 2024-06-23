import React, { useEffect, useState } from "react";
import { useNavigate, useBeforeUnload } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import { FaKey  } from "react-icons/fa";
import { MdMoney, MdOutlineFeed  } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CreateFee = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useLocalStorage("createfee", {feeID: "", feeName: "", detail: "", searchFeeType: "/Required"});
  const [FailAttempt, setAttempt] = useState(null);
  const [feeID, setFeeID] = useState("");
  const [feeName, setFeeName] = useState("");
  const [detail, setDetail] = useState("");
  const [searchFeeType, setSearchFeeType] = useState("/Required");

  const handleFeeTypeStatusChange = (status) => setSearchFeeType(() => (searchFeeType === status ? searchFeeType : status));

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeeID("");
    setFeeName("");
    setDetail("");
    setSearchFeeType("/Required");
    setFormData({feeID: "", feeName: "", detail: "", searchFeeType: "/Required"});
  };

  const addNewFee = async (e) => {
    e.preventDefault();

    const response = await fetchFunction({
      reqType: "/Fee/addNewFee", 
      UserId: user.UserId,
      accessToken: user.token,
      FeeId: feeID ? feeID : "",
      FeeName: feeName,
      DateCreate: new Date(),
      Detail: detail,
      isRequired: searchFeeType === "/Required" ? "1" : "0"
    });

    if(response.code === "200"){
      setFormData({feeID: "", feeName: "", detail: "", searchFeeType: "/Required"});
      setAttempt(null);
      navigate("/admin/quanlyphi");
    }
    else{
      setAttempt(response.message);
    }
  };

  useEffect(() => {
    setFeeID(formData.feeId);
    setFeeName(formData.feeName);
    setDetail(formData.detail);
    setSearchFeeType(formData.searchFeeType);
  }, []);

  useEffect(() => {
    setFormData({feeId: feeID, feeName, detail, searchFeeType});
  }, [feeID, feeName, detail, searchFeeType]);
  
  return (
    <div className="mt-10">
      <form
        className="bg-white shadow rounded border-2 p-6 mx-auto max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center">
          <h3 className="text-red-600 font-bold rounded">Tạo một phí mới</h3>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="feeID"
          >
            Mã phí
          </label>
          <div className="flex justify-center items-center">
          <FaKey className="mr-2 scale-125" />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="feeID"
            type="text"
            placeholder="Fee ID"
            value={feeID}
            onChange={(e) => setFeeID(e.target.value)}
          />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="feeName"
          >
            Tên phí
          </label>
          <div className="flex justify-center items-center">
          <MdOutlineFeed className="mr-2 scale-150" />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="feeName"
            type="text"
            placeholder="Fee Name"
            value={feeName}
            onChange={(e) => setFeeName(e.target.value)}
          />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="detail"
          >
            Mô tả chỉ tiết về phí
          </label>
          <div className="flex justify-center items-center">
          <IoInformationCircle className="mr-2 scale-150" />
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="detail"
            placeholder="Detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
          </div>
        </div>

        <div className="flex items-center mt-2 mb-5">
          <MdMoney className="mr-2 scale-150"/>
          <p className="font-semibold mr-5">Loại phí:</p>
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

        {FailAttempt && <div className="text-red-500 py-2">{FailAttempt}</div>}

        <div className="grid grid-cols-2 gap-4">
          <button
            className="col-span-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            type="submit"
            onClick={addNewFee}
          >
            Tạo Khoản phí mới
          </button>
          <button
            className="col-span-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            type="reset"
            onClick={e => {navigate("/admin/quanlyphi");}}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFee;
