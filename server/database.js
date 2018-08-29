const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const saltRounds = 10

// Connect to MongoDB
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/test';

// TODO: add try catches in the async await functions to handle un-anticipated errors
// Use connect method to connect to the server
const insertUser = async (user) => {	
	user._id = uuid()
	let db = await MongoClient.connect(url)

	// Validate whether user exists or not
	let res = await db.collection('user-data').findOne({email: user.email})
	if (res) return {status: {success: false, message: `User unsuccesfully registered: ${user.email} already exists` }, email: '', uuid: ''}
	
	// Insert user
	else {
		let hash = await bcrypt.hash(user.password, saltRounds)
		user.password = hash
		let insert = await db.collection('user-data').insertOne(user)
		db.close()

		if (insert) return { status: {success: true, message: 'User succesfully registered' }, email: user.email, uuid: user._id }
		else return { status: {success: false, message: "User unsuccesfully registered" }, email: '', uuid: ''} }
}

const getUserByEmail = async (user) => {
	let db = await MongoClient.connect(url)
	let res = await db.collection('user-data').findOne({email: user.email})
	let lps = await db.collection('learning-paths').find({userId: res._id}).toArray()
	lps = lps.map(e => e.input)
	db.close()
	let pwdCheck = await bcrypt.compare(user.password, res.password)

	if (pwdCheck) return { status: {success: true, message: 'User succesfully logged in' }, email: res.email, uuid: res._id, learningPaths: lps }
	else return	{ status: {success: false, message: 'User unsuccesfully registered: Password does not match' }, email: '', uuid: ''}
}

const getUserById = async (userId) => {
	let db = await MongoClient.connect(url)
	let res = await db.collection('user-data').findOne({_id: userId})
	let lps = await db.collection('learning-paths').find({userId: userId}).toArray()
	lps = lps.map(e => e.input)
	db.close()
	if (res) return { status: {success: true, message: "User succesfully logged in" }, email: res.email, uuid: res._id, learningPaths: lps}
	else return { status: {success: false, message: "User unsuccesfully logged in", email: '', uuid: ''} }
}

const insertLearningPath = async (learningObj) => {
	learningObj._id = uuid()
	let db = await MongoClient.connect(url)
	let insert = await db.collection('learning-paths').insertOne(learningObj)
	db.close()
	if (insert) return { status: {success: true, message:"Learning Path successfully registered"}, id: learningObj._id }
	else return { status: {success: false, message:"Learning Path unsuccessfully registered"}, id: '' }
}

const findAndSetLearningPath = async (learningObj) => {
	let db = await MongoClient.connect(url)
	let update = await db.collection('learning-paths').findOneAndUpdate({_id: learningObj.pathId}, {$set: {input: learningObj.input, name: learningObj.name}})
	db.close()
	if (update) return { status: {success: true, message:"Learning Path successfully updated"}, id: update.value._id }
	else return { status: {success: false, message:"Learning Path unsuccessfully updated"}, id: '' }
}
  

module.exports = {
	insertUser,
	getUserByEmail,
	getUserById,
	insertLearningPath,
	findAndSetLearningPath
	}
