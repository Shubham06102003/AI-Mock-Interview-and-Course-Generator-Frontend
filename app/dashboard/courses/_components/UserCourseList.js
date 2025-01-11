"use client"
import React, { useEffect, useState } from "react";
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import CourseCard from "./CourseCard";
import { CourseList } from "@/utils/schema";

const UserCourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && getUserCourses();
  }, [user]);

  
  const getUserCourses=async()=>{
    const result=await db.select().from(CourseList)
    .where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(CourseList.id))
    setCourseList(result);
    
  }
  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl">Your Personalized Courses</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courseList?.length>0? courseList?.map((course, index) => (
                <CourseCard course={course} key={index} refreshData={()=>getUserCourses()}/>
            )):
            [1,2,3,4,5].map((item, index)=>{
                <div key={index} className='w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]'>
                  <h1>{item}</h1>
                </div>
              })}
              
        </div>
    </div>
  )
}

export default UserCourseList