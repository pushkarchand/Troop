import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './constants';
import { defaultValue } from './default';

const EditorComponent = () => {
  const ejInstance: any = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: defaultValue,
      onChange: async () => {
        let content = await editor.saver.save();

        console.log(content);
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
