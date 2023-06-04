import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../constants/styles';

const SvgComponent = props => (
  <Svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.1 1c0-.552.492-1 1.1-1h5.5C20.523 0 22 1.343 22 3v16c0 1.657-1.477 3-3.3 3h-5.5c-.607 0-1.1-.448-1.1-1s.492-1 1.1-1h5.5c.608 0 1.1-.448 1.1-1V3c0-.552-.492-1-1.1-1h-5.5c-.607 0-1.1-.448-1.1-1ZM9.122 6.293a1.18 1.18 0 0 1 1.556 0l4.4 4a.937.937 0 0 1 0 1.414l-4.4 4a1.18 1.18 0 0 1-1.556 0 .937.937 0 0 1 0-1.414L11.644 12H1.1C.492 12 0 11.552 0 11s.492-1 1.1-1h10.544L9.122 7.707a.937.937 0 0 1 0-1.414Z"
      fill={colors.RED}
    />
  </Svg>
);

export default SvgComponent;
