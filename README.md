# LearningTapestry Library

## Overview

- `src/search-app`: a web interface to LT's content search
- `src/chrome`: a Chrome extension that wraps the search UI and integrates it
   with Google Classroom

## Development setup

1. Follow the instructions for [Content](https://github.com/learningtapestry/content)
2. Run `npm i && npm run watch`

### Usage

After dev setup:

1. Go to chrome://extensions/
2. Select 'Developer mode' and load `src/chrome` as an unpacked extension 
3. Click the LT Library button (in a Classroom class, LT Library will open
   inside a modal window)
