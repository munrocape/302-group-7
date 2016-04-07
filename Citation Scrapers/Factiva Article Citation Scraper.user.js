// ==UserScript==
// @name         Factiva Article Citation Scraper
// @namespace    www.global-factiva-com
// @version      0.1
// @description  scrapes a citation from jstor
// @author       Jacob
// @match        https://global-factiva-com.myaccess.library.utoronto.ca/ga/default.aspx
//@require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */

$(document).ready(function() {
  var title = $.trim($('span.enHeadline')[0].innerHTML);
  var author = $.trim($('div.author')[0].innerHTML);
  //var date = $.trim('div.article.enArticle > div:nth-child(5)')[0].innerHTML;
  var citation = title.concat( ",", author, ","); //,date);
    
  $('body').append('<input type="button" value="Cite" id="CP">');
  $("#CP").css("position", "fixed").css("top", 0).css("left", 0);
  $('#CP').click(function(){ 
      setTimeout(function(){
       window.alert(citation);
      },1000);
    });
});