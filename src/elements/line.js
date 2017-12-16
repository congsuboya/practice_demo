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
        this.yValueViewWith = 20;
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
        let { perLength, perInterLength, valueInterval, negaNumInterval, plusNumInterval } = props;
        let lineList = [];
        for (let i = 0; i <= (plusNumInterval + negaNumInterval); i++) {
            lineList.push(<View key={i + 'line'} style={{ height: 1, width: perLength, backgroundColor: '#EEEEEE', marginTop: i == 0 ? 0 : perInterLength - 1 }} />)
        }
        this.lineView = (
            <View style={{ position: 'absolute', top: 10, right: 0, left: 0 }}>
                {lineList}
            </View>
        )
    }

    createOffsetLineView(props) {
        let { perLength, perInterLength, valueInterval, offsetLength, plusNumInterval, negaNumInterval } = props;
        let lineList = [];
        for (let i = 0; i <= (plusNumInterval + negaNumInterval); i++) {
            lineList.push(<View key={i + 'line'} style={{ height: 1, width: offsetLength, backgroundColor: '#EEEEEE', marginTop: i == 0 ? 0 : perInterLength - 1 }} />)
        }
        this.offsetLineView = (
            <View style={{ flex: 0, marginTop: 10 }}>
                {lineList}
            </View>
        )
    }

    createYValue(props) {
        let { perLength, perInterLength, maxNum, valueInterval, viewHeight, yAxis, negaNumInterval, maxData, plusNumInterval } = props;
        let valueList = [];
        let valueNum;

        if (plusNumInterval > 0) {
            for (let i = plusNumInterval; i >= 0; i--) {
                valueNum = maxNum / valueInterval * i;
                valueList.push(<Text key={i + 'yvalue'} numberOfLines={1} style={{ height: 10, maxWidth: 30, marginTop: i == plusNumInterval ? 5 : perInterLength - 10, fontSize: 9, lineHeight: 10, textAlign: 'right' }} >{dealwithNum(valueNum.toString())}</Text>)
            }
        } else {
            valueList.push(<Text key={'zeroyvalue'} numberOfLines={1} style={{ height: 10, maxWidth: 30, marginTop: 5, fontSize: 9, lineHeight: 10, textAlign: 'right' }} >0</Text>)

        }
        for (let i = 1; i <= negaNumInterval; i++) {
            valueNum = -(maxNum * i / valueInterval);
            valueList.push(<Text key={i + 'negaNumInterval'} numberOfLines={1} style={{ height: 10, maxWidth: 30, marginTop: i == 0 ? 5 : perInterLength - 10, fontSize: 9, lineHeight: 10, textAlign: 'right' }} >{dealwithNum(valueNum.toString())}</Text>)
        }
        this.yValueView = (
            <View
                style={{ maxWidth: 40, height: viewHeight, flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'white', paddingRight: 2 }}>
                <Text
                    style={{
                        fontSize: 9,
                        width: 10,
                        marginBottom: 30,
                        alignSelf: 'center',
                        textAlign: 'center',
                        textAlignVertical: 'center'
                    }}>{yAxis.name}</Text>
                <View style={{ height: viewHeight, alignItems: 'flex-end', marginLeft: 2, maxWidth: 30 }}>
                    {valueList}
                </View>
            </View>);
    }

    createXValueTitle(props) {
        let { viewWidth, xAxis } = props
        this.xValueTitle = <Text style={{
            fontSize: 9,
            width: 100,
            textAlign: 'center',
            position: 'absolute',
            bottom: 1,
            left: (viewWidth - 50) / 2,
            textAlignVertical: 'center'
        }}>{xAxis.name}</Text>
    }


    renderPerLineView(index, series, perLength, perRectHeight, barCanvasHeight, intervalNum, negaNumInterval, maxNum, valueInterval) {
        let perLineList = [];
        let middleNum;
        let lastNum;
        let firstNum;
        let initX;
        let path;
        initX = perLength / 2;

        let offsetNum = negaNumInterval * maxNum / valueInterval;
        series.map((mapItem, innerIndex) => {
            middleNum = mapItem.data[index];
            if (middleNum != undefined) {
                lastNum = mapItem.data[index + 1];
                firstNum = mapItem.data[index - 1];
                middleNum = middleNum + offsetNum;
                if (lastNum != undefined) {
                    lastNum = lastNum + offsetNum;
                }
                if (firstNum != undefined) {
                    firstNum = firstNum + offsetNum;
                }
                if (firstNum == undefined && lastNum == undefined) {
                    path = new Path().moveTo(initX, barCanvasHeight - middleNum * perRectHeight).arc(0, 3, 1.5).arc(0, -3, 1.5).close();
                } else if (firstNum == undefined && lastNum != undefined) {
                    path = new Path().moveTo(initX, (barCanvasHeight - middleNum * perRectHeight)).lineTo(perLength, (barCanvasHeight - (middleNum + lastNum) / 2 * perRectHeight));
                } else if (firstNum != undefined && lastNum == undefined) {
                    path = new Path().moveTo(0, (barCanvasHeight - (middleNum + firstNum) / 2 * perRectHeight)).lineTo(initX, (barCanvasHeight - middleNum * perRectHeight));
                } else {
                    path = new Path().moveTo(0, (barCanvasHeight - (middleNum + firstNum) / 2 * perRectHeight)).lineTo(initX, (barCanvasHeight - middleNum * perRectHeight)).lineTo(perLength, (barCanvasHeight - (middleNum + lastNum) / 2 * perRectHeight))
                }
                perLineList.push(<Shape key={perLineList.length + 'line'} d={path} stroke={ColorList[innerIndex]} strokeWidth={1} />);
            }
        })

        return (
            <View>
                <Surface width={perLength} height={barCanvasHeight}>
                    {perLineList}
                </Surface>
            </View>)
    }

    clickChart(clickItemIndex, clickAreWidth, location) {
        let { series, selectIndex, yAxis, barCanvasHeight, offsetLength, xAxis } = this.state;
        let showclick = false
        series.some((seriItem) => {
            if (seriItem.data[clickItemIndex] != undefined) {
                showclick = true;
                return true;
            }
        })
        if (selectIndex != clickItemIndex && showclick) {
            let offsetWidth = yAxis.show ? 40 : 10
            let newLocation = Object.assign(location, { locationX: (clickItemIndex * clickAreWidth - this.scrollOffX + location.locationX + offsetWidth + offsetLength) })
            this.refs.toast.show(clickItemIndex, series, newLocation, barCanvasHeight, null, xAxis.data[clickItemIndex]);
            this.setState({
                selectIndex: clickItemIndex
            })
        }
    }

    renderSelectedLineView(show) {
        if (show) {
            let { perLength, barCanvasHeight, series, selectIndex, perRectHeight, negaNumInterval, maxNum, valueInterval } = this.state;
            let circleList = [];
            let pointY;
            let offsetNum = negaNumInterval * maxNum / valueInterval;
            series.map((mapItem, index) => {
                if (mapItem.data[selectIndex] != undefined) {
                    pointY = barCanvasHeight - (mapItem.data[selectIndex] + offsetNum) * perRectHeight
                    circleList.push(<Circle key={index + 'circle'} cx={perLength / 2} cy={pointY} r="2.5" fill={ColorList[index]} />)
                }
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
        let { viewHeight, series, perRectHeight, xAxis, perLength, barCanvasHeight,
            stack, rectNum, rectWidth, intervalNum, selectIndex, negaNumInterval, maxNum, valueInterval } = this.state;
        return (
            <View style={{ height: viewHeight, width: perLength, backgroundColor: 'white' }}>
                {this.lineView}
                <TouchableWithoutFeedback
                    onPress={(e) => this.clickChart(index, perLength, e.nativeEvent)}>
                    <View style={[{ width: perLength, height: barCanvasHeight, alignItems: 'flex-end', paddingLeft: 10, paddingRight: 10, marginTop: 10 }, stack ? itemViewStackStyle : itemViewStyle]}>
                        {this.renderPerLineView(index, series, perLength, perRectHeight, barCanvasHeight, intervalNum, negaNumInterval, maxNum, valueInterval)}
                        {this.renderSelectedLineView(selectIndex == index)}
                    </View>
                </TouchableWithoutFeedback>
                {xAxis.show ? <View style={{ width: perLength, height: 30, justifyContent: 'center', alignItems: 'center' }} >
                    <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 8, width: 30, transform: [{ rotateZ: '-45deg' }] }}>{xAxis.data[index]}</Text>
                </View> : null}
            </View>
        )
    }

    render() {
        let { series, viewHeight, barCanvasHeight, viewWidth, xAxis, yAxis, offsetLength } = this.state;
        // alert(this.yValueViewWith)
        return (
            <View style={[{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center' }, this.props.style]}>
                {this.yValueView}
                <View style={{ flex: 0, flexDirection: 'row', width: yAxis.show ? (viewWidth - this.yValueViewWith - 20) : viewWidth - this.yValueViewWith }}>
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
            name: 'x轴名称',
            show: true,
            data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Satsfsffsfsdfsdfsf', 'Sun', 'wqe', 'sdr', 'opu'],
        },
        yAxis: {
            // type: 'category',
            type: 'value',
            name: 'y轴名称',
            show: true,
            data: ['Mon', 'Tue', 'Wed', 'Thusssss', 'Fri', 'Satsfsffsf', 'Sun', 'wqe', 'sdr', 'opu'],
        },
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [10, 5, 2, 3, 0, 7, 6, 5, 2, 3]
            },
            {
                name: '非直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [3, 4, 1, 4, , 8, 3, 3, 10, 7]
            }
        ],
        stack: false
    },
    valueInterval: 3,
    style: { height: 400, width: window.width },
    interWidth: 10
}