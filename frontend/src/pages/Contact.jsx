import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070] dark:text-gray-300'>
        <p>CONTACT <span className='text-gray-700 font-semibold dark:text-white'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className=' font-semibold text-lg text-gray-600 dark:text-gray-200'>OUR OFFICE</p>
          <p className=' text-gray-500 dark:text-gray-400'>Sri City, tada, <br /> andhra pradesh</p>
          <p className=' text-gray-500 dark:text-gray-400'>Tel: 8019722677 <br /> Email: rohinsai.b23@iiits.in</p>
          <p className=' font-semibold text-lg text-gray-600 dark:text-gray-200'>CAREERS AT DocConnect</p>
          <p className=' text-gray-500 dark:text-gray-400'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact
