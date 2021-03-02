import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const widthScale = width < 600 ? 360 : 900;

// console.log(width)

export const responsiveWidth = (length) => {
  const ratio = length / widthScale;
  const newLength = Math.round(ratio * width);
  return newLength;
}

export const responsiveHeight = (length) => {
  const scale = 630;
  const ratio = length / scale;
  const newLength = Math.round(ratio * height);
  return newLength;
}

export default {
  width,
  height,
  responsiveWidth,
  responsiveHeight
};