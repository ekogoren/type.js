# Type.js

![Screenshot](http://dgcult.com/github/type/type.png)

[Official page, examples and live demo](http://dgcult.com/github/type/)


A super slim(2kb), free and simple to use library to type and erase text on the screen just as if it was typed by a keyboard.

## Setup

```html
// Header
<link rel="stylesheet" type="text/css" href="typeit/typeit.min.css"/>
//Before body closing tag
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="typeit/typeit.min.js"></script>

```

## Usage



```javascript
 $(document).ready(function(){
        //Instantiation
        $("h1").type({typeSpeed:300, wait:100});
        $("h2").type({typeSpeed:100, wait:50});
        $(".erase").type({typeSpeed:50, wait:150});
        //Action
        $("h1").type('type',{textToType :'Type.js', done:'headingDone'});
    });
    //Callback functions
    function headingDone(){
        $("h2").type('type',{textToType:'Gimmick It Up', done:'erase'});
    }

    function erase(){
        $(".erase").type('erase', {done :'colorText'});
    }

    function colorText(){
        $("body p").addClass("white");
    }

```

