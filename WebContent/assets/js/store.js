function searchParam(key) {
  return new URLSearchParams(location.search).get(key);
};

function isEmpty(str){
      
      if(typeof str == "undefined" || str == null || str == "")
         return true;
      else
         return false ;
   }

// @@@@@@@@@@ 선택된 카테고리만 css 부여하는 js @@@@@@@@@@@@
$(".categori").on("click", function () {
  $(this).css("background-color", "rgb(50, 50, 50)");
  $(this).css("color", "white");

  $(".categori").not(this).css("background-color", "white");
  $(".categori").not(this).css("color", "black");
});

// @@@@@좋아요 버튼 누를시에 색상 변경 흰색->빨간색 빨간색->흰색@@@@@@@@@@
$('.post-container').on("click",".like-btn", function () {  
  if ($(this).hasClass("active")) {
    // 이미 클릭한 경우
    $(this).removeClass("active");
    $(this).css("background-image", "");
    $(this)
      .parent()
      .parent()
      .siblings()
      .find(".before-like-btn")
      .attr(
        "src",
        "https://cdn.loud.kr/prod/LOUD_IMG/designer/new/heart-gray-fill.png"
      );
  } else {
    // 처음 클릭하는 경우
    $(this).addClass("active");
    $(this).css(
      "background-image",
      "url(https://cdn.loud.kr/prod/LOUD_IMG/designer/new/heart-red-fill.png)"
    );
    $(this)
      .parent()
      .parent()
      .siblings()
      .find(".before-like-btn")
      .attr(
        "src",
        "https://cdn.loud.kr/prod/LOUD_IMG/designer/new/heart-red-fill.png"
      );
  }
});

// @@@@@@@ 팔로우 팔로잉 버튼 @@@@@@@@@@@@

$(".post-container").on("click", '.follow-btn', function () {
  if ($(this).children(".follow").css("display") != "none") {
    $(this).children(".follow").css("display", "none");
    $(this).children(".following").css("display", "inline-block");
  } else {
    $(this).children(".follow").css("display", "inline-block");
    $(this).children(".following").css("display", "none");
  }
});

// @@@@@@ 헤더 카테고리 선택시 색상 변경 @@@@@@@
$(".header-list").on("click", function () {
  $(this).css("color", "rgb(42, 197, 198)");

  $(".header-list").not(this).css("color", "#5b696f");
});

// @@@@@@ 판당픽 / 추천순 / 최신순 / 무료  클릭시 색상 변경@@@@@@@
$(".choice-list").on("click", function () {
  $(this).css("color", "rgb(42, 197, 198)");

  $(".choice-list").not(this).css("color", "#5b696f");
});

// @@@@@ 모달 프로필 이미지 백그라운드 @@@@@
$("#modal-img-box").on({
  mouseover: function () {
    $(".modal-img-background").css("display", "block");
  },
  mouseout: function () {
    $(".modal-img-background").css("display", "none");
  },
});


// @@@@@@ 댓글 수정 버튼 누를 시 @@@@@@@@@@
$(".comment-edit-btn").on("click", function () {
  $(this)
    .parent()
    .parent()
    .parent()
    .parent(".comment-list")
    .css("height", "300px");

  $(".comment-edit-box").css("display", "block");
  $(".edit-btn-box").css("display", "flex");

  // 작성 돼 있던 댓글 숨기기
  $(this)
    .parent()
    .parent()
    .siblings(".comment")
    .children(".comment-content")
    .css("display", "none");
});

// @@@@@@@ 모달 신고하기 버튼 누를 시 @@@@@@@@
$(".modal-report-btn").on("click", function () {
  $(".report-path").css("display", "block");

  // 재클릭시 안보이게하기
  if ($(this).data("clicked")) {
    $(".report-path").css("display", "none");
  }
});

