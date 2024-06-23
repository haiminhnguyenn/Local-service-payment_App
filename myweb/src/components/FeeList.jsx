import React, { useState } from 'react';
import moment from 'moment-timezone';
import { Pagination, Popover, Typography } from '@mui/material';

const FeeList = ({ items }) => {
  const itemsPerPage = 5; // Adjust the number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? 'simple-popover' : undefined;

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

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
            <th className="py-2 px-4 border-2 border-gray-400">Mã phí</th>
            <th className="py-2 px-4 border-2 border-gray-400">Tên phí</th>
            <th className="py-2 px-4 border-2 border-gray-400">Chi tiết</th>
            <th className="py-2 px-4 border-2 border-gray-400">Ngày tạo</th>
            <th className="py-2 px-4 border-2 border-gray-400">Loại phí</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-2">{item.feeId}</td>
              <td className="py-2 px-4 border-2">{item.feeName}</td>
              <td className="py-2 px-4 border-2">{item.detail}</td>
              <td className="py-2 px-4 border-2">{moment.utc(item.dateCreate).tz("Asia/Bangkok").format("DD/MM/YYYY")}</td>
              <td className="py-2 px-4 border-2">{item.isRequired ? "Bắt buộc" : "Không bắt buộc"}</td>
              <td>
                <button className="w-[6rem] font-semibold ml-[5px] px-1 py-1 bg-transparent border border-gray-500 rounded-[1rem] hover:text-white hover:bg-gray-500 hover:border-transparent" onClick={e => {setAnchorEl(e.currentTarget);}}>Nộp ngay</button>
              </td>
            </tr>
          ))}
        </tbody>
       </table>
      <Pagination className="flex justify-center mt-4" size="large" variant="outlined" color="primary" count={Math.ceil(items.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
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
        <Typography className='w-[40rem] text-center' sx={{ p: 2 }}><span className='font-semibold text-green-700'>Please contact admin to settle the payment!</span></Typography>
      </Popover>
    </div>
  );
};

export default FeeList;