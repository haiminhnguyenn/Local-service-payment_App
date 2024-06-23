import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import UserList from "../components/UserList";
import LoadingScreen from "../components/LoadingScreen";

import SearchIcon from '@mui/icons-material/Search';

function UserManage() {
    const { user } = useAuth();
    const [userList, setUserList] = useState();
    const [searchValue, setSearchValue] = useState('');

    const fetchUserList = async () => {
        try {
            const list = await fetchFunction({
                reqType: "/GetListUser", 
                UserId: user.UserId,
                accessToken: user.token
            });
            if(list.code == "200"){
                setUserList(list.data);
            }
            else{
                console.log({message: "get user list fail? code !== 200", data: user});
            }
        } catch (error) {
            console.log("get user list fail?");
        }
    };

    const fetchSearchUser = async () => {
        if(searchValue.trim() !== "") {
            try {
            const userData = await fetchFunction({
                reqType: '/GetListUser',
                UserId: user.UserId,
                accessToken: user.token
            });
        
            if (userData.code === "200") {
                let tempList = userData.data.filter((user) => user.userId.includes(searchValue.trim()));
                setUserList(tempList);
            } else {
                setUserList([])
                console.log("fetch error! code !== 200", user);
            }
            } catch (error) {
                console.log(error);
            }
        } else {
            fetchUserList();
        }
    };

    useEffect(() => {
        fetchUserList();
      }, []);

    return (
        <div>
            {userList ?
                <div className="ml-10 h-screen ">
                    <h1 className="text-center mb-5 text-2xl mt-4 font-bold">
                        Thông tin chi tiết các nhân khẩu
                    </h1>
        
                    <div className="flex w-full h-12 items-center">
                        <Link to='/admin/adduser' className="flex ml-3 content-center w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
                            Thêm nhân khẩu mới
                        </Link>
                
                        <form className="flex mx-auto justify-center items-center">
                            <input
                                type="text"
                                placeholder="Search by UserID"
                                id='UserId'
                                value={searchValue}
                                onChange={(e)=> setSearchValue(e.target.value)}
                                className="w-full px-3 py-2 text-default border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            />
        
                            <button type="button" className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800" onClick={fetchSearchUser}>
                                <SearchIcon/>
                            </button>
                        </form>
                    </div>
                    
                    <UserList items={userList} setUserList={setUserList} mode={true}/>
                </div> : <LoadingScreen/>
            }
        </div>
    );
};

export default UserManage;