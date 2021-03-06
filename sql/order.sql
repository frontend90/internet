use webdevkin;
create table orders (
    id int(10) unsigned not null auto_increment,
    client_id int(10) unsigned not null,
    address varchar(255) default null,
    message varchar(255) default null,
    dt_added timestamp default current_timestamp on update current_timestamp,
    primary key (id)
)
engine = innodb
auto_increment = 2
avg_row_length = 16384
character set utf8
collate utf8_general_ci;
