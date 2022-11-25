import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.366.366a1.25 1.25 0 011.768 0L10 8.232 17.866.366a1.25 1.25 0 011.768 1.768L11.768 10l7.866 7.866a1.25 1.25 0 01-1.768 1.768L10 11.768l-7.866 7.866a1.25 1.25 0 01-1.768-1.768L8.232 10 .366 2.134a1.25 1.25 0 010-1.768z"
        fill="#0582FF"
      />
    </Svg>
  );
}

export default SvgComponent;
