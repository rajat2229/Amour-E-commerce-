import React from 'react'
import { Button, Heading } from '../components'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col min-h-[65vh] gap-10 justify-center items-center'>
      <Heading> Page Not Found</Heading>
      <Button
        handleSubmit={() => { navigate("/",{replace:true}) }}
        title="Home"
      />
    </div>
  )
}

export default PageNotFound
