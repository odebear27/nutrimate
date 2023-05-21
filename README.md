This was a group project which I collaborated with 3 other developers for NTU SCTP Software Engineering.

## How we worked on this project

Our goal was to simulate a professional work environment.

- We worked with tasks on a Kanban board: [ScreenRecord of tasks](https://drive.google.com/file/d/1msQlCsGaTrRJ9EYak9b27cK5DP8gFaxV/view?usp=share_link)
- We used feature branches and Pull Requests: [Example PR](https://drive.google.com/file/d/1OSWOYE9Ixy8lMH09oJlGww0KBnNHqzLt/view?usp=share_link)

## How to navigate this project

- Use of useEffect and useState: [Example code](src/pages/MyFeedPage.js)
- Use of custom CSS: [Example code](src/App.css)
- The application fetches data from Spoonacular API: Example for the [request](src/App.js)
- Responsive CSS: [Example code](src/components/Carousel.module.css)
- Use of Routes: [Example code](src/App.js)
- Pagination: [Example code](src/components/RecipeCard.js)

## Why was the project built this way

- The design of the web application was mainly from css libraries such as MDB react and Bootstrap as this project timeline was 1.5 weeks only. We wanted something that was already there for us to use.

## If I had more time I would change this

- Refactor the code to use useContext as there is too much of props drilling involved in each component [here](src/App.js)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Additional libraries to install:

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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
