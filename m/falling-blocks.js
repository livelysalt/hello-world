App.new('falling-blocks',{
    title: 'Falling Blocks',

    init: function() {
        console.log('init',this.id);
    }, // init()

    open: function() {
        console.log('open',this.id);
        this.run();
    }, // open()

    close: function() {
        console.log('close',this.id);
    }, // close()

    //------------------------------------------------------------------------------------------------------------------

    x:     null,
    sound: null,

    qty: 4,

    blocks: [],

    tts: {
        domain: '//api.voicerss.org',
        key:    'd9d0d46d0c9c448baf43dc831fc7eca8',
        hl:     'en-us',
        url: function(src) {
            return this.domain +'/?key='+ this.key +'&hl='+ this.hl +'&src='+ src;
        }
    },

    run: function() {

        /*
        this.x = Number(Math.randomInt(1000, 9999));

        var x_str = this.x.toLocaleString(),
            src   = this.tts.url(x_str);

        console.log('rand:',this.x,'|str:',x_str,'|',src);
        this.sound = new Howl({
            src: [ src ],
            format: 'mp3',
            autoplay: true,
            onplay: function() {
                console.log('onplay',this);
            },
        });*/

        this.$view.on('click', '.block', function(){
            console.log('click:',$(this).attr('data-x'));
        });

        for (i = 0; i < this.qty; i++) {
            var x   = Number(Math.randomInt(1000, 9999)),
                pct = (100/this.qty);

            this.blocks[i] = {
                x: x,
                $el: this.$view.append('<div class="column" style="width:'+ pct +'%; left:'+ (pct*i) +'%;">'
                    + '<div class="block" data-x="'+ x +'">'+ x.toLocaleString() +'</div></div>')
            }
        }
    }

});