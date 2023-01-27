# Type.js

[live demo](https://jsfiddle.net/yaojm2qe/4/)


A super slim(2kb), free and simple to use library to type and erase text on the screen just as if it was typed by a keyboard.

## Setup

```html
// Header
<link rel="stylesheet" type="text/css" href="type.min.css"/>
//Before body closing tag
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script type="text/javascript" src="type.min.js"></script>

```
## Usage

### Instantiate

The selector must be first instantiate with any number of possible options.
<b>Wait</b> will pause between end of execution and callback function or in between erase and type in <b>eraseAndType</b> method.
<b>showCursor</b> will show the cursor when typing or deleting action takes place while<b>constantCursor</b> will show the cursor regardless. These are the defaults:
```javascript
$("selector").type({
    typeSpeed:250,
    wait:500,
    showCursor:true,
    constantCursor:false
    });
````

## Methods

After instantiation methods can be called upon the selector where the first parameter is the method name and the second is an option object.
Global options can be overwritten and a <b>done</b> parameter can be added, a name of a function in the window scope that will be called once the action is done.

### Type
<b>Type</b> requires a <b>textToType</b> parameter, a string that will be appended to the selector's text content.
### Erase
<b>Erase</b> will delete the current text content within the selector.
### eraseAndType
<b>eraseAndType</b> will first delete the current text content within the selector and then write the text given in the required <b>textToType</b> parameter.


## Examples

```javascript
$(document).ready(function(){
      $(".erase_and_type").type({typeSpeed:40, wait:300, constantCursor:true});
      $(".erase_and_type").type('eraseAndType',{textToType:"Erase this text and then type it again", done:'eraseAndType'});

    });

 function eraseAndType(){
        $(".erase_and_type").type('eraseAndType',{textToType:"Erase this text and then type it again", done:'eraseAndType'});
 }
```

### Looping

```javascript
$(document).ready(function(){
      $(".erase_and_type").type({typeSpeed:40, wait:300, constantCursor:true});
      $(".erase_and_type").type('eraseAndType',{textToType:"Erase this text and then type it again", done:'eraseAndType'});

    });

 function eraseAndType(){
        $(".erase_and_type").type('eraseAndType',{textToType:"Erase this text and then type it again", done:'eraseAndType'});
 }
```

### Writing a few sentences and deleting them
```javascript
$(document).ready(function(){
      $(".a_story").type({typeSpeed:170, wait:700,constantCursor:true});
      story_1();
    });

 function story_1(){
        $(".a_story").type('type', {textToType : 'This is a very long story. ', done:'story_2'});
 }

 function story_2(){
    $(".a_story").type('type', {textToType : 'It has a few sentences slowly written down. ', done:'story_3'});
 }

 function story_3(){
    $(".a_story").type('type', {textToType : 'But in the end it will be erased and written back for no good reason. ', done:'story_4'});
 }

 function story_4(){
    $(".a_story").type('erase', {typeSpeed:10,done:'story_1'});
 }
 ```
 
 ## Important Notes
 
 1. Type does not currently support HTML tags, those will be broken by all actions.
 2. Callback function ('done' parameter) must be in the window scope, that is outside any function such as document ready.
 
 ## Licence
 Free to use and distribute.
 
  ## Authors
  Eko Goren
