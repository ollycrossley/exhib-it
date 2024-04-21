import {getObjectByIdHARV, getObjectByIdMET, getObjectByIdVA} from "@/api";
import {useExhibitIdsContext} from "@/app/context/exhibitObjectIds";


export default function LibraryElement({element, isMyExhibit = false, key = element.intId, setModalData, toggleModal}) {

    const {exhibitIds, setExhibitIds} = useExhibitIdsContext()

    const isInExhibits = exhibitIds.includes(element.intId)

    function truncateWithEllipsis(inputString, maxLength) {
        return inputString.length > maxLength
            ? inputString.substring(0, maxLength - 3) + "..."
            : inputString;
    }

    const handleModal = async () => {
        let gotItem = undefined
        switch (element.apiType) {
            case "va":
                gotItem = await getObjectByIdVA(element.id)
                break;
            case "met":
                gotItem = await getObjectByIdMET(element.id)
                break;
            case "harv":
                gotItem = await getObjectByIdHARV(element.id)
                break;
        }
        setModalData({...element, ...gotItem})
        toggleModal()
    }

    return (
        <div className={`img-container is-flex is-flex-grow-1 m-1 is-flex-direction-column is-clickable ${isInExhibits ? "is-in-exhibit" : null}`} onClick={handleModal}>
            <img className={"image lib-el"} src={element.image} alt={"library element image"}/>
                <div
                    className={"overlay is-flex is-flex-wrap-wrap is-align-items-center is-justify-content-space-around p-2 is-flex-direction-row lib-el-desc"}>
                    <div className={"is-flex is-flex-direction-column is-align-items-center"}>
                        <p className={"is-white is-size-5 has-text-centered is-bold"}>{truncateWithEllipsis(element.primaryTitle, 50) || "Untitled"}</p>
                        <p className={"is-white is-size-6 has-text-centered"}>{element.primaryMaker || "Uncredited"}</p>
                    </div>
                </div>

        </div>
    )
}