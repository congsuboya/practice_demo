import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Animated,
    ScrollView
} from 'react-native';

import Svg, {
    Circle,
    Path,
    Rect,
} from 'react-native-svg';
const window = Dimensions.get('window');
import ColorList from '../globalVariable';

import { DrawXYAxis, dealWithOption } from '../utils/applicationUtils';
const AnimatedRect = Animated.createAnimatedComponent(Rect);

const interWidth = 10;

export default class Bar extends React.Component {

    constructor(props) {
        super(props)
        let { height, width } = props.style;
        let viewHeight = height ? height : 300;
        let viewWidth = width ? width : window.width;
        this.state = {
            viewHeight,
            viewWidth,
            ...dealWithOption(viewWidth, viewHeight, props.option, props.valueInterval)
        }
        this.viewAnimatedList = [];
        this.renderBarItem = this.renderBarItem.bind(this);
    }


    // xAxis,yAxis,horizontal,
    // series,
    // rectWidth,
    // svgLength,
    // rectNum,
    // svgWidth,
    // svgHeight,
    // intervalNum,
    // maxNum

    renderBarItem() {
        let {
            maxNum, series,
            intervalNum,
            rectNum,
            rectWidth,
            perRectHeight,
            barCanvasHeight
        } = this.state;

        let barViewList = [];
        for (let i = 0; i < intervalNum; i++) {
            series.map((mapItem, index) => {
                let rectHight = mapItem.data[i] * perRectHeight
                barViewList.push(
                    <AnimatedRect
                        x={(i * 2 + 1) * interWidth + i * rectWidth * rectNum + index * rectWidth}
                        y={barCanvasHeight + 10}
                        width={rectWidth}
                        height={-rectHight}
                        fill={ColorList[index]}
                    />
                )
            })
        }
        return barViewList;
    }

    componentDidMount() {
        // this.viewAnimatedList.map((item, index) => {
        //     Animated.spring(
        //         item,
        //         {
        //             toValue: 100,
        //             tension: 35,
        //             duration: 5000,
        //         }
        //     ).start();
        // })
    }

    render() {
        let { maxNum, series, drawRectData, viewHeight, svgHeight, svgWidth, barCanvasHeight,
            perRectHeight } = this.state;
        return (
            <View style={[{ flexDirection: 'row' }, this.props.style]}>
                <View style={{ backgroundColor: 'green', width: 35, height: this.state.viewHeight }}>
                </View>
                <ScrollView
                    horizontal={this.state.horizontal}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={false}
                    style={{ height: this.state.viewHeight - 30, width: this.state.viewWidth - 50 }}
                >
                    <View style={{ flex: 1, backgroundColor: 'yellow', height: this.state.svgHeight + 15, width: this.state.svgWidth }}>
                        <Svg width={this.state.svgWidth} height={this.state.svgHeight}>
                            {DrawXYAxis(barCanvasHeight, this.state.svgWidth, this.props.valueInterval)}
                            {this.renderBarItem()}
                        </Svg>
                    </View>
                </ScrollView>
            </View >
        )
    }
}

Bar.defaultProps = {
    option: {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'wqe', 'sdr', 'opu'],
            axisTick: {
                alignWithLabel: true
            }
        }
        ,
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [1, 5, 2, 3, 10, 7, 6, 5, 2, 3,]
            },
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [3, 4, 1, 4, 2, 8, 3, 3, 10, 7]
            }
        ]
    },
    valueInterval: 3,
    style: { height: 400, width: window.width }
}