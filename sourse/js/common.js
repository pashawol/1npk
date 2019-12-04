var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJX
	LazyFunction: function () {
		// Для лэзи загрузки 

 

		// лэзи 
		document.addEventListener("DOMContentLoaded", function () {
			let lazyImages = [].slice.call(document.querySelectorAll(".lazy-bg"));
			let active = false;

			const lazyLoad = function () {
				if (active === false) {
					active = true;

					setTimeout(function () {
						lazyImages.forEach(function (lazyImage) {
							if (((lazyImage.getBoundingClientRect().top - lazyImage.parentElement.clientHeight) <= window.innerHeight && (lazyImage.getBoundingClientRect().bottom + lazyImage.parentElement.clientHeight) >= 0) && getComputedStyle(lazyImage).display !== "none") {
								lazyImage.parentElement.style.backgroundImage = 'url(' + lazyImage.dataset.src + ')';
								lazyImage.src = lazyImage.dataset.src;
								// lazyImage.srcset = lazyImage.dataset.srcset;
								lazyImage.classList.remove("lazy");

								lazyImages = lazyImages.filter(function (image) {
									return image !== lazyImage;
								});

								if (lazyImages.length === 0) {
									document.removeEventListener("scroll", lazyLoad);
									window.removeEventListener("resize", lazyLoad);
									window.removeEventListener("orientationchange", lazyLoad);
									window.addEventListener("DOMContentLoaded", lazyLoad);
								}
							}
						});

						active = false;
					}, 200);
				}
			};

			document.addEventListener("scroll", lazyLoad);
			window.addEventListener("resize", lazyLoad);
			window.addEventListener("orientationchange", lazyLoad);
			window.addEventListener("DOMContentLoaded", lazyLoad);
		});



		document.addEventListener("DOMContentLoaded", function () {
			let lazyImages = [].slice.call(document.querySelectorAll("video.lazy"));
			let active = false;

			const lazyLoad = function () {
				if (active === false) {
					active = true;


					setTimeout(function () {
						lazyImages.forEach(function (lazyImage) {
							if (((lazyImage.getBoundingClientRect().top - lazyImage.parentElement.clientHeight * 4) <= window.innerHeight && (lazyImage.getBoundingClientRect().bottom + lazyImage.parentElement.clientHeight * 4) >= 0) && getComputedStyle(lazyImage).display !== "none") {
								lazyImage.poster = lazyImage.dataset.poster;
								// lazyImage.srcset = lazyImage.dataset.srcset;
								// lazyImage.classList.remove("lazy");

								lazyImages = lazyImages.filter(function (image) {
									return image !== lazyImage;
								});

								if (lazyImages.length === 0) {
									document.removeEventListener("scroll", lazyLoad);
									window.removeEventListener("resize", lazyLoad);
									window.removeEventListener("orientationchange", lazyLoad);
									window.addEventListener("DOMContentLoaded", lazyLoad);
								}
							}
						});

						active = false;
					}, 200);
				}
			};

			document.addEventListener("scroll", lazyLoad);
			window.addEventListener("resize", lazyLoad);
			window.addEventListener("orientationchange", lazyLoad);
			window.addEventListener("DOMContentLoaded", lazyLoad);
		});

		document.addEventListener("DOMContentLoaded", function () {
			var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

			if ("IntersectionObserver" in window) {
				var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
					entries.forEach(function (video) {
						if (video.isIntersecting) {
							for (var source in video.target.children) {
								var videoSource = video.target.children[source];
								if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
									videoSource.src = videoSource.dataset.src;
								}
							}

							video.target.load();
							video.target.classList.remove("lazy");
							lazyVideoObserver.unobserve(video.target);
						}
					});
				});

				lazyVideos.forEach(function (lazyVideo) {
					lazyVideoObserver.observe(lazyVideo);
				});
			}
		});
	},


	magnificPopupCall: function () {
		$('.popup-with-move-anim').magnificPopup({
			type: 'inline',
			fixedContentPos: true,
			fixedBgPos: true,
			overflowY: 'auto',
			closeBtnInside: true,
			preloader: false,
			removalDelay: 300,
			tClose: 'Закрыть (Esc)',
			mainClass: 'show-modal',
		});

		$('.modal-map-btn').click(function (e) {
			e.preventDefault();
			$.magnificPopup.open({
				items: {
					src: $(this).next(), // can be a HTML string, jQuery object, or CSS selector
				},
				type: 'inline',
				fixedContentPos: true,
				fixedBgPos: true,
				overflowY: 'auto',
				closeOnContentClick: false,
				closeBtnInside: false,
				preloader: false,
				removalDelay: 300,
				tClose: 'Закрыть (Esc)',
				mainClass: 'mfp-fade',
			})
		})


		$('[href="#modal-call"], [href="#modal-profile"]').click(function () {
			$($(this).attr('href')).find($(".form-wrap__title").text($(this).data('title')));
		})
		// / modal window

		// modal галерея
		$(".gal").each(function () {

			$(this).find("a:not(.popup-youtube)").magnificPopup({
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'show-modal ',
				tClose: 'Закрыть (Esc)',
				image: {
					verticalFit: true,
					// titleSrc: function(item) {
					//   return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
					// }
				},
				gallery: {
					enabled: true
				},

			});
		});

		$(".rew-gal").each(function () {

			$(this).find("a").magnificPopup({
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'show-modal show-gal show-gal-rew',
				tClose: 'Закрыть (Esc)',

				image: {
					verticalFit: true,
					// titleSrc: function(item) {
					//   return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
					// }
				},
				gallery: {
					enabled: true
				},

			});
		});


		$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			type: 'iframe',
			mainClass: 'show-modal',
			closeBtnInside: false,
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
		// /modal галерея
		
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
		});
		$(".modal-close-js").click(function() {
			$.fancybox.close();
		})
	},


	// табы  . 
	tabscostume: function (tab) {
		var params = {
			// slidesPerView: 5,
			slidesPerView: 1,
			watchOverflow: true,
			spaceBetween: 0,  
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: '.swiper-pagination--lg',
				clickable: true,
			},
			loop: true,  
			on: {
				init: function () { 
					JSCCommon.magnificPopupCall();
				},
			} 
		}

		var mySwiper5 = new Swiper($(".tabs__content.active").find('.slider--js3'), params); 
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
			.eq($(this).index()).addClass('active').fadeIn(function () {
				var slider = $(this).find('.slider--js3'); 
						slider.hasClass("swiper-container-initialized") 
						? mySwiper5.update()
						: mySwiper5 = new Swiper(slider, params)
					 
					});
			 
		});

		// }
		// mySwiper.on('init', function() { /* do something */ });
		// // mySwiper.slideNext();
		// mySwiper.init();
	},

	inputMask: function () {
		// mask for input
		$('input[type="tel"]').attr("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+9(999)999-99-99");
	},

	CustomInputFile: function CustomInputFile() {
		var file = $(".add-file input[type=file]");
		file.change(function () {
			var filename = $(this).val().replace(/.*\\/, "");
			var name = $(".add-file__filename  ");
			name.text(filename);

		});
	},




	// lazyJS: function () {
	// 	$('.lazy-js').Lazy();
	// },

	customRange: function () {
		var $d3 = $(".slider-js");

		$d3.ionRangeSlider({
			skin: "big",
			hide_min_max: 'true',
			hide_from_to: 'true',
		});

		$d3.on("change", function () {
			var $inp = $(this);
			var from = $inp.prop("value"); // reading input value
			var from2 = $inp.data("from"); // reading input data-from attribute

			$('.range-result-js').val(from); // FROM value
		});

		var $d3_instance = $d3.data("ionRangeSlider");
		$(document).on('change  input  cut  copy  paste', '.range-result-js', function () {
			var th = $(this);
			var data = th.val();
			var min = +data;
			// th.val(data + ' т')
			$d3_instance.update({
				from: min,
			})
		});
	},
	stickyFunc: function () {
		if (window.matchMedia("(min-width: 1200px)").matches) {

			$(".aside-nav").stick_in_parent({
				offset_top: $(".top-nav").height() + 30,
				inner_scrolling: true,
				parent: '.main-row',
				// // recalc_every: 1,
				//  recalc_every: true,
			});

		}
	},

	asideNav: function () {

		$('.toggle--js, .aside-nav__link--js').click(function () {
			var th = $(this);
			th.parent().find('.toggle--js').toggleClass('active')
				.next('.aside-nav__sub').slideToggle(function () {
					$(this).toggleClass('aside-nav__sub--open')
				})
				.parent().siblings().find('.toggle--js').removeClass('active')
				.next('.aside-nav__sub').slideUp(function () {
					$(this).removeClass('aside-nav__sub--open');
					$('.aside-nav').trigger("sticky_kit:recalc");
				})
			return false;
		});




		$('.toggle-btn-js').click(function () {

			$(this).toggleClass('active');

			$('.toggle-aside-nav-js').toggle();

			$('body').toggleClass('fixed');

		})
		$(window).resize(function () {
			if (window.matchMedia("(min-width: 1200px)").matches) {
				$('.toggle-btn-js').removeClass('active');
				$('body').removeClass('fixed');
				$('.toggle-aside-nav-js').hide();

			}
		});

	},

	accordion: function () {
		if (document.querySelector('.main-row__col-aside')) {
		var  ell = document.querySelector('.main-row__col-aside')

		$('.accord__head').click(function () {
			var th = $(this);
			th.next().slideToggle()
				.parent().siblings().find('.accord__body').slideUp(function(){

					ell.classList.add('align-self-baseline')
				});
				 return false;
				});
				window.addEventListener('scroll', function(){
					ell.classList.remove('align-self-baseline')
					
				})
				$('.accord__close').click(function () {
					var th = $(this);
					th.parents('.accord__body').slideUp(function(){

						ell.classList.remove('align-self-baseline')
					});
			return false;
		});
	}

	},
	videoBg: function () {
		if ($('div').is("#bgvid")) {

			var vid = document.getElementById("bgvid");


			if (window.matchMedia('(prefers-reduced-motion)').matches) {
				vid.removeAttribute("autoplay");
				vid.pause();
				pauseButton.innerHTML = "Paused";
			}

			function vidFade() {
				vid.classList.add("stopfade");
			}

			vid.addEventListener('ended', function () {
				// only functional if "loop" is removed 
				vid.pause();
				// to capture IE10
				vidFade();
			});

		}
	}



};