// @@@@@@@ 신고하기 버튼 클릭시 색 @@@@@@
$(".report-btn-color").on({
  mouseover: function () {
    $(this).css("color", "rgb(255, 0, 0)");
  },
  mouseout: function () {
    if ($(this).data("clicked") !== true) {
      $(this).css("color", "rgb(0, 0, 0)");
    }
  },
  click: function () {
    if ($(this).data("clicked") !== true) {
      $(this).css("color", "rgb(255, 0, 0)").data("clicked", true);
    } else {
      $(this).css("color", "rgb(0, 0, 0)").data("clicked", false);
    }
  },
});



//처음 페이지 설정

function showStore(result) {
   $('.post-container').html('');
         for(let i=0; i<result.list.length; i++){   
            if(isEmpty(result.list[i].storeFileSystemName)){
               
               $('.post-container').append(`<div class="post-box-container">    
				<input type="hidden" class="memberNumber" value="${sessionScope.memberNumber}" />
                  <div class="post-img-container">
                    <div class="post-img-box-wrap">
                      <img
                        class="post-front-img"
                        src="/assets/img/default.png"
                        alt=""
                      />
                      <div class="post-img-back" data-num="${result.list[i].storeNumber}"></div>
                      <button type="button" class="like-btn">좋아요</button>
                      <div class="modal-background"></div>
                      <div class="modal-test"></div>
                    </div>
                  </div>
                   <div class="post-title-box">${result.list[i].storeTitle}</div>
                  <div class="writer-container">
                    <div class="channel-profile-box">
                      <a href="#" class="profile-img-box">
                        <img
                          class="profile-img"
                          src="/upload/${result.list[i].channelFileSystemName }"
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="writer-box">
                      <a href="" class="writer-name">${result.list[i].memberNickname}</a>
                    </div>
                    <font>·</font>
                    <div class="follow-btn-box">
                      <button type="button" class="follow-btn">
                        <span class="follow">팔로우</span>
                        <!-- 팔로우 버튼 누를 시 팔로잉 으로 떠야함 일단은 display none처리 했음 -->
                        <img
                          class="following"
                          src="https://cdn.loud.kr/LOUD_IMG/main/ico-check-follow.png"
                          alt=""
                        />
                        <span class="following">팔로잉</span>
                      </button>
                    </div>
                    <div class="like-wrap">
                      <img
                        class="before-like-btn"
                        src="https://cdn.loud.kr/prod/LOUD_IMG/designer/new/heart-gray-fill.png"
                        alt="heart"
                      />
                      <!-- 게시글에 좋아요 누를 시 하트 색이 하트로 변경됨 일단은 display none처리 했음 -->
                      <img
                        class="after-like-btn"
                        src="https://cdn.loud.kr/prod/LOUD_IMG/designer/new/heart-red-fill.png"
                        alt="heart"
                      />
                      <!-- 임시 좋아요 수 -->
                      <div class="like-cnt">${result.list[i].storeLikeCnt}</div>
                    </div>         
                  </div>               
                </div>`)
               $('.post-img-box-wrap').css('border', '1px solid rgb(200,200,200)')
            }else{
               $('.post-img-box-wrap').css('border', 'none');
               $('.post-container').append(`<div class="post-box-container">    
                  <div class="post-img-container">
                    <div class="post-img-box-wrap">
                      <img
                        class="post-img"
                        src="/upload/${result.list[i].storeFileSystemName}"
                        alt=""
                      />
                      <div class="post-img-back" data-num="${result.list[i].storeNumber}"></div>
                      <button type="button" class="like-btn">좋아요</button>
                      <div class="modal-background"></div>
                      <div class="modal-test"></div>
                    </div>
                  </div>
                   <div class="post-title-box">${result.list[i].storeTitle}</div>
                  <div class="writer-container">
                    <div class="channel-profile-box">
                      <a href="#" class="profile-img-box">
                        <img
                          class="profile-img"
                          src="/upload/${result.list[i].channelFileSystemName }"
                          alt=""
                        />
                      </a>
                    </div>
                    <div class="writer-box">
                      <a href="" class="writer-name">${result.list[i].channelName}</a>
                    </div>
                    <font>·</font>
                    <div class="follow-btn-box">
                      <button type="button" class="follow-btn">
                        <span class="follow">팔로우</span>
                        <!-- 팔로우 버튼 누를 시 팔로잉 으로 떠야함 일단은 display none처리 했음 -->
                        <img
                          class="following"
                          src="https://cdn.loud.kr/LOUD_IMG/main/ico-check-follow.png"
                          alt=""
                        />
                        <span class="following">팔로잉</span>
                      </button>
                    </div>
                    <div class="like-wrap">
                      <img
                        class="before-like-btn"
                        src="https://cdn.loud.kr/prod/LOUD_IMG/designer/new/heart-gray-fill.png"
                        alt="heart"
                      />
                      <!-- 게시글에 좋아요 누를 시 하트 색이 하트로 변경됨 일단은 display none처리 했음 -->
                      <img
                        class="after-like-btn"
                        src="https://cdn.loud.kr/prod/LOUD_IMG/designer/new/heart-red-fill.png"
                        alt="heart"
                      />
                      <!-- 임시 좋아요 수 -->
                      <div class="like-cnt">${result.list[i].storeLikeCnt}</div>
                    </div>         
                  </div>               
                </div>`)
            }
   }
};

