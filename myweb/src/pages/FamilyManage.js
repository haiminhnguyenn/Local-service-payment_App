import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import FamilyList from "../components/FamilyList";
import LoadingScreen from "../components/LoadingScreen";

function FamilyManage() {
    const { user } = useAuth();
    const [familyList, setFamilyList] = useState();
    const fetchFamilyList = async () => {
        try {
            const list = await fetchFunction({
                reqType: "/Family/GetList", 
                UserId: user.UserId,
                accessToken: user.token
            });
            if(list.code == "200"){
                setFamilyList(list.data);
            }
            else{
                console.log({message: "get user list fail? code !== 200", data: user});
            }
        } catch (error) {
            console.log("get family list fail?");
        }
    };
    useEffect(() => {
        fetchFamilyList();
    }, []);
    
    return(
        <div>
            {familyList ?
                <div className="ml-8 h-screen ">
                    <h1 className="text-center mb-5 text-2xl mt-4 font-bold">
                        Thông tin chi tiết các hộ khẩu
                    </h1>
                    <Link to='/admin/addfamily' className="inline-block w-52 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
                        Thêm hộ khẩu mới
                    </Link>
                    
                    <FamilyList items={familyList} setFamilyList={setFamilyList} />
                </div> : <LoadingScreen/>
            }
        </div>
    );
};

export default FamilyManage;