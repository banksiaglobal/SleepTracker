FROM python:3.9-slim as base
WORKDIR /code
COPY ./ /code
RUN pip install -r /code/requirements.txt --no-cache-dir
EXPOSE 8000
CMD ["cd", "src"]
CMD [ "uvicorn", "sleepTrack.app:app", "--reload"]