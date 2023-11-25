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
  column: ColumnMutations;
};

export type User = {
  __typename?: "User";
  boards: Array<BoardInfo>;
  email?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

export type Board = {
  __typename?: "Board";
  id: Scalars["Int"];
  title: Scalars["String"];
  columns: Array<BoardColumn>;
};

export type BoardInfo = {
  __typename?: "BoardInfo";
  boardId: Scalars["Int"];
  board: Board;
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
  board: Board;
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
  id: Scalars["Int"];
  title: Scalars["String"];
  boardId: Scalars["Int"];
  order: Scalars["Int"];
};

export type CreateColumnInput = {
  title: Scalars["String"];
  boardId: Scalars["Int"];
  order?: InputMaybe<Scalars["Int"]>;
};

export type CreateColumnResponse = {
  __typename?: "CreateColumnResponse";
  ok: Scalars["Boolean"];
  column?: Maybe<BoardColumn>;
};

export type UpdateColumnInput = {
  columnId: Scalars["Int"];
  title?: InputMaybe<Scalars["String"]>;
  order?: InputMaybe<Scalars["Int"]>;
};

export type UpdateColumnResponse = {
  __typename?: "UpdateColumnResponse";
  ok: Scalars["Boolean"];
  column?: Maybe<BoardColumn>;
};

export type DeleteColumnInput = {
  columnId: Scalars["Int"];
};

export type DeleteColumnResponse = {
  __typename?: "DeleteColumnResponse";
  ok: Scalars["Boolean"];
  columnId?: Maybe<Scalars["Int"]>;
};

export type ColumnMutations = {
  __typename?: "ColumnMutations";
  createColumn: CreateColumnResponse;
  updateColumn: UpdateColumnResponse;
  deleteColumn: DeleteColumnResponse;
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
  Board: ResolverTypeWrapper<Board>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  BoardInfo: ResolverTypeWrapper<BoardInfo>;
  CreateBoardInput: CreateBoardInput;
  CreateBoardResponse: ResolverTypeWrapper<CreateBoardResponse>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  DeleteBoardInput: DeleteBoardInput;
  DeleteBoardResponse: ResolverTypeWrapper<DeleteBoardResponse>;
  UpdateBoardInput: UpdateBoardInput;
  UpdateBoardResponse: ResolverTypeWrapper<UpdateBoardResponse>;
  BoardMutations: ResolverTypeWrapper<BoardMutations>;
  FormError: ResolverTypeWrapper<FormError>;
  ErrorMessage: ResolverTypeWrapper<ErrorMessage>;
  ErrorUnion: ResolverTypeWrapper<ResolversUnionTypes["ErrorUnion"]>;
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
  CreateColumnInput: CreateColumnInput;
  CreateColumnResponse: ResolverTypeWrapper<CreateColumnResponse>;
  UpdateColumnInput: UpdateColumnInput;
  UpdateColumnResponse: ResolverTypeWrapper<UpdateColumnResponse>;
  DeleteColumnInput: DeleteColumnInput;
  DeleteColumnResponse: ResolverTypeWrapper<DeleteColumnResponse>;
  ColumnMutations: ResolverTypeWrapper<ColumnMutations>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Mutation: {};
  User: User;
  String: Scalars["String"];
  Board: Board;
  Int: Scalars["Int"];
  BoardInfo: BoardInfo;
  CreateBoardInput: CreateBoardInput;
  CreateBoardResponse: CreateBoardResponse;
  Boolean: Scalars["Boolean"];
  DeleteBoardInput: DeleteBoardInput;
  DeleteBoardResponse: DeleteBoardResponse;
  UpdateBoardInput: UpdateBoardInput;
  UpdateBoardResponse: UpdateBoardResponse;
  BoardMutations: BoardMutations;
  FormError: FormError;
  ErrorMessage: ErrorMessage;
  ErrorUnion: ResolversUnionParentTypes["ErrorUnion"];
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
  CreateColumnInput: CreateColumnInput;
  CreateColumnResponse: CreateColumnResponse;
  UpdateColumnInput: UpdateColumnInput;
  UpdateColumnResponse: UpdateColumnResponse;
  DeleteColumnInput: DeleteColumnInput;
  DeleteColumnResponse: DeleteColumnResponse;
  ColumnMutations: ColumnMutations;
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
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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
    Array<ResolversTypes["BoardColumn"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BoardInfoResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["BoardInfo"] = ResolversParentTypes["BoardInfo"],
> = {
  boardId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  board?: Resolver<ResolversTypes["Board"], ParentType, ContextType>;
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
  board?: Resolver<ResolversTypes["Board"], ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  boardId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  order?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateColumnResponseResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["CreateColumnResponse"] = ResolversParentTypes["CreateColumnResponse"],
> = {
  ok?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  column?: Resolver<
    Maybe<ResolversTypes["BoardColumn"]>,
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
    Maybe<ResolversTypes["BoardColumn"]>,
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
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ColumnMutationsResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["ColumnMutations"] = ResolversParentTypes["ColumnMutations"],
> = {
  createColumn?: Resolver<
    ResolversTypes["CreateColumnResponse"],
    ParentType,
    ContextType,
    RequireFields<ColumnMutationscreateColumnArgs, "input">
  >;
  updateColumn?: Resolver<
    ResolversTypes["UpdateColumnResponse"],
    ParentType,
    ContextType,
    RequireFields<ColumnMutationsupdateColumnArgs, "input">
  >;
  deleteColumn?: Resolver<
    ResolversTypes["DeleteColumnResponse"],
    ParentType,
    ContextType,
    RequireFields<ColumnMutationsdeleteColumnArgs, "input">
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MercuriusContext> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Board?: BoardResolvers<ContextType>;
  BoardInfo?: BoardInfoResolvers<ContextType>;
  CreateBoardResponse?: CreateBoardResponseResolvers<ContextType>;
  DeleteBoardResponse?: DeleteBoardResponseResolvers<ContextType>;
  UpdateBoardResponse?: UpdateBoardResponseResolvers<ContextType>;
  BoardMutations?: BoardMutationsResolvers<ContextType>;
  FormError?: FormErrorResolvers<ContextType>;
  ErrorMessage?: ErrorMessageResolvers<ContextType>;
  ErrorUnion?: ErrorUnionResolvers<ContextType>;
  AuthLoginResponse?: AuthLoginResponseResolvers<ContextType>;
  AuthSignUpResponse?: AuthSignUpResponseResolvers<ContextType>;
  AuthMutations?: AuthMutationsResolvers<ContextType>;
  BoardColumn?: BoardColumnResolvers<ContextType>;
  CreateColumnResponse?: CreateColumnResponseResolvers<ContextType>;
  UpdateColumnResponse?: UpdateColumnResponseResolvers<ContextType>;
  DeleteColumnResponse?: DeleteColumnResponseResolvers<ContextType>;
  ColumnMutations?: ColumnMutationsResolvers<ContextType>;
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
    email?: LoaderResolver<Maybe<Scalars["String"]>, User, {}, TContext>;
    username?: LoaderResolver<Maybe<Scalars["String"]>, User, {}, TContext>;
  };

  Board?: {
    id?: LoaderResolver<Scalars["Int"], Board, {}, TContext>;
    title?: LoaderResolver<Scalars["String"], Board, {}, TContext>;
    columns?: LoaderResolver<Array<BoardColumn>, Board, {}, TContext>;
  };

  BoardInfo?: {
    boardId?: LoaderResolver<Scalars["Int"], BoardInfo, {}, TContext>;
    board?: LoaderResolver<Board, BoardInfo, {}, TContext>;
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
    board?: LoaderResolver<Board, UpdateBoardResponse, {}, TContext>;
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
    id?: LoaderResolver<Scalars["Int"], BoardColumn, {}, TContext>;
    title?: LoaderResolver<Scalars["String"], BoardColumn, {}, TContext>;
    boardId?: LoaderResolver<Scalars["Int"], BoardColumn, {}, TContext>;
    order?: LoaderResolver<Scalars["Int"], BoardColumn, {}, TContext>;
  };

  CreateColumnResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], CreateColumnResponse, {}, TContext>;
    column?: LoaderResolver<
      Maybe<BoardColumn>,
      CreateColumnResponse,
      {},
      TContext
    >;
  };

  UpdateColumnResponse?: {
    ok?: LoaderResolver<Scalars["Boolean"], UpdateColumnResponse, {}, TContext>;
    column?: LoaderResolver<
      Maybe<BoardColumn>,
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
  };

  ColumnMutations?: {
    createColumn?: LoaderResolver<
      CreateColumnResponse,
      ColumnMutations,
      ColumnMutationscreateColumnArgs,
      TContext
    >;
    updateColumn?: LoaderResolver<
      UpdateColumnResponse,
      ColumnMutations,
      ColumnMutationsupdateColumnArgs,
      TContext
    >;
    deleteColumn?: LoaderResolver<
      DeleteColumnResponse,
      ColumnMutations,
      ColumnMutationsdeleteColumnArgs,
      TContext
    >;
  };
}
declare module "mercurius" {
  interface IResolvers
    extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
