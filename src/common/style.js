import React from 'react';
import * as ReactIs from 'react-is';
import { processColor } from 'react-native';
import invariant from 'fbjs/lib/invariant';

// For some reason RNImageMatrixFilter draw method is not called when component's backgroundColor
// is not set or transparent
export const defaultStyle = {
  backgroundColor: '#fff0'
};

export const hiddenStyle = {
  position: 'absolute',
  opacity: 0,
  zIndex: Number.MIN_SAFE_INTEGER
};

export const checkStyle = (style) => {
  if (style) {
    const { backgroundColor } = defaultStyle;

    invariant(
      processColor(backgroundColor) !== 0,
      `ImageFilterKit: Can't use '${backgroundColor}' backgroundColor,` +
      ` consider using '#fff0' instead.`
    );
  }
};

export const hidden = (item) => (
  ReactIs.isFragment(item)
    ? React.cloneElement(item, {
      ...item.props,
      children: {
        ...item.props.children,
        props: {
          ...item.props.children.props,
          style: item.props.children.props.style
            ? [item.props.children.props.style, hiddenStyle]
            : hiddenStyle
        }
      }
    })
    : React.cloneElement(item, {
      ...item.props,
      style: item.props.style ? [item.props.style, hiddenStyle] : hiddenStyle
    })
);