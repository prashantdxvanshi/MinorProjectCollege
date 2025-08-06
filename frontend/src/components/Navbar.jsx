import React from 'react'
import Profileholder from './Profileholder';
import { useRecoilValue } from 'recoil';
import { tokenAtom } from '@/atom';

const Navbar = ({isLoggedin}) => {
 const token=useRecoilValue(tokenAtom);
 console.log(token);
  return (
    <header className='mr-80 mt-6 ' >
      <ul className='text-2xl flex justify-end space-x-10 cursor-pointer text-white'>
        {!isLoggedin ||  (token===0)? <>
        <a className="border-2 rounded-md bg-gradient-to-r from-blue-500 via-indigo-50 text-shadow-slate-700 px-2 text-black font-bold hover:bg-gradient-to-b from-blue-500 via-fuchsia-100" href="/Login">Log in</a>
        <a className="border-2 rounded-md bg-gradient-to-r from-blue-500 via-indigo-50 text-shadow-slate-700 px-2 text-black font-bold hover:bg-gradient-to-b from-blue-500 via-fuchsia-100" href="/Signup">Sign up</a>
        </>:<>
        <a className="border-2 rounded-md bg-gradient-to-r from-blue-500 via-indigo-50 text-shadow-slate-700 px-2 text-black font-bold hover:bg-gradient-to-b from-blue-600 via-fuchsia-100" href="/addShop">Add Shop</a>
         <Profileholder />
          </>}
      </ul>
    </header>
  )
}

export default Navbar
