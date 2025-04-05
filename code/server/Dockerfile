FROM python:3.13.0-slim-bookworm


WORKDIR /server

# install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .