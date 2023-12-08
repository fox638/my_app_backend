import type { GraphQLResolveInfo } from "graphql";
import type { MercuriusContext } from "mercurius";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) =>
  | Promise<import("mercurius-codegen").DeepPartial<TResult>>
  | import("mercurius-codegen").DeepPartial<TResult>;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  board: BoardMutations;
  auth: AuthMutations;
  card: CardMutations;
  column: ColumnMutations;
};

export type User = {
  __typename?: "User";
  boards: Array<BoardInfo>;
  cards: Array<BoardCardInfo>;
  columns: Array<BoardColumnInfo>;
  email?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

export type BoardInfo = {
  __typename?: "BoardInfo";
  boardId: Scalars["Int"];
  board?: Maybe<Board>;
};

export type Board = {
  __typename?: "Board";
  id: Scalars["Int"];
  title: Scalars["String"];
  columns: Array<BoardColumnInfo>;
};

export type CreateBoardInput = {
  title: Scalars["String"];
};

export type CreateBoardResponse = {
  __typename?: "CreateBoardResponse";
  ok: Scalars["Boolean"];
  board?: Maybe<BoardInfo>;
};

export type DeleteBoardInput = {
  boardId: Scalars["Int"];
};

export type DeleteBoardResponse = {
  __typename?: "DeleteBoardResponse";
  ok: Scalars["Boolean"];
  boardId?: Maybe<Scalars["Int"]>;
  query?: Maybe<Query>;
};

export type UpdateBoardInput = {
  boardId: Scalars["Int"];
  title?: InputMaybe<Scalars["String"]>;
};

export type UpdateBoardResponse = {
  __typename?: "UpdateBoardResponse";
  ok: Scalars["Boolean"];
  board?: Maybe<BoardInfo>;
  error?: Maybe<ErrorMessage>;
};

export type BoardMutations = {
  __typename?: "BoardMutations";
  createBoard: CreateBoardResponse;
  updateBoard: UpdateBoardResponse;
  deleteBoard: DeleteBoardResponse;
};

export type BoardMutationscreateBoardArgs = {
  input: CreateBoardInput;
};

export type BoardMutationsupdateBoardArgs = {
  input: UpdateBoardInput;
};

export type BoardMutationsdeleteBoardArgs = {
  input: DeleteBoardInput;
};

export type AuthLoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type AuthSignUpInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type AuthLoginResponse = {
  __typename?: "AuthLoginResponse";
  ok: Scalars["Boolean"];
  user?: Maybe<User>;
  errors?: Maybe<Array<Maybe<ErrorUnion>>>;
};

export type AuthSignUpResponse = {
  __typename?: "AuthSignUpResponse";
  ok: Scalars["Boolean"];
  errors?: Maybe<Array<Maybe<ErrorUnion>>>;
};

export type AuthMutations = {
  __typename?: "AuthMutations";
  login: AuthLoginResponse;
  signUp: AuthSignUpResponse;
};

export type AuthMutationsloginArgs = {
  input: AuthLoginInput;
};

export type AuthMutationssignUpArgs = {
  input: AuthSignUpInput;
};

export type BoardColumn = {
  __typename?: "BoardColumn";
  cards: Array<BoardCardInfo>;
  id: Scalars["Int"];
  title: Scalars["String"];
  boardId: Scalars["Int"];
  order: Scalars["Int"];
};

export type BoardCardInfo = {
  __typename?: "BoardCardInfo";
  cardId: Scalars["Int"];
  card: BoardCard;
};

export type BoardCard = {
  __typename?: "BoardCard";
  id: Scalars["Int"];
  title: Scalars["String"];
  columnId: Scalars["Int"];
  boardId: Scalars["Int"];
  board: BoardInfo;
  order: Scalars["Int"];
};

export type CreateCardInput = {
  title: Scalars["String"];
  columnId: Scalars["Int"];
  order: Scalars["Int"];
};

export type CreateCardResponse = {
  __typename?: "CreateCardResponse";
  ok: Scalars["Boolean"];
  card?: Maybe<BoardCard>;
  error?: Maybe<ErrorMessage>;
};

export type UpdateCardInput = {
  cardId: Scalars["Int"];
  title?: InputMaybe<Scalars["String"]>;
  order?: InputMaybe<Scalars["Int"]>;
};

export type UpdateCardResponse = {
  __typename?: "UpdateCardResponse";
  ok: Scalars["Boolean"];
  card?: Maybe<BoardCard>;
  error?: Maybe<ErrorMessage>;
};

export type DeleteCardInput = {
  cardId: Scalars["Int"];
};

export type DeleteCardResponse = {
  __typename?: "DeleteCardResponse";
  ok: Scalars["Boolean"];
  cardId?: Maybe<Scalars["Int"]>;
  error?: Maybe<ErrorMessage>;
};

export type CardMutations = {
  __typename?: "CardMutations";
  createCard?: Maybe<CreateCardResponse>;
  updateCard?: Maybe<UpdateCardResponse>;
  deleteCard?: Maybe<DeleteCardResponse>;
};

export type CardMutationscreateCardArgs = {
  input: CreateCardInput;
};

export type CardMutationsupdateCardArgs = {
  input: UpdateCardInput;
};

export type CardMutationsdeleteCardArgs = {
  input: DeleteCardInput;
};

export type BoardColumnInfo = {
  __typename?: "BoardColumnInfo";
  columnId: Scalars["Int"];
  column?: Maybe<BoardColumn>;
};

export type CreateColumnInput = {
  title: Scalars["String"];
  boardId: Scalars["Int"];
  order: Scalars["Int"];
};

export type CreateColumnResponse = {
  __typename?: "CreateColumnResponse";
  ok: Scalars["Boolean"];
  column?: Maybe<BoardColumnInfo>;
  error?: Maybe<ErrorMessage>;
};

export type UpdateColumnInput = {
  columnId: Scalars["Int"];
  title?: InputMaybe<Scalars["String"]>;
  order?: InputMaybe<Scalars["Int"]>;
};

export type UpdateColumnResponse = {
  __typename?: "UpdateColumnResponse";
  ok: Scalars["Boolean"];
  column?: Maybe<BoardColumnInfo>;
  error?: Maybe<ErrorMessage>;
};

export type DeleteColumnInput = {
  columnId: Scalars["Int"];
};

export type DeleteColumnResponse = {
  __typename?: "DeleteColumnResponse";
  ok: Scalars["Boolean"];
  columnId?: Maybe<Scalars["Int"]>;
  error?: Maybe<ErrorMessage>;
};

export type ColumnMutations = {
  __typename?: "ColumnMutations";
  createColumn?: Maybe<CreateColumnResponse>;
  updateColumn?: Maybe<UpdateColumnResponse>;
  deleteColumn?: Maybe<DeleteColumnResponse>;
};

export type ColumnMutationscreateColumnArgs = {
  input: CreateColumnInput;
};

export type ColumnMutationsupdateColumnArgs = {
  input: UpdateColumnInput;
};

export type ColumnMutationsdeleteColumnArgs = {
  input: DeleteColumnInput;
};

export type FormError = {
  __typename?: "FormError";
  fieldName?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
};

export type ErrorMessage = {
  __typename?: "ErrorMessage";
  message?: Maybe<Scalars["String"]>;
};

export type ErrorUnion = FormError | ErrorMessage;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes = {
  ErrorUnion: FormError | ErrorMessage;
};

/** Mapping of union parent types */
export type ResolversUnionParentTypes = {
  ErrorUnion: FormError | ErrorMessage;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  BoardInfo: ResolverTypeWrapper<BoardInfo>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Board: ResolverTypeWrapper<Board>;
  CreateBoardInput: CreateBoardInput;
  CreateBoardResponse: ResolverTypeWrapper<CreateBoardResponse>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  DeleteBoardInput: DeleteBoardInput;
  DeleteBoardResponse: ResolverTypeWrapper<DeleteBoardResponse>;
  UpdateBoardInput: UpdateBoardInput;
  UpdateBoardResponse: ResolverTypeWrapper<UpdateBoardResponse>;
  BoardMutations: ResolverTypeWrapper<BoardMutations>;
  AuthLoginInput: AuthLoginInput;
  AuthSignUpInput: AuthSignUpInput;
  AuthLoginResponse: ResolverTypeWrapper<
    Omit<AuthLoginResponse, "errors"> & {
      errors?: Maybe<Array<Maybe<ResolversTypes["ErrorUnion"]>>>;
    }
  >;
  AuthSignUpResponse: ResolverTypeWrapper<
    Omit<AuthSignUpResponse, "errors"> & {
      errors?: Maybe<Array<Maybe<ResolversTypes["ErrorUnion"]>>>;
    }
  >;
  AuthMutations: ResolverTypeWrapper<AuthMutations>;
  BoardColumn: ResolverTypeWrapper<BoardColumn>;
  BoardCardInfo: ResolverTypeWrapper<BoardCardInfo>;
  BoardCard: ResolverTypeWrapper<BoardCard>;
  CreateCardInput: CreateCardInput;
  CreateCardResponse: ResolverTypeWrapper<CreateCardResponse>;
  UpdateCardInput: UpdateCardInput;
  UpdateCardResponse: ResolverTypeWrapper<UpdateCardResponse>;
  DeleteCardInput: DeleteCardInput;
  DeleteCardResponse: ResolverTypeWrapper<DeleteCardResponse>;
  CardMutations: ResolverTypeWrapper<CardMutations>;
  BoardColumnInfo: ResolverTypeWrapper<BoardColumnInfo>;
  CreateColumnInput: CreateColumnInput;
  CreateColumnResponse: ResolverTypeWrapper<CreateColumnResponse>;
  UpdateColumnInput: UpdateColumnInput;
  UpdateColumnResponse: ResolverTypeWrapper<UpdateColumnResponse>;
  DeleteColumnInput: DeleteColumnInput;
  DeleteColumnResponse: ResolverTypeWrapper<DeleteColumnResponse>;
  ColumnMutations: ResolverTypeWrapper<ColumnMutations>;
  FormError: ResolverTypeWrapper<FormError>;
  ErrorMessage: ResolverTypeWrapper<ErrorMessage>;
  ErrorUnion: ResolverTypeWrapper<ResolversUnionTypes["ErrorUnion"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Mutation: {};
  User: User;
  String: Scalars["String"];
  BoardInfo: BoardInfo;
  Int: Scalars["Int"];
  Board: Board;
  CreateBoardInput: CreateBoardInput;
  CreateBoardResponse: CreateBoardResponse;
  Boolean: Scalars["Boolean"];
  DeleteBoardInput: DeleteBoardInput;
  DeleteBoardResponse: DeleteBoardResponse;
  UpdateBoardInput: UpdateBoardInput;
  UpdateBoardResponse: UpdateBoardResponse;
  BoardMutations: BoardMutations;
  AuthLoginInput: AuthLoginInput;
  AuthSignUpInput: AuthSignUpInput;
  AuthLoginResponse: Omit<AuthLoginResponse, "errors"> & {
    errors?: Maybe<Array<Maybe<ResolversParentTypes["ErrorUnion"]>>>;
  };
  AuthSignUpResponse: Omit<AuthSignUpResponse, "errors"> & {
    errors?: Maybe<Array<Maybe<ResolversParentTypes["ErrorUnion"]>>>;
  };
  AuthMutations: AuthMutations;
  BoardColumn: BoardColumn;
  BoardCardInfo: BoardCardInfo;
  BoardCard: BoardCard;
  CreateCardInput: CreateCardInput;
  CreateCardResponse: CreateCardResponse;
  UpdateCardInput: UpdateCardInput;
  UpdateCardResponse: UpdateCardResponse;
  DeleteCardInput: DeleteCardInput;
  DeleteCardResponse: DeleteCardResponse;
  CardMutations: CardMutations;
  BoardColumnInfo: BoardColumnInfo;
  CreateColumnInput: CreateColumnInput;
  CreateColumnResponse: CreateColumnResponse;
  UpdateColumnInput: UpdateColumnInput;
  UpdateColumnResponse: UpdateColumnResponse;
  DeleteColumnInput: DeleteColumnInput;
  DeleteColumnResponse: DeleteColumnResponse;
  ColumnMutations: ColumnMutations;
  FormError: FormError;
  ErrorMessage: ErrorMessage;
  ErrorUnion: ResolversUnionParentTypes["ErrorUnion"];
};

export type authDirectiveArgs = {};

export type authDirectiveResolver<
  Result,
  Parent,
  ContextType = MercuriusContext,
  Args = authDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  board?: Resolver<ResolversTypes["BoardMutations"], ParentType, ContextType>;
  auth?: Resolver<ResolversTypes["AuthMutations"], ParentType, ContextType>;
  card?: Resolver<ResolversTypes["CardMutations"], ParentType, ContextType>;
  column?: Resolver<ResolversTypes["ColumnMutations"], ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
  boards?: Resolver<
    Array<ResolversTypes["BoardInfo"]>,
    ParentType,
    ContextType
  >;
  cards?: Resolver<
    Array<ResolversTypes["BoardCardInfo"]>,
    ParentType,
    ContextType
  >;
  columns?: Resolver<
    Array<ResolversTypes["BoardColumnInfo"]>,
    ParentType,
    ContextType
  >;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardInfoResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["BoardInfo"] = ResolversParentTypes["BoardInfo"],
> = {
  boardId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  board?: Resolver<Maybe<ResolversTypes["Board"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Board"] = ResolversParentTypes["Board"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  columns?: Resolver<
    Array<ResolversTypes["BoardColumnInfo"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateBoardResponseResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["CreateBoardResponse"] = ResolversParentTypes["CreateBoardResponse"],
> = {
  ok?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  board?: Resolver<Maybe<ResolversTypes["BoardInfo"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteBoardResponseResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["DeleteBoardResponse"] = ResolversParentTypes["DeleteBoardResponse"],
> = {
  ok?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  boardId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  query?: Resolver<Maybe<ResolversTypes["Query"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateBoardResponseResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["UpdateBoardResponse"] = ResolversParentTypes["UpdateBoardResponse"],
> = {
  ok?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  board?: Resolver<Maybe<ResolversTypes["BoardInfo"]>, ParentType, ContextType>;
  error?: Resolver<
    Maybe<ResolversTypes["ErrorMessage"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardMutationsResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["BoardMutations"] = ResolversParentTypes["BoardMutations"],
> = {
  createBoard?: Resolver<
    ResolversTypes["CreateBoardResponse"],
    ParentType,
    ContextType,
    RequireFields<BoardMutationscreateBoardArgs, "input">
  >;
  updateBoard?: Resolver<
    ResolversTypes["UpdateBoardResponse"],
    ParentType,
    ContextType,
    RequireFields<BoardMutationsupdateBoardArgs, "input">
  >;
  deleteBoard?: Resolver<
    ResolversTypes["DeleteBoardResponse"],
    ParentType,
    ContextType,
    RequireFields<BoardMutationsdeleteBoardArgs, "input">
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthLoginResponseResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["AuthLoginResponse"] = ResolversParentTypes["AuthLoginResponse"],
> = {
  ok?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  errors?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ErrorUnion"]>>>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthSignUpResponseResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["AuthSignUpResponse"] = ResolversParentTypes["AuthSignUpResponse"],
> = {
  ok?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  errors?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["ErrorUnion"]>>>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthMutationsResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["AuthMutations"] = ResolversParentTypes["AuthMutations"],
> = {
  login?: Resolver<
    ResolversTypes["AuthLoginResponse"],
    ParentType,
    ContextType,
    RequireFields<AuthMutationsloginArgs, "input">
  >;
  signUp?: Resolver<
    ResolversTypes["AuthSignUpResponse"],
    ParentType,
    ContextType,
    RequireFields<AuthMutationssignUpArgs, "input">
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardColumnResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["BoardColumn"] = ResolversParentTypes["BoardColumn"],
> = {
  cards?: Resolver<
    Array<ResolversTypes["BoardCardInfo"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  boardId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  order?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardCardInfoResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["BoardCardInfo"] = ResolversParentTypes["BoardCardInfo"],
> = {
  cardId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  card?: Resolver<ResolversTypes["BoardCard"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardCardResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["BoardCard"] = ResolversParentTypes["BoardCard"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  columnId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  boardId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  board?: Resolver<ResolversTypes["BoardInfo"], ParentType, ContextType>;
  order?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCardResponseResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["CreateCardResponse"] = ResolversParentTypes["CreateCardResponse"],
> = {
  ok?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  card?: Resolver<Maybe<ResolversTypes["BoardCard"]>, ParentType, ContextType>;
  error?: Resolver<
    Maybe<ResolversTypes["ErrorMessage"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateCardResponseResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["UpdateCardResponse"] = ResolversParentTypes["UpdateCardResponse"],
> = {
  ok?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  card?: Resolver<Maybe<ResolversTypes["BoardCard"]>, ParentType, ContextType>;
  error?: Resolver<
    Maybe<ResolversTypes["ErrorMessage"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteCardResponseResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["DeleteCardResponse"] = ResolversParentTypes["DeleteCardResponse"],
> = {
  ok?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  cardId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  error?: Resolver<
    Maybe<ResolversTypes["ErrorMessage"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CardMutationsResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["CardMutations"] = ResolversParentTypes["CardMutations"],
> = {
  createCard?: Resolver<
    Maybe<ResolversTypes["CreateCardResponse"]>,
    ParentType,
    ContextType,
    RequireFields<CardMutationscreateCardArgs, "input">
  >;
  updateCard?: Resolver<
    Maybe<ResolversTypes["UpdateCardResponse"]>,
    ParentType,
    ContextType,
    RequireFields<CardMutationsupdateCardArgs, "input">
  >;
  deleteCard?: Resolver<
    Maybe<ResolversTypes["DeleteCardResponse"]>,
    ParentType,
    ContextType,
    RequireFields<CardMutationsdeleteCardArgs, "input">
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardColumnInfoResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["BoardColumnInfo"] = ResolversParentTypes["BoardColumnInfo"],
> = {
  columnId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  column?: Resolver<
    Maybe<ResolversTypes["BoardColumn"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateColumnResponseResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["CreateColumnResponse"] = ResolversParentTypes["CreateColumnResponse"],
> = {
  ok?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  column?: Resolver<
    Maybe<ResolversTypes["BoardColumnInfo"]>,
    ParentType,
    ContextType
  >;
  error?: Resolver<
    Maybe<ResolversTypes["ErrorMessage"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateColumnResponseResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["UpdateColumnResponse"] = ResolversParentTypes["UpdateColumnResponse"],
> = {
  ok?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  column?: Resolver<
    Maybe<ResolversTypes["BoardColumnInfo"]>,
    ParentType,
    ContextType
  >;
  error?: Resolver<
    Maybe<ResolversTypes["ErrorMessage"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteColumnResponseResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["DeleteColumnResponse"] = ResolversParentTypes["DeleteColumnResponse"],
> = {
  ok?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  columnId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  error?: Resolver<
    Maybe<ResolversTypes["ErrorMessage"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ColumnMutationsResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["ColumnMutations"] = ResolversParentTypes["ColumnMutations"],
> = {
  createColumn?: Resolver<
    Maybe<ResolversTypes["CreateColumnResponse"]>,
    ParentType,
    ContextType,
    RequireFields<ColumnMutationscreateColumnArgs, "input">
  >;
  updateColumn?: Resolver<
    Maybe<ResolversTypes["UpdateColumnResponse"]>,
    ParentType,
    ContextType,
    RequireFields<ColumnMutationsupdateColumnArgs, "input">
  >;
  deleteColumn?: Resolver<
    Maybe<ResolversTypes["DeleteColumnResponse"]>,
    ParentType,
    ContextType,
    RequireFields<ColumnMutationsdeleteColumnArgs, "input">
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormErrorResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["FormError"] = ResolversParentTypes["FormError"],
> = {
  fieldName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorMessageResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["ErrorMessage"] = ResolversParentTypes["ErrorMessage"],
> = {
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorUnionResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["ErrorUnion"] = ResolversParentTypes["ErrorUnion"],
> = {
  resolveType: TypeResolveFn<
    "FormError" | "ErrorMessage",
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = MercuriusContext> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  BoardInfo?: BoardInfoResolvers<ContextType>;
  Board?: BoardResolvers<ContextType>;
  CreateBoardResponse?: CreateBoardResponseResolvers<ContextType>;
  DeleteBoardResponse?: DeleteBoardResponseResolvers<ContextType>;
  UpdateBoardResponse?: UpdateBoardResponseResolvers<ContextType>;
  BoardMutations?: BoardMutationsResolvers<ContextType>;
  AuthLoginResponse?: AuthLoginResponseResolvers<ContextType>;
  AuthSignUpResponse?: AuthSignUpResponseResolvers<ContextType>;
  AuthMutations?: AuthMutationsResolvers<ContextType>;
  BoardColumn?: BoardColumnResolvers<ContextType>;
  BoardCardInfo?: BoardCardInfoResolvers<ContextType>;
  BoardCard?: BoardCardResolvers<ContextType>;
  CreateCardResponse?: CreateCardResponseResolvers<ContextType>;
  UpdateCardResponse?: UpdateCardResponseResolvers<ContextType>;
  DeleteCardResponse?: DeleteCardResponseResolvers<ContextType>;
  CardMutations?: CardMutationsResolvers<ContextType>;
  BoardColumnInfo?: BoardColumnInfoResolvers<ContextType>;
  CreateColumnResponse?: CreateColumnResponseResolvers<ContextType>;
  UpdateColumnResponse?: UpdateColumnResponseResolvers<ContextType>;
  DeleteColumnResponse?: DeleteColumnResponseResolvers<ContextType>;
  ColumnMutations?: ColumnMutationsResolvers<ContextType>;
  FormError?: FormErrorResolvers<ContextType>;
  ErrorMessage?: ErrorMessageResolvers<ContextType>;
  ErrorUnion?: ErrorUnionResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = MercuriusContext> = {
  auth?: authDirectiveResolver<any, any, ContextType>;
};

export type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: import("fastify").FastifyReply;
  },
) => Promise<Array<import("mercurius-codegen").DeepPartial<TReturn>>>;
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<
  TContext = import("mercurius").MercuriusContext & {
    reply: import("fastify").FastifyReply;
  },
> {
  User?: {
    boards?: LoaderResolver<Array<BoardInfo>, User, {}, TContext>;
    cards?: LoaderResolver<Array<BoardCardInfo>, User, {}, TContext>;
    columns?: LoaderResolver<Array<BoardColumnInfo>, User, {}, TContext>;
    email?: LoaderResolver<Maybe<Scalars["String"]>, User, {}, TContext>;
    username?: LoaderResolver<Maybe<Scalars["String"]>, User, {}, TContext>;
  };

  BoardInfo?: {
    boardId?: LoaderResolver<Scalars["Int"], BoardInfo, {}, TContext>;
    board?: LoaderResolver<Maybe<Board>, BoardInfo, {}, TContext>;
  };

  Board?: {
    id?: LoaderResolver<Scalars["Int"], Board, {}, TContext>;
    title?: LoaderResolver<Scalars["String"], Board, {}, TContext>;
    columns?: LoaderResolver<Array<BoardColumnInfo>, Board, {}, TContext>;
  };

  CreateBoardResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], CreateBoardResponse, {}, TContext>;
    board?: LoaderResolver<Maybe<BoardInfo>, CreateBoardResponse, {}, TContext>;
  };

  DeleteBoardResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], DeleteBoardResponse, {}, TContext>;
    boardId?: LoaderResolver<
      Maybe<Scalars["Int"]>,
      DeleteBoardResponse,
      {},
      TContext
    >;
    query?: LoaderResolver<Maybe<Query>, DeleteBoardResponse, {}, TContext>;
  };

  UpdateBoardResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], UpdateBoardResponse, {}, TContext>;
    board?: LoaderResolver<Maybe<BoardInfo>, UpdateBoardResponse, {}, TContext>;
    error?: LoaderResolver<
      Maybe<ErrorMessage>,
      UpdateBoardResponse,
      {},
      TContext
    >;
  };

  BoardMutations?: {
    createBoard?: LoaderResolver<
      CreateBoardResponse,
      BoardMutations,
      BoardMutationscreateBoardArgs,
      TContext
    >;
    updateBoard?: LoaderResolver<
      UpdateBoardResponse,
      BoardMutations,
      BoardMutationsupdateBoardArgs,
      TContext
    >;
    deleteBoard?: LoaderResolver<
      DeleteBoardResponse,
      BoardMutations,
      BoardMutationsdeleteBoardArgs,
      TContext
    >;
  };

  AuthLoginResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], AuthLoginResponse, {}, TContext>;
    user?: LoaderResolver<Maybe<User>, AuthLoginResponse, {}, TContext>;
    errors?: LoaderResolver<
      Maybe<Array<Maybe<ErrorUnion>>>,
      AuthLoginResponse,
      {},
      TContext
    >;
  };

  AuthSignUpResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], AuthSignUpResponse, {}, TContext>;
    errors?: LoaderResolver<
      Maybe<Array<Maybe<ErrorUnion>>>,
      AuthSignUpResponse,
      {},
      TContext
    >;
  };

  AuthMutations?: {
    login?: LoaderResolver<
      AuthLoginResponse,
      AuthMutations,
      AuthMutationsloginArgs,
      TContext
    >;
    signUp?: LoaderResolver<
      AuthSignUpResponse,
      AuthMutations,
      AuthMutationssignUpArgs,
      TContext
    >;
  };

  BoardColumn?: {
    cards?: LoaderResolver<Array<BoardCardInfo>, BoardColumn, {}, TContext>;
    id?: LoaderResolver<Scalars["Int"], BoardColumn, {}, TContext>;
    title?: LoaderResolver<Scalars["String"], BoardColumn, {}, TContext>;
    boardId?: LoaderResolver<Scalars["Int"], BoardColumn, {}, TContext>;
    order?: LoaderResolver<Scalars["Int"], BoardColumn, {}, TContext>;
  };

  BoardCardInfo?: {
    cardId?: LoaderResolver<Scalars["Int"], BoardCardInfo, {}, TContext>;
    card?: LoaderResolver<BoardCard, BoardCardInfo, {}, TContext>;
  };

  BoardCard?: {
    id?: LoaderResolver<Scalars["Int"], BoardCard, {}, TContext>;
    title?: LoaderResolver<Scalars["String"], BoardCard, {}, TContext>;
    columnId?: LoaderResolver<Scalars["Int"], BoardCard, {}, TContext>;
    boardId?: LoaderResolver<Scalars["Int"], BoardCard, {}, TContext>;
    board?: LoaderResolver<BoardInfo, BoardCard, {}, TContext>;
    order?: LoaderResolver<Scalars["Int"], BoardCard, {}, TContext>;
  };

  CreateCardResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], CreateCardResponse, {}, TContext>;
    card?: LoaderResolver<Maybe<BoardCard>, CreateCardResponse, {}, TContext>;
    error?: LoaderResolver<
      Maybe<ErrorMessage>,
      CreateCardResponse,
      {},
      TContext
    >;
  };

  UpdateCardResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], UpdateCardResponse, {}, TContext>;
    card?: LoaderResolver<Maybe<BoardCard>, UpdateCardResponse, {}, TContext>;
    error?: LoaderResolver<
      Maybe<ErrorMessage>,
      UpdateCardResponse,
      {},
      TContext
    >;
  };

  DeleteCardResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], DeleteCardResponse, {}, TContext>;
    cardId?: LoaderResolver<
      Maybe<Scalars["Int"]>,
      DeleteCardResponse,
      {},
      TContext
    >;
    error?: LoaderResolver<
      Maybe<ErrorMessage>,
      DeleteCardResponse,
      {},
      TContext
    >;
  };

  CardMutations?: {
    createCard?: LoaderResolver<
      Maybe<CreateCardResponse>,
      CardMutations,
      CardMutationscreateCardArgs,
      TContext
    >;
    updateCard?: LoaderResolver<
      Maybe<UpdateCardResponse>,
      CardMutations,
      CardMutationsupdateCardArgs,
      TContext
    >;
    deleteCard?: LoaderResolver<
      Maybe<DeleteCardResponse>,
      CardMutations,
      CardMutationsdeleteCardArgs,
      TContext
    >;
  };

  BoardColumnInfo?: {
    columnId?: LoaderResolver<Scalars["Int"], BoardColumnInfo, {}, TContext>;
    column?: LoaderResolver<Maybe<BoardColumn>, BoardColumnInfo, {}, TContext>;
  };

  CreateColumnResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], CreateColumnResponse, {}, TContext>;
    column?: LoaderResolver<
      Maybe<BoardColumnInfo>,
      CreateColumnResponse,
      {},
      TContext
    >;
    error?: LoaderResolver<
      Maybe<ErrorMessage>,
      CreateColumnResponse,
      {},
      TContext
    >;
  };

  UpdateColumnResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], UpdateColumnResponse, {}, TContext>;
    column?: LoaderResolver<
      Maybe<BoardColumnInfo>,
      UpdateColumnResponse,
      {},
      TContext
    >;
    error?: LoaderResolver<
      Maybe<ErrorMessage>,
      UpdateColumnResponse,
      {},
      TContext
    >;
  };

  DeleteColumnResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], DeleteColumnResponse, {}, TContext>;
    columnId?: LoaderResolver<
      Maybe<Scalars["Int"]>,
      DeleteColumnResponse,
      {},
      TContext
    >;
    error?: LoaderResolver<
      Maybe<ErrorMessage>,
      DeleteColumnResponse,
      {},
      TContext
    >;
  };

  ColumnMutations?: {
    createColumn?: LoaderResolver<
      Maybe<CreateColumnResponse>,
      ColumnMutations,
      ColumnMutationscreateColumnArgs,
      TContext
    >;
    updateColumn?: LoaderResolver<
      Maybe<UpdateColumnResponse>,
      ColumnMutations,
      ColumnMutationsupdateColumnArgs,
      TContext
    >;
    deleteColumn?: LoaderResolver<
      Maybe<DeleteColumnResponse>,
      ColumnMutations,
      ColumnMutationsdeleteColumnArgs,
      TContext
    >;
  };

  FormError?: {
    fieldName?: LoaderResolver<
      Maybe<Scalars["String"]>,
      FormError,
      {},
      TContext
    >;
    message?: LoaderResolver<Maybe<Scalars["String"]>, FormError, {}, TContext>;
  };

  ErrorMessage?: {
    message?: LoaderResolver<
      Maybe<Scalars["String"]>,
      ErrorMessage,
      {},
      TContext
    >;
  };
}
declare module "mercurius" {
  interface IResolvers
    extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
