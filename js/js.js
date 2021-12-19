// footer计时
function siteTime() {
	var seconds = 1000;
	var minutes = seconds * 60;
	var hours = minutes * 60;
	var days = hours * 24;
	var years = days * 365;
	var today = new Date();
	var startYear = "2021";
	var startMonth = "1";
	var startDate = "1";
	var startHour = "0";
	var startMinute = "0";
	var startSecond = "0";
	var todayYear = today.getFullYear();
	var todayMonth = today.getMonth() + 1;
	var todayDate = today.getDate();
	var todayHour = today.getHours();
	var todayMinute = today.getMinutes();
	var todaySecond = today.getSeconds();
	var t1 = Date.UTC(startYear, startMonth, startDate, startHour, startMinute, startSecond);
	var t2 = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond);
	var diff = t2 - t1;
	var diffYears = Math.floor(diff / years);
	var diffDays = Math.floor((diff / days) - diffYears * 365);
	var diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours);
	var diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) /
		minutes);
	var diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours -
		diffMinutes * minutes) / seconds);

	document.getElementById("sitetime").innerHTML = "小破站已运行 " + diffDays + " 天 " + diffHours +
		" 小时 " + diffMinutes + " 分钟 " + diffSeconds + " 秒";
}


function clikOn() {

	var a_idx = 0;

	jQuery(document).ready(function ($) {

		$("body").click(function (e) {

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

