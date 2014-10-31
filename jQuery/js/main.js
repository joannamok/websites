/*  
	Your Project Title
	Author: You
*/

(function($){

	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};
	
	

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLoginState();
	};
	
	
	init();
	
		
	/*
	===============================================
	======================================== EVENTS	
	/***********************LogIn*******************************************************************/
	//attatches click event for login to signIn button
	$('#signinButton').click(function(){
		//var for username input
		var user = $('#user').val();
		//var for password input
		var pass = $('#pass').val();
		//console for checking passowrd
		console.log('This notifies you if the password is working');

		//call ajax function to search php file in xhr folder
		$.ajax({
			url:'xhr/login.php',
			type: 'post',
			dataType: 'json',
			data: {
				username:user,
				password: pass
			},
			//function to redirect user if login is successful or give error if incorrect
			success:function(response){
				console.log('test user');

				if(response.error){
					alert(response.error)
				}else{
					window.location.assign('admin.html');
				};
			
			}//end success function

		})//end ajax function
	});//end click event
	

	/******************************** Logout ****************************/

	//function to add click event function logout button on admin page
	$('#logoutbtn').click(function(e){
		e.preventDefault;
		$.get('xhr/logout.php',function(){
			window.location.assign('index.html')
		});//end get function for index page

	})//end click event function

	//function to add click event function logout button on projects page
	$('#logout').click(function(e){
		e.preventDefault;
		$.get('xhr/logout.php',function(){
			window.location.assign('index.html')
		});//end get function for index page

	});//end click event function

	/******************************* Display Username ******************************************/

//uses JSON to find username and diplay it
$.getJSON("xhr/check_login.php", function(data){
	console.log(data);
	//each loop to find username in keys and add it to html
	$.each(data, function(key, val){
		console.log(val.user_n);
		$('.userid').html('Welcome '+ val.user_n);
	})//end each loop
})//end JSON 

	/**********TOOLTIPS*******************************************************/
	$('.masterTooltip').hover(function(){
		/*hovering over code*/
		var title = $(this).attr('title');
		$(this).data('tipText', title).removeAttr('title');
		$('<p class="tooltip"></p>')
		.text(title)
		.appendTo('body')
		.fadeIn('fast');
		/*hovering off code*/
	}, function(){
		$(this).attr('title',$(this).data('tipText'));
		$('.tooltip').remove();
	}).mousemove(function(e){
		/*vars to catch mouse position*/
		var mousex = e.pageX + 20; //gets x coordinates
		var mousey = e.pageY + 10; //gets y coordinates
		$('.tooltip')
		.css({top:mousey,left:mousex});
	});

/*************************************** Go To Projects Page ********************************/
	//adds click event to project button in admin page to go to projects page
	$('#profilebtn').on('click',function(e){
		e.preventDefault();
		window.location.assign('projects.html');
	});//end clickevent function

/***********************ADD MODAL***************************************/

$('.modalClick').on('click', function(e){
	e.preventDefault();
	$('#overlay')
	.fadeIn()
	.find('#modal')
	.fadeIn();
});

$('.close').on('click', function(e){
	e.preventDefault();
	$('#overlay')
	.fadeOut()
	.find('#modal')
	.fadeOut();
	
});

/**************************************Date Picker (on add modal in projectpage)**************************************************************/
$(".myDatePicker").datepicker();

/************************FADING RADIO BUTTONS ON MODAL***********************************/
$('.myStatus').mouseover(function(){
	$(this).fadeTo(100, .3);
});

$('.myStatus').mouseout(function(){
	$(this).fadeTo(100, 1);
});

/******************************** New Projects ******************************************************/
	//adds click event to add button inside modal box
	$('#addButton').on('click',function(){
		//variable of inputs inside of moadl box
		 var projName = $('#projectName').val(),
		     projDesc = $('#projectDescription').val(),
		     madeDate = $('#projectDueDate').val(),
		     status = $('input[name = "status"]:checked').prop("id");
		//ajax to assign new values to keys in project php
		$.ajax({
			url:"xhr/new_project.php",
			type:"post",
			dataType:"json",
			data:{
				projectName: projName,
				projectDescription: projDesc,
				dueDate: madeDate,
				status:status
			},
			//checks to make sure no error in responses, if not, sends user to projects page
			success: function(response){
				console.log('Testing for success');
				if(response.error){
					alert(response.error);
				}else{
					window.location.assign("projects.html");
				}
			}//end success function
		});//end ajax 


	});//end click event for modal add button

