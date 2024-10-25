"use client"
import NavBar from "@/app/components/navbar";
import Stats from "@/app/components/stats";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function StatsPage(){
    const [view, setView] = useState("All")
    function setAll(){
        setView("All")
    }
    function setMovie(){
        setView("Movie")
    }
    function setTV(){
        setView("TV")
    }

    return(
        <div className="">
            <NavBar/>
            <div>
                <button onClick={(setAll)}>All</button>
                <button onClick={(setMovie)}>Movie</button>
                <button onClick={(setTV)}>TV</button>
            </div>
            <Stats view={view}/>
        </div>
    )

}