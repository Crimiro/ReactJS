import React from 'react';
import Media from './media';
import './playlist.css';
import Play from '../../icons/components/play';
import Pause from '../../icons/components/pause';
import Volume from '../../icons/components/volume';
import FullScreen from '../../icons/components/full-screen';

function Playlist(props) {
		return (
			<div>
				<Play size={50} color='red'/>
				<Pause size={50} color='red'/>
				<Volume size={50} color='red'/>
				<FullScreen size={50} color='red'/>
				{props.data.categories.map( (category) => {
					return (
						<div key={category.id}>
							<h4 className='Description'>{category.description}</h4>
							<h2 className='Title'>{category.title}</h2>
							<div className='Playlist'>
								{category.playlist.map( (item) => {
									return <Media {...item} key={item.id}/>
								})}
							</div>
						</div>
					);
				})}
			</div>
		)
}

export default Playlist;