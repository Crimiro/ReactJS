import React from 'react';
import Media from './media';
import './playlist.css';

function Playlist(props) {
		return (
			<div>
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