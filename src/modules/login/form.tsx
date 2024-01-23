import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Checkbox, Form, Input, Button, message } from 'antd'
import axios from 'axios'

import { setToken } from '../../utils/auth'
import { updateUserLoading, updateToken } from '../../store/globalState'
import { useStorage } from '../../hooks/useStorage'

import { MockResponseStatus } from '../../types'

interface FormFieldType {
  username: string
  password: string
  rememberMe: boolean
}

export function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginParams, setLoginParams, removeLoginParams] = useStorage(
    'loginParams',
    'object'
  )

  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const Item = Form.Item

  const afterLoginSuccess = (params: FormFieldType & { token: string }) => {
    const { rememberMe: rememberLoginParams, token } = params
    console.log(rememberLoginParams)
    if (rememberLoginParams) {
      setLoginParams(params)
    } else {
      removeLoginParams()
    }
    // 保存token
    setToken(token)
    dispatch(updateToken(token))
    dispatch(updateUserLoading(true))
    // 重定向至首页
    navigate('/')
  }
  const onFinish = async (values: FormFieldType) => {
    const { username, password } = values
    const res = await axios.post<{
      status: string
      msg: string
      token?: string
    }>('/api/login', {
      username,
      password
    })
    const { status, msg, token } = res.data
    if (status !== MockResponseStatus.SUCCESS || !token)
      return messageApi.open({
        type: 'error',
        content: msg
      })
    afterLoginSuccess({
      ...values,
      token
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed', errorInfo)
  }

  useEffect(() => {
    const rememberLoginParams = !!loginParams
    form.setFieldsValue(
      rememberLoginParams
        ? loginParams
        : {
            username: 'User',
            password: '1qaz2wsx',
            rememberMe: true
          }
    )
  }, [loginParams, form])

  return (
    <div className="flex-1 flex-shrink-0  flex items-center justify-center">
      {contextHolder}
      <Form
        form={form}
        name="login-form"
        labelCol={{ span: 8 }}
        autoComplete="off"
        style={{ maxWidth: 400, width: '50%' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Item<FormFieldType>
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!'
            }
          ]}
        >
          <Input placeholder="User, Admin or SuperAdmin" />
        </Item>
        <Item<FormFieldType>
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password placeholder="1qaz2wsx" />
        </Item>
        <Item<FormFieldType>
          name="rememberMe"
          wrapperCol={{ offset: 8 }}
          valuePropName="checked"
        >
          <Checkbox>Remember me</Checkbox>
        </Item>
        <Item wrapperCol={{ offset: 2 }}>
          <Button className="w-full" type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </div>
  )
}
