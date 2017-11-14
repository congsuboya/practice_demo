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

import { DrawXYAxis, dealWithOption, DrawXYAxisValue, DrawYValueView } from '../utils/applicationUtils';
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
            rectWidth,
            rectNum
        } = this.state;
        return (
            <View style={[{ flexDirection: 'row' }, this.props.style]}>
                {DrawYValueView(this.props.valueInterval, barCanvasHeight, this.state.viewHeight, maxNum)}
                <ScrollView
                    horizontal={this.state.horizontal}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={false}
                    style={{ height: this.state.viewHeight, width: this.state.viewWidth - 50 }}
                >
                    <View style={{ flex: 1, backgroundColor: 'white', height: this.state.viewHeight, width: this.state.svgWidth }}>
                        <View style={{ flex: 0 }}>
                            <Svg width={this.state.svgWidth} height={this.state.svgHeight}>
                                {DrawXYAxis(barCanvasHeight, this.state.svgWidth, this.props.valueInterval)}
                                {this.renderBarItem()}
                            </Svg>
                        </View>
                        {DrawXYAxisValue(xAxis, true, this.state.svgWidth, rectWidth * rectNum + 2 * interWidth)}
                    </View>
                </ScrollView>

                <Text style={{
                    color: '#8FA1B2',
                    fontSize: 9,
                    height: 20,
                    marginTop: 3,
                    width: 100,
                    position: 'absolute',
                    textAlign: 'center',
                    bottom: 0,
                    right: (this.state.viewWidth - 135) / 2
                }}>x轴名称</Text>
            </View >
        )
    }
}

Bar.defaultProps = {
    option: {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Sat', 'Sun', 'wqe', 'sdr', 'opu'],
            axisTick: {
                alignWithLabel: true
            }
        },
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