import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    Modal
} from 'react-native';

const window = Dimensions.get('window');
import ColorList from '../globalVariable';

export default class ToastView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            series: null,
            location: null,
            showClickIndex: 0
        }
        this.renderShowItemList = this.renderShowItemList.bind(this);
    }

    show(showClickIndex, series, location, svgHeight, showColor = null) {
        this.setState({
            show: true,
            series: series,
            location: location,
            showClickIndex: showClickIndex,
            showColor: showColor,
            svgHeight: svgHeight
        })
    }

    hide() {
        this.setState({
            show: false,
            series: null,
            location: null,
            showClickIndex: null,
            svgHeight: null
        })
    }

    toThousands(num) {
        num = (num || 0).toString();
        let result = '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }
        return result;
    }
    renderShowItemList() {
        let { showClickIndex, series, showColor } = this.state;
        let itemList = [];
        this.maxWidth = 0;
        let dataNum = 0;
        series.map((item, index) => {
            if (item.data[showClickIndex] != undefined) {
                let tempWidth = (item.name + item.data[showClickIndex]).toString().length * 10 + 12;
                if (tempWidth > this.maxWidth) {
                    this.maxWidth = tempWidth;
                }

                dataNum = this.toThousands(item.data[showClickIndex]);
                itemList.push(
                    <View key={'toast' + index} style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ height: 6, width: 6, marginRight: 2, backgroundColor: showColor ? showColor : ColorList[index % ColorList.length] }} />
                        <Text style={{ color: 'white', fontSize: 9 }} >{`${item.name}：${dataNum}`}</Text>
                    </View>
                )
            }
        });
        return itemList;
    }
    render() {
        if (this.state.show && this.state.series) {
            let viewX = this.state.location.locationX;
            let itemView = this.renderShowItemList();
            if (window.width - viewX < this.maxWidth) {
                viewX = viewX - this.maxWidth - 10;
            }
            let itemViewHeight = itemView.length * 13 > 110 ? 110 : itemView.length * 13;
            let locationY = this.state.location.locationY;
            if (itemViewHeight + locationY > this.state.svgHeigth / 2) {
                locationY = this.state.svgHeigth / 2 - itemViewHeight
            }
            return (
                <View style={{ position: 'absolute', backgroundColor: '#0E4068', top: locationY, left: viewX, padding: 5 }}>
                    <ScrollView
                        style={{ maxHeight: 110 }}
                    >
                        {itemView}
                    </ScrollView>
                </View>
            )
        } else {
            return null;
        }
    }
}