"use client"
import NavBar from "@/app/components/NavBar";
import LibraryElement from "@/app/components/LibraryElement";
import {useEffect, useState} from "react";
import {getObjectsBySearchVA} from "@/api";

export default function Library() {

    const [searchTerm, setSearchTerm] = useState("vase")
    const [items, setItems] = useState([])

    const getItems = async () => {
        setItems(await getObjectsBySearchVA(searchTerm))
    }

    const handleSearchKeyPress = (e) => {
            if (e.key === 'Enter') {
                getItems();
            }
    }

    useEffect(() => {
        getItems()
    }, []);

    return (
        <main>
            <NavBar/>
            <br/>
            <h1 className={"title has-text-centered"}>Library</h1>
            <br/><br/><br/>

            <div className={"container"}>
                    <div className="field has-addons">
                        <div className="control">
                            <input className="input" type="text" placeholder="Search for item"
                                   onChange={e => setSearchTerm(e.target.value)}
                                   onKeyDown={e => handleSearchKeyPress(e)}/>
                        </div>
                        <div className="control">
                            <button className="button is-info" onClick={getItems}>
                                Search
                            </button>
                        </div>
                    </div>


                    <div className={"columns is-gapless is-gap-1 is-multiline pt-6 is-mobile"}>
                        {items.map(item => <LibraryElement element={item}/>)}
                    </div>
                </div>
        </main>
    )
}