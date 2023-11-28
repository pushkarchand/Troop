import React from 'react';
import ReactDOM from 'react-dom/client';

interface FigmaEmbedData {
  url: string;
}

interface FigmaEmbedToolConfig {
  placeholder?: string;
}

interface FigmaEmbedProps {
  figmaUrl: string;
  readonly: boolean;
}

const FigmaEmbed: React.FC<FigmaEmbedProps> = ({ figmaUrl }) => {
  return (
    <iframe
      title="Figma Embed"
      style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
      width="100%"
      height="450"
      src={`https://www.figma.com/embed?embed_host=share&url=${figmaUrl}`}
    />
  );
};

class FigmaEmbedTool {
  static get toolbox() {
    return {
      title: 'Figma Embed',
      icon: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 81.92 122.88" style="enable-background:new 0 0 81.92 122.88" xml:space="preserve"><style type="text/css"><![CDATA[
        .st0{fill:#1ABCFE;}
        .st1{fill:#F24E1E;}
        .st2{fill:#FF7262;}
        .st3{fill:#A259FF;}
        .st4{fill:#0ACF83;}
      ]]></style><g><path class="st4" d="M20.48,122.88c11.3,0,20.48-9.17,20.48-20.48V81.92H20.48C9.18,81.92,0,91.09,0,102.4 C0,113.71,9.18,122.88,20.48,122.88L20.48,122.88L20.48,122.88z"/><path class="st3" d="M0,61.44c0-11.3,9.18-20.48,20.48-20.48h20.48v40.96H20.48C9.18,81.92,0,72.75,0,61.44L0,61.44L0,61.44z"/><path class="st1" d="M0,20.48C0,9.18,9.18,0,20.48,0h20.48v40.96H20.48C9.18,40.96,0,31.79,0,20.48L0,20.48z"/><path class="st2" d="M40.96,0h20.48c11.3,0,20.48,9.18,20.48,20.48c0,11.31-9.17,20.48-20.48,20.48H40.96V0L40.96,0z"/><path class="st0" d="M81.92,61.44c0,11.31-9.17,20.48-20.48,20.48c-11.31,0-20.48-9.17-20.48-20.48c0-11.3,9.17-20.48,20.48-20.48 C72.75,40.96,81.92,50.14,81.92,61.44L81.92,61.44z"/></g></svg>`,
    };
  }

  static get pasteConfig() {
    return {
      tags: ['FIGMA'],
      patterns: {
        figma: /https:\/\/www\.figma\.com\/file\/([^/]+)/i,
      },
    };
  }

  static get sanitize() {
    return {
      url: {},
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  private api: any;
  private config: FigmaEmbedToolConfig;
  private data: FigmaEmbedData;
  private wrapper: any;
  private readOnly: boolean;

  constructor({
    data,
    api,
    config,
    readOnly,
  }: {
    data: FigmaEmbedData;
    api: any;
    config: FigmaEmbedToolConfig;
    readOnly: boolean;
  }) {
    this.api = api;
    this.config = config || {};
    this.data = {
      url: data.url || '',
    };
    this.wrapper = undefined;
    this.readOnly = readOnly;
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('figma-embed');

    if (this.data && this.data.url) {
      this._createFigmaEmbed(this.data.url);
      return this.wrapper;
    }

    const input = document.createElement('input');
    input.placeholder = this.config.placeholder || 'Paste a Figma URL...';
    input.id = 'figma-embed';
    input.addEventListener('paste', (event) => {
      if (event.clipboardData) {
        const newUrl = event.clipboardData.getData('text');
        this._createFigmaEmbed(newUrl);
        this.data.url = newUrl; // Update the data.url property
      }
    });

    this.wrapper.appendChild(input);
    return this.wrapper;
  }

  private _createFigmaEmbed(url: string) {
    if (this.wrapper) {
      this.wrapper.innerHTML = '';

      // Check if the URL starts with 'https://www.figma.com/file/'
      const figmaRegex =
        // eslint-disable-next-line no-useless-escape
        /^https:\/\/www\.figma\.com\/(?:file|proto)\/([^\/?]+)/i;
      const match = url.match(figmaRegex);
      if (match && match[1]) {
        // Use createRoot to render the component
        const root = ReactDOM.createRoot(this.wrapper);
        root.render(<FigmaEmbed figmaUrl={url} readonly={this.readOnly} />);
      } else {
        console.error('Invalid Figma URL');
      }
    }
  }

  save() {
    return this.data;
  }
}

export default FigmaEmbedTool;
