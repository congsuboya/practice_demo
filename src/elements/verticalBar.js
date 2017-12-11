import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Animated,
    ScrollView,
    Text,
    TouchableHighlight,
    FlatList,
    Platform
} from 'react-native';

import Svg, {
    Circle,
    Path,
    Rect,
    Text as SvgText
} from 'react-native-svg';
const window = Dimensions.get('window');
import ColorList from '../globalVariable';

import { DrawXYAxisLine, DrawYXAxisValue, DrawXValueView, dealwithNum } from '../chartUtils';
import { fromJS, is } from 'immutable';
const AnimatedRect = Animated.createAnimatedComponent(Rect);

import NativeBar from './nativeBar';

export default class VerticalBar extends React.Component {

    constructor(props) {
        super(props)
        this.viewAnimatedList = [];
        this.renderBarItem = this.renderBarItem.bind(this);
        this.clickItemView = this.clickItemView.bind(this);
        this.renderSingView = this.renderSingView.bind(this);
        this.scrollOffY = 0;
        this.renderItem = this.renderItem.bind(this);
        this.lineView = null;
        this.yValueTitle = null;
    }

    componentWillMount() {
        let { yAxis, xAxis } = this.props;
        if (yAxis.show) {
            this.createYValueTitle(this.props);
        }
        if (xAxis.show) {
            this.createXValue(this.props)
        }
        this.createLineView(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (!is(fromJS(nextProps), fromJS(this.props))) {
            let { yAxis, xAxis } = nextProps;
            if (yAxis.show) {
                this.createYValueTitle(nextProps);
            }
            if (xAxis.show) {
                this.createXValue(nextProps)
            }
            this.createLineView(nextProps);
        }
    }


    createYValueTitle(props) {
        let { viewHeight, yAxis } = props
        this.yValueTitle = <Text style={{
            fontSize: 9,
            width: 10,
            height: 100,
            textAlign: 'center',
            position: 'absolute',
            textAlignVertical: 'center',
            bottom: 5,
            top: (viewHeight - 130) / 2,
            left: 5,
            textAlignVertical: 'center'
        }}>{yAxis.name}</Text>
    }

    createXValue(props) {
        let { perLength, perInterLength, maxNum, valueInterval, viewHeight, xAxis, viewWidth, yAxis } = props;
        let valueList = [];
        let valueNum;
        for (let i = 0; i <= valueInterval; i++) {
            valueNum = maxNum * i / valueInterval;
            valueList.push(<Text key={i + 'yvalue'} numberOfLines={1} style={{ height: 10, width: 30, marginLeft: i == 0 ? 0 : perInterLength - 30, fontSize: 9, lineHeight: 10, textAlign: 'center' }} >{dealwithNum(valueNum.toString())}</Text>)
        }
        this.xValueView = (
            <View style={{ width: viewWidth, height: 30 }}>
                <View style={{ height: 30, alignItems: 'flex-start', flexDirection: 'row', marginLeft: yAxis.show ? 35 : -5, paddingTop: 3 }}>
                    {valueList}
                </View>
                <Text
                    style={{
                        fontSize: 9,
                        width: 100,
                        height: 10,
                        bottom: 5,
                        textAlign: 'center',
                        position: 'absolute',
                        left: (viewWidth - 155) / 2 + 40,
                        textAlignVertical: 'center'
                    }}>{xAxis.name}</Text>
            </View>
        )
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
        } = this.props;

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
                    lastWidth = 0;
                }
            })
        }
        return barViewList;
    }

    clickItemView(i, clickAreHeight, location) {
        let { series } = this.props;
        let newLocation = Object.assign(location, { locationY: (location.locationY + clickAreHeight / 2) }, { locationX: location.locationX })
        this.props.showToastView(i, series, newLocation);
    }

    createLineView(props) {
        let { perLength, perInterLength, valueInterval, yAxis } = props;
        let lineList = [];
        for (let i = 0; i <= valueInterval; i++) {
            lineList.push(<View key={i + 'line'} style={{ height: perLength, width: 1, backgroundColor: '#EEEEEE', marginLeft: i == 0 ? 0 : perInterLength - 1 }} />)
        }
        this.lineView = (
            <View style={{ position: 'absolute', top: 0, right: 10, left: yAxis.show ? 50 : 10, flexDirection: 'row' }}>
                {lineList}
            </View>
        )
    }


    renderItem({ item, index }) {
        let { viewHeight, series, perRectHeight, xAxis, perLength, barCanvasHeight, stack, rectNum, yAxis, viewWidth, rectWidth, perInterLength } = this.props;
        return (
            <View style={{ height: perLength, width: viewWidth, backgroundColor: 'white', flexDirection: 'row' }}>
                {yAxis.show ? <Text numberOfLines={1} style={[{ textAlign: 'right', fontSize: 9, width: 50, height: perLength, textAlignVertical: 'center', paddingRight: 5 }, Platform.OS == 'ios' ? { paddingTop: (perLength - 10) / 2 } : {}]}>{yAxis.data[index]}</Text>
                    : <View style={{ width: 10 }} />}
                {this.lineView}
                <TouchableHighlight
                    underlayColor='rgba(34,142,230,0.10)'
                    onPressIn={(e) => this.clickItemView(index, perLength, e.nativeEvent)}>
                    <View style={[{ width: barCanvasHeight, height: perLength, alignItems: 'flex-start', paddingBottom: 10, paddingTop: 10 }, stack ? { flexDirection: 'row' } : {}]}>
                        {series.map((mapItem, innerIndex) => < View key={innerIndex + 'listItem'} pointerEvents='none' style={{ backgroundColor: ColorList[innerIndex], width: mapItem.data[index] * perRectHeight, height: rectWidth }} />)}
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    renderSingView() {
        let { maxNum, series, xAxis, yAxis, valueInterval, intervalNum,
            viewWidth, viewHeight, svgHeight, svgWidth, perLength,
            barCanvasHeight, perRectHeight, rectWidth, rectNum, interWidth,
            offsetLength,
            } = this.props;
        return (
            <View style={{ width: viewWidth, height: svgHeight, flexDirection: 'row', backgroundColor: 'white' }}>
                <View style={{ width: 48, height: svgHeight }}>
                    {DrawYXAxisValue(yAxis, false, svgHeight, rectWidth * rectNum + 2 * interWidth, offsetLength, intervalNum)}
                </View>
                <View style={{ flex: 0 }}>
                    <Svg width={svgWidth} height={svgHeight}>
                        {DrawXYAxisLine(barCanvasHeight, svgHeight, false, this.props.valueInterval)}
                        {this.renderBarItem()}
                    </Svg>
                </View>
                <View style={{ width: svgWidth, height: svgHeight, position: 'absolute', top: offsetLength, right: 0 }}>
                    {this.renderClickItemView()}
                </View>
            </View>
        )
    }

    renderClickItemView() {
        let { intervalNum, rectWidth, rectNum, interWidth, svgWidth, series } = this.props;
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

    render() {
        let { maxNum, series, xAxis, yAxis, valueInterval, intervalNum,
            viewWidth, viewHeight, svgHeight, svgWidth, perLength,
            barCanvasHeight, perRectHeight, rectWidth, rectNum, interWidth,
            offsetLength,
            } = this.props;
        let offsetHeight = xAxis.show ? 40 : 20;
        return (
            < View style={[{ flexDirection: 'column', backgroundColor: 'white' }, this.props.style]} >
                {offsetLength > 0 ? this.renderSingView() : <View style={{ marginTop: 10, height: viewHeight - offsetHeight }}>
                    <NativeBar
                        style={{ marginTop: 10, marginLeft: 14, height: viewHeight - offsetHeight - 8 }}
                        option={{
                            ...this.props
                        }}
                        onClickItem={(e) => this.clickItemView(e.nativeEvent.position, perLength, e.nativeEvent)}
                    />
                </View>}
                {this.yValueTitle}
                {this.xValueView}
            </View >

        )
    }
}

