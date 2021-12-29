import { NextPage } from 'next'
import React, { useEffect } from 'react'
import axios from 'axios'

const LandingPage: NextPage = () => {
  useEffect(()=>{
    axios.get('http://localhost:8080/api/hi')
    .then(response => console.log(response.data))
  },[]);
  return (
    <div>
      
    </div>
  )
}

export default LandingPage