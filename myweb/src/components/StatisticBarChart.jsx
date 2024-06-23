import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  width: 700,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-70px, 0)',
    },
    [`.${axisClasses.right} .${axisClasses.label}`]: {
      transform: 'translate(70px, 0)',
    },
  },
};

const labelStyle = {
  fill: 'blue', // Set the font color
  fontSize: 20,  // Set the font size
  fontWeight: 'bold', // Set the font weight
  fontFamily: 'Arial, sans-serif', // Set the font family
};

const valueFormatter = (value) => `${value} Lần`;
const valueFormatter2 = (value) => `${value} VND`;

const StatisticBarChart = ({dataset}) => {
    return(
        <div className="flex justify-center">
            <BarChart 
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            yAxis={[
              { id: 'trantimey', scaleType: 'linear', dataKey: 'tranmoney', label: 'Số lần thực hiện giao dịch (lần)'}, 
              { id: 'tranmoneyy', scaleType: 'linear', dataKey: 'trantime', label: 'Số tiền đã giao dịch (vnd)'}]}
            series={[
                { yAxisKey: 'trantimey', dataKey: 'trantime', label: 'Số lần thực hiện giao dịch', valueFormatter },
                { yAxisKey: 'tranmoneyy',dataKey: 'tranmoney', label: 'Tổng số tiền dùng để thực hiện giao dịch', valueFormatter2 }
            ]}
            leftAxis="trantimey"
            rightAxis="tranmoneyy"
            label={labelStyle}
            {...chartSetting}
            />
        </div>
    );
};

export default StatisticBarChart;