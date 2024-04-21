import {Carousel} from "@/app/components/Carousel";
import {useExhibitObjectContexts} from "@/app/context/exhibitObjects";
import {useExhibitIdsContext} from "@/app/context/exhibitObjectIds";
import {useEffect, useState} from "react";

export const LibraryModal = ({item, toggleModal, modalState, isMyExhibit = false}) => {

    const {exhibitObjects, setExhibitObjects} = useExhibitObjectContexts()
    const {exhibitIds, setExhibitIds} = useExhibitIdsContext()
    const [isAdded, setIsAdded] = useState(false)

    const handleExhibitAdd = async () => {
        setIsAdded(true)
        setExhibitObjects(prev => [...prev, item])
        setExhibitIds(prev => [...prev, item.intId])
    }

    const handleExhibitRemove = () => {
        setIsAdded(false)
        const index = exhibitIds.indexOf(item.intId)
        setExhibitIds(prev => prev.toSpliced(index, 1))
        setExhibitObjects(prev => prev.toSpliced(index, 1))
        toggleModal()
    }

    const handleButtonRack = () => {
        if (isMyExhibit) {
            return (
                    <button className={"button is-danger is-wide"} onClick={handleExhibitRemove}>Remove</button>
            )
        } else {
            return exhibitIds.includes(item.intId) ?
                <button className={"button is-success is-wide"} disabled={true}><span className="icon is-small"><i className="fas fa-check"></i></span></button>
                : <button className={"button is-info"} onClick={handleExhibitAdd}>Add to your Exhibit</button>
        }
    }

    const handleCategories = () => {
        if (item.categories) {
            return (
                <div className={"tags subtitle mt-2 mb-5"}>
                    {item.categories.map(category => {
                        return <span className={"tag"} key={category}>{category}</span>
                    })}
                </div>
            )
        }
    }

    const handleImages = () => {
        if (item.images === undefined || item.images.length === 0) {
            return [item.image]
        } else {
            return [...item.images]
        }
    }

    useEffect(() => {

    }, [isAdded]);

    // Don't render if not active
    if(!modalState) {
        return null;
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={toggleModal}/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{`#${item.intId}`}</p>
                    <button className="delete" onClick={toggleModal}/>
                </header>
                <section className="modal-card-body" style={{overflowWrap: "break-word"}}>
                    <div className="content">
                        <div className={"mb-5"}><Carousel photos={handleImages()}/></div>
                        <hr/>
                        <p className={"is-text title"}><b> {item["title"] || item["primaryTitle"] || "Untitled"}</b></p>
                        {handleCategories()}
                        <p className={"is-text"}><b>Credits:</b> {item.credits}</p>
                        <p className={"is-text"}><b>Date:</b> {item["date"] || "Undated"}</p>
                        <p className={""}><b>Description:</b></p> <p dangerouslySetInnerHTML={{ __html: (item["description"] || "No description given") }} />
                        <hr/>
                        <p className={"is-text"}><b>See more:</b> { item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a> : "No link provided"} </p>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    {handleButtonRack()}
                </footer>
            </div>
        </div>
    )
}
