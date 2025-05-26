import React from 'react'
import ProblemCard from './ProblemCard'

const SolvedProblem = () => {
  return (
    <div className='bg-[#2f3136] p-4'>
      <input type="text" placeholder='Enter title or number' className='w-[50%] flex px-2 py-1 bg-[#13181c] outline-none rounded-lg'/>
      <br />
      <div className='flex flex-col gap-4'>
        {[0,0,0,0,0,0,0,0,0,0,0].map(() => <ProblemCard/>)}
      </div>
      <br />
      <div className='flex justify-between'>
        <button className='border px-4 py-1 rounded-lg cursor-pointer'>Prev</button>
        <button className='border px-4 py-1 rounded-lg cursor-pointer'>Next</button>
      </div>
    
    </div>
  )
}

export default SolvedProblem