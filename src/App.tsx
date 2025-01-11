import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import LoginPage from './components/LoginPage/LoginPage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import UserProfilePage from './components/UserProfilePage/UserProfilePage'
import HomePage from './components/HomePage/HomePage'

function App() {
  const AppRoutes = () => {
    const navigate = useNavigate();
    
    return (
      <Routes>
        <Route path="/" element={
          <LandingPage
            onSignUp={() => navigate('/signup')}
            onLogIn={() => navigate('/login')}
          />
        } />
        <Route path="/signup" element={
          <SignUpPage
            onBackToLanding={() => navigate('/')}
            onSwitchToLogin={() => navigate('/login')}
          />
        } />
        <Route path="/login" element={
          <LoginPage
            onBackToLanding={() => navigate('/')}
            onSwitchToSignup={() => navigate('/signup')}
          />
        } />
        <Route path="/home" element=
          {<HomePage 
              onLogOut={() => navigate('/home')} />} 
          />
        <Route path="/user-profile" element={<UserProfilePage accountType={'free'} />} />
      </Routes>
    );
  };

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App