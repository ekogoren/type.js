(function(factory) { // $/jQuery
    'use strict';
    if (typeof define === 'function' && define.amd) { //require.js
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') { //Backbone.js
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';

    $.fn.type = function(){
        var _ = this;
        var l = _.length;
        var args = arguments;
        for (var i = 0; i < l; i++) {
            if(_[i].type){
                _[i].type.funcRout(args[0], args[1]);
            }else{
                _[i].type = new Type(args[0], _);
            }
        }
    };

    var Type = window.Type || {};

    Type = function(args, element){

        var elClass = (args.constantCursor)? "dg_ti_inner dg_ti_cursor" : "dg_ti_inner";
        element.addClass("dg_ti_selector").wrapInner("<span class='"+elClass+"'></span>");
        this.element = element.find(".dg_ti_inner");
        this.options = {};
        this.filterOptions(args);
    };

    Type.prototype.filterOptions = function(args){

        var def = this.defaults;
        var count = def.length;
        var _this = this;
        args = args? args : {};
        $.each(def, function(index, value) {
            _this.options[index] = ( args[index] !== undefined )? args[index] : value;
        });
    };

    Type.prototype.defaults = {
        typeSpeed : 250,
        wait: 500,
        showCursor : true,
        constantCursor : false
    };

    Type.prototype.type = function(args){

        var elClass = this.withCursor(args);
        var ttt = args.textToType;
        var tttL = ttt.length;
        var tttS = (args.typeSpeed)? args.typeSpeed : this.options.typeSpeed;
        var z = 1;
        var y = 0;
        var _ = this;
         _.element.append("<i class='"+elClass+"'></i>");
         var typer = _.element.find('.temp-typer');

            for (var x = 1; x <= tttL; x++) {

                setTimeout(function () {
                    var typing = ttt.slice(0, z);
                    z++;
                    y++;
                    typer.html(typing);
                    if(y === tttL){
                        var typed = typer.text();
                        typer.remove();
                        var text = _.element.text();
                        _.element.text(text+typed);
                        _.done(args);
                    }
                }, tttS * x);
            }
    };

    Type.prototype.withCursor = function(args){

        if ( !this.options.constantCursor ){
            var showCurs = (args.showCursor)? args.showCursor : this.options.showCursor;
            return (showCurs)? "temp-typer dg_ti_cursor" : "temp-typer";
        } else return"temp-typer";
    };

    Type.prototype.erase = function(args){

        var elClass = this.withCursor(args);
        var _ = this;
        var element =  _.element;
        var tte = element.addClass(elClass).html();
        var ttel = tte.length;
        var tttS = (args.typeSpeed)? args.typeSpeed : this.options.typeSpeed;
        var y = 0;

        for (var x = 1; x <= ttel; x++) {

            setTimeout(function () {
                var text = element.html();
                var len = text.length - 1;
                text = text.slice(0, len);
                element.html(text);
                y++;
                if(y === ttel){
                    element.removeClass(elClass);
                    _.done(args);
                }
            }, tttS * x);
        }
    };

    Type.prototype.eraseAndType = function(args){

        args.doneIn = 'type';
        this.erase(args);
    };

    Type.prototype.funcRout = function(func, args){
        args = args? args : {};
        this[func](args);
    };

    Type.prototype.done = function(args){
        var wait = (args.wait)? args.wait : this.options.wait;
        if(args.doneIn){
            var _ = this;
            var di = args.doneIn;
            delete args.doneIn;
            setTimeout(function () {
                _.funcRout(di, args);
            }, wait);
        }
        else{
            var call = args.done;
            if(call){
                var func = window[call];
                if( func === 'undefined' || typeof func !== 'function') this.error('Callback function not found in window scope.');
                else{
                    setTimeout(function(){ func(); }, wait);
                }
            }
        }
    };

    Type.prototype.error = function(str){
        console.log(str);
    };

}));
