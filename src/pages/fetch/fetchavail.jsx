import React from 'react'
import Navbar from "../navbar"

function Fetchavail() {
  return (
    <div>
      {sessionStorage.getItem('group') ? <Navbar/> : <>Error</>}
      <br/>
      Fetchavail
    </div>
  )
}

export default Fetchavail