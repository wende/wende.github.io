all:
	mustache data/data.json template.mustache > index.html
	mustache data/data_pl.json template.mustache > cv_pl.hmtl

watch:
	browser-sync start --server --files .