let currentPage = 1;
let tempRealEnd = $('.realEndPage').value;
let maxPage = tempRealEnd;
var url = '/store/storeAjaxOk.st';
var data = {hashtagNumber: 1, currentPage: currentPage};

function categori() {
  $.ajax({
    url: url,
    type: 'get',
    data: data,
    dataType: 'json',
    success: function(result) {
      showStore(result);
      maxPage = result.realEndPage;
    }
  });
}

$('.design').on('click', function() {
  $(this).parent().children().removeClass('click');
  $(this).addClass('click');
  $('.pandang-pick').click();
  currentPage = 1;
   data.currentPage=1;
  url = '/store/storeAjaxOk.st';
  data.hashtagNumber = 1;
  categori();
});

$('.stationery-toys').on('click', function() {
  $(this).parent().children().removeClass('click');
  $(this).addClass('click');
  $('.pandang-pick').click();
  currentPage = 1;
   data.currentPage=1;
  data.hashtagNumber = 2;
  categori();
});

$('.accessories').on('click', function() {
  $(this).parent().children().removeClass('click');
  $(this).addClass('click');
  $('.pandang-pick').click();
  currentPage = 1;
   data.currentPage=1;
  url = '/store/storeAjaxOk.st';
  data.hashtagNumber = 3;
  categori();
});

$('.fashion').on('click', function() {
  $(this).parent().children().removeClass('click');
  $(this).addClass('click');
  $('.pandang-pick').click();
  currentPage = 1;
   data.currentPage=1;
  url = '/store/storeAjaxOk.st'; 
  data.hashtagNumber = 4; 
  categori();
});

$('.beauty').on('click', function() {
  $(this).parent().children().removeClass('click');
  $(this).addClass('click');
  $('.pandang-pick').click();
  currentPage = 1;
   data.currentPage=1;
  url = '/store/storeAjaxOk.st'; 
  data.hashtagNumber = 5;
  categori();
});

$('.pet').on('click', function() {
  $(this).parent().children().removeClass('click');
  $(this).addClass('click');
  $('.pandang-pick').click();
  currentPage = 1;
   data.currentPage=1;
  url = '/store/storeAjaxOk.st';
  data.hashtagNumber = 6;
  categori();
});

$('.living').on('click', function() {
  $(this).parent().children().removeClass('click');
  $(this).addClass('click');
  $('.pandang-pick').click();
  currentPage = 1;
   data.currentPage=1;
  url = '/store/storeAjaxOk.st';
  data.hashtagNumber = 7;
  categori();
});

$('.food').on('click', function() {
  $(this).parent().children().removeClass('click');
  $(this).addClass('click');
  $('.pandang-pick').click();
  currentPage = 1;
  data.currentPage=1;
  url = '/store/storeAjaxOk.st';
  data.hashtagNumber = 8;
  categori();
});


/*==========================================*/


/*판당 pick*/
$('.pandang-pick').on('click', function() {
  if (!$(this).hasClass('click')) {
    $(this).parent().children().removeClass('click');
    $(this).addClass('click');
    url = '/store/storeAjaxOk.st';
    currentPage = 1;
   data.currentPage=1;
    categori();
  }
});

