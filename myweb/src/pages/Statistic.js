import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import moment from "moment-timezone";
import LoadingScreen from "../components/LoadingScreen";
import StatisticBarChart from "../components/StatisticBarChart";

export default function Statistic() {
  const { user } = useAuth();
  const [statData, setStatData] = useState();
  const [chartData, setChartData] = useState();
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  const fetchFeeUser = async () => {
    try {
      const list = await fetchFunction({
        reqType: "/Bill/GetListByFamilyId/User", 
        UserId: user.UserId,
        accessToken: user.token
      });
      if(list.code === "200"){
        let monthtran = 0;
        let monthtime = 0;
        let yeartran = 0;
        let yeartime = 0;

        const dataset = [
          {
            trantime: 0,
            tranmoney: 0,
            month: 'Jan',
          },
          {
            trantime: 0,
            tranmoney: 0,
            month: 'Fev',
          },
          {
            trantime: 0,
            tranmoney: 0,
            month: 'Mar',
          },
          {
            trantime: 0,
            tranmoney: 0,
            month: 'Apr',
          },
          {
            trantime: 0,
            tranmoney: 0,
            month: 'May',
          },
          {
            trantime: 0,
            tranmoney: 0,
            month: 'June',
          },
          {
            trantime: 0,
            tranmoney: 0,
            month: 'July',
          },
          {
            trantime: 0,
            tranmoney: 0,
            month: 'Aug',
          },
          {
            trantime: 0,
            tranmoney: 0,
            month: 'Sept',
          },
          {
            trantime: 0,
            tranmoney: 0,
            month: 'Oct',
          },
          {
            trantime: 0,
            tranmoney: 0,
            month: 'Nov',
          },
          {
            trantime: 0,
            tranmoney: 0,
            month: 'Dec',
          },
        ];
        
        for (let i = 0; i < list.data.length; i++) {
          if(moment(list.data[i].date).tz("Asia/Bangkok").year() === currentYear){
            if(moment(list.data[i].date).tz("Asia/Bangkok").month() === currentMonth){
              monthtime++;
              monthtran += list.data[i].money;
            }
            yeartime++;
            yeartran += list.data[i].money;
            dataset[moment(list.data[i].date).tz("Asia/Bangkok").month()].trantime++;
            dataset[moment(list.data[i].date).tz("Asia/Bangkok").month()].tranmoney += list.data[i].money;
          }
        }

        setStatData({
          monthtransactiontime: monthtime,
          monthtransactionmoney: monthtran,
          yeartransactiontime: yeartime,
          yeartransactionmoney: yeartran
        });

        setChartData(dataset);
      }
      else{
        setError("Something went wrong!");
        console.log({message: "get fee user fail? code !== 200", data: user});
      }
    } catch (error) {
      setError("Something went wrong!");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeeUser();
  }, []);

  return (
    <div className="flex-grow">
      {statData ?
      <div style={{margin: "10px"}}>
        {error && <p className="text-red-500 font-bold text-[5rem]">error</p>}
        <div className="min-w-[55rem]">
          <p className="font-semibold text-center text-green-700 text-[1.5rem]">Biểu đồ các giao dịch được thực hiện trong năm nay</p>
          {chartData && <StatisticBarChart dataset = {chartData}/>}
        </div>
        <div className="flex">
          <div className="flex-grow w-[50%] shadow-md hover:shadow-xl">
            <h1 className="font-semibold text-center text-green-700 text-[1.1rem]" style={{marginBottom: '10px'}}>Thống kê các giao dịch được thực hiện trong tháng vừa qua</h1>
            <div className="text-center">
              <p><span className="font-semibold">Số giao dịch được thực hiện thành công:</span> {statData.monthtransactiontime}</p>
              <p><span className="font-semibold">Tổng tiền đã nộp:</span> {statData.monthtransactionmoney}</p>
            </div>
          </div>
          <div className="flex-grow w-[50%] shadow-md hover:shadow-xl">
            <h1 className="font-semibold text-center text-green-700 text-[1.1rem]" style={{marginBottom: '10px'}}>Thống kê các giao dịch được thực hiện trong năm nay</h1>
            <div className="text-center">
              <p><span className="font-semibold">Số giao dịch được thực hiện thành công:</span> {statData.yeartransactiontime}</p>
              <p><span className="font-semibold">Tổng tiền đã nộp:</span> {statData.yeartransactionmoney}</p>
            </div>
          </div>
        </div>
      </div> : (<LoadingScreen/>)}
    </div>
  )
};