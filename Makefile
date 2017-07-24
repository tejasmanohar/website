install:
	bundle install

serve: install
	bundle exec jekyll

build: install
	bundle exec jekyll build

deploy: build
	cd _site &&
		\ git add -A . &&
		\ git commit -m "deploy" &&
		\ git push origin gh-pages
