"use client"
import {createContext, useContext, useState} from 'react';

const ExhibitObjects = createContext();

export function ExhibitObjectsProvider({ children }) {

    const [exhibitObjects, setExhibitObjects] = useState([])

    return (
        <ExhibitObjects.Provider value={{exhibitObjects, setExhibitObjects}}>
            {children}
        </ExhibitObjects.Provider>
    );
}

export function useExhibitObjectContexts() {
    return useContext(ExhibitObjects);
}