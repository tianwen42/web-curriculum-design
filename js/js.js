// footer计时
function siteTime() {
	var seconds = 1000;
	var minutes = seconds * 60;
	var hours = minutes * 60;
	var days = hours * 24;
	var now = new Date();
	var start = new Date(2020, 5, 27, 0, 0, 0);
	var diff = now.getTime() - start.getTime();
	var diffDays = Math.floor(diff / days);
	var diffHours = Math.floor((diff % days) / hours);
	var diffMinutes = Math.floor((diff % hours) / minutes);
	var diffSeconds = Math.floor((diff % minutes) / seconds);

	document.getElementById("sitetime").innerHTML = "小破站已运行 " + diffDays + " 天 " + diffHours +
		" 小时 " + diffMinutes + " 分钟 " + diffSeconds + " 秒";
}


function clikOn() {

	var a_idx = 0;

	jQuery(document).ready(function ($) {

		$("body").click(function (e) {
			if ($(e.target).closest(".bk-image").length) {
				return;
			}

			var a = new Array("❤富强❤", "❤民主❤", "❤文明❤", "❤和谐❤", "❤自由❤", "❤平等❤", "❤公正❤", "❤法治❤", "❤爱国❤", "❤敬业❤", "❤诚信❤", "❤友善❤");

			var $i = $("<span></span>").text(a[a_idx]);

			a_idx = (a_idx + 1) % a.length;

			var x = e.pageX,

				y = e.pageY;

			$i.css({

				"z-index": 999999999999999999999999999999999999999999999999999999999999999999999,

				"top": y - 20,

				"left": x,

				"position": "absolute",

				"font-weight": "bold",

				"color": "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"

			});

			$("body").append($i);

			$i.animate({

				"top": y - 180,

				"opacity": 0

			},

				1500,

				function () {

					$i.remove();

				});

		});

	});
}

