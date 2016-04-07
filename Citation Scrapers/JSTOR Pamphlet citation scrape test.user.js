// ==UserScript==
// @name         JSTOR Pamphlet citation scrape test
// @namespace    www.jstor.org
// @version      0.1
// @description  scrapes a citation from jstor
// @author       Jacob
// @match        http://www.jstor.org.myaccess.library.utoronto.ca/*
//@require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */

$(document).ready(function() {
 var title = $.trim($('div.title')[0].innerHTML);
 var author = $.trim($('div.contrib')[0].innerHTML);
 var pages = $.trim($('div.count')[0].innerHTML);
 var collection = $.trim($('div.collection')[0].innerHTML);
 var year = $.trim($('div.year.mbl')[0].innerHTML);
 var citation = title.concat(",", author, ",", year, ",",collection, ",", pages);
    
  $('body').append('<input type="button" value="Cite" id="CP">');
  $("#CP").css("position", "fixed").css("top", 0).css("left", 0);
  $('#CP').click(function(){ 
      setTimeout(function(){
       window.alert(citation);
      },1000);
    });
});