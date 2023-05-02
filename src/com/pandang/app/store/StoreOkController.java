package com.pandang.app.store;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.pandang.app.Execute;
import com.pandang.app.sns.dao.SnsDAO;
import com.pandang.app.store.dao.StoreDAO;
import com.pandang.app.store.dto.StoreDTO;
import com.pandang.app.store.vo.StoreVO;

public class StoreOkController implements Execute {

	@Override
	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		StoreDAO storeDAO = new StoreDAO();
		StoreDTO storeDTO = new StoreDTO();
		int rowCount = 12;
		int total = storeDAO.getTotal(1);
		String sessionProfileImg = "";
		String temp = req.getParameter("page");
		int page = temp == null ? 1 : Integer.valueOf(temp);
		int startRow = (page-1)*rowCount;
		int realEndPage = (int)Math.ceil(total / (double)rowCount);
		Map<String, Integer> pageMap = new HashMap();
		pageMap.put("rowCount", rowCount);
		pageMap.put("startRow", startRow);
		pageMap.put("hashtagNumber", 1);
		
		HttpSession session = req.getSession();
		SnsDAO snsDAO = new SnsDAO();
		if(session.getAttribute("memberNumber")!=null) {
			sessionProfileImg = snsDAO.sessionProfileImg((Integer)session.getAttribute("memberNumber"));
		}
			
		req.setAttribute("sessionProfileImg", sessionProfileImg);
		
		List<StoreVO> stores = storeDAO.selectAll(pageMap);
		
		req.setAttribute("storeList", stores);
		req.setAttribute("realEndPage", realEndPage);

		
		
		req.getRequestDispatcher("/app/store/store.jsp").forward(req, resp);
	}
}