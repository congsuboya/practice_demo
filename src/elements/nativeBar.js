

import{requireNativeComponent,View}from 'react-native';

import PropTypes from 'prop-types';

var iface = {
    name: 'NativeBar',
    propTypes: {
        option:PropTypes.object,
      ...View.propTypes // 包含默认的View的属性
    },
  };
  
  module.exports = requireNativeComponent('BarNativeView', iface);