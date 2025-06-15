import React from 'react'

const Logo = () => {
  return (
    <div >
      <div className="w-auto ml-2 mr-2">
        <h2 className='pb-3 text-2xl font-semibold font-sans'>Chats</h2>
      <input type='search' placeholder='search' className='justify-center item-center rounded-[8px] w-full p-1.5 border-none bg-zinc-900' />
      </div>
    </div>
  )
}

export default Logo;