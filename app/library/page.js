"use client"
import NavBar from "@/app/components/NavBar";
import LibraryElement from "@/app/components/LibraryElement";
import {useEffect, useState} from "react";
import {getObjectBySearchHARV, getObjectsBySearchMET, getObjectsBySearchVA} from "@/api";
import SearchOptionsBar from "@/app/components/SearchOptionsBar";

export default function Library() {

    const [searchTerm, setSearchTerm] = useState("vase")
    const [items, setItems] = useState([])
    const [currentApi, setCurrentApi] = useState("va")


    const getItems = async () => {
        if (currentApi === "va") {
            setItems(await getObjectsBySearchVA(searchTerm))
        } else if (currentApi === "harv"){
            setItems(await getObjectBySearchHARV(searchTerm))
        } else if (currentApi === "met"){
            setItems(await getObjectsBySearchMET(searchTerm))
        }
    }

    useEffect(() => {
        getItems()
    }, [currentApi]);

    return (
        <main>
            <NavBar/>
            <br/>
            <h1 className={"title has-text-centered"}>Library</h1>
            <br/><br/><br/>


            <div className={"container"}>
                <SearchOptionsBar currentApi={currentApi} searchTerm={searchTerm} setCurrentApi={setCurrentApi} setSearchTerm={setSearchTerm} getItems={getItems}/>
                <div className={"lib-grid"}>
                    {items.map(item => <LibraryElement element={item}/>)}
                </div>
            </div>
        </main>
    )
}