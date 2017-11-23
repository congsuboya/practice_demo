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
    Text as SvgText
} from 'react-native-svg';
const window = Dimensions.get('window');
import ColorList from '../globalVariable';

import { DrawXYAxisLine, DrawYXAxisValue, DrawXValueView } from '../chartUtils';
const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default class VerticalBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ...props
        }
        this.viewAnimatedList = [];
        this.renderBarItem = this.renderBarItem.bind(this);
        this.renderClickItemView = this.renderClickItemView.bind(this);
        this.clickItemView = this.clickItemView.bind(this);
        this.scrollOffY = 0;
        this.renderItem = this.renderItem.bind(this);
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
            interWidth,
            stack,
            offsetLength
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
            let lastWidth = 0;
            series.map((mapItem, index) => {
                rectHight = mapItem.data[i] * perRectHeight;
                if (rectHight < 20) {
                    rectHight = 20;
                }

                yNum = (i * 2 + 1) * interWidth + i * rectWidth * rectNum;

                if (!stack) {
                    yNum = yNum + index * rectWidth;
                }

                barViewList.push(
                    <AnimatedRect
                        x={2 + lastWidth}
                        y={yNum + offsetLength}
                        width={rectHight}
                        height={rectWidth}
                        fill={ColorList[index]}
                    />
                );

                if (stack) {
                    lastWidth = rectHight + lastWidth;
                } else {
                    lastWidth = rectHight;
                }

                numlength = mapItem.data[i].toString().length;
                if (numlength * 10 > rectHight) {
                    barViewList.push(< SvgText x={lastWidth + 3} y={yNum + (rectWidth - 10) / 2 + offsetLength} fontSize="10" textAnchor="start">{mapItem.data[i]}</SvgText >)
                } else {
                    barViewList.push(< SvgText fill="white" x={lastWidth - 3} y={yNum + (rectWidth - 10) / 2 + offsetLength} fontSize="10" textAnchor="end">{mapItem.data[i]}</SvgText >)
                }

                if (!stack) {
                    lastWidth = 0;
                }

            })
        }
        return barViewList;
    }

    clickItemView(i, clickAreHeight, location) {
        let { series } = this.state;
        let newLocation = Object.assign(location, { locationY: (i * clickAreHeight - this.scrollOffY + location.locationY + 10) }, { locationX: location.locationX + 50 })
        this.props.showToastView(i, series, newLocation);
    }

    renderClickItemView() {
        let { intervalNum, rectWidth, rectNum, interWidth, svgWidth, series } = this.state;
        let clickViewList = [];
        let clickAreHeight
        for (let i = 0; i < intervalNum; i++) {
            clickAreHeight = (rectWidth * rectNum + interWidth * 2);
            clickViewList.push(
                <TouchableHighlight
                    underlayColor='rgba(34,142,230,0.10)'
                    onPressIn={(e) => this.clickItemView(i, clickAreHeight, e.nativeEvent)}>
                    <View style={{ width: svgWidth, height: clickAreHeight }} />
                </TouchableHighlight>
            )
        };
        return clickViewList;
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
    renderItem({ item, index }) {
        let { viewHeight, series, perRectHeight, xAxis, itemWidth, barCanvasHeight, stack, rectNum, yAxis, viewWidth, rectWidth } = this.state;
        return (
            <View style={{ height: itemWidth, width: viewWidth, backgroundColor: 'white', flexDirection: 'row' }}>
                {yAxis.show ? <View style={{ width: 30, height: itemWidth, justifyContent: 'center', alignItems: 'center' }} >
                    <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 9 }}>{yAxis.data[index]}</Text>
                </View> : null}
                <TouchableHighlight
                    underlayColor='rgba(34,142,230,0.10)'
                    onPressIn={(e) => this.clickItemView(index, itemWidth, e.nativeEvent)}>
                    <View style={[{ width: barCanvasHeight, height: itemWidth, alignItems: 'flex-start', paddingTop: 10, paddingBottom: 10 }]}>
                        {series.map((mapItem, innerIndex) => < View key={innerIndex + 'listItem'} style={{ backgroundColor: ColorList[innerIndex], width: mapItem.data[index] * perRectHeight, height: rectWidth }} />)}
                    </View>
                </TouchableHighlight>

            </View>
        )
    }

    render() {
        let { maxNum, series, xAxis, yAxis, valueInterval, intervalNum,
            viewWidth, viewHeight, svgHeight, svgWidth,
            barCanvasHeight, perRectHeight, rectWidth, rectNum, interWidth,
            offsetLength
            } = this.state;
        return (
            < View style={[{ flexDirection: 'row', backgroundColor: 'white' }, this.props.style]} >
                <FlatList
                    data={series[0].data}
                    horizontal={false}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    onScroll={(e) => {
                        this.scrollOffY = e.nativeEvent.contentOffset.x;
                        this.props.closeToastView();
                    }}
                    ItemSeparatorComponent={() => <View />}
                />
            </View >
        )
    }
}

