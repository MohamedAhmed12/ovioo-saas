"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/store";

export const ReduxProvider = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
);
