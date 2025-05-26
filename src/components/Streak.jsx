import React from 'react'

const Streak = () => {
  return (
    <div className='flex bg-[#2f3136] flex-col justify-center items-center p-4 shadow-md gap-4'>
      <div className="w-28 border rounded-full h-28 flex justify-center items-center">
        <span className='text-2xl font-bold text-[#f0b002]'>1🔥
        </span>
      </div>
      <p className='uppercase font-bold text-blue-500'>Max Streak : 24 days</p>
    </div>
  )
}

export default Streak