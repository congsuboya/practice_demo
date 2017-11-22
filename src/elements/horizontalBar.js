import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Animated,
    ScrollView,
    Text,
    TouchableHighlight
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

import { DrawXYAxisLine, DrawYXAxisValue, DrawYValueView } from '../chartUtils';
const AnimatedRect = Animated.createAnimatedComponent(Rect);


export default class HorizontalBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ...props,
            drawNum: 0
        }
        this.viewAnimatedList = [];
        this.renderBarItem = this.renderBarItem.bind(this);
        this.clickItemView = this.clickItemView.bind(this);
        this.scrollOffX = 0;
        this.scrollNum = 0;
        this.svgItemList = [];
        this.renderSvgItemView = this.renderSvgItemView.bind(this);
    }

    componentWillMount() {
        let { cutPerWidth, barCanvasHeight, svgHeight, valueInterval } = this.state;
        this.svgItemList.push(
            < Svg width={cutPerWidth} height={svgHeight}>
                {DrawXYAxisLine(barCanvasHeight, cutPerWidth, true, valueInterval)}
                {this.renderBarItem(0)}
            </Svg>
        )
    }

    renderSvgItemView(num) {
        let { cutPerWidth, barCanvasHeight, svgHeight, valueInterval, cutNum } = this.state;
        if (this.svgItemList.length < cutNum && cutNum != 0) {
            this.svgItemList.push(
                < Svg key={num} width={cutPerWidth} height={svgHeight}>
                    {DrawXYAxisLine(barCanvasHeight, cutPerWidth, true, valueInterval)}
                    {this.renderBarItem(num)}
                </Svg>
            )
            this.setState({
                drawNum: num
            })
        }
    }


    renderBarItem(hadedDrawNum) {
        let {
            maxNum, series,
            intervalNum,
            rectNum,
            rectWidth,
            perRectHeight,
            barCanvasHeight,
            interWidth,
            stack,
            offsetLength,
            cutNum,
            cutApartNum
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

        for (let i = 0; i < cutApartNum; i++) {
            let lastHeight = 0;
            series.some((mapItem, index) => {
                rectHight = mapItem.data[i + hadedDrawNum * cutApartNum] * perRectHeight;
                if (rectHight < 2) {
                    rectHight = 2;
                }
                xNum = (i * 2 + 1) * interWidth + i * rectWidth * rectNum;
                if (!stack) {
                    xNum = xNum + index * rectWidth;
                }
                barViewList.push(
                    <AnimatedRect
                        x={xNum + offsetLength}
                        y={barCanvasHeight + 10 - lastHeight}
                        width={rectWidth}
                        height={-rectHight}
                        fill={ColorList[index]}
                    />
                );
                if (stack) {
                    lastHeight = rectHight + lastHeight;
                } else {
                    lastHeight = rectHight;
                }

                numlength = mapItem.data[i].toString().length;
                textX = xNum + rectWidth / 2 - 1 + offsetLength;
                textY = barCanvasHeight + 10 - lastHeight + numlength * preTextWidth / 2;
                textColor = 'white';
                if (numlength * 10 > rectHight) {
                    textY = barCanvasHeight + 4 - lastHeight - numlength * preTextWidth / 2;
                    textColor = 'black';
                }

                if (!stack) {
                    lastHeight = 0;
                }
                barViewList.push(
                    <G rotate="-90" origin={`${textX},${textY + 5}`} >
                        < SvgText
                            fill={textColor}
                            x={textX}
                            y={textY}
                            fontSize="10"
                            textAnchor="middle">{mapItem.data[i + hadedDrawNum * cutApartNum]}</SvgText >
                    </G>
                )
            })
        }
        return barViewList;
    }

    clickItemView(i, clickAreWidth, location) {
        let { series } = this.state;
        let newLocation = Object.assign(location, { locationX: (i * clickAreWidth - this.scrollOffX + location.locationX + 40) })
        this.props.showToastView(i, series, newLocation);
    }
    renderClickItemView() {
        let { intervalNum, rectWidth, rectNum, interWidth, svgWidth, svgHeight, series, offsetLength } = this.state;
        let clickViewList = [];
        for (let i = 0; i < intervalNum; i++) {
            let clickAreWidth = (rectWidth * rectNum + interWidth * 2);
            clickViewList.push(
                <TouchableHighlight
                    underlayColor='rgba(34,142,230,0.10)'
                    onPressIn={(e) => this.clickItemView(i, clickAreWidth, e.nativeEvent)}>
                    <View style={{ width: clickAreWidth, height: svgHeight - 10 }} />
                </TouchableHighlight>
            )
        };
        return clickViewList;
    }

    render() {
        let { maxNum, series, xAxis, yAxis, valueInterval,
            viewWidth, viewHeight, svgHeight, svgWidth,
            barCanvasHeight, perRectHeight, rectWidth, rectNum, interWidth, offsetLength,
            intervalNum, cutPerWidth
            } = this.state;
        return (
            <View style={[{ flexDirection: 'row' }, this.props.style]}>
                {DrawYValueView(valueInterval, barCanvasHeight, viewHeight, maxNum, yAxis)}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={false}
                    style={{ height: viewHeight, width: viewWidth - 50 }}
                    onMomentumScrollEnd={(e) => {
                        if (viewWidth - 50 < svgWidth) {
                            this.scrollOffX = e.nativeEvent.contentOffset.x;
                        }
                    }}
                    onScroll={(e) => {
                        if (e.nativeEvent.contentOffset.x > (this.svgItemList.length - 1) * cutPerWidth + 360) {
                            this.renderSvgItemView(this.svgItemList.length)
                        }
                        this.props.closeToastView();
                    }}
                >
                    <View style={{ flex: 1, backgroundColor: 'white', height: viewHeight, width: svgWidth }}>
                        <View style={{ flex: 0, backgroundColor: 'white', flexDirection: 'row' }}>
                            {this.svgItemList}
                        </View>
                        <View style={{ width: svgWidth, height: svgHeight, position: 'absolute', top: 10, right: 0, flexDirection: 'row', paddingLeft: offsetLength }}>
                            {this.renderClickItemView()}
                        </View>

                        {DrawYXAxisValue(xAxis, true, svgWidth, rectWidth * rectNum + 2 * interWidth, offsetLength, intervalNum)}
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
                }}>{xAxis.title}</Text >
            </View >
        )
    }
}


