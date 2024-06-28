import React,{useState} from 'react'
import { loginfunc } from '../../utils/apiconfig';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = loginfunc(username, password,navigate);
  return (
    <div>
      <form method="post" onSubmit={handleLogin}>
        <label>username:</label>
        <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <br/>
        <label>password:</label>
        <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login