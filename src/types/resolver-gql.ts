export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AuthLoginResponse = {
  __typename?: 'AuthLoginResponse';
  errors?: Maybe<Array<Maybe<ErrorUnion>>>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type AuthMutations = {
  __typename?: 'AuthMutations';
  login: AuthLoginResponse;
  signUp: AuthSignUpResponse;
};


export type AuthMutationsLoginArgs = {
  input: AuthLoginInput;
};


export type AuthMutationsSignUpArgs = {
  input: AuthSignUpInput;
};

export type AuthSignUpInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AuthSignUpResponse = {
  __typename?: 'AuthSignUpResponse';
  errors?: Maybe<Array<Maybe<ErrorUnion>>>;
  ok: Scalars['Boolean']['output'];
};

export type Board = {
  __typename?: 'Board';
  columns: Array<BoardColumn>;
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type BoardColumn = {
  __typename?: 'BoardColumn';
  boardId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type BoardInfo = {
  __typename?: 'BoardInfo';
  board: Board;
  boardId: Scalars['Int']['output'];
};

export type BoardMutations = {
  __typename?: 'BoardMutations';
  createBoard: CreateBoardResponse;
  deleteBoard: DeleteBoardResponse;
  updateBoard: UpdateBoardResponse;
};


export type BoardMutationsCreateBoardArgs = {
  input: CreateBoardInput;
};


export type BoardMutationsDeleteBoardArgs = {
  input: DeleteBoardInput;
};


export type BoardMutationsUpdateBoardArgs = {
  input: UpdateBoardInput;
};

export type ColumnMutations = {
  __typename?: 'ColumnMutations';
  createColumn: CreateColumnResponse;
  deleteColumn: DeleteColumnResponse;
  updateColumn: UpdateColumnResponse;
};


export type ColumnMutationsCreateColumnArgs = {
  input: CreateColumnInput;
};


export type ColumnMutationsDeleteColumnArgs = {
  input: DeleteColumnInput;
};


export type ColumnMutationsUpdateColumnArgs = {
  input: UpdateColumnInput;
};

export type CreateBoardInput = {
  title: Scalars['String']['input'];
};

export type CreateBoardResponse = {
  __typename?: 'CreateBoardResponse';
  board?: Maybe<BoardInfo>;
  ok: Scalars['Boolean']['output'];
};

export type CreateColumnInput = {
  boardId: Scalars['Int']['input'];
  order: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreateColumnResponse = {
  __typename?: 'CreateColumnResponse';
  column?: Maybe<BoardColumn>;
  error?: Maybe<ErrorMessage>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteBoardInput = {
  boardId: Scalars['Int']['input'];
};

export type DeleteBoardResponse = {
  __typename?: 'DeleteBoardResponse';
  boardId?: Maybe<Scalars['Int']['output']>;
  ok: Scalars['Boolean']['output'];
  query?: Maybe<Query>;
};

export type DeleteColumnInput = {
  columnId: Scalars['Int']['input'];
};

export type DeleteColumnResponse = {
  __typename?: 'DeleteColumnResponse';
  columnId?: Maybe<Scalars['Int']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ErrorMessage = {
  __typename?: 'ErrorMessage';
  message?: Maybe<Scalars['String']['output']>;
};

export type ErrorUnion = ErrorMessage | FormError;

export type FormError = {
  __typename?: 'FormError';
  fieldName?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  auth: AuthMutations;
  board: BoardMutations;
  column: ColumnMutations;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
};

export type UpdateBoardInput = {
  boardId: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBoardResponse = {
  __typename?: 'UpdateBoardResponse';
  board: Board;
  ok: Scalars['Boolean']['output'];
};

export type UpdateColumnInput = {
  columnId: Scalars['Int']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateColumnResponse = {
  __typename?: 'UpdateColumnResponse';
  column?: Maybe<BoardColumn>;
  error?: Maybe<ErrorMessage>;
  ok: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  boards: Array<BoardInfo>;
  email?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};
