# Reversi
 
- If you are using a Windows machine, make sure python is installed properly by typing `pip freeze`. If it gives an error, download python 3.11 online and check the box that says "add to PATH" before finishing installation. Or use WSL.

- Clone this repo onto your computer somewhere. This can be done using `git` on the command line or more easily by installing github desktop since github is annoying with credentials now.

- Install vscode and `cd` to this repo

- Run `pip install pipenv`. Pipenv is my current python environment manager of choice because it is so easy to use and fast. For us, it provides two nice things:

  - `Pipfile` management for dependencies. When you want to add a dependency to the project, run `pipenv install $somedependency$` and it will be added to the Pipfile. The other users in this project will now be able to make use of this dependency by running `pipenv update`, which will install all dependencies.
  - A python virtual environment. To run programs within the environment defined by the Pipfile, type `pipenv shell` and your terminal will enter into the project python environment. This environment can be selected in vscode to give intellisense suggestions and allow you to run programs.

- Run `pipenv update`. This will install any dependencies. If there is a python version warning, find and install `pyenv` online for managing python versions. We can easily change python version from 3.11 to anything else that works better with our dependencies if need be by modifying the Pipfile.

- Run `pipenv shell`. This will start a virtual environment with our dependencies installed.

- Select the pipenv virtual environment as your interpreter in vscode. This can be done by clicking the button on the bottom right hand corner of the window that says "Python 3.11" (or whatever version is installed on your system) - a dropdown will open which should contain a interpreter that says "CapsDrone" on it, or the random code output by pipenv when you performed the last step.

- If you open a file which has imports at the top, you should not see a yellow squiggly underneath any imported libraries. If you do, try restarting vscode.

By using these tools we'll have an easy and consistent way to make sure any code we write works with any code anyone else writes. It may be annoying getting them spun up but it will make life much easier in the long run.