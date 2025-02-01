import { useEffect } from "react";
import UserCartItemsContent from "./SaveItemContent";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "@/redux/saveSlice";

function UserCartWrapper({setOpenCartSheet,saveItems}) {
    //const{saveItems}=useSelector(store=>store.saveLater);
   const dispatch=useDispatch();
   // useEffect(()=>{
//dispatch(fetchCartItems())
  //  },[dispatch])
    return ( 
<SheetContent>
<SheetHeader className='flex flex-row items-center gap-2'>

        <SheetTitle className='font-extrabold ml-1 mt-2'>Saved Jobs</SheetTitle>
        <SheetTitle className=''>({saveItems.length})</SheetTitle>
     </SheetHeader>
   
   

    <div className="mt-8 space-y-6">
        { 
            saveItems.length ===0?"No job saved":null
        }
        {
            saveItems && saveItems.length > 0?
            saveItems.map(item=> <UserCartItemsContent saveItem={item}/>):null
        }
       </div> 
</SheetContent>
      
     );
}

export default UserCartWrapper ;