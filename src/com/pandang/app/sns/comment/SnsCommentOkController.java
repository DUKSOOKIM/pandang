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
import com.pandang.app.sns.dao.SnsDAO;
import com.pandang.app.sns.vo.SnsPostVO;

public class SnsCommentOkController implements Execute {

	@Override
	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub

		

		HttpSession session = req.getSession();
		
//		session.setAttribute("snsNumber", 1);
		
		 SnsDAO	snsDAO = new SnsDAO();
		
		 Map<String, Integer> pageMap = new HashMap<>();
	     pageMap.put("snsNumber", Integer.parseInt(req.getParameter("snsNumber")));
	     
	      
//	      System.out.println(pageMap.toString());
	      
	      List<SnsCommentVO> snsComment = snsDAO.snsCommentList(pageMap);
	     
	      Gson gson = new Gson();
	     
	      
	      JsonArray showCommentList = new JsonArray();
	      
	    
	      
	      snsComment.stream()
	      .map(gson::toJson)
	      .map(JsonParser::parseString)
	      .forEach(showCommentList::add);
	      
//	      System.out.println(showCommentList.toString());
	      JsonObject result = new JsonObject();
	      
	     
	      
	      
	      result.add("list", JsonParser.parseString(showCommentList.toString()));
	     
	      
	     
//	      System.out.println(result);
//	      System.out.println(showCommentList);
	      
	      resp.setContentType("application/json; charSet=utf-8");
	      
	      PrintWriter out = resp.getWriter();
	      out.print(result.toString());
	      out.close();
	      
	}

}
