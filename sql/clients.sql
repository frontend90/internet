﻿use webdevkin;
create table clients (
    id int(10) unsigned not null auto_increment,
    name varchar(255) default null,
    email varchar(50) default null,
    phone varchar(50) default null,
    dt_added timestamp default current_timestamp on update current_timestamp,
    primary key (id)
)
engine = innodb
auto_increment = 2
avg_row_length = 16384
character set utf8
collate utf8_general_ci;
