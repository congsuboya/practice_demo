import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { List, Map, is, Iterable } from 'immutable';


//请慎用setState，因其容易导致重新渲染
//请将方法的bind一律置于constructor
//请只传递component需要的props  传得太多，或者层次传得太深，都会加重shouldComponentUpdate里面的数据比较负担
//请尽量使用const element  我们可以将不怎么变动，或者不需要传入状态的component写成const element的形式，这样能加快这个element的初始渲染速度


class Box extends Component {
  constructor(props) {//这个也会只调用一次
    super(props);
    this.singleFun = this.singleFun.bind(this);
  }

  singleFun() {
    console.log('qqqqq', this.props.state.getIn(['instances', this.props.componentID, 'num']));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.state.getIn(['instances', this.props.componentID]) === nextProps.state.getIn(['instances', this.props.componentID])) {
      return false
    }
    return true;
  }

  componentWillMount() {
    //这个函数调用时机是在组件创建，并初始化了状态之后，在第一次绘制 render() 之前,
    //可以在这里做一些业务初始化操作，也可以设置组件状态。这个函数在整个生命周期中只被调用一次。
    console.log("reduxDemo-componentWillMount");
    // this.props.actions.getModuleData(this.props.componentInitUrl, this.props.componentInitParame, this.props.configureData, this.props.componentID);
  }

  componentDidMount() {
    //在组件第一次绘制之后，会调用 componentDidMount()，通知组件已经加载完成。这个放法只会调用一次
    console.log("reduxDemo-componentDidMount")
  }

  componentWillUpdate() {
    //可以做一些在更新界面之前要做的事情,就是调用render()函数前会先调用这个。在这个函数里面，不能使用 this.setState 来修改状态。
    console.log("reduxDemo-componentWillUpdate")
  }

  componentDidUpdate() {
    //调用了 render() 更新完成界面之后，会调用 componentDidUpdate() 来得到通知
    console.log("reduxDemo-componentDidUpdate")
  }

  componentWillUnmount() {
    //当组件要被从界面上移除的时候，就会调用,可以做一些组件相关的清理工作，例如取消计时器、网络请求等
    console.log("reduxDemo-componentWillUnmount")
  }

  render() {
    let { click } = this.props.actions;
    let num = this.props.state.getIn(['instances', this.props.componentID, 'num']);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 200 }}>
        <TouchableOpacity onPress={() => click(this.props.componentID)}>
          <Text style={{ fontSize: 18 }}>{`我state中的num是：${num}`}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Box;
