import React from "react";

export const handleUp = (
    selected:number,
    setSelected: React.Dispatch<React.SetStateAction<number>>,
    scrollContainerRef: React.RefObject<HTMLDivElement>

    ) => {
    const nextSelected = selected - 1;
    if (nextSelected >= 0) {
        setSelected(nextSelected);
        if ((nextSelected + 1) % 3 === 0) {
            scrollContainerRef.current?.scrollBy({ top: -75, behavior: 'smooth' });
        }
    }
}

export const handleDown = (
    selected: number,
    length: number,
    setSelected: React.Dispatch<React.SetStateAction<number>>,
    scrollContainerRef: React.RefObject<HTMLDivElement>
    ) => {
    const nextSelected = selected + 1;
    if (nextSelected < length) {
        setSelected(nextSelected);
        if ((nextSelected) % 3 === 0) {
            scrollContainerRef.current?.scrollBy({ top: 75, behavior: 'smooth' });
        }
    }
}

export const handleSelect = () => {
    console.log("Handle select...");
}