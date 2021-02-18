# This is called by the notebook
def _jupyter_nbextension_paths():
    return [{
        'section': 'tree',
        'src': 'main',
        'dest': 'plusGitRepo',
        'require': 'plusGitRepo/index'
    }]

def load_jupyter_server_extension(nbapp):
    web_app = nbapp.web_app

