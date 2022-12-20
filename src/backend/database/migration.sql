CREATE TABLE users (
    id int auto_increment primary key,
    username varchar(64),
    name varchar(64),
    password varchar(256),
    created_at datetime default current_timestamp
);

CREATE TABLE scores (
    id int auto_increment primary key,
    user_id int not null,
    score int,
    foreign key(user_id) references users(id),
    created_at datetime default current_timestamp
);