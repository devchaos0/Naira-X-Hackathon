import Svg, { Path, SvgProps } from "react-native-svg";

interface TabIconProps extends SvgProps {
  fill?: string;
}

export function CrowdFundIcon({ fill = "#0E0B9D", ...props }: TabIconProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 8.2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-4.5-.8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
        fill={fill}
      />
      <Path
        d="M4 17.7c0-2 1.75-3.7 4-3.7h8c2.25 0 4 1.7 4 3.7v1.3H4v-1.3Z"
        fill={fill}
        opacity={0.85}
      />
    </Svg>
  );
}