$('.recommand').on('click', function() {
  if (!$(this).hasClass('click')) {
    $(this).parent().children().removeClass('click');
    $(this).addClass('click');
    url = '/store/storeAjaxLikeOk.st';
    currentPage = 1;
   data.currentPage=1;
    categori();
  }
});

/*최신순*/
$('.new').on('click', function() {
  if (!$(this).hasClass('click')) {
    $(this).parent().children().removeClass('click');
    $(this).addClass('click');
    url = '/store/storeAjaxDateOk.st';
    currentPage = 1;
   data.currentPage=1;
    categori();
  }
});

$('.free').on('click', function() {
  if (!$(this).hasClass('click')) {
    $(this).parent().children().removeClass('click');
    $(this).addClass('click');
    url = '/store/storeAjaxFreeOk.st';
    currentPage = 1;
   data.currentPage=1;
    categori();
  }
});

/*====================================================*/




$('.next').on('click', function() {
  if (currentPage < maxPage) {
    currentPage++;
   data.currentPage++;
   if(new URLSearchParams(location.search).has('searchInput')){
      $.ajax({
         url : '/store/storeSearchAjax.st',
         type : 'get',
         data : {searchInput : searchParam('searchInput'), page : currentPage},
         dataType : 'json',
         success : showStore
      });
   }else{
       categori();
   }
  }
  if (currentPage == maxPage) {
    $(this).prop('disabled', true);
  }
  if (currentPage > 1) {
    $('.prev').prop('disabled', false);
  }

});

$('.prev').on('click', function(){
  if (currentPage > 1) {
    currentPage--;
   data.currentPage--;
   if(new URLSearchParams(location.search).has('searchInput')){
      $.ajax({
         url : '/store/storeSearchAjax.st',
         type : 'get',
         data : {searchInput : searchParam('searchInput'), page : currentPage},
         dataType : 'json',
         success : showStore
      });
      }else{
          categori();
      }
  }
  if (currentPage == 1) {
    $(this).prop('disabled', true);
  }
  if (currentPage < maxPage) {
    $('.next').prop('disabled', false);
  }
});

let storeNumber = 0;
let memberNumber = $('.memberNumber').val();

// @@@@@@ 이미지 클릭 했을 때 모달 창 띄우기 @@@@@@@@@

