import { type PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { getUserToken } from '../../store/globalState'

function LayoutPermissionContainer(props: PropsWithChildren) {
  const userToken = useSelector(getUserToken)
  return userToken ? props.children : <Navigate to="/login" />
}

function _Layout() {
  return (
    <>
      <h1>Layout Page</h1>
      {/* <Link to="/dashboard/workplace">跳转至用户界面</Link> */}
      <Outlet />
    </>
  )
}

export function Layout() {
  return (
    <LayoutPermissionContainer>
      <_Layout />
    </LayoutPermissionContainer>
  )
}
