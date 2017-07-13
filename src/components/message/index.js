import React, { Component, PropTypes } from "react"
import { View, StyleSheet, Text, ImageBackground, Animated } from "react-native";

export default class extends Component {
    static propTypes = {
        content: PropTypes.object,
        onComplete: PropTypes.func
    };

    static defaultProps = {
        content: {},
        onComplete: () => null
    };

    constructor(props) {
        super(props);

        this.isReady = false;

        this.state = {
            animation: new Animated.Value(0),
            height: 0
        }
    }

    getStyle() {
        const animatedStyle = this.state.animation.interpolate({
            inputRange: [0, this.state.height],
            outputRange: [0, 1]
        });

        return {
            opacity: animatedStyle
        };
    }

    componentDidMounts(height) {
        const { animation } = this.state;
        
        Animated.timing(animation, {
            duration: 1000,
            toValue: height,
        }).start(() => {
            setTimeout(() => {
                this.fadeOut();
            }, 5000);
        });
    }

    fadeOut() {
        const { animation } = this.state;
        const { onComplete } = this.props;

        Animated.timing(animation, {
            duration: 1000,
            toValue: 0
        }).start(() => onComplete());
    }

    render() {
        const { content } = this.props;
        const { user, text } = content;
        const { name, profile_background_image_url_https } = user;

        return (
            <Animated.View
                style={[Styles.container, this.getStyle()]}
                onLayout={(event) => {
                    if (!this.isReady) {
                        this.isReady = true;

                        const { height } = event.nativeEvent.layout;

                        this.setState({
                            height
                        });

                        this.componentDidMounts(height);
                    }
                }}
            >
                <View
                    style={Styles.containerPicture}
                >
                    <ImageBackground
                        source={{uri: profile_background_image_url_https || "https://i2.wp.com/technoetics.in/wp-content/uploads/2016/09/reactlogo2.png?fit=391%2C377"}}
                        style={[Styles.flex, Styles.picture]}
                    >
                        <View style={[Styles.flex, Styles.pictureOverlayout]}/>
                    </ImageBackground>
                </View>

                <View
                    style={[Styles.containerText]}
                >
                    <View style={Styles.containerNick}>
                        <Text style={Styles.nickText}>
                            {name && name.length > 0 && `@${name}`}
                        </Text>
                    </View>

                    <View>
                        <Text style={Styles.messageText}>
                            {text.substr(0, 50)}
                        </Text>
                    </View>
                </View>
            </Animated.View>
        );
    }
}

const Styles = StyleSheet.create({
    flex: {
        flex: 1
    },

    container: {
        maxWidth: 220,
        bottom: 0,
        flexDirection: "row",
        marginTop: 6
    },

    containerPicture: {
        width: 35
    },

    pictureOverlayout: {
        backgroundColor: "pink",
        opacity: .5
    },

    containerText: {
        padding: 2,
        backgroundColor: "#FFF",
        flex: -1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },

    containerNick: {
        paddingBottom: 2
    },

    nickText: {
        color: "#9e9ea0",
        fontSize: 10
    },

    messageText: {
        fontSize: 12
    }
});