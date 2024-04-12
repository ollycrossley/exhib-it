"use client"
import { createContext, useContext } from 'react';

const AppContext = createContext({});

export function ContextProvider({ children }) {
    const sharedState = { exhibitObjects: [], exhibitObjectIds: [] }; // You can set any initial state here
    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}