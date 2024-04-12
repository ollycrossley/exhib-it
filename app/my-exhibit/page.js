"use client"
import NavBar from "@/app/components/NavBar";
import { useAppContext } from '../context/state';
import LibraryElement from "@/app/components/LibraryElement";

export default function MyExhibit() {

    const appContext = useAppContext();

    return (
        <>
            <NavBar/>
            <br/>
            <h1 className={"title has-text-centered"}>My Exhibit</h1>

            <div className={"container"}>
                <div className={"lib-grid pt-6 is-mobile"}>
                    {appContext.exhibitObjects.map(item => <LibraryElement element={item}/>)}
                </div>
            </div>
        </>
    )
}