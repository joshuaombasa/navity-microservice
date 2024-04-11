import { useState } from 'react'

import './App.css'
import CreateTweet from './components/CreateTweet'
import TweetsList from './components/TweetsList'

function App() {
 
  return (
    <div className='container'>
      <CreateTweet/>
      <TweetsList/>
    </div>
  )
}

export default App