JSCCommon.LazyFunction();
/***/

jQuery(document).ready(function ($) {

	$(".main-wrapper").after('<div class="screen" style="background-image: url(screen/main.png);"></div>')

	// для свг
	svg4everybody({});
	// Custom JS

	// вызов magnificPopupCall
	JSCCommon.magnificPopupCall();

	JSCCommon.tabscostume('tabs');

	JSCCommon.inputMask();


	JSCCommon.CustomInputFile();

	JSCCommon.customRange();


	JSCCommon.stickyFunc();

	$(window).resize(function () {

		JSCCommon.stickyFunc();
	});

	JSCCommon.asideNav();
	JSCCommon.accordion();
	JSCCommon.videoBg();

	// / закрыть меню при горизонтальном свайпе
	// /закрыть/открыть мобильное меню

	function heightses() {

		var w = $(window).width();

		// $(".main-wrapper").css("margin-bottom", $('footer').height())
		// $(".otz__item .text-wrap ").height('auto').equalHeights();
		//


		// скрывает моб меню

		var topH = $(".header-block").innerHeight();

		function fixedMenu() {
			if ($(this).scrollTop() > (topH / 2)) {
				setTimeout(function () {
					$('.top-nav--js  ').addClass('fixed-ready');

				}, .6);
				$('.top-nav--js  ').addClass('fixed-top');
			} else {
				if (!$('.top-nav--js  ').hasClass('fixed')) {

					setTimeout(function () {
						$('.top-nav--js  ').removeClass('fixed-top');

					}, .6);
				}
				$('.top-nav--js  ').removeClass('fixed-ready');
			}


			if ($(this).scrollTop() > (topH * .8)) {
				$('.top-nav--js  ').addClass('fixed');
			} else {
				$('.top-nav--js  ').removeClass('fixed');
			}

		}
		fixedMenu();
		$(window).scroll(function () {


			fixedMenu();
		});
		// конец добавил
	}

	if (window.matchMedia("(min-width: 992px)").matches) {

		$(".toggle-menu-mobile--js").removeClass("on");
		// $("body").removeClass("fixed");
		$(".menu-mobile--js").removeClass("active");
		$("body").removeClass("fixed");
		$('.toggle-aside-nav-js').hide();
	}


	$(window).resize(function () {
		heightses();

	});
	$(window).on("load", function () {
		heightses();

	})

	heightses();



	// листалка по стр
	// $(" .top-nav a").click(function () {
	//        var elementClick = $(this).attr("href");
	//        var destination = $(elementClick).offset().top;

	//            $('html, body').animate({ scrollTop: destination }, 1100);

	//        return false;
	//    });
	$(" .header-block__down--js, .header-block__btn--js").click(function (e) {
		e.preventDefault();
		var elementClick = $(this).parents('.header').next();
		var destination = $(elementClick).offset().top - $('.top-nav').height() + 5;

		$('html, body').animate({
			scrollTop: destination
		}, 1100);

		return false;
	});



	function sliderSection(sec, sl, pag) {

		// slider
		$(sec).each(function () {
			var swiper4 = new Swiper($(this).find(sl), {
				// slidesPerView: 5,
				slidesPerView: 1,
				watchOverflow: true,
				spaceBetween: 0,
				watchOverflow: true,
				touchStartForcePreventDefault: true,
				autoplay: {
					delay: 3000,
				},
				pagination: {
					el: $(this).find(pag),
					clickable: true,
				},
				loop: true,
				loopFillGroupWithBlank: true,
				lazy: {
					loadPrevNext: true,
				},
				on: {
					init: function () {
						/* do something */
						JSCCommon.magnificPopupCall();
					},
				}

			});
		})
	}
	sliderSection('.section', '.slider--js', '.swiper-pagination')
	sliderSection('.section', '.slider--js2', '.swiper-pagination') 

 

	$('.section').each(function () {

		var swiper5 = new Swiper($(this).find('.s-client__slider--js'), {
			// slidesPerView: 5,
			slidesPerView: 3,
			watchOverflow: true,
			spaceBetween: 0,
			watchOverflow: true,
			slidesPerGroup: 2,
			slidesPerColumn: 2,
			spaceBetween: 30,

			lazy: {
				loadPrevNext: true,
			},

			// centeredSlides: true,
			// loop: true,
			// loopFillGroupWithBlank: true,
			// touchRatio: 0.2,
			// slideToClickedSlide: true, 
			navigation: {
				nextEl: $(this).find('.swiper-button-next'),
				prevEl: $(this).find('.swiper-button-prev'),
			},
			pagination: {
				el: $(this).find('.swiper-pagination'),
				clickable: true,
			},

		});

		var titles = [];
		$('.s-card-head__slider--js .swiper-slide').each(function (i) {
			titles.push($(this).data('thumb'))
		});
		var swiper6 = new Swiper($(this).find('.s-card-head__slider--js'), {
			// slidesPerView: 5,
			slidesPerView: 1,
			// centeredSlides: true,
			loop: true,
			loopFillGroupWithBlank: true,
			// touchRatio: 0.2,
			// slideToClickedSlide: true, 
			lazy: {
				loadPrevNext: true,
			},
			navigation: {
				nextEl: $(this).find('.swiper-button-next'),
				prevEl: $(this).find('.swiper-button-prev'),
			},
			pagination: {
				el: $(this).find('.prod-pagination'),
				clickable: true,
				renderBullet: function (index, className) {
					return '<div class="' + className + ' img-bg  " style="background-image: url(' + titles[index] + ')"></div>';
				},
			},

		});

		var swiper7 = new Swiper($(this).find('  .s-video__slider--js'), {
			// slidesPerView: 5,
			slidesPerView: 1,
			watchOverflow: true,
			spaceBetween: 30,
			lazy: {
				loadPrevNext: true,
			},
			// autoplay: {
			// 	delay: 3000,
			// },
			pagination: {
				el: $(this).find('.swiper-pagination'),
				clickable: true,
			},
			navigation: {
				nextEl: $(this).find('.swiper-button-next'),
				prevEl: $(this).find('.swiper-button-prev'),
			},
			loop: true,
			loopFillGroupWithBlank: true,
		 
			breakpoints: {
				// when window width is <= 320px

				// when window width is <= 480px
				768: {
					slidesPerView: 20,
					spaceBetween: 0,
					loop: false,
				},
				 
			},
			on: {
				init: function () {
					/* do something */
					JSCCommon.magnificPopupCall();
				},
			}
		});

		var swiper8 = new Swiper($(this).find('.s-team__slider--js '), {
			// slidesPerView: 5,
			slidesPerView: 3,
			slidesPerGroup: 3,
			watchOverflow: true,
			loop: true,
			spaceBetween: 30,
			lazy: {
				loadPrevNext: true,
			},
			pagination: {
				el: $(this).find('.swiper-pagination'),
				clickable: true,
			},
			navigation: {
				nextEl: $(this).find('.swiper-button-next'),
				prevEl: $(this).find('.swiper-button-prev'),
			},
			breakpoints: {
				// when window width is <= 320px

				// when window width is <= 480px
				480: {
					slidesPerView: 1,
					spaceBetween: 10,
					slidesPerGroup: 1,
				},
				// when window width is <= 640px
				768: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				}
			}
		});

	})


	// modal window
	// var $d4 = $(".range-block ");

	// $(this).find('.slider-js').ionRangeSlider({

	// 	onChange: function () {
	// 		$(this).find('.form-control').val(from);
	// }
	// });



	// var wow = new WOW({
	// 	mobile: false
	// });
	// wow.init();

	$(".btn-close-js").click(function () {
		$.magnificPopup.close();
	})


	// Instantiate EasyZoom instances
	var $easyzoom = $('.easyzoom').easyZoom({
		loadingNotice: ""
	});



});