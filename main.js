import App from './src/App.jsx';
import { createRoot } from 'https://unpkg.com/react-dom@18/umd/react-dom.development.js';

const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
