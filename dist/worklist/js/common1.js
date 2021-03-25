/********************************************************************************
* 온로드 실행 함수
*********************************************************************************/
$(function(){
	$(function() {
		loadSortTable();
		loadList();
		$('.tbl-type1.sorttable tr:nth-child(even)').addClass('even');
	});
});

function loadList(){
	var total_files = $('table.sorttable>tbody>tr').size() - $('table.sorttable>tbody>tr.delete').size();
	var final_files = $('table.sorttable>tbody>tr>td:nth-child(8)').filter(function() {return this.innerHTML.match(/[^&nbsp;]/)}).size(); // 공백
	var waiting_files = total_files - final_files;
	var html_percent = (final_files / total_files) * 100;
	$('.total_files').text(total_files);
	$('.final_files').text(final_files);
	$('.waiting_files').text(waiting_files);
	$('.html_percent').text(html_percent.toFixed(3)); // 소수자리 지정

	$('.sorttable>tbody>tr>td:last-child').each(function() {

		if($(this).html()&&$(this).html()!="&nbsp;"){
			var data1 = '<div class="layer-type1 layer-type1-w1">';
			data1 += '	<div class="layer-header">';
			data1 += '		<h1>수정내역</h1>';
			data1 += '		<button class="btn-close">타이틀 컨텐츠 닫기<span></span></button>';
			data1 += '	</div>';
			data1 += '	<div class="layer-content">';
			data1 += $(this).html();
			data1 += '	</div>';
			data1 += '</div>';

			var modify_link = $('<a>').attr("href","#modityDiaog");
			$(modify_link).append('수정내역');
			$(modify_link).css('cursor', 'pointer');
			$(this).html(modify_link);

			$(modify_link).modalCon({
				data : data1
			});
		}
	});
}

function loadSortTable(obj) {
	var i = 1;
	$('.sorttable').find('>tbody>tr>td:first-child').each(function() {
		$(this).text(i);
		i++;
	});
	$('.sorttable').find('>tbody>tr>td').not(':first-child').each(function() {
		if(!$(this).html()) $(this).html('&nbsp;');
	});
	$('.sorttable').tablesorter({sortList: [[0,0]]});
}

/*****************************************
	동적 ajax호출
*****************************************/
var ajaxCall = function(url, result, soption, callback) {
	$.ajax({
		url : url,
		success: function(data) {
			$(result).empty();

			if(soption) data = data;
			else data = dataProcessing(unescape(data));

			$(data).appendTo(result);	// 동적 콘텐츠 생성시 반드시 append, appendTo를 사용하여 DOM을 추가한다.
			if (typeof callback === 'function') {
				callback();
			};
		},
		error : function(event, jqXHR, ajaxSettings, thrownError) {
			// event + ', ' +  jqXHR + ', ' + ajaxSettings + ', ' + thrownError
			alert(thrownError);
		}

	});
};

/***********************************************
* 레이어팝업 닫기
************************************************/
function modalClose(){
	var modelEventEl = $('a[href="#'+$('.wrap-layer-on').attr('id')+'"]').eq(0);
	$(".wrap-layer-on").remove();
	$(".modal-overlay").fadeOut();
	modelEventEl.focus();
}

