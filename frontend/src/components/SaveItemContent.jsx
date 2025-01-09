import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import { deleteSaveItem } from "@/redux/saveSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";




function UserCartItemsContent ({saveItem}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  function handleCartItemDelete(id) {
    dispatch(deleteSaveItem(  {jobId:id })).then(data=>
      {  if(data?.payload?.success){
        toast.success("Job removed successfully")
       }
});
}

    return (
      <div>
 <div className="flex items-center space-x-28 ">
        <img src={saveItem?.jobId?.company?.logo} className="w-12 h-12 rounded object-cover"/>
        <div className="flex-1">
        <h3 className="font-black">{saveItem?.jobId?.title}</h3>
        <h3 className="font-semibold">{saveItem?.jobId?.company?.description}</h3>
            <h3 className="from-accent-foreground">{saveItem?.jobId?.company?.location}</h3>
           
           
        </div>
      
      </div>
      
     
        <div className="flex justify-between items-center ">
        <Button variant='outline' onClick={()=> navigate(`/description/${saveItem?.jobId?._id}`)}  >View Details</Button>
        <Trash
          onClick={() => handleCartItemDelete(saveItem?.jobId?._id)}
          className="cursor-pointer mt-1 hover:text-red-700"
          size={20}
        />
        </div>
     <Separator className='mt-2'/>
    </div> );
    
}

export default UserCartItemsContent;