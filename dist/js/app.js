window.onerror = function(msg){
    alert(msg);
    return true;
};

/* jQuery settings, plugins, etc */
$(function(){

    // Chosen
    $("select").chosen({
        allow_single_deselect:true,
        search_contains:true,
        max_selected_options:15,
        no_results_text:"Совпадений не найдено",
        placeholder_text_multiple:"Выберите опции",
        display_disabled_options:true, // default
        display_selected_options:true  // default
    });

    // Tabs
    $('.sx-tabs').tabs();

    // Swither
    $('.sx-switcher').switcher();

    // Fancybox
    $('[rel="zoom"]').fancybox();

    $('.open-modal').fancybox({
        type:'ajax',
        openEffect:'none',
        closeEffect:'none',
        wrapCSS:'fancybox-simplex',
        scrolling:'visible',
        helpers: {
            overlay:null,
            title:null
        }
    });

    // Datepicker
    $('.datepicker').Zebra_DatePicker({
        offset:[10, 185]
    });

    // tooltips
    new $.Zebra_Tooltips($('.tooltip'));

    // Datatables defaults
    $.extend($.fn.DataTable.defaults, {
        dom:'t<"row"<"width-50"p><"width-50"i>>',
        lengthChange:false,
        //searching:false,
        autoWidth:false,
        stateSave:false,
        pageLength:15,
        pagingType:'full_numbers',
        order:[],
        language: {
            emptyTable:'таблица не содержит записей',
            info:'записи с _START_ по _END_ из _TOTAL_',
            infoEmpty:'нет записей для отображения',
            infoFiltered:'(отфильтр. из _MAX_)',
            infoPostFix:'',
            thousands:'.',
            lengthMenu:'показать _MENU_ записей',
            loadingRecords:'загрузка данных, пожалуйста подождите...',
            processing:'загрузка данных, пожалуйста подождите...',
            search:'Поиск:',
            zeroRecords:'таблица не содержит записей',
            paginate:{
                first:'первая',
                last:'последняя',
                next:'&rarr;',
                previous:'&larr;'
            },
            'aria':{
                sortAscending:': активировать для сортировки столбца по возрастанию',
                sortDescending:': активировать для сортировки столбцов по убыванию'
            }
        },
        drawCallback:function(settings){

            var api = this.api(),
                size = api.$('tr', {filter:'applied'}).length;

            $(settings.nTableWrapper).find('.dataTables_paginate')[0].style.visibility = (size > settings._iDisplayLength) ? 'visible' : 'hidden';

        },
        stateLoaded:function(settings, state){

            $('#oTableFilter').val(state.search.search);

            if(state.length != 15){
                $('#oTableLength').val(state.length).trigger("chosen:updated");
            }

        }
    });

    $.extend(jQuery.fn.dataTableExt.oSort, {
        'num-html-pre':function(a){
            var x = a.replace(/<.*?>/g,"");
            return parseFloat(x);
        },
        'num-html-asc':function(a,b){
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },
        'num-html-desc':function(a,b) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    });

    $.extend(jQuery.fn.dataTableExt.oSort, {
        'datetime-asc': function ( a, b ) {
            var x, y;
            if ($.trim(a) !== '') {
                var deDatea = $.trim(a).split(' ');
                var deTimea = deDatea[1].split(':');
                var deDatea2 = deDatea[0].split('.');
                x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
            } else {
                x = Infinity; // = l'an 1000 ...
            }

            if ($.trim(b) !== '') {
                var deDateb = $.trim(b).split(' ');
                var deTimeb = deDateb[1].split(':');
                deDateb = deDateb[0].split('.');
                y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
            } else {
                y = Infinity;
            }
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        },

        'datetime-desc': function ( a, b ) {
            var x, y;
            if ($.trim(a) !== '') {
                var deDatea = $.trim(a).split(' ');
                var deTimea = deDatea[1].split(':');
                var deDatea2 = deDatea[0].split('.');
                x = (deDatea2[2] + deDatea2[1] + deDatea2[0] + deTimea[0] + deTimea[1]) * 1;
            } else {
                x = Infinity;
            }

            if ($.trim(b) !== '') {
                var deDateb = $.trim(b).split(' ');
                var deTimeb = deDateb[1].split(':');
                deDateb = deDateb[0].split('.');
                y = (deDateb[2] + deDateb[1] + deDateb[0] + deTimeb[0] + deTimeb[1]) * 1;
            } else {
                y = Infinity;
            }
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        }
    });

    $.fn.dataTableExt.oApi.sxLength = function(oSettings, el){
        oSettings._iDisplayLength = parseInt(el.value);
        this.fnDraw(true);
    };

    $.fn.dataTableExt.oApi.sxToggleBox = function(oSettings, el){
        return el.parentNode.parentNode.classList.toggle('selected', el.checked);
    };

    $.fn.dataTableExt.oApi.sxToggleBoxes = function(oSettings, el){

        var status = el.checked,
            boxes = this[0].getElementsByClassName('oTable_checkbox'),
            length = boxes.length;

        for(var i=0; i < length; i++){
            if(!boxes[i].disabled){
                boxes[i].checked = status;
                boxes[i].parentNode.parentNode.classList.toggle('selected', status);
            }
        }

        boxes = null;

    };

    $.fn.dataTableExt.oApi.sxGetSelectedItems = function(){

        var nodes = this.fnGetNodes(),
            length = nodes.length,
            items = [];

        for(var i=0; i < length; i++){
            var cb = nodes[i].getElementsByClassName('oTable_checkbox')[0];
            if(!cb.disabled && cb.checked) items.push(parseInt(cb.value));
        }

        nodes = null;
        return items;

    };

    $.fn.dataTableExt.oApi.sxDisaplayActionButton = function(){
        return document.getElementById('oTableAction').style.display = (this.sxGetSelectedItems().length) ? 'inline-block' : 'none';
    };

});