function Book(bookTitle, bookAuthor, bookPages, bookRead, id)
{
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookPages = bookPages;
    this.bookRead = bookRead;
    this.id = id;
}

let bookEntry = document.getElementById('addBook');

let booksRead = document.getElementById('booksRead');
let booksUnread = document.getElementById('booksUnread');
let booksInCollection = document.getElementById('booksInCollection');

let userBookList = document.querySelector(".userBookList");

let bookReadCounter = 0;
let bookUnreadCounter = 0;
let totalBooksSum = 0;
let bookList = [];

bookEntry.addEventListener("submit", (e) =>{
    let bookTitle = document.getElementById('bookTitle').value;
    let bookAuthor = document.getElementById('bookAuthor').value;
    let bookPages = document.getElementById('bookPages').value;
    let bookRead = document.getElementById('bookRead').checked;

    let bookNotInCollection = true;

    for (let i = 0; i < bookList.length; i++)
    {
        if (bookList[i].bookTitle === bookTitle)
        {
            bookNotInCollection = false;
        }
    }

    if (bookNotInCollection)
    {
        let newBookEntry = new Book(bookTitle, 
            bookAuthor,  
            bookPages, 
            bookRead, bookList.length);

        if (bookRead === true)
        {
            bookReadCounter++;
            totalBooksSum++;
        }
        else{
            bookUnreadCounter++;
            totalBooksSum++;
        }
        bookList.push(newBookEntry);
        addBookToList(newBookEntry);
        updateBookCounter();
    }

    document.addBook.reset();
    e.preventDefault();
});

userBookList.addEventListener("click", (e) => {
    if (e.target.matches('.removeBookButton')) {
        
        let currentIndex = e.target.parentNode.id;
        let currentBook = bookList[currentIndex];
        console.log(currentBook);
        userBookList.textContent = '';
        
        // Update Book Counter
        if (currentBook.bookRead)
        {
            bookReadCounter--;
            totalBooksSum--;
        }
        else {
            bookUnreadCounter--;
            totalBooksSum--;
        }
        updateBookCounter();

        let tempBookList = [];
        bookList.splice(currentIndex, 1);

        for (let i = 0; i < bookList.length; i++)
        {
            let currentTempBook = bookList[i];
            currentTempBook.id = i;
            addBookToList(currentTempBook);
            tempBookList.push(currentTempBook);
        }
        bookList = tempBookList;
    }
    else if (e.target.matches('.haveReadButton'))
    {
        let currentBook = bookList[e.target.parentNode.id];
        
        if (currentBook.bookRead)
        {
            currentBook.bookRead = false;
            e.target.classList.remove("haveReadColor");
            e.target.classList.add("haveNotReadColor");
            e.target.textContent = "Have Not Read :("
            bookReadCounter--;
            bookUnreadCounter++;
        }
        else 
        {
            currentBook.bookRead = true;
            e.target.classList.add("haveReadColor");
            e.target.classList.remove("haveNotReadColor");
            e.target.textContent = "Have Read :)"
            bookReadCounter++;
            bookUnreadCounter--;
        }
        updateBookCounter();
    }
});

function addBookToList(newBookEntry)
{

    let itemToAdd = document.createElement('div');
    itemToAdd.classList.add("item");
    itemToAdd.setAttribute('id', newBookEntry.id);

    let itemHeader = document.createElement('h3');
    itemHeader.textContent = newBookEntry.bookTitle;
    itemToAdd.appendChild(itemHeader);

    let itemAuthor = document.createElement('p');
    let itemAuthorStrong = document.createElement('strong');
    itemAuthorStrong.textContent = "Author: ";
    itemAuthor.appendChild(itemAuthorStrong);
    let authorText = document.createTextNode(newBookEntry.bookAuthor);
    itemAuthor.appendChild(authorText);
    itemToAdd.appendChild(itemAuthor);

    let itemPage = document.createElement('p');
    let itemPageStrong = document.createElement('strong');
    itemPageStrong.textContent = "Pages: ";
    itemPage.appendChild(itemPageStrong);
    let pageText = document.createTextNode(newBookEntry.bookPages);
    itemPage.appendChild(pageText);
    itemToAdd.appendChild(itemPage);

    let itemReadButton = document.createElement('button');
    itemReadButton.classList.add("haveReadButton");
    if (newBookEntry.bookRead)
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
    booksRead.textContent = "Books Read: " + bookReadCounter;
    booksUnread.textContent = "Books Unread: " + bookUnreadCounter;
    booksInCollection.textContent = "Total Books: " + totalBooksSum;
}
