import { Save } from "../models/save.model.js";


export const addToSave = async (req, res) => {
    try {
        const userId = req.id;

      const {jobId,quantity} = req.body;
  
      if ( !jobId ) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }
  
      
      let saveItem = await Save.findOne({ userId });
  
      if (!saveItem) {
        saveItem = new Save({ userId:userId, items: []});
      }
      const findCurrentProductIndex = saveItem.items.findIndex(
        (item) => item.jobId.toString() === jobId
      );
  
      if (findCurrentProductIndex === -1) {
        saveItem.items.push({ jobId,quantity });
      } 
      else {
       
        saveItem.items[findCurrentProductIndex].quantity += quantity;
      }

    
     

      await saveItem.save();
      res.status(200).json({
        success: true,
        message: "job saved successfully",
        data: saveItem,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };



export  const fetchSaveItems= async (req, res) => {
    try {
        const userId = req.id;
  //find ya findone mei .id nhi lagate params mei
      const saveItem = await Save.findOne({ userId }).populate({
        path: "items.jobId",
       // options:{sort:{createdAt:-1}},
        populate:{
           path:'company',
       //     options:{sort:{createdAt:-1}},
        }
      });
  
      if (!saveItem) {
        return res.status(404).json({
          success: false,
          message: "saveItem not found!",
        });
      }
  
      const validItems = saveItem.items.filter(
        (productItem) => productItem.jobId
      );
  
      if (validItems.length < saveItem.items.length) {
        saveItem.items = validItems;
        await saveItem.save();
      }
  
  
   
    



      res.status(200).json({
        success: true,
        data: 
          saveItem
        
        ,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };





export  const deleteSaveItem = async (req, res) => {
    try {
      const userId = req.id;
      const {  jobId } = req.params;
      if (!userId || !jobId) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }
    
      const saveItem = await Save.findOne({ userId }).populate({
        path: "items.jobId",
       // options:{sort:{createdAt:-1}},
        populate:{
           path:'company',
       //     options:{sort:{createdAt:-1}},
        }
      });
  
      if (!saveItem) {
        return res.status(404).json({
          success: false,
          message: "saveItem not found!",
        });
      }
  
      saveItem.items = saveItem.items.filter(
        (item) => item.jobId._id.toString() !== jobId
      );
  
      await saveItem.save();
  
     
  
  
      res.status(200).json({
        success: true,
        data: saveItem,
       
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  };

 