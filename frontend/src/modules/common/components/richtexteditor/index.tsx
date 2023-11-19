import React from 'react';
import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './constants';

enum LogLevels {
  VERBOSE = 'VERBOSE',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

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
  console.log('setDefaultDataValues', value);
  localStorage.setItem('defaultData', JSON.stringify(value));
};

const EditorComponent = () => {
  const ejInstance: any = useRef();
  const [data, setdata] = useState<any>(getDefaultValues());

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: data,
      onChange: async () => {
        let content = await editor.saver.save();
        setdata(JSON.parse(JSON.stringify(content)));
        setDefaultDataValues(content);
      },
      tools: EDITOR_JS_TOOLS as any,
      readOnly: false,
    });
  };

  // This will run only once
  useEffect(() => {
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
