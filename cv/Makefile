all:
	mustache data/data.json template.mustache > index.html
	mustache data/data_pl.json template.mustache > cv_pl.html

watch:
	(find data & find template.mustache) | entr make all & browser-sync start --server --files .