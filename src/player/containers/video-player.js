import React, { Component } from 'react';
import VideoPlayerLayout from '../components/video-player-layout';
import Video from  '../components/video';
import Title from  '../components/title';
import PlayPausa from '../components/play-pause';
import Timer from '../components/timer';
import Controls from '../components/video-player-controls';
import ProgressBar from '../components/progress-bar';
import Spinner from '../components/spinner';
import Volume from '../components/volume';
import FullScreen from '../components/full-screen';

class VideoPlayer extends Component {
  state = {
    pause : true,
    duration : 0,
    currentTime : 0,
    loading : false,
    previousVolume : 0,
    volume : 0.5
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
  handleVolumeChange = event => {
    this.setState({volume : event.target.value});
    this.video.volume = event.target.value
  }
  handleClickVolume = event => {
    if(this.state.volume !== 0) this.setState({previousVolume : this.state.volume})
    if(this.state.volume === 0) {
      this.setState({volume : this.state.previousVolume});
      this.video.volume = this.state.previousVolume;
    } else {
      this.setState({volume : 0});
      this.video.volume = 0;
    }
  }
  handleFullScreenClick = event => {
    // Solamente funciona en Chrome de momento
    if(!document.webkitIsFullScreen) {
      this.player.webkitRequestFullscreen();
    } else {
      document.webkitExitFullscreen();
    }
  }
  setRef = element => {
    this.player = element;
  }
  render() {
    return(
      <VideoPlayerLayout
        setRef={this.setRef}
      >
        <Title title={this.props.title}/>
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
          <Volume
            volume={this.state.volume}
            handleClickVolume={this.handleClickVolume}
            handleVolumeChange={this.handleVolumeChange}
          />
          <FullScreen
            handleFullScreenClick={this.handleFullScreenClick}
          />
        </Controls>
        <Spinner
          active={this.state.loading}
        />
        <Video
          src={this.props.src}
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
