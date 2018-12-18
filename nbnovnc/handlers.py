from notebook.utils import url_path_join as ujoin
from nbserverproxy.handlers import AddSlashHandler, SuperviseAndProxyHandler

class NoVNCHandler(SuperviseAndProxyHandler):
    '''Supervise novnc, websockify, and a VNC server.'''
    def initialize(self, state):
        # print("NoVNCHandler Init: %s" % state)
        super().initialize(state)

    def get_cmd(self):
        return ['/apps/share64/debian7/noVNC/startNB']

    async def get(self, path):
        '''
        When clients visit novnc/, actually get novnc/vnc.html.

        vnc_lite.html (fomerly vnc_auto.html) was described as an example of
        how to use novnc, rather than a supported frontend, so we do not use
        it.
        '''
        if len(path) == 0:
            filename = 'vnc.html'
            if os.path.exists(os.path.join(self.c.novnc_directory, filename)):
                path = filename
        return await super().get(path)

def setup_handlers(web_app):
    web_app.add_handlers('.*', [
        (ujoin(web_app.settings['base_url'], 'novnc/(.*)'), NoVNCHandler,
            dict(state={})),
        (ujoin(web_app.settings['base_url'], 'novnc'), AddSlashHandler)
    ])
