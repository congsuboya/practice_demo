import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Actions } from '../reducers/reducer';
import { connect } from 'react-redux';

import Box from '../components/box';

class Container extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.state.hasIn(['instances', this.props.componentID])) {
            this.props.actions.initState(this.props.componentID);
        }
    }

    render() {
        if (!this.props.state.hasIn(['instances', this.props.componentID])) {
            return null;
        } else {
            return (
                <Box
                    {...this.props}
                />
            );
        }


    }
}

export default connect(state => ({
    state: state.get('reduxDemo'),
}),
    (dispatch) => ({
        actions: bindActionCreators(Actions, dispatch)
    })
)(Container);