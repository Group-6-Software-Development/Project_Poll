# Backend

How to start the backend:

1. Run the command `pip install -r requirements.txt` to install the required packages.
2. Create a `.env` file using the `.env.example` file as a template.
3. Run the command `python main.py` or `python Flask.py` to run the backend
4. The backend will be running on `http://localhost:5000/`.
5. For running test check the `test_requirements.txt`

(NOTE) If you are on Linux, remove `mysqlclient` from requirements.txt before running pip install, and run the following command `sudo apt-get install python3-mysqldb`
