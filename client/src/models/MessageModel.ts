class MessageModel {
  id?: number;
  title: string;
  question: string;
  email?: string;
  admin?: string;
  response?: string;
  closed?: boolean;

  constructor(title: string, question: string) {
    this.title = title;
    this.question = question;
  }
}

export default MessageModel;
