import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 8.5a8.5 8.5 0 1 1 15.176 5.262l4.531 4.53a1 1 0 0 1-1.414 1.415l-4.531-4.531A8.5 8.5 0 0 1 0 8.5Zm13.16 4.532a6.5 6.5 0 1 0-.128.128 1.01 1.01 0 0 1 .128-.128Z"
      fill="#0582FF"
    />
  </Svg>
);

export default SvgComponent;
