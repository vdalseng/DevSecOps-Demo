import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  const currentUser = localStorage.getItem('currentUser')

  const handleLogout = () => {
    localStorage.removeItem('sessionToken')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('userRole')
    window.location.href = '/login'
  }

  return (
    <nav style={{ 
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '1000',
      height: '60px',
      padding: '10px 20px', 
      backgroundColor: '#f5f5f5', 
      borderBottom: '1px solid #ddd',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <Link to="/" style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          textDecoration: 'none',
          color: '#333'
        }}>
          DevSecOps Demo
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link 
            to="/"
            style={{ 
              margin: '0 10px',
              padding: '8px 16px',
              textDecoration: 'none',
              borderRadius: '4px',
              backgroundColor: location.pathname === '/' ? '#007acc' : 'transparent',
              color: location.pathname === '/' ? 'white' : '#007acc'
            }}
          >
            Home
          </Link>
          
          <Link 
            to="/info"
            style={{ 
              margin: '0 10px',
              padding: '8px 16px',
              textDecoration: 'none',
              borderRadius: '4px',
              backgroundColor: location.pathname === '/info' ? '#6f42c1' : 'transparent',
              color: location.pathname === '/info' ? 'white' : '#6f42c1'
            }}
          >
            Info
          </Link>
          
          {!currentUser ? (
            <Link 
              to="/login"
              style={{ 
                margin: '0 10px',
                padding: '8px 16px',
                textDecoration: 'none',
                borderRadius: '4px',
                backgroundColor: location.pathname === '/login' ? '#28a745' : 'transparent',
                color: location.pathname === '/login' ? 'white' : '#28a745'
              }}
            >
              � Login
            </Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ margin: '0 10px', color: '#495057', fontSize: '14px' }}>
                Welcome, <strong>{currentUser}</strong>
              </span>
              <button
                onClick={handleLogout}
                style={{
                  margin: '0 10px',
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
