import React, { useState } from 'react';
import moment from 'moment-timezone';
import { Pagination } from '@mui/material';

const HistoryFeeList = ({ items }) => {
  const itemsPerPage = 5; // Adjust the number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{margin: '10px'}}>
      <table className="mt-4 table w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border-2 border-gray-400">Mã giao dịch</th>
            <th className="py-2 px-4 border-2 border-gray-400">Mã phí</th>
            <th className="py-2 px-4 border-2 border-gray-400">Mã hộ</th>
            <th className="py-2 px-4 border-2 border-gray-400">Chi tiết</th>
            <th className="py-2 px-4 border-2 border-gray-400">Số tiền</th>
            <th className="py-2 px-4 border-2 border-gray-400">Ngày thực hiện</th>
            <th className="py-2 px-4 border-2 border-gray-400">Người thực hiện</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-2">{item.billId}</td>
              <td className="py-2 px-4 border-2">{item.feeId}</td>
              <td className="py-2 px-4 border-2">{item.familyId}</td>
              <td className="py-2 px-4 border-2">{item.detail}</td>
              <td className="py-2 px-4 border-2">{item.money}</td>
              <td className="py-2 px-4 border-2">{moment.utc(item.date).tz("Asia/Bangkok").format("DD/MM/YYYY")}</td>
              <td className="py-2 px-4 border-2">{item.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="flex justify-center mt-4" size="large" variant="outlined" color="primary" count={Math.ceil(items.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
    </div>
  );
};

export default HistoryFeeList;