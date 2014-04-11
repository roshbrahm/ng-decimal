/*
* Author : Rosh Brahm
* email  : broshnikanta@gmail.com
* DESCRIPTION
* ng-decimal directive
* this directive is meant for input value which restricts user to input
* decimal value in the text box
* it allows decimal value only.
* it takes an attribute which indicates the max-character length of the input
* in the given html, we have put the max-character length as 10.
* so it will restrict the user to input not more than 10 character.
* This plugin is free to use and distribute.
* And anybody willing to upgrade or enhance the plugin are welcome.
* 
*/
 
 
var app = angular.module('app', []);
	app.directive('ngDecimal', function(){
            return {
                restrict: 'A',
                link: function($scope, $element, $attributes){
                    var limit = $attributes.ngDecimal;
                    function caret(node) {
                        if(node.selectionStart) {
                            return node.selectionStart;
                        }
                        else if(!document.selection) {
                            return 0;
                        }
                        //node.focus();
                        var c		= "\001";
                        var sel	= document.selection.createRange();
                        var txt	= sel.text;
                        var dul	= sel.duplicate();
                        var len	= 0;
                        try{ dul.moveToElementText(node); }catch(e) { return 0; }
                        sel.text	= txt + c;
                        len		= (dul.text.indexOf(c));
                        sel.moveStart('character',-1);
                        sel.text	= "";
                        return len;
                    }
                    $element.bind('keypress', function(event){
                    	var charCode = (event.which) ? event.which : event.keyCode;
                    	var elem=document.getElementById($element.attr("id"));
                    	if (charCode == 45){
                            var caretPosition=caret(elem);
                            if(caretPosition==0){
                                if($element.val().indexOf("-")!=-1){
                                	event.preventDefault();
                                    return false;
                                }
                                if($element.val().charAt(0)!="-" ){
                                    if($element.val() <=limit){
                                        $element.val("-"+$element.val());
                                    }
                                }
                            }
                            if($element.val().length>0){
                            	event.preventDefault();
                            	return false;
                            }
                        }
                        if (charCode == 46){
                            if($element.val().length>limit-1){
                            	event.preventDefault();
                            	return false;
                            }
                            if ($element.val().indexOf('.') !=-1){
                            	event.preventDefault();
                                return false;
                            }
                            return true;
                        }
                        if (charCode != 45 && charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)){
                        	event.preventDefault();
                            return false;
                        }
                        if($element.val().length>limit-1){
                        	event.preventDefault();
                        	return false;
                        }
                        return true;
                    });
                }
            };
        });
		app.controller('appController', function($scope) {
			$scope.data="";
		});
