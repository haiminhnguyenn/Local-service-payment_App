import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFunction } from '../utils/Fetch';
import { Popover } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingScreen from '../components/LoadingScreen';

export default function ForgetPassword(){
    const navigate = useNavigate();

    const [UserID, setUserID] = useState('');
    const [UserOTP, setUserOTP] = useState('');
    const [onAttempt, setOnAttempt] = useState(false);
    const [FailAttempt, setAttempt] = useState(null);
    const [otpTimeStamp, setOtpTimeStamp] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopover = Boolean(anchorEl);
    const idPopover = openPopover ? 'simple-popover' : undefined;
  
    const handleClosePopover = () => {
      setAnchorEl(null);
      navigate("/login");
    };

    const otpBtn_Click = async () => {
        setOnAttempt(true);
        if(otpTimeStamp){
            let curTime = new Date().getTime();
            if(curTime < otpTimeStamp){
                setAttempt({state: 'fail', message: "Please wait " + (curTime - otpTimeStamp)/1000 + " seconds before sending OTP again!"});
                setOnAttempt(false);
            }
            else{
                try{
                    const response = await fetchFunction({
                        reqType: "/ForgetPass/RequestOTP",
                        UserId: UserID
                    });
        
                    if(response.code === "200"){
                        setOtpTimeStamp(new Date().getTime() + 60*1000);
                        setAttempt({state: 'success', message: 'OTP sent to your email successfully!'});
                        setOnAttempt(false);
                    }
                    else{
                        setAttempt({state: 'fail', message: response.message});
                        setOnAttempt(false);
                    }
                }
                catch(error){
                    console.log(error);
                    setOnAttempt(false);
                }
            }
        }
        else{
            try{
                const response = await fetchFunction({
                    reqType: "/ForgetPass/RequestOTP",
                    UserId: UserID
                });
    
                if(response.code === "200"){
                    setOtpTimeStamp(new Date().getTime() + 60);
                    setAttempt({state: 'success', message: 'OTP sent to your email successfully!'});
                    setOnAttempt(false);
                }
                else{
                    setAttempt({state: 'fail', message: response.message});
                    setOnAttempt(false);
                }
            }
            catch(error){
                console.log(error);
                setOnAttempt(false);
            }
        }
    };

    const confirmBtn_Click = async (e) => {
        const buttonElement = e.currentTarget;
        try{
            setOnAttempt(true);
            const response = await fetchFunction({
                reqType: "/ForgetPass/VerifyOTP",
                UserId: UserID,
                Otp: UserOTP
            });

            if(response.code === "200"){
                setAttempt({state: 'success', message: response.message});
                setAnchorEl(buttonElement);
                setOnAttempt(false);

                setTimeout(() => {
                    setAnchorEl(null);
                    navigate("/login");
                }, 3000);
            }
            else{
                setAttempt({state: 'fail', message: response.message});
                setOnAttempt(false);
            }
        }
        catch(error){
            console.log(error);
            setOnAttempt(false);
        }
    };

    return(
        <div className='mt-20'>
            {onAttempt && <div className='fixed top-0 h-screen w-screen bg-black bg-opacity-50 text-white'><LoadingScreen color='secondary'/></div>}
            <h1 className="text-center text-gray-700 font-bold text-[2rem]" style={{marginBottom: '20px'}}>Hỗ trợ quên mật khẩu</h1>
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto w-[30rem]">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="userid">
                        Số CCCD
                    </label>
                    <input class={`shadow appearance-none border rounded ${UserID === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="userid" placeholder="Số CCCD" onChange={e => setUserID(e.target.value)}/>
                    {UserID === "" && <p class="text-red-500 text-xs italic">Please enter your identification number.</p>}
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        OTP
                    </label>
                    <div className='flex'>
                        <input class={`shadow appearance-none border rounded ${UserOTP === "" && "border-red-500"} w-[74%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="otp" placeholder="OTP" onChange={e => setUserOTP(e.target.value)}/>
                        <button className='bg-blue-500 ml-5 w-[6rem] rounded text-white font-semibold hover:bg-blue-800 px-1' type='button' onClick={otpBtn_Click}>Get OTP</button>
                    </div>
                    {UserOTP === "" && <p class="text-red-500 text-xs italic mt-3">Please enter OTP.</p>}
                </div>
                <div class="flex items-center justify-center">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-5 rounded focus:outline-none focus:shadow-outline" type="button" onClick={e => {confirmBtn_Click(e);}}>
                        Confirm
                    </button>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => navigate("/login")}>
                        Cancel
                    </button>
                </div>
                {FailAttempt &&
                    <div>
                        {FailAttempt.state === 'fail' && <div className="text-red-500" style={{marginTop: "10px", textAlign: 'center'}}>{FailAttempt.message}</div>}
                        {FailAttempt.state === 'success' && <div className="text-green-500" style={{marginTop: "10px", textAlign: 'center'}}>{FailAttempt.message}</div>}
                    </div>
                }
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
                <Typography className='w-[40rem] text-center' sx={{ p: 2 }}><span className='font-semibold text-green-700'>Reset password successfully! Please check your email for the new password!</span></Typography>
            </Popover>
        </div>
    );
};