import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Animated,
    ScrollView,
    Text,
    TouchableHighlight,
    FlatList
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
            topHeight: 10
        }
        this.viewAnimatedList = [];
        this.renderBarItem = this.renderBarItem.bind(this);
        this.clickItemView = this.clickItemView.bind(this);
        this.scrollOffX = 0;
        this.renderItem = this.renderItem.bind(this);
        this.createLineView = this.createLineView.bind(this);
        this.createYValue = this.createYValue.bind(this);
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

    componentWillMount() {
        this.createLineView();
        this.createYValue();
    }

    createLineView() {
        let { itemWidth, perInterHeight, valueInterval } = this.state;
        let lineList = [];
        for (let i = 0; i <= valueInterval; i++) {
            lineList.push(<View key={i + 'line'} style={{ height: 1, width: itemWidth, backgroundColor: '#EEEEEE', marginTop: i == 0 ? 0 : perInterHeight - 1 }} />)
        }
        this.lineView = (
            <View style={{ position: 'absolute', top: 10, right: 0, left: 0 }}>
                {lineList}
            </View>
        )
    }

    createYValue() {
        let { itemWidth, perInterHeight, maxNum, valueInterval, viewHeight } = this.state;
        let valueList = [];
        let valueNum;
        for (let i = 0; i <= valueInterval; i++) {
            valueNum = maxNum * (1 - i / valueInterval);
            valueList.push(<Text key={i + 'yvalue'} numberOfLines={1} style={{ height: 10, width: 30, marginTop: i == 0 ? 5 : perInterHeight - 10, fontSize: 9, lineHeight: 10, textAlign: 'right' }} >{valueNum}</Text>)
        }
        this.yValueView = (
            <View style={{ width: 50, height: viewHeight, alignItems: 'flex-end' }}>
                {valueList}
            </View>)
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

    renderItem({ item, index }) {
        let { viewHeight, series, perRectHeight, xAxis, itemWidth, barCanvasHeight } = this.state;

        return (
            <TouchableHighlight
                underlayColor='rgba(34,142,230,0.10)'
                onPressIn={(e) => this.clickItemView(index, itemWidth, e.nativeEvent)}>
                <View style={{ height: viewHeight, width: itemWidth, backgroundColor: 'white' }}>
                    {this.lineView}
                    <View style={{ width: itemWidth, height: barCanvasHeight, alignItems: 'flex-end', justifyContent: 'center', paddingLeft: 10, paddingRight: 10, flexDirection: 'row', marginTop: 10 }}>
                        {series.map((mapItem, innerIndex) => < View key={innerIndex + 'listItem'} style={{ backgroundColor: ColorList[innerIndex], width: 12, height: mapItem.data[index] * perRectHeight }} />)}
                    </View>
                    {xAxis.show ? <View style={{ width: itemWidth, height: 30, justifyContent: 'center', alignItems: 'center' }} >
                        <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 9, transform: [{ rotateZ: '-45deg' }] }}>{xAxis.data[index]}</Text>
                    </View> : null}
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        let {
            series, viewHeight, barCanvasHeight
            } = this.state;
        return (
            <View style={[{ flexDirection: 'row', backgroundColor: 'white' }, this.props.style]}>
                {this.yValueView}
                <FlatList
                    data={series[0].data}
                    horizontal={true}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => <View />}
                />
            </View >
        )
    }
}



