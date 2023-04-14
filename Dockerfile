FROM python:3.9-slim-bullseye
RUN python3 -m venv /opt/venv

# install dependencies:
COPY requirements.txt .
RUN . /opt/venv/bin/activate && pip install -r requirements.txt

# run the application:
COPY ./ /opt
CMD . /opt/venv/bin/activate && cd opt/src && uvicorn sleepTrack.app:app --reload --host 0.0.0.0 --port 9000
