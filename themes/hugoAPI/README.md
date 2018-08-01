# Hugo Api Theme Component for dev

This theme component instantly adds a layer of JSON API to your current or new Hugo project.

## Things of note

Hugo does not currently allows pagination to work on any Output Format other than the main one. So if you need pagination on the API output, you'll have to make sure it sits at the top of your "per page kind" output declaration.
```
outputs:
  home:
  	- json
    - html
  page: 
    - json
    - html
```