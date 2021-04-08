import React from "react"
import { Svg, G, Path } from "react-native-svg"
import { responsiveWidth } from "../utils/layout";

const Search = () => (
    <Svg  
        x="0px" 
        y="0px" 
        width={responsiveWidth(12)}
        height={responsiveWidth(12)}
        viewBox="0 0 11.938 12.188" 
        enable-background="new 0 0 11.938 12.188" 
    >

        <G>
            <G>
                <G>
                    <Path fill-rule="evenodd" clip-rule="evenodd" fill="#313A51" d="M9.133,7.855c0.736,0.649,1.465,1.296,2.198,1.936
					c0.244,0.213,0.446,0.444,0.503,0.777c0.084,0.489-0.147,0.976-0.584,1.209c-0.438,0.234-0.976,0.163-1.33-0.185
					c-0.116-0.114-0.219-0.242-0.327-0.364c-0.428-0.486-0.855-0.972-1.285-1.457C8.193,9.641,8.147,9.5,8.227,9.337
					c0.112-0.23,0.407-0.273,0.59-0.079c0.197,0.213,0.386,0.435,0.578,0.652c0.33,0.375,0.658,0.752,0.991,1.125
					c0.168,0.189,0.438,0.204,0.612,0.04c0.177-0.165,0.184-0.448-0.001-0.612c-0.766-0.681-1.536-1.356-2.312-2.04
					c-1.097,1.146-2.435,1.692-4.014,1.585C3.42,9.925,2.356,9.41,1.483,8.508C-0.252,6.714-0.356,3.84,1.246,1.951
					c1.666-1.965,4.483-2.359,6.579-0.921C9.981,2.508,10.673,5.506,9.133,7.855z M5.037,9.305c2.322,0.002,4.216-1.893,4.209-4.213
					C9.238,2.765,7.365,0.895,5.042,0.894c-2.34-0.001-4.204,1.872-4.206,4.224C0.835,7.422,2.722,9.304,5.037,9.305z"/>
                </G>
            </G>
        </G>
    </Svg>
)

export default Search