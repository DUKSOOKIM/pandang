package com.pandang.app.sns.comment;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pandang.app.Execute;
import com.pandang.app.sns.comment.dto.SnsCommentDTO;
import com.pandang.app.sns.comment.vo.SnsCommentVO;
import com.pandang.app.sns.dao.SnsDAO;

public class SnsCommentInsertOkController implements Execute {

	@Override
	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	
		
		SnsDAO snsDAO = new SnsDAO();
		SnsCommentVO snsCommentVO = new SnsCommentVO();
		
		
		req.setCharacterEncoding("utf-8");
		
		snsCommentVO.setMemberNumber(Integer.valueOf(req.getParameter("memberNumber")));
		snsCommentVO.setSnsNumber(Integer.valueOf(req.getParameter("snsNumber")));
		snsCommentVO.setSnsCommentContent(req.getParameter("snsCommentContent"));

		
		snsDAO.snsCommentInsert(snsCommentVO);
		
		
	}

}
