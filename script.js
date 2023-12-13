function Book(bookTitle, bookAuthor, bookPublishDate, bookPages, bookRead)
{
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
    this.bookPublishDate = bookPublishDate;
    this.bookPages = bookPages;
    this.bookRead = bookRead;
}

let bookEntry = document.getElementById('addBook');

let booksRead = document.getElementById('booksRead');
let booksUnread = document.getElementById('booksUnread');
let booksInCollection = document.getElementById('booksInCollection');

let removeBook = document.getElementById("removeBook");
let removeAll = document.getElementById("removeAll");

let listTitle = document.querySelector('.title');
let listAuthor = document.querySelector('.author');
let listPublished = document.querySelector('.published');
let listPages = document.querySelector('.pages');
let listRead = document.querySelector('.read');

let bookReadCounter = 0;
let bookUnreadCounter = 0;
let totalBooksSum = 0;
let bookList = [];

bookEntry.addEventListener("submit", (e) =>{
    let bookTitle = document.getElementById('bookTitle').value;
    let bookAuthor = document.getElementById('bookAuthor').value;
    let bookDatePublished = document.getElementById('datePublished').value;
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
            bookDatePublished, 
            bookPages, 
            bookRead);

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
        addToBookCounter();
        addBookToList();
    }

    document.addBook.reset();
    e.preventDefault();

    
} );

removeBook.addEventListener("click", () => {
    
})

function addToBookCounter()
{
    booksRead.textContent = "Books Read: " + bookReadCounter;
    booksUnread.textContent = "Books Unread: " + bookUnreadCounter;
    booksInCollection.textContent = "Total Books: " + totalBooksSum;
}

function addBookToList()
{
    let currentBook = bookList[bookList.length - 1];

    let title = document.createElement('p');
    let author = document.createElement('p');
    let published = document.createElement('p');
    let pages = document.createElement('p');
    let haveRead = document.createElement('p');

    if (currentBook.bookPublishDate === "")
    {
        currentBook.bookPublishDate = "N/A";
    }

    title.textContent = currentBook.bookTitle;
    listTitle.appendChild(title);
    author.textContent = currentBook.bookAuthor;
    listAuthor.appendChild(author);
    published.textContent = currentBook.bookPublishDate;
    listPublished.appendChild(published);
    pages.textContent = currentBook.bookPages;
    listPages.appendChild(pages);
    haveRead.textContent = currentBook.bookRead;
    listRead.appendChild(haveRead);

}