/***********************************************
* 레이어 팝업
************************************************/
;(function($) {

	$.fn.modalCon = function(options){
		return this.each(function(n) {
			options = options || {};
			var opts = $.extend({}, $.fn.modalCon.defaults, options || {});
			var that = this;
			var $cont = $(this);		//이벤트호출객체 a
			var $contWrap;			//레이어컨텐츠
			var $contCon;			//레이어컨텐츠내부 컨텐츠영역
			var contWrapID;			//레이어아이디

			$cont.bind('click', function(ev) {
				ev.preventDefault();
				init();
			});

			var init = function() {

				modalClose();

				if (opts.callbackBefore) {
					if (typeof opts.callbackBefore === 'function') {
						var chk_process = false;
						if(opts.url){
							chk_process = opts.callbackBefore.call($cont);
						}else{
							opts.data = opts.callbackBefore.call($cont);
							if(opts.data) chk_process = true;
						}
						if (!chk_process) return;
					}
				}

				contWrapID = $cont.attr("href").split('#')[1];

				/* opts.appendNext 이 true일경우 이벤트가 일어난 객체 다음 형제노드로 레이어추가 */
				if(opts.appendNext){
					$contWrap = $('<div>')
						.addClass(opts.onClass);
					$cont.after($contWrap);
				}else{
					$contWrap = $('<div>')
						.addClass(opts.onClass)
						.appendTo('body');
				}

				$contWrap.attr('id', contWrapID);

				/* 레이어팝업 컨텐츠 세팅 */
				if (opts.url) {	// url trim 검사 필요(추후 trim 범용 함수 제작)
					ajaxCall(opts.url, $contWrap, opts.sCheck, function() {
						setModalCon();
					});
				}
				if (opts.data) {
					$contWrap.html(opts.data);
					setModalCon();
				}

				/* 레이어오픈 : 이벤트 및 애니메이션 설정 */
				function setModalCon(){

					$contCon = $contWrap.find(opts.layerWrap);

					var browser_width = $(window).width();
					var browser_height = $(window).height();
					var layer_width = $contCon.outerWidth();
					var layer_height = $contCon.outerHeight();
					var margin_top = Math.floor(layer_height /2) * (-1) + 'px';
					var margin_left = Math.floor(layer_width /2) * (-1) + 'px';
					var position_left = "50%";
					var position_top = $(window).scrollTop() + ((browser_height-layer_height)/2);

					//모달출력
					if (opts.modal){
						if(opts.modalEffect) $contWrap.before($("<div>").addClass(opts.modalClass).css("opacity",0).animate({"opacity":0.3}));
						else $contWrap.before($("<div>").addClass(opts.modalClass));
						$("."+opts.modalClass).css({'width' : browser_width, 'height' : browser_height});
					}

					//레이어팝업형태로 추가될경우 위치재설정
					if(!opts.appendNext){
						if(browser_height<=layer_height) position_top = 0;
						var margin_left = (-1)*(layer_width/2);

						if(opts.positionTop) position_top  = opts.positionTop + $(window).scrollTop();

						$contCon.css({
							"left" : position_left,
							"top" : position_top,
							"marginLeft" : margin_left+"px"
						});
					}

					// 센스리더 구동시에는 타켓 지정된 첫 번째 요소로 이동하지만 포커스는 닫기 버튼으로 이동시킨다.
					$contWrap.find(".btn-close").eq(0).focus();

					//로드 콜백함수 실행
					if (typeof opts.callbackLoad === 'function') {
						opts.callbackLoad.call($cont);
					};

					//닫기버튼 이벤트설정
					$contWrap.find(opts.close_trigger).bind("click",function(){
						callModalClose();
						$cont.focus();
						return false;
					});

					// 이벤트 바인딩 된 요소, 레이어 요소외 다른 요소를 클릭하였을 경우 모달 닫기
					$(document).unbind('click.modalHIde');
					/*
					$(document).on('click.modalHIde', function(e){
						if (!$(e.target).closest('#' + contWrapID).length && !$(e.target).closest(that).length) {
							callModalClose();
							$(document).unbind('click.modalHIde');
							return;
						}
					});
					*/
				}

				/* 04. 레이어닫기 */
				function callModalClose(){
					$contWrap.remove();
					$("."+opts.modalClass).fadeOut(function(){
						$(this).remove();
					});
					if (typeof opts.callbackAfter === 'function') {
						opts.callbackAfter.call($cont);
					};

					$(document).unbind('click.modalCon');
				}
			};
		});
	};

	$.fn.modalCon.defaults = {
		modal : true,
		modalClass : "modal-overlay",
		modalEffect : true,
		onClass : "wrap-layer-on",
		layerWrap : ".layer-type1",
		layerContent : ".layer-content",
		close_trigger : '.btn-close',
		appendNext : false,
		url: false,
		data : false,
		sCheck : false,
		positionTop : false,
		callbackBefore: null,//function() {},
		callbackLoad : null,//function() {},
		callbackAfter: null//function() {},
	}
})(jQuery);