import { useAppContext } from '../context/state';
import {useEffect, useState} from "react";

export default function LibraryElement({element}) {

    const appContext = useAppContext();

    const [isAdded, setIsAdded] = useState(false)

    useEffect(() => {

    }, [isAdded]);

    const handleExhibitAdd = () => {
        appContext.exhibitObjects.push(element)
        appContext.exhibitObjectIds.push(element.intId)
        setIsAdded(true)
        alert("Item added!")
        console.log(appContext.exhibitObjects)
    }

    return (
        <div className={"column is-narrow"}>
            <div className={"img-container"}>
                <img className={"image lib-el"} src={element.image} alt={"library element image"}/>
                <div
                    className={"overlay is-flex is-flex-wrap-wrap is-align-items-center is-justify-content-space-around p-2 is-flex-direction-row"}>
                    <div className={"is-flex is-flex-direction-column is-align-items-center"}>
                        <p className={"is-white is-size-5 has-text-centered is-bold"}>{element.primaryTitle || "Unknown"}</p>
                        <p className={"is-white is-size-6 has-text-centered"}>{element.primaryMaker || "Unknown"}</p>
                        <br/>
                        {appContext.exhibitObjectIds.includes(element.intId) ? <button className={"button"} onClick={handleExhibitAdd} disabled={true}>Already
                            Added</button>
                            : <button className={"button"} onClick={handleExhibitAdd}>Add</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}