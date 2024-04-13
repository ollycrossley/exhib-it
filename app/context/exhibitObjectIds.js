"use client"
import {createContext, useContext, useState} from 'react';

const ExhibitIds = createContext();

export function ExhibitIdsProvider({ children }) {

    const [exhibitIds, setExhibitIds] = useState([])

    return (
        <ExhibitIds.Provider value={{exhibitIds, setExhibitIds}}>
            {children}
        </ExhibitIds.Provider>
    );
}

export function useExhibitIdsContext() {
    return useContext(ExhibitIds);
}