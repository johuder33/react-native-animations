import React, { Component } from 'react'
import { Modal, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import Heart from '../heart';
import Message from '../message';
import Tweets from '../../../assets/tweets';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements'

const arrayOfTweets = Tweets.statuses;

class Periscope extends Component {
    constructor(props) {
        super(props);

        this.addHeart = this.addHeart.bind(this);
        this.startTweeting = this.startTweeting.bind(this);
        this.releaseTweetRandomly = this.releaseTweetRandomly.bind(this);
        this.removeHeartOnComplete = this.removeHeartOnComplete.bind(this);
        this.removeTweetOnComplete = this.removeTweetOnComplete.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.timer = null;
        this.isThisMounted = false;

        this.state = {
            hearts: [],
            tweets: []
        }
    }

    closeModal() {
        const { close } = this.props;

        if (close) {
            close();
        }
    }

    componentDidMount() {
        this.startTweeting();
    }

    componentWillMount() {
        this.isThisMounted = true;
    }

    shouldComponentUpdate() {
        return this.isThisMounted;
    }

    componentWillUnmount() {
        this.isThisMounted = false;
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    startTweeting() {
        const timeout = this.getNumberInRange(5000, 3000);
        this.timer = setTimeout(() => {
            if (this.timer) {
                clearTimeout(this.timer);
            }

            this.releaseTweetRandomly();
            this.startTweeting();
        }, timeout);
    }

    renderTweets() {
        const { tweets } = this.state;

        const _arrayOfTweets = tweets.map((currentTweet) => {
            return (
                <Message
                    key={`${currentTweet.tweet.id}-${currentTweet.ts}`}
                    content={currentTweet.tweet}
                    onComplete={() => this.removeTweetOnComplete(currentTweet.tweet)}
                />
            );
        });

        return _arrayOfTweets;
    }

    removeTweetOnComplete(tweet) {
        const { tweets } = this.state;
        const tweetIndex = tweets.findIndex((currentTweet) => currentTweet.tweet.id === tweet.id);

        tweets.splice(tweetIndex, 1);

        this.setState({
            tweets
        });
    }

    releaseTweetRandomly() {
        const { tweets } = this.state;

        const currentIndex = this.getNumberInRange(arrayOfTweets.length, 0);
        var currentTweet = arrayOfTweets.slice(currentIndex, currentIndex + 1);
        currentTweet = currentTweet.pop();
        const ts = new Date() * 1;

        tweets.push({tweet: currentTweet, ts });

        this.setState({ tweets });
    }

    getNumberInRange(max, min) {
        return Math.ceil((Math.random() * (max - min)) + min)
    }

    addHeart() {
        const { hearts } = this.state;

        const right = this.getNumberInRange(45, 15);
        const id = new Date() * 1;

        hearts.push({ right, id });

        this.setState({
            hearts
        });
    }

    removeHeartOnComplete(heart) {
        const { hearts } = this.state;

        const index = hearts.findIndex((currentHeart) => currentHeart.id === heart.id);

        hearts.splice(index, 1);

        this.setState({hearts});
    }

    renderHearts() {
        const { hearts } = this.state;

        const heartViews = hearts.map((heart) => {
            return (<Heart
                style={{ right: heart.right, bottom: 0 }}
                key={heart.id}
                onComplete={() => this.removeHeartOnComplete(heart)}
            />);
        });

        return heartViews;
    }

    render() {
        const { visible } = this.state;

        return (
            <TouchableWithoutFeedback onPress={this.addHeart} style={Style.flex}>
                <View style={Style.flex}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={Style.flex}
                        aspect={Camera.constants.Aspect.fill}
                    >
                        <Icon
                            name={'times'}
                            type={'font-awesome'}
                            color={'black'}
                            style={Style.close}
                            onPress={() => this.closeModal()}
                        />

                        {this.renderHearts()}
                        <View style={{left: 0, bottom: 0, position: "absolute"}}>
                            {this.renderTweets()}
                        </View>
                    </Camera>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const Style = StyleSheet.create({
    flex: {
        flex: 1
    },
    close: {
        position: 'absolute',
        top: 25,
        right: 25
    }
});

export default Periscope;