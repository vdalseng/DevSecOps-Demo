import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/header/Header'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'

function Home() {
  const [count, setCount] = useState(0)
  const currentUser = localStorage.getItem('currentUser')
  const userRole = localStorage.getItem('userRole')

  return (
    <>
      <Header />
      <div style={{ 
        width: '100%',
        height: 'calc(100vh - 60px)',
        marginTop: '60px', // Push content below fixed header
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1200px',
        margin: '60px auto 0 auto', // Top margin for header, auto center
        boxSizing: 'border-box',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        {/* Welcome Section */}
        {currentUser && (
          <div style={{ 
            backgroundColor: '#d4edda', 
            border: '1px solid #c3e6cb',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: '0 0 10px 0', color: '#155724' }}>
              Welcome back, {currentUser}! 
              {userRole === 'admin' && ' 👑'}
            </h2>
            <p style={{ margin: '0', color: '#155724' }}>
              You are logged in as: <strong>{userRole}</strong>
              {userRole === 'admin' && ' (Administrator privileges)'}
            </p>
          </div>
        )}

        {/* Main Content */}
        <div style={{ textAlign: 'center' }}>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
            
            {!currentUser && (
              <Link 
                to="/login"
                style={{ 
                  display: 'inline-block',
                  marginTop: '20px', 
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  textDecoration: 'none'
                }}
              >
                � Login to Continue
              </Link>
            )}
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
          
          {/* User List Section */}
          {currentUser && <UserList />}
        </div>
      </div>
    </>
  )
}

// Component to show registered users (vulnerable implementation)
function UserList() {
  // 🚨 VULNERABILITY: Storing sensitive data in localStorage
  const storedUsers = localStorage.getItem('registeredUsers')
  const users = storedUsers ? JSON.parse(storedUsers) : []

  const currentUser = localStorage.getItem('currentUser')
  const userRole = localStorage.getItem('userRole')

  return (
    <div style={{ 
      marginTop: '40px',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <h3 style={{ marginTop: '0', color: '#495057' }}>
        {userRole === 'admin' ? '👑 Admin View: All Registered Users' : '👥 Your Profile'}
      </h3>
      
      {userRole === 'admin' ? (
        <div>
          {users.length === 0 ? (
            <p style={{ color: '#6c757d' }}>No users registered yet.</p>
          ) : (
            <div style={{ textAlign: 'left' }}>
              {users.map((user: any, index: number) => (
                <div key={index} style={{ 
                  marginBottom: '10px',
                  padding: '10px',
                  backgroundColor: '#fff',
                  borderRadius: '4px',
                  border: '1px solid #dee2e6'
                }}>
                  <strong>{user.username}</strong> 
                  {user.username === currentUser && ' (You)'}
                  <br />
                  <small style={{ color: '#6c757d' }}>
                    {/* 🚨 VULNERABILITY: Exposing sensitive data */}
                    Email: {user.email} | Role: {user.role} | 
                    Registered: {new Date(user.registeredAt).toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Regular users can only see their own info */}
          {users
            .filter((user: any) => user.username === currentUser)
            .map((user: any, index: number) => (
              <div key={index} style={{ 
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '4px',
                border: '1px solid #dee2e6',
                color: '#000000ff'
              }}>
                <strong>Your Profile:</strong><br />
                Username: {user.username}<br />
                Email: {user.email}<br />
                Role: {user.role}<br />
                Member since: {new Date(user.registeredAt).toLocaleDateString()}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default Home
