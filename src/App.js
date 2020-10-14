import React from 'react';
import {BrowserRouter,Switch ,Route} from "react-router-dom"
import Home from "./Pages/Home"
import NavBar from "./Components/NavBar"

function App() {
  return (
    <div className="App">
      <NavBar/>
     <BrowserRouter>
     <Switch>
          <Route path="/" exact component={Home} />
       
     </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
