package com.pandang.app.sns;

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
import com.pandang.app.sns.dao.SnsDAO;
import com.pandang.app.sns.vo.SnsPostVO;
import com.pandang.app.sns.vo.SnsStoreVO;

public class SnsStoreReadOkController implements Execute {

	@Override
	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		HttpSession session = req.getSession();
		
//		session.setAttribute("snsNumber", 1);
		
		SnsDAO snsDAO = new SnsDAO();
		SnsStoreVO snsStoreVO = new SnsStoreVO();
		 
	      
		 snsDAO.updateStoreViewCnt(Integer.parseInt(req.getParameter("storeNumber")));
	      
		
	      
	      snsStoreVO = snsDAO.showStoreInfo(Integer.parseInt(req.getParameter("storeNumber")));
	      snsStoreVO.setLikeCnt(snsDAO.showStoreLikeCnt(Integer.parseInt(req.getParameter("storeNumber"))));
	      snsStoreVO.setStoreCommentCnt(snsDAO.showStoreCommentCnt(Integer.parseInt(req.getParameter("storeNumber"))));
	      Gson gson = new Gson();
	      
	      gson.toJson(snsStoreVO);
	      JsonParser.parseString(gson.toJson(snsStoreVO));
	      
	    
	      
	   //  좋아요
	      Map<String, Integer> map = new HashMap<>();
	      map.put("storeNumber", Integer.parseInt(req.getParameter("storeNumber")));
	      map.put("memberNumber", (Integer)session.getAttribute("memberNumber"));
		  String ifLiked = "";
		  
	      if(snsDAO.ifLiked(map) != 0) {
	    	   ifLiked = "like";
	      }
	      
		    JsonObject result = new JsonObject();
		    result.add("list", JsonParser.parseString(gson.toJson(snsStoreVO)));
		    result.addProperty("likeTest", ifLiked);
		    
	      resp.setContentType("application/json; charSet=utf-8");
	      
	      PrintWriter out = resp.getWriter();
	      out.print(result.toString());
	      out.close();
	      

	}

}
