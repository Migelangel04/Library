class Book{
    constructor(bookTitle, bookAuthor, bookPages, bookRead, id)
    {
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.bookPages = bookPages;
        this.bookRead = bookRead;
        this.id = id;
    }

    get getBookTitle()
    {
        return this.bookTitle;
    }

    get getBookAuthor()
    {
        return this.bookAuthor;
    }

    get getBookPages()
    {
        return this.bookPages;
    }

    get getBookRead()
    {
        return this.bookRead;
    }

    get getBookId()
    {
        return this.id;
    }

    setBookRead(bool)
    {
        this.bookRead = bool;        
    }
    setBookId(index)
    {
        this.id = index;
    }
}

class Library
{
    #bookReadCounter = 0;
    #bookUnreadCounter = 0;
    #totalBooksSum = 0;
    bookList = [];

    constructor()
    {

    }

    get getbookListLength()
    {
        return this.#totalBooksSum;
    }

    get getBookReadCounter()
    {
        return this.#bookReadCounter;
    }

    get getBookUnreadCounter()
    {
        return this.#bookUnreadCounter;
    }

    updateBookList(book)
    {
        this.bookList.push(book);
        if (book.getBookRead)
        {
            this.#bookReadCounter++
        }
        else 
        {
            this.#bookUnreadCounter++;
        }
        this.#totalBooksSum++;
    }
    
    removeBook(index)
    {
        let currentBook = this.bookList[index];

        if (currentBook.getBookRead)
        {
            this.#bookReadCounter--;
        }
        else{
            this.#bookUnreadCounter--;
        }
        this.#totalBooksSum--;

        let tempBookList = [];
        this.bookList.splice(index, 1);

        for (let i = 0; i < this.bookList.length; i++)
        {
            let currentTempBook = this.bookList[i];
            currentTempBook.setBookId(i);
            addBookToList(currentTempBook);
            tempBookList.push(currentTempBook);
        }
        this.bookList = tempBookList;

    }

    bookListEntry(index)
    {
        return this.bookList[index];
    }

    updateHasRead(bool)
    {
        if (bool)
        {
            this.#bookReadCounter++;
            this.#bookUnreadCounter--;
        }
        else {
            this.#bookReadCounter--;
            this.#bookUnreadCounter++;
        }
    }
    
}

let bookEntry = document.getElementById('addBook');

let booksRead = document.getElementById('booksRead');
let booksUnread = document.getElementById('booksUnread');
let booksInCollection = document.getElementById('booksInCollection');

let userBookList = document.querySelector(".userBookList");
let library = new Library();

bookEntry.addEventListener("submit", (e) =>{
    let bookTitle = document.getElementById('bookTitle').value;
    let bookAuthor = document.getElementById('bookAuthor').value;
    let bookPages = document.getElementById('bookPages').value;
    let bookRead = document.getElementById('bookRead').checked;

    let bookNotInCollection = true;

    for (let i = 0; i < library.getbookListLength; i++)
    {
        if (library.bookListEntry(i).getBookTitle === bookTitle)
        {
            bookNotInCollection = false;
        }
    }

    if (bookNotInCollection)
    {
        let newBookEntry = new Book(bookTitle, 
            bookAuthor,  
            bookPages, 
            bookRead, library.getbookListLength);

        library.updateBookList(newBookEntry);
        addBookToList(newBookEntry);
        updateBookCounter();
    }

    document.addBook.reset();
    e.preventDefault();
});

userBookList.addEventListener("click", (e) => {
    if (e.target.matches('.removeBookButton')) {
        
        let currentIndex = e.target.parentNode.id;
        userBookList.textContent = '';
        library.removeBook(currentIndex);
        updateBookCounter();
    }
    else if (e.target.matches('.haveReadButton'))
    {
        let currentBook = library.bookListEntry(e.target.parentNode.id);
        
        if (currentBook.getBookRead)
        {
            currentBook.setBookRead(false);
            library.updateHasRead(false);
            e.target.classList.remove("haveReadColor");
            e.target.classList.add("haveNotReadColor");
            e.target.textContent = "Have Not Read :("
        }
        else 
        {
            currentBook.setBookRead(true);
            library.updateHasRead(true);
            e.target.classList.add("haveReadColor");
            e.target.classList.remove("haveNotReadColor");
            e.target.textContent = "Have Read :)"
        }
        updateBookCounter();
    }
});

function addBookToList(newBookEntry)
{

    let itemToAdd = document.createElement('div');
    itemToAdd.classList.add("item");
    itemToAdd.setAttribute('id', newBookEntry.getBookId);

    let itemHeader = document.createElement('h3');
    itemHeader.textContent = newBookEntry.getBookTitle;
    itemToAdd.appendChild(itemHeader);

    let itemAuthor = document.createElement('p');
    let itemAuthorStrong = document.createElement('strong');
    itemAuthorStrong.textContent = "Author: ";
    itemAuthor.appendChild(itemAuthorStrong);
    let authorText = document.createTextNode(newBookEntry.getBookAuthor);
    itemAuthor.appendChild(authorText);
    itemToAdd.appendChild(itemAuthor);

    let itemPage = document.createElement('p');
    let itemPageStrong = document.createElement('strong');
    itemPageStrong.textContent = "Pages: ";
    itemPage.appendChild(itemPageStrong);
    let pageText = document.createTextNode(newBookEntry.getBookPages);
    itemPage.appendChild(pageText);
    itemToAdd.appendChild(itemPage);

    let itemReadButton = document.createElement('button');
    itemReadButton.classList.add("haveReadButton");
    if (newBookEntry.getBookRead)
    {
        itemReadButton.textContent = "Have Read :)";
        itemReadButton.classList.add("haveReadColor")
    }
    else 
    {
        itemReadButton.textContent = "Have Not Read :("; 
        itemReadButton.classList.add("haveNotReadColor");
    }
    itemToAdd.appendChild(itemReadButton);

    let itemRemoveBookButton = document.createElement('button');
    itemRemoveBookButton.classList.add("removeBookButton");
    itemRemoveBookButton.textContent = "Remove";
    itemToAdd.appendChild(itemRemoveBookButton);

    userBookList.appendChild(itemToAdd);

}

function updateBookCounter()
{
    booksRead.textContent = "Books Read: " + library.getBookReadCounter;
    booksUnread.textContent = "Books Unread: " + library.getBookUnreadCounter;
    booksInCollection.textContent = "Total Books: " + library.getbookListLength;
}