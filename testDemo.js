import React, { Component } from 'react';
import {
    View,
    Dimensions,
    ART,
    PixelRatio,
    StyleSheet,
    PanResponder,
    Text,
    Animated
} from 'react-native';

import PropTypes from 'prop-types';

import Svg, {
    Line,
    Circle,
    G,
    Rect,
    LinearGradient,
    Stop,
    Defs,
    Text as SvgText
} from 'react-native-svg';

const { Surface, Shape, Path, Group } = ART;

const window = Dimensions.get('window');

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default class Demo extends React.Component {


    static propTypes = {
        ...View.propTypes,
        scalable: PropTypes.bool
    };

    static defaultProps = {
        scalable: true
    };

    constructor(props) {
        super(props);
        this.state = {
            scaleX: 1,
            scale: 1,
            lastScale: 1,
            offsetX: 0,
            offsetY: 0,
            lastX: 0,
            lastY: 0,
            index: 0
        }
        this.barListView = [];
    }


    componentWillMount() {
        this.barListView = this.renderMuchBar();
        this.gestureHandlers = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminationRequest: evt => true,
            onShouldBlockNativeResponder: evt => false
        });

    }


    _handleStartShouldSetPanResponder = (e, gestureState) => {
        // don't respond to single touch to avoid shielding click on child components
        return false;
    }

    _handleMoveShouldSetPanResponder = (e, gestureState) => {
        return this.props.scalable && gestureState.dx > 2 || gestureState.dy > 2 || gestureState.numberActiveTouches === 2;
    }

    _handlePanResponderGrant = (e, gestureState) => {
        if (gestureState.numberActiveTouches === 2) {
            let dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
            let dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
            let distant = Math.sqrt(dx * dx + dy * dy);
            this.distant = distant;
        }
    }

    _handlePanResponderEnd = (e, gestureState) => {
        this.setState({
            lastX: this.state.offsetX,
            lastY: this.state.offsetY,
            lastScale: this.state.scale
        });
    }

    _handlePanResponderMove = (e, gestureState) => {
        // zoom
        if (gestureState.numberActiveTouches === 2) {
            let dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
            let dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
            let distant = Math.sqrt(dx * dx + dy * dy);
            let scale = distant / this.distant * this.state.lastScale;
            this.setState({ scale });
        }
        // translate
        else if (gestureState.numberActiveTouches === 1) {
            let offsetX = this.state.lastX + gestureState.dx / this.state.scale;
            let offsetY = this.state.lastY + gestureState.dy / this.state.scale;
            this.setState({ offsetX, offsetY });
        }
    }

    GetRandomNum(Min, Max) {
        let Range = Max - Min;
        let Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    renderMuchBar() {
        let numRatio = PixelRatio.get();
        let listView = [];
        let path;
        let rectWidth = 1 / numRatio;
        for (let i = 1; i < 300; i++) {
            if (i == 1) {
                path = new Path().moveTo(0, this.GetRandomNum(0, 100)).lineTo(i, this.GetRandomNum(0, 100));
            } else {
                path = path.lineTo(i, this.GetRandomNum(0, 100));
            }
            listView.push(
                <AnimatedRect
                    key={i}
                    x={i + rectWidth}
                    y='300'
                    width={rectWidth}
                    height={this.GetRandomNum(0, 100)}
                    fill="rgb(0,0,255)"
                />
            )
        }
        // return <Shape d={path} stroke={'red'} strokeWidth={1} />
        return listView
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'yellow' }}>
                <Text>{this.state.index}</Text>
                <View
                    {...this.gestureHandlers.panHandlers}
                    style={[styles.container, this.props.style, {
                        transform: [
                            { scaleX: this.state.scale },
                            { translateX: this.state.offsetX },
                            {translateY:this.state.offsetY}
                        ]
                    }]}>
                    <Svg width={window.width} height='400' >
                        {this.barListView}
                    </Svg>
                    {/* <Surface width={window.width} height='400'>
                        {this.renderMuchBar()}
                    </Surface> */}
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
