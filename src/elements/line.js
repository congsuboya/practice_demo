import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Animated,
    Dimensions,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    FlatList,
    ART
} from 'react-native';


import Svg, {
    Line,
    Circle,
    LinearGradient,
    Stop,
    Path as SvgPath
} from 'react-native-svg';

const { Surface, Shape, Path, Group } = ART;
import ToastView from './toastView';
const window = Dimensions.get('window');
import ColorList from '../globalVariable';

import { is, fromJS } from 'immutable';

const itemViewStyle = { justifyContent: 'center', flexDirection: 'row' };
const itemViewStackStyle = { justifyContent: 'flex-end', flexDirection: 'column' };
import { DrawXYAxisLine, DrawYXAxisValue, DrawYValueView, dealWithOption, dealwithNum } from '../chartUtils';


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
            selectIndex: -1,
            ...dealWithOption(viewWidth, viewHeight, props.option, props.valueInterval, props.interWidth, true)
        }

        this.renderItem = this.renderItem.bind(this);
        this.createLineView = this.createLineView.bind(this);
        this.createYValue = this.createYValue.bind(this);
        this.createXValueTitle = this.createXValueTitle.bind(this);
        this.clickChart = this.clickChart.bind(this);
        this.createOffsetLineView = this.createOffsetLineView.bind(this);
        this.renderSelectedLineView = this.renderSelectedLineView.bind(this);
        this.yValueView = null;
        this.xValueTitle = null;
        this.offsetLineView = null;
        this.scrollOffX = 0;
    }


    componentWillMount() {
        let { yAxis, xAxis, offsetLength } = this.state;
        if (yAxis.show) {
            this.createYValue(this.state);
        }
        if (xAxis.show) {
            this.createXValueTitle(this.state)
        }
        this.createLineView(this.state);

        if (offsetLength > 0) {
            this.createOffsetLineView(this.state);
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (is(fromJS(nextProps), fromJS(this.props)) && nextState.selectIndex == this.state.selectIndex) {
            return false
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.focused !== this.props.focused && !nextProps.focused) {
            this.refs.toast.hide();
            this.setState({
                selectIndex: -1
            });
        } else if (!is(fromJS(nextProps), fromJS(this.props))) {
            let { height, width } = nextProps.style;
            let viewHeight = height ? height : 300;
            let viewWidth = width ? width : window.width;
            let tempState = {
                viewHeight,
                viewWidth,
                interWidth: nextProps.interWidth,
                valueInterval: nextProps.valueInterval,
                stack: nextProps.option.stack,
                selectIndex: -1,
                ...dealWithOption(viewWidth, viewHeight, nextProps.option, nextProps.valueInterval, nextProps.interWidth, true)
            }
            this.setState({
                ...tempState
            });
            this.scrollOffX = 0;

            let { yAxis, xAxis } = tempState;
            if (yAxis.show) {
                this.createYValue(tempState);
            }
            if (xAxis.show) {
                this.createXValueTitle(tempState)
            }
            this.createLineView(tempState);

            if (tempState.offsetLength > 0) {
                this.createOffsetLineView(tempState);
            }
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

    createOffsetLineView(props) {
        let { perLength, perInterLength, valueInterval, offsetLength } = props;
        let lineList = [];
        for (let i = 0; i <= valueInterval; i++) {
            lineList.push(<View key={i + 'line'} style={{ height: 1, width: offsetLength, backgroundColor: '#EEEEEE', marginTop: i == 0 ? 0 : perInterLength - 1 }} />)
        }
        this.offsetLineView = (
            <View style={{ flex: 0, marginTop: 10 }}>
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
                        left: 0,
                        textAlign: 'center',
                        top: (viewHeight - 140) / 2,
                        textAlignVertical: 'center'
                    }}>{yAxis.name}</Text>
                <View style={{ height: viewHeight, alignItems: 'flex-end', marginLeft: 2, maxWidth: 40, marginRight: 5 }}>
                    {valueList}
                </View>
            </View>)
    }

    createXValueTitle(props) {
        let { viewWidth, xAxis } = props
        this.xValueTitle = <Text style={{
            fontSize: 9,
            width: 100,
            textAlign: 'center',
            position: 'absolute',
            bottom: 5,
            left: (viewWidth - 50) / 2,
            textAlignVertical: 'center'
        }}>{xAxis.name}</Text>
    }


    renderPerLineView(index, series, perLength, perRectHeight, barCanvasHeight, intervalNum) {
        let perLineList = [];
        let middleNum;
        let lastNum;
        let firstNum;
        let initX;
        let path;
        initX = perLength / 2;

        series.map((mapItem, innerIndex) => {
            middleNum = mapItem.data[index];
            lastNum = mapItem.data[index + 1];
            firstNum = mapItem.data[index - 1];
            if (!firstNum && !lastNum) {
                path = new Path().moveTo(initX, barCanvasHeight - middleNum * perRectHeight).arc(0, 3, 1.5).arc(0, -3, 1.5).close();
            } else if (!firstNum && lastNum) {
                path = new Path().moveTo(initX, (barCanvasHeight - middleNum * perRectHeight)).lineTo(perLength, (barCanvasHeight - (middleNum + lastNum) / 2 * perRectHeight));
            } else if (firstNum && !lastNum) {
                path = new Path().moveTo(0, (barCanvasHeight - (middleNum + firstNum) / 2 * perRectHeight)).lineTo(initX, (barCanvasHeight - middleNum * perRectHeight));
            } else {
                path = new Path().moveTo(0, (barCanvasHeight - (middleNum + firstNum) / 2 * perRectHeight)).lineTo(initX, (barCanvasHeight - middleNum * perRectHeight)).lineTo(perLength, (barCanvasHeight - (middleNum + lastNum) / 2 * perRectHeight))
            }
            perLineList.push(<Shape key={perLineList.length + 'line'} d={path} stroke={ColorList[innerIndex]} strokeWidth={1} />);
        })

        return (
            <View>
                <Surface width={perLength} height={barCanvasHeight}>
                    {perLineList}
                </Surface>
            </View>)
    }

    clickChart(clickItemIndex, clickAreWidth, location) {
        let { series, selectIndex, yAxis, viewHeight, offsetLength } = this.state;
        if (selectIndex != clickItemIndex) {
            let offsetWidth = yAxis.show ? 40 : 10
            let newLocation = Object.assign(location, { locationX: (clickItemIndex * clickAreWidth - this.scrollOffX + location.locationX + offsetWidth + offsetLength) })
            this.refs.toast.show(clickItemIndex, series, newLocation, viewHeight);
            this.setState({
                selectIndex: clickItemIndex
            })
        }
    }

    renderSelectedLineView(show) {
        if (show) {
            let { perLength, barCanvasHeight, series, selectIndex, perRectHeight } = this.state;
            let circleList = [];
            let pointY;
            series.map((mapItem, index) => {
                pointY = barCanvasHeight - mapItem.data[selectIndex] * perRectHeight
                circleList.push(<Circle key={index + 'circle'} cx={perLength / 2} cy={pointY} r="2.5" fill={ColorList[index]} />)
            });
            return (<View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                <Svg width={perLength} height={barCanvasHeight}>
                    <LinearGradient id="grad" x1="0" y1="0" x2="0" y2={barCanvasHeight}>
                        <Stop offset="0" stopColor="#228EE6" stopOpacity="1" />
                        <Stop offset="1" stopColor="#3AE8CB" stopOpacity="0.11" />
                    </LinearGradient>
                    <Line key='selectedLine'
                        x1={perLength / 2}
                        y1={0}
                        x2={perLength / 2}
                        y2={barCanvasHeight}
                        stroke="url(#grad)"
                        strokeWidth='1' />
                    {circleList}
                </Svg>
            </View>)
        } else {
            return null;
        }

    }

    renderItem({ item, index }) {
        let { viewHeight, series, perRectHeight, xAxis, perLength, barCanvasHeight, stack, rectNum, rectWidth, intervalNum, selectIndex } = this.state;
        return (
            <View style={{ height: viewHeight, width: perLength, backgroundColor: 'white' }}>
                {this.lineView}
                <TouchableHighlight
                    underlayColor='rgba(34,142,230,0.10)'
                    onPressIn={(e) => this.clickChart(index, perLength, e.nativeEvent)}>
                    <View style={[{ width: perLength, height: barCanvasHeight, alignItems: 'flex-end', paddingLeft: 10, paddingRight: 10, marginTop: 10 }, stack ? itemViewStackStyle : itemViewStyle]}>
                        {this.renderPerLineView(index, series, perLength, perRectHeight, barCanvasHeight, intervalNum)}
                        {this.renderSelectedLineView(selectIndex == index)}
                    </View>
                </TouchableHighlight>
                {xAxis.show ? <View style={{ width: perLength, height: 30, justifyContent: 'center', alignItems: 'center' }} >
                    <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 8, width: 30, transform: [{ rotateZ: '-45deg' }] }}>{xAxis.data[index]}</Text>
                </View> : null}
            </View>
        )
    }

    render() {
        let { series, viewHeight, barCanvasHeight, viewWidth, xAxis, yAxis, svgWidth, offsetLength } = this.state;
        let offsetWidth = yAxis.show ? 50 : 20;
        return (
            <View style={[{ flexDirection: 'row', backgroundColor: 'white', paddingLeft: 10 }, this.props.style]}>
                {this.yValueView}
                <View style={{ flex: 0, flexDirection: 'row' }}>
                    {this.offsetLineView}
                    <FlatList
                        data={xAxis.data}
                        alwaysBounceHorizontal={false}
                        horizontal={true}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        onScroll={(e) => {
                            this.scrollOffX = e.nativeEvent.contentOffset.x;
                            this.refs.toast.hide();
                        }}
                    />
                    {this.offsetLineView}
                </View>
                {this.xValueTitle}
                <ToastView ref='toast' />
            </View >
        )
    }
}

LineChart.defaultProps = {
    option: {
        xAxis: {
            type: 'category',
            // type: 'value',
            show: true,
            data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Sat', 'Sun', 'wqe', 'sdr', 'opu'],
        },
        yAxis: {
            // type: 'category',
            type: 'value',
            show: true,
            data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Sat', 'Sun', 'wqe', 'sdr', 'opu'],
        },
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [10, 5, 2, 3, 10, 7, 6, 5, 2, 3,]
            },
            {
                name: '非直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [3, 4, 1, 4, 2, 8, 3, 3, 10, 7]
            }
        ],
        stack: false
    },
    valueInterval: 3,
    style: { height: 400, width: window.width },
    interWidth: 10
}