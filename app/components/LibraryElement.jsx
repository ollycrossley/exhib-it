export default function LibraryElement({element}) {
    return (
        <div className={"column is-narrow"}>
            <div className={"img-container"}>
                <img className={"image lib-el"} src={element.image} alt={"library element image"}/>
                <div className={"overlay is-flex is-flex-wrap-wrap is-align-items-center is-justify-content-center p-2 is-flex-direction-row"}>
                    <div>
                        <p className={"is-white is-size-5 has-text-centered is-bold"}>{element.primaryTitle || "Unknown"}</p>
                        <p className={"is-white is-size-6 has-text-centered"}>{element.primaryMaker || "Unknown"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}