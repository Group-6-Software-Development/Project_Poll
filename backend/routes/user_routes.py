from flask import Blueprint

from controllers.user_controller import register_user, login_user, update_user, get_user, delete_user
from middleware.auth_middleware import protected

user_register = Blueprint('user_register', __name__)
user_login = Blueprint('user_login', __name__)
user_update = Blueprint('user_update', __name__)
user_get = Blueprint('user_get', __name__)
user_delete = Blueprint('user_delete', __name__)


@user_register.route('/api/user/register', methods=['POST'])
def register_route():
    return register_user()


@user_login.route('/api/user/login', methods=['POST'])
def login_route():
    return login_user()


@user_update.route('/api/user/update', methods=['PUT'])
@protected
def update_route():
    return update_user()


@user_get.route('/api/user/profile', methods=['GET'])
@protected
def profile_route():
    return get_user()


@user_delete.route('/api/user/delete', methods=['DELETE'])
@protected
def delete_route():
    return delete_user()
