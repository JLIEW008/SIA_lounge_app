import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/home.jsx'
import About from './components/about.jsx'
import News from './components/news.jsx'
class App extends React.Component {
   render() {

      return (
         <Router>
            <div>
               Hello
               <Route exact path = "/" component= {Home}/>
               <Route path = "/about" component= {About}/>
               <Route path = "/news" component= {News}/>
            </div>
         </Router>
      );
   }
}
/*
We cannot use if else statements inside JSX, instead we can use conditional (ternary) expressions.
JavaScript expressions can be used inside of JSX. We just need to wrap it with curly brackets {}. 
If we want to return more elements, we need to wrap it with one container element. Notice how we are using div as a wrapper for h1, h2 and p elements.
React recommends using inline styles. When we want to set inline styles, we need to use camelCase syntax. 
*/
export default App;