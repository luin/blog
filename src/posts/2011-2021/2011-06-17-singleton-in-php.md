---
title: "PHP 实现单例模式"
tags:
  - design pattern
  - php
  - singleton
---

目前的一个项目有几个模块需要实现单例模式，于是想实现一个 Singleton 基类来使这些模块通过继承该基类实现 Singleton。

<!-- more -->

```php
<?php
class Singleton
{
    protected static $instances;

    public static function getInstance()
    {
        if(!isset(self::$instances)) {
            self::$instances = new __CLASS__;
        }
        return self::$instances;
    }

    protected function __construct() { }

    protected function __clone() { }

}
```

这是一个 Singleton 的 PHP 实现，然而这时希望通过如下代码使 Database 类实现 Singleton 是不可行的:

```php
<?php
class Database extends Singleton { }
```

因为 `__CLASS__` 获得的永远只是父类（Singleton）而不是子类，所以无法获知子类类信息，自然也就无法实现子类的单例。

PHP5.3 提供了[`get_called_class()`](http://cn.php.net/manual/en/function.get-called-class.php)函数，用过此函数可以实现[ Singleton 的继承](http://www.xinze.me/php-%E5%8F%AF%E7%BB%A7%E6%89%BF%E7%9A%84%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F%E4%BE%8B%E5%AD%90-singleton/)。

## 其它实现方式

为了能在 PHP5.3 以前实现 Singleton 的继承，我们可以定义一个静态数组来维护类的实例，定义以及使用方法如下：

```php
<?php
class Singleton
{
    protected static $instances = array();

    public static function getInstance($className)
    {
        if(!isset(self::$instances[$className])) {
            self::$instances[$className] = new $className;
        }
        return self::$instances[$className];
    }

    protected function __construct() { }

    protected function __clone() { }

}

class Database extends Singleton
{
    public function hello()
    {
        echo 'hello';
    }
}

Singleton::getInstance('Database')->hello();
```
