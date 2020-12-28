SET NAMES 'utf8';

--
-- Описание для таблицы brands
--
DROP TABLE IF EXISTS brands;
create table brands(
    id int(10) unsigned not null auto_increment,
    brand varchar(255) default null,
    primary key (id)
)
engine = innodb
auto_increment = 7
avg_row_length = 2730
character set utf8
collate utf8_general_ci;

-- 
-- Вывод данных для таблицы brands
--
INSERT INTO brands VALUES
    (1, 'Apple'),
    (2, 'Samsung'),
    (3, 'Acer'),
    (4, 'Lenovo'),
    (5, 'Asus'),
    (6, 'Gigabyte');
