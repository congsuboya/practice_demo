import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Animated,
    ScrollView,
    Text
} from 'react-native';

import Svg, {
    Circle,
    Path,
    Rect,
} from 'react-native-svg';
const window = Dimensions.get('window');
import ColorList from '../globalVariable';

import { DrawXYAxisLine, dealWithOption, DrawYXAxisValue, DrawYValueView } from '../utils/applicationUtils';
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


    renderBarItem() {
        let {
            maxNum, series,
            intervalNum,
            rectNum,
            rectWidth,
            perRectHeight,
            barCanvasHeight,
            horizontal
        } = this.state;

        let barViewList = [];
        for (let i = 0; i < intervalNum; i++) {
            series.map((mapItem, index) => {
                let rectHight = mapItem.data[i] * perRectHeight
                barViewList.push(
                    <AnimatedRect
                        x={2}
                        y={(i * 2 + 1) * interWidth + i * rectWidth * rectNum + index * rectWidth}
                        width={rectHight}
                        height={rectWidth}
                        fill={ColorList[index]}
                    />
                )
            })
        }
        return barViewList;
    }

    componentDidMount() {

    }

    render() {
        let {
            maxNum,
            series,
            drawRectData,
            viewHeight,
            svgHeight,
            svgWidth,
            barCanvasHeight,
            perRectHeight,
            xAxis,
            yAxis,
            rectWidth,
            rectNum
        } = this.state;
        return (
            <View style={[{ flexDirection: 'row' }, this.props.style]}>
                <Text style={{
                    fontSize: 9,
                    width: 10,
                    height: 100,
                    textAlign: 'center',
                    marginTop: (this.state.viewHeight - 170) / 2,
                    marginLeft: 5,
                    marginRight: 5
                }}>y轴名称</Text>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        horizontal={this.state.horizontal}
                        style={{ height: this.state.viewHeight - 50, width: this.state.viewWidth - 20 }}>
                        <View style={{ width: this.state.viewWidth - 20, height: this.state.svgHeight, flexDirection: 'row', backgroundColor: 'white' }}>
                            <View style={{ width: 30, height: this.state.svgHeight, backgroundColor: 'pink' }}>
                                {DrawYXAxisValue(yAxis, this.state.horizontal, this.state.horizontal ? this.state.svgWidth : this.state.svgHeight, rectWidth * rectNum + 2 * interWidth)}
                            </View>

                            <View style={{ flex: 0 }}>
                                <Svg width={this.state.svgWidth} height={this.state.svgHeight}>
                                    {DrawXYAxisLine(barCanvasHeight, this.state.horizontal ? this.state.svgWidth : this.state.svgHeight, this.state.horizontal, this.props.valueInterval)}
                                    {this.renderBarItem()}
                                </Svg>
                            </View>

                        </View>
                    </ScrollView>

                    <View style={{ height: 50, width: this.props.viewWidth - 20, backgroundColor: 'green' }}></View>
                </View>
            </View >
        )
    }
}

Bar.defaultProps = {
    option: {
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Sat', 'Sun', 'wqe', 'sdr', 'opu'],
            axisTick: {
                alignWithLabel: true
            }
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