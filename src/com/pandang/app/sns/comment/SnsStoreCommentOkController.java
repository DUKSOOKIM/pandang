package com.pandang.app.sns.comment;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.pandang.app.Execute;
import com.pandang.app.sns.comment.vo.SnsCommentVO;
import com.pandang.app.sns.comment.vo.SnsStoreCommentVO;
import com.pandang.app.sns.dao.SnsDAO;

public class SnsStoreCommentOkController implements Execute {

	@Override
	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
HttpSession session = req.getSession();
		
//		session.setAttribute("snsNumber", 1);
		
		 SnsDAO	snsDAO = new SnsDAO();
		
		 Map<String, Integer> pageMap = new HashMap<>();
	     pageMap.put("storeNumber", Integer.parseInt(req.getParameter("storeNumber")));
	     
	      
//	      System.out.println(pageMap.toString());
	      
	      List<SnsStoreCommentVO> snsStoreComment = snsDAO.snsStoreCommentList(pageMap);
	     
	      Gson gson = new Gson();
	     
	      
	      JsonArray showStoreCommentList = new JsonArray();
	      
	    
	      
	      snsStoreComment.stream()
	      .map(gson::toJson)
	      .map(JsonParser::parseString)
	      .forEach(showStoreCommentList::add);
	      
//	      System.out.println(showCommentList.toString());
	      JsonObject result = new JsonObject();
	      
	     
	      
	      
	      result.add("list", JsonParser.parseString(showStoreCommentList.toString()));
	     
	      
	      resp.setContentType("application/json; charSet=utf-8");
	      
	      PrintWriter out = resp.getWriter();
	      out.print(result.toString());
	      out.close();

	}

}
