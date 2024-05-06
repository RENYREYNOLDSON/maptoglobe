To run server locally:
~~~
npx vite
~~~
To build (also remove .'s from dist/index.html for local files):
~~~
npx parcel build index.html
~~~
To create a subtree for hosting the /dist on GitHub pages:
~~~
git subtree push --prefix dist origin gh-pages
~~~
