import {useEffect, useRef, useState} from "react";

export default function SearchOptionsBar({searchTerm, setSearchTerm, currentApi, setCurrentApi, getItems}) {

    const ref = useRef(null)

    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            getItems();
        }
    }

    // Dropdown Active States
    const [isApiDrActive, setIsApiDrActive] = useState(false)

    const acceptedApis = {
        "Victoria Albert": "va",
        "Harvard": "harv",
        "Metropolitan": "met"
    }

    const handleApi = (api) => {
        setCurrentApi(acceptedApis[api])
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isApiDrActive && ref.current && !ref.current.contains(e.target)) {
                setIsApiDrActive(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isApiDrActive]);

    return (

        <div className={"mb-5"}>
            <div className={"columns is-hidden-tablet-only is-hidden-mobile"}>

                <div className={"column is-narrow"}>
                    <div className="field has-addons" id={"search-bar"}>
                        <div className="control">
                            <input className="input" type="text" placeholder="Search for item"
                                   onChange={e => setSearchTerm(e.target.value)}
                                   onKeyDown={e => handleSearchKeyPress(e)}/>
                        </div>
                        <div className="control">
                            <button className="button is-info" onClick={getItems}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className={"column is-narrow"}>
                        <div className={`dropdown ${isApiDrActive ? "is-active" : ""}`} ref={ref}>
                        <div className="dropdown-trigger">
                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3"
                                    onClick={() => setIsApiDrActive(!isApiDrActive)}>
                                <p><strong>Museum
                                    Selection</strong> ({Object.keys(acceptedApis).find(api => acceptedApis[api] === currentApi)})
                                </p>
                                <span className="icon is-small has-text-info">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            </button>
                        </div>

                        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                            <div className="dropdown-content">
                                {Object.keys(acceptedApis).map(api => <a
                                    className={`dropdown-item ${acceptedApis[api] === currentApi ? "has-background-info-light" : ""}`}
                                    key={api}
                                    onMouseDown={() => {
                                        handleApi(api)
                                        setIsApiDrActive(false)
                                    }}>{api}</a>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"columns is-centered is-hidden-mobile is-hidden-desktop"}>

                <div className={"column is-narrow"}>
                    <div className="field has-addons" id={"search-bar"}>
                        <div className="control">
                            <input className="input" type="text" placeholder="Search for item"
                                   onChange={e => setSearchTerm(e.target.value)}
                                   onKeyDown={e => handleSearchKeyPress(e)}/>
                        </div>
                        <div className="control">
                            <button className="button is-info" onClick={getItems}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className={"column is-narrow"}>

                    <div className={`dropdown ${isApiDrActive ? "is-active" : ""}`} ref={ref}>
                        <div className="dropdown-trigger">
                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3"
                                    onClick={() => setIsApiDrActive(!isApiDrActive)}>
                                <p><strong>Museum
                                    Selection</strong> ({Object.keys(acceptedApis).find(api => acceptedApis[api] === currentApi)})
                                </p>
                                <span className="icon is-small has-text-info">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            </button>
                        </div>

                        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                            <div className="dropdown-content">
                                {Object.keys(acceptedApis).map(api => <a
                                    className={`dropdown-item ${acceptedApis[api] === currentApi ? "has-background-info-light" : ""}`}
                                    key={api}
                                    onMouseDown={() => {
                                        handleApi(api)
                                        setIsApiDrActive(false)
                                    }}>{api}</a>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"columns is-hidden-desktop is-hidden-tablet mx-auto"} style={{width: "90%"}}>

                <div className={"column"}>
                    <div className="field has-addons is-justify-content-center" id={"search-bar"}>
                        <div className="control">
                            <input className="input" type="text" placeholder="Search for item"
                                   onChange={e => setSearchTerm(e.target.value)}
                                   onKeyDown={e => handleSearchKeyPress(e)}
                                   value={searchTerm}/>
                        </div>
                        <div className="control">
                            <button className="button is-info" onClick={getItems}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className={"column has-text-centered"}>
                    <div className={`dropdown ${isApiDrActive ? "is-active" : ""}`} ref={ref}>
                        <div className="dropdown-trigger">
                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3"
                                    onClick={() => setIsApiDrActive(!isApiDrActive)}>
                                <p><strong>Museum
                                    Selection</strong> ({Object.keys(acceptedApis).find(api => acceptedApis[api] === currentApi)})
                                </p>
                                <span className="icon is-small has-text-info">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            </button>
                        </div>

                        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                            <div className="dropdown-content">
                                {Object.keys(acceptedApis).map(api => <a
                                    className={`dropdown-item has-text-left ${acceptedApis[api] === currentApi ? "has-background-info-light" : ""}`}
                                    key={api}
                                    onMouseDown={() => {
                                        handleApi(api)
                                        setIsApiDrActive(false)
                                    }}>{api}</a>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}