package com.pandang.app.store;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pandang.app.Execute;
import com.pandang.app.store.dao.StoreDAO;
import com.pandang.app.store.dto.StoreDTO;
import com.pandang.app.store.vo.StoreVO;

public class StoreSearchController implements Execute {

	@Override
	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		StoreDAO storeDAO = new StoreDAO();
		int rowCount = 12;
		int total =storeDAO.searchGetTotal(req.getParameter("searchInput"));
		String temp = req.getParameter("page");
		int realEndPage = (int)Math.ceil(total / (double)rowCount);
		int page = temp == null ? 1 : Integer.valueOf(temp);
		int startRow = (page-1)*rowCount;
		Map<String, Object> map = new HashMap();
		map.put("rowCount", rowCount);
		map.put("startRow", startRow);
		map.put("searchInput", req.getParameter("searchInput"));
		
		List<StoreVO> stores = storeDAO.search(map);
		System.out.println(stores.toString());
		req.setAttribute("storeModal", stores);
		req.setAttribute("realEndPage", realEndPage);

		
		req.getRequestDispatcher("/app/store/store.jsp").forward(req, resp);
	}

}
