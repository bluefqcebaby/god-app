import React, {FC, memo} from 'react';
import * as RN from 'react-native';

interface Props {
  icon: any;
  size: number;
  style: any;
}

const SvgIcon: FC<Props> = ({icon, size = 24, style, ...props}) => {
  const Icon = icon;
  return (
    <RN.View style={style}>
      <Icon size={size} {...props} />
    </RN.View>
  );
};

export default memo(SvgIcon);
