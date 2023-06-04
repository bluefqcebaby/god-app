import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} {...props}>
    <Path
      d="M4.667 26.307v-7.983L21.81 16.02 4.667 13.716V5.733l24 10.285z"
      fill={'#0582FF'}
    />
  </Svg>
);

export default SvgComponent;
