

























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
    <h1 className='text-lg text-color'>
      {title}
    </h1>
  )
}

export const SubText = ({ title }) => {
  return (
    <p className='text-[12px] text-secondary'>
      {title}ss
    </p>
  )
}

export const ButtonAdd = ({ title, onClick }) => {
  return (
    <Button
      variant='add'
      onClick={onClick}
    >
      {title}
    </Button>
  )
}


