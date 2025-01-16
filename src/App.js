import './App.css';
import './Pom.css';
import NavBar from './NavBar'
import Login from './Login'
import { useState } from 'react';
import Dashboard from './Dashboard';


function App() {
  let [loggedin, setLoggedin] = useState(false)
  const login = ()=>{
    setLoggedin(true)
  }
  const logout = ()=>{
    setLoggedin(false)
  }
  return (
    <>
      <NavBar name={loggedin?"Dashboard":"Authentication"}></NavBar>
      {/* <Button name="This is functinal component Button"></Button>     */}
      {
        loggedin?<Dashboard logout={logout}></Dashboard>:<Login login={login}></Login>
      }
      
    </>
  );
}

export default App;
