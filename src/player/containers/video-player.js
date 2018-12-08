import React, { Component } from 'react';
import VideoPlayerLayout from '../components/video-player-layout';
import Video from  '../components/video';
import Title from  '../components/title';
import PlayPausa from '../components/play-pause';
import Timer from '../components/timer';
import Controls from '../components/video-player-controls';
import ProgressBar from '../components/progress-bar';
import Spinner from '../components/spinner';

class VideoPlayer extends Component {
  state = {
    pause : true,
    duration : 0,
    currentTime : 0,
    loading : false
  }
  togglePlay = (event) => {
    this.setState({pause : !this.state.pause})
  }
  componentDidMount = () => {
    this.setState({ pause : (!this.props.autoplay)})
  }
  handleLoadedMetadata = event => {
    this.video = event.target;
    this.setState({ duration : this.video.duration });
  }
  handleTimeUpdate = event => {
    this.setState({currentTime : this.video.currentTime})
  }
  leftPad = (number) => {
    const pad = '00';
    return pad.substring(0, pad.length - number.length) + number;
  }
  formattedTime = (secs) => {
    const minutes = parseInt(secs / 60, 10);
    const seconds = parseInt(secs % 60, 10);
    return `${minutes}:${this.leftPad(seconds.toString())}`
  }
  handleProgressChange = (event) => {
    this.video.currentTime = event.target.value;
  }
  handleSeeking = event => {
    this.setState({ loading : true});
  }
  handleSeeked = event => {
    this.setState({ loading : false});
  }
  render() {
    return(
      <VideoPlayerLayout>
        <Title title='Esto es un video chido'/>
        <Controls>
          <PlayPausa pause={this.state.pause} handleClick={this.togglePlay}/>
          <Timer
            currentTime={this.formattedTime(this.state.currentTime)}
            duration={this.formattedTime(this.state.duration)}
          />
          <ProgressBar
            duration={this.state.duration}
            value={this.state.currentTime}
            handleProgressChange={this.handleProgressChange}
          />
        </Controls>
        <Spinner
          active={this.state.loading}
        />
        <Video
          src='http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'
          pause={this.state.pause}
          handleLoadedMetadata={this.handleLoadedMetadata}
          handleTimeUpdate={this.handleTimeUpdate}
          handleSeeking={this.handleSeeking}
          handleSeeked={this.handleSeeked}
          autoPlay={this.props.autoplay}
          />
      </VideoPlayerLayout>
    );
  }
}
export default VideoPlayer;
