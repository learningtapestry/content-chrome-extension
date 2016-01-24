# LearningTapestry Library

## Overview

- `src/app`: a web interface to LT's content search. Implemented with React. 
- `src/chrome`: a Chrome extension that wraps the search UI and integrates it
   with Google Classroom.

This project uses `Webpack` as a module bundler and `npm` scripts to automate
dev tasks.

## Development setup

1. Follow the instructions for [Content](https://github.com/learningtapestry/content)
2. Run `npm run dev-spa` (SPA) or `npm run dev-chrome` (Chrome extension)

### Usage (SPA)

After dev setup, visit [https://localhost:8080](https://localhost:8080).

### Usage (Chrome)

After dev setup:

1. Go to chrome://extensions/
2. Select 'Developer mode' and load `src/app` as an unpacked extension 
3. Go to a Classroom class and click the LT Library button
