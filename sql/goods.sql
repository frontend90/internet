SET NAMES 'utf8';

--
-- Описание для таблицы goods
--
DROP TABLE IF EXISTS goods;
create table goods(
    id int(10) unsigned not null auto_increment,
    good varchar(255) not null,
    category_id int(10) unsigned not null,
    brand_id int(10) unsigned not null,
    price int(11) unsigned not null,
    rating int(11) unsigned not null default 0,
    photo varchar(255) not null,
    primary key (id),
    index FK_goods_brands_id (brand_id),
    index FK_goods_categories_id (category_id),
    constraint FK_goods_brands_id foreign key (brand_id)
    references brands (id) on delete cascade on update cascade,
    constraint FK_goods_categories_id foreign key (category_id)
    references categories (id) on delete cascade on update cascade
)
engine = innodb
auto_increment = 15
avg_row_length = 1170
character set utf8
collate utf8_general_ci;

-- 
-- Вывод данных для таблицы goods
--
INSERT INTO goods VALUES
    (1, 'Ноутбук Apple MacBook Air', 1, 1, 60000, 8, 'apple_macbook_air.jpg'),
    (2, 'Ноутбук Apple MacBook Pro', 1, 1, 70000, 9, 'apple_macbook_pro.jpg'),
    (3, 'Ноутбук Lenovo IdeaPad', 1, 4, 17000, 5, 'lenovo_idea_pad.jpg'),
    (4, 'Ноутбук Lenovo G5030', 1, 4, 16000, 7, 'lenovo_g5030.jpg'),
    (5, 'Ноутбук Acer Aspire', 1, 3, 21000, 8, 'acer_aspire.jpg'),
    (6, 'Смартфон Samsung Galaxy A7', 2, 2, 30000, 9, 'samsung_galaxy_a7.jpg'),
    (7, 'Смартфон Samsung Galaxy A5', 2, 2, 17000, 8, 'samsung_galaxy_a5.jpg'),
    (8, 'Смартфон Apple iPhone SE', 2, 1, 38000, 10, 'apple_iphone_se.jpg'),
    (9, 'Смартфон Asus Zenfone Laser', 2, 5, 12000, 6, 'asus_zenfone_laser.jpg'),
    (10, 'Смартфон Lenovo A5000', 2, 4, 11000, 3, 'lenovo_a5000.jpg'),
    (11, 'Смартфон Lenovo P90', 2, 4, 16000, 5, 'lenovo_p90.jpg'),
    (12, 'Видеокарта ASUS', 3, 5, 2000, 8, 'asus_video.jpg'),
    (13, 'Видеокарта GIGABYTE GT-740', 3, 6, 6000, 9, 'gigabyte_video_gt740.jpg'),
    (14, 'Видеокарта GIGABYTE GTX-960', 3, 6, 14000, 10, 'gigabyte_video_gtx960.jpg');
