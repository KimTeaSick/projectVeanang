import { Button, Form, Input } from 'antd'
import { InputFocusOptions } from 'antd/lib/input/Input';
import axios from 'axios';
import { NextPage } from 'next'
import React, { ChangeEventHandler, FunctionComponent, useCallback, useState } from 'react'

const LoginPage: NextPage = () => {
  let [id, setId] = useState('');
  let [password, setPassword] = useState('');
  const idHandler: ChangeEventHandler = useCallback((e: any)=>{
    setId(e.target.value);
  }, []);
  const passwordHandler: ChangeEventHandler = useCallback((e: any)=>{
    setPassword(e.target.value);
  }, []);

  
  return (
    <div>
      <Form>
        <Input value={id} type="text" onChange={idHandler} />
        <Input value={password} type="password" onChange={passwordHandler} />
        <Button>Login</Button>
      </Form>
    </div>
  )
}

export default LoginPage
