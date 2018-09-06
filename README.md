# Simple Social Share

Simple Social Share is a simple way of creating social share buttons on your website without loading all the third party scripts from these networks. It is available in plain javascript and as jQuery plugin. It is based on a blog by Jonathan Suh: [Responsible Social Share Links](https://jonsuh.com/blog/social-share-links/).

Version 0.3.0

For changelog see: https://github.com/MightyMedia/Simple-Social-Share/blob/master/CHANGELOG.md

The jQuery plugin requires jQuery 1.7 or newer.

Licensed under:
MIT License - https://github.com/MightyMedia/Simple-Social-Share/blob/master/LICENSE

## Requirements

* jQuery 1.7+ (only when using the jQuery plugin)

## Installation
To use Simple Social Share make sure you have jQuery 1.7 or newer. Next, just include the plugin file and you are ready to go.

__Plain javascript__
```html
<script type="text/javascript" src="simpleSocialShare.min.js"></script>
```

__jQuery__
```html
<script type="text/javascript" src="jquery.simpleSocialShare.min.js"></script>
```

## Basic usage

### Initialize

__Plain javascript__
```javascript
// Without any input, every element with the class simpleSocialShare will get the magic.
simpleSocialShare.init();

// With selector, can be #id, .className or tagName
simpleSocialShare.init('.socialShareBtn');

// With elements, can be 1 DOM element, NodeList or HTMLCollection
simpleSocialShare.init(document.getElementsByClassName('socialShareBtn'));
```

__jQuery__
```javascript
$(document).ready(function(){
    $('.socialShareBtn').simpleSocialShare();
});
```

Now every element with the class `socialShareBtn` will turn in to a functional share link.

```html
<a href="#" class="socialShareBtn" data-share-url="http://mightymedia.nl" data-share-network="twitter" data-share-text="Share this awesome link on Twitter">Share on Twitter</a>
```

### Destroy

To completely remove all added Simple Social Share functionality:

__Plain javascript__
```javascript
// Input can be the same as used for simpleSocialShare.init();
simpleSocialShare.destroy('selector');
```

__jQuery__
```javascript
$(document).ready(function(){
    $('.socialShareBtn').simpleSocialShare('destroy');
});
```

## Options

The options for a share link/button are set via data attributes on the element. Below is a list with the options.


| Option        | Description                                | Network                      | Notes    |
| ------------- | ------------------------------------------ | ---------------------------- | -------- |
| share-network | The network to share on                    | all networks                 | required |
| share-url     | The URL to be shared                       | all networks                 | required |
| share-text    | The text to pass along with the URL        | linkedin, pinterest, twitter | optional |
| share-title   | The title to add the the share             | linkedin only                | optional |
| share-via     | Account name to mention in the share/tweet | twitter only                 | optional |
| share-tags    | Tags to include to the share               | pinterest, twitter           | optional |
| share-media   | Image to add to the share                  | pinterest only               | optional |


## Issues

If you have any ideas or bugs, please submit them to the GitHub issue tracker at https://github.com/MightyMedia/Simple-Social-Share/issues.
