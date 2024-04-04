import { User } from './user_interface';

export interface IComment {
  comment: string;
  user: User;
  userId: string;
  rifaId: string;
  createdAt: string;
}

export interface ICommentToCreate {
  comment: string;
  rifaId: string;
}
