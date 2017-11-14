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
    Text as SvgText
} from 'react-native-svg';
const window = Dimensions.get('window');
import ColorList from '../globalVariable';

import { DrawXYAxisLine, DrawYXAxisValue, DrawXValueView } from '../utils/applicationUtils';
const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default class VerticalBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ...props
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
            horizontal,
            interWidth
        } = this.state;

        let barViewList = [];
        let rectHight;
        let yNum;
        let numlength;

        let lastWidth = 0;;
        let lastHeight = 0;
        let nowWidth = 0;
        let nowHeight = 0;

        for (let i = 0; i < intervalNum; i++) {
            series.map((mapItem, index) => {
                rectHight = mapItem.data[i] * perRectHeight;
                if (rectHight < 20) {
                    rectHight = 20;
                }
                yNum = (i * 2 + 1) * interWidth + i * rectWidth * rectNum + index * rectWidth;
                barViewList.push(
                    <AnimatedRect
                        x={2}
                        y={yNum}
                        width={rectHight}
                        height={rectWidth}
                        fill={ColorList[index]}
                    />
                );
                numlength = mapItem.data[i].toString().length;
                if (numlength * 10 > rectHight) {
                    barViewList.push(< SvgText x={rectHight + 3} y={yNum + (rectWidth - 10) / 2} fontSize="10" textAnchor="start">{mapItem.data[i]}</SvgText >)
                } else {
                    barViewList.push(< SvgText fill="white" x={rectHight - 3} y={yNum + (rectWidth - 10) / 2} fontSize="10" textAnchor="end">{mapItem.data[i]}</SvgText >)
                }
            })
        }
        return barViewList;
    }

    componentDidMount() {

    }

    render() {
        let { maxNum, series, xAxis, yAxis, valueInterval,
            viewWidth, viewHeight, svgHeight, svgWidth,
            barCanvasHeight, perRectHeight, rectWidth, rectNum, interWidth
            } = this.state;
        return (
            < View style={[{ flexDirection: 'row', backgroundColor: 'white' }, this.props.style]} >
                <Text style={{
                    fontSize: 9,
                    width: 10,
                    height: 100,
                    textAlign: 'center',
                    marginTop: (viewHeight - 135) / 2,
                    marginLeft: 5,
                    marginRight: 5
                }}>y轴名称</Text>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <ScrollView
                        horizontal={false}
                        style={{ height: viewHeight - 35, width: viewWidth - 20 }}>
                        <View style={{ width: viewWidth - 20, height: svgHeight, flexDirection: 'row', backgroundColor: 'white' }}>
                            <View style={{ width: 30, height: svgHeight }}>
                                {DrawYXAxisValue(yAxis, false, svgHeight, rectWidth * rectNum + 2 * interWidth)}
                            </View>
                            <View style={{ flex: 0 }}>
                                <Svg width={svgWidth} height={svgHeight}>
                                    {DrawXYAxisLine(barCanvasHeight, svgHeight, false, this.props.valueInterval)}
                                    {this.renderBarItem()}
                                </Svg>
                            </View>
                        </View>
                    </ScrollView>
                    {DrawXValueView(valueInterval, barCanvasHeight, viewWidth, maxNum)}
                </View >
            </View >
        )
    }
}

