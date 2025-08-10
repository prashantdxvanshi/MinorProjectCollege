import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { adminAtom, tokenAtom } from '@/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
const Profileholder = () => {
  // const adminName=useRecoilValue(adminAtom);
  const adminName=localStorage.getItem("user")
  const tokenatom=useSetRecoilState(tokenAtom);
  const token=localStorage.getItem("token")
  const navigate=useNavigate();
  // console.log(adminName);
  return (
   <>
  <div>
     <DropdownMenu>
  <DropdownMenuTrigger className="flex "><img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.pnghttps://www.pngmart.com/files/23/Profile-PNG-Photo.png" className='w-15 h-10 rounded-2xl' /><div className=' rounded-md bg-gradient-to-r from-blue-500 via-indigo-50 text-shadow-slate-700 px-2 text-black font-bold hover:bg-gradient-to-b from-blue-600 via-fuchsia-100 border-2 text-2xl'>{adminName}</div></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><a href="/my_created_courses">Profile</a> </DropdownMenuItem>
    <DropdownMenuItem>Reviews</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>{localStorage.removeItem("token"); localStorage.removeItem("user"); tokenatom(0) ; navigate("/")}   }>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  </div>
   </>
  )
}

export default Profileholder;
