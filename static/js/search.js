const showOnLoad = false;

const options = {
  appId: 'XPQBESYJG4',
  apiKey: '91f9083f4b06468db78ef818f65e3433',
  indexName: 'rougon-macquart.com',
  hitsPerPage: 10,
  urlSync: false
}
if(!showOnLoad){
  options.searchFunction = function(helper) {
    var searchResults = $('.rm-Search__results');
    if (helper.state.query === '') {
      searchResults.hide();
      return;
    }
    helper.search();
    searchResults.show();
  }
} else {
    $('.rm-Search').show();
}
const search = instantsearch(options);

// initialize SearchBox
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Recherchez',
    //poweredBy: true,
    reset: false,
    cssClasses: {
      root: 'rm-Search__box',
      input: 'rm-Search__box__input',
    }
  })
);

var hitTemplate =
  '<a href="{{ relpermalink }}" class="rm-List__item">' +
        '<div class="rm-List__title">{{{_highlightResult.title.value}}}</div>' +
  '</a>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    cssClasses: {
      root:'rm-Search__hits',
      empty:'rm-Search__hits--empty'
    },
    templates: {
      empty: 'On a rien trouvé là, rien.',
      item: hitTemplate
    }
  })
);

var hidePaginationWhenNoResults = {
  render: function(data) {
    if (data.results.nbPages < 2) {
      document.querySelector('#pagination').classList.add('hide');
    } else {
      document.querySelector('#pagination').classList.remove('hide');
    }
  }
}

search.addWidget(hidePaginationWhenNoResults)
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    cssClasses: {
      root:'rm-Search__pagination__list',
      item:'rm-Pagination__item',
      active: 'rm-Pagination__item--active',
      disabled:'rm-Pagination__item--disabled',
      link:'rm-Pagination__item__link'
    },
    labels: {
      previous: '< Précédent',
      next: 'Suivant >'
    },
    showFirstLast: false
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: '#novels',
    attributeName: 'novel',
    operator: 'or',
    limit: 10,
    autoHideContainer: true,
    sortBy: ['name:asc'],
    cssClasses:{
      root:'rm-Refinement',
      list:'rm-Refinement__list',
      item:'rm-Refinement__item',
      active:'rm-Refinement__item--active',
      count:'rm-Refinement__meta'
    }
  })
);

search.start();