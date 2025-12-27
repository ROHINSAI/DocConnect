import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <div className='flex items-center gap-2 mb-5'>
            <img className='w-10' src={assets.logo} alt="" />
            <p className='text-xl font-bold text-gray-800 dark:text-white'>DocConnect</p>
          </div>
          <p className='w-full md:w-2/3 text-gray-600 dark:text-gray-300 leading-6'>DocConnect is your trusted partner in managing healthcare needs. We bridge the gap between patients and trusted healthcare providers, making appointment booking seamless and efficient.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-gray-800 dark:text-white'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600 dark:text-gray-300'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-gray-800 dark:text-white'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600 dark:text-gray-300'>
            <li>8019722677</li>
            <li>rohinsai.b23@iiits.in</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className='dark:border-gray-700' />
        <p className='py-5 text-sm text-center text-gray-600 dark:text-gray-400'>Copyright 2024 @ DocConnect.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
