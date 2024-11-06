const resetStudentInfo = () => {
    const studentInfoContainer = document.querySelector("#student-info .container")
    studentInfoContainer.innerHTML = ``
    updateSideBar()
    updateContent(studentInfoContainer)
}
export default resetStudentInfo

function updateSideBar() {
    const sidebar = document.getElementById("mySidebar");
    sidebar.innerHTML = '';
    sidebar.innerHTML = `
        <h4 class="w3-bar-item"><b>Thông tin sinh viên</b></h4>
        <a class="w3-bar-item w3-button w3-hover-black" href="#cv">Curriculum vitae (CV)</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#project">Các dự án đã tham gia</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#social-life">Hoạt động cộng đồng</a>
    `
}
function updateContent(studentInfoContainer) {
    studentInfoContainer.innerHTML += `
        <div class="section-header">Curriculum vitae (CV)</div>
        <div class="student-info" id="cv" style="height: 50%">
            
            <div class="left">
                <img src="./assets/bocchi.jpg" alt="Student Photo" class="profile-photo" style="padding-right: 5%;border: none;" >
            </div>
            <div class="right">
                <div class="details"><span>Họ và tên:</span> Hồ Tuấn Hải</div>
                <div class="details"><span>Năm vào trường:</span> 2021</div>
                <div class="details"><span>Bậc đào tạo:</span> KSCLC-TN-TT-VNVP-ICT</div>
                <div class="details"><span>Chương trình:</span> Công nghệ thông tin Việt-Pháp 2021</div>
                <div class="details"><span>MSSV:</span> 20210304</div>
                <div class="details"><span>Giới tính:</span> Nam</div>
                <div class="details"><span>Lớp:</span> Việt-Pháp 01-K66</div>
                <div class="details"><span>Khóa học:</span> 66</div>
                <div class="details"><span>Email:</span> hai.ht210304@sis.hust.edu.vn</div>
            </div>
        </div>
    `

    studentInfoContainer.innerHTML += `
        <div class="projects-info" id="project">
          <div class="section-header">Các dự án đã tham gia</div>
          <div class="project">
            <table class="table-info">
              <tr>
                <th>Ứng dụng Quản lý Dân số</th>
                <td>Nhóm 4 người <br>
                  Nhiệm vụ: Thiết kế giao diện người dùng, phát triển các tính năng front-end <br>
                  Công nghệ sử dụng: Java, SQLServer <br>
                  Mục tiêu: Tạo giao diện người dùng cho hệ thống</td>
              </tr>
              <tr>
                <th>Web bán hàng eCommerce</th>
                <td>Cá nhân <br>
                  Nhiệm vụ: Phát triển mô phỏng lazada <br>
                  Công nghệ sử dụng: MongoDB,React, NodeJS <br>
                  Mục tiêu: Đáp ứng nhu cầu bán hàng</td>
              </tr>
              <tr>
                <th>Máy tính cơ bản</th>
                <td>Cá nhân <br>
                  Công nghệ sử dụng: Python
                </td>
              </tr>
            </table>
          </div>
        </div>
    `

    studentInfoContainer.innerHTML += `
        <div class="projects-info" id="social-life">
          <div class="section-header">Hoạt động cộng đồng</div>
          <div class="social">
            <table class="table-info">
              <tr>
                <th>Hiến máu nhân đạo</th>
                <td>Hưởng ứng phong trào của nhà trường <br>
                  Quyền lợi: được xét nghiệm máu miễn phí <br>
                  Địa điểm: Trước thư viện Tạ Quang Biểu <br>
                  Bên đối tác: Medlatech</td>
              </tr>
              <tr>
                <th>Cốc trà đá vì cộng đồng</th>
                <td>
                  Quyền lợi: điểm rèn luyện<br>
                  Địa điểm: Trước tòa C1 hoặc tòa D3 <br>
                  Bên đối tác: Công ty TNHH asss</td>
              </tr>
            </table>
          </div>
        </div>
    `
}