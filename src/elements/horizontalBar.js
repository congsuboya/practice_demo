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

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const window = Dimensions.get('window');
import ColorList from '../globalVariable';
import { DrawXYAxisLine, DrawYXAxisValue, DrawYValueView, dealwithNum } from '../chartUtils';
import { is, fromJS } from 'immutable';

const itemViewStyle = { justifyContent: 'center', flexDirection: 'row' };
const itemViewStackStyle = { justifyContent: 'flex-end', flexDirection: 'column' };


export default class HorizontalBar extends React.Component {

    constructor(props) {
        super(props)
        this.viewAnimatedList = [];
        this.renderBarItem = this.renderBarItem.bind(this);
        this.clickItemView = this.clickItemView.bind(this);
        this.scrollOffX = 0;
        this.renderItem = this.renderItem.bind(this);
        this.createLineView = this.createLineView.bind(this);
        this.createYValue = this.createYValue.bind(this);
        this.createXValueTitle = this.createXValueTitle.bind(this);
        this.renderSingView = this.renderSingView.bind(this);
        this.renderClickItemView = this.renderClickItemView.bind(this);
        this.yValueView = null;
        this.xValueTitle = null;
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
            offsetLength
        } = this.props;

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
            let lastHeight = 0;
            series.some((mapItem, index) => {
                rectHight = mapItem.data[i] * perRectHeight;
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
                    lastHeight = 0;
                }

            })
        }
        return barViewList;
    }

    componentWillMount() {
        let { yAxis, xAxis } = this.props;
        if (yAxis.show) {
            this.createYValue(this.props);
        }
        if (xAxis.show) {
            this.createXValueTitle(this.props);
        }
        this.createLineView(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (!is(fromJS(nextProps), fromJS(this.props))) {
            let { yAxis, xAxis } = this.props;
            if (yAxis.show) {
                this.createYValue(nextProps);
            }
            if (xAxis.show) {
                this.createXValueTitle(nextProps)
            }
            this.createLineView(nextProps);
        }
    }

    createLineView(props) {
        let { perLength, perInterLength, valueInterval } = props;
        let lineList = [];
        for (let i = 0; i <= valueInterval; i++) {
            lineList.push(<View key={i + 'line'} style={{ height: 1, width: perLength, backgroundColor: '#EEEEEE', marginTop: i == 0 ? 0 : perInterLength - 1 }} />)
        }
        this.lineView = (
            <View style={{ position: 'absolute', top: 10, right: 0, left: 0 }}>
                {lineList}
            </View>
        )
    }

    createYValue(props) {
        let { perLength, perInterLength, maxNum, valueInterval, viewHeight, yAxis } = props;
        let valueList = [];
        let valueNum;
        for (let i = 0; i <= valueInterval; i++) {
            valueNum = maxNum - maxNum * i / valueInterval;
            valueList.push(<Text key={i + 'yvalue'} numberOfLines={1} style={{ height: 10, width: 30, marginTop: i == 0 ? 5 : perInterLength - 10, fontSize: 9, lineHeight: 10, textAlign: 'right' }} >{dealwithNum(valueNum.toString())}</Text>)
        }
        this.yValueView = (
            <View style={{ maxWidth: 40, height: viewHeight, flexDirection: 'row' }}>
                <Text
                    style={{
                        fontSize: 9,
                        width: 10,
                        height: 100,
                        left: 3,
                        textAlign: 'center',
                        position: 'absolute',
                        top: (viewHeight - 140) / 2,
                        textAlignVertical: 'center'
                    }}>{yAxis.name}</Text>
                <View style={{ height: viewHeight, alignItems: 'flex-end', marginLeft: 2, maxWidth: 40, marginRight: 5 }}>
                    {valueList}
                </View>
            </View>)
    }

    createXValueTitle(props) {
        let { viewWidth, xAxis, offsetLength } = props;
        if (xAxis.name) {
            this.xValueTitle = <Text style={{
                fontSize: 9,
                width: 100,
                height: 10,
                textAlign: 'center',
                position: 'absolute',
                bottom: 5,
                left: (viewWidth - 50 - offsetLength) / 2,
                textAlignVertical: 'center'
            }}>{xAxis.name}</Text>;
        }
    }

    clickItemView(i, clickAreWidth, location) {
        let { series, yAxis } = this.props;
        let offsetWidth = yAxis.show ? 40 : 10
        let newLocation = Object.assign(location, { locationX: (i * clickAreWidth - this.scrollOffX + location.locationX + offsetWidth) })
        this.props.showToastView(i, series, newLocation);
    }

    renderPerBarView(index, series, perRectHeight, stack, rectWidth) {
        let perBarList = [];
        let mapItem;
        if (stack) {
            for (let i = series.length - 1; i >= 0; i--) {
                mapItem = series[i];
                perBarList.push(
                    < View key={i + 'listItem'} pointerEvents='none' style={{ backgroundColor: ColorList[i], width: rectWidth, height: mapItem.data[index] * perRectHeight }} />
                )
            }
        } else {
            perBarList = series.map((mapItem, innerIndex) => < View key={innerIndex + 'listItem'} pointerEvents='none' style={{ backgroundColor: ColorList[innerIndex], width: rectWidth, height: mapItem.data[index] * perRectHeight }} />)
        }
        return perBarList;
    }

    renderItem({ item, index }) {
        let { viewHeight, series, perRectHeight, xAxis, perLength, barCanvasHeight, stack, rectNum, rectWidth } = this.props;
        return (
            <View style={{ height: viewHeight, width: perLength, backgroundColor: 'white' }}>
                {this.lineView}
                <TouchableHighlight
                    underlayColor='rgba(34,142,230,0.10)'
                    onPressIn={(e) => this.clickItemView(index, perLength, e.nativeEvent)}>
                    <View style={[{ width: perLength, height: barCanvasHeight, alignItems: 'flex-end', paddingLeft: 10, paddingRight: 10, marginTop: 10 }, stack ? itemViewStackStyle : itemViewStyle]}>
                        {this.renderPerBarView(index, series, perRectHeight, stack, rectWidth)}
                    </View>
                </TouchableHighlight>
                {xAxis.show ? <View style={{ width: perLength, height: 30, justifyContent: 'center', alignItems: 'center' }} >
                    <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 9, transform: [{ rotateZ: '-45deg' }] }}>{xAxis.data[index]}</Text>
                </View> : null}
            </View>
        )
    }

    renderClickItemView() {
        let { intervalNum, rectWidth, rectNum, interWidth, svgWidth, svgHeight, series, offsetLength } = this.props;
        let clickViewList = [];
        let clickAreWidth = (rectWidth * rectNum + interWidth * 2);
        for (let i = 0; i < intervalNum; i++) {
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

    renderSingView() {
        let { valueInterval, svgHeight, svgWidth, viewHeight, viewWidth,
            barCanvasHeight, xAxis, rectWidth, rectNum,
            interWidth, offsetLength, intervalNum } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: 'white', height: viewHeight, width: svgWidth }}>
                <View style={{ flex: 0 }}>
                    < Svg width={svgWidth} height={svgHeight} >
                        {DrawXYAxisLine(barCanvasHeight, svgWidth, true, valueInterval)}
                        {this.renderBarItem()}
                    </Svg>
                </View>
                <View style={{ width: svgWidth, height: svgHeight - 20, position: 'absolute', top: 10, left: 0, flexDirection: 'row', paddingLeft: offsetLength }}>
                    {this.renderClickItemView()}
                </View>
                {DrawYXAxisValue(xAxis, true, svgWidth, rectWidth * rectNum + 2 * interWidth, offsetLength, intervalNum)}
            </View>
        )
    }

    render() {
        let { series, viewHeight, barCanvasHeight, viewWidth, xAxis, yAxis, offsetLength } = this.props;
        let offsetWidth = yAxis.show ? 50 : 20;
        return (
            <View style={[{ flexDirection: 'row', backgroundColor: 'white' }, this.props.style]}>
                {this.yValueView}
                {offsetLength > 0 ? this.renderSingView() : <View style={{ flex: 0, width: viewWidth - offsetWidth, backgroundColor: 'green' }}>
                    <FlatList
                        data={xAxis.data}
                        alwaysBounceHorizontal={false}
                        horizontal={true}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        onScroll={(e) => {
                            this.scrollOffX = e.nativeEvent.contentOffset.x;
                            this.props.closeToastView();
                        }}
                        ItemSeparatorComponent={() => <View />}
                    />
                </View>}
                {this.xValueTitle}
            </View >
        )
    }
}



