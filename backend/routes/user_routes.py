from flask import Blueprint

from backend.controllers.user_controller import register_user, login_user, update_user, get_user, delete_user
from backend.middleware.auth_middleware import protected

register = Blueprint('register', __name__)
login = Blueprint('login', __name__)
update = Blueprint('update', __name__)
profile = Blueprint('profile', __name__)
delete = Blueprint('delete', __name__)


@register.route('/register', methods=['POST'])
def register_route():
    return register_user()


@login.route('/login', methods=['POST'])
def login_route():
    return login_user()


@login.route('/update', methods=['PUT'])
@protected
def update_route():
    return update_user()


@profile.route('/profile', methods=['GET'])
@protected
def profile_route():
    return get_user()


@profile.route('/delete', methods=['DELETE'])
@protected
def delete_route():
    return delete_user()
