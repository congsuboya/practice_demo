
import React from 'react';
import { requireNativeComponent, View } from 'react-native';
import PropTypes from 'prop-types';

export default class NativeBar extends React.Component {
  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this);
    this._onScroll = this._onScroll.bind(this);
  }
  _onChange(event) {
    if (!this.props.onClickItem) {
      return;
    }
    this.props.onClickItem(event);
  }

  _onScroll(event) {
    if (!this.props.rnOnScroll) {
      return;
    }
    this.props.rnOnScroll(event);
  }
  render() {
    return <RCTBarView {...this.props} onChange={this._onChange} nativeOnScroll={this._onScroll} />;
  }
}
NativeBar.propTypes = {
  onClickItem: React.PropTypes.func,
  rnOnScroll: React.PropTypes.func,
  option: PropTypes.object,
  ...View.propTypes // 包含默认的View的属性
};

var RCTBarView = requireNativeComponent(`BarNativeView`, NativeBar, {
  nativeOnly: { onChange: true }
});