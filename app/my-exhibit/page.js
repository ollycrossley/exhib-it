"use client"
import NavBar from "@/app/components/NavBar";
import LibraryElement from "@/app/components/LibraryElement";
import {useExhibitObjectContexts} from "@/app/context/exhibitObjects";
import {useState} from "react";
import {LibraryModal} from "@/app/components/LibraryModal";


export default function MyExhibit() {

    const {exhibitObjects, setExhibitObjects} = useExhibitObjectContexts()

    const [modalData, setModalData] = useState()
    const [modalState, setModalState] = useState(false)

    const toggleModal = () => {
        console.log(modalData)
        setModalState(!modalState)
    }

    return (
        <>
            <NavBar/>
            <br/>
            <LibraryModal toggleModal={toggleModal} modalState={modalState} item={modalData} />
            <h1 className={"title has-text-centered"}>My Exhibit</h1>
            <div className={"container"}>
                    <div className={"lib-grid pt-6 is-mobile"}>
                        {exhibitObjects.map(item => <LibraryElement element={item} isMyExhibit={true} setModalData={setModalData} toggleModal={toggleModal} key={item.intId}/>)}
                    </div>
            </div>
        </>
    )
}