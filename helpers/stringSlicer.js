export default function stringSlicer(string) {
    let slicer = string.length > 15 ? `...${string.slice(1, 15)}` : string
    return slicer
}