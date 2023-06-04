import * as React from 'react';

const SvgComponent = ({color = '#0582FF', ...props}) => (
  <svg
    width={20}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.614.21a1 1 0 0 0-1.228 0l-9 7A1 1 0 0 0 0 8v11a3 3 0 0 0 3 3h4v-9.167c0-.46.336-.833.75-.833h4.5c.414 0 .75.373.75.833V22h4a3 3 0 0 0 3-3V8a1 1 0 0 0-.386-.79l-9-7Z"
      fill={color}
    />
  </svg>
);

export default SvgComponent;
