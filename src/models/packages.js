const database = require("../configs/database.js");

class $ extends database {
	static table_name = 'packages';

	static findOne = async function(filters=[]) {
		const qb = $.table(this.table_name);
		filters.push(['whereRaw', `${this.table_name}.deleted_at is null`]);
		const filter = Object.assign([], [
			['select', '*']
		], filters);

		filter.forEach((v, k)=>{
		    const params = Object.assign([], v);
		    params.splice(0,1);
		    qb[v[0]](...params);
		})
		return qb.first();
	}

	static findAll = async function(filters=[]) {
		const qb = $.table(this.table_name);
		filters.push(['whereRaw', `${this.table_name}.deleted_at is null`]);
		const filter = Object.assign([], [
			['select', '*']
		], filters);

		filter.forEach((v, k)=>{
		    const params = Object.assign([], v);
		    params.splice(0,1);
		    qb[v[0]](...params);
		})
		return qb;
	}

	static insert = async function(data) {
		data = Object.assign({}, {
			created_at: new Date()
		}, data);
		$.table(this.table_name).insert(data).catch((err) => console.log(err));
	}

	static update = async function(id, data) {
		data = Object.assign({}, {
			updated_at: new Date()
		}, data);
		$.table(this.table_name).where({"id":id}).update(data).catch((err) => console.log(err));
	}

	static delete = async function(id, data) {
		data = Object.assign({}, {
			deleted_at: new Date()
		}, data);
		$.table(this.table_name).where({"id":id}).update(data).catch((err) => console.log(err));
	}

}

module.exports = $;