import {
  ICommandPalette,
} from '@jupyterlab/apputils';

import {
  ISettingRegistry
} from '@jupyterlab/settingregistry';

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
 * Initialization data for the jupyterlab-vnc extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: '@tlkh/jupyterlab-vnc:plugin',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer, IMainMenu, ISettingRegistry],
  optional: [ILauncher],
  activate: (app: JupyterLab, launcher: ILauncher) => {
    let commandId = 'x11vnc:open';
    app.commands.addCommand(commandId, {
      label: 'Open Desktop',
      execute: () => {
        window.open(Private.getUrl(), '_blank');
      }
    });
    let command : ILauncher.IItemOptions = {
      command: commandId,
      category: 'Other'
    };
    launcher.add(command);
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

