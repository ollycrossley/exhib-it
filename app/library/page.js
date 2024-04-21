"use client"
import NavBar from "@/app/components/NavBar";
import LibraryElement from "@/app/components/LibraryElement";
import {useEffect, useState} from "react";
import {getObjectsBySearchHARV, getObjectsBySearchMET, getObjectsBySearchVA} from "@/api";
import SearchOptionsBar from "@/app/components/SearchOptionsBar";
import SvgComponent from "@/app/components/MuseumLoadingSymbol";
import {LibraryModal} from "@/app/components/LibraryModal";

export default function Library() {

    // Search Parameters
    const [searchTerm, setSearchTerm] = useState("")
    const [currentApi, setCurrentApi] = useState("va")

    // Pagination Support
    const [metPage, setMetPage] = useState(2)
    const [vaPage, setVaPage] = useState(2)
    const [harvPage, setHarvPage] = useState(2)
    const [isMoreContent, setIsMoreContent] = useState(true)

    // Items
    const [items, setItems] = useState([])

    // Loading States
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    // Modal Related Handling
    const [modalData, setModalData] = useState({})
    const [modalState, setModalState] = useState(false)

    const toggleModal = () => {
        setModalState(!modalState)
    }

    const getItems = async () => {
        setIsMoreContent(true)
        setIsLoading(true)
        if (searchTerm === "") {
            setItems([])
        } else {
            if (currentApi === "va") {
                setItems(await getObjectsBySearchVA(searchTerm))
            } else if (currentApi === "harv") {
                setItems(await getObjectsBySearchHARV(searchTerm))
            } else if (currentApi === "met") {
                setItems(await getObjectsBySearchMET(searchTerm))
            }
        }
        setIsLoading(false)
    }

    const handlePageChange = async () => {
        if (isMoreContent) {
            setIsLoadingMore(true)
            let moreObjects = []
            switch (currentApi) {
                case "va":
                    setVaPage((prev) => prev + 1)
                    moreObjects = await getObjectsBySearchVA(searchTerm, vaPage)
                    setItems(prev => [...prev, ...moreObjects])
                    break;
                case "met":
                    setMetPage((prev) => prev + 1)
                    moreObjects = await getObjectsBySearchMET(searchTerm, metPage)
                    setItems(prev => [...prev, ...moreObjects])
                    break;
                case "harv":
                    setHarvPage((prev) => prev + 1)
                    moreObjects = await getObjectsBySearchHARV(searchTerm, harvPage)
                    setItems(prev => [...prev, ...moreObjects])
                    break;

            }
            if (moreObjects.length === 0) setIsMoreContent(false)
            setIsLoadingMore(false)
        }
    }

    const displayItems = () => {
        if (items !== undefined && items.length > 0) { // If items exist
            return (
                <div className={"lib-grid"}>
                    {items.map(item => <LibraryElement element={item} setModalData={setModalData} toggleModal={toggleModal}/>)}
                </div>
            )
        }
        if (searchTerm === "") { // Display placeholder
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
                    {items.map(item => <LibraryElement element={item} setModalData={setModalData} toggleModal={toggleModal}/>)}
                </div>
            )
        }
    }

    useEffect(() => {
        getItems() // despite this being async, i am unable to await due to Next.JS restrictions
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

            <LibraryModal toggleModal={toggleModal} modalState={modalState} item={modalData}/>

            <div className={"container"}>
                <SearchOptionsBar currentApi={currentApi} searchTerm={searchTerm} setCurrentApi={setCurrentApi}
                                  setSearchTerm={setSearchTerm} getItems={getItems}/>
                {displayItems()}
                {items !== undefined && items.length > 0 ? <div className={`block has-text-centered mt-5 mb-5 `}><button id={"met-load-more-button"} className={`button is-info ${isLoadingMore ? "is-loading" : null} ${!isMoreContent ? `is-hidden` : null}`} onClick={handlePageChange}>Load More....</button>
                </div> : undefined}
            </div>
        </main>
    )
}