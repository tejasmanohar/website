install:
	bundle install

serve: install
	bundle exec jekyll

build: install
	bundle exec jekyll build --incremental

deploy: build
	cd _site \
		&& git init \
		&& git add . \
		&& git commit -m "deploy" \
		&& git push -f git@github.com:tejasmanohar/website.git master:gh-pages
