import sys
from flask import Flask
from flask import render_template, url_for, request
from flask_sqlalchemy import SQLAlchemy
import os
from firebase import firebase as fb

app = Flask(__name__)
app.config.from_pyfile('../config.py')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'

@app.route('/home')
def home():
	return render_template(
		'home.html'
		)

@app.route('/login')
def login():
	return render_template(
		'login.html'
		)

@app.route('/mentor-signup')
def mentor_signup():
	return render_template(
		'mentor-signup.html'
		)

@app.route('/mentee-signup')
def mentee_signup():
	return render_template(
		'mentee-signup.html'
		)

@app.route('/login-user', methods=['POST'])
def login_user():
	return render_template(
		'splash.html'
		)

@app.route('/loading', methods=['POST'])
def loading():
	email = request.form['email']
	
	firebase = fb.FirebaseApplication("https://painpals-medhacks2017.firebaseio.com", None)
	result = firebase.get('/mentees', None)

	menteeId = ""
	for mId in result:
		if result[mId]['email'] == email:
			menteeId = mId

	return render_template(
		'loading.html',
		menteeId=menteeId
		)

@app.route('/get-mentor', methods=['POST'])
def get_mentor():
	mentorId = request.form['mentorId']
	menteeBio = request.form['menteeBio']
	menteeId = request.form['menteeId']
	firebase = fb.FirebaseApplication("https://painpals-medhacks2017.firebaseio.com", None)
	result = firebase.get('/mentors', None)

	mentorName = ""
	mentorBio = ""
	for mId in result:
		if mId == mentorId:
			mentorName = result[mId]['name']
			mentorBio = result[mId]['bio']

	result = firebase.get('/mentees', None)

	menteeName = ""
	for mId in result:
		if mId == menteeId:
			menteeName = result[mId]['name']

	return render_template(
		'mentor-assigned.html',
		mentorName=mentorName,
		mentorBio=mentorBio,
		menteeName=menteeName,
		menteeBio=menteeBio
		)