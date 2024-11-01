import adminMenuLeft from './adminMenuLeft.js';
// import textToSectionId from './sectionMappings.js';

const sections = document.querySelectorAll('.w3-top .w3-bar-item');
const container = document.querySelector('#admin-menu-top .itemcontainer.container'); // Select the itemcontainer div

// Add the default row for "Trang chủ"
const defaultRow = document.createElement('div');
defaultRow.className = 'row-item';
defaultRow.innerHTML = `
  <span class="text">Trang chủ</span>
  <i class="fa-regular fa-eye icon"></i>
  <i class=""></i>
  <i class=""></i>
  <i class="fa-solid fa-plus icon"></i>
`;
container.appendChild(defaultRow);

// Add a dotted line separator after the default row
const defaultDottedLine = document.createElement('div');
defaultDottedLine.className = 'dotted-line';
container.appendChild(defaultDottedLine);

// Loop through sections and add rows for each item except 'Admin Page'
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
    if (index < sections.length - 2) {
      const dottedLine = document.createElement('div');
      dottedLine.className = 'dotted-line';
      container.appendChild(dottedLine);
    }
  }
});

// Add the <hr> at the end of all rows
const hr = document.createElement('hr');
container.appendChild(hr);


//handle event
container.addEventListener('click', (event) => {
  const navbarLinks = document.querySelectorAll('.w3-top .w3-bar-item');
  if (event.target.classList.contains('fa-eye')){
    const row = event.target.closest('.row-item');
    const text = row.querySelector('.text').textContent.trim();
    adminMenuLeft(text);
  }
  if (event.target.classList.contains('fa-pencil')) {
    const row = event.target.closest('.row-item');
    const text = row.querySelector('.text').textContent.trim();
    const textElement = row.querySelector('.text');

    //update from navbar-top and current frame
    const matchingLink = Array.from(navbarLinks).find(link => link.textContent.trim() === text);
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

          // //update in the store
          // if (textToSectionId[oldName] && oldName!==newName) {
          //   textToSectionId[newName] = textToSectionId[oldName];
          //   delete textToSectionId[oldName];
          // }
          // console.log(textToSectionId)
        }
  
        // Restore original icons and text after updating
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
    const matchingLink = Array.from(navbarLinks).find(link => link.textContent.trim() === text);
    if (matchingLink) {
      matchingLink.remove(); // Remove the matching <a> from the navbar
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
    const matchingLink = Array.from(navbarLinks).find(link => link.textContent.trim() === text);
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
        newAnchor.href = "javascript:void(0)";
        newAnchor.onclick = () => showContent(''); // Assign the onclick event
        newAnchor.className = 'w3-bar-item w3-button';
        newAnchor.textContent = newName; // Set the link text

        // Insert the anchor after the matchingLink
        if (matchingLink) {
          matchingLink.insertAdjacentElement('afterend', newAnchor);
        }else if(text == 'Trang chủ'){
          if (navbarLinks.length > 0) { // Ensure there is at least one link
            navbarLinks[1].insertAdjacentElement('afterend', newAnchor);
          }
        }
      }
    })
  }
});