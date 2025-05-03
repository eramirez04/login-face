FROM python:3.10-slim


WORKDIR /app


COPY requirements.txt /app/

RUN pip install --upgrade pip

# Instala dependencias del sistema necesarias para OpenCV y otras
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxrender1 \
    libxext6 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*


RUN apt-get update && apt-get install -y wait-for-it \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r requirements.txt


COPY . /app/


EXPOSE 8000


CMD [ "python", "manage.py" ,"runserver", "0.0.0.0:8000" ]