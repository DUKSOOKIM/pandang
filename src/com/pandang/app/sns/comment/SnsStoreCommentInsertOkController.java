package com.pandang.app.sns.comment;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pandang.app.Execute;
import com.pandang.app.sns.comment.vo.SnsCommentVO;
import com.pandang.app.sns.comment.vo.SnsStoreCommentVO;
import com.pandang.app.sns.dao.SnsDAO;

public class SnsStoreCommentInsertOkController implements Execute {

	@Override
	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		SnsDAO snsDAO = new SnsDAO();
		SnsStoreCommentVO snsStoreCommentVO = new SnsStoreCommentVO();
		
		
		System.out.println(Integer.parseInt(req.getParameter("memberNumber")));
		
		req.setCharacterEncoding("utf-8");
		
		snsStoreCommentVO.setMemberNumber(Integer.valueOf(req.getParameter("memberNumber")));
		snsStoreCommentVO.setStoreNumber(Integer.valueOf(req.getParameter("storeNumber")));
		snsStoreCommentVO.setStoreCommentContent(req.getParameter("storeCommentContent"));

		
		snsDAO.snsStoreCommentInsert(snsStoreCommentVO);

	}

}
