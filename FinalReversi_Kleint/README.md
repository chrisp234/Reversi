## Installation

#### Pre-reqs
- Have anaconda or miniconda installed
- Have postgresql@14 installed and running

```
conda create -n reversi python=3.11
conda activate reversi
```

Install dependencies using pip and requirements.txt
```
pip3 install -r requirements.txt
```

Create the database
```
createdb othello
```

## Running locally
To run locally, run 
```
sh start-dev.sh
```