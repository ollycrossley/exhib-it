import {Carousel} from "@/app/components/Carousel";

export const LibraryModal = ({item, toggleModal, modalState}) => {

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
                <section className="modal-card-body">
                    <div className="content">
                        <div className={"mb-5"}><Carousel photos={[...item.images]}/></div>
                        <p className={"is-text title"}><b> {item["title"] || item["primaryTitle"] || "Untitled"}</b></p>
                        <p className={"is-text"}><b>Date:</b> {item["date"] || "Undated"}</p>
                        <p className={"is-text"}><b>Description:</b> <i>{item["description"] || "No description given"}</i></p>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <a className="button" onClick={toggleModal}>Cancel</a>
                </footer>
            </div>
        </div>
    )
}
