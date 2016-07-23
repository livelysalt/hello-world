App = {
    load: [
        'listening'
    ],

    m: {}, // modules

    activeM: null,

    sayCfg: {
        domain: '//api.voicerss.org',
        key:    'd9d0d46d0c9c448baf43dc831fc7eca8',
        hl:     'en-us',
        r:      -3
    },

    //------------------------------------------------------------------------------------------------------------------

    say: function(text,cfg) {
        if (typeof cfg != 'object') cfg = {};
        cfg = $.extend({}, this.sayCfg, cfg);
        var src = cfg.domain +'/?key='+ cfg.key +'&hl='+ cfg.hl +'&r='+ cfg.r +'&src='+ text;

        if (Howl) {
            return new Howl({
                src: [src],
                format: ['mp3']
            });
        }
    }, // say()

    //------------------------------------------------------------------------------------------------------------------

    new: function(id,cfg){
        App.m[id] = {
            id:    id,
            title: id,
            $m:    null,
            $view: null,
            init:  function(){},
            open:  function(){},
            close: function(){}
        };

        $.extend(App.m[id],cfg);

        $('.app-m-list').append('<p><a href="#'+ id +'" data-app-m-target="'+ id +'" class="ui-btn ui-btn-b ui-shadow ui-corner-all ui-btn-icon-right ui-icon-carat-r">'
            + App.m[id].title
            + '</a></p>');

        $('body').append('<div data-role="page" id="' + id + '" data-app-m="'+ id +'">'
            + '<a href="#home" data-role="close" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-notext ui-icon-home"></a>'
            + '<div data-role="view"></div>'
            + '</div>');

        App.m[id].$m    = $('[data-app-m="'+ id +'"]');
        App.m[id].$view = App.m[id].$m.find('[data-role="view"]');

        App.m[id].init();
    }, // new()

    //------------------------------------------------------------------------------------------------------------------

    init: function(){

        for (i in this.load) {
            var id = this.load[i];

            $.getScript('m/'+ id +'.js');
            $('<link/>', {rel: 'stylesheet', href: 'm/'+ id +'.css'}).appendTo('head');
        }

        $('body').on('pagecontainerchange',function(e, ui){
            if (App.activeM) {
                App.m[App.activeM].close();
                App.m[App.activeM].$view.html('');
                App.activeM = null;
            }

            var id = $(ui.toPage[0]).attr('data-app-m');

            if (id) {
                App.m[id].open();
                App.activeM = id;
            }
        });

    } // init()
};
//----------------------------------------------------------------------------------------------------------------------

Math.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};