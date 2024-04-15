import {useEffect, useState} from "react";
import {useExhibitObjectContexts} from "@/app/context/exhibitObjects";
import {useExhibitIdsContext} from "@/app/context/exhibitObjectIds";
import {prefixes} from "next/dist/build/output/log";

export default function LibraryElement({element, isMyExhibit = false, key = element.intId}) {

    function truncateWithEllipsis(inputString, maxLength) {
        return inputString.length > maxLength
            ? inputString.substring(0, maxLength - 3) + "..."
            : inputString;
    }

    const {exhibitObjects, setExhibitObjects} = useExhibitObjectContexts()
    const {exhibitIds, setExhibitIds} = useExhibitIdsContext()
    const [isAdded, setIsAdded] = useState(false)

    useEffect(() => {

    }, [isAdded]);

    const handleExhibitAdd = () => {
        setIsAdded(true)
        setExhibitObjects(prev => [...prev, element])
        setExhibitIds(prev => [...prev, element.intId])
    }

    const handleExhibitRemove = () => {
        setIsAdded(false)
        const index = exhibitIds.indexOf(element.intId)
        setExhibitIds(prev => prev.toSpliced(index, 1))
        setExhibitObjects(prev => prev.toSpliced(index, 1))
    }

    const handleButtonRack = () => {
        if (isMyExhibit) {
            return (
                <div className={"column is-narrow"}>
                    <button className={"button is-danger is-wide"} onClick={handleExhibitRemove}><span className="icon is-small"><i
                        className="fas fa-x"></i></span></button>
                </div>
            )
        } else {
            return exhibitIds.includes(element.intId) ?
                <button className={"button is-success is-wide"} disabled={true}><span className="icon is-small"><i className="fas fa-check"></i></span></button>
                : <button className={"button"} onClick={handleExhibitAdd}>Add</button>
        }
    }

    return (
        <div className={"img-container is-flex is-flex-grow-1 m-1 is-flex-direction-column"}>
            <img className={"image lib-el"} src={element.image} alt={"library element image"}/>
            <div
                className={"overlay is-flex is-flex-wrap-wrap is-align-items-center is-justify-content-space-around p-2 is-flex-direction-row lib-el-desc"}>
                <div className={"is-flex is-flex-direction-column is-align-items-center"}>
                    <p className={"is-white is-size-5 has-text-centered is-bold"}>{truncateWithEllipsis(element.primaryTitle, 50) || "Unknown"}</p>
                    <p className={"is-white is-size-6 has-text-centered"}>{element.primaryMaker || "Unknown"}</p>
                    <br/>
                    {handleButtonRack()}
                </div>
            </div>

        </div>
    )
}