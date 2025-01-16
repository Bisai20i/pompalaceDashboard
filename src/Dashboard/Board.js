import React from 'react'
import Card from '../elements/Card'


function Board() {
  return (
    <div className='py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card head="Total Dogs" important="12" bgcolor="blue"></Card>
        <Card head="Total Earnings" important= "25000" beforeimp="NPR." bgcolor="green"></Card>
        <Card head="Dogs Sold" important="8" bgcolor="cyan"></Card>
        <Card head="Remaining Dogs" important="4" bgcolor="red"></Card>
    </div>
  )
}

export default Board