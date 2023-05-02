package com.pandang.app.sns;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.pandang.app.Execute;
import com.pandang.app.sns.comment.vo.SnsCommentVO;
import com.pandang.app.sns.dao.SnsDAO;
import com.pandang.app.sns.vo.SnsHeaderVO;
import com.pandang.app.sns.vo.SnsPostInfoVO;
import com.pandang.app.sns.vo.SnsVO;

public class SnsOkController implements Execute {

	@Override
	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		
		HttpSession session = req.getSession();
		
		if(session.getAttribute("memberNumber") == null && req.getParameter("memberNumber") == null) {
			req.getRequestDispatcher("/app/member/login.jsp").forward(req, resp);
			return;
		}

		Integer memberNumber = (Integer)session.getAttribute("memberNumber");
		if(req.getParameter("memberNumber")!=null) {
			memberNumber = Integer.parseInt(req.getParameter("memberNumber")); 
		}
		
		
		
		
		SnsDAO snsDAO = new SnsDAO();
		SnsHeaderVO snsHeaderVO = new SnsHeaderVO();
		
		String sessionProfileImg = snsDAO.sessionProfileImg((Integer)session.getAttribute("memberNumber"));
		
		req.setAttribute("sessionProfileImg", sessionProfileImg);
		
		// 클릭한 멤버의 화면을 보고싶음 거기서 받아올 memberNumber
		// 그 memberNumber의 화면이 넘어오도록 내가 만들어야함
		//
		// 걔를 ajax로 써서 req.getParameter에 꽂아야함
//		req.getParameter("memberNumber");

		// sns snsVO
		List<SnsVO> snsVO = snsDAO.selectAll(memberNumber);


		req.setAttribute("sns", snsVO);

		// sns memberInfo
		snsHeaderVO = snsDAO.memberInfo(memberNumber);

//		System.out.println(snsHeaderVO);
//		System.out.println(snsHeaderVO.getMemberNickname());
//		System.out.println(snsHeaderVO.getMemberNumber());
//		System.out.println(snsHeaderVO.getChannelComment());
		
		
		
		// 세션에 채널 네임 담기 (임시)
		session.setAttribute("channelName", req.getParameter(snsHeaderVO.getChannelName()));

		// jsp에서 사용할 속성으로 설정
		req.setAttribute("snsMemberInfo", snsHeaderVO);

		
		// sns SnsPostInfo
		
		int total = snsDAO.getTotal(memberNumber);
		
		
//      처음 게시판 페이지에 진입하면 페이지에 대한 정보가 없다.
//      그러므로 temp에는 null이 들어가게 된다.
		String temp = req.getParameter("page");
		
//      null인 경우는 게시판에 처음 이동하는 것이므로 1페이지를 띄워주면 된다.
		int page = temp == null ? 1 : Integer.valueOf(temp);
		
//      한 페이지에 몇 개의 게시물? 12개
		int rowCount = 12;
		
//      페이지 버튼 세트는? 5개씩
		int pageCount = 5;
      	
		
		int startRow = (page-1) * rowCount;
		
//      Math.ceil() 올림처리
		int endPage = (int)(Math.ceil(page/(double)pageCount) * pageCount);
		
//      endPage는 페이지 세트 당 마지막 번호를 의미한다.
	     int startPage = endPage - (pageCount - 1);
//	     startPage는 페이지 세트 당 첫 번째 번호를 의미한다.
	      
	      int realEndPage = (int)Math.ceil(total / (double)rowCount);
//	      realEndPage는 전체 페이지 중 가장 마지막 번호를 의미한다.
	      
	      endPage = endPage > realEndPage ? realEndPage : endPage;
//	      첫 번째 페이지 세트가 1~5
//	      두 번째 페이지 세트가 6~10이어도
//	      realEndPage가 7이라면 두 번째 페이지 세트의 마지막 번호는 7이어야 한다.
		
		
		
		Map<String, Integer> snsPost = new HashMap();
		
		snsPost.put("memberNumber", memberNumber);
		snsPost.put("startRow", startRow);
	    snsPost.put("rowCount", rowCount);
		
		List<SnsPostInfoVO> snsPostInfoVO = snsDAO.snsPostInfo(snsPost);

		req.setAttribute("snsPostInfo", snsPostInfoVO);
		req.setAttribute("realEndPage", realEndPage);
		
		
		Map<String, Integer> storePost = new HashMap();
		storePost.put("memberNumber", memberNumber);
		storePost.put("startRow", startRow);
		storePost.put("rowCount", rowCount);

//		// sns SnsCommentVO
		int snsNumber = 1;
		Map<String, Integer> snsComment = new HashMap();
		snsComment.put("snsNumber", snsNumber);
		List<SnsCommentVO> snsCommentVO = snsDAO.snsCommentList(snsComment);

//		System.out.println(snsCommentVO);
//
//		System.out.println(snsCommentVO.get(0).getSnsNumber());

		req.setAttribute("comment", snsCommentVO);
		
		
		// 팔로우
		String ifFollowed = "";
		Map<String, Integer> map = new HashMap<>();
		
		int memberNumberTo;
		
		map.put("memberNumberFrom", (Integer)session.getAttribute("memberNumber"));
		
		if(req.getParameter("memberNumber")== null) {
			memberNumberTo = -777;
		} else {
			memberNumberTo = Integer.parseInt(req.getParameter("memberNumber"));
		}
		
		map.put("memberNumberTo", memberNumberTo);
		
		 if(snsDAO.followed(map) != 0) {
	    	  ifFollowed = "follow";
	      }
		 
	    req.setAttribute("ifFollowed", ifFollowed);
	    
		
		req.getRequestDispatcher("/app/sns/mySns.jsp").forward(req, resp);

	}

}
