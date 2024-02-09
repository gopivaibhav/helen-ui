import React from 'react'
import { WebSocketProvider } from '../WebSocketProvider'
import CompanionBot from '../pages/CompanionBot'

function SocketCompanion() {
  if(sessionStorage.getItem('userDetail') === null) {
    window.location.href = '/'
  }
  return (
    <WebSocketProvider>
      <CompanionBot />
    </WebSocketProvider>
  )
}

export default SocketCompanion