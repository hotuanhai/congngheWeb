import adminContents from "./adminContents.js";

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
        const previewLayout = adminContentLayoutElement.querySelector('.preview-content')
        const sections = previewLayout.querySelectorAll('.grid-header')
        const gridItems = previewLayout.querySelectorAll('.grid-item:not(.grid-header)')

        if (event.target.classList.contains('fa-eye')){
            const row = event.target.closest('.row-item');
            const text = row.querySelector('.text').textContent.trim();
            const matchingLink = Array.from(sections).find(section => section.textContent.trim() === text)
            const index = Array.from(sections).indexOf(matchingLink)
            adminContents(page,section,text,matchingLink,gridItems[index])
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
            
                    if (newName && newName !== '') {
                        // Update text in preview and current row
                        matchingLink.textContent = newName;
                        textElement.textContent = newName;
                    
                        row.innerHTML = `
                            <span class="text">${newName}</span>
                            <i class="fa-regular fa-eye icon"></i>
                            <i class="fa-solid fa-pencil icon"></i>
                            <i class="fa-thin fa-x icon"></i>
                            <i class="fa-solid fa-plus icon"></i>
                            `;
                    }
                });
            }
        }
        if (event.target.classList.contains('fa-x')) {
            const row = event.target.closest('.row-item');
            const text = row.querySelector('.text').textContent.trim();
        
            //
            const matchingLink = Array.from(sections).find(section => section.textContent.trim() === text);
            if (matchingLink) {
                //remove in the preview
                const index = Array.from(sections).indexOf(matchingLink)
                matchingLink.remove(); 
                gridItems[index].remove()

                const dottedLine = row.nextElementSibling;
                if (dottedLine && dottedLine.classList.contains('dotted-line')) {
                    dottedLine.remove(); // Remove the dotted line above the row if it exists
                }
                row.remove(); //remove the row
            }
        }
        if (event.target.classList.contains('fa-plus')){
            const row = event.target.closest('.row-item');
            const text = row.querySelector('.text').textContent.trim();
            const matchingLink = Array.from(sections).find(section => section.textContent.trim() === text);

            const newRow = document.createElement('div');
            newRow.className = 'row-item';
            newRow.style='grid-template-columns: 40% 25% 25% 10%;'
            // Create a textbox and OK button
            const inputBoxName = document.createElement('input');
            inputBoxName.type = 'text';
            inputBoxName.className = 'update-input';
            inputBoxName.placeholder = 'tên'
            const inputBoxRow = document.createElement('input');
            inputBoxRow.type = 'number';
            inputBoxRow.className = 'update-input';
            inputBoxRow.placeholder = 'số hàng(<=10)'
            inputBoxRow.max = 10
            inputBoxRow.min=1
            inputBoxRow.required = true;
        
            const inputBoxCol = document.createElement('input');
            inputBoxCol.type = 'number';
            inputBoxCol.className = 'update-input';
            inputBoxCol.placeholder = 'số cột(<=10)'
            inputBoxCol.max = 10
            inputBoxCol.min=1
            inputBoxCol.required = true;
        
            const okButton = document.createElement('button');
            okButton.textContent = 'OK';
            okButton.className = 'ok-button';
        
            newRow.appendChild(inputBoxName);
            newRow.appendChild(inputBoxCol);
            newRow.appendChild(inputBoxRow);
            newRow.appendChild(okButton);

            const newDottedLine = document.createElement('div');
            newDottedLine.className = 'dotted-line';
        
            // Insert 
            row.insertAdjacentElement('afterend', newDottedLine);
            newDottedLine.insertAdjacentElement('afterend', newRow);

            okButton.addEventListener('click', () => {
                const newName = inputBoxName.value.trim();
                const row =  parseInt(inputBoxRow.value, 10)
                const col =  parseInt(inputBoxCol.value, 10)

                if (newName) {
                    newRow.innerHTML = `
                        <span class="text">${newName}</span>
                        <i class="fa-regular fa-eye icon"></i>
                        <i class="fa-solid fa-pencil icon"></i>
                        <i class="fa-thin fa-x icon"></i>
                        <i class="fa-solid fa-plus icon"></i>
                    `;
                    newRow.style='grid-template-columns: 60% 10% 10% 10% 10%;'

                    const newHeader = document.createElement('div');
                    newHeader.className = 'grid-item grid-header';
                    newHeader.textContent = newName;
                    newHeader.style.gridRow = `span ${row}`;
                    newHeader.style.gridColumn = `span ${col}`;

                    const newContent = document.createElement('div');
                    newContent.className = 'grid-item';
                    newContent.style.gridRow = `span ${row}`;
                    newContent.style.gridColumn = `span ${10-col}`;
                    
                    // Insert new elements after `matchingLink`
                    const index = Array.from(sections).indexOf(matchingLink)
                    gridItems[index].insertAdjacentElement('afterend', newContent);
                    gridItems[index].insertAdjacentElement('afterend', newHeader);
                }
            })
        }
    })

}
export default adminContentLayout

function updateContent(section){
    const sidebar = document.getElementById("mySidebar");
    const links = sidebar.querySelectorAll('.w3-bar-item'); 
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
            console.log(targetSection)
            if (targetSection) {
                // '.grid-info' for table, '.grid-container' for text
                const gridInfo = targetSection.querySelector('.grid-info');
                const gridContainer = targetSection.querySelector('.grid-container');
                //get the name
                if (gridInfo) {
                    // Collect all <th> elements within the table
                    headers = Array.from(gridInfo.querySelectorAll('.grid-header')).map(header => header.textContent.trim())
                }else if(gridContainer){

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
            }
        }
    })
    return html
}