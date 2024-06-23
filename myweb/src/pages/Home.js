import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  return (
    <div className='flex-grow m-auto text-center'>
      <p className='text-[5rem]'>Chào mừng đến với trang quản lý thu phí của nhóm 9</p>
      <div className='flex justify-center'>
        <div className='text-[1.5rem] mt-10 shadow-xl w-[30rem] hover:shadow-2xl hover:bg-gray-100'>
          <p className='font-semibold text-[1.7rem]'>Các thành viên của nhóm</p>
          <p>Nguyễn Đình Út Biu</p>
          <p>Trần Trọng Khiêm</p>
          <p>Nguyễn Duy Tấn</p>
          <p>Nguyễn Thành Trung</p>
          <p>Nguyễn Hải Minh</p>
        </div>
      </div>
    </div>
  )
};