/********************************************** Get Projects ***********************************/
//var to hold function for projects
var projects = function(){
	//ajax function to retrieve user data
	$.ajax({
		url: 'xhr/get_projects.php',
		type:'get',
		dataType:'json',
		//error message if response error, otherwise will
		success: function(response){
			if(response.error){
				console.log(response.error);
			}else{
				//for loop for
				for(var i=0, j=response.projects.length; i < j; i++){
					//var to hold response of each project
					var result = response.projects[i];
					//writes html to hold user results
					$(".projects").append(
						'<div style="border:2px solid #00ac65;">' +
						"<input class='projectid' type='hidden' value='"+result.id+"'>"+
						"Design Name: " + result.projectName + "<br>"+
						"Description: " + result.projectDescription +"<br>"+
						"Type of Jewelry: "+ result.status + "<br>" +
						'<button class="deletebtn">Delete</button>'+
						'<button class="editbtn">Edit</button>'+
						'</div><br>'
					);
				}//end for loop
				//functionality for delete button
				$('.deletebtn').on('click',function(e){
					//var to hold value of current item being deleted
					var pid = $(this).parent().find(".projectid").val();
					console.log('test delete');
					$.ajax({
						url:'xhr/delete_project.php',
						//holds var pid value
						data:{projectID:pid},
						type:'POST',
						dataType:'json',
						success: function(response){
							console.log('Testing for success');
							if(response.error){
								alert(response.error);
							}else{
								window.location.assign('projects.html')
							};
						}//end success function
					})//end ajax

				})//end delete button click event
			}//end if/else
		}//end success function
	})//end ajax

}//end var projects function
//calls projects function
projects();

/******************************************* Sortable Projects ********************************************/
$( "#sortable" ).sortable();
$( "#sortable" ).disableSelection();


/***********************BIO MODAL***************************************/

$('#editBio').on('click', function(e){
	e.preventDefault();
	$('#overlayBio')
	.fadeIn()
	.find('#modalBio')
	.fadeIn();
});

$('.close').on('click', function(e){
	e.preventDefault();
	$('#overlayBio')
	.fadeOut()
	.find('#modalBio')
	.fadeOut();
	
});

/************************TABBED ACCORDION***********************************/
$('#tabs p').hide().eq(0).show();
$('#tabs p:not(:first)').hide();

$('#tabs-nav li').click(function(e){
	e.preventDefault();
	$('#tabs p').hide();

	$('#tabs-nav .current').removeClass('current');
	$(this).addClass('current');
	var clicked = $(this).find('a:first').attr('href');

	$('#tabs ' + clicked).fadeIn('fast');
}).eq(0).addClass('current');

/**********************************Featured Artist Accordion Menu(on admin page)*****************************************************************/
$('#accordion').accordion();	


/************************ REGISTER PAGE *************************************/
//click event for register button function
$('#register').on('click',function(){
	/*** vars for form fields ****/
		//username input
	var username = $('#userName').val(),
		//email input
		email = $('#email').val(),
		//password input
		password = $('#password').val();

//console to verify va info
console.log(username +' '+email+' '+password);
	
	//ajax function to call php files
	$.ajax({
		url:'xhr/register.php',
		type:'post',
		dataType:'json',
		data:{
			//assigning vars to keynames
			username:username,
			email:email,
			password: password
		},
		//function to redirect if signup is successful or give error if not
		success: function(response){
			if(response.error){
				alert(response.error)
			}else{
				window.location.assign('admin.html')
			}
		}//end success function

	});//end ajax function
});//end click function



/*********************************Clay&Play Most Loved of the Week*******Colorbox Plugin ***** Search SlideShow **************/
	jQuery('a.gallery').colorbox({
		'transition':'fade',
		'fadeOut':2000,
		'overlayClose':true
	});



	/*	
	==================================== END EVENTS 
	===============================================
	*/
		
		

	
})(jQuery); // end private scope




