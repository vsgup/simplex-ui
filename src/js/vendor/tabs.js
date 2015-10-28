/* Simplex Tabs v0.2 */
(function(){

    $.fn.tabs = function(options){

        // настройки по умолчанию
        var defaults = {
            current:0,
            handle:'li',
            selected:'current',
            panes:'.panes',
            pane:'.pane',
            animation:130,
            onChange:function(plugin){}
        };

        // инициализация плагина
        var init = function(){

            // текущий объект
            var plugin = $(this);

            // сливаем настройки
            plugin.settings = $.extend({}, defaults, options, plugin.data());

            // выделяем текущую кнопку таба
            $(plugin.settings.handle, plugin).eq(plugin.settings.current).addClass(plugin.settings.selected).siblings(plugin.settings.handle, plugin).removeClass(plugin.settings.selected);

            // показываем только текущий таб
            $(plugin.settings.pane, plugin.settings.panes).eq(plugin.settings.current).css({display:'block'}).siblings(plugin.settings.pane, plugin.settings.panes).css({display:'none'});

            // переключаем таб по клику
            plugin.on('click', plugin.settings.handle + ':not(.'+plugin.settings.selected+')', function(){
                changeTab(plugin, this, plugin.settings.onChange);
            });
        };

        var changeTab = function(plugin, el, callback){
            $(el, plugin).addClass(plugin.settings.selected).siblings(el, plugin).removeClass(plugin.settings.selected);
            $(plugin.settings.pane, plugin.settings.panes).eq($(el).index()).fadeIn(plugin.settings.animation).siblings(plugin.settings.pane, plugin.settings.panes).css({display:'none'});
            return callback(plugin); // execute callback function
        };

        return this.each(init);

    };

})(jQuery);