import { useAppContext } from '../context/state';
import {useEffect, useState} from "react";

export default function LibraryElement({element}) {

    function truncateWithEllipsis(inputString, maxLength) {
        return inputString.length > maxLength
            ? inputString.substring(0, maxLength - 3) + "..."
            : inputString;
    }

    const appContext = useAppContext();

    const [isAdded, setIsAdded] = useState(false)

    useEffect(() => {

    }, [isAdded]);

    const handleExhibitAdd = () => {
        setIsAdded(true)
        appContext.exhibitObjects.push(element)
        appContext.exhibitObjectIds.push(element.intId)
    }

    return (
        <div className={"img-container is-flex is-flex-grow-1 m-1 is-flex-direction-column"}>

                <img className={"image lib-el"} src={element.image} alt={"library element image"}/>

                <div className={"overlay is-flex is-flex-wrap-wrap is-align-items-center is-justify-content-space-around p-2 is-flex-direction-row lib-el-desc"}>
                    <div className={"is-flex is-flex-direction-column is-align-items-center"}>
                        <p className={"is-white is-size-5 has-text-centered is-bold"}>{ truncateWithEllipsis(element.primaryTitle, 50) || "Unknown"}</p>
                        <p className={"is-white is-size-6 has-text-centered"}>{element.primaryMaker || "Unknown"}</p>
                        <br/>
                        {appContext.exhibitObjectIds.includes(element.intId)? <button className={"button is-success is-wide"} disabled={true} ><span className="icon is-small" ><i className="fas fa-check"></i></span></button>
                            : <button className={"button"} onClick={handleExhibitAdd}>Add
                    </button>}
                    </div>
                </div>

        </div>
    )
}