# Simple Social Share for jQuery

[![Build Status](https://travis-ci.org/MightyMedia/Simple-Social-Share.svg?branch=develop)](https://travis-ci.org/MightyMedia/Simple-Social-Share)

Simple Social Share for jQuery is a simple way of creating social share buttons on your website without loading all the third party scripts from these networks. It is bases on a blog by Jonathan Suh: [Responsible Social Share Links](https://jonsuh.com/blog/social-share-links/).

Version 0.1.1

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

