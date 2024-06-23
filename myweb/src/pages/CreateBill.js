import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import LoadingScreen from "../components/LoadingScreen";
import { Popover } from '@mui/material';
import Typography from '@mui/material/Typography';
import moment from "moment-timezone";
import { useLocalStorage } from "../hooks/useLocalStorage";

function CreateBill() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useLocalStorage("createbill", {feeId: "", familyId: "", money: "", detail: "", userIdSubmitted: ""});
    const [feeId, setFeeId] = useState("");
    const [familyId, setFamilyId] = useState("");
    const [money, setMoney] = useState("");
    const [detail, setDetail] = useState("");
    const [userIdSubmitted, setUserIdSubmitted] = useState("");
    const [message, setMessage] = useState();
    const [onAttempt, setOnAttempt] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopover = Boolean(anchorEl);
    const idPopover = openPopover ? 'simple-popover' : undefined;
    const timeoutIdRef = useRef(null);

    const handleClosePopover = () => {
        clearTimeout(timeoutIdRef.current);
        setAnchorEl(null);
    };

    const addNewBillBtn_Click = async (e) => {
        const buttonElement = e.currentTarget;
        try {
            setOnAttempt(true);
            const response = await fetchFunction({
                reqType: "/Bill/Add", 
                RootId: user.UserId,
                accessToken: user.token,
                FeeId: feeId,
                Date: moment.utc().tz("Asia/Bangkok").format("YYYY/MM/DD"),
                Detail: detail,
                UserId: userIdSubmitted,
                Money: money,
                FamilyId: familyId
            });

            if(response.code === "200"){
                setFormData({feeId: "", familyId: "", money: "", detail: "", userIdSubmitted: ""});
                setMessage({state: 'success', message: "Add new bill successfully!"});
                setAnchorEl(buttonElement);
                setOnAttempt(false);
                timeoutIdRef.current = setTimeout(() => {
                    setAnchorEl();
                }, 2000);
            }
            else{
                console.log("returned code != 200");
                setMessage({state: 'fail', message: "Add new bill failed?! " + response.message});
                setAnchorEl(buttonElement);
                setOnAttempt(false);
                timeoutIdRef.current = setTimeout(() => {
                    setAnchorEl();
                }, 2000);
            }
        } catch(err){
            console.log(err);
            setOnAttempt(false);
        }
    };

    useEffect(() => {
        setFeeId(formData.feeId);
        setFamilyId(formData.familyId);
        setMoney(formData.money);
        setDetail(formData.detail);
        setUserIdSubmitted(formData.userIdSubmitted);
    }, []);

    useEffect(() => {
        setFormData({feeId: feeId, familyId: familyId, money: money, detail: detail, userIdSubmitted: userIdSubmitted});
    }, [feeId, familyId, money, detail, userIdSubmitted]);

    return (
        <div className="mt-10">
            {onAttempt && <div className='fixed top-0 h-screen w-screen bg-black bg-opacity-50 text-white'><LoadingScreen color='secondary'/></div>}
            <form class="bg-white shadow-xl border rounded px-8 pt-6 pb-8 mx-auto mb-4 w-[30rem]">
                <div className="flex items-center justify-center">
                    <h3 className="text-red-600 font-bold rounded">Tạo hoá đơn thu phí mới</h3>
                </div>
                <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="oldpassword">
                    Mã phí
                </label>
                <input class={`shadow appearance-none border rounded ${feeId === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} value={feeId} placeholder="Enter Fee id" onChange={e => setFeeId(e.target.value)}/>
                {feeId === "" && <p class="text-red-500 text-xs italic">Please enter Fee Id.</p>}
                </div>
                <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Mã hộ
                </label>
                <input class={`shadow appearance-none border rounded ${familyId === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} value={familyId} placeholder="Enter Family Id" onChange={e => setFamilyId(e.target.value)}/>
                {familyId === "" && <p class="text-red-500 text-xs italic">Please enter Family Id.</p>}
                </div>
                <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Số tiền
                </label>
                <input class={`shadow appearance-none border rounded ${money === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} value={money} placeholder="Enter Money" onChange={e => setMoney(e.target.value)}/>
                {money === "" && <p class="text-red-500 text-xs italic">Please enter Money.</p>}
                </div>
                <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Chi tiết
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={detail} placeholder="Enter detail" onChange={e => setDetail(e.target.value)}/>
                </div>
                <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Số CCCD người nộp
                </label>
                <input class={`shadow appearance-none border rounded ${userIdSubmitted === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} value={userIdSubmitted} placeholder="Enter User Id" onChange={e => setUserIdSubmitted(e.target.value)}/>
                {userIdSubmitted === "" && <p class="text-red-500 text-xs italic">Please enter UserId who submit the money.</p>}
                </div>
                <div className="flex justify-center">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-5 rounded focus:outline-none focus:shadow-outline" type="button" onClick={addNewBillBtn_Click}>
                        Xác nhận
                    </button>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => {navigate("/admin/quanlythuphi");}}>
                        Huỷ
                    </button>
                </div>
            </form>
            <Popover
                id={idPopover}
                open={openPopover}
                onClose={handleClosePopover}
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <Typography className='w-[40rem] text-center' sx={{ p: 2 }}>
                    {message &&
                     <>
                        {message.state === "success" && <span className='font-semibold text-green-500'>{message.message}</span>}
                        {message.state === "fail" && <span className='font-semibold text-red-500'>{message.message}</span>}
                     </>
                    }
                </Typography>
            </Popover>
        </div>
    );
};

export default CreateBill;