import React, { useLayoutEffect } from 'react';
import { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './constants';

type EditorProps = {
  data: OutputData;
  setData: (data: OutputData) => void;
};

const getDefaultValues = () => {
  const data = localStorage.getItem('defaultData');
  if (data) {
    return JSON.parse(data) ? JSON.parse(data) : {};
  } else {
    setDefaultDataValues({});
    return {};
  }
};

const setDefaultDataValues = (value: any) => {
  localStorage.setItem('defaultData', JSON.stringify(value));
};

const EditorComponent: React.FC<EditorProps> = ({ data, setData }) => {
  const ejInstance = useRef<any>();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      data: data,
      onChange: async () => {
        if (editor && editor.saver && typeof editor.saver.save === 'function') {
          let content = await editor.saver.save();
          setData(content);
        } else {
          console.error('Editor or saver is not properly initialized.');
        }
      },
      tools: EDITOR_JS_TOOLS as any,
      readOnly: false,
    });
  };

  useLayoutEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return <div id="editorjs"></div>;
};

export default EditorComponent;
