/*Exercise 1 : React Router Error Boundary
In a new Javascript file, create an ErrorBoundary Class Component:
  Create a state with a property named hasError, set by default to false.
  Use a componentDidCatch() method to set the value of the hasError property.
Install React Router Dom in your app and check out the NavLink documentation
In the App.js file, add this line:
  import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
You can also install React Bootstrap in your app. In the App.js file, add this line:
  import "bootstrap/dist/css/bootstrap.min.css";
In the App.js file, display a Bootstrap navbar, containing three React Router <NavLink></NavLink>:
  the first one redirects to /
  the second one redirects to /profile
  the third one redirects to /shop
In the App.js file, create three functional components : HomeScreen, ProfileScreen, and ShopScreen.
  HomeScreen and will display a header tag
  ProfileScreen will display a header tag
  ShopScreen will throw an error
7. Add a Route for each of the functional component. Each one has a different path.
8. Wrap each of the functional component with the ErrorBoundary component.

Exercise 4 : Post JSON Data with React JS
Go to webhook and copy the link of “Your unique URL”.
Remember to turn on “Enable CORS” on the webhook website.
In the App.js file, create an async await function to fetch the json data from the URL you copied.
Use a POST method and some headers.
Send this hardcoded stringified json data to your body.
key1: 'myusername',
email: 'mymail@gmail.com',
name: 'Isaac',
lastname: 'Doe',
age: 27
4. In the App.js file, create a button, that when clicked on, displays the response in the console.
5. Finally, open the webhook site again, and check the output in the API.*/

import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PostList from './PostList';
import {Example1, Example2, Example3} from './ExampleList';

const HomeScreen = () => (
  <div className="container mt-4">
    <h1>Home</h1>
  </div>
);

const ProfileScreen = () => (
  <div className="container mt-4">
    <h1>Profile</h1>
  </div>
);

const ShopScreen = () => {
  throw new Error("An Error occurred!");
  return (
    <div className="container mt-4">
      <h1>Shop</h1>
    </div>
  );
};

const postData = async () => {
    const webhookUrl = 'https://webhook.site/3098b40e-546b-4f15-9843-7cac272108a0';

    const payload = {
      key1: 'myusername',
      email: 'mymail@gmail.com',
      name: 'Isaac',
      lastname: 'Doe',
      age: 27
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        /*headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },*/
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: JSON.stringify(payload)
      });

      const data = await response.text();
      
      console.log('Success Response:', data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


const App = () => (
  <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active fw-bold" : "nav-link"}>
              Home
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active fw-bold" : "nav-link"}>
              Profile
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => isActive ? "nav-link active fw-bold" : "nav-link"}>
              Shop
            </NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
            <ErrorBoundary>
              <HomeScreen />
            </ErrorBoundary>
          } 
        />
        <Route path="/profile" element={
            <ErrorBoundary>
              <ProfileScreen />
            </ErrorBoundary>
          } 
        />
        <Route path="/shop" element={
            <ErrorBoundary>
              <ShopScreen />
            </ErrorBoundary>
          } 
        />
      </Routes>
    <PostList />
    <Example1 />
    <Example2 />
    <Example3 />

    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Post JSON Data to Webhook</h1>
      <button onClick={postData} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Send POST Request
      </button>
    </div>
  </BrowserRouter>
);

export default App;
