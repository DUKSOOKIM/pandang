package com.pandang.app.store;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.pandang.app.Execute;
import com.pandang.app.report.store.dao.ReportStoreDAO;
import com.pandang.app.report.store.dto.ReportStoreDTO;
import com.pandang.app.sns.dao.SnsDAO;
import com.pandang.app.store.dao.StoreDAO;

public class StoreReportController implements Execute {

	@Override
	public void execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		HttpSession session = req.getSession();
		
		StoreDAO storeDAO = new StoreDAO();
		ReportStoreDAO reportStoreDAO = new ReportStoreDAO();
		ReportStoreDTO reportStoreDTO = new ReportStoreDTO();
		
		
		SnsDAO snsDAO = new SnsDAO();
		String sessionProfileImg = snsDAO.sessionProfileImg((Integer)session.getAttribute("memberNumber"));
			
		req.setAttribute("sessionProfileImg", sessionProfileImg);
		
		reportStoreDTO.setReportContent(req.getParameter("reportContent"));
		reportStoreDTO.setReportMemberNumber((Integer)session.getAttribute("memberNumber"));
		reportStoreDTO.setReportTitle(req.getParameter("reportTitle"));
		reportStoreDTO.setReportStoreNumber(Integer.parseInt(req.getParameter("reportNumber")));
		
		System.out.println(reportStoreDTO.toString());
		
		storeDAO.reportStorePost(reportStoreDTO);

		 req.setAttribute("reportStore", reportStoreDTO);
	}

}
