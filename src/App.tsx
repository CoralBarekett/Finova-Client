import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import LoginPage from './components/LoginPage/LoginPage'
import SignUpPage from './components/SignUpPage/SignUpPage'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage 
          onSignUp={() => setCurrentPage('signup')}
          onLogIn={() => setCurrentPage('login')}
        />
      case 'signup':
        return <SignUpPage 
          onBackToLanding={() => setCurrentPage('landing')}
          onSwitchToLogin={() => setCurrentPage('login')}
        />
      case 'login':
        return <LoginPage 
          onBackToLanding={() => setCurrentPage('landing')}
          onSwitchToSignup={() => setCurrentPage('signup')}
        />
      default:
        return <LandingPage 
          onSignUp={() => setCurrentPage('signup')}
          onLogIn={() => setCurrentPage('login')}
        />
    }
  }

  return (
    <>
      {renderPage()}
    </>
  )
}

export default App