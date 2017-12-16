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
        this.clickItemView = this.clickItemView.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.createLineView = this.createLineView.bind(this);
        this.createYValue = this.createYValue.bind(this);
        this.createXValueTitle = this.createXValueTitle.bind(this);
        this.createOffsetLineView = this.createOffsetLineView.bind(this);
        this.yValueView = null;
        this.xValueTitle = null;
        this.offsetLineView = null;
        this.yValueViewWisth = 20;
        this.scrollOffX = 0;
    }

    componentWillMount() {
        let { yAxis, xAxis, offsetLength } = this.props;
        if (yAxis.show) {
            this.createYValue(this.props);
        }
        if (xAxis.show) {
            this.createXValueTitle(this.props);
        }
        this.createLineView(this.props);

        if (offsetLength > 0) {
            this.createOffsetLineView(this.props);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (is(fromJS(nextProps), fromJS(this.props))) {
            return false
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        if (!is(fromJS(nextProps), fromJS(this.props))) {
            let { yAxis, xAxis, offsetLength } = nextProps;
            if (yAxis.show) {
                this.createYValue(nextProps);
            }
            if (xAxis.show) {
                this.createXValueTitle(nextProps)
            }
            this.createLineView(nextProps);

            if (offsetLength > 0) {
                this.createOffsetLineView(nextProps);
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
        let { perLength, perInterLength, valueInterval, negaNumInterval, offsetLength, plusNumInterval } = props;
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
                onLayout={(e) => this.yValueViewWisth = e.nativeEvent.layout.width}
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
            </View>)
    }

    createXValueTitle(props) {
        let { viewWidth, xAxis, offsetLength } = props;
        if (xAxis.name) {
            this.xValueTitle = <Text style={{
                fontSize: 9,
                width: 100,
                textAlign: 'center',
                position: 'absolute',
                bottom: 1,
                left: (viewWidth - 60 - offsetLength) / 2,
                textAlignVertical: 'center'
            }}>{xAxis.name}</Text>;
        }
    }

    clickItemView(i, clickAreWidth, location) {
        let { series, yAxis, barCanvasHeight, xAxis } = this.props;
        let offsetWidth = yAxis.show ? 40 : 10
        let newLocation = Object.assign(location, { locationX: (i * clickAreWidth - this.scrollOffX + location.locationX + offsetWidth) });
        this.props.showToastView(i, series, newLocation, barCanvasHeight, xAxis.data[i]);
    }

    renderPerBarView(index, series, perRectHeight, stack, rectWidth, negaNumInterval, perInterLength) {
        let perBarList = [];
        let negaNumIntList = [];
        let mapItem;
        let barHeight = 0;
        let marginBot = negaNumInterval * perInterLength;
        let barView = null;
        if (stack) {
            for (let i = series.length - 1; i >= 0; i--) {
                mapItem = series[i];
                barHeight = Math.abs(mapItem.data[index]) * perRectHeight;
                barView = < View
                    key={i + 'listItem'}
                    pointerEvents='none'
                    style={{
                        backgroundColor: ColorList[i % ColorList.length],
                        width: rectWidth,
                        height: barHeight,
                    }} />;
                if (mapItem.data[index] < 0) {
                    marginBot = marginBot - barHeight;
                    negaNumIntList.unshift(barView)
                } else {
                    perBarList.push(barView);
                }
            }
            if (marginBot > 0) {
                negaNumIntList.push(< View
                    key={'emptylistItem'}
                    pointerEvents='none'
                    style={{
                        width: rectWidth,
                        height: marginBot,
                    }} />)
            }
            perBarList = perBarList.concat(negaNumIntList);
        } else {
            series.map((mapItem, innerIndex) => {
                marginBot = negaNumInterval * perInterLength;
                barHeight = Math.abs(mapItem.data[index]) * perRectHeight;
                if (mapItem.data[index] < 0) {
                    marginBot = marginBot - barHeight;
                }
                perBarList.push(< View
                    key={innerIndex + 'listItem'}
                    pointerEvents='none'
                    style={{
                        backgroundColor: ColorList[innerIndex % ColorList.length],
                        width: rectWidth,
                        height: barHeight,
                        marginBottom: marginBot
                    }} />)
            })
        }
        return perBarList;
    }

    renderItem({ item, index }) {
        let { viewHeight, series, perRectHeight, perLength, xAxis, barCanvasHeight,
            stack, rectNum, rectWidth, negaNumInterval, minNum, perInterLength } = this.props;
        return (
            <View style={{ height: viewHeight, width: perLength, backgroundColor: 'white' }}>
                {this.lineView}
                <TouchableHighlight
                    underlayColor='rgba(34,142,230,0.10)'
                    onPressIn={(e) => this.clickItemView(index, perLength, e.nativeEvent)}>
                    <View style={[{ width: perLength, height: barCanvasHeight, alignItems: 'flex-end', paddingLeft: 10, paddingRight: 10, marginTop: 10 }, stack ? itemViewStackStyle : itemViewStyle]}>
                        {this.renderPerBarView(index, series, perRectHeight, stack, rectWidth, negaNumInterval, perInterLength)}
                    </View>
                </TouchableHighlight>
                {xAxis.show ? <View style={{ width: perLength, height: 30, justifyContent: 'center', alignItems: 'center' }} >
                    <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 8, width: 30, transform: [{ rotateZ: '-45deg' }] }}>{xAxis.data[index]}</Text>
                </View> : null}
            </View>
        )
    }

    render() {
        let { series, viewHeight, barCanvasHeight, viewWidth, xAxis, yAxis, offsetLength, plusNumInterval } = this.props;
        if (yAxis.show) {
            this.yValueViewWisth = this.yValueViewWisth + 20;
        }
        return (
            <View style={[{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center' }, this.props.style]}>
                {this.yValueView}
                <View style={{ flex: 0, flexDirection: 'row', width: viewWidth - this.yValueViewWisth }}>
                    {this.offsetLineView}
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
                    {this.offsetLineView}
                </View>
                {this.xValueTitle}
            </View >
        )
    }
}



