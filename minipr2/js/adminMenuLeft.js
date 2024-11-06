import adminContentLayout from "./adminContentLayout.js";
import resetStudentInfo from "./resetStudentInfo.js"

const adminMenuLeft = (text) => {
    //console.log("Received text:", text);

    //display the admin menu left , hidden the admin menu top
    document.getElementById("admin-menu-top").classList.add("hidden");
    const adminMenuLeftElement = document.getElementById("admin-menu-left")
    adminMenuLeftElement.classList.remove("hidden")
    const adminMenuLeftHeading = adminMenuLeftElement.querySelector("h3");
    adminMenuLeftHeading.textContent = `Admin menu left: Chỉnh sửa "${text}"`;
    if(text === 'Thông tin sinh viên'){
      adminMenuLeftHeading.innerHTML += `<i class="fa-solid fa-rotate-left" style="padding-left: 18px;"></i>`
      adminMenuLeftHeading.onclick = () => {
        if (adminMenuLeftHeading.querySelector('.fa-rotate-left')) {
            resetStudentInfo();
            updateStudentInfoContent()
        }
    }
    }
    //set id base on the navbar-top name
    let id
    if (text === "Trang chủ") {
        id = 'courseInfo'
    }else{
        id = getSectionIdFromText(text)
    }
    if(id) updateSidebar(id)
    //console.log(id)

    const sections = document.querySelectorAll('#mySidebar a')
    //console.log(sections)
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
    const hr = document.createElement('hr');
    container.appendChild(hr);

    //handle event
    const sidebar = document.getElementById("mySidebar");
    sidebar.addEventListener('click', (event) => {
      if (event.target.classList.contains('w3-bar-item')) {
        const clickedText = event.target.textContent.trim()
        adminContentLayout(text, clickedText)
      }
    })

    container.addEventListener('click', (event) => {
        const sections = document.querySelectorAll('#mySidebar a')
        if (event.target.classList.contains('fa-eye')){
          const row = event.target.closest('.row-item'); 
          const rowText = row.querySelector('.text').textContent.trim(); 
          // (page,section) = (text, rowText)
          adminContentLayout(text, rowText);
        }

        if (event.target.classList.contains('fa-pencil')) {
            const row = event.target.closest('.row-item');
            const text = row.querySelector('.text').textContent.trim();
            const textElement = row.querySelector('.text');

            const matchingLink = Array.from(sections).find(section => section.textContent.trim() === text);
            if (matchingLink) {
                // Create a textbox and OK button
                const inputBox = document.createElement('input');
                inputBox.type = 'text';
                inputBox.value = text;
                inputBox.className = 'update-input';
            
                const okButton = document.createElement('button');
                okButton.textContent = 'OK';
                okButton.className = 'ok-button';
            
                // Clear row content and add the textbox and button
                row.innerHTML = ''; // Clear existing content in the row
                row.appendChild(inputBox);
                row.appendChild(okButton);

                // Add event listener for OK button click
                okButton.addEventListener('click', () => {
                    const oldName = text;
                    const newName = inputBox.value.trim();
            
                    if (newName) {
                        // Update text in navbar and current row
                        matchingLink.textContent = newName;
                        textElement.textContent = newName;
                    }
                    row.innerHTML = `
                        <span class="text">${newName}</span>
                        <i class="fa-regular fa-eye icon"></i>
                        <i class="fa-solid fa-pencil icon"></i>
                        <i class="fa-thin fa-x icon"></i>
                        <i class="fa-solid fa-plus icon"></i>
                        `;
                });
            }
        }

        if (event.target.classList.contains('fa-x')) {
            const row = event.target.closest('.row-item');
            const text = row.querySelector('.text').textContent.trim();
        
            //delete from navbar-top and current frame
            const matchingLink = Array.from(sections).find(section => section.textContent.trim() === text);
            if (matchingLink) {
              matchingLink.remove(); 
              const dottedLine = row.previousElementSibling;
              if (dottedLine && dottedLine.classList.contains('dotted-line')) {
                dottedLine.remove(); // Remove the dotted line above the row if it exists
              }
              row.remove(); //remove the row
            }
        }

        if (event.target.classList.contains('fa-plus')) {
            const row = event.target.closest('.row-item');
            const text = row.querySelector('.text').textContent.trim();
            //find on navbar-top
            const matchingLink = Array.from(sections).find(section => section.textContent.trim() === text);
            // Create a new row for the textbox and button
            const newRow = document.createElement('div');
            newRow.className = 'row-item';
        
            // Create a textbox and OK button
            const inputBox = document.createElement('input');
            inputBox.type = 'text';
            inputBox.className = 'update-input';
        
            const okButton = document.createElement('button');
            okButton.textContent = 'OK';
            okButton.className = 'ok-button';
        
            newRow.appendChild(inputBox);
            newRow.appendChild(okButton);
        
            const newDottedLine = document.createElement('div');
            newDottedLine.className = 'dotted-line';
        
            // Insert 
            row.insertAdjacentElement('afterend', newDottedLine);
            newDottedLine.insertAdjacentElement('afterend', newRow);
        
            //submit new name
            okButton.addEventListener('click', () => {
              const newName = inputBox.value.trim();
              if (newName) {
                newRow.innerHTML = `
                  <span class="text">${newName}</span>
                  <i class="fa-regular fa-eye icon"></i>
                  <i class="fa-solid fa-pencil icon"></i>
                  <i class="fa-thin fa-x icon"></i>
                  <i class="fa-solid fa-plus icon"></i>
                `;
        
                // Create a new anchor element
                const newAnchor = document.createElement('a');
                newAnchor.href = "";
                newAnchor.className = 'w3-bar-item w3-button w3-hover-black';
                newAnchor.textContent = newName; // Set the link text
        
                // Insert the anchor after the matchingLink
                if (matchingLink) {
                  matchingLink.insertAdjacentElement('afterend', newAnchor);
                }
              }
            })
          }
    })
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

function updateStudentInfoContent(){
  const adminMenuLeftElement = document.getElementById("admin-menu-left")
  const sections = document.querySelectorAll('#mySidebar a')
    //console.log(sections)
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
    const hr = document.createElement('hr');
    container.appendChild(hr);
}
