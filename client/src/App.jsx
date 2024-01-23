import { TestContextProvider } from './contextManager';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import DashboardLayout from './pages/dashboard/Layout';
import DashboardHome from './pages/dashboard/Home';

import ViewNote from './pages/dashboard/ViewNote';
import NewNote from './pages/dashboard/NewNote';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  // const result = useContext(messageContext);
  return (
    <BrowserRouter>
      <TestContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Route>
          <Route path='/dashboard' element={<DashboardLayout />} >
            <Route index element={<DashboardHome />} />
            <Route path='/dashboard/viewnote' element={<ViewNote />} />
            <Route path='/dashboard/newnote' element={<NewNote />} />
          </Route>
        </Routes>
      </TestContextProvider>
    </BrowserRouter>
  )
}

export default App
