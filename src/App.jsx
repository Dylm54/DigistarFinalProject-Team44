import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { DashboardAdmin } from './pages/DashboardAdmin'
import { TicketsAdmin } from './pages/TicketsAdmin'
import { UserCreateTicket } from './pages/UserCreateTicket'
import {UserHome} from './pages/UserHome'
import { UserTicketInformation } from './pages/UserTicketInformation'
import { UserTicketDetail } from './pages/UserTicketDetail'
import { AdminTicketDetail } from './pages/AdminTicketDetail'
import { AdminReport } from './pages/AdminReport'
import { AdminSettings } from './pages/AdminSettings'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/' element={<DashboardAdmin />}/>
        <Route path='/tickets' element={<TicketsAdmin />}/>
        <Route path='/settings' element={<AdminSettings />}/>
        <Route path='/report' element={<AdminReport />}/>
        <Route path='/user/create-ticket' element={<UserCreateTicket />}/>
        <Route path='/user' element={<UserHome />}/>
        <Route path='/user/ticket-information' element={<UserTicketInformation />}/>
        <Route path='/user/ticket-information/ticket-detail/:number' element={<UserTicketDetail />}/>
        <Route path='/tickets/ticket-detail/:number' element={<AdminTicketDetail />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
