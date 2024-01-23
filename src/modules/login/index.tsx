import { useEffect } from 'react'

import { Slider } from './slider'
import { LoginForm as Form } from './form'

import { removeToken } from '../../utils/auth'

export const Login = () => {
  useEffect(() => {
    removeToken()
  }, [])
  return (
    <div className="flex w-full h-full">
      <Slider />
      <div className="login-form-wrap flex-1 h-full  flex items-center justify-center">
        <Form />
      </div>
    </div>
  )
}
