---
title: 行为型
category: 设计模式
author: JQiue
article: false
---

### 策略模式

### 模板方法模式

### 观察者模式

### 迭代器模式

Iterator 模式用于在数据集合中按照顺序遍历集合，iterate 在英文中有反复做某件事的意思，在中文中被称为“迭代”

```java
interface Iterator {
    public abstract boolean hasNext();
    public abstract Object next();
}

class Book {
    private String name;
    public Book(String name) {
        this.name = name;
    }
    public String getName() {
        return this.name;
    }
}

class BookShelf {
    private Book[] books;
    private int last = 0;
    public BookShelf(int maxsize) {
        this.books = new Book[maxsize];
    }
    public Book getBookAt(int index) {
        return this.books[index];
    }
    public void appendBook(Book book) {
        this.books[last] = book;
        this.last++;
    }
    public int getLength() {
        return last;
    }
    public Iterator iterator() {
        return new BookShelfIterator(this);
    }
}

class BookShelfIterator implements Iterator {
    private BookShelf bookShelf;
    private int index;
    public BookShelfIterator (BookShelf bookShelf) {
        this.bookShelf = bookShelf;
        this.index = 0;
    }
    public boolean hasNext() {
        if (index < bookShelf.getLength()) {
            return true;
        } else {
            return false;
        }
    }
    public Object next() {
        Book book = bookShelf.getBookAt(index);
        index++;
        return book;
    }
}

public class Main {
    public static void main(String args[]) {
        BookShelf bookShelf = new BookShelf(4);
        bookShelf.appendBook(new Book("编程珠玑"));
        bookShelf.appendBook(new Book("人月神话"));
        bookShelf.appendBook(new Book("没有银弹"));
        bookShelf.appendBook(new Book("整洁之道"));
        System.out.println(bookShelf.getLength());
        Iterator it = bookShelf.iterator();
        while (it.hasNext()) {
            Book book = (Book)it.next();
            System.out.println(book.getName());
        }
    }
}
```

+ Iterator：该角色负责定义按照顺序遍历每个元素的接口，定义了 hasNext() 和 next() 两个方法
+ ConcreteIterator：该角色负责实现 Iterator 所定义的接口，存储了遍历集合的必要信息
+ Aggregate：该角色负责创建 Iterator 角色的接口，这是一个方法，会创建一个能够迭代内部元素东西
+ ConcreteAggregate：该角色负责实现 Aggregate 所定义的接口

### 职责链模式

### 命令模式

### 备忘录模式

### 状态模式

### 访问者模式

### 中介者模式

### 解释器模式
