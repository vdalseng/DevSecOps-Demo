import { Link } from 'react-router-dom'
import Header from '../components/header/Header'

function NotFoundPage() {
  return (
    <>
      <Header />
      <div style={{ 
        paddingTop: '60px',
        width: '100%',
        height: 'calc(100vh - 60px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
      <h1 style={{ fontSize: '72px', margin: '0' }}>404</h1>
      <h2 style={{ color: '#666' }}>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      
      <div style={{ marginTop: '20px' }}>
        <Link 
          to="/"
          style={{ 
            display: 'inline-block',
            backgroundColor: '#007acc',
            color: 'white',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            margin: '0 10px'
          }}
        >
          Go Home
        </Link>
        <Link 
          to="/login"
          style={{ 
            display: 'inline-block',
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            margin: '0 10px'
          }}
        >
          Login
        </Link>
      </div>
      </div>
    </>
  )
}

export default NotFoundPage
