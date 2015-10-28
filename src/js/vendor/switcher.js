/* Simplex Switcher v0.1 */
(function(){

    $.fn.switcher = function(options){

        // настройки по умолчанию
        var defaults = {
            current:0,
            handle:'.btn',
            selected:'selected',
            color:'black',
            onChange:function(plugin){}
        };

        // инициализация плагина
        var init = function(){

            // текущий объект
            var plugin = $(this);

            // сливаем настройки
            plugin.settings = $.extend({}, defaults, options, plugin.data());

            // кнопка по умолчанию
            plugin.selectedButton = $(plugin.settings.handle, plugin).eq(plugin.settings.current);

            // класс выделенной кнопки
            plugin.settings.selected = plugin.settings.selected + ' ' + plugin.settings.color;

            // выделяем кнопку по умолчанию
            plugin.selectedButton.addClass(plugin.settings.selected).siblings(plugin.settings.handle, plugin).removeClass(plugin.settings.selected);

            // задаем значение инпута по умолчанию
            plugin.selectedValue = setValue(plugin.selectedButton, plugin);

            // переключаем кнопку
            plugin.on('click', plugin.settings.handle + ':not(.'+plugin.settings.selected+')', function(){
                switchHandle(plugin, this, plugin.settings.onChange);
            });

            // возвращаем объект плагина
            return plugin;
        };

        // задаем значение инпута
        var setValue = function(element, plugin){

            // получаем занчение кнопки
            var value = $(element).data('value');

            // если значение кнопки не определено
            if(value == undefined) value = null;

            // задаем параметр инпута
            $(plugin).find('input[type=hidden]:first').val(value);

            // возвращаем значение кнопки
            return value;
        };

        // переключаем кнопку
        var switchHandle = function(plugin, el, callback){

            // задаем значение инпута
            plugin.selectedValue = setValue(el, plugin);

            // выделяем нажатую кнопку
            $(el, plugin).addClass(plugin.settings.selected).siblings(el, plugin).removeClass(plugin.settings.selected);

            // execute callback function
            return callback(plugin);
        };

        return this.each(init);

    };

})(jQuery);