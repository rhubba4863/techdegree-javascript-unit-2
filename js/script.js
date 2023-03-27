/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
document.addEventListener('DOMContentLoaded', () => {
   let header = document.querySelector(".header");
   let ul = document.querySelector(".student-list");
   const ulButton = document.querySelector(".link-list");
   //let shownStudentList = data;
   let currentStart = 0;
   let currentEnd = 0;
   let counter = 0; //RPH: might not be needed
   let buttonNowSelected = 1;

   function buttonTotal(){
      const totalButtons = Math.ceil(studentList.length/9);
      console.log("pages expected "+(totalButtons));
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

   //let spot;
   const studentList = data;
   const totalStudents = studentList.length;

   console.log("Total Students:", totalStudents);
   console.log("RPH1 checking student name:", studentList[1].name.last);

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
      
     // console.log(li);
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
         counter = counter++;
      }

      console.log("currentStart:", currentStart);
      console.log("Start:", start);
      console.log("End:", end);

      makeFiltering();
   }

   /*
   Create the `addPagination` function
   This function will create and insert/append the elements needed for the pagination buttons
   */
   function addPagination(list){
      const totalButtons = buttonTotal();

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

      //Header is defined globally
      //let header = document.querySelector(".header");
      let h2Title = header.querySelector("h2");

      // search.append(createElement('label'))
      
      let label = createElement('label', 'className', 'student-search');
      label.setAttribute("for","search");
      let span = createElement('span');
      let filterInput = createElement('input');
      filterInput.setAttribute("id","search");
      filterInput.setAttribute("placeholder","Search by name...");
      let button = createElement('button', 'type', 'button');

      //h2Title.appendChild(label);
      //, filterInput, button
      //label.setAttribute("","");
   }

   function removeAllStudents(){
      let students =  ul.querySelectorAll(".student-item.cf");
      console.log("1) students to remove:" + students.length);

      students.forEach(student => {
         student.remove();
       });
       console.log("2) students to remove:" + students.length);
   };

   function findButtons(){
      const buttons =  ulButton.querySelectorAll("button");

      // console.log(buttons.length);
      // console.log(buttons[0].getAttribute("className"));
      // console.log(buttons[0].hasAttribute("className"));

      // for (let i = 0; i < (buttons.length); i++){
      //    console.log(i + " "+ buttons[i].hasAttribute("className"));
      // }

      return buttons;
   };
   
   // Call functions
   ulButton.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const totalButtons = buttonTotal();
         const button = e.target;
         const allButtons = findButtons();

         for (let i = 0; i < (allButtons.length); i++){
            //console.log(i);
            allButtons[i].removeAttribute("className");
         }

         //const button = e.target;
         button.setAttribute("className", "active");
         buttonNowSelected = button.textContent;

         currentStart = (9 * (buttonNowSelected - 1));
      }


       showPage();
      // addPagination(studentList);
   });
   
   showPage();
   addPagination(studentList);
   //findButtons();

   function filterStudents(name){
      let studentList = data;
   }
});