let addBookButton = document.querySelector('#add-book');
let confirmBookInfo = document.querySelector('.confirm-book');
let bookTitleInput = document.querySelector('.book-title');
let bookAuthorInput = document.querySelector('.book-author');
let bookPagesInput = document.querySelector('.book-pages');
let radioButton1 = document.querySelector('#btnradio1');
let radioButton2 = document.querySelector('#btnradio2');
let mainContent = document.querySelector('.content');
let removeBtn;
let bookId = 0;
let isFinished = true;
let myLibrary = [];

radioButton1.addEventListener('click', () => {
     if (!(radioButton1.hasAttribute('checked'))) {
          radioButton1.setAttribute('checked', 'checked');
          isFinished = true;
          radioButton2.removeAttribute('checked');
     }
})

radioButton2.addEventListener('click', () => {
     if (!(radioButton2.hasAttribute('checked'))) {
          radioButton2.setAttribute('checked', 'checked');
          isFinished = false;
          radioButton1.removeAttribute('checked');
     }
})

confirmBookInfo.addEventListener('click', () => {
     if (!(bookTitleInput.value === '') && 
     !(bookAuthorInput.value === '') && 
     !(bookPagesInput.value === '')) {
          addBookToLibrary();
          clearInputs();
     }
})

function clearInputs() {
     bookTitleInput.value = '';
     bookAuthorInput.value = '';
     bookPagesInput.value = '';
}

//create bootstrap card to display on grid
function createCard(cNum, cTitle, cAuthor, cPages, cReadStatus) {

     let card = document.createElement('div');
     card.setAttribute('class', `card text-bg-light mb-3`);
     card.setAttribute('style', 'max-width: 18rem;');
     card.setAttribute('id', `${cNum}`);

     //header elements
     let header = document.createElement('div');
     header.setAttribute('class', 'card-header');

     let title = document.createElement('h4');
     title.textContent = cTitle;

     let remove = document.createElement('button');
     remove.setAttribute('type', 'button');
     remove.setAttribute('class', 'btn btn-outline-dark btn-sm');
     remove.setAttribute('id', `${cNum}`);
     remove.textContent = 'Remove';

     //body elements
     let body = document.createElement('div');
     body.setAttribute('class', 'card-body');

     let author = document.createElement('h5');
     author.setAttribute('class', 'card-title');
     author.textContent = cAuthor;

     let pages = document.createElement('p');
     pages.setAttribute('class', 'card-text');
     pages.textContent = cPages + ' ' + 'pages';

     let bookStatus = document.createElement('p');
     bookStatus.setAttribute('class', 'card-text text-end');
     if (cReadStatus === true) {
          bookStatus.textContent = 'Read';
          card.style.border = '1px solid #022c22'
          header.style.backgroundColor = '#6ee7b7'
          body.style.backgroundColor = '#a7f3d0'
     } else {
          bookStatus.textContent = 'Unread';
          card.style.border = '1px solid #450a0a'
          header.style.backgroundColor = '#f87171'
          body.style.backgroundColor = '#fca5a5'
     }

     //appending elements to card
     card.append(header);
     header.append(title);
     header.append(remove);
     card.append(body);
     body.append(author);
     body.append(pages);
     body.append(bookStatus);
     mainContent.append(card);


     remove.addEventListener('click', function() {
          removeBook(remove);
          remove.parentNode.parentNode.remove();
     })
}

function removeBook(btn) {
     myLibrary.forEach((bk) => {
          if (btn.getAttribute('id') == bk.id) {
               myLibrary.splice(myLibrary.indexOf(bk), 1);
               return;
          }
     })
}

function book(title, author, pages, readStatus, id) {
     this.title = title
     this.author = author
     this.pages = pages
     this.readStatus = readStatus
     this.id = id
}

function addBookToLibrary() {
     let newBook = new book(
          bookTitleInput.value,
          bookAuthorInput.value,
          bookPagesInput.value,
          isFinished,
          bookId);

     createCard(
          bookId,
          bookTitleInput.value,
          bookAuthorInput.value,
          bookPagesInput.value,
          isFinished
     );

     myLibrary.push(newBook);
     bookId += 1;
}