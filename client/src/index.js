import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

import DataProvider from './redux/store'
import { SocketContext, socket } from './utils/socketClient';

const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<SocketContext.Provider value={socket}>
			<DataProvider>
				<App />
			</DataProvider>
		</SocketContext.Provider>
	</React.StrictMode>
);

