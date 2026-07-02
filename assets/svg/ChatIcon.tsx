import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface TabIconProps extends SvgProps {
  fill?: string;
}

export function HomeIcon({ fill = "#0E0B9D", ...props }: TabIconProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-5H9v5H4a1 1 0 0 1-1-1v-9.5Z"
        fill={fill}
      />
      <Path d="M8.5 12.5h7v6h-7v-6Z" fill={fill} opacity={0.28} />
    </Svg>
  );
}
