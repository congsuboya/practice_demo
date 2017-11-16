import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Animated,
    Dimensions,
    Text,
    TouchableHighlight
} from 'react-native';

import Svg, {
    Line,
    Circle,
    G,
    Path,
    Rect,
    LinearGradient,
    Stop,
    Defs,
    Text as SvgText
} from 'react-native-svg';

import { DrawXYAxisLine, dealWithOption, DrawYXAxisValue, DrawYValueView } from '../utils/applicationUtils';

const window = Dimensions.get('window');
import ColorList from '../globalVariable';
const AnimatedRect = Animated.createAnimatedComponent(Rect);
export default class LineChart extends React.Component {


    constructor(props) {
        super(props)
        let { height, width } = props.style;
        let viewHeight = height ? height : 300;
        let viewWidth = width ? width : window.width;
        this.state = {
            viewHeight,
            viewWidth,
            interWidth: props.interWidth,
            valueInterval: props.valueInterval,
            stack: props.option.stack,
            ...dealWithOption(viewWidth, viewHeight, props.option, props.valueInterval, true)
        }
    }

    renderBarItem() {
        let {
             series,
            rectWidth,
            perRectHeight,
            barCanvasHeight,
            interWidth
        } = this.state;

        let lineViewList = [];
        let pointInterWidth = interWidth * 2 + rectWidth;
        let initX = interWidth + rectWidth / 2, pointY;
        let dStr;
        series.map((mapItem, index) => {
            mapItem.data.map((innerItem, innerIndex) => {
                initX = interWidth + rectWidth / 2 + innerIndex * pointInterWidth;
                pointY = innerItem * perRectHeight;
                if (innerIndex == 0) {
                    dStr = `M${initX} ${pointY}`;
                } else {
                    dStr = `${dStr} L${initX} ${pointY}`;
                }
            });
            lineViewList.push(<Path d={dStr} strokeWidth='1' stroke={ColorList[index]} fill='none' />)
        });
        return lineViewList;
    }

    render() {
        let { maxNum, series, xAxis, valueInterval,
            viewWidth, viewHeight, svgHeight, svgWidth,
            barCanvasHeight, perRectHeight, rectWidth, rectNum, interWidth
            } = this.state;
        return (
            <View style={[{ flexDirection: 'row' }, this.props.style]}>
                {DrawYValueView(valueInterval, barCanvasHeight, viewHeight, maxNum)}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={false}
                    style={{ height: viewHeight, width: viewWidth - 50 }}
                >
                    <View style={{ flex: 1, backgroundColor: 'white', height: viewHeight, width: svgWidth }}>
                        <View style={{ flex: 0, backgroundColor: 'white' }}>
                            < Svg width={svgWidth} height={svgHeight}>
                                {DrawXYAxisLine(barCanvasHeight, svgWidth, true, valueInterval)}
                                {this.renderBarItem()}
                            </Svg>
                        </View>
                        {DrawYXAxisValue(xAxis, true, svgWidth, rectWidth * rectNum + 2 * interWidth)}
                    </View>
                </ScrollView >

                <Text style={{
                    color: '#8FA1B2',
                    fontSize: 9,
                    height: 20,
                    marginTop: 5,
                    width: 100,
                    position: 'absolute',
                    textAlign: 'center',
                    bottom: -7,
                    right: (viewWidth - 135) / 2
                }}> x轴名称</Text >
            </View >
        )
    }
}

LineChart.defaultProps = {
    option: {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Sat', 'opu', 'Sun', 'wqe', 'sdr', 'opu', 'Sat', 'Sun', 'wqe', 'sdr', 'opu'],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'value',
            data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Sat', 'Sun', 'wqe', 'sdr', 'opu'],
            axisTick: {
                alignWithLabel: true
            }
        },
        series: [
            {
                name: '直接访问',
                type: 'line',
                barWidth: '60%',
                data: [10, 5, 2, 3, 10, 7, 6, 5, 2, 3, 10, 7, 6, 5, 2, 3]
            },
            {
                name: '非直接访问',
                type: 'line',
                barWidth: '60%',
                data: [3, 4, 1, 4, 2, 8, 3, 3, 10, 7, 3, 3, 10, 7, 8, 3]
            }
        ],
        stack: false
    },
    valueInterval: 3,
    style: { height: 400, width: window.width },
    interWidth: 10
}