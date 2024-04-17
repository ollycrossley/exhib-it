export const LibraryModal = ({item, toggleModal, modalState}) => {

    if(!modalState) {
        return null;
    }

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={toggleModal}/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{`#${item.id}`}</p>
                    <button className="delete" onClick={toggleModal}/>
                </header>
                <section className="modal-card-body">
                    <div className="content">
                        <b>Title:</b> {item.primaryTitle}
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <a className="button" onClick={toggleModal}>Cancel</a>
                </footer>
            </div>
        </div>
    )
}
