jQuery(document).ready(function ($) {
	$(".main-wrapper").after('<div class="screen" style="background-image: url(screen/main.png);"></div>')
	// whenever we hover over a menu item that has a submenu
	$('.site-nav__item').on('mouseover', function () {
		var $menuItem = $(this),
			$submenuWrapper = $('> .sub-menu-wrap', $menuItem);
		// grab the menu item's position relative to its positioned parent

		var menuItemPos = $menuItem.position();
		var menuItemHeight = $menuItem.height();
		var submenuWrapperHeight = $submenuWrapper.height();
		let windowHeight = $(window).height();
		// place the submenu in the correct position relevant to the menu item
		$submenuWrapper.css({
			left: $menuItem.width()
		});
		// console.log(menuItemPos.top );
		if (((menuItemPos.top + $submenuWrapper.height()) >= windowHeight)
			&& ($submenuWrapper.height() <= windowHeight)) {
			$submenuWrapper.css({
				top: (windowHeight - submenuWrapperHeight),
				// bottom: (menuItemPos.top + menuItemHeight)
			});
		}
		else if ($submenuWrapper.height() > windowHeight) {
			$submenuWrapper.css({
				top: 0,
			});
		}
		else {

			$submenuWrapper.css({
				top: menuItemPos.top,
			});
		}

	});

	if (window.matchMedia("(min-width: 1200px)").matches) {

		$(".top-nav").stick_in_parent({
			// offset_top: $(".top-nav").height() + 30,
			inner_scrolling: true,
			parent: 'body',
			// // recalc_every: 1,
			//  recalc_every: true,
		});

		
		// Cache selectors
		var lastId,
		topMenu = $(" .top-nav ul"),
				topMenuHeight = 20,
				// topMenuHeight = topMenu.outerHeight()+15,
				// All list items
				menuItems = topMenu.find("a"),
				// Anchors corresponding to menu items
				scrollItems = menuItems.map(function(){
					var item = $($(this).attr("href"));
					if (item.length) { return item; }
				});

		// Bind click handler to menu items
		// so we can get a fancy scroll animation
		menuItems.click(function(e){
			var href = $(this).attr("href"),
					offsetTop = href === "#" ? 0 : $(href).offset().top + 1;
			$('html, body').stop().animate({ 
					scrollTop: offsetTop
			}, 1100);
			e.preventDefault();
			lastId = $(this).parent();
			
		});
		function getFirst(){
			menuItems
					.removeClass("active").parent()
					.first().find('a').addClass("active");
		}
		getFirst();
		// Bind to scroll
		$(window).scroll(function(){
			// Get container scroll position
			var fromTop = window.matchMedia("(min-width: 1200px)").matches 
									? ($(this).scrollTop()+topMenuHeight) 
									:( $(this).scrollTop()+topMenuHeight + 67 );
			
			// Get id of current scroll item
			var cur = scrollItems.map(function(){
				if ($(this).offset().top < fromTop)
					return this;
			});
			// Get the id of the current element
			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur[0].id : "";
			// if()
			// console.log(cur)
		
			var menuItemPos = $(".top-nav").position(); 
			let body= $('body').height();
			let win = $(this).height();
			let  firstLi =  menuItems.first();


			// console.log($(this).scrollTop());
			// console.log(body );
			// console.log( win);
			// console.log(body - win);
			if ((body - win) <= fromTop ) {
				lastId = id;
				// Set/remove active class
				menuItems
					.removeClass("active").parent()
					.last().find('a').addClass("active");
				}
			else if (fromTop < win) {
				getFirst();
			}
			else{
				if (lastId !== id) {
					
					lastId = id;
					// Set/remove active class
					menuItems
					.removeClass("active").parent()
					.end().filter("[href='#"+id+"']").addClass("active");
				}       
			}
		});

		};
		// $(' .select-js').select2({
		// 	// language: "ru", 
		// 	tags: true,
		// 	tokenSeparators: [',', ' ']
		// });
		$('.select-js').selectize();
		// setTimeout(function() {
		// 	$(' .select-js').styler({
		// 		selectVisibleOptions: 10,
		// 		selectSmartPositioning: false,
		// 	});
		// }, 100)
		let isMobile = {
			Android: function() {
					return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
					return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
					return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
					return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
					return navigator.userAgent.match(/IEMobile/i);
			},
			any: function() {
					return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			}
	};
	if (isMobile.any()) {
			// click
			$(".select-js-wrap").addClass('d-none');
			$(".select-default").removeClass('d-none');

		} else {
			// console.log(isMobile);
			$(".select-js-wrap").removeClass('d-none');
			$(".select-default").addClass('d-none');
		 
	 }

	 $(".toggle-menu-mobile--js2").click(function(){
		$(this).toggleClass('on');
	 $(".aside--js").toggleClass('active');
	 $("body").toggleClass("fixed");
 })


 $(".menu-mobile-page__inner .menu > .menu-item-has-children > a").click(function (e) {
	e.preventDefault();
	$(this).parent().toggleClass("active").siblings().removeClass("active");
	searchTogggle();
	$(this).next().toggleClass("active");
	// $(".top-submenu--js").slideUp(0);

});

$(".site-nav__item--has-child > a").each(function(){
	var title= $(this).text();
	var href= $(this).attr("href");
	var toggleBlock = $(this).next().find("ul");
	toggleBlock.prepend(`<li class="hide-parent-js d-sm-none"> ${title} </li>
											<li class="sub-menu__item">
												<a class="sub-menu__link" href="${href}">${title} </a>
											</li>`)
	$(this).click(function (e) {
			e.preventDefault();
			// $(this).parent().toggleClass("active").siblings().removeClass("active");
			// searchTogggle();
			
			$(".top-line").toggleClass("invisible");
			$(this).next().toggleClass("active");
			// setTimeout(() => {
			// },500);
			// $(".top-submenu--js").slideUp(0);
			
	})
});
$(".hide-parent-js").click(function(){
	$(this).parents(".sub-menu-wrap").removeClass('active');
	$(".top-line").removeClass("invisible");
})

	// анимация кнопок
	$(".btn-primary, .btn-js").each(function() {
		var B = $(this);
		var A, C, z, D;
		setInterval(function() {
				if (B.find(".animate-js").length === 0) {
						B.prepend("<span class='animate-js'></span>");
				}
				A = B.find(".animate-js");
				A.removeClass("btn_animate");
				if (!A.height() && !A.width()) {
						C = Math.max(B.outerWidth(), B.outerHeight());
						A.css({
								height: C,
								width: C
						});
				}
				z = Math.round(Math.random() * A.width() - A.width() / 2);
				D = Math.round(Math.random() * A.height() - A.height() / 2);
				A.css({
						top: D + "px",
						left: z + "px"
				}).addClass("btn_animate");
		}, 3000);
});
})