import Header from '../components/header/Header'

function InfoPage() {
  return (
    <>
      <Header />
      <div style={{ 
        width: '100%',
        minHeight: 'calc(100vh - 60px)',
        marginTop: '60px', // Push content below fixed header
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        maxWidth: '800px',
        margin: '60px auto 0 auto', // Top margin for header, auto center
        boxSizing: 'border-box'
      }}>
        <h1 style={{ color: '#707070ff', margin: '0 auto 30px' }}>DevSecOps Demo Repository</h1>
        
        <div style={{ 
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h2 style={{ color: '#495057', marginBottom: '15px' }}>Purpose</h2>
          <p style={{ color: '#6c757d', lineHeight: '1.6', margin: 0 }}>
            This repository demonstrates common web application security vulnerabilities for educational purposes. 
            It serves as a learning tool for understanding security flaws and implementing DevSecOps practices 
            in development workflows.
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h2 style={{ color: '#856404', marginBottom: '15px' }}>⚠️ Security Vulnerabilities (Educational)</h2>
          <p style={{ color: '#856404', fontSize: '14px', fontStyle: 'italic', marginBottom: '15px' }}>
            The following vulnerabilities are intentionally implemented for demonstration:
          </p>
          <ul style={{ color: '#856404', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li><strong>Plain Text Password Storage:</strong> Passwords stored without encryption in localStorage</li>
            <li><strong>Credential Logging:</strong> User credentials logged to browser console</li>
            <li><strong>Client-Side Authentication:</strong> Authentication logic handled entirely on frontend</li>
            <li><strong>Data Exposure:</strong> Sensitive user data accessible in browser storage</li>
            <li><strong>No Input Validation:</strong> Missing password strength requirements and input sanitization</li>
            <li><strong>Session Management:</strong> Insecure session handling without proper tokens</li>
          </ul>
          <p style={{ 
            color: '#d63384', 
            fontSize: '14px', 
            fontWeight: 'bold', 
            marginTop: '15px',
            marginBottom: 0 
          }}>
            ⚠️ Never use these patterns in production applications!
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '20px'
        }}>
          <h2 style={{ color: '#721c24', marginBottom: '15px' }}>🔓 Try These Exploits (Demo Only)</h2>
          <p style={{ color: '#721c24', fontSize: '14px', fontStyle: 'italic', marginBottom: '15px' }}>
            Since this is a demo app, you can safely try these attacks to understand the vulnerabilities:
          </p>
          
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#721c24', fontSize: '16px', marginBottom: '8px' }}>1. View All User Data (Including Passwords)</h3>
            <div style={{ 
              backgroundColor: '#2d3748', 
              color: '#e2e8f0', 
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              Press F12 → Console → Type:<br/>
              <code style={{ color: '#68d391' }}>JSON.parse(localStorage.getItem('registeredUsers'))</code>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#721c24', fontSize: '16px', marginBottom: '8px' }}>2. Instant Admin Privilege Escalation</h3>
            <div style={{ 
              backgroundColor: '#2d3748', 
              color: '#e2e8f0', 
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              Press F12 → Console → Type:<br/>
              <code style={{ color: '#fbb6ce' }}>localStorage.setItem('userRole', 'admin')</code><br/>
              <code style={{ color: '#fbb6ce' }}>location.reload()</code>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#721c24', fontSize: '16px', marginBottom: '8px' }}>3. Account Impersonation</h3>
            <div style={{ 
              backgroundColor: '#2d3748', 
              color: '#e2e8f0', 
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              First get usernames with step 1, then:<br/>
              <code style={{ color: '#f6e05e' }}>localStorage.setItem('currentUser', 'target_username')</code><br/>
              <code style={{ color: '#f6e05e' }}>localStorage.setItem('sessionToken', btoa('target_username:' + Date.now()))</code><br/>
              <code style={{ color: '#f6e05e' }}>location.reload()</code>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#721c24', fontSize: '16px', marginBottom: '8px' }}>4. View Browser Storage</h3>
            <div style={{ 
              backgroundColor: '#2d3748', 
              color: '#e2e8f0', 
              padding: '10px', 
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              Press F12 → Application → Local Storage → View all data
            </div>
          </div>

          <p style={{ 
            color: '#721c24', 
            fontSize: '14px', 
            fontWeight: 'bold', 
            marginTop: '15px',
            marginBottom: 0,
            textAlign: 'center'
          }}>
            🚨 This demonstrates why client-side security is not real security!
          </p>
        </div>
      </div>
    </>
  )
}

export default InfoPage;
