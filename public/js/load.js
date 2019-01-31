$(document).ready(function () {
	$(this).scrollTop(0);
	// set carousel margin top 
	var header = $('.header');

	var carousel = $('.carousel');
	var featureimg = $('#feature-img');
	var contact = $('.contact-wrapper');
	var about = $('.about-wrapper');
	var portfolios_top = $('.portfolios-top');
	// set carousel margin top 
	setmt(carousel);
	setmt(featureimg);
	setmt(contact);
	setmt(about);
	setmt(portfolios_top);


	if (localStorage.getItem("theme") == "light") {
		changeCSS('/styles/site-light.css', 1);
		$('.theme').addClass("light");
		// Store
		localStorage.setItem("theme", "light");
	}

	$(window).on('resize', function () {
		// set carousel margin top 
		setmt(carousel);
		setmt(featureimg);
		setmt(contact);
		setmt(about);

		if ($(window).width() < 425) {
			$('#quotebtn').children().html('Quote');
		} else {
			$('#quotebtn').children().html('Get Quick Quote')
		}
	});

	function setmt(classname) {
		classname.css('margin-top', header.height() + 'px');
	}

	$(".header").sticky({
		topSpacing: 0
	});

	// var keystone = require('keystone');
	const sidebarBox = document.querySelector('.mat-drawer'),
		sidebarBtn = document.querySelector('.menu-button')

	stickyFooter.init({
		selectorWrap: '#body', // Selector for the wrap container (must use a valid CSS selector)
		selectorFooter: '.footer-container', // Selector for the footer (must use a valid CSS selector)
	});

	$('.scroll-link').on('click', (e) => {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, '300');
	});


	// sidebar control
	sidebarBtn.addEventListener('click', event => {
		sidebarBtn.classList.toggle('active');
		sidebarBox.classList.toggle('active');

		//    // stop page from scrolling
		if (sidebarBox.classList[1] === 'active') {
			console.log(sidebarBox.classList[1]);
			$('body').css('overflow', 'hidden');
		} else if (sidebarBox.classList[1] === undefined) {
			console.log(sidebarBox.classList[1]);
			$('body').css('overflow', '');
		}
	});

	$('.js-menu-button').click((e) => {
		e.preventDefault();
		$('.menu-icon').toggleClass('is-active');
	});

	$('.fa-chevron-up').hide();
	$(window).on('scroll', function () {
		var s = $(window).scrollTop(),
			d = $(document).height(),
			c = $(window).height();

		var scrollPercent = (s / (d - c)) * 100;


		if (scrollPercent > 35) {
			$('.fa-chevron-up').show();
		}
		if (scrollPercent <= 35) {
			$('.fa-chevron-up').hide();

		}

	})



	// Check theme and init Infinite Scroll
	$(window).on('load', () => {
		if (localStorage.getItem("theme") == "light") {
			changeCSS('/styles/site-light.css', 1);
			$('.theme').addClass("light");
			// Store
			localStorage.setItem("theme", "light");
		}

		$('#portfolios').infiniteScroll({
			path: '.pagination__next',
			append: '.portfolios-item',
			status: '.scroller-status',
			hideNav: '.pagination',
			checkLastPage: true,
			stagger: 30,
			// nicer reveal transition
			visibleStyle: {
				transform: 'translateY(0)',
				opacity: 1
			},
			hiddenStyle: {
				transform: 'translateY(100px)',
				opacity: 0
			},
			button: '.view-more-button',
			// load pages on button click
			scrollThreshold: false,
			// disable loading on scroll
		});
	})

	// Theme switch 
	$('.theme').on('click', (event) => {
		$('.theme').toggleClass('light');

		if ($('.theme').hasClass("light")) {
			changeCSS('/styles/site-light.css', 1);
			// Store
			localStorage.setItem("theme", "light");
			// Check browser support
		} else {
			changeCSS('/styles/site.css', 1);
			// Store
			localStorage.setItem("theme", "");
		}
	});


	function changeCSS(cssFile, cssLinkIndex) {

		var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

		var newlink = document.createElement("link");
		newlink.setAttribute("rel", "stylesheet");
		newlink.setAttribute("type", "text/css");
		newlink.setAttribute("href", cssFile);

		document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
	}

});


// html {
// 	visibility: visible!important;
// 	opacity: 1!important;
// 	transition: all 2 s ease - out;
// }

// function isNumber() {
// 	console.log('hello');
// 	alert('hello');
// 	evt = (evt) ? evt : window.event;
// 	var charCode = (evt.which) ? evt.which : evt.keyCode;
// 	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
// 		return false;
// 	}
// 	return true;
// }

// document.getElementById("contact-phone").addEventListener("keypress",
// 	return isNumber(event));

// function isNumber(evt) {
// 	// alert('pressed');
// 	evt = (evt) ? evt : window.event;
// 	var charCode = (evt.which) ? evt.which : evt.keyCode;
// 	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
// 		return false;
// 	}
// 	return true;
// }

// function myfunc() {
// 	console.log('good');
// }
