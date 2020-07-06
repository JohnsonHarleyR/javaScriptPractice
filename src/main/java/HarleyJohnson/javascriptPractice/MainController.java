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
	public String mineSweeper(
			//@RequestParam(name = "level", required = false) String l,
			//@RequestParam(name = "show", required = false) int s,
			Model model) {
		
		//String level;
		//int show;;
		
		
		/*try {
			level = l;
		} catch (Exception e) {
			level = "medium"; //medium is default
		}
		
		try {
			show = s;
		} catch (Exception e) {
			show = 1; //1 is default, it takes the user to the "select level" showing
		}
		
		model.addAttribute("level", level);
		model.addAttribute("show", show);*/
		
		return "minesweeper";
	}

}
