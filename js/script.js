/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
document.addEventListener('DOMContentLoaded', () => {
   let header = document.querySelector(".header");
   let ul = document.querySelector(".student-list");
   const ulButton = document.querySelector(".link-list");
   let filterText;
   let filterButton = null;
   let currentStart = 0;
   let buttonNowSelected = 1;

   function buttonTotal(){
      let totalButtons = Math.ceil(studentList.length/9);
      return totalButtons;
   }

   /*
   For assistance:
      Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
      Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
   */



   /*
   Create the `showPage` function
   This function will create and insert/append the elements needed to display a "page" of nine students
   */
   let studentList = data;
   let totalStudents = studentList.length;

   //Log for later use
   //console.log("Total Students:", totalStudents);

   //Create 1 Student profile/square
   function createStudentLI(spot){
      const oneStudent = studentList[spot];
      const name = oneStudent.name.last + " " + oneStudent.name.first;

      //2 steps to create the elements
      function createElement(elementName, property, value) {
         const element = document.createElement(elementName);
         element[property] = value;
         return element;
      }  

      function appendToLI(elementName, property, value) {
         const element = createElement(elementName, property, value);
         li.appendChild(element);
         return element;
      }

      //Final setup of each element piece within li element
      const li = createElement('li', 'className', "student-item cf");
      const myImage = createElement('img', 'className', 'avatar');
      myImage.setAttribute("src", oneStudent.picture.medium);
      const myName = createElement('h3');
      myName.textContent = name;
      let contact = createElement('span', 'className', 'email');
      contact.textContent = oneStudent.email;
     
      //Pieces all the elements together
      appendToLI('div', 'className', "student-details")
        .append(myImage, myName, contact);
      let joinDate = createElement('span', 'className', 'date');
      joinDate.textContent = "Joined " + oneStudent.registered.date;  
      appendToLI('div', 'className', "joined-details")
         .append(joinDate);
      
      return li;
   }

/*
   // EXAMPLE - Student list item:
   // <li class="student-item cf">
   //   <div class="student-details">
   //     <img class="avatar" src="https://randomuser.me/api/portraits/women/25.jpg" alt="Profile Picture">
   //     <h3>Ethel Dean</h3>
   //     <span class="email">ethel.dean@example.com</span>
   //   </div>
   //   <div class="joined-details">
   //     <span class="date">Joined 12-15-2005</span>
   //   </div>
   // </li>
*/

   function showPage(){
      let start = currentStart; 
      let end = buttonNowSelected * 9; 
      let remainingStudents = (totalStudents - start)

      //check if 9 still can are shown
      if(remainingStudents < 9){
        end = totalStudents;
      }else if (remainingStudents == 0){
         start = 0;
         end = 9;
      }
     
      removeAllStudents();

      //Now add the students
      for (let i = start; i < end; i++){
         ul.appendChild(createStudentLI(i));
      }

      makeFiltering();
   }

   /*
   Create the `addPagination` function
   This function will create and insert/append the elements needed for the pagination buttons
   */
   function addPagination(list){
      let totalButtons = buttonTotal();

      removeButtons();

      function createElement(elementName, property, value) {
         const element = document.createElement(elementName);
         element[property] = value;
         return element;
      } 

      //Add the buttons 1 - X
      for (let i = 1; i < (totalButtons+1); i++){
         let li = createElement('li');
         let button = createElement('button');
         button.setAttribute("type", "button");
         button.textContent = i;

         if(i === 1){
            button.setAttribute("className", "active");
         }

         li.appendChild(button);
         ulButton.append(li);   
      }   
   }

   function makeFiltering(){

      function createElement(elementName, property, value) {
         const element = document.createElement(elementName);
         element[property] = value;
         return element;
      } 

      //    <label for="search" class="student-search">
      //       <span>Search by name</span>
      //       <input id="search" placeholder="Search by name...">
      //       <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      //    </label> 

      let filterInput =  header.querySelectorAll("#search");

      if(filterInput.length == 0){
         //Each element and and its attributes      
         let label = createElement('label', 'className', 'student-search');
         label.setAttribute("for","search");
         let span = createElement('span');
         span.innerHTML = 'Search by name';
         let filterInput = createElement('input');
         filterInput.setAttribute("id","search");
         filterInput.setAttribute("placeholder","Search by name...");
         let button = createElement('button', 'type', 'button');
         let myImage = createElement('img', 'src', 'img/icn-search.svg');
         
         //Now append them together
         button.append(myImage);
         label.append(span, filterInput, button);
         header.appendChild(label);

         filterButton = button;
      }

      filterInput =  header.querySelectorAll("#search");
      finalFilter = filterInput;
   }

   function removeAllStudents(){
      let students =  ul.querySelectorAll(".student-item.cf");

      students.forEach(student => {
         student.remove();
       });
   };

   function findButtons(){
      const buttons =  ulButton.querySelectorAll("button");
      return buttons;
   };

   function removeButtons(){
      const buttons =  ulButton.querySelectorAll("li");

      buttons.forEach(paginate => {
         paginate.remove();
       });
   };
   
   // Clicking the paginate
   ulButton.addEventListener('click', (e) => {

      if (e.target.tagName === 'BUTTON') {
         const totalButtons = buttonTotal();
         const button = e.target;
         const allButtons = findButtons();

         for (let i = 0; i < (allButtons.length); i++){
            allButtons[i].removeAttribute("className");
         }

         //const button = e.target;
         button.setAttribute("className", "active");
         buttonNowSelected = button.textContent;

         currentStart = (9 * (buttonNowSelected - 1));
      }

      //Now refresh the page shown
      showPage();
      addPagination(studentList);
   });

   showPage();
   addPagination(studentList);
   
   function filterStudents(filter){
      let studentFilterList = data;
      let finalList = [];

      if((filter.length == 0) || (filter == null) ){
         studentList = data;
         totalStudents = studentList.length;
      }else{
         for (let i = 0; i < (studentFilterList.length); i++){         
            let name = (studentFilterList[i].name.first + " " +
            studentFilterList[i].name.last).toLowerCase();

            filter = filter.toLowerCase();
            filterText = filter;

            if (name.includes(filter.toLowerCase())){
               finalList.push(studentFilterList[i]);
            }
         }

         studentList = finalList;
         totalStudents = studentList.length;
      }

      //Confirm the paginate is updated by the filter
      addPagination(studentList);
   }

   filterButton.addEventListener('click', (e) => {
      let input = header.querySelector('input');
      const text = input.value;
           
      filterStudents(text);

      showPage();
    });
});