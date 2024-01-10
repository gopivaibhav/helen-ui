import React from 'react'
import { WebSocketProvider } from '../WebSocketProvider'
import NewLayout from '../pages/NewLayout'

function SocketHelen() {
  if(sessionStorage.getItem('userDetail') === null) {
    window.location.href = '/'
  }
  return (
    <WebSocketProvider>
      <NewLayout />
    </WebSocketProvider>
  )
}

export default SocketHelen