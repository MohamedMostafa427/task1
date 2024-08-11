"use client"
import me from "../components/asets/img/message-text.png"
import Image from "next/image";
import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
export const fetchMainCategoryData = async ()=>{
    const res = await axios.get("https://api.ymtaz.sa/api/client/services/main-category" , {
        headers: {
            Authorization:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS55bXRhei5zYS9hcGkvY2xpZW50L2xvZ2luIiwiaWF0IjoxNzIwMzM1ODA5LCJleHAiOjIxNjAxNzIwMzM1ODA5LCJuYmYiOjE3MjAzMzU4MDksImp0aSI6IngyeTgxcG54NGdseTdYTHMiLCJzdWIiOiIxNjUxIiwicHJ2IjoiMmE4NDY2MmMzMzE1NzU0NmM0M2Y0MDM3NTQ2NDE1YmM3MGQ3OGJiYyJ9.W3Uq_o1mzr9srAYpZcDcvqcoXzd60e26yrt_vM5Hgzg"
        }
    })
    return res.data
}
const Page = () => {
    const { data , isLoading , error} = useQuery("mainCatigry" ,fetchMainCategoryData)
    if (isLoading) return <div className="absolute top-[46%]"><svg
    class="spinner"
    width="50px"
    height="50px"
    viewBox="0 0 50 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke-width="5"
    />
  </svg>
  </div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
    <div className="relative w-[80%] flex flex-col justify-center text-center">
      <h1 className=" my-12 font-bold">{data.message}</h1>
      <div className="mx-auto flex w-full gap-8 items-center flex-wrap relative justify-center text-center">
        {data.data.items.map((e,index)=><div className="w-72 bg-white rounded-lg shadow-md p-6 text-center relative">
      <div className={`absolute top-0 left-0 right-0 h-2 ${index < 3 || index > 6 ? "bg-[#658d96]" : "bg-[#d1b06b]"} rounded-t-lg`}></div>
      <div className="flex justify-center items-center mb-4">
        <Image src={me} width={50} height={50} />
      </div>
      <div className="text-gray-700 font-medium text-lg mb-2">{e.name}</div>
      <div className="text-white mx-auto w-20 font-bold text-sm bg-yellow-500 py-2 px-4 rounded">
        {e.id}
      </div>
    </div>
)}
      </div>
    </div>
  );
}

export default Page;
