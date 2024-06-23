import { defer, Route, createBrowserRouter, createRoutesFromElements, Navigate } from "react-router-dom";
import { AdminLayout } from './components/AdminLayout';
import { ProtectedLayout } from './components/ProtectedLayout';
import { UnprotectedLayout } from './components/UnprotectedLayout';
import { AuthLayout } from "./components/AuthLayout";
import Login from './pages/Login';
import Home from './pages/Home';
import UserInformation from "./pages/UserInformation";
import FeePay from './pages/FeePay'
import FeeHistory from './pages/PayHistory'
import Statistic from "./pages/Statistic";
import CreateFee from "./pages/CreateFee";
import CreateUser from "./pages/CreateUser";
import CreateFamily from "./pages/CreateFamily"
import ChangePassword from "./pages/ChangePassword"
import ChangePasswordforAdmin from "./pages/ChangePasswordforAdmin";
import ForgetPassword from "./pages/ForgetPassword";
import FeeManage from "./pages/FeeManage";
import UserManage from "./pages/UserManage";
import FamilyManage from "./pages/FamilyManage";
import BillManage from "./pages/BillManage";
import CreateBill from "./pages/CreateBill";

const getUserData = () => 
    new Promise((resolve) =>
        setTimeout(() => {
            const user = window.localStorage.getItem("user");
            resolve(user);
        }, 3000)
);

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout/>} loader={() => defer({ userPromise: getUserData() })}>
            <Route element={<UnprotectedLayout/>}>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgetpass" element={<ForgetPassword/>}/>
            </Route>
            <Route element={<ProtectedLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/thongtin" element={<UserInformation/>}/>
                <Route path="/thuphi" element={<FeePay/>}/>
                <Route path="/lichsunop" element={<FeeHistory/>}/>
                <Route path="/thongke" element={<Statistic/>}/>
                <Route path="/changepass" element={<ChangePassword/>}/>
            </Route>
            <Route path="/admin" element={<AdminLayout/>}>
                <Route
                    index
                    element={<Navigate to="/admin/quanlyhokhau" />}
                />
                <Route path="/admin/quanlyphi" element={<FeeManage/>}/>
                <Route path="/admin/quanlythuphi" element={<BillManage/>}/>
                <Route path="/admin/quanlynhankhau" element={<UserManage/>}/>
                <Route path="/admin/quanlyhokhau" element={<FamilyManage/>}/>
                <Route path="/admin/addfee" element={<CreateFee/>}/>
                <Route path="/admin/adduser" element={<CreateUser/>}/>
                <Route path="/admin/addfamily" element={<CreateFamily/>}/>
                <Route path="/admin/addbill" element={<CreateBill/>}/>
                <Route path="/admin/changepass" element={<ChangePasswordforAdmin/>}/>
                <Route path="/admin/edit-user/:userId" element = {<CreateUser/>}/>
                <Route path="/admin/edit-family/:familyId" element = {<CreateFamily/>}/>
            </Route>
        </Route>
    )
);