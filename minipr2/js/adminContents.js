const adminContents = (page,section,content,header,data) =>{
    console.log(page,section,content,header,data)
    findHeaderAndData(section,content)
    document.getElementById("admin-content-layout").classList.add("hidden")
    const adminContentsElement = document.getElementById("admin-contents")
    adminContentsElement.classList.remove("hidden")

    const adminContentsHeading = adminContentsElement.querySelector("h3");
    adminContentsHeading.textContent = `Admin contents: Chỉnh sửa "${page} / ${section}/ ${content}"`;
    //set the text area
    const container = adminContentsElement.querySelector('.container')
    const textArea = container.querySelector('textarea')
    textArea.value = data.innerHTML
    //preview layout
    const previewLayout = adminContentsElement.querySelector('.preview-content')
    previewLayout.innerHTML = renderReviewLayout(section)

    const targetGridItem = findGridItemInPreview(previewLayout, content);

    // Update grid-item whenever the textarea content changes
    textArea.oninput = () => {
        if (targetGridItem) {
            targetGridItem.innerHTML = textArea.value;
        }
    };

}
export default adminContents

function findGridItemInPreview(previewLayout, content) {
    // Find all grid-headers in the preview layout
    const headers = previewLayout.querySelectorAll('.grid-header');
    for (let header of headers) {
        if (header.textContent.trim() === content) {
            // Return the next sibling element, which is the grid-item we need
            return header.nextElementSibling;
        }
    }
    return null; // Return null if no matching grid-item is found
}

function findHeaderAndData(section,content){
    let dataItem =''
    const sidebar = document.getElementById("mySidebar");
    const links = sidebar.querySelectorAll('.w3-bar-item');
    links.forEach(link => {
        if (link.textContent.trim() === section) {
            // Extract the value after the '#' in href
            const hrefValue = link.getAttribute('href').substring(1);
            // console.log(hrefValue);
            //th , strong , li
            // Find the target section by ID(the content of a section)
            const targetSection = document.getElementById(hrefValue);

            if (targetSection) {
                //console.log(targetSection.innerHTML)
                const headers = targetSection.querySelectorAll('.grid-header');
                headers.forEach(header => {
                    if (header.textContent.trim() === content) {
                        // Find the grid item immediately after this header
                        dataItem = header.nextElementSibling;
                        console.log(header,dataItem)
                    }
                });
            }
        }
    })
}

function renderReviewLayout(section){
    const sidebar = document.getElementById("mySidebar");
    const links = sidebar.querySelectorAll('.w3-bar-item'); // Select all links in the sidebar

    let html =''
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
            }
        }
    })
    return html
}