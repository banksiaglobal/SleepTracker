FROM python:3.9-slim as base
WORKDIR /code
COPY ./ /code
RUN pip install -r /home/opt/requirements.txt --no-cache-dir 
EXPOSE 8000
CMD [ "uvicorn", "src.sleepTrack.app:app", "--reload",  "--host", "0.0.0.0", "--port", "8000"]