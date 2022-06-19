package be.lionelh.whist.score.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@SpringBootApplication
public class WhistScoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(WhistScoreApplication.class, args);
	}

	@Bean
    public OncePerRequestFilter angularForwardFilter() {
        System.out.println("In filter");
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
                final String requestURI = request.getRequestURI();
                if (requestURI.startsWith("/ui") && !requestURI.endsWith("/ui/index.html") && !requestURI.contains(".")) {
                    request.getRequestDispatcher("/ui/index.html").forward(request, response);
                } else if (requestURI.equalsIgnoreCase("/")) {
                    request.getRequestDispatcher("/ui/index.html").forward(request, response);
                } else {
                    filterChain.doFilter(request, response);
                }
            }
        };
    }
}
