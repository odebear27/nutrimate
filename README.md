This was a group project which I collaborated with 3 other developers for NTU SCTP Software Engineering.

### How we worked on this project

Our goal was to simulate a professional work environment.

- We worked with tasks on a Kanban board: [ScreenRecord of tasks](https://drive.google.com/file/d/1msQlCsGaTrRJ9EYak9b27cK5DP8gFaxV/view?usp=share_link)
- We used feature branches and Pull Requests: [Example PR](https://drive.google.com/file/d/1OSWOYE9Ixy8lMH09oJlGww0KBnNHqzLt/view?usp=share_link)

### How to navigate this project

- Use of useEffect and useState: [Example code](src/pages/MyFeedPage.js)
- Use of custom CSS: [Example code](src/App.css)
- The application fetches data from Spoonacular API: Example for the [request](src/App.js)
- Responsive CSS: [Example code](src/components/Carousel.module.css)
- Use of Routes: [Example code](src/App.js)
- Pagination: [Example code](src/components/RecipeCard.js)

### Why was the project built this way

- The design of the web application was mainly from css libraries such as MDB react and Bootstrap as this project timeline was 1.5 weeks only. We wanted something that was already there for us to use.

### If I had more time I would change this

- Refactor the code to use useContext as there is too much of props drilling involved in each component [here](src/App.js)

#### Additional libraries to install:

npm install react-bootstrap bootstrap  
npm install react-router-dom  
npm i mdb-react-ui-kit  
npm i @fortawesome/fontawesome-free  
npm install --save mdbreact  
npm install @mui/material @emotion/react @emotion/styled  
npm install @mui/icons-material  
npm install axios  
npm i react-share  
npm install @material-ui/core
