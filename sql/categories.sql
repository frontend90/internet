SET NAMES 'utf8';

--
-- Описание для таблицы categories
--
DROP TABLE IF EXISTS categories;
create table categories(
    id int(10) unsigned not null auto_increment,
    category varchar(255) not null,
    primary key (id)
)
engine = innodb
auto_increment = 4
avg_row_length = 5461
character set utf8
collate utf8_general_ci;

-- 
-- Вывод данных для таблицы categories
--
INSERT INTO categories VALUES
    (1, 'Ноутбуки'),
    (2, 'Смартфоны'),
    (3, 'Видеокарты');
