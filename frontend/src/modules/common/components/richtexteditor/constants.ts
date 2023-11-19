import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import FigmaEmbedTool from './figmaembed';
import { upload } from '../../api/index';

export const EDITOR_JS_TOOLS = {
  figmaEmbed: {
    class: FigmaEmbedTool,
    inlineToolbar: true,
    config: {
      placeholder: 'Paste Figma URL',
    },
  },
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  image: {
    class: Image,
    config: {
      /**
       * Custom uploader
       */
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        uploadByFile(file: File) {
          // your own uploading logic here
          return upload(file).then((response: any) => {
            return {
              success: 1,
              file: {
                url: response.data.url,
              },
            };
          });
        },
        types: 'image/*',
      },
    },
  },
};
