import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/header/Header'

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    if (isLogin) {
      // Login logic
      if (username && password) {
        // 🚨 VULNERABILITY: Check against localStorage (insecure)
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
        const user = registeredUsers.find((u: any) => u.username === username)
        
        if (user) {
          // 🚨 VULNERABILITY: Plain text password comparison
          if (user.password === password) {
            // 🚨 VULNERABILITY: Exposing credentials in console
            console.log('Login successful:', { username, password })
            
            // 🚨 VULNERABILITY: Predictable session token
            const sessionToken = btoa(`${username}:${Date.now()}`)
            localStorage.setItem('sessionToken', sessionToken)
            localStorage.setItem('currentUser', username)
            localStorage.setItem('userRole', user.role)
            
            setTimeout(() => {
              setIsLoading(false)
              navigate('/')
            }, 1000)
          } else {
            setError('Invalid password')
            setIsLoading(false)
          }
        } else {
          setError('User not found')
          setIsLoading(false)
        }
      } else {
        setError('Please fill in all fields')
        setIsLoading(false)
      }
    } else {
      // Registration logic
      if (username && email && password && confirmPassword) {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setIsLoading(false)
          return
        }
        
        // 🚨 VULNERABILITY: Storing sensitive data in localStorage
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
        
        // 🚨 VULNERABILITY: No duplicate username check
        const newUser = {
          username,
          email,
          password, // 🚨 VULNERABILITY: Storing plain text passwords
          role: username.toLowerCase() === 'admin' ? 'admin' : 'user',
          registeredAt: new Date().toISOString()
        }
        
        registeredUsers.push(newUser)
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
        
        // 🚨 VULNERABILITY: Exposing registration data in console
        console.log('User registered:', newUser)
        
        setTimeout(() => {
          setIsLoading(false)
          setIsLogin(true)
          setUsername('')
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          setError('')
        }, 1000)
      } else {
        setError('Please fill in all fields')
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <Header />
      <div style={{ 
        width: '100%',
        height: 'calc(100vh - 60px)', // Use exact height, not min-height
        paddingTop: '0', // Remove conflicting padding
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <div style={{ 
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: '10px', color: '#333' }}>
            {isLogin ? '🔐 Login' : '📝 Register'}
          </h1>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '14px', 
            color: '#6c757d', 
            marginBottom: '30px' 
          }}>
            {isLogin ? 'Enter your credentials to access the application' : 'Create a new account'}
          </p>
          
          {error && (
            <div style={{
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              color: '#721c24',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500',
                color: '#495057'
              }}>
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ced4da',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            {!isLogin && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  color: '#495057'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ced4da',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontSize: '14px', 
                fontWeight: '500',
                color: '#495057'
              }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ced4da',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            {!isLogin && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  color: '#495057'
                }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ced4da',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: isLoading ? '#6c757d' : (isLogin ? '#007bff' : '#28a745'),
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              {isLoading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
                setUsername('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link 
              to="/"
              style={{ 
                color: '#007bff',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage;
