"use client"
import NavBar from "@/app/components/NavBar";
import LibraryElement from "@/app/components/LibraryElement";
import {useEffect, useState} from "react";
import {getObjectBySearchHARV, getObjectsBySearchMET, getObjectsBySearchVA} from "@/api";
import SearchOptionsBar from "@/app/components/SearchOptionsBar";

export default function Library() {

    const [searchTerm, setSearchTerm] = useState("")
    const [items, setItems] = useState([])
    const [currentApi, setCurrentApi] = useState("va")


    const getItems = async () => {
        if (searchTerm === "") {
            setItems([])
        } else {
            if (currentApi === "va") {
                setItems(await getObjectsBySearchVA(searchTerm))
            } else if (currentApi === "harv") {
                setItems(await getObjectBySearchHARV(searchTerm))
            } else if (currentApi === "met") {
                setItems(await getObjectsBySearchMET(searchTerm))
            }
        }
    }

    const displayItems = () => {
        if (searchTerm === "") {
            return (
                <div className={"hero has-text-centered"}>
                    <p className={"hero-body subtitle is-4"}>Search for an item!</p>
                </div>
            )
        } else if (items === undefined || items.length === 0) {
            return (
                <div className={"hero has-text-centered"}>
                    <p className={"hero-body subtitle is-4"}>No items available</p>
                </div>
            )
        } else {
            return (
                <div className={"lib-grid"}>
                    {items.map(item => <LibraryElement element={item}/>)}
                </div>
            )
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
                <SearchOptionsBar currentApi={currentApi} searchTerm={searchTerm} setCurrentApi={setCurrentApi}
                                  setSearchTerm={setSearchTerm} getItems={getItems}/>
                {displayItems()}

            </div>
        </main>
    )
}