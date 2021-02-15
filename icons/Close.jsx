import React from "react";
import { Svg, G, Line, Rect } from "react-native-svg";
import colors from "../utils/colors";

const Close = ({ width = 18.563, height = 18.438 }) => (
  <Svg
    x="0px"
    y="0px"
    width={width}
    height={height}
    viewBox="0 0 18.563 18.438"
    enable-background="new 0 0 18.563 18.438"
    // fill={colors.paleGrayLight}
    stroke={colors.paleGrayLight}
    strokeWidth={2}
  >
    <G>
      <G>
        <G>
          <G>
            <Line
              fill="#141414"
              x1="0.625"
              y1="0.687"
              x2="17.958"
              y2="17.854"
            />
          </G>
          <G>
            <Rect
              x="-2.906"
              y="8.57"
              transform="matrix(0.7105 0.7037 -0.7037 0.7105 9.2134 -3.8548)"
              width="24.396"
              height="1.4"
            />
          </G>
        </G>
        <G>
          <G>
            <Line
              fill="#141414"
              x1="17.958"
              y1="0.687"
              x2="0.625"
              y2="17.854"
            />
          </G>
          <G>
            <Rect
              x="8.591"
              y="-2.927"
              transform="matrix(0.7036 0.7106 -0.7106 0.7036 9.3413 -3.8546)"
              width="1.4"
              height="24.396"
            />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

export default Close;
