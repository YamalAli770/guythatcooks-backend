
# Guy That Cooks

Guythatcooks is a food blog based upon the MERN stack where users could view different food recipes and filter them based upon different cuisines. The users could also favourite a particular blog to access it quickly.

## Features

- Register/Login
- View Blogs
- Create, Update, Delete Blogs
- Favourite Blogs


## Run Locally

Clone the project

```bash
  git clone https://github.com/YamalAli770/guythatcooks-frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```


## API Reference

#### Get All Blogs

```http
  GET /api/blogs
```

#### Get Blog

```http
  GET /api/blogs/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of blog to fetch |

#### Create Blog

```http
  POST /api/blogs/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of blog |
| `img`      | `string` | **Required**. Link of image for blog |
| `author`      | `string` | **Required**. Author of blog |
| `desc`      | `string` | **Required**. Description of blog |
| `markdown`      | `string` | **Required**. Markdown of blog |

#### UPDATE Blog

```http
  PUT /api/blogs/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Id of blog to create |
| `title`      | `string` |Title of blog |
| `img`      | `string` | Link of image for blog |
| `author`      | `string` | Author of blog |
| `desc`      | `string` | Description of blog |
| `markdown`      | `string` |  Markdown of blog |

#### Delete Blog

```http
  DELETE /api/blogs/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of blog to delete |

#### Register User

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username of user |
| `email`      | `string` | **Required**. email of user |
| `password`      | `string` | **Required**. password of user |

#### Login User

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email of user |
| `password`      | `string` | **Required**. password of user |

#### Logout User

```http
  GET /api/auth/logout
```

#### Favourite Blog

```http
  PUT /api/user/favourite/${id}?${blogid}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of user |
| `blog`      | `string` | **Required**. id of blog |

## Appendix

Following is given the list of private routes which can only be accessed once user has logged in.

- Create Blog
- Update Blog
- Delete Blog
- Favourite Blog
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`ACCESS_TOKEN_SECRET`

`REFRESH_TOKEN_SECRET`

## Feedback

If you have any feedback, please reach out to us at Yamal.Ali@outlook.com

