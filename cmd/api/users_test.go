package main

import (
	"errors"
	"github.com/shynggys9219/greenlight/internal/data"
	"testing"
	"time"
)

func TestUserRegistration(t *testing.T) {
	db, _ := OpenDB(config)
	userModel := data.UserModel{
		DB: db,
	}
	user := &data.User{
		CreatedAt: time.Time{},
		Name:      "Kaisar",
		Surname:   "Ansarov",
		Phone:     "+7777777777",
		Email:     "kaisar.a@example.com",
		Password:  data.Password{},
		Activated: false,
		Version:   1,
	}
	pass := user.Password.Set("KaisarA1234")
	if pass != nil {
		return
	}

	err := data.UserModel.Insert(userModel, user)
	if err != nil {
		t.Fatalf("User registration Error %s", err.Error())
	}
	if pass == nil && err != nil {
		t.Fatalf("Password was not set")
	}

}

func TestGetUser(t *testing.T) {
	db, _ := OpenDB(config)
	userModel := data.UserModel{
		DB: db,
	}
	userByID, err := data.UserModel.Get(userModel, 9)
	if err != nil {
		t.Fatalf("Database connection fail %s", err.Error())
	}
	userByEmail, err := userModel.GetByEmail("kaisar.a@example.com")
	if userByID.Name != userByEmail.Name && userByID.Email != userByEmail.Email {
		t.Error("The data is missing or returned wrong user, error in method")
	}
}

func TestUpdateUser(t *testing.T) {
	db, _ := OpenDB(config)
	userModel := data.UserModel{
		DB: db,
	}
	user, _ := userModel.Get(9)

	user.Name = "KaisarV2"
	user.Surname = "AnsarovV2"
	user.Phone = "666666666"
	firstGet, _ := userModel.Get(9)

	err := userModel.Update(user)

	if err != nil {
		t.Fatalf("Database connection fail or %s", err.Error())
	}
	if firstGet.Name == user.Name && firstGet.Surname == user.Surname && firstGet.Phone == user.Phone && firstGet.Email == user.Email && err != nil {
		t.Error("User was not updated, error in method")
	}
}

func TestDeleteUser(t *testing.T) {
	db, _ := OpenDB(config)
	userModel := data.UserModel{
		DB: db,
	}
	err := userModel.Delete(9)
	if err != nil {
		t.Fatalf("User delete error. %s", err.Error())
	}
	_, err = userModel.Get(9)
	if !errors.Is(err, data.ErrRecordNotFound) {
		t.Error("User was not deleted, error in method")
	}
}
