package com.pandang.app.sns;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.pandang.app.Execute;
import com.pandang.app.sns.dao.SnsDAO;
import com.pandang.app.sns.file.dto.SnsFileDTO;
import com.pandang.app.store.file.dto.StoreFileDTO;

public class SnsStoreFileReadOkController implements Execute {

	@Override
	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
			SnsDAO snsDAO = new SnsDAO();
			StoreFileDTO storeFileDTO = new StoreFileDTO();
		List<String> storeFile = snsDAO.storeFile(Integer.parseInt(req.getParameter("storeNumber")));
	     
	      Gson gson = new Gson();
	    
	      JsonArray storeFileList = new JsonArray();
	      
	    
	      resp.setContentType("application/json; charSet=utf-8");
	      
	      PrintWriter out = resp.getWriter();
	      out.print(JsonParser.parseString(gson.toJson(storeFile)));
	      out.close();

	}

}
