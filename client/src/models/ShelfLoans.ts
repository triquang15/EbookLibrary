import Book from "./Book";

class ShelfLoans {
  book: Book;
  daysLeft: number;
  constructor(book: Book, daysLeft: number) {
    this.book = book;
    this.daysLeft = daysLeft;
  }
}
export default ShelfLoans;
