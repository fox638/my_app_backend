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
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  test?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};
