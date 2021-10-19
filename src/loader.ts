/*
	creater: nowonbun@gmail.com
	date: 2019/10/16
*/
var loader = (($clz) => {
	$clz.init();
	$($clz.onLoad);
	return $clz;
})((() => {
	var preventReload = true;
	var isLoading = false;
	return {
		init: () => {
			window.onbeforeunload = () => {
				if (preventReload && isLoading) {
					return true;
				}
			}
			document.onkeydown = (event) => {
				let code = event.key;
				if (preventReload && isLoading) {
					console.log(code);
					if ((event.ctrlKey == true && (code === 'KeyN' || code === 'KeyR')) || (code === 'F5')) {
						//event.keyCode = 0;
						event.cancelBubble = true;
						//event.returnValue = false;
					}
				}
			}
		},
		onLoad: () => {
			$("body").prepend('<div class="loader"></div><section class="loader-layout"></section>');
		},
		setStyle: (style: string) => {
			$(".loader").addClass(style);
		},
		setReload: (is: boolean) => {
			if (is === false) {
				preventReload = false;
			} else {
				preventReload = true;
			}
		},
		on: function (cb: any = null) {
			isLoading = true;
			$(".loader").addClass("on");
			$(".loader-layout").addClass("on");
			if (cb !== null && typeof cb === "function") {
				cb.call(this);
			}
		},
		off: function (cb: any = null) {
			isLoading = false;
			$(".loader").removeClass("on");
			$(".loader-layout").removeClass("on");
			if (cb !== null && typeof cb === "function") {
				cb.call(this);
			}
		}
	}
})());