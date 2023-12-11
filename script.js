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

let listTitle = document.getElementById('title');
let listAuthor = document.getElementById('author');
let listPublished = document.getElementById('published');
let listPages = document.getElementById('pages');
let listRead = document.getElementById('read');

let bookReadCounter = 0;
let bookUnreadCounter = 0;
let totalBooksSum = 0;
let bookList = [];

bookEntry.addEventListener("submit", () =>{

    let bookTitle = document.getElementById('bookTitle');
    let bookAuthor = document.getElementById('bookAuthor');
    let bookDatePublished = document.getElementById('datePublished');
    let bookPages = document.getElementById('bookPages');
    let bookRead = document.getElementById('bookRead');
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
        let newBookEntry = new Book(bookTitle.value, 
            bookAuthor.value, 
            bookDatePublished.value, 
            bookPages.value, 
            bookRead.checked);

        if (bookRead.checked === true)
        {
            bookReadCounter++;
            totalBooksSum++;
        }
        else{
            bookUnreadCounter++;
            totalBooksSum++;
        }
    
        bookList.push(newBookEntry);
    }
    
} );

function addToBookCounter()
{
    booksRead.textContent = "Books Read: " + booksRead;
    booksUnread.textContent = "Books Unread: " + booksUnread;
    booksInCollection.textContent = "Total Books: " + totalBooksSum;
}

function addBookToList()
{
    let currentBook = bookList[bookList.length - 1];

    let title = docuement.createElement('p');
    let author = docuement.createElement('p');
    let published = docuement.createElement('p');
    let pages = docuement.createElement('p');
    let haveRead = document.createElement('p');

    title.textContent = currentBook.bookTitle;
    author.textContent = currentBook.bookAuthor;
    published.textContent = currentBook

}
