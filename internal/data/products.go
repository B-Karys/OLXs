package data

import (
	"database/sql"
	"errors"
	"github.com/lib/pq"
	"time"
)

type Product struct {
	ID          int64     `json:"id"`
	CreatedAt   time.Time `json:"-"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	ImageURL    string    `json:"imageURL"`
	Seller      string    `json:"seller"`
	Categories  []string  `json:"categories,omitempty"`
}

type ProductModel struct {
	DB *sql.DB
}

func (m ProductModel) Insert(product *Product) error {
	query := `
		INSERT INTO products(name, description, imageURL, seller, categories)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, created_at`

	return m.DB.QueryRow(query, &product.Name, &product.Description, &product.ImageURL, &product.Seller, pq.Array(&product.Categories)).Scan(&product.ID, &product.CreatedAt)
}

// method for fetching a specific record from the movies table.
func (m ProductModel) Get(id int64) (*Product, error) {
	if id < 1 {
		return nil, ErrRecordNotFound
	}

	query := `
		SELECT *
		FROM products
		WHERE id = $1`

	var product Product

	err := m.DB.QueryRow(query, id).Scan(
		&product.ID,
		&product.CreatedAt,
		&product.Name,
		&product.Description,
		&product.ImageURL,
		&product.Seller,
		pq.Array(&product.Categories),
	)

	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrRecordNotFound
		default:
			return nil, err
		}
	}

	return &product, nil
}

func (m ProductModel) Delete(id int64) error {
	if id < 1 {
		return ErrRecordNotFound
	}
	// Construct the SQL query to delete the record.
	query := `
		DELETE FROM products
		WHERE id = $1`

	result, err := m.DB.Exec(query, id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return ErrRecordNotFound
	}

	return nil
}

func (m ProductModel) Update(product *Product) error {
	query := `
		UPDATE products
		SET name = $1, description = $2, imageurl = $3, categories = $4
		WHERE id = $5
		RETURNING seller`

	args := []interface{}{
		product.Name,
		product.Description,
		product.ImageURL,
		pq.Array(product.Categories),
		product.ID,
	}

	return m.DB.QueryRow(query, args...).Scan(&product.Seller)
}
