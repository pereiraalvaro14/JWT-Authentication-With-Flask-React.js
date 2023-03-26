"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from pickle import APPEND, APPENDS
from xmlrpc.client import Boolean
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['GET'])
def getUsers():

    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))

    response_body = {
        "data": users
    }

    return jsonify(response_body), 200

@api.route('/user/<id>', methods=['GET'])
def getUser(id):

    user = User.query.get(id)
    if user is None:
        return "Not found"

    user = user.serialize()

    response_body = {
        "data": user
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def saveUser():

    data = request.json

    user = User(email=data['email'], password=
        data['password'], is_active=Boolean(data['is_active']))
    db.session.add(user)
    db.session.commit()

    response_body = {
        "data": "saved"
    }

    return jsonify(response_body), 200

    
        