import './resizable.css';
import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import bundler from '../bundler';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    let timer = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output);
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [input])

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue='const a = 1;'
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  )
}

export default CodeCell;