import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom/client';
import TextEditor from './components/text-editor';

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  )
}

const ele = document.getElementById('root');
const root = ReactDOM.createRoot(ele!);
root.render(
  <App />
)