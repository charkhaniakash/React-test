package middleware

import (
	"net/http"
	"time"

	"golang.org/x/time/rate"
)

// Initialize a global rate limiter with a rate of 1 request per second and a burst of 5.
// This is a placeholder for more sophisticated rate limiting in the future.
var limiter = rate.NewLimiter(rate.Every(1*time.Second), 5)

// AuthMiddleware is a basic authentication middleware. It takes an http.Handler and returns an http.Handler.
// This serves as a placeholder for future authentication and rate limiting logic.
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Apply rate limiting.
		if !limiter.Allow() {
			http.Error(w, http.StatusText(http.StatusTooManyRequests), http.StatusTooManyRequests)
			return
		}

		// Placeholder for authentication logic.
		// For now, it simply passes the request to the next handler.
		next.ServeHTTP(w, r)
	})
}
