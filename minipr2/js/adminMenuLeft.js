const adminMenuLeft = (text) => {
    console.log("Received text:", text);
    const navbarLinks = document.querySelectorAll('.w3-top .w3-bar-item');

    //display the admin menu left , hidden the admin menu top
    document.getElementById("admin-menu-top").classList.add("hidden");
    const adminMenuLeftElement = document.getElementById("admin-menu-left")
    adminMenuLeftElement.classList.remove("hidden")
    const adminMenuLeftHeading = adminMenuLeftElement.querySelector("h3");
    adminMenuLeftHeading.textContent = `Admin menu left: Chỉnh sửa "${text}"`;
    //set id base on the navbar-top name
    let id
    if (text === "Trang chủ") {
        id = 'courseInfo'
    }else{
        id = getSectionIdFromText(text)
    }
    if(id) updateSidebar(id)
    console.log(id)

    const sections = document.querySelectorAll('#mySidebar a')
    console.log(sections)
    const container = adminMenuLeftElement.querySelector('.container')

    // Clear previous items in the container before adding new ones
    container.innerHTML = '';

    sections.forEach((section, index) => {
        if (section.textContent.trim() !== 'Admin Page' && section.innerText.trim() !== '') {
            // Create a row element for each section
            const row = document.createElement('div');
            row.className = 'row-item';
            row.innerHTML = `
                <span class="text">${section.textContent.trim()}</span>
                <i class="fa-regular fa-eye icon"></i>
                <i class="fa-solid fa-pencil icon"></i>
                <i class="fa-thin fa-x icon"></i>
                <i class="fa-solid fa-plus icon"></i>
            `;
            container.appendChild(row);

            // Add a dotted line separator except after the last item
            if (index < sections.length - 1) {
                const dottedLine = document.createElement('div');
                dottedLine.className = 'dotted-line';
                container.appendChild(dottedLine);
            }
        }
    });
};

export default adminMenuLeft;

function getSectionIdFromText(text) {
    const links = document.querySelectorAll("a.w3-bar-item.w3-button");
    for (let link of links) {
        if (link.textContent.trim() === text) {
            // Extract the section ID from the 'onclick' attribute
            const onclickAttr = link.getAttribute("onclick");
            const match = onclickAttr.match(/showContent\('(.+?)'\)/);
            return match ? match[1] : null;
        }
    }
    return null; // Return null if no match is found
}
function updateSidebar(sectionId) {
    const sidebar = document.getElementById("mySidebar");
    sidebar.innerHTML = ''; // Clear existing sidebar content
  
    if (sectionId === 'courseInfo') {
      sidebar.innerHTML = `
        <h4 class="w3-bar-item"><b>Menu</b></h4>
        <a class="w3-bar-item w3-button w3-hover-black" href="#classInfo">Thông tin khai giảng</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#seminar">Thông tin Seminar</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#company">Thông tin công ty quan tâm</a>
      `;
    } else if (sectionId === 'info') {
      sidebar.innerHTML = `
        <h4 class="w3-bar-item"><b>Thông tin môn học</b></h4>
        <a class="w3-bar-item w3-button w3-hover-black" href="#summaryVN">Mô tả tóm tắt học phần (tiếng Việt) (*)</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#summaryEN">Mô tả tóm tắt học phần (tiếng Anh) (*)</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#contentVN">Nội dung tóm tắt học phần (tiếng Việt) (*)</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#contentEN">Nội dung tóm tắt học phần (tiếng Anh) (*)</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#reference">Sách tham khảo</a>
      `;
    } else if (sectionId === 'web-tech') {
      sidebar.innerHTML = `
        <h4 class="w3-bar-item"><b>Công nghệ Web</b></h4>
        <a class="w3-bar-item w3-button w3-hover-black" href="#frontend">1. Frontend (Giao diện người dùng)</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#backend">2. Backend (Máy chủ và xử lý dữ liệu)</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#database">3. Cơ sở dữ liệu</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#api">4. API và Tích hợp dịch vụ</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#devops">5. DevOps và Triển khai</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#security">6. Bảo mật</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#testing">7. Testing và Debugging</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#optimization">8. Performance Optimization</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#authentication">9. User Authentication & Authorization</a>
      `;
    } else if (sectionId === 'student-info') {
      sidebar.innerHTML = `
        <h4 class="w3-bar-item"><b>Thông tin sinh viên</b></h4>
        <a class="w3-bar-item w3-button w3-hover-black" href="#academic-info">Thông tin học tập</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#skills-info">Kĩ năng</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#projects-info">Dự án</a>
        <a class="w3-bar-item w3-button w3-hover-black" href="#hobbies-info">Sở thích</a>
      `;
    }
  }