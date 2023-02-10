class History {
  id: number;
  email: string;
  checkoutDate: string;
  returnedDate: string;
  title: string;
  author: string;
  description: string;
  image: string;

  constructor(
    id: number,
    email: string,
    checkoutDate: string,
    returnedDate: string,
    title: string,
    author: string,
    description: string,
    image: string
  ) {
    this.id = id;
    this.title = title;
    this.email = email;
    this.checkoutDate = checkoutDate;
    this.returnedDate = returnedDate;
    this.description = description;
    this.author = author;
    this.image = image;
  }
}

export default History;
