"use client";
import {ExhibitObjectsProvider} from "@/app/context/exhibitObjects";
import {ExhibitIdsProvider} from "@/app/context/exhibitObjectIds";

export function Providers({ children }) {
    return (
        <ExhibitIdsProvider>
            <ExhibitObjectsProvider>
                {children}
            </ExhibitObjectsProvider>
        </ExhibitIdsProvider>
    );
}