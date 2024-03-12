FROM centos:latest
RUN yum install net-tools -y
RUN yum install httpd -y
RUN yum install python3 -y
RUN yum install mariadb
RUN yum install mariadb-devel
RUN yum install mariadb-server
COPY requirements.txt /../backend/requirements.txt
RUN pip3 install -r /../backend/requirements.txt
COPY main.py /../backend/main.py
WORKDIR /../backend
ENTRYPOINT ["python3", "main.py"]
EXPOSE 3000 5050