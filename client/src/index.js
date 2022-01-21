import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import DataProvider from './redux/store'
import { SocketContext, socket } from './utils/socketClient';

ReactDOM.render(
	<React.StrictMode>
		<SocketContext.Provider value={socket} >
			<DataProvider>
				<App />
			</DataProvider>
		</SocketContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

