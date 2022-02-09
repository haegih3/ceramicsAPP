(function($) {
  $(function() {
    var $win = $(window),
        posY;
		
	//캘린더 호출
	$('.start_date').datepicker({
		dateFormat: 'yy-mm-dd'
		,showButtonPanel: true
        ,yearSuffix: "년"
		,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
        ,dayNamesMin: ['일','월','화','수','목','금','토']
		
	});
	$('.end_date').datepicker({
		dateFormat: 'yy-mm-dd'
		,showButtonPanel: true
        ,yearSuffix: "년"
		,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
        ,dayNamesMin: ['일','월','화','수','목','금','토']
	});
	  
    //header 메뉴버튼
    $('header').each(function() {
        var header = $(this),
            $menu = header.find('.all-menu'),
            $gnbGroup = header.find('.gnb-group'),
            $bg = header.find('.gnb-bg'),
            $gnb = header.find('.gnb-cont'),
            sp = 300;
		
        $menu.on('click', function(e) {
            e.preventDefault();
            
            $(this).toggleClass('on');
            $gnbGroup.toggleClass('on');
            if ($gnbGroup.hasClass('on')) {
                //스크롤막기
                posY = $win.scrollTop();
                $("html, body").addClass("not_scroll");
                //내린지점만큼에서 - 위로 딸려 올라가지 않게
                $("section").css("top", -posY);
                
                $gnb.stop().animate({'right': 0}, sp);
                $bg.fadeIn();
            } else {
                $gnb.stop().animate({'right': '-150%'}, sp);
                $bg.fadeOut();
                
                $("html, body").removeClass("not_scroll");
                posY = $win.scrollTop(posY);
            }
            //바탕 어두운부분 클릭했을 때 메뉴닫기
            $bg.on('click', function() {
                $bg.fadeOut();
                $menu.removeClass('on');
                $gnbGroup.removeClass('on');
                $gnb.stop().animate({'right': '-150%'}, sp);
                
                $("html, body").removeClass("not_scroll");
                posY = $win.scrollTop(posY);
            });
        });
        //로그인 로그아웃 버튼
        var login = header.find('.gnb-login'),
            loginBTN = header.find('.btn-submit'),
            logoutBTN = header.find('.logout');
		
        loginBTN.on('click', function(e) {
            e.preventDefault();
            login.hide();
            logoutBTN.css('display', 'block')
        });
		
        logoutBTN.on('click', function(e) {
            e.preventDefault();
            
            login.show();
            logoutBTN.css('display', 'none')
        });
    });
    
    //인디케이터
    $('.indicator').on('click', 'a', function(e) {
        e.preventDefault();

        if ($(this).hasClass('on')) {
            return;
        }

        $('.indicator').find('a').removeClass('on');
        $(this).addClass('on');
    });
      
    //숫자입력창 문자입력 안되게 하기
    $("input:text[numberOnly]").on("keyup", function() {
        //천단위마다 콤마 생성 함수
        function addComma(data) {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        $(this).val(addComma($(this).val().replace(/[^0-9]/g,"")));
    });
    
    //about 내용 펼치기
    $('.about-list').each(function() {
        var $allList = $(this),
            menu = $allList.find('a'),
            articles = menu.siblings();
        
        menu.on('click', function(e) {
            e.preventDefault();
            
            var currentAnchor = $(this),
                $currentDiv = $(currentAnchor.attr('href'));
            if (currentAnchor.hasClass('on')) {
                currentAnchor.removeClass('on');
                $currentDiv.slideUp();
            } else {
                currentAnchor.addClass('on');
                $currentDiv.slideDown();
                new daum.roughmap.Lander({
                    "timestamp" : "1607670840515",
                    "key" : "23fsh",
                }).render();
            }
        });
    });
    
    //product 카테고리버튼 클릭하면 보이기
    $('.btn-plus').on('click', function(e) {
        e.preventDefault();

        var $listName = $($(this).attr('href'));
        $listName.fadeIn();
        //스크롤막기
        posY = $win.scrollTop();
        $("section").addClass("not_scroll");
        //내린지점만큼에서 - 위로 딸려 올라가지 않게
        $("section").css("top", -posY);
    });
    //뒤로가기 클릭하면 카테고리 팝업 끄기
    $('.btn-close').on('click', function(e) {
        e.preventDefault();
          
        var $listName = $($(this).attr('href'));
        $listName.fadeOut();
        $("section").removeClass("not_scroll");
        posY = $win.scrollTop(posY);
    });
	
    //product 탭메뉴(종류별)
    $('.pro-tab').each(function() {
        var $tab = $(this),
                $tabMenu = $tab.find('.tab-menu'),
                $div = $tab.find('.prd-list'),
                sp = 500;
		
        $tabMenu.on('click', 'a', function(e) {
            e.preventDefault();

            if ($(this).hasClass('on')) {
                return;
            }

            $tabMenu.find('a').removeClass('on');
            $(this).addClass('on');
            $div.hide();

            $($(this).attr('href')).fadeIn(sp);
        });
    });
      
    //notice, papers 게시글 펼쳐보이기
    $('.brd-list').each(function() {
        var $allList = $(this),
            menu = $allList.find('a');
        
        menu.on('click', function(e) {
            e.preventDefault();
            
            var $currentAnchor = $(this),
                $article = $(this).siblings();
            if ($currentAnchor.hasClass('on')) {
                $currentAnchor.removeClass('on');
                $article.slideUp();
            } else {
                $currentAnchor.addClass('on');
                $article.slideDown();
            }
        });
    });
    
    //product_info 관심등록 버튼 누르면 팝업 띄우기
    $('#product_info').each(function() {
        $('.btn-register').on('click', function(e) {
            e.preventDefault();

            var $listName = $($(this).attr('href')),
                popBg = $listName.find('.pop-gb'),
                btn = $listName.find('button');
			
            $listName.fadeIn();
            //대답버튼 누르면 팝업창 닫기
            btn.add(popBg).on('click', function() {
                $listName.fadeOut();
            });
        });
    });
    
    //favor 클릭하면 선택된 아이콘 나오고 가상견적 버튼 보이기
    $('#favor').each(function() {
        var $favor = $(this) ,
            $thumbnailA = $favor.find('.prd-thumb a'),
            btn = $favor.find('.btn-register');
		
        $thumbnailA.on('click', function(e) {
            e.preventDefault();
            
            $(this).toggleClass('on');
            if ($thumbnailA.hasClass('on')) {
                btn.show();
            } else {
                btn.hide();
            }
        });
    });
	  
	//favor_sheet 적용하기 클릭하면 결과보이기
    $('#favor_sheet').each(function() {
        var $sheet = $(this),
            btn = $sheet.find('.btn-submit'),
            $result = $sheet.find('.result');
		
        btn.on('click', function() {
            $result.show();
        });
    });
    
    //deal 결과보기
    $('.deal').each(function() {
		var $deal = $(this),
			$search = $deal.find('.contents'),
			btn = $deal.find('.btn-submit'),
			$result = $deal.find('.deal-result');
		
        btn.on('click', function(e) {
        	e.preventDefault();
            $result.show();
        });
		
		//input창 클릭했을 때 아래 fixed부분 없애기
		$('.deal-search input').focus(function(){
			$('.result-desc').css('display','none');
		});
		$('.deal-search input').blur(function(){
			$('.result-desc').css('display','block');
		});
		
		//하단 결과창 접었다 펴기
		var $resultDesc = $deal.find('.result-desc'),
			btn = $resultDesc.children('a');
		btn.on('click', function(e) {
        	e.preventDefault();
			
            $resultDesc.toggleClass('on');
        });
    });
	
	  
  });
})(jQuery);