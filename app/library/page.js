"use client"
import NavBar from "@/app/components/NavBar";
import LibraryElement from "@/app/components/LibraryElement";
import {useEffect, useState} from "react";
import {getObjectBySearchHARV, getObjectsBySearchMET, getObjectsBySearchVA} from "@/api";
import SearchOptionsBar from "@/app/components/SearchOptionsBar";
import SvgComponent from "@/app/components/MuseumLoadingSymbol";

export default function Library() {

    const [searchTerm, setSearchTerm] = useState("")
    const [metPage, setMetPage] = useState(2)
    const [items, setItems] = useState([])
    const [currentApi, setCurrentApi] = useState("va")
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    const getItems = async () => {
        setIsLoading(true)
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
        setIsLoading(false)
    }

    const handlePageChange = async () => {
        setIsLoadingMore(true)
        if (currentApi === "met") {
            setMetPage((prev) => prev + 1)
            // console.log(metPage)
            const moreObjects = await getObjectsBySearchMET(searchTerm, metPage)
            setItems(prev => [...prev, ...moreObjects])
        }
        setIsLoadingMore(false)

    }

    const displayItems = () => {
        if (items !== undefined && items.length > 0) {
            return (
                <div className={"lib-grid"}>
                    {items.map(item => <LibraryElement element={item}/>)}
                </div>
            )
        }
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

    if (isLoading) {
        return (
            <main>
                <NavBar/>
                <br/>
                <h1 className={"title has-text-centered"}>Library</h1>
                <br/><br/><br/>
                <div className={"container"}>
                    <SearchOptionsBar currentApi={currentApi} searchTerm={searchTerm} setCurrentApi={setCurrentApi}
                                      setSearchTerm={setSearchTerm} getItems={getItems}/>

                    <div className={"hero"}>
                        <div className={"hero-body is-justify-content-center"}>
                            <SvgComponent />
                        </div>
                    </div>

                </div>
            </main>
        )
    }

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
                {items !== undefined && items.length > 0 && currentApi === "met" ? <div className={"block has-text-centered"}><button id={"met-load-more-button"} className={`button is-info mt-5 mb-5 ${isLoadingMore ? "is-loading" : null}`} onClick={handlePageChange}>Load More....</button>
                </div> : undefined}
            </div>
        </main>
    )
}