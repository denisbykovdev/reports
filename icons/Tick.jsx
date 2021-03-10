import React from "react"
import { Svg, G, Path } from "react-native-svg"
import colors from "../utils/colors";
import { responsiveWidth } from "../utils/layout";

const Tick = () => (
    <Svg 
        x="0px" 
        y="0px" 
        width={responsiveWidth(14.375)}
        height={responsiveWidth(9.438)} 
        viewBox="0 0 14.375 9.438" 
        enable-background="new 0 0 14.375 9.438"
    >
        <G>
            <Path fill-rule="evenodd" clip-rule="evenodd" fill={colors.azul} d="M14.18,0.353c-0.315-0.421-1.001-0.343-1.53,0.175L5.993,7.046
			l-4.248-3.99c-0.377-0.354-0.97-0.335-1.325,0.042C0.066,3.476,0.084,4.069,0.461,4.424l4.829,4.535
			c0.316,0.297,0.776,0.317,1.128,0.099c0.202-0.071,0.405-0.178,0.591-0.36l6.783-6.641C14.321,1.538,14.496,0.775,14.18,0.353z"/>
        </G>
    </Svg>
)

export default Tick;