import Container from 'react-bootstrap/esm/Container';
import './App.scss';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import { UserContext } from './context/UserContext';
import { useContext, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {

  const { user, loginContext } = useContext(UserContext)

  useEffect(()=>{
    if(localStorage.getItem("token")){
      loginContext(localStorage.getItem("email") , localStorage.getItem("token"))
    }
  })
  return (
    <>
      <div className="app-container">
      <Header />
        <Container>
          <AppRoutes/>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
