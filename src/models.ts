export interface Soloon extends Resource{
    color: "blue" | "red" | "purple" | "white"
}

export interface Polyanet extends Resource {
}

export interface Cometh extends Resource {
    direction: "up" | "down" | "right" | "left"
}

export interface Position {
    row: number
    column: number
}

export interface Resource {
    position: Position
}

interface resourceMetadata {
    color: "blue" | "red" | "purple" | "white"
    direction: "up" | "down" | "right" | "left"
}

export interface createResourceMetadata extends Partial<resourceMetadata>{}