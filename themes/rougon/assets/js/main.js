$(document).ready(function(){
   $('.main-autocomplete').bind('typeahead:selected', function(obj, output, name) {
        var params;
        that = $(this);
        window.location.href = output.permalink;
        $(this).typeahead('val', '');
    });
   $('.main-autocomplete').bind('typeahead:active', function(ev) {
        that = $(this);
        that.parents('.search').addClass('active')
    });
})