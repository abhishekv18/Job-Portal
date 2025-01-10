import UserCartItemsContent from "./SaveItemContent";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

function UserCartWrapper({setOpenCartSheet,saveItems}) {
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