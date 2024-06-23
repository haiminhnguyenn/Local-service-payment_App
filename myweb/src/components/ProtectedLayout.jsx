import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HistoryIcon from '@mui/icons-material/History';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const currentPage = window.location.pathname.split("/")[1];

    const logoutBtn_Click = async () => {
        setAnchorEl(null);
        logout();
    }
    const redirectBtn_Click = async (e, page) => {
        e.preventDefault(); 
        if(currentPage !== page){
            navigate("/" + page);
        }
    }

    if (!user) {
        return <Navigate to="/login" />;
    }
    else if(user.mode === "user"){
        return (
            <div className="h-screen">
                <h1 className="flex w-full h-[6vh] bg-blue-500 border-gray-300" style={{justifyContent: 'right', position: 'fixed'}}>
                    <button className={`border-transparent bg-transparent hover:scale-[130%] text-white font-semibold border h-[42px] rounded-[3rem] mr-3 self-center ${open && "scale-[130%]"}`} type="button" onClick={handleClick}>
                        <AccountCircleIcon sx={{fontSize: 40}}/>
                    </button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => {setAnchorEl(null); navigate("/changepass")}}><PasswordIcon/><span className="ml-3">Change Password</span></MenuItem>
                        <MenuItem onClick={handleClose}><EmailIcon/><span className="ml-3">Change Email</span></MenuItem>
                        <MenuItem onClick={logoutBtn_Click}><LogoutIcon/><span className="ml-3">Logout</span></MenuItem>
                    </Menu>
                </h1>
                <div className="flex h-screen" style={{paddingTop: '50px'}}>
                    <div className="bg-blue-500" style={{display: 'flex', flexDirection: 'column', marginRight: '30px'}} >
                        <button className={`home-button ${currentPage === "" && "bg-blue-800 text-white border-b-4 border-white"} `} onClick={(e) => redirectBtn_Click(e, "")}>
                            <div className={`flex ${currentPage === "" && "scale-[120%]"}`}>
                                <HomeIcon className="justify-start" fontSize="large"/>
                                <p className="justify-center flex-grow self-center font-semibold">Home</p>
                            </div>
                        </button>
                        <button className={`home-button ${currentPage === "thongtin" && "bg-blue-800 text-white border-b-4 border-white"} `} onClick={(e) => redirectBtn_Click(e, "thongtin")}>
                            <div className={`flex ${currentPage === "thongtin" && "scale-[120%]"}`}>
                                <PermIdentityIcon fontSize="large"/>
                                <p className="justify-center flex-grow self-center font-semibold">Thông tin</p>
                            </div>
                        </button>
                        <button className={`home-button ${currentPage === "thuphi" && "bg-blue-800 text-white border-b-4 border-white"} `} onClick={(e) => redirectBtn_Click(e, "thuphi")}>
                            <div className={`flex ${currentPage === "thuphi" && "scale-[120%]"}`}>
                                <ReceiptIcon fontSize="large"/>
                                <p className="justify-center flex-grow self-center font-semibold">Thu phí</p>
                            </div>
                        </button>
                        <button className={`home-button ${currentPage === "lichsunop" && "bg-blue-800 text-white border-b-4 border-white"} `} onClick={(e) => redirectBtn_Click(e, "lichsunop")}>
                            <div className={`flex ${currentPage === "lichsunop" && "scale-[120%]"}`}>
                                <HistoryIcon fontSize="large"/>
                                <p className="justify-center flex-grow self-center font-semibold">Lịch sử nộp phí</p>
                            </div>
                        </button>
                        <button className={`home-button ${currentPage === "thongke" && "bg-blue-800 text-white border-b-4 border-white"} `} onClick={(e) => redirectBtn_Click(e, "thongke")}>
                            <div className={`flex ${currentPage === "thongke" && "scale-[120%]"}`}>
                                <AnalyticsIcon fontSize="large"/>
                                <p className="justify-center flex-grow self-center font-semibold">Thống kê</p>
                            </div>
                        </button>
                    </div>
                    <Outlet/>
                </div>
            </div>
        )
    }
    else if(user.mode === "admin"){
        return <Navigate to="/admin/" />;
    }
};