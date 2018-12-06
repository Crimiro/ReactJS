import React, { Component } from 'react';
import VideoPlayerLayout from '../components/video-player-layout';
import Video from  '../components/video';
import Title from  '../components/title';

class VideoPlayer extends Component {
  render() {
    return(
      <VideoPlayerLayout>
        <Title title='Esto es un video chido'/>
        <Video
          src='http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'
          autoPlay={true}
          />
      </VideoPlayerLayout>
    );
  }
}
export default VideoPlayer;
