import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { NavBar, Home, Footer } from './components'

type User = {
 name: string
 location: string
 bio: string
 html_url: string
 login: string
 repos_url: string
 avatra: string
}

export default function App() {

 return (
  <>
    {
    <>
   <NavBar></NavBar>
   <main>
    <Home/>
   </main>
   <Footer />
    </> }
  </>
 )
}
