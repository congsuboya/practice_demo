
import React from 'react';

import { requireNativeComponent, View } from 'react-native';

import PropTypes from 'prop-types';

// var iface = {
//     name: 'NativeBar',
//     propTypes: {
//         option:PropTypes.object,
//       ...View.propTypes // 包含默认的View的属性
//     },
//   };

//   module.exports = requireNativeComponent('BarNativeView', iface);



export default class NativeBar extends React.Component {
  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this);
  }
  _onChange(event) {
    if (!this.props.onClickItem) {
      return;
    }
    this.props.onClickItem(event);
  }
  render() {
    return <RCTBarView {...this.props} onChange={this._onChange} />;
  }
}
NativeBar.propTypes = {
  onClickItem: React.PropTypes.func,
  option: PropTypes.object,
  ...View.propTypes // 包含默认的View的属性
};

var RCTBarView = requireNativeComponent(`BarNativeView`, NativeBar, {
  nativeOnly: { onChange: true }
});