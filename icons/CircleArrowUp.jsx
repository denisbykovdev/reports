import React from "react"
import { Svg, G, Path, Circle } from "react-native-svg"
import { responsiveWidth } from "../utils/layout";

const CircleArrowUp = () => (
    <Svg 
        x="0px" 
        y="0px" 
        width={responsiveWidth(23)}
        height={responsiveWidth(23)} 
        viewBox="0 0 31.083 30.833" 
        enable-background="new 0 0 31.083 30.833" 
    >
        <G>
            <Circle fill-rule="evenodd" clip-rule="evenodd" fill="#dadfe7" cx="15.552" cy="15.479" r="15.167" />
            <Path fill-rule="evenodd" clip-rule="evenodd" fill="#4E546C" d="M20.309,17.769c-0.254,0.267-0.746,0.226-1.102-0.093
			L15.551,14.4l-3.656,3.275c-0.355,0.318-0.848,0.359-1.102,0.093c-0.254-0.266-0.173-0.739,0.181-1.056l3.845-3.445
			c0.222-0.199,0.494-0.275,0.732-0.25c0.238-0.025,0.511,0.051,0.732,0.25l3.845,3.445C20.482,17.029,20.563,17.503,20.309,17.769z
			"/>
        </G>
    </Svg>
)

export default CircleArrowUp;