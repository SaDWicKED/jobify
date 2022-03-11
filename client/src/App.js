import { 
  Dashboard, 
  Register, 
  Landing, 
  Error, 
} from './pages';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link 
} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to='/'>Dashboard</Link>
        <Link to='/register'>Register</Link>
        <Link to='/landing'>Home</Link>
      </nav>
      <Routes>
        <Route index element={<Dashboard/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;