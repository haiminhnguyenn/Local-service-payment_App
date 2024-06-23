import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Home from "@mui/icons-material/Home";
import PeopleIcon from '@mui/icons-material/People';
import MoneyIcon from '@mui/icons-material/Money';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PaymentIcon from '@mui/icons-material/Payment';

export const AdminLayout = () => {
    const { user, logout } = useAuth();

    const selectedTab = window.location.pathname.split("/")[2];

    const logoutBtn_Click = async e => {
        e.preventDefault();
        logout();
    }

    if (!user) {
        return <Navigate to="/login"/>;
    }
    else if(user.mode === "admin"){
        return (
            <div className="flex">
                <div className="fixed top-0 left-0 h-screen justify-center items-center w-[285px] bg-[#101F33] py-8 ">
                    <div  className= 'w-52 h-20 pl-10 flex items-center text-[#BDC2C7] font-bold py-2 px-4 rounded mb-10 mt-0' >
                        <Home style={{ fontSize: 50 }} />
                        <h1 className="text-[32px] italic">Overview</h1>
                    </div>
                    <Link to="/admin/quanlyhokhau" className={`hover:bg-[#4FC3F7] hover:text-[#101F33] text-[#BDC2C7] w-full  h-14 pl-10 flex items-center text-[18px] font-bold py-2 px-4 rounded mb-10 ${selectedTab === "quanlyhokhau" ? "text-[#101F33] bg-[#4FC3F7] scale-[110%]" : ""}`}>
                        <PermMediaOutlinedIcon className="mr-2" />
                        Quản lý hộ khẩu
                    </Link>
                    <Link to="/admin/quanlynhankhau" className={`hover:bg-[#4FC3F7] hover:text-[#101F33] w-full h-14 pl-10 text-[#BDC2C7] flex text-left items-center text-[18px] font-bold py-2 px-4 rounded mb-10 ${selectedTab === "quanlynhankhau" ? "text-[#101F33] bg-[#4FC3F7] scale-[110%]" : ""}`}>
                        <PeopleIcon className="mr-2" />
                        Quản lý nhân khẩu
                    </Link>
                    <Link to="/admin/quanlyphi" className={`hover:bg-[#4FC3F7] hover:text-[#101F33] w-full h-14 pl-10 text-[#BDC2C7] flex items-center text-[18px] font-bold py-2 px-4 rounded mb-10 ${selectedTab === "quanlyphi" ? "text-[#101F33] bg-[#4FC3F7] scale-[110%]" : ""}`}>
                        <MoneyIcon className="mr-2" />
                        Quản lý các loại phí
                    </Link>
                    <Link to="/admin/quanlythuphi" className={`hover:bg-[#4FC3F7] hover:text-[#101F33] w-full h-14 pl-10 text-[#BDC2C7] flex items-center text-[18px] font-bold py-2 px-4 rounded mb-10 ${selectedTab === "quanlythuphi" ? "text-[#101F33] bg-[#4FC3F7] scale-[110%]" : ""}`}>
                        <PaymentIcon className="mr-2" />
                        Quản lý thu phí
                    </Link>
                    <button className="hover:bg-[#4FC3F7] w-full h-14 pl-10 flex items-center hover:text-red-600 text-[#BDC2C7] text-[18px] font-bold py-2 px-4 rounded mb-10" onClick={logoutBtn_Click}>
                        <LogoutIcon className="mr-2" />
                        Đăng xuất
                    </button>
                </div>
                <div className="flex-grow ml-[285px]">
                    <h1 className="h-[12vh] bg-[#009BE5]">
                        <div className="flex justify-end">
                            <button>
                                <NotificationsIcon className='mt-3 text-2xl text-white'/>
                            </button>
                            <Avatar className="mt-3 mr-3 ml-3" src="/static/images/avatar/1.jpg" alt="My Avatar" />
                        </div>
                        
                        <div className="flex justify-between items-center mx-3">
                        <h1 className="text-white text-[36px] text-bold"></h1>
                        <Link to='/admin/changepass/'className="hover:text-red-500 text-[18px] hover:scale-[120%] mr-6 flex justify-center text[18px] font-bold text-white rounded-md w-[140px] h-8 border-2 border-gray-200">
                            Đổi mật khẩu
                        </Link>
                        </div>
                    </h1>
                    <Outlet />
                </div>
            </div>
        )
    }
};