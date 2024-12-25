import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
//const randomJobs=[1,2,3,4,5,6,7,8,9];
const LatestJobs = () => {
  const{allJobs}=useSelector(store=>store.job);
  return (
    <div className='mx-auto max-w-6xl my-16 text-center'>
      <h1 className='text-4xl font-bold ml-8'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
      {
         allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
    }
      </div>
    
  
    </div>
  )
}

export default LatestJobs
