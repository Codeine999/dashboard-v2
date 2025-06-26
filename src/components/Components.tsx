import React, { Children } from 'react'
import { Button } from './ui/button'


export const Wrapper = ({ children }) => {
  return (
    <div className='md:px-4 2xl:mt-12 md:mt-6  mt-4 max-w-[2000px]'>
      {children}
    </div>
  )
}

export const Header = ({ title }) => {
  return (
    <h1 className='text-[26px] text-[#545454] '>
      {title}
    </h1>
  )
}

export const HeadText = ({ title }) => {
  return (
    <h1 className='3xl:text-[24px] text-[20px] font-bold text-[#879da7]'>
      {title}
    </h1>
  )
}

export const SubText = ({ title }) => {
  return (
    <p className='3xl:text-[14px] text-[12px] text-gray-600'>
      {title}
    </p>
  )
}

export const ButtonAdd = ({ title, onClick }) => {
  return (
    <Button 
      onClick={onClick} 
      className='bg-black w-[140px] py-5 text-white text-center items-center 
        font-semibold text-[15px] border-1 rounded-lg cursor-pointer'
    >
      {title}
    </Button>
  )
}


