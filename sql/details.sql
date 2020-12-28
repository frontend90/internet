﻿use webdevkin;
create table details (
    order_id int(11) not null,
    good_id int(11) not null,
    good varchar(255) not null,
    price int(11) not null,
    count int(11) not null,
    primary key (order_id, good_id)
)
engine = innodb
avg_row_length = 8192
character set utf8
collate utf8_general_ci; 
