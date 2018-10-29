import React from 'react';
import ReactDOM from 'react-dom';
import Media from './src/playlist/components/media';

const app = document.getElementById('app')
const holaMundo = <h1>Hola mundo!</h1>;
ReactDOM.render(<Media type='audio' title='¿Qué es Responsive Design?' author='Christian Rosales' image='./images/covers/responsive.jpg'/>, app);