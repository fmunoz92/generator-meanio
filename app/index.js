'use strict';
var util = require('util'),
	path = require('path'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.Base.extend({
  	init: function () {
		this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

		console.log(this.yeoman);

	},

	askForApplicationDetails: function() {
		var done = this.async();

		var prompts = [{
			name: 'moduleName',
			message: 'What would you like to call your module?',
			default: 'articles'
		}];

		this.prompt(prompts, function(props) {
			this.name = props.moduleName;

			this.slugifiedName = this._.slugify(this.name);

			this.slugifiedPluralName = inflections.pluralize(this.slugifiedName);
			this.slugifiedSingularName = inflections.singularize(this.slugifiedName);

			this.camelizedPluralName = this._.camelize(this.slugifiedPluralName);
			this.camelizedSingularName = this._.camelize(this.slugifiedSingularName);

			this.classifiedPluralName = this._.classify(this.slugifiedPluralName);
			this.classifiedSingularName = this._.classify(this.slugifiedSingularName);

			this.humanizedPluralName = this._.humanize(this.slugifiedPluralName);
			this.humanizedSingularName = this._.humanize(this.slugifiedSingularName);

			done();
		}.bind(this));
	},

	renderModule: function() {
		// Create module folder
		this.mkdir('public/' + this.slugifiedPluralName);

		// Render angular module files
		this.template('angular-module/config/_.client.routes.js', 'public/' + this.slugifiedPluralName + '/routes/' + this.slugifiedPluralName + '.js');
		this.template('angular-module/controllers/_.client.controller.js', 'public/' + this.slugifiedPluralName + '/controllers/' + this.slugifiedPluralName + '.js');
		this.template('angular-module/services/_.client.service.js', 'public/' + this.slugifiedPluralName + '/services/' + this.slugifiedPluralName + '.js');

		// Render angular module views
		this.template('angular-module/views/_.create.client.view.html', 'public/' + this.slugifiedPluralName + '/views/create.html');
		this.template('angular-module/views/_.edit.client.view.html', 'public/' + this.slugifiedPluralName + '/views/edit.html');
		this.template('angular-module/views/_.list.client.view.html', 'public/' + this.slugifiedPluralName + '/views/list.html');
		this.template('angular-module/views/_.view.client.view.html', 'public/' + this.slugifiedPluralName + '/views/view.html');

		// Render angular module definition
		this.template('angular-module/_.client.module.js', 'public/' + this.slugifiedPluralName + '/' + this.slugifiedPluralName + '.js');
	}
});

module.exports = ModuleGenerator;