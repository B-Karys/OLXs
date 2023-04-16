package main

import (
	"errors"
	"github.com/shynggys9219/greenlight/internal/data"
	"testing"
	"time"
)

var config = Config{
	db: struct {
		dsn          string
		maxOpenConns int
		maxIdleConns int
		maxIdleTime  string
	}{
		dsn:          "postgres://postgres:postgres@localhost/greenlight?sslmode=disable",
		maxOpenConns: 10,
		maxIdleConns: 10,
		maxIdleTime:  "10m"},
}

func TestInsertProduct(t *testing.T) {
	db, _ := OpenDB(config)
	productModel := data.ProductModel{
		DB: db,
	}
	product := &data.Product{
		ID:          5,
		CreatedAt:   time.Time{},
		Name:        "Shoes",
		Description: "Shoes for Man",
		ImageURL:    "https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/g/c/o/9-rockey-9-magnolia-white-original-imaggutpbvcczyhf.jpeg?q=70",
		Seller:      "Kaisar",
		Categories:  []string{"Shoes", "Man"},
	}
	err := data.ProductModel.Insert(productModel, product)
	if err != nil {
		t.Fatalf("Insert product Error %s", err.Error())
	}
}

func TestGetProduct(t *testing.T) {
	db, _ := OpenDB(config)
	productModel := data.ProductModel{
		DB: db,
	}
	product, err := data.ProductModel.Get(productModel, 1)
	if err != nil {
		t.Fatalf("Database connection fail %s", err.Error())
	}
	if product.Name != "shoes Man 40 size" && product.Seller != "Beka" {
		t.Error("The data is missing, error in method")
	}
}

func TestUpdateProduct(t *testing.T) {
	db, _ := OpenDB(config)
	productModel := data.ProductModel{
		DB: db,
	}
	product := &data.Product{
		ID:          5,
		Name:        "Shoes V2",
		Description: "Sport Shoes, white",
		ImageURL:    "https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/g/c/o/9-rockey-9-magnolia-white-original-imaggutpbvcczyhf.jpeg?q=70",
		Seller:      "Kaisar A.",
		Categories:  []string{"Shoes", "White"},
	}
	err := productModel.Update(product)
	if err != nil {
		t.Fatalf("Product update Error %s", err.Error())
	}
	result, _ := productModel.Get(product.ID)
	if result.Name == product.Name && result.Description == product.Description {
		t.Error("Product was not updated, error in method")
	}
}

func TestDeleteProduct(t *testing.T) {
	db, _ := OpenDB(config)
	productModel := data.ProductModel{
		DB: db,
	}
	err := productModel.Delete(5)
	if err != nil {
		t.Fatalf("Product delete error. %s", err.Error())
	}
	_, err = productModel.Get(5)
	if !errors.Is(err, data.ErrRecordNotFound) {
		t.Error("Product was not deleted, error in method")
	}
}
