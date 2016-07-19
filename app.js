App = {
    load: [
        'falling-blocks'
    ],

    m: {}, // modules

    activeM: null,

    new: function(id,cfg){
        App.m[id] = {
            id:    id,
            title: id,
            $view: null,
            init:  function(){},
            open:  function(){},
            close: function(){}
        };

        $.extend(App.m[id],cfg);

        $('.app-m-list').append('<p><a href="#'+ id +'" data-app-m="'+ id +'" class="ui-btn ui-btn-b ui-shadow ui-corner-all ui-btn-icon-right ui-icon-carat-r">'
            + App.m[id].title
            + '</a></p>');

        $('body').append('<div data-role="page" id="' + id + '" data-app-m="'+ id +'">'
            + '<a href="#home" data-role="close" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-notext ui-icon-home"></a>'
            + '</div>');

        App.m[id].$view = $('[data-app-m="'+ id +'"]');

        App.m[id].init();
    },

    init: function(){

        for (i in this.load) {
            var id = this.load[i];

            $.getScript('m/'+ id +'.js');
            $('<link/>', {rel: 'stylesheet', href: 'm/'+ id +'.css'}).appendTo('head');
        }

        $('body').on('pagecontainerchange',function(e, ui){
            if (App.activeM) {
                App.m[App.activeM].close();
                App.activeM = null;
            }

            var id = $(ui.toPage[0]).attr('data-app-m');

            if (id) {
                App.m[id].open();
                App.activeM = id;
            }
        });

    }, // init()
};
//----------------------------------------------------------------------------------------------------------------------

Math.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};