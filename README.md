# Simple Social Share for jQuery

[![Build Status](https://travis-ci.org/MightyMedia/Simple-Social-Share.svg?branch=develop)](https://travis-ci.org/MightyMedia/Simple-Social-Share)

Simple Social Share for jQuery is a simple way of creating social share buttons on your website.

Version 0.1.0

For changelog see: https://github.com/MightyMedia/Simple-Social-Share/blob/master/CHANGELOG.md

Requires jQuery 1.7 or newer.

Licensed under:
MIT License - https://github.com/MightyMedia/Simple-Social-Share/blob/master/LICENSE

## Requirements

* jQuery 1.7+

## Installation
To use Simple Social Share make sure you have jQuery 1.7 or newer. Next, just include the plugin file and you are ready to go.

```html
<script type="text/javascript" src="jquery.simpleSocialShare.min.js"></script>
```

## Basic usage

### Initialize

```javascript
$(document).ready(function(){
    $('.socialShareBtn').simpleSocialShare();
});
```

Now every element with the class `socialShareBtn` will turn in to a functional share link.

```html
<a href="#" class="socialShareBtn" data-share-url="http://mightymedia.nl" data-share-network="twitter" data-share-text="Share this awesome link on Twitter">Share on Twitter</a>
```

## Options

tba
