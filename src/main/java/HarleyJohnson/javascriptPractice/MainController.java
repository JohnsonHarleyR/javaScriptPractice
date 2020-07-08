package HarleyJohnson.javascriptPractice;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {
	
	@RequestMapping("/")
	public String index(Model model) {
		
		
		return "index";
	}
	
	@RequestMapping("/TicTacToe")
	public String ticTacToe(Model model) {
		
		
		return "tic-tac-toe";
	}
	
	@RequestMapping("/minesweeper")
	public String mineSweeper(Model model) {
		
		
		return "minesweeper";
	}
	
	@RequestMapping("/roadside-bingo")
	public String roadsideBingo(Model model) {
		
		
		return "roadside-bingo";
	}

}
