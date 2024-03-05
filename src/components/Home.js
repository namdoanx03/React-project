import React from 'react'

const Home = () => {
  return (
    <div className='home-container'>
      <br/>
        <div>Yêu cầu:</div>
        <div>Sử dụng API từ trang wed https://reqres.in/ để tạo website</div>
        <p>Sử dụng thư viện React để tạo một màn hình website cơ bản bao gồm các chức năng:</p>
        <ol>
            <li>Đăng nhập</li>
            <li>Thêm User</li>
            <li>Sửa User</li>
            <li>Xóa User</li>
            <li>Hiển thị tất cả các User</li>
            <li>Tìm kiếm User theo Id</li>
            <li>Sắp xếp theo FirstName</li>
            <li>Import User từ file.csv</li>
            <li>Export User ra file.csv</li>
        </ol>
        <div>Tự do tùy chỉnh html, css để có một wedsite nhẹ nhàng, khoa học và đẹp.</div>

    </div>
  )
}

export default Home