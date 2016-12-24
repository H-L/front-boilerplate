This repo is containning all the stuff I use or will use soon on my projects.

# Installation

1. Open your Terminal
2. Go to the root of the directory you want to dowload this repo
3. Simply run :

```bash
git clone git@github.com:H-L/gulp-dir.git
yarn install
```
# Folder structure

Description coming soon :kiss:

# Features

## Yarn
I personnaly prefer yarn but you can use npm. Just delete the yarn.lock file and launch the usual npm commands :

```bash
rm -rf yarn.lock
npm install
```
:warning: Be careful thought, all the commands below are using yarn, so be sure you change them if you plan to use npm instead. :warning:

## Sass
This repo is using Sass for front-end developping.
If you want to learn Sass, here are some useful links :

* [The official Sass documentation](http://sass-lang.com/)
* [Sass Guideline](https://sass-guidelin.es/) (Recommended)
* [The Sass Way](http://thesassway.com/)

It actually tries to follow the [7-1 pattern](https://sass-guidelin.es/#the-7-1-pattern) and have already some helpers added.

## Sanitize.css
As you would see, this repo uses [Sanitize.css](https://github.com/jonathantneal/sanitize.css/).
Feel free to change the ```@import "sanitize.css";``` by any other reset such as [Normalize](https://necolas.github.io/normalize.css/) or [Reset.css](http://meyerweb.com/eric/tools/css/reset/).
You can even use yarn to add/remove it :smile:

e.g. :
```bash
yarn remove sanitize.css
yarn add normalize
```
