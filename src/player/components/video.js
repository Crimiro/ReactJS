import React, { Component } from 'react';
import './Video.css';

class Video extends Component {
  togglePlay = () => {
    if(this.props.pause) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.pause !== this.props.pause) {
      this.togglePlay();
    }
  }
  setRef = element => {
    this.video = element;
  }
  render() {
    const {
      handleLoadedMetadata
    } = this.props;
    return (
      <div className='Video'>
        <video
          autoPlay={this.props.autoPlay}
          src={this.props.src}
          ref={this.setRef}
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>
    );
  }
}

export default Video;
