import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Animated,
    Dimensions,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback
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

import { DrawXYAxisLine, DrawYValueView, getBubbleMaxMinNum, getMaxValue, DrawXValueView } from '../utils/applicationUtils';

import ToastView from './toastView';

const window = Dimensions.get('window');

import ColorList from '../globalVariable';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default class Bubble extends React.Component {


    constructor(props) {
        super(props)
        let { height, width } = props.style;
        let viewHeight = height ? height : 300;
        let viewWidth = width ? width : window.width;
        this.state = {
            viewHeight,
            viewWidth,
            svgWidth: viewWidth - 50,
            svgHeight: viewHeight - 35,
            interWidth: props.interWidth,
            valueInterval: props.valueInterval,
            ...props.option,
            ...getBubbleMaxMinNum(props.option)
        }
        this.renderPointView = this.renderPointView.bind(this);
    }

    renderPointView() {
        let { valueInterval, xMax, yMax, yMin, sizeMax, sizeMin, viewWidth, svgHeight, svgWidth, viewHeight, series, xAxis, yAxis, symbolSize } = this.state;
        let pointViewList = [];
        let cy = 0;
        yMax = yMax - yMin;
        let cr = 0;
        series.map((item, index) => {
            item.data.map((innerItem, innerIndex) => {
                cr = symbolSize(innerItem) / sizeMax * 25;
                if (cr < 10) {
                    cr = 10;
                }
                cy = (yMax - yAxis(innerItem) + yMin) / yMax * (svgHeight - 15) + 10;
                svgHeight - (yAxis(innerItem) / yMax * (svgHeight - 5))
                pointViewList.push(
                    <Circle
                        cx={xAxis(innerItem) / xMax * (svgWidth - 5)}
                        cy={cy}
                        r={cr}
                        fill={ColorList[index]}
                    />
                )
            })
        });
        return pointViewList;

    }

    clickChart(location) {

    }

    render() {
        let { valueInterval, xMax, yMax, viewWidth, svgHeight, svgWidth, viewHeight } = this.state;
        return (
            <View style={[{ backgroundColor: 'white' }, this.props.style]}>
                <View style={{ width: viewWidth, height: svgHeight, flexDirection: 'row' }}>
                    {DrawYValueView(valueInterval, svgHeight - 10, svgHeight, yMax, true)}
                    <View style={{ flex: 1, backgroundColor: 'white', height: svgHeight, width: svgWidth, marginLeft: 2 }}>
                        < Svg width={svgWidth} height={svgHeight}>
                            {DrawXYAxisLine(svgHeight - 15, svgWidth, true, valueInterval)}
                            {this.renderPointView()}
                        </Svg>
                    </View>
                </View>
                <View style={{ marginLeft: 20 }}>
                    {DrawXValueView(5, svgWidth - 20, viewWidth, xMax, true)}
                </View>
            </View >
        )
    }
}

Bubble.defaultProps = {
    option: {
        xAxis: (item) => item[0],
        yAxis: (item) => item[1],
        symbolSize: (item) => item[2],
        series: [{
            name: '1990',
            data: [
                [
                    28604,
                    77,
                    17096869,
                    "Australia",
                    1990
                ],
                [
                    31163,
                    77.4,
                    27662440,
                    "Canada",
                    1990
                ],
                [
                    1516,
                    68,
                    1154605773,
                    "China",
                    1990
                ],
                [
                    13670,
                    74.7,
                    10582082,
                    "Cuba",
                    1990
                ],
                [
                    28599,
                    75,
                    4986705,
                    "Finland",
                    1990
                ],
                [
                    29476,
                    77.1,
                    56943299,
                    "France",
                    1990
                ],
                [
                    31476,
                    75.4,
                    78958237,
                    "Germany",
                    1990
                ],
                [
                    28666,
                    78.1,
                    254830,
                    "Iceland",
                    1990
                ],
                [
                    1777,
                    57.7,
                    870601776,
                    "India",
                    1990
                ],
                [
                    29550,
                    79.1,
                    122249285,
                    "Japan",
                    1990
                ],
                [
                    2076,
                    67.9,
                    20194354,
                    "North Korea",
                    1990
                ],
                [
                    12087,
                    72,
                    42972254,
                    "South Korea",
                    1990
                ],
                [
                    24021,
                    75.4,
                    3397534,
                    "New Zealand",
                    1990
                ],
                [
                    43296,
                    76.8,
                    4240375,
                    "Norway",
                    1990
                ],
                [
                    10088,
                    70.8,
                    38195258,
                    "Poland",
                    1990
                ],
                [
                    19349,
                    69.6,
                    147568552,
                    "Russia",
                    1990
                ],
                [
                    10670,
                    67.3,
                    53994605,
                    "Turkey",
                    1990
                ],
                [
                    26424,
                    75.7,
                    57110117,
                    "United Kingdom",
                    1990
                ],
                [
                    37062,
                    75.4,
                    252847810,
                    "United States",
                    1990
                ]
            ],
            type: 'scatter',
            label: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: [{
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                    }, {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                    }]
                }
            }
        }, {
            name: '2015',
            data: [
                [
                    44056,
                    81.8,
                    23968973,
                    "Australia",
                    2015
                ],
                [
                    43294,
                    81.7,
                    35939927,
                    "Canada",
                    2015
                ],
                [
                    13334,
                    76.9,
                    1376048943,
                    "China",
                    2015
                ],
                [
                    21291,
                    78.5,
                    11389562,
                    "Cuba",
                    2015
                ],
                [
                    38923,
                    80.8,
                    5503457,
                    "Finland",
                    2015
                ],
                [
                    37599,
                    81.9,
                    64395345,
                    "France",
                    2015
                ],
                [
                    44053,
                    81.1,
                    80688545,
                    "Germany",
                    2015
                ],
                [
                    42182,
                    82.8,
                    329425,
                    "Iceland",
                    2015
                ],
                [
                    5903,
                    66.8,
                    1311050527,
                    "India",
                    2015
                ],
                [
                    36162,
                    83.5,
                    126573481,
                    "Japan",
                    2015
                ],
                [
                    1390,
                    71.4,
                    25155317,
                    "North Korea",
                    2015
                ],
                [
                    34644,
                    80.7,
                    50293439,
                    "South Korea",
                    2015
                ],
                [
                    34186,
                    80.6,
                    4528526,
                    "New Zealand",
                    2015
                ],
                [
                    64304,
                    81.6,
                    5210967,
                    "Norway",
                    2015
                ],
                [
                    24787,
                    77.3,
                    38611794,
                    "Poland",
                    2015
                ],
                [
                    23038,
                    73.13,
                    143456918,
                    "Russia",
                    2015
                ],
                [
                    19360,
                    76.5,
                    78665830,
                    "Turkey",
                    2015
                ],
                [
                    38225,
                    81.4,
                    64715810,
                    "United Kingdom",
                    2015
                ],
                [
                    53354,
                    79.1,
                    321773631,
                    "United States",
                    2015
                ]
            ],
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    color: [{
                        offset: 0,
                        color: 'rgb(129, 227, 238)'
                    }, {
                        offset: 1,
                        color: 'rgb(25, 183, 207)'
                    }]
                }
            }
        }]
    },
    valueInterval: 3,
    style: { height: 400, width: window.width },
    interWidth: 10
}