import './App.css';
import './Pom.css';
import NavBar from './NavBar'
import Auth from './Auth'
import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';


function App() {
  let [loggedin, setLoggedin] = useState(false)
  
  useEffect(() => {
  
    return () => {
      if(localStorage.getItem('POM_TOKEN') !== null){
        setLoggedin(true)
      }
    }
  }, [])
  
  
  return (
    <>
      <NavBar name={loggedin?"Dashboard":"Authentication"} loggedin={loggedin}></NavBar>
      {/* <Button name="This is functinal component Button"></Button>   */}
      {
        loggedin?<Dashboard login={setLoggedin}></Dashboard>:<Auth login={setLoggedin}></Auth>
      }
      
    </>
  );
}

export default App;
