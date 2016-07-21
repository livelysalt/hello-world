App.new('listening',{
    title: 'Listening',

    num:   null,

    sounds: {},

    steps: 20,

    qty: 4,

    i: null,

    time: 3,

    timer: null,

    tts: {
        domain: '//api.voicerss.org',
        key:    'd9d0d46d0c9c448baf43dc831fc7eca8',
        hl:     'en-us',
        r: -3,
        url: function(src) {
            return this.domain +'/?key='+ this.key +'&hl='+ this.hl +'&r='+ this.r +'&src='+ src;
        }
    },

    //------------------------------------------------------------------------------------------------------------------

    init: function() {
        console.log('init',this.id);

        var $this = this;

        this.sounds.yes    = new buzz.sound("sounds/yes-chimes.mp3");
        this.sounds.no     = new buzz.sound("sounds/no-buzz.mp3");
        this.sounds.bounce = new buzz.sound("sounds/bounce.mp3");

        this.$m.append('<div id="guide"></div>');
        this.$guide = $('#guide');

        var pct = (100/this.qty);

        for (i = 0; i < this.qty; i++) {
            this.$view.append('<div class="column" data-i="' + i + '" style="width:' + pct + '%; left:' + (pct * i) + '%;"></div>');
        }

        this.$view.on('click', '.block:not(.done)', function() {
            $this.$view.find('.block:not(.done)').addClass('done');

            var yes = $(this).hasClass('i');

            $(this).addClass('selected '+ (yes ? 'yes' : 'no'));

            $this.sounds[yes ? 'yes' : 'no'].play();

            $this.timer = window.setTimeout(function(){
                $this.run();
            }, 2 * 1000);
        });
    }, // init()

    //------------------------------------------------------------------------------------------------------------------

    open: function() {
        console.log('open',this.id);

        var $this = this;

        var btime = 2;

        this.$guide.animate({bottom:0},btime * 1000,'easeOutBounce');
        window.setTimeout(function(){
            $this.sounds.bounce.play();
        }, btime * 400);

        this.run();
    }, // open()

    //------------------------------------------------------------------------------------------------------------------

    close: function() {
        console.log('close',this.id);
    }, // close()

    //------------------------------------------------------------------------------------------------------------------

    clear: function() {

        this.$view.find('.column .block').remove();

    }, // clear()

    //------------------------------------------------------------------------------------------------------------------

    run: function() {
        this.clear();

        var $this = this;

        this.i = Math.randomInt(0, this.qty-1);

        for (i = 0; i < this.qty; i++) {
            var num = Number(Math.randomInt(1000, 9999));

            if (i == this.i) this.num = num;

            this.$view.find('.column[data-i="'+ i +'"]')
                .append('<div class="block hidden'+ (i == this.i ? ' i' : '') +'" data-num="'+ num +'">'+ num.toLocaleString() +'</div>');
        }

        var num_str = this.num.toLocaleString(),
            src   = this.tts.url(num_str);

        new buzz.sound(src, {
            autoplay: true
        }).bind('ended',function(){
            $this.timer = window.setTimeout(function(){
                $this.$view.find('.block.hidden').removeClass('hidden');
            },$this.time * 1000);
        });
    }

    //------------------------------------------------------------------------------------------------------------------

});