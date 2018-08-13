const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const saltRounds = 10

// Connect to MongoDB
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the server
const insertUser = (user) => {	
	user._id = uuid()
	return MongoClient
		.connect(url)
		.then(db => db.collection('user-data').findOne({email: user.email})
				.then(res => {
					if (res) return {status: {success: false, message: `User unsuccesfully registered: ${user.email} already exists` }, email: '', uuid: ''}
					else {
						return bcrypt.hash(user.password, saltRounds).then(hash => {
							user.password = hash
							return db.collection('user-data').insertOne(user)
								.then(result => {
									console.log(result)
									db.close()
									return {status: {success: true, message: 'User succesfully registered' }, email: user.email, uuid: user._id}
								})
								.catch(err => { return {
										status: {success: false, message: `User unsuccesfully registered: ${err}` }, 
										email: '', 
										uuid: ''
									} 
								})
						})
					}
				})
		)
		.catch((err) => { console.log(err) })
}

const getUserByEmail = (user) => {
	return MongoClient
		.connect(url)
		.then(db => db.collection('user-data').findOne({email: user.email})
				.then(res => { db.close(); console.log(res); return res;})
				.then(res => bcrypt.compare(user.password, res.password)
					.then(v => v ? {status: {success: true, message: 'User succesfully logged in' }, email: res.email, uuid: res._id} : reject('Password does not match'))
					.catch(err => err)
				)
				.catch(err => { return {
						status: {success: false, message: `User unsuccesfully registered: ${err}` }, 
						email: '', 
						uuid: ''
					}
				})

		)
		.catch(err => { console.log(err); return err })
}

const getUserById = (userId) => {
	return MongoClient
		.connect(url)
		.then(db => {
			console.log(userId)
			return db.collection('user-data').findOne({_id: userId})
				.then(res => { 
					db.close() 
					console.log(res)
					return {status: {success: true, message: 'User succesfully logged in' }, email: res.email, uuid: res._id}
				})
				.catch(err => { return {
						status: {success: false, message: `User unsuccesfully registered: ${err}` }, 
						email: '', 
						uuid: ''
					}
				})

		})
		.catch(err => { console.log(err); return err })
}
  

module.exports = {
	insertUser,
	getUserByEmail,
	getUserById
}
