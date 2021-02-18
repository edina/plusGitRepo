FROM jupyter/minimal-notebook

USER root
# RUN pip install git+git://github.com/edina/plusGitRepo.git#egg=plusGitRepo
WORKDIR /srv
COPY . plusGitRepo
RUN pip install /srv/plusGitRepo/
RUN jupyter serverextension enable --py nbgitpuller --sys-prefix \
    && jupyter nbextension enable --py plusGitRepo

USER $NB_USER
WORKDIR $HOME