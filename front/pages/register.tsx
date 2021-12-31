import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { NextPage } from 'next'
import React,{FunctionComponent, useCallback, useState} from 'react'

const RegisterPage: NextPage = () => {
  
  let [email, setEmail] = useState('');
  let [id, setId] = useState('');
  let [password, setPassword] = useState('');


  const emailHandler = useCallback((e: any) => {
    setEmail(e.target.value);
  },[])
  const idHandler = useCallback((e: any) => {
    setId(e.target.value);
  },[])
  const passwordHandler = useCallback((e: any) => {
    setPassword(e.target.value);
  },[])
  const sendForm = useCallback(() =>{
    axios.post('/api/login',{})
  },[])
  return (
    <div>
      <Form>
        <label>이메일</label>
        <Input type="text" value={email} onChange={emailHandler}/>
        <label>ID</label>
        <Input type="text" value={id} onChange={idHandler}/>
        <label>Password</label>
        <Input type="text" value={password} onChange={passwordHandler}/>
        <Button onClick={sendForm}>send</Button>
      </Form>
    </div>
  )
}

export default RegisterPage;
