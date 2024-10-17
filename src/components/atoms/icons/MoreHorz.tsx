import {IconProps} from '@typed/icon';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent: React.FC<IconProps> = props => (
  <Svg
    width={props.size || 24}
    height={props.size || 24}
    fill={props.color || '#64748b'}
    viewBox="0 -960 960 960"
    {...props}>
    <Path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
  </Svg>
);
export {SvgComponent as MoreHorz};
