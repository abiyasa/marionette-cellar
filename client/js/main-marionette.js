/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, forin: true, maxerr: 50, regexp: true */
/*global console, window, Backbone */

// Models
var Wine = Backbone.Model.extend({
    urlRoot: '../api/wines',
    defaults: {
        'id': null,
        'name': '',
        'grapes': '',
        'country': 'Italy',
        'region': 'Tuscany',
        'year': '',
        'description': '',
        'picture': ''
    }
});

var WineCollection = Backbone.Collection.extend({
    model: Wine,
    url: '../api/wines'
});

// Views
var WineListItemView = Backbone.Marionette.ItemView.extend({
    template: '#tpl-wine-list-item',
    tagName: 'li'
});

var WineListView = Backbone.Marionette.CompositeView.extend({
    itemView: WineListItemView,
    tagName: 'ul',
    template: '#tpl-wine-list'
});

var HeaderView = Backbone.Marionette.ItemView.extend({
    template: '#tpl-header'
    /*
    events: {
        "click .new":"newWine"
    },

    newWine: function (event) {
        app.navigate("wines/new", true);
        return false;
    }
    */
});

// Main app
var MyApp = window.WineApp = new Backbone.Marionette.Application();
MyApp.addRegions({
    header: '#header',
    content: '#content',
    sidebar: '#sidebar'
});

// Router
var AppRouter = Backbone.Router.extend({

    routes: {
        '': 'list'
    },

    initialize: function () {
        'use strict';
        MyApp.start();
        MyApp.header.show(new HeaderView());
    },

    list: function () {
        'use strict';
        
        // prepare wine list
        this.wineList = new WineCollection();
        var self = this;
        this.wineList.fetch({
            success: function () {
                self.wineListView = new WineListView({
                    collection: self.wineList
                });
                
                MyApp.sidebar.show(self.wineListView);
                
                if (self.requestedId) {
                    self.wineDetails(self.requestedId);
                }
            }
        });
    }

});

// TODO better starting using marionette's router?
var app = new AppRouter();
Backbone.history.start();
