import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path fill="#fff" d="M12 5h2v16h-2z" />
    <Path fill="#fff" d="M5 12h16v2H5z" />
  </Svg>
);

export default SvgComponent;
