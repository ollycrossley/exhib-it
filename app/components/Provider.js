"use client";

import { ContextProvider } from "../context/state";

export function Providers({ children }) {
    return (
            <ContextProvider>{children}</ContextProvider>
    );
}