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

import { DrawView } from './utils';


export default class ViewDemo extends Component {
    //构造器
    constructor(props) {
        //加载父类方法,不可省略
        super(props);
        this.consoleAlert = this.consoleAlert.bind(this);
        //设置初始的状态
        this.state = {
            top: 0,
            left: 0,
            viewTree: {
                type: 'XsyView',
                children: [
                    {
                        type: 'XsyView',
                        style: {
                            width: 100,
                            height: 100,
                            backgroundColor: 'red'
                        },
                        children: [
                            {
                                type: 'XsyView',
                                style: {
                                    width: 50,
                                    height: 50,
                                    backgroundColor: 'yellow'
                                }
                            }
                        ]
                    },
                    {
                        type: 'XsyView',
                        style: {
                            width: 80,
                            height: 100,
                            backgroundColor: 'green'
                        }
                    }
                ],
                style: {
                    width: width,
                    height: height,
                    top: 0,
                    left: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            }
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
    consoleAlert() {
        this.myref.props.children.push(
            <BaseView viewStyle={{ backgroundColor: 'yellow', height: 50, width: 100 }} />
        )
        this.myref.measure((e) => {
            console.log('2213sdf', e);
        });
    }

    render() {
        let baseViewProps = {
            children: new Array()
        }
        baseViewProps.children.push(<BaseView viewStyle={{ backgroundColor: 'blue', height: 50, width: 100 }} />)
        baseViewProps.children.push(<BaseView viewStyle={{ backgroundColor: 'yellow', height: 50, width: 100 }} />)

        return (
            <View
                ref={(ref) => this.myref = ref}
                style={{ flex: 1 }}>
                <View style={{ width: width, height: 40, backgroundColor: 'gray', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        style={{ marginRright: 5 }}
                        title='添加View'
                        onPress={() => this.consoleAlert()}
                    />
                    <Button
                        title='添加Text'
                        onPress={() => alert('你好')}
                    />
                </View>
                {DrawView(this.state.viewTree)}
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