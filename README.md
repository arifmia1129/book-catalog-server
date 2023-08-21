# Book Catalog Application Server

### Live site link: https://book-catalog-server-nine.vercel.app

## Authentication

- /api/v1/user/signup (POST) (create user account with name, email and password)
- /api/v1/user/login (POST) (login with email and password)
- /api/v1/user/profile (GET) (must be provide authorization token with headers)

## Book

- /api/v1/user/book/create (POST) (add new book with image url, title, author, genre, public date)
- /api/v1/user/book (GET) - (get all book information)
- /api/v1/user/book/:id (GET) - (get a book information by id)
- /api/v1/user/book/:id (PATCH) - (update book information)
- /api/v1/user/book/:id (DELETE) - (delete book by id)
- /api/v1/user/book/:id/review (POST) - (add review into book information)
- /api/v1/user/book/:id/review (GET) - (get book reviews)
