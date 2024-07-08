"use client"
import { fetchData } from "@lib/services/table_data";
import { useQuery } from "react-query";
import React, { lazy, Suspense } from 'react';
import Navbar from "@components/SideNavBar";
import LoadingDots from "@components/loading-dots";
const MyTable = lazy(() => import("@components/MyTable"));
// const Navbar = lazy(() => import("@components/SideNavBar"));
const SoldItems =() =>{
    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["users"],
        queryFn: fetchData,
      });
    return(

        <>
        <Navbar/>
        {isLoading || isFetching ? (<div className="flex h-screen w-full justify-center item-center"><LoadingDots color="#000"/>
            </div>):
        (
            <MyTable data={data}/>
            )
        }
        </>
    )
}
export default SoldItems;