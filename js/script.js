/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
document.addEventListener('DOMContentLoaded', () => {
   const ul = document.querySelector(".student-list");

   /*
   For assistance:
      Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
      Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
   */



   /*
   Create the `showPage` function
   This function will create and insert/append the elements needed to display a "page" of nine students
   */


   let spot;
   const studentList = data;
   const totalStudents = studentList.length;

   console.log("Total Students:", totalStudents);
   console.log("RPH1 checking student name:", studentList[1].name.last);

   function createStudentLI(spot){
      const studentToCopy = studentList[spot];

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

      //Final setup of li element
      const li = createElement('li', 'class', "student-item cf");
      appendToLI('div', 'class', "student-details");
      appendToLI('div', 'class', "student-details");

      return li;
   }

//// li.className = 'AAA';

   //   const ul = document.getElementsByClassName("student-list");
   //const lin = createStudentLI(2)
   //ul.appendChild(document.createElement("div"));
   ul.appendChild(createStudentLI(2));

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

   //appendToLI('span', 'textContent', "phubbs");
   //appendToLI('div', 'class', "student-details");
   // appendToLI('span', 'textContent', text);
   // appendToLI('label', 'textContent', 'Confirmed')
   //    .appendChild(createElement('input', 'type', 'checkbox'));
   // appendToLI('button', 'textContent', 'edit');
   // appendToLI('button', 'textContent', 'remove');
   function sendStudents(){

   }



   /*
   Create the `addPagination` function
   This function will create and insert/append the elements needed for the pagination buttons
   */




   // Call functions

});