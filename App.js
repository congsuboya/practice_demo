import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  PanResponder
} from 'react-native';


export default class Main extends React.Component {

  static navigationOptions = {
    title: '主列表',
    headerTitleStyle: {
      alignSelf: 'center'
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      Data: [
        { name: '水平普通柱形图', id: 1 },
        { name: '水平堆叠柱形图', id: 2 },
        { name: '竖直普通柱形图', id: 3 },
        { name: '竖直堆叠柱形图', id: 4 },
        { name: '折线图', id: 5 },
        { name: '漏斗图', id: 6 },
        { name: '扇形图', id: 7 },
        { name: '气泡图', id: 8 },
        { name: '仪表盘', id: 9 },
        { name: '仪表盘', id: 10 },
        { name: '仪表盘', id: 11 },
        { name: '仪表盘', id: 12 },
        { name: '仪表盘', id: 13 },
        { name: '仪表盘', id: 14 },
        { name: '仪表盘', id: 15 },
        { name: '仪表盘', id: 16 },
        { name: '仪表盘', id: 17 },
        { name: '仪表盘', id: 18 },
        { name: '仪表盘', id: 19 },
        { name: '仪表盘', id: 20 },
        { name: '仪表盘', id: 21 },
        { name: '仪表盘', id: 22 },
        { name: '仪表盘', id: 23 },
        { name: '仪表盘', id: 24 },
        { name: '仪表盘', id: 25 },
        { name: '仪表盘', id: 26 },
        { name: '仪表盘', id: 27 },
        { name: '仪表盘', id: 28 },

      ]
    }
    this.renderItem = this.renderItem.bind(this);
    this.clickItem = this.clickItem.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }

  clickItem(Id) {
    const { navigate } = this.props.navigation;
    switch (Id) {
      case 1:
        navigate('HorizontalBar')
        return;
      case 2:
        navigate('HorizontalBarStack')
        return;
      case 3:
        navigate('VerticalBar')
        return;
      case 4:
        navigate('VerticalBarStack')
        return;
      case 5:
        navigate('LineDemo')
        return;
      case 6:
        navigate('FunnelDemo')
        return;
      case 7:
        navigate('PieDemo')
        return;
      case 8:
        navigate('BubbleDemo')
        return;
      case 9:
        navigate('GaugeDemo')
        return;
      case 100:
        navigate('WebDemo')
        return;
    }
  }

  renderItem({ item }) {
    return (
      <TouchableOpacity onPress={() => this.clickItem(item.id)} >
        <View key={item.id} style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <FlatList
        data={this.state.Data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => item.id ? item.id : index}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'gray' }} />}
      />
    )
  }
}