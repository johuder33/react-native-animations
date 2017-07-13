import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import Camera from 'react-native-camera';
import Modal from './components/modal'

const logo = require('../assets/node.logo.png');

class App extends Component {
    constructor(props) {
        super(props);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {
            visible: false
        }
    }

    openModal() {
        const { visible } = this.state;

        this.setState({
            visible: !visible
        });
    }

    closeModal() {
        const { visible } = this.state;

        this.setState({
            visible: !visible
        });
    }

    render() {
        const { visible } = this.state;
        return (
            <View style={Style.container}>
                <Image
                    source={logo}
                    style={Style.logo}
                />

                <Icon
                    raised
                    name={'camera-retro'}
                    type={'font-awesome'}
                    color={'#2980b9'}
                    onPress={this.openModal}
                />

                <Modal visible={visible} close={this.closeModal} />
            </View>
        );
    }
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        resizeMode: 'cover'
    }
});

export default App;