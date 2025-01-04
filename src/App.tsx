import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import LoginPage from './components/LoginPage/LoginPage'
import SignUpPage from './components/SignUpPage/SignUpPage'
import HomePage from './components/HomePage/HomePage'

type PageType = 'landing' | 'signup' | 'login' | 'home'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')

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
      case 'home':
        return <HomePage 
          onLogOut={() => setCurrentPage('landing')}
        />
      default:
        return <HomePage 
          onLogOut={() => setCurrentPage('landing')}
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