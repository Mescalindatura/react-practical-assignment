import "./App.css"
import {useEffect} from "react";
import {useAppSelector} from "./app/hooks";
import Main from "./components/Main";
import Auth from "./components/Auth";

function App() {
  useEffect(() => {
    // TEST API, it might be removed
    fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
      console.log('API CONNECTION IS OK');
    }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))
  }, []);

    const isLogIn = useAppSelector(state=>state.users.isLoggedIn);

    return (
        <div className="App">
            {isLogIn?<Main/>:<Auth/>}
        </div>
    );
}

export default App
