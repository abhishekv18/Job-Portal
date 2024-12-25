import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]
const CategoryCarousel = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
   const serachJobHandler=(query)=>{
   //async await kei sath sab kuch chod kei vo hoga
              dispatch(setSearchedQuery(query));
              navigate("/browse");
     }
    
  return (
    <div className=''>
      <Carousel className='w-full max-w-xl mx-auto my-16'>
        <CarouselContent>
            {
                category.map((cat,index)=>(
                    <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                     <Button onClick={()=>serachJobHandler(cat)} className='rounded-full' variant='outline'>{cat}</Button>
                    </CarouselItem>
                ))
            }
           
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
