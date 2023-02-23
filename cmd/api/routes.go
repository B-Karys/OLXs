package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *application) routes() http.Handler {
	// Initialize a new httprouter router instance.
	router := httprouter.New()
	router.NotFound = http.HandlerFunc(app.notFoundResponse)
	router.MethodNotAllowed = http.HandlerFunc(app.methodNotAllowedResponse)

	router.HandlerFunc(http.MethodGet, "/v1/healthcheck", app.healthcheckHandler)

	// user routes here
	router.HandlerFunc(http.MethodPost, "/v1/users", app.registerUserHandler)
	router.HandlerFunc(http.MethodGet, "/v1/users/:id", app.showUserHandler)
	router.HandlerFunc(http.MethodPut, "/v1/users/activated", app.activateUserHandler)
	router.HandlerFunc(http.MethodPatch, "/v1/users/:id", app.updateUserHandler)
	router.HandlerFunc(http.MethodDelete, "/v1/users/:id", app.deleteUserHandler)

	// product routes here
	router.HandlerFunc(http.MethodPost, "/v1/product", app.createProductsHandler)
	router.HandlerFunc(http.MethodGet, "/v1/product/:id", app.showProductHandler)
	router.HandlerFunc(http.MethodPut, "/v1/product/:id", app.updateProductHandler)
	router.HandlerFunc(http.MethodDelete, "/v1/product/:id", app.deleteProductHandler)

	//token routes here
	router.HandlerFunc(http.MethodPost, "/v1/tokens/authentication", app.createAuthenticationTokenHandler)
	// Return the httprouter instance.
	// wrapping the router with rateLimiter() middleware to limit requests' frequency
	return app.recoverPanic(app.rateLimit(app.authenticate(router)))
}
