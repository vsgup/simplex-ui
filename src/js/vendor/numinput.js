;(function($) {

    $.fn.numinput = function(options){

        // настройки по умолчанию
        var defaults = {
            min:0,
            max:9999,
            step:1
            //icon1:'icon-minus',
            //icon2:'icon-plus',
        };

        // инициализация плагина
        var init = function(){

            // текущий объект
            var obj = $(this);

            // сливаем настройки
            obj.opts = $.extend({}, defaults, options, obj.data());

            // получаем значение объекта
            obj.opts.value = getValue(obj);

            // проверяем значение объекта
            checkValue(obj);

            // получаем состояние объекта
            obj.opts.disabled = obj.prop('disabled');

            // создаем контейнер
            obj.cont = $('<div>', { class:'sx-numinput' });

            // обварачиваем объект контейнером
            obj.wrap(obj.cont);

            // создаем кнопку "меньше", , цепляем bind
            obj.decrement = $('<a>', { class:'btn', html:'<i class="icon-minus"></i>' });

            // отрисовываем кнопку "меньше" в DOM
            obj.decrement.insertBefore(obj, null);

            // цепляем обработчик на кнопку "меньше"
            obj.decrement.bind('click', function(){
                decrementValue(obj);
            });

            // создаем кнопку "больше"
            obj.increment = $('<a>', { class:'btn', html:'<i class="icon-plus"></i>' });

            // отрисовываем кнопку "больше" в DOM
            obj.increment.insertAfter(obj);

            // цепляем обработчик на кнопку "больше"
            obj.increment.bind('click', function(){
                incrementValue(obj);
            });

            // цепляем обработчик при потере фокуса
            obj.bind('blur', function(){
                checkValue(obj);
            });

            // цепляем обработчик при нажатии клавишь
            obj.bind('keydown', function(e){
                if(!obj.opts.disabled)
                {
                    if(e.keyCode == 38 || e.keyCode == 39)
                    {
                        incrementValue(obj);
                    }
                    else if(e.keyCode == 37 || e.keyCode == 40)
                    {
                        decrementValue(obj);
                    }
                }
            });

            // возвращаем ссылку на объект
            return obj;
        };

        // получаем значение
        var getValue = function(obj){
            return parseInt(obj.val());
        };

        // проверка числа
        var checkValue = function(obj){

            var value = getValue(obj);

            if(isNaN(value) || value < obj.opts.min)
            {
                obj.val(obj.opts.min);
            }

            else if(value > obj.opts.max)
            {
                obj.val(obj.opts.max);
            }

            else
            {
                value = value.toString().replace(/[^0-9-]/g, '');
                obj.val(value);
            }
        };

        // увеличение числа
        var incrementValue = function(obj){

            if(obj.opts.disabled) return;

            var value = (getValue(obj) + parseInt(obj.opts.step));

            if(value <= obj.opts.max)
            {
                obj.val(value);
            }

            else obj.val(obj.opts.max);
        };

        // уменьшение числа
        var decrementValue = function(obj){

            if(obj.opts.disabled) return;

            var value = (getValue(obj) - parseInt(obj.opts.step));

            if(value >= obj.opts.min)
            {
                obj.val(value);
            }

            else obj.val(obj.opts.min);

        };

        // погнали...
        return this.each(init);

    };

})(jQuery);

$(function(){
    $('input[type=number]').numinput();
});