const connection = require("../db_connection.js");

module.exports = app => {

    // Create a new User
    app.post('/users', function (req, res) {
        // INSERT INTO users SET ?
        connection.query('INSERT INTO users SET ?', req.body, function (error, results) {
            if (error) throw error;
            res.send(results)

        });
    });

    // Retrieve all User
    app.get('/users', function (req, res) {
        connection.query('SELECT user_id, CONCAT(first_name, \' \', last_name) as name FROM users', function (error, results, fields) {
            if (error) throw error;
            res.send(results)

        });
    });

    // Retrieve a single User with userId
    app.get('/users/:user_id', function (req, res) {
        const user_id = req.params.user_id;
        connection.query('SELECT * FROM users  WHERE user_id = ?',user_id, function (error, results) {//Select all data from the 'users' table
            if (error) throw error;
            res.send(results)

        });
    });

    // Retrieve a single User with userName and Password
    app.post('/users/fetchUserFromDB', function (req, res) {
        const {username, password} = req.body;
        connection.query('SELECT * FROM users  WHERE user_name = ? and password = ? ',[username,password], function (error, results) {//Select all data from the 'users' table
            if (error) throw error;
            res.send(results)
            // console.log("This is the user name:" , username);
            // console.log("This is the password:" , password);
        });
    });

    // Update a User with userId
    app.put('/users/:user_id', function (req, res) {
        const user_id = req.params.user_id;
        connection.query('UPDATE users SET ? WHERE user_id = ?', [req.body, user_id], function (error, results) {//Select all data from the 'users' table
            if (error) throw error;
            res.send("User Update Successfully.");

        });
    });

    // Delete a User with userId
    app.delete('/users/:user_id', function (req, res) {
        const user_id = req.params.user_id;
        connection.query('DELETE FROM users WHERE user_id = ?', user_id, function (error, results) {//Select all data from the 'users' table
            if (error) throw error;
            res.send('User deleted successfully.');

        });
    });
    // Create a new user
    // app.delete("/users", users.deleteAll);

    /**--------------------Posts--------------------------*/


    // Retrieve all Posts
    app.get('/posts', function (req, res) {
        connection.query('SELECT * FROM posts', function (error, results) {
            if (error) throw error;
            res.send(results)

        });
    });
    // Retrieve all Posts of Friends that are not private
    app.post('/posts2', function (req, res) {
        const user_id = req.body.user_id;
        let q = "SELECT * from posts where user_id="+user_id +" or (private= 0 and user_id IN (select follower_id from friends where friend_id = "+ user_id+")) ORDER BY date DESC";
        let q2 = "SELECT users.user_id, last_name,first_name,img,post_id,date,private,content,images from users " +
            "join (SELECT * from posts where user_id="+user_id+" or (private= 0 and user_id IN (select follower_id from friends where friend_id = "+user_id+"))) as b " +
            "on users.user_id = b.user_id " +
            "ORDER BY date DESC";
        connection.query(q2, function (error, results) {
            if (error) throw error;
            res.send(results)

        });
    });

    //Create a new Post
    app.post('/posts', function (req, res) {
        connection.query('INSERT INTO posts SET ?', req.body, function (error, results) {
            if (error) throw error;
            res.send(results)

        });
    });


    // Retrieve a single post with postId
    app.get('/posts/:post_id', function (req, res) {
        const post_id = req.params.post_id;
        connection.query('SELECT * FROM posts  WHERE post_id = ?',post_id, function (error, results) {//Select all data from the 'users' table
            if (error) throw error;
            res.send(results)
        });
    });


    // Update a Post with postId
    app.put('/posts/:post_id/:user_id', function (req, res) {
        const post_id = req.params.post_id;
        const user_id = req.params.user_id;
        connection.query('UPDATE posts SET ? WHERE post_id = ? AND user_id = ?', [req.body, post_id, user_id], function (error) {
            if (error) throw error;
            res.send('Post updated successfully.');

        });
    });


    // Delete a Post with postId
    app.delete('/posts/:post_id', function (req, res) {
        const post_id = req.params.post_id;
        connection.query('DELETE FROM posts WHERE post_id = ?', post_id, function (error, results) {//Select all data from the 'users' table
            if (error) throw error;
            res.send('User deleted successfully.');

        });
    });

    /**--------------------Likes--------------------------*/
    app.put('/likes/:post_id', function (req, res) {
        const post_id = req.params.post_id;
        connection.query('UPDATE likes SET ? WHERE post_id = ?', [req.body, post_id], function (error, results) {//Update likes Number
            if (error) throw error;
            res.send('User updated successfully.');

        });
    });

    // get the number of likes for a post
    app.get('/likes/:post_id', function (req, res) {
        const post_id = req.params.post_id;
        connection.query('SELECT count(*) as likes FROM likes WHERE post_id = ? ', post_id, function (error, results) {
            if (error) throw error;
            res.send(results)

        });
    });

    //add a new like to a post
    app.post('/likes', function (req, res) {
        connection.query('INSERT INTO likes SET ?', req.body, function (error, results) {
            if (error) throw error;
            res.send(results)

        });
    });


    /**--------------------Comments--------------------------*/

    //add a new comment to a post
    app.post('/addComment', function (req, res) {
        connection.query('INSERT INTO comments SET ?', req.body, function (error, results) {
            if (error) throw error;
            res.send(results)

        });
    });


    // get the number of comments for a post
    app.get('/comments/:post_id', function (req, res) {
        const post_id = req.params.post_id;
        connection.query('SELECT count(*) as comments FROM comments WHERE post_id = ? ', post_id, function (error, results) {
            if (error) throw error;
            res.send(results)

        });
    });

    // get all comments of a post
    app.post('/comments', function (req, res) {
        connection.query('SELECT comment_id, post_id, content, comments.date, first_name,last_name, img FROM comments join users on comments.user_id = users.user_id', function (error, results) {
            if (error) throw error;
            res.send(results)

        });
    });


    /**--------------------Friends--------------------------*/
    app.post('/friends', function (req, res) {
        connection.query('INSERT INTO friends SET ?', req.body, function (error, results) {
            if (error) throw error;
            res.send(results)

        });
    });



/**---------------Upload a picture--------------------------*/

app.post('/img-upload', function (req, res) {
    connection.query('INSERT INTO friends SET ?', req.body, function (error, results) {
        if (error) throw error;
        res.send(results)

    });
});


};