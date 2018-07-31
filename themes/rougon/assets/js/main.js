

// passing in `null` for the `options` arguments will result in the default
// options being used

$.getJSON('./index.json', {param1: 'value1'}, function(json, textStatus) {
	var items = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace("title", "type"),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		// url points to a json file that contains an array of country names, see
		// https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
		local:json
	});
	items.initialize();

	$('.main-autocomplete').typeahead(null, 
        {
            name: 'items',
            source: items,
            display:'title',
            templates: {
                suggestion: function (data) {
                    type = data.type == 'roman' ? ' <small>(' + data.type + ')</small>' : ''
        			return '<div class="item"><span>' + data.title + '</span>'+ type + '</div></div>';
    			}
            }
        },
	);
});
/*var jsonData = [
{"type":"novel","title":"Nana"},
{"type":"character", "title": "Nana Femme"},
];*/
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