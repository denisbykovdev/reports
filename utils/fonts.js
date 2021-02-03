import layout from "./layout";

const scale = layout.width < 600 ? 375 : 600;

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / scale;
    const newSize = Math.round(ratio * layout.width);
    return newSize; 
}

//fontSize
const xsmall = scaleFontSize(11);
const small = scaleFontSize(12);
const regular = scaleFontSize(13);
const medium = scaleFontSize(15);
const large = scaleFontSize(17);
const xlarge = scaleFontSize(20);

export default {
    xsmall,
    small,
    regular,
    medium,
    large,
    xlarge
}