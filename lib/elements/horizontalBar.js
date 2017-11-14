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
    G,
    TSpan,
    Text as SvgText
} from 'react-native-svg';
const window = Dimensions.get('window');
import ColorList from '../globalVariable';

import { DrawXYAxisLine, dealWithOption, DrawYXAxisValue, DrawYValueView } from '../utils/applicationUtils';
const AnimatedRect = Animated.createAnimatedComponent(Rect);


export default class HorizontalBar extends React.Component {

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
            interWidth
        } = this.state;

        let barViewList = [];
        let rectHight;
        let xNum;
        let numlength;
        let textX;
        let textY;
        let textColor;
        let rotateY;
        let preTextWidth = 3;
        for (let i = 0; i < intervalNum; i++) {
            
            series.map((mapItem, index) => {
                rectHight = mapItem.data[i] * perRectHeight;
                if (rectHight < 2) {
                    rectHight = 2;
                }
                xNum = (i * 2 + 1) * interWidth + i * rectWidth * rectNum + index * rectWidth;
                barViewList.push(
                    <AnimatedRect
                        x={xNum}
                        y={barCanvasHeight + 10}
                        width={rectWidth}
                        height={-rectHight}
                        fill={ColorList[index]}
                    />
                );

                numlength = mapItem.data[i].toString().length;
                textX = xNum + rectWidth / 2 - 1;
                textY = barCanvasHeight + 10 - rectHight + numlength * preTextWidth / 2;
                textColor = 'white';
                if (numlength * 10 > rectHight) {
                    textY = barCanvasHeight + 4 - rectHight - numlength * preTextWidth / 2;
                    textColor = 'black';
                }
                barViewList.push(
                    <G rotate="-90" origin={`${textX},${textY + 5}`} >
                        < SvgText
                            fill={textColor}
                            x={textX}
                            y={textY}
                            fontSize="10"
                            textAnchor="middle">{mapItem.data[i]}</SvgText >
                    </G>
                )
            })
        }
        return barViewList;
    }

    componentDidMount() {

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
                        <View style={{ flex: 0 }}>
                            < Svg width={this.state.svgWidth} height={this.state.svgHeight}>
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


