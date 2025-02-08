import axios from "axios";

import { createSlice, createAsyncThunk } from"@reduxjs/toolkit"




const initialState={
    isLoading: false,
    saveItems:[],
   
}


export const addToCart = createAsyncThunk(
  "/save/addToSave",
  async ({  jobId,quantity }) => {
    const response = await axios.post(
      "https://job-portal-kit7.onrender.com/api/v1/save/add",

      {
     
        jobId,
        quantity 
      },
      {
        //  headers: { 'Content-Type': "multipart/form-data" },
        headers: { 'Content-Type': "application/json" },
          withCredentials: true, 
      }
    );

    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "/save/fetchSaveItems",
  async () => {



    const result = await axios.get(
  "https://job-portal-kit7.onrender.com/api/v1/save/get", {
    //  headers: { 'Content-Type': "multipart/form-data" },
   // headers: { 'Content-Type': "application/json" },
      withCredentials: true, 
  }
    );

    return result.data;
  }
);
export const deleteSaveItem = createAsyncThunk(
  "/save/deleteSaveItem",
  async ({  jobId }) => {
    const response = await axios.delete(
      `https://job-portal-kit7.onrender.com/api/v1/save/delete/${jobId}`,{
        //  headers: { 'Content-Type': "multipart/form-data" },
       // headers: { 'Content-Type': "application/json" },
          withCredentials: true, 
      }
    );

    return response.data;
  }
);



const saveLaterSlice=createSlice({
    name:"saveLater",
    initialState,
     reducers:{},
     extraReducers:(builder)=>{
 builder
 .addCase(addToCart.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(addToCart.fulfilled, (state, action) => {
    state.isLoading = false;
    state.saveItems = action.payload.data;
  })
  .addCase(addToCart.rejected, (state) => {
    state.isLoading = false;
    state.saveItems = [];
  })
  .addCase(fetchCartItems.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(fetchCartItems.fulfilled, (state, action) => {
    state.isLoading = false;
    state.saveItems = action.payload.data;
  })
  .addCase(fetchCartItems.rejected, (state) => {
    state.isLoading = false;
    state.saveItems = [];
  })
  .addCase(deleteSaveItem.pending, (state) => {
    state.isLoading = true;
  })
  .addCase(deleteSaveItem.fulfilled, (state, action) => {
    state.isLoading = false;
    state.saveItems = action.payload.data;
  })
  .addCase(deleteSaveItem.rejected, (state) => {
    state.isLoading = false;
    state.saveItems = [];
  })
     },

})

export const {} = saveLaterSlice.actions;
export default saveLaterSlice.reducer;