import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { AdminThemeContext } from '../context/ThemeContextDef'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const { theme, toggleTheme } = useContext(AdminThemeContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white dark:bg-gray-900 dark:border-gray-700 transition-colors'>
      <div className='flex items-center gap-2 text-xs'>
        <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/')}>
          <img className='w-10' src={assets.logo} alt="" />
          <p className='text-xl font-semibold text-gray-700 dark:text-white'>DocConnect</p>
        </div>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 dark:text-gray-300 dark:border-gray-400'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <div className='flex items-center gap-4'>
        <button onClick={toggleTheme} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-gray-50 dark:bg-gray-800 border dark:border-gray-700'>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button onClick={() => logout()} className='bg-primary text-white text-sm px-10 py-2 rounded-full hover:scale-105 transition-all'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar