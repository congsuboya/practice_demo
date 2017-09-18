import React, { Component } from 'react';
import {
    View,
    PanResponder,
    TouchableOpacity
} from 'react-native';

export default class BaseView extends React.Component {
    static defaultProps = {
        style: { width: 150, height: 150, backgroundColor: 'pink' },
        children: null,
        parentHeight: 150,
        parentWidth: 150,
        onTouch: null,
        onBeginTouch: () => console.log('xsyBaseView', '开始触摸'),
        onTouch: (e) => console.log('xsyBaseView', '点击'),
        onRightSlip: (e) => console.log('xsyBaseView', '右滑'),
        onLeftSlip: (e) => console.log('xsyBaseView', '左滑')
    }

    constructor(props) {
        super(props)
        let { width, height } = props.style;
        this.state = {
            top: 0,
            left: 0,
            selfWidth: width,
            selfHeight: height
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => false,
            onPanResponderGrant: () => {
                this.props.onBeginTouch ? this.props.onBeginTouch() : null
            },
            onPanResponderMove: (evt, gs) => {
                this.props.onTouchMove ? this.props.onTouchMove(evt, gs) : null
            },
            onPanResponderRelease: (evt, gs) => {
                if (!this.props.onTouchMove) {
                    if (Math.abs(gs.dx) > 10) {
                        if (gs.dx > 0 && this.props.onRightSlip) {
                            this.props.onRightSlip();
                        } else if (gs.dx < 0 && this.props.onLeftSlip) {
                            this.props.onLeftSlip();
                        }
                    } else if (Math.abs(gs.dy) < 10 && this.props.onTouch) {
                        this.props.onTouch();
                    };
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            }
        })
    }

    render() {
        return (
            <View
                {...this._panResponder.panHandlers}
                style={this.props.style}
                children={this.props.children} />
        )
    }
}