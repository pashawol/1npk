jQuery(document).ready(function ($) {
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
					offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
			$('html, body').stop().animate({ 
					scrollTop: offsetTop
			}, 1100);
			e.preventDefault();
		});

		// Bind to scroll
		$(window).scroll(function(){
			// Get container scroll position
			var fromTop = $(this).scrollTop()+topMenuHeight;
			
			// Get id of current scroll item
			var cur = scrollItems.map(function(){
				if ($(this).offset().top < fromTop)
					return this;
			});
			// Get the id of the current element
			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur[0].id : "";
			
			if (lastId !== id) {
					lastId = id;
					// Set/remove active class
					menuItems
						.removeClass("active").parent()
						.end().filter("[href='#"+id+"']").addClass("active");
			}                   
		});

		};
		$(' .select-js').select2({
			// language: "ru", 
			tags: true,
			tokenSeparators: [',', ' ']
		});
		// setTimeout(function() {
		// 	$(' .select-js').styler({
		// 		selectVisibleOptions: 10,
		// 		selectSmartPositioning: false,
		// 	});
		// }, 100)
})