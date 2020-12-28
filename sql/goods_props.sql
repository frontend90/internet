SET NAMES 'utf8';

--
-- Описание для таблицы goods_props
--
create table goods_props (
    id int(10) unsigned not null auto_increment,
    good_id int(10) unsigned not null,
    prop varchar(255) not null,
    value varchar(255) not null,
    primary key (id)
)
engine = innodb
auto_increment = 16
avg_row_length = 1170
character set utf8
collate utf8_general_ci;

-- 
-- Вывод данных для таблицы goods_props
--
INSERT INTO goods_props VALUES
(1, 1, 'Процессор', 'Intel Core i5'),
(2, 1, 'Объем памяти', '4 Гб'),
(3, 1, 'Размер экрана', '13 дюймов'),
(4, 2, 'Процессор', 'Intel Core i7'),
(6, 2, 'Размер экрана', '13 дюймов'),
(7, 3, 'Размер экрана', '14 дюймов'),
(8, 4, 'Процессор', 'Intel Pentium 4'),
(9, 5, 'Процессор', 'Intel Core i7'),
(10, 5, 'Наличие wi-fi', 'да'),
(11, 6, 'Диагональ экрана', '5 дюймов'),
(12, 6, 'GPS', 'да'),
(13, 7, 'Диагональ экрана', '4 дюйма'),
(14, 7, 'GPS', 'нет'),
(15, 8, 'Диагональ экрана', '4 дюйма');
