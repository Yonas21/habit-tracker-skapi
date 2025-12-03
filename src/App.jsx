import { useState, useEffect } from 'react'
import { skapi } from './skapi.js'
import Auth from './components/Auth'
import ActivityForm from './components/ActivityForm'
import ActivityList from './components/ActivityList'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    // Check if user is already logged in
    skapi.getProfile().then(profile => {
      setUser(profile)
      setLoading(false)
    })

    // Listen for login/logout events
    skapi.onLogin = (profile) => {
      setUser(profile)
    }
  }, [])

  const handleLogin = (userProfile) => {
    setUser(userProfile)
  }

  const handleLogout = async () => {
    try {
      await skapi.logout()
      setUser(null)
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const handleActivityAdded = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Auth onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Habit Tracker</h1>
          <div className="user-info">
            <span className="user-name">{user.name || user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <ActivityForm onActivityAdded={handleActivityAdded} user={user} />
        <ActivityList refreshTrigger={refreshTrigger} />
      </main>
    </div>
  )
}

export default App
