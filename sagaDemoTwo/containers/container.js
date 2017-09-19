import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { actions } from '../reducers/reducers';
// import * as allActions from '../reducers/reducers'

import { bindActionCreators } from 'redux';

class Home extends Component {
  _onPressReset() {
    this.props.actions.reset();
  }

  _onPressStart() {
    this.props.actions.start();
  }

  _onPressStop() {
    this.props.actions.stop();
  }

  render() {
    const { timer } = this.props;
    console.log('oopipwoir', this.props)
    return (
      <View style={styles.container}>
        <Text style={[styles.counter, { color: timer.runStatus ? 'blue' : 'black' }]}>{timer.seconds}</Text>
        <TouchableOpacity style={styles.reset} onPress={() => this._onPressReset()}>
          <Text>重置</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.start} onPress={() => this._onPressStart()}>
          <Text>开始</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stop} onPress={() => this._onPressStop()}>
          <Text>停止</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  counter: {
    fontSize: 50,
    marginBottom: 70
  },
  reset: {
    margin: 10,
    backgroundColor: 'yellow'
  },
  start: {
    margin: 10,
    backgroundColor: 'yellow'
  },
  stop: {
    margin: 10,
    backgroundColor: 'yellow'
  }
})

const mapStateToProps = state => ({
  timer: state.timer
})


const mapActionToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapActionToProps)(Home);
