import React, { Component } from 'react';
import {
    Dimensions,
    View
} from 'react-native';

import Svg, {
    Path,
    Text
} from 'react-native-svg';

const window = Dimensions.get('window');

import ColorList from '../globalVariable';

export default class XYAxis extends React.Component {

    static defaultProps = {
        yMax: 300
    }

    constructor(props) {
        super(props)
        let { height, width } = props.style;
        let svgHeight = height ? height : 300;
        let svgWidth = width ? width : window.width;
        this.state = {
            svgHeight,
            svgWidth
        }
        this.renderBarItem = this.renderBarItem.bind(this);
    }

    renderBarItem(yMax, Data, animateRow) {
        let barViewList = [];
        Data.map((item, index) => {
            this.viewAnimatedList[index] = new Animated.Value(0);
            let outputRangeItem = animateRow ? `-${item}` : '30';
            let itemAnimated = this.viewAnimatedList[index].interpolate({
                inputRange: [
                    0,
                    100
                ],
                outputRange: [
                    '0',
                    outputRangeItem,
                ]
            })
            barViewList.push(
                <AnimatedRect
                    x={(50 + index * 45)}
                    y={yMax - 30}
                    width={animateRow ? 30 : itemAnimated}
                    height={animateRow ? itemAnimated : -item}
                    fill={ColorList[index]}
                />
            )
        });
        return barViewList;
    }

    componentDidMount() {
        this.viewAnimatedList.map((item, index) => {
            Animated.spring(
                item,
                {
                    toValue: 100,
                    tension: 35,
                    duration: 5000,
                }
            ).start();
        })

    }

    render() {
        return (
            <View style={[{ alignItems: 'center' }, this.props.style]}>
                <Svg width={this.state.svgWidth} height={this.state.svgHeight}>
                    {this.renderBarItem(this.props.yMax, this.props.Data, this.props.animateRow)}
                </Svg>
            </View>
        )
    }
}