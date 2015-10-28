;(function($) {

    $.Msg = function(text, options){

        // настройки по умолчанию
        var defaults = {
            type:'',
            containerClass:'msg',
            renderTo:'body',
            renderMethod:'prepend', // prepend, append, after, before
            displayClose:true,
            hidePrev:true,
            timeout:5000,
            clearTimeoutOnHover:true
        };

        // текущий объект
        var obj = $(this);

        // сливаем настройки плагина
        obj.opts = $.extend({}, defaults, options);

        // инициализация сообщения
        var init = function(){

            // скрываем предыдущее сообщение
            if(obj.opts.hidePrev === true)
            {
                $('.' + obj.opts.containerClass).remove();
            }

            // создаем контейнер сообщения
            obj.cont = $('<div>', {
                class:obj.opts.containerClass +' '+ obj.opts.type,
                html:text
            });

            // задаем контейнеру opacity:0 для анимации
            obj.cont.css({opacity:0});

            // создаем кнопку для закрытия сообщения
            if(obj.opts.displayClose === true)
            {
                // создаем элемент кнопки
                obj.closeBtn = $('<a>', {
                    class:'close'
                });

                // добавляем кнопку к контейнеру
                obj.closeBtn.prependTo(obj.cont);

                // биндим закрытие по клику на кнопку
                obj.closeBtn.bind('click', function(){
                    destroy();
                });
            }

            // автоматически скрываем сообщение по таймауту
            if(obj.opts.timeout && obj.opts.timeout > 0)
            {
                startCounter();

                if(obj.opts.clearTimeoutOnHover === true)
                {
                    obj.cont.bind('mouseenter', function(){
                        clearCounter();
                    });

                    obj.cont.bind('mouseleave', function(){
                        startCounter();
                    });
                }
            }

            // рендерим сообщение
            render();

            // возвращаем ссылку на объект
            return obj;
        };

        // отрисовка сообщения в DOM
        var render = function(){

            var elem = $(obj.opts.renderTo + ':first');

            switch(obj.opts.renderMethod){
                case 'append':
                    $(obj.cont).appendTo(elem);
                    break;
                case 'prepend':
                    $(obj.cont).prependTo(elem);
                    break;
                case 'after':
                    $(elem).after(obj.cont);
                    break;
                case 'before':
                    $(elem).before(obj.cont);
                    break;
                default:
                    $(obj.cont).prependTo('body');
            }

            // анимируем контейнер до opacity:1
            obj.cont.animate({opacity:1}, 300);
        };

        // удаление сообщения из DOM
        var destroy = function(){

            // анимируем контейнер до opacity:0 и удаляем из DOM
            obj.cont.animate({opacity:0}, 150, function(){
                obj.cont.remove();
            });

        };

        // старт таймаута сообщения
        var startCounter = function(){
             obj.timer = setTimeout(function(){
                destroy();
             }, obj.opts.timeout);
        };

        // сброс таймаута сообщения
        var clearCounter = function(){
            clearTimeout(obj.timer);
        };

        // и погнали...
        return init();
    }

})(jQuery);