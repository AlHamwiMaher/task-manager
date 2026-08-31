import Spinner from './components/Spinner'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import { useState, useEffect } from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import PublicOnlyRoute from './components/PublicOnlyRoute'
function App() {

  return(
    <BrowserRouter>
      <Routes>
        
        <Route path='/login' element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        } />

        <Route path='/register' element={
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path='/dashboard' element={        
          <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>} />
        
        <Route path='/resetpassword' element={
          <PublicOnlyRoute>
            <ResetPassword />
          </PublicOnlyRoute>
        }/>

        <Route path='/recoveraccount' element={
          <PublicOnlyRoute>
            <ForgetPassword />
          </PublicOnlyRoute>
        }/>

        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    
    )
}

export default App