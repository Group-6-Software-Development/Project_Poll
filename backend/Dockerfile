FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libmariadb-dev-compat

ENV MYSQLCLIENT_CFLAGS="-I/usr/include/mysql"
ENV MYSQLCLIENT_LDFLAGS="-L/usr/lib/x86_64-linux-gnu -lmysqlclient -lpthread -lz -lm -lrt -latomic -lssl -lcrypto"

WORKDIR /app

COPY requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python3", "main.py"]