$('.post-container').on('click', '.post-img-back', function(e){
	
	console.log(memberNumber);
   $(".post-modal").css("display", "flex");
    $(this).closest('.post-img-box-wrap').find(".modal-background").css("display", "inline-block");

   storeNumber = $(e.target).data('num');
	console.log(storeNumber);
   /*$.ajax({
      url : '/store/storeModalOk.st',
      type : 'get',
      data : {storeNumber : storeNumber},
      dataType : 'json',
      success : function(result){
        insertDataModal(result);
         getStoreComment();
			
         getStoreFile();
<<<<<<< HEAD
    	$('html, body').scrollTop(0);
    }
  });
=======
       $('html, body').scrollTop(0);
    }
  });*/
	$.ajax({
		url: "/sns/snsStoreReadOk.sn",
		type: 'get',
		dataType: 'json',
		data: { storeNumber: storeNumber },
		success: function(result) {
			showStorePost(result);
			showStoreContent(result);
			showLike(result);
			$.ajax({
		url: '/sns/snsStoreCommentOk.snc',
		type: 'get',
		dataType: 'json',
		data: { storeNumber: storeNumber },
		success: function(result) {
			showStoreComment(result);
			console.log('~~~~~~~~~');
		},
		error: function(a, b, c) {
			console.log(c);
		}

		});
			
		}
	});
	
	$.ajax({
		url: '/sns/snsStoreFileReadOk.sn',
		type: 'get',
		dataType: 'json',
		data: { storeNumber : storeNumber },
		success: function(result) {
			showStoreFile(result);
		},
		error: function(a, b, c) {
			console.log(c);
		}

		});
		
		
		
		
});
 
   /*밖에다가 댓글과 게시물이미지 ajax를 만들것*/
   
   function getStoreComment(){
      /*$.ajax({
            url: '/storeComment/storeCommentListOk.stc',
            type: 'get',
            dataType: 'json',
            data: { storeNumber: storeNumber },
            success: function(result) {
               showStoreComment(result);
            },
            error: function(a, b, c) {
               console.log(c);
            }

         });*/

		$.ajax({
		url: '/sns/snsStoreCommentOk.snc',
		type: 'get',
		dataType: 'json',
		data: { storeNumber: storeNumber },
		success: function(result) {
			showStoreComment(result);
		},
		error: function(a, b, c) {
			console.log(c);
		}

		});
   }
   
   function getStoreFile(){
      $.ajax({
         url:'/file/storeFileOk.stf',
         type:'get',
         dataType:'json',
         data: {storeNumber : storeNumber},
         success: function(result){
            
            let text = '';
            
            for(let i=0; i<result.length; i++){
               text += `
                  <img
                         src="/upload/${result[i].storeFileSystemName}"
                         alt=""
                       />
               `;
            }
               
            $('.s-post-img').append(text);
         }
      });
   }


	function showStorePost(result){
	$('.s-post-header-box').html('');
	
		if (storeNumber == result.list.storeNumber) {
			$('.s-post-header-box').append(`
				<div class="s-post-header">
              <div class="s-post-title">
					${result.list.storeTitle}
				</div>
				 <div class="post-price-area">
                  <div class="post-price">${result.list.storePrice}</div><span>원</span>
                  </div>
              <div class="s-post-date-categori-box">
                <div class="s-post-date">
					${result.list.storeDate}
				</div>
                <div>l</div>
                <div class="s-post-categori">${result.list.hashtagName}</div>
              </div>
            </div>
            <div class="s-post-information">
              <div class="s-post-view-cnt">
                <span class="material-symbols-outlined"> visibility </span>
                <div class="s-view-cnt">${result.list.storeViewCnt}</div>
              </div>
              <div class="s-post-like-cnt">
                <span class="material-symbols-outlined"> favorite </span>
                <div class="s-p-like-cnt">${result.list.likeCnt}</div>
              </div>
              <div class="s-post-comment-cnt">
                <span class="material-symbols-outlined"> chat_bubble </span>
                <div class="s-comment-cnt">${result.list.storeCommentCnt}</div>
              </div>
            </div>
			
			
			`);
		
		}
	
}



   
   function showStoreComment(result){

	$('.s-commentL').html('');
	let text = '';
	for (let i = 0; i < result.list.length; i++) {
		if (storeNumber == result.list[i].storeNumber && result.list[i].storeCommentNumber != 0) {
			
			text += `<div class="s-comment-list">

              <!-- @@@@@@@@@ 댓글 list @@@@@@@@@@ -->
              <a herf="#" class="s-comment-user-profile-shortcuts">
                <div class="s-comment-user-profile-wrap">
                  <img
                    src="/upload/${result.list[i].channelFileSystemName}"
                    alt=""
                  />
                </div>
              </a>
              <div class="s-text-wrap">
                <div class="s-comment-member-info">
                  <a href="/sns/snsOk.sn?memberNumber=${result.list[i].memberNumber}" class="s-member-id">${result.list[i].channelName}</a>
                  <div class="s-box"></div>
                  <div class="s-comment-date">${result.list[i].storeCommentDate}</div>
                  `

				if(memberNumber == result.list[i].memberNumber){
					text += `
					
					<div class="s-comment-edit-delete-btn-box">
                    <button class="s-comment-edit-btn" data-number="${result.list[i].storeCommentNumber}">수정</button>

                    <button class="s-comment-delete-btn"  data-number="${result.list[i].storeCommentNumber}">삭제</button>
                  </div>

					 <div class="s-edit-btn-box">
                      <button type="submit" class="s-edit-btn" data-number="${result.list[i].storeCommentNumber}">
                        수정 완료
                      </button>
                  </div>`
				}
				
				text += `
					</div>
				<div class="s-height-box"></div>
                <div class="s-comment">
                  <span class="s-comment-content">
					${result.list[i].storeCommentContent}
                  </span>
                 
                  
                </div>
              </div>
              <!-- @@@@@@@@@ 댓글 리스트 끝  @@@@@@@@@@ -->
            </div>`;

		}
	}
	$('.s-commentL').html(text);


}


/* store 모달 댓글 작성 */
$('.s-comment-submit-btn').on('click', function() {
	
	$.ajax({

		url: "/sns/snsStoreCommentInsertOk.snc",
		type: "get",
		data: {
			storeNumber: storeNumber,
			memberNumber: memberNumber,
			storeCommentContent: $('.s-comment-input-area').val()
		},
		success: function() {
			$('.s-comment-input-area').val('');
			$.ajax({
				url: '/sns/snsStoreCommentOk.snc',
				type: 'get',
				dataType: 'json',
				data: { storeNumber: storeNumber },
				success: function(result) {
					showStoreComment(result);
					console.log('success');
				},
				error: function(a, b, c) {
					console.log(c);
				}

			});
		},
		error: function(a, b, c) {
			console.log(c);
		}

	});

});

// store 댓글 삭제
$('.s-comment-container').on('click', '.s-comment-delete-btn', function() {

	let storeCommentNumber = $(this).data('number');

	$.ajax({
		url: "/sns/snsStoreCommentDeleteOk.snc",
		type: 'get',
		data: { storeCommentNumber: storeCommentNumber },
		success: function() {
			// 댓글 갱신
			$.ajax({
				url: '/sns/snsStoreCommentOk.snc',
				type: 'get',
				dataType: 'json',
				data: { storeNumber: storeNumber },
				success: function(result) {
					showStoreComment(result);
				},
				error: function(a, b, c) {
					console.log(c);
				}

			});

		}
	});
});


// store 댓글 수정

$('.s-comment-container').on('click', '.s-comment-edit-btn', function() {


	let $parent = $(this).closest('.s-comment-list');

	 let $children = $parent.find('.s-comment-edit-delete-btn-box, .s-edit-btn-box');

	$children.eq(0).hide();
	$children.eq(1).show();

	let $content = $(this).closest('.s-comment-list').find('.s-comment-content');

	$content.replaceWith(`<textarea class='modify-content' id="s-comment-modify"> </textarea>`);

});


$('.s-comment-container').on('click', '.s-edit-btn', function() {
	let storeCommentNumber = $(this).data('number');

	$.ajax({
		url: '/sns/snsStoreCommentUpdateOk.snc',
		type: 'get',
		data: {
			storeCommentNumber: storeCommentNumber,
			storeCommentContent: $('.modify-content').val()
		},
		success: function() {
			$.ajax({
				url: '/sns/snsStoreCommentOk.snc',
				type: 'get',
				dataType: 'json',
				data: { storeNumber: storeNumber },
				success: function(result) {
					showStoreComment(result);
				}

			});
		}
	});
});



/*=================================================*/

function insertDataModal(result){
   $('.storeNumber').val(result.storeNumber);
   $('.memberNumber').val(result.memberNumber);
   $('.post-title').text(result.storeTitle);
   $('.post-price').text(result.storePrice);
   $('.post-date').text(result.storeDate);
   $('.post-categori').text(result.hashtagName);
   $('.view-cnt').text(result.storeViewCnt);
   $('.p-like-cnt').text(result.likeCount);
   $('.comment-cnt').text(result.commentCount);
   $('.post-content').text(result.storeContent);
   //$('.author-profile-img').attr('src', '')
   $('.profile-modal-member > a').text(result.channelName);
}



// @@@@@@@ 모달 영역 밖으로 클릭하면 모달 창 없애기 @@@@@@@

$(".post-container").on("click",'.modal-background', function () {
  $(".post-modal").css("display", "none");
  $(".report-path").css("display", "none");
  $(this).css("display", "none");
});

$('.report-btn').on('click', function(){   
   
   $.ajax({
      url: '/store/storeReportOk.st',
      type: 'get',
      data: {
         reportNumber: storeNumber,
         reportTitle: $('#reportTitle').val(),
         reportContent: $('#report-content').val()   
      },
   success: function(response) {
         alert("신고가 성공적으로 접수되었습니당.");
         window.location.href = "/store/storeOk.st";
      },
      error: function() {
         alert("오류가 발생했습니당. 다시 시도해주세요.");
      }
   });
   
});

$('.modal-basket-btn').on('click', function(){   
   console.log($('.storeNumber').val());
   $.ajax({
      url: '/store/storeBasket.st',
      type: 'get',
      data: {      
         storeNumber: $('.storeNumber').val()      
      },
   success: function(result) {
         alert("물품을 장바구니에 추가하였습니당.");
         window.location.href = "/store/storeOk.st";
      },
      error: function() {
         alert("오류가 발생했습니당. 다시 시도해주세요.");
      }
   });
   
});

$('.modal-delete-btn').on('click', function() {
   
   $(".modal-box").css("display", "none");
   
   $.ajax({
      url: '/store/storeDeleteOk.st',
      type: 'get',
      data: { storeNumber: storeNumber 
      },
         success: function(result) {
         alert("게시물을 성공적으로 삭제하였습니당.");
         window.location.href = "/store/storeOk.st";
      },
      error: function() {
         alert("오류가 발생했습니당. 다시 시도해주세요.");
      }
   });
   
});

$('.modal-like-btn').on('click', function() {
   
  if ($('.like-btn-color').data("clicked") !== true) {
    $('.like-btn-color').css("color", "rgb(255, 0, 0)").data("clicked", true);
    $('.p-like-cnt').text(Number($('.p-like-cnt').text())+1);
    $.ajax({
      url: '/store/storeLikeOk.st',
      data: {
        storeNumber: $('.storeNumber').val(),
      },
      success: function() {
   
      }
    });
  }
  else {
    $('.like-btn-color').css("color", "rgb(0, 0, 0)").data("clicked", false);
    $('.p-like-cnt').text(Number($('.p-like-cnt').text())-1);
    $.ajax({
      url: '/store/storeLikeDelete.st',
      data: {
        storeNumber: $('.storeNumber').val(),
      },
      success: function() {
      }
    });
  }
});


$(".modal-follow-btn").on("click", '.add', function() {
   $('.modal-follow-btn').html('');
   $('.modal-follow-btn').append(`<span class="material-symbols-outlined done"> done </span>`);
   
      $(this).css("display", "none");
      $('.done').css("display", "block");
      
      $.ajax({
      url: '/store/storeFollowOk.st',
      type: 'get',
      data: {       
               memberNumberTo : $('.memberNumber').val()
             },
      success: function() {
      },
      error: function(a, b, c) {
         console.log(c);
      }

      });
      
   
});

$('.modal-follow-btn').on('click', '.done',function(){
   $('.modal-follow-btn').append(`<span class="material-symbols-outlined add"> add </span>`);
   
   $(this).css("display", "none");
   $('.add').css("display", "block");
   
   $.ajax({
      url: '/store/storeFollowDeleteOk.st',
      type: 'get',
      data: {    
            memberNumberTo : $('.memberNumber').val()
             },
      success: function() {
      },
      error: function(a, b, c) {
         console.log(c);
      }

      });
});


function showStoreFile(result){
	$('.post-img').html('');
	for (let i = 0; i < result.length; i++) {
		$('.s-post-img').append(`
			<li>
				<img src="/upload/${result[i]}"/>
			</li>
		`);
	}
}

function showLike(result){
	$('.modal-like-btn').html('');
	if (storeNumber == result.list.storeNumber) {
		if(result.likeTest === ""){
			$('.modal-like-btn').append(`
			<span class="material-symbols-outlined beforeLike">favorite</span> 
			`);
		} else {
			$('.modal-like-btn').append(`
			<span class="material-symbols-outlined liked">favorite</span>
			`);
			}
		}


	}
	
	function showStoreContent(result) {
	$('.post-content').html('');
	
		if (storeNumber == result.list.storeNumber) {

			$('.post-content').append(`
					
					<sapn>
							${result.list.storeContent}
						
					</span>
				`);
			
		}
	}



