"use client"
import Stats from "@/components/statistics/stats";
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
        <div className="main-div">
                <button onClick={(setAll)}>All</button>
                <button onClick={(setMovie)}>Movie</button>
                <button onClick={(setTV)}>TV</button>
                <Stats view={view}/>
        </div>
    )

}