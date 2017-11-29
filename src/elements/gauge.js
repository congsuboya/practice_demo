'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    Text,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    Easing,
    Platform
} from 'react-native';

import { fromJS, is } from 'immutable';
const window = Dimensions.get('window');

export default class Gauge extends Component {

    constructor(props) {
        super(props)

        let { height, width } = props.style;
        let viewHeight = height ? height : 300;
        let viewWidth = width ? width : window.width;
        let imageWidth = 0;
        if (viewWidth / 2 >= viewHeight) {
            imageWidth = viewHeight * 2 - 20;
        } else {
            imageWidth = viewWidth - 20;
        }
        let aLength = imageWidth / 2 - (imageWidth / 2 - 20) * Math.cos(45 * Math.PI / 180);
        this.state = {
            imageWidth,
            viewHeight,
            viewWidth,
            aLength,
            ...props.option
        };
        this.rotateValue = new Animated.Value(0);
        this.rotateZ = this.rotateValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '180deg'],
        });
    }


    componentDidMount() {
        let { max, data } = this.state;
        let precent = max / 100 * data.value;
        if (precent > 100) {
            precent = 100;
        }
        Animated.timing(this.rotateValue, {
            delay: 100,
            toValue: precent,        //属性目标值
            duration: 3000    //动画执行时间
        }).start();
    }

    render() {

        let { imageWidth, viewHeight, viewWidth, aLength, data } = this.state;
        let innerR = imageWidth * 40 / 135;
        return (
            <View style={[{ flex: 0, alignItems: 'center', backgroundColor: 'white', paddingTop: 5 }, this.props.style]}>

                <View style={{
                    width: imageWidth, height: imageWidth / 2,
                    position: 'absolute', top: (viewHeight - imageWidth / 2 - 5) / 2, alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>
                    <Image
                        style={{ width: imageWidth, height: imageWidth / 2, position: 'absolute' }}
                        resizeMode={'contain'}
                        source={require('../image/completeratepanel.png')}
                    />
                    <Text style={{ position: 'absolute', left: 20, bottom: 0, fontSize: 9, color: '#92A0B1', textAlign: 'center' }}>0</Text>
                    <Text style={{ position: 'absolute', top: aLength, left: aLength - 15, fontSize: 9, color: '#92A0B1', textAlign: 'center', width: 30 }}>25</Text>
                    <Text style={{ position: 'absolute', top: 20, right: (imageWidth - 30) / 2, fontSize: 9, color: '#92A0B1', textAlign: 'center', width: 30 }}>50</Text>
                    <Text style={{ position: 'absolute', top: aLength, right: aLength - 15, fontSize: 9, color: '#92A0B1', textAlign: 'center', width: 30 }}>75</Text>
                    <Text style={{ position: 'absolute', right: 20, bottom: 0, fontSize: 9, color: '#92A0B1', textAlign: 'center' }}>100</Text>

                    <Animated.View
                        style={{
                            width: imageWidth - 80,
                            height: 10,
                            flexDirection: 'row',
                            transform: [
                                {
                                    rotateZ: this.rotateZ
                                },
                            ]
                        }} >
                        <Image source={require('../image/pic.png')}
                            resizeMode={'stretch'}
                            style={{
                                width: imageWidth / 2 - 40,
                                height: 10,
                            }} />
                    </Animated.View>

                    <View style={{ position: 'absolute', width: innerR * 2, height: innerR, borderTopRightRadius: innerR, borderTopLeftRadius: innerR, bottom: 0, backgroundColor: 'white', alignItems: 'center', justifyContent: 'flex-end' }} >
                        <Text style={{ fontSize: 40, color: '#228EE6', textAlign: 'center' }}>{data.value}</Text>
                        <Text style={{ fontSize: 13, color: '#3A3F00', textAlign: 'center' }}>{data.name}</Text>
                    </View>
                </View>
            </View >
        )
    }
}

Gauge.defaultProps = {
    option: {
        name: '业务指标',
        type: 'gauge',
        max: 100,
        data: { value: 80, name: '完成率' }
    },
    style: { height: 400, width: window.width }
}
