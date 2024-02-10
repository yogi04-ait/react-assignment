import React, { useEffect } from 'react'
import { PROFILE_API } from './constants'
import { useState } from 'react'

const Profile = () => {

    const [userData, setUserData] = useState(null)
    
    useEffect(()=>{
        profiledata();
    },[])

    function generateRandomString() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 3;
        
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        return result;
      }
            

      const profiledata = async () => {
        const name = generateRandomString();
      
        try {
          const response = await fetch(PROFILE_API + name);
          if (!response.ok) {
            throw new Error('Failed to fetch profile data');
          }
          const data = await response.json();
          setUserData(data?.results[0]);
          
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };
      
if(!userData) return;

  return (
    <div className=' bg-blue-200 border-2 border-black rounded-lg gap-5 flex flex-col sm:flex-row sm:w-[60vh] items-center justify-center h-[50vh] w-[40vh] p-[2vh]'>
        <img className='border-2 border-double border-gray-700 rounded-full hover:scale-105' src={userData?.picture?.large} alt="user-image" />
        <div className='flex gap-3 flex-col'>
        <div className='flex gap-3'>
            <h3>{userData?.name?.first}</h3>
            <h3>{userData?.name?.last}</h3>
        </div>
        <h3>{userData?.gender.charAt(0).toUpperCase() + userData?.gender.slice(1)}</h3>
        <h3>{userData?.phone}</h3>
        </div>
    </div>
  )
}

export default Profile