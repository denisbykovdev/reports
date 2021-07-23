export default function stringSlicer(string, stringLength = 15) {
    let slicer = string !== null && string !== undefined && string.length > stringLength ? `...${string.slice(1, stringLength)}` : string
    return slicer
}