import setuptools

setuptools.setup(
    name="nbnovnc",
    version='0.1.1n',
    url="https://github.com/ryanlovett/nbnovnc",
    author="Ryan Lovett",
    author_email="rylo@berkeley.edu",
    description="Jupyter extension to proxy a VNC session via noVNC",
    packages=setuptools.find_packages(),
	keywords=['Jupyter'],
	classifiers=['Framework :: Jupyter'],
    install_requires=[
        'pyzmq >= 17',
        'tornado == 5.1.1',
        'notebook',
        'jupyter-server-proxy'
    ],
    package_data={'nbnovnc': ['static/*']},
)
