/*----------------------------------------*\
  web.bitRepublic - login.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-05-20 23:35:48
  @Last Modified time: 2018-05-25 22:38:55
\*----------------------------------------*/
import $ from 'jquery'

$(document).ready(() => {
	$(".login-user").on("submit", event => {
		event.preventDefault();
		chrome.runtime.sendMessage({
			action : "login",
			data : {
				email : event.target[0].value,
				pwd : event.target[1].value
			}
		}, response => {
			toggleLogged(response);
			if(response){
				event.target[0].value = "";
				event.target[1].value = "";
			}
	    });
		return false;
	});

	$(".logout").on("click", event => {
		
		chrome.runtime.sendMessage({
			action : "logout",
			data : true
		}, loggedIn => toggleLogged(loggedIn) );
		return false;
	});

	$("input[name='currentURLreadable']").on("change", ({target}) => {
		chrome.runtime.sendMessage({
			action : "changeBWlist",
			data : {
				url : $("input[name='currentURL']").val(),
				blacklisted : target.value == "1"
			}
		});	
	});

	chrome.runtime.sendMessage({
		action : "getUrl",
	}, ({url, blackListed}) => {
		$("input[name='currentURL']").val(url);
		$("input[name='currentURLreadable'][value='"+blackListed+"']").prop('checked', true);
	});

	chrome.runtime.sendMessage({
		action : "isLogin",
	}, loggedIn => {
		toggleLogged(loggedIn);
		if(typeof cb === "function"){
			cb(loggedIn);
		}
	});	
});

function toggleLogged(flag){
	if(flag){
		$("#loggedIn").show();
	    $("#loggedOut").hide();
	}else{
		$("#loggedIn").hide();
	    $("#loggedOut").show();
	}
}
