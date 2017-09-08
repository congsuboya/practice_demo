import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    Slider,
    Dimensions,
    PanResponder,
    StyleSheet,
    Text
} from 'react-native';

const { width, height } = Dimensions.get('window');

import BaseView from '../base/baseView';


export default class ViewDemo extends Component {
    //构造器
    constructor(props) {
        //加载父类方法,不可省略
        super(props);
        //设置初始的状态
        this.state = {
            top: 0,
            left: 0,
        };
    }

    //componentDidMount是React组件的一个生命周期方法，他会在组件刚加载完成的时候调用一次，以后不会再调用
    componentDidMount() {
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                this._top = this.state.top
                this._left = this.state.left
                this.setState({ bg: 'red' })
            },
            onPanResponderMove: (evt, gs) => {
                console.log(gs.dx + ' ' + gs.dy)
                this.setState({
                    top: this._top + gs.dy,
                    left: this._left + gs.dx
                })
            },
            onPanResponderRelease: (evt, gs) => {
                this.setState({
                    bg: 'white',
                    top: this._top + gs.dy,
                    left: this._left + gs.dx
                })
            }
        })
    }

    render() {
        let baseViewProps = {
            children: <BaseView viewStyle={{ backgroundColor: 'blue', height: 50 ,width:100}} />
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={{ width: width, height: 40, backgroundColor: 'gray', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        style={{ marginRright: 5 }}
                        title='添加View'
                        onPress={() => alert('你好')}
                    />
                    <Button
                        title='添加Text'
                        onPress={() => alert('你好')}
                    />

                </View>
                <View
                    style={{ height: 150, width: 150, backgroundColor: 'green' }}
                />
                <BaseView
                    {...baseViewProps}
                />
                <View
                    {...this._panResponder.panHandlers}
                    style={[styles.rect, {
                        "top": this.state.top,
                        "left": this.state.left,
                    }]}>
                </View>
            </View>
        );
    }

};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rect: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#223344',
        alignSelf: 'flex-end',
    }
});