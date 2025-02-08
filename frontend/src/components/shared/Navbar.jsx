import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { BookMarkedIcon, LogOut, ShoppingCart, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Sheet } from '../ui/sheet'
import UserCartWrapper from '../SaveItems'
import { fetchCartItems } from '@/redux/saveSlice'


const Navbar = ()=> {
  const {user}=useSelector(store=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { saveItems } = useSelector((state) => state.saveLater);
  const logoutHandler = async () => {
    try {
        const res = await axios.get(`https://job-portal-kit7.onrender.com/api/v1/user/logout`, { withCredentials: true });
        if (res.data.success) {
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
}

  
 useEffect(()=>{
   dispatch(fetchCartItems());
 },[dispatch]);
 
  return (
    <div className='bg-white'>
       <div className='flex items-center justify-between mx-auto max-w-6xl h-16'>
       <div className='' >
       <Link to='/'>
       <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>
       </Link>
       
       
        </div>      
         <div className='flex items-center gap-11'>
          
            <ul className='flex font-medium gap-4 items-center'>  
            {
            user && user.role=='recruiter'?(
              <>
              <li><Link to='/admin/companies'>Compaines</Link></li>
              <li><Link to='/admin/jobs'>Jobs</Link></li>
              </>
            ):(<><li><Link to='/'>Home</Link></li>
              <li><Link to='/jobs'>Jobs</Link></li>
              <li><Link to='/browse'>Browse</Link></li>
              <li> <div className='flex lg:items-center lg:flex-row flex-col'>
         <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
    <Button onClick={()=>setOpenCartSheet(true)} variant='outline' size='icon' className='relative' >
    <BookMarkedIcon className="w-6 h-6"/>
    <span className="absolute top-[-5px] right-[2px] text-sm font-bold">{saveItems?.items?.length || 0}</span>
    <span className="sr-only">User Cart</span>
    </Button>
    <UserCartWrapper setOpenCartSheet={setOpenCartSheet} saveItems={ saveItems && saveItems.items && saveItems.items.length > 0
              ? saveItems.items
              : [] }></UserCartWrapper>
    
    </Sheet>
         </div>
         </li>
              </>)
          }
              
            </ul>
            
        
         
            {// if false to ye vrna vo
              !user?(
                <div className='flex items-center gap-2'>
                 
                  <Link to="/login"> <Button variant="outline">Login</Button></Link>
                  <Link to="/signup"> <Button  className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button> </Link>
                 
                </div>
              ):(
               
                <Popover>
                <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png"  alt="@shadcn" />
         
        </Avatar>
          </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className=''>
                    <div className='flex gap-4 space-y-2'>
                    <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
         
        </Avatar>
        <div className=''>
        <h4 className='font-medium'>{user?.fullname}</h4>
        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
        </div>
       
                    </div>
                 <div className='flex flex-col my-2 text-gray-600'>
                 {
                  user && user.role=='student'  &&(
<div className='flex w-fit items-center gap-2 cursor-pointer'>
                  <User2/>
                  <Link to='/profile'>
                  <Button variant="link">View Profile</Button>
                  </Link>
                 
                  </div>
                  )
                 }
                 
                  <div className='flex w-fit items-center gap-2 cursor-pointer'>
                    <LogOut/>
                  <Button variant="link" onClick={logoutHandler}>Log Out</Button>
                 </div>
                  
                 </div>
                    </div>
                    
                  </PopoverContent>
                </Popover>
              )
            }
           
         </div>
       </div>
       </div>
  )
}

export default Navbar

