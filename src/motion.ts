// One set of motion values for every page, so entrances feel the same everywhere.
export const ease = [0.22, 1, 0.36, 1] as const;

/** Page titles slide up out of a mask. */
export const TITLE = { duration: 1.1, delay: 0.1 } as const;

/** Content blocks rise and fade in as they enter the viewport. */
export const REVEAL = { duration: 0.9, y: 32, stagger: 0.08, margin: "-60px" } as const;
