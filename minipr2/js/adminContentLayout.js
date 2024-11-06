const adminContentLayout = (page,section) =>{
    console.log(page,section)
    document.getElementById("admin-menu-left").classList.add("hidden");
    const adminContentLayoutElement = document.getElementById("admin-content-layout")
    adminContentLayoutElement.classList.remove("hidden")
    //set the heading
    const adminContentLayoutHeading = adminContentLayoutElement.querySelector("h3");
    adminContentLayoutHeading.textContent = `Admin contents layout: Chỉnh sửa "${page} / ${section}"`;

    //console.log(sections)
    const container = adminContentLayoutElement.querySelector('.container')
    container.innerHTML = '';
    //preview layout
    const previewLayout = adminContentLayoutElement.querySelector('.preview-content')

    const headers = updateContent(section)
    // console.log(headers)
    headers.forEach((header, index) => {
        if (header !== '') {
            // Create a row element for each header
            // console.log(header)
            const row = document.createElement('div');
            row.className = 'row-item';
            row.innerHTML = `
                <span class="text">${header}</span>
                <i class="fa-regular fa-eye icon"></i>
                <i class="fa-solid fa-pencil icon"></i>
                <i class="fa-thin fa-x icon"></i>
                <i class="fa-solid fa-plus icon"></i>
            `;
            container.appendChild(row);

            // Add a dotted line separator except after the last item
            if (index < headers.length - 1) {
                const dottedLine = document.createElement('div');
                dottedLine.className = 'dotted-line';
                container.appendChild(dottedLine);
            }
        }
    });
    const hr = document.createElement('hr');
    container.appendChild(hr);

    previewLayout.innerHTML = renderReviewLayout(section)

    container.addEventListener('click', (event) =>{

    })

}
export default adminContentLayout

function updateContent(section){
    const sidebar = document.getElementById("mySidebar");
    const links = sidebar.querySelectorAll('.w3-bar-item'); // Select all links in the sidebar

    let headers = []
    // Loop through each link to find the one with the specified section name
    links.forEach(link => {
        if (link.textContent.trim() === section) {
            // Extract the value after the '#' in href
            const hrefValue = link.getAttribute('href').substring(1);
            // console.log(hrefValue);
            //th , strong , li
            // Find the target section by ID(the content of a section)
            const targetSection = document.getElementById(hrefValue);

            if (targetSection) {
                // Find the first <table> within the target section
                const table = targetSection.querySelector('table');
                if (table) {
                    // Collect all <th> elements within the table
                    headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim())
                }
            } else {
                console.log("Section not found.");
            }
        }
    })
    return headers
}

//find the corresponding html in index.html and return it
function renderReviewLayout(section){
    const sidebar = document.getElementById("mySidebar");
    const links = sidebar.querySelectorAll('.w3-bar-item'); // Select all links in the sidebar

    let html 
    // Loop through each link to find the one with the specified section name
    links.forEach(link => {
        if (link.textContent.trim() === section) {
            // Extract the value after the '#' in href
            const hrefValue = link.getAttribute('href').substring(1);
            // console.log(hrefValue);
            //th , strong , li
            // Find the target section by ID(the content of a section)
            const targetSection = document.getElementById(hrefValue);

            if (targetSection) {
                html = targetSection.innerHTML
                console.log(html)
            }
        }
    })
    return html
}