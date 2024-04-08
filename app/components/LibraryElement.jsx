export default function LibraryElement({element}) {
    return (
        <div className={"column is-narrow"}>
            <img className={"image lib-el"} src={element.image} alt={"library element image"}/>
        </div>
    )
}