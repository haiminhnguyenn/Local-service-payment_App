import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth'
import { fetchFunction } from '../utils/Fetch';
import { Popover } from '@mui/material';
import Typography from '@mui/material/Typography';


export default function ChangePasswordforAdmin() {
  const { user, logout } = useAuth();
  const [UserOldPassword, setUserOldPassword] = useState('');
  const [UserNewPassword, setNewPassword] = useState('');
  const [UserNewPassword2, setNewPassword2] = useState('');
  const [FailAttempt, setAttempt] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? 'simple-popover' : undefined;

  const handleClosePopover = () => {
    setAnchorEl(null);
    logout();
  };

  const changepassBtn_Click = async (e) => {
    const buttonElement = e.currentTarget;
    if(UserNewPassword !== UserNewPassword2){
        setAttempt("Please retype new password correctly!");
    }
    else if(UserNewPassword.length < 4){
        setAttempt("New password is less than 4 characters!");
    }
    else{
        try{
            const response = await fetchFunction({
                reqType: '/changePass/Root',
                UserId: user.UserId,
                accessToken: user.token,
                OldPassword: UserOldPassword,
                NewPassword: UserNewPassword
            });

            if(response.code === "200"){
                setAttempt(null);
                setAnchorEl(buttonElement);
            }
            else{
                setAttempt("Old password might be entered incorrectly!");
            }
        }
        catch(error){
            console.log("errow somewhere!");
        }
    }
  }

  return (
    <div className='flex flex-col justify-center items-center m-auto text-center mt-8'>
      <h1 className="text-center text-gray-700 font-bold text-[2rem]" style={{marginBottom: '20px'}}>Đổi mật khẩu Admin</h1>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[30rem]">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="oldpassword">
            Old password
          </label>
          <input class={`shadow appearance-none border rounded ${UserOldPassword === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="oldpassword" type="password" placeholder="*********" onChange={e => setUserOldPassword(e.target.value)}/>
          {UserOldPassword === "" && <p class="text-red-500 text-xs italic">Please enter old password.</p>}
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            New Password
          </label>
          <input class={`shadow appearance-none border rounded ${UserNewPassword === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="newpassword" type="password" placeholder="*********" onChange={e => setNewPassword(e.target.value)}/>
          {UserNewPassword === "" && <p class="text-red-500 text-xs italic">Please choose a new password.</p>}
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Retype new Password
          </label>
          <input class={`shadow appearance-none border rounded ${UserNewPassword2 === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="retypepassword" type="password" placeholder="*********" onChange={e => setNewPassword2(e.target.value)}/>
          {UserNewPassword2 === "" && <p class="text-red-500 text-xs italic">Please retype new password.</p>}
        </div>
        <div class="flex items-center justify-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={changepassBtn_Click}>
            Change password
          </button>
        </div>
        {FailAttempt && <div className="text-red-500" style={{marginTop: "10px", textAlign: 'center'}}>{FailAttempt}</div>}
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
        <Typography className='w-[40rem] text-center' sx={{ p: 2 }}><span className='font-semibold text-green-700'>Change password successfully! Please click on anywhere outside this bubble to logout of current session.</span></Typography>
        </Popover>
    </div>
  )
};