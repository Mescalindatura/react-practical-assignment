import "./App.css"
import React, {useEffect} from "react";
import {useAppSelector} from "./app/hooks";
import Auth from "./components/Auth";
import Page from "./components/Page";
import ErrorPage from "./components/ErrorPage";
import AddEditModal from "./components/AddEditModal";


function App() {
  useEffect(() => {
    // TEST API, it might be removed
    fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
      console.log('API CONNECTION IS OK');
    }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))
  }, []);

    const isLogIn = useAppSelector(state=>state.users.isLoggedIn);
const isError = useAppSelector(state=>state.page.isError);
const modalIsOpen = useAppSelector(state=>state.modal.isOpen);
    return (
        <div className="App">
            {isLogIn?<Page/>:<Auth/>}
          {isError&&<ErrorPage/>}
            {modalIsOpen && (
                <div className="modal-overlay">
                    <AddEditModal />
                </div>
            )}
        </div>
    );
}

export default App
