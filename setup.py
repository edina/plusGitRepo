#!/usr/bin/env python
import pathlib

from setuptools import find_packages, setup

# The directory containing this file
HERE = pathlib.Path(__file__).parent

# The text of the README file
README = (HERE / "README.md").read_text()

setup(
      name="plusGitRepo",
      version="0.1.1",
      license='3-clause BSD',
      url="https://github.com/edina/plusGitRepo/",
      description="Jupyter Classic Notebook extension to add a dialogue to gather info for the nbgitpuller extension",
      long_description=open('README.md').read(),
      long_description_content_type='text/markdown',
      author="James Crone, Ian Stuart",
      author_email='edina@ed.ac.uk',
      packages=find_packages(),
#      packages=['plusGitRepo'],
      package_data={'plusGitRepo': ['main:/*']},
      install_requires=['nbgitpuller>=0.9.0'],
      include_package_data=True,
      classifiers=[
            'Development Status :: 4 - Beta',
            'License :: OSI Approved :: BSD License',
            'Operating System :: POSIX',
            'Operating System :: MacOS',
            'Operating System :: Unix',
            'Programming Language :: Python :: 3',
            'Topic :: Software Development :: Libraries :: Python Modules',
      ],
      data_files=[
            ("share/jupyter/nbextensions/plusGitRepo", ['plusGitRepo/main/index.js']),
      ]
)
