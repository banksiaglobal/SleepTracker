# Sheep’s Galaxy
## About

<p>This project demonstrates an application for sleep quality monitoring and analysis. <br />
Client side: TypeScript with Angular framework.<br />
Server side: Python with FastAPI and DB-API to connect to the database. <br />
Database: The database is hosted in InterSystems IRIS Cloud SQL, and we used one of its features, IntegratedML, to predict sleep quality.</p>

## Quick start

<p>Execute the following commands in the terminal to start the project:

```bash
git clone https://github.com/banksiaglobal/SleepTracker
```

```bash
docker compose up -d --build
```
The application backend is available at http://localhost:9000/ <br />
The application frontend is available at http://localhost:8080/
</p>

### InterSystems IRIS Cloud SQL

<p>To do this, set up a deployment in the IRIS Cloud SQL portal and write the connection parameters into docker-compose file in the environment section.</p>
 
### Filling with data

<p>The "sleeps" table of our database is populated with the generated data. To do this, run the following commands in the docker terminal:
1. activate virtual environment

```bash
/opt/venv/bin/activate
```

2. create tables

```bash
cd src
python .\sleepTrack\db_init.py
```

3. generate data

```bash
python .\sleepTrack\generator.py
```
</p>

###  IntegratedML

<p>The following sql queries are required to implement machine learning algorithms:

```sql
Create model sleep predicting (quality) from SQLUser.Sleeps
``` 
```sql
Train model sleeps
``` 

Here we create a machine learning model based on the Sleeps database table. For prediction, we specify the field "quality" ("quality of sleep", the user's sensation after sleep). <br />
As a result of training, we get prediction and probability_quality fields, which we use later, for example, in such a sql query:

```sql
SELECT PREDICT(sleeps use sleeps) as prediction, quality, 
PROBABILITY(sleeps use sleeps for '3') as probability_quality, * FROM SQLUser.Sleeps 
where user_id = 1 and id = 1
```
where the prediction field contains a prediction of the quality of sleep, the probability_quality field contains the probability that the dream will be "qualitative" based on its entered characteristics.

Thanks!
</p>

## Developers of project:
- Backend: [Maria Gladkova](https://community.intersystems.com/user/maria-gladkova)
- Frontend: [Katsiaryna Shaustruk](https://community.intersystems.com/user/katsiaryna-shaustruk)
- Backend: [Maria Nesterenko](https://community.intersystems.com/user/maria-nesterenko)