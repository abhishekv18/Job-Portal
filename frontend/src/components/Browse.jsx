import React, { useEffect } from 'react'
import Navbar from './shared/Navbar';
import Job from './Job';
import Footer from './shared/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

//const randomJobs = [1, 2,45];

const Browse = () => {
  useGetAllJobs();
  const dispatch=useDispatch();
  const {allJobs}=useSelector(store=>store.job);
  useEffect(()=>{
    return()=>{
           dispatch(setSearchedQuery(""));
    }
  },[])
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10 ml-3'>
        <h1 className='font-bold text-xl my-10'>Serach Results ({allJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4 mt-5'>
        {
            allJobs.map((job)=>(<motion.div  
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}>
             
                    <Job key={job._id} job={job} />
                
            </motion.div>
               
            ))
        }
        </div>
     
      </div>
      <Footer/>
    </div>
  )
}

export default Browse
