"use client"
import NavBar from "@/app/components/NavBar";
import LibraryElement from "@/app/components/LibraryElement";
import {useExhibitObjectContexts} from "@/app/context/exhibitObjects";


export default function MyExhibit() {

    const {exhibitObjects, setExhibitObjects} = useExhibitObjectContexts()

    return (
        <>
            <NavBar/>
            <br/>
            <h1 className={"title has-text-centered"}>My Exhibit</h1>
            <div className={"container"}>
                    <div className={"lib-grid pt-6 is-mobile"}>
                        {exhibitObjects.map(item => <LibraryElement element={item}/>)}
                    </div>
            </div>
        </>
    )
}