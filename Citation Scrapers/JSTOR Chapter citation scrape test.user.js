// ==UserScript==
// @name         JSTOR Chapter citation scrape test
// @namespace    www.jstor.org
// @version      0.1
// @description  scrapes a citation from jstor
// @author       Jacob
// @match        http://www.jstor.org.myaccess.library.utoronto.ca/*
//@require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */

$(document).ready(function() {
  var title = $.trim($('#content > div > div.chapter-view-info > div > div.large-8.columns > div.row > div.xlarge-9.columns > div > div > div.medium-8.inline-block > h1')[0].innerHTML);
 // var author = $.trim($('div.contrib')[0].innerHTML);
  var pages = $.trim($('div.page-range')[0].innerHTML);
 var publisher = $.trim($('div.publisher')[0].innerHTML);
  var book = $.trim($('div.book-title')[0].innerHTML);
 var citation = title.concat(",", book, ",", pages, ",",publisher);
    
  $('body').append('<input type="button" value="Cite" id="CP">');
  $("#CP").css("position", "fixed").css("top", 0).css("left", 0);
  $('#CP').click(function(){ 
      setTimeout(function(){
       window.alert(citation);
      },1000);
    });
});