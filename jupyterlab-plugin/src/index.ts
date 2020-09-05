import {
  Message
} from '@lumino/messaging';

//import {
//Widget
//} from '@lumino/widgets';

import {
  ICommandPalette,
  //WidgetTracker,
  IWidgetTracker,
  IFrame
} from '@jupyterlab/apputils';

import {
  ISettingRegistry
} from '@jupyterlab/settingregistry';

import {
  //JSONExt,
  //JSONObject,
  Token
} from '@lumino/coreutils'

import { PageConfig } from '@jupyterlab/coreutils';

import {
  JupyterFrontEnd, JupyterFrontEndPlugin, ILayoutRestorer
} from '@jupyterlab/application';

import {
  ILauncher
} from '@jupyterlab/launcher';

import {
  IMainMenu
} from '@jupyterlab/mainmenu';

import '../style/index.css';

/**
 * A VNC widget
 */
class X11vncWidget extends IFrame {
  constructor(url: string) {
    super();
    this.id = 'jupyterlab-vnc';
    this.title.label = 'Desktop';
    this.title.closable = true;
    this.url = url;
    this.addClass('jp-vncWidget');
  }

  setUrl(url: string): void {
    this.url = url;
  }

  onUpdateRequest(msg: Message) {
  }
}

interface IX11vncTracker extends IWidgetTracker<X11vncWidget> { };
export const IX11vncTracker = new Token<IX11vncTracker>('@tlkh/jupyterlab-vnc:plugin');

/**
 * Initialization data for the jupyterlab-vnc extension.
 */
const extension: JupyterFrontEndPlugin<IX11vncTracker> = {
  id: '@tlkh/jupyterlab-vnc:plugin',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer, IMainMenu, ISettingRegistry],
  optional: [ILauncher],
  provides: IX11vncTracker,
  activate: (app: JupyterFrontEnd) => {
    app.commands.addCommand('x11vnc:open', {
      label: 'Open Desktop',
      execute: () => {
        window.open(Private.getUrl(), '_blank');
      }
    });
  }
}


namespace Private {
  let VNC_URL: string;

  let base_url = PageConfig.getBaseUrl()

  export function getUrl(): string {
    if (!VNC_URL) {
      let theUrl = window.location.pathname;
      theUrl = theUrl.replace(/lab\/?$/, "");
      //VNC_URL=theUrl+'proxy/6080/vnc_lite.html?path='+theUrl+'proxy/6080';
      //base_url + 'novnc/?host=' + window.location.host + base_url + 'novnc/&resize=remote&autoconnect=1'
      VNC_URL = theUrl + base_url + 'novnc/?host=' + window.location.host + base_url + 'novnc/&resize=remote&autoconnect=1';
    }
    return VNC_URL;
  }

  export function setUrl(url: string): void {
    //VNC_URL=url;
  }
}

export default extension;

