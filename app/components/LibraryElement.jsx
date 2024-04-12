import { useAppContext } from '../context/state';

export default function LibraryElement({element}) {

    const appContext = useAppContext();

    const handleExhibitAdd = () => {
        appContext.userData.push(element)
        alert("Item added!")
        console.log(appContext.userData)
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
                        <button className={"button"} onClick={handleExhibitAdd}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}