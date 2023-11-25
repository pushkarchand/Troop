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
  header: Header,
  checklist: CheckList,
  delimiter: Delimiter,
  embed: Embed,
  figmaEmbed: {
    class: FigmaEmbedTool,
    inlineToolbar: true,
    config: {
      placeholder: 'Paste Figma URL',
    },
  },
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
          // Your own uploading logic here
          return new Promise((resolve, reject) => {
            upload(file)
              .then((response: any) => {
                // Use setTimeout to delay the response after 2 seconds
                setTimeout(() => {
                  resolve({
                    success: 1,
                    file: {
                      url: response.data.url,
                      imageName: response.data.imageName,
                    },
                  });
                }, 5000);
              })
              .catch((error: any) => {
                reject(error); // Propagate any errors that occur during the upload
              });
          });
        },
        types: 'image/*',
      },
    },
  },
  table: Table,
  list: List,
  linkTool: LinkTool,
  marker: Marker,
  quote: Quote,
  warning: Warning,
  code: Code,
  inlineCode: InlineCode,
};
