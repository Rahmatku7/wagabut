const {db} = require("../configs/database.js");
table      = 'wallets';

exports.findOne = async function(filters=[]) {
	const qb = db(table);
	filters.push(['whereRaw', `${table}.deleted_at is null`]);
	filter = Object.assign([], [
		['select', '*']
	], filters);

	filter.forEach((v, k)=>{
	    const params = Object.assign([], v);
	    params.splice(0,1);
	    qb[v[0]](...params);
	})
	return qb.first();
}

exports.findAll = async function(filters=[]) {
	const qb = db(table);
	filters.push(['whereRaw', `${table}.deleted_at is null`]);
	filter = Object.assign([], [
		['select', '*']
	], filters);

	filter.forEach((v, k)=>{
	    const params = Object.assign([], v);
	    params.splice(0,1);
	    qb[v[0]](...params);
	})
	return qb;
}

exports.insert = async function(data) {
	data = Object.assign({}, {
		created_at: new Date()
	}, data);
	db(table).insert(data).catch((err) => console.log(err));
}

exports.update = async function(id, data) {
	data = Object.assign({}, {
		updated_at: new Date()
	}, data);
	db(table).where({"id":id}).update(data).catch((err) => console.log(err));
}

exports.delete = async function(id, data) {
	data = Object.assign({}, {
		deleted_at: new Date()
	}, data);
	db(table).where({"id":id}).update(data).catch((err) => console.log(err));
}