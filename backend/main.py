from flask import Flask

from config.env_config import PORT
from controllers.user_controller import create_table
from routes.user_routes import register, login, profile, update, delete

app = Flask(__name__)

app.register_blueprint(register)
app.register_blueprint(login)
app.register_blueprint(profile)
app.register_blueprint(update)
app.register_blueprint(delete)

if __name__ == '__main__':
    create_table()
    app.run(debug=True, port=PORT)
