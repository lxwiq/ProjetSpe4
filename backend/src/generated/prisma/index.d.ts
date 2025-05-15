
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model call_participants
 * 
 */
export type call_participants = $Result.DefaultSelection<Prisma.$call_participantsPayload>
/**
 * Model calls
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type calls = $Result.DefaultSelection<Prisma.$callsPayload>
/**
 * Model document_versions
 * 
 */
export type document_versions = $Result.DefaultSelection<Prisma.$document_versionsPayload>
/**
 * Model documents
 * 
 */
export type documents = $Result.DefaultSelection<Prisma.$documentsPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model conversations
 * 
 */
export type conversations = $Result.DefaultSelection<Prisma.$conversationsPayload>
/**
 * Model conversation_participants
 * 
 */
export type conversation_participants = $Result.DefaultSelection<Prisma.$conversation_participantsPayload>
/**
 * Model messages
 * 
 */
export type messages = $Result.DefaultSelection<Prisma.$messagesPayload>
/**
 * Model notifications
 * 
 */
export type notifications = $Result.DefaultSelection<Prisma.$notificationsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Call_participants
 * const call_participants = await prisma.call_participants.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Call_participants
   * const call_participants = await prisma.call_participants.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.call_participants`: Exposes CRUD operations for the **call_participants** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Call_participants
    * const call_participants = await prisma.call_participants.findMany()
    * ```
    */
  get call_participants(): Prisma.call_participantsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.calls`: Exposes CRUD operations for the **calls** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Calls
    * const calls = await prisma.calls.findMany()
    * ```
    */
  get calls(): Prisma.callsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document_versions`: Exposes CRUD operations for the **document_versions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Document_versions
    * const document_versions = await prisma.document_versions.findMany()
    * ```
    */
  get document_versions(): Prisma.document_versionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documents`: Exposes CRUD operations for the **documents** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.documents.findMany()
    * ```
    */
  get documents(): Prisma.documentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversations`: Exposes CRUD operations for the **conversations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversations.findMany()
    * ```
    */
  get conversations(): Prisma.conversationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation_participants`: Exposes CRUD operations for the **conversation_participants** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversation_participants
    * const conversation_participants = await prisma.conversation_participants.findMany()
    * ```
    */
  get conversation_participants(): Prisma.conversation_participantsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.messages`: Exposes CRUD operations for the **messages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.messages.findMany()
    * ```
    */
  get messages(): Prisma.messagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notifications`: Exposes CRUD operations for the **notifications** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notifications.findMany()
    * ```
    */
  get notifications(): Prisma.notificationsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    call_participants: 'call_participants',
    calls: 'calls',
    document_versions: 'document_versions',
    documents: 'documents',
    users: 'users',
    conversations: 'conversations',
    conversation_participants: 'conversation_participants',
    messages: 'messages',
    notifications: 'notifications'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "call_participants" | "calls" | "document_versions" | "documents" | "users" | "conversations" | "conversation_participants" | "messages" | "notifications"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      call_participants: {
        payload: Prisma.$call_participantsPayload<ExtArgs>
        fields: Prisma.call_participantsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.call_participantsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_participantsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.call_participantsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_participantsPayload>
          }
          findFirst: {
            args: Prisma.call_participantsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_participantsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.call_participantsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_participantsPayload>
          }
          findMany: {
            args: Prisma.call_participantsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_participantsPayload>[]
          }
          create: {
            args: Prisma.call_participantsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_participantsPayload>
          }
          createMany: {
            args: Prisma.call_participantsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.call_participantsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_participantsPayload>[]
          }
          delete: {
            args: Prisma.call_participantsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_participantsPayload>
          }
          update: {
            args: Prisma.call_participantsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_participantsPayload>
          }
          deleteMany: {
            args: Prisma.call_participantsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.call_participantsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.call_participantsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_participantsPayload>[]
          }
          upsert: {
            args: Prisma.call_participantsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$call_participantsPayload>
          }
          aggregate: {
            args: Prisma.Call_participantsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCall_participants>
          }
          groupBy: {
            args: Prisma.call_participantsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Call_participantsGroupByOutputType>[]
          }
          count: {
            args: Prisma.call_participantsCountArgs<ExtArgs>
            result: $Utils.Optional<Call_participantsCountAggregateOutputType> | number
          }
        }
      }
      calls: {
        payload: Prisma.$callsPayload<ExtArgs>
        fields: Prisma.callsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.callsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.callsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callsPayload>
          }
          findFirst: {
            args: Prisma.callsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.callsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callsPayload>
          }
          findMany: {
            args: Prisma.callsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callsPayload>[]
          }
          create: {
            args: Prisma.callsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callsPayload>
          }
          createMany: {
            args: Prisma.callsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.callsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callsPayload>[]
          }
          delete: {
            args: Prisma.callsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callsPayload>
          }
          update: {
            args: Prisma.callsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callsPayload>
          }
          deleteMany: {
            args: Prisma.callsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.callsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.callsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callsPayload>[]
          }
          upsert: {
            args: Prisma.callsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$callsPayload>
          }
          aggregate: {
            args: Prisma.CallsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCalls>
          }
          groupBy: {
            args: Prisma.callsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallsGroupByOutputType>[]
          }
          count: {
            args: Prisma.callsCountArgs<ExtArgs>
            result: $Utils.Optional<CallsCountAggregateOutputType> | number
          }
        }
      }
      document_versions: {
        payload: Prisma.$document_versionsPayload<ExtArgs>
        fields: Prisma.document_versionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.document_versionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_versionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.document_versionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_versionsPayload>
          }
          findFirst: {
            args: Prisma.document_versionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_versionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.document_versionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_versionsPayload>
          }
          findMany: {
            args: Prisma.document_versionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_versionsPayload>[]
          }
          create: {
            args: Prisma.document_versionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_versionsPayload>
          }
          createMany: {
            args: Prisma.document_versionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.document_versionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_versionsPayload>[]
          }
          delete: {
            args: Prisma.document_versionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_versionsPayload>
          }
          update: {
            args: Prisma.document_versionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_versionsPayload>
          }
          deleteMany: {
            args: Prisma.document_versionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.document_versionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.document_versionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_versionsPayload>[]
          }
          upsert: {
            args: Prisma.document_versionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_versionsPayload>
          }
          aggregate: {
            args: Prisma.Document_versionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument_versions>
          }
          groupBy: {
            args: Prisma.document_versionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Document_versionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.document_versionsCountArgs<ExtArgs>
            result: $Utils.Optional<Document_versionsCountAggregateOutputType> | number
          }
        }
      }
      documents: {
        payload: Prisma.$documentsPayload<ExtArgs>
        fields: Prisma.documentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.documentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$documentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.documentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$documentsPayload>
          }
          findFirst: {
            args: Prisma.documentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$documentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.documentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$documentsPayload>
          }
          findMany: {
            args: Prisma.documentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$documentsPayload>[]
          }
          create: {
            args: Prisma.documentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$documentsPayload>
          }
          createMany: {
            args: Prisma.documentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.documentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$documentsPayload>[]
          }
          delete: {
            args: Prisma.documentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$documentsPayload>
          }
          update: {
            args: Prisma.documentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$documentsPayload>
          }
          deleteMany: {
            args: Prisma.documentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.documentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.documentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$documentsPayload>[]
          }
          upsert: {
            args: Prisma.documentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$documentsPayload>
          }
          aggregate: {
            args: Prisma.DocumentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocuments>
          }
          groupBy: {
            args: Prisma.documentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.documentsCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentsCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      conversations: {
        payload: Prisma.$conversationsPayload<ExtArgs>
        fields: Prisma.conversationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.conversationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.conversationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversationsPayload>
          }
          findFirst: {
            args: Prisma.conversationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.conversationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversationsPayload>
          }
          findMany: {
            args: Prisma.conversationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversationsPayload>[]
          }
          create: {
            args: Prisma.conversationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversationsPayload>
          }
          createMany: {
            args: Prisma.conversationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.conversationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversationsPayload>[]
          }
          delete: {
            args: Prisma.conversationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversationsPayload>
          }
          update: {
            args: Prisma.conversationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversationsPayload>
          }
          deleteMany: {
            args: Prisma.conversationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.conversationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.conversationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversationsPayload>[]
          }
          upsert: {
            args: Prisma.conversationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversationsPayload>
          }
          aggregate: {
            args: Prisma.ConversationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversations>
          }
          groupBy: {
            args: Prisma.conversationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.conversationsCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationsCountAggregateOutputType> | number
          }
        }
      }
      conversation_participants: {
        payload: Prisma.$conversation_participantsPayload<ExtArgs>
        fields: Prisma.conversation_participantsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.conversation_participantsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversation_participantsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.conversation_participantsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversation_participantsPayload>
          }
          findFirst: {
            args: Prisma.conversation_participantsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversation_participantsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.conversation_participantsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversation_participantsPayload>
          }
          findMany: {
            args: Prisma.conversation_participantsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversation_participantsPayload>[]
          }
          create: {
            args: Prisma.conversation_participantsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversation_participantsPayload>
          }
          createMany: {
            args: Prisma.conversation_participantsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.conversation_participantsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversation_participantsPayload>[]
          }
          delete: {
            args: Prisma.conversation_participantsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversation_participantsPayload>
          }
          update: {
            args: Prisma.conversation_participantsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversation_participantsPayload>
          }
          deleteMany: {
            args: Prisma.conversation_participantsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.conversation_participantsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.conversation_participantsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversation_participantsPayload>[]
          }
          upsert: {
            args: Prisma.conversation_participantsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conversation_participantsPayload>
          }
          aggregate: {
            args: Prisma.Conversation_participantsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation_participants>
          }
          groupBy: {
            args: Prisma.conversation_participantsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Conversation_participantsGroupByOutputType>[]
          }
          count: {
            args: Prisma.conversation_participantsCountArgs<ExtArgs>
            result: $Utils.Optional<Conversation_participantsCountAggregateOutputType> | number
          }
        }
      }
      messages: {
        payload: Prisma.$messagesPayload<ExtArgs>
        fields: Prisma.messagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.messagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.messagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          findFirst: {
            args: Prisma.messagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.messagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          findMany: {
            args: Prisma.messagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>[]
          }
          create: {
            args: Prisma.messagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          createMany: {
            args: Prisma.messagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.messagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>[]
          }
          delete: {
            args: Prisma.messagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          update: {
            args: Prisma.messagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          deleteMany: {
            args: Prisma.messagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.messagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.messagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>[]
          }
          upsert: {
            args: Prisma.messagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$messagesPayload>
          }
          aggregate: {
            args: Prisma.MessagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessages>
          }
          groupBy: {
            args: Prisma.messagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.messagesCountArgs<ExtArgs>
            result: $Utils.Optional<MessagesCountAggregateOutputType> | number
          }
        }
      }
      notifications: {
        payload: Prisma.$notificationsPayload<ExtArgs>
        fields: Prisma.notificationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.notificationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.notificationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          findFirst: {
            args: Prisma.notificationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.notificationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          findMany: {
            args: Prisma.notificationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>[]
          }
          create: {
            args: Prisma.notificationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          createMany: {
            args: Prisma.notificationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.notificationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>[]
          }
          delete: {
            args: Prisma.notificationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          update: {
            args: Prisma.notificationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          deleteMany: {
            args: Prisma.notificationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.notificationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.notificationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>[]
          }
          upsert: {
            args: Prisma.notificationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notificationsPayload>
          }
          aggregate: {
            args: Prisma.NotificationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotifications>
          }
          groupBy: {
            args: Prisma.notificationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.notificationsCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    call_participants?: call_participantsOmit
    calls?: callsOmit
    document_versions?: document_versionsOmit
    documents?: documentsOmit
    users?: usersOmit
    conversations?: conversationsOmit
    conversation_participants?: conversation_participantsOmit
    messages?: messagesOmit
    notifications?: notificationsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CallsCountOutputType
   */

  export type CallsCountOutputType = {
    call_participants: number
  }

  export type CallsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call_participants?: boolean | CallsCountOutputTypeCountCall_participantsArgs
  }

  // Custom InputTypes
  /**
   * CallsCountOutputType without action
   */
  export type CallsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallsCountOutputType
     */
    select?: CallsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CallsCountOutputType without action
   */
  export type CallsCountOutputTypeCountCall_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: call_participantsWhereInput
  }


  /**
   * Count Type DocumentsCountOutputType
   */

  export type DocumentsCountOutputType = {
    calls: number
    document_versions: number
    other_documents: number
  }

  export type DocumentsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | DocumentsCountOutputTypeCountCallsArgs
    document_versions?: boolean | DocumentsCountOutputTypeCountDocument_versionsArgs
    other_documents?: boolean | DocumentsCountOutputTypeCountOther_documentsArgs
  }

  // Custom InputTypes
  /**
   * DocumentsCountOutputType without action
   */
  export type DocumentsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentsCountOutputType
     */
    select?: DocumentsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentsCountOutputType without action
   */
  export type DocumentsCountOutputTypeCountCallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: callsWhereInput
  }

  /**
   * DocumentsCountOutputType without action
   */
  export type DocumentsCountOutputTypeCountDocument_versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_versionsWhereInput
  }

  /**
   * DocumentsCountOutputType without action
   */
  export type DocumentsCountOutputTypeCountOther_documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: documentsWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    call_participants: number
    calls: number
    document_versions: number
    documents_documents_last_modified_byTousers: number
    documents_documents_owner_idTousers: number
    conversations_created: number
    conversation_participants: number
    messages_sent: number
    notifications_notifications_user_idTousers: number
    notifications_notifications_sender_idTousers: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call_participants?: boolean | UsersCountOutputTypeCountCall_participantsArgs
    calls?: boolean | UsersCountOutputTypeCountCallsArgs
    document_versions?: boolean | UsersCountOutputTypeCountDocument_versionsArgs
    documents_documents_last_modified_byTousers?: boolean | UsersCountOutputTypeCountDocuments_documents_last_modified_byTousersArgs
    documents_documents_owner_idTousers?: boolean | UsersCountOutputTypeCountDocuments_documents_owner_idTousersArgs
    conversations_created?: boolean | UsersCountOutputTypeCountConversations_createdArgs
    conversation_participants?: boolean | UsersCountOutputTypeCountConversation_participantsArgs
    messages_sent?: boolean | UsersCountOutputTypeCountMessages_sentArgs
    notifications_notifications_user_idTousers?: boolean | UsersCountOutputTypeCountNotifications_notifications_user_idTousersArgs
    notifications_notifications_sender_idTousers?: boolean | UsersCountOutputTypeCountNotifications_notifications_sender_idTousersArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountCall_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: call_participantsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountCallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: callsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountDocument_versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_versionsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountDocuments_documents_last_modified_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: documentsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountDocuments_documents_owner_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: documentsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountConversations_createdArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: conversationsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountConversation_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: conversation_participantsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountMessages_sentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: messagesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountNotifications_notifications_user_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountNotifications_notifications_sender_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationsWhereInput
  }


  /**
   * Count Type ConversationsCountOutputType
   */

  export type ConversationsCountOutputType = {
    conversation_participants: number
    messages: number
  }

  export type ConversationsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation_participants?: boolean | ConversationsCountOutputTypeCountConversation_participantsArgs
    messages?: boolean | ConversationsCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ConversationsCountOutputType without action
   */
  export type ConversationsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationsCountOutputType
     */
    select?: ConversationsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationsCountOutputType without action
   */
  export type ConversationsCountOutputTypeCountConversation_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: conversation_participantsWhereInput
  }

  /**
   * ConversationsCountOutputType without action
   */
  export type ConversationsCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: messagesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model call_participants
   */

  export type AggregateCall_participants = {
    _count: Call_participantsCountAggregateOutputType | null
    _avg: Call_participantsAvgAggregateOutputType | null
    _sum: Call_participantsSumAggregateOutputType | null
    _min: Call_participantsMinAggregateOutputType | null
    _max: Call_participantsMaxAggregateOutputType | null
  }

  export type Call_participantsAvgAggregateOutputType = {
    id: number | null
    call_id: number | null
    user_id: number | null
  }

  export type Call_participantsSumAggregateOutputType = {
    id: number | null
    call_id: number | null
    user_id: number | null
  }

  export type Call_participantsMinAggregateOutputType = {
    id: number | null
    call_id: number | null
    user_id: number | null
    joined_at: Date | null
    left_at: Date | null
    is_active: boolean | null
  }

  export type Call_participantsMaxAggregateOutputType = {
    id: number | null
    call_id: number | null
    user_id: number | null
    joined_at: Date | null
    left_at: Date | null
    is_active: boolean | null
  }

  export type Call_participantsCountAggregateOutputType = {
    id: number
    call_id: number
    user_id: number
    joined_at: number
    left_at: number
    is_active: number
    _all: number
  }


  export type Call_participantsAvgAggregateInputType = {
    id?: true
    call_id?: true
    user_id?: true
  }

  export type Call_participantsSumAggregateInputType = {
    id?: true
    call_id?: true
    user_id?: true
  }

  export type Call_participantsMinAggregateInputType = {
    id?: true
    call_id?: true
    user_id?: true
    joined_at?: true
    left_at?: true
    is_active?: true
  }

  export type Call_participantsMaxAggregateInputType = {
    id?: true
    call_id?: true
    user_id?: true
    joined_at?: true
    left_at?: true
    is_active?: true
  }

  export type Call_participantsCountAggregateInputType = {
    id?: true
    call_id?: true
    user_id?: true
    joined_at?: true
    left_at?: true
    is_active?: true
    _all?: true
  }

  export type Call_participantsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which call_participants to aggregate.
     */
    where?: call_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of call_participants to fetch.
     */
    orderBy?: call_participantsOrderByWithRelationInput | call_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: call_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` call_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` call_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned call_participants
    **/
    _count?: true | Call_participantsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Call_participantsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Call_participantsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Call_participantsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Call_participantsMaxAggregateInputType
  }

  export type GetCall_participantsAggregateType<T extends Call_participantsAggregateArgs> = {
        [P in keyof T & keyof AggregateCall_participants]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCall_participants[P]>
      : GetScalarType<T[P], AggregateCall_participants[P]>
  }




  export type call_participantsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: call_participantsWhereInput
    orderBy?: call_participantsOrderByWithAggregationInput | call_participantsOrderByWithAggregationInput[]
    by: Call_participantsScalarFieldEnum[] | Call_participantsScalarFieldEnum
    having?: call_participantsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Call_participantsCountAggregateInputType | true
    _avg?: Call_participantsAvgAggregateInputType
    _sum?: Call_participantsSumAggregateInputType
    _min?: Call_participantsMinAggregateInputType
    _max?: Call_participantsMaxAggregateInputType
  }

  export type Call_participantsGroupByOutputType = {
    id: number
    call_id: number
    user_id: number
    joined_at: Date | null
    left_at: Date | null
    is_active: boolean | null
    _count: Call_participantsCountAggregateOutputType | null
    _avg: Call_participantsAvgAggregateOutputType | null
    _sum: Call_participantsSumAggregateOutputType | null
    _min: Call_participantsMinAggregateOutputType | null
    _max: Call_participantsMaxAggregateOutputType | null
  }

  type GetCall_participantsGroupByPayload<T extends call_participantsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Call_participantsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Call_participantsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Call_participantsGroupByOutputType[P]>
            : GetScalarType<T[P], Call_participantsGroupByOutputType[P]>
        }
      >
    >


  export type call_participantsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    call_id?: boolean
    user_id?: boolean
    joined_at?: boolean
    left_at?: boolean
    is_active?: boolean
    calls?: boolean | callsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["call_participants"]>

  export type call_participantsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    call_id?: boolean
    user_id?: boolean
    joined_at?: boolean
    left_at?: boolean
    is_active?: boolean
    calls?: boolean | callsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["call_participants"]>

  export type call_participantsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    call_id?: boolean
    user_id?: boolean
    joined_at?: boolean
    left_at?: boolean
    is_active?: boolean
    calls?: boolean | callsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["call_participants"]>

  export type call_participantsSelectScalar = {
    id?: boolean
    call_id?: boolean
    user_id?: boolean
    joined_at?: boolean
    left_at?: boolean
    is_active?: boolean
  }

  export type call_participantsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "call_id" | "user_id" | "joined_at" | "left_at" | "is_active", ExtArgs["result"]["call_participants"]>
  export type call_participantsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | callsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type call_participantsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | callsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type call_participantsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | callsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $call_participantsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "call_participants"
    objects: {
      calls: Prisma.$callsPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      call_id: number
      user_id: number
      joined_at: Date | null
      left_at: Date | null
      is_active: boolean | null
    }, ExtArgs["result"]["call_participants"]>
    composites: {}
  }

  type call_participantsGetPayload<S extends boolean | null | undefined | call_participantsDefaultArgs> = $Result.GetResult<Prisma.$call_participantsPayload, S>

  type call_participantsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<call_participantsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Call_participantsCountAggregateInputType | true
    }

  export interface call_participantsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['call_participants'], meta: { name: 'call_participants' } }
    /**
     * Find zero or one Call_participants that matches the filter.
     * @param {call_participantsFindUniqueArgs} args - Arguments to find a Call_participants
     * @example
     * // Get one Call_participants
     * const call_participants = await prisma.call_participants.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends call_participantsFindUniqueArgs>(args: SelectSubset<T, call_participantsFindUniqueArgs<ExtArgs>>): Prisma__call_participantsClient<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Call_participants that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {call_participantsFindUniqueOrThrowArgs} args - Arguments to find a Call_participants
     * @example
     * // Get one Call_participants
     * const call_participants = await prisma.call_participants.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends call_participantsFindUniqueOrThrowArgs>(args: SelectSubset<T, call_participantsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__call_participantsClient<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Call_participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_participantsFindFirstArgs} args - Arguments to find a Call_participants
     * @example
     * // Get one Call_participants
     * const call_participants = await prisma.call_participants.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends call_participantsFindFirstArgs>(args?: SelectSubset<T, call_participantsFindFirstArgs<ExtArgs>>): Prisma__call_participantsClient<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Call_participants that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_participantsFindFirstOrThrowArgs} args - Arguments to find a Call_participants
     * @example
     * // Get one Call_participants
     * const call_participants = await prisma.call_participants.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends call_participantsFindFirstOrThrowArgs>(args?: SelectSubset<T, call_participantsFindFirstOrThrowArgs<ExtArgs>>): Prisma__call_participantsClient<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Call_participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_participantsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Call_participants
     * const call_participants = await prisma.call_participants.findMany()
     * 
     * // Get first 10 Call_participants
     * const call_participants = await prisma.call_participants.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const call_participantsWithIdOnly = await prisma.call_participants.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends call_participantsFindManyArgs>(args?: SelectSubset<T, call_participantsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Call_participants.
     * @param {call_participantsCreateArgs} args - Arguments to create a Call_participants.
     * @example
     * // Create one Call_participants
     * const Call_participants = await prisma.call_participants.create({
     *   data: {
     *     // ... data to create a Call_participants
     *   }
     * })
     * 
     */
    create<T extends call_participantsCreateArgs>(args: SelectSubset<T, call_participantsCreateArgs<ExtArgs>>): Prisma__call_participantsClient<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Call_participants.
     * @param {call_participantsCreateManyArgs} args - Arguments to create many Call_participants.
     * @example
     * // Create many Call_participants
     * const call_participants = await prisma.call_participants.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends call_participantsCreateManyArgs>(args?: SelectSubset<T, call_participantsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Call_participants and returns the data saved in the database.
     * @param {call_participantsCreateManyAndReturnArgs} args - Arguments to create many Call_participants.
     * @example
     * // Create many Call_participants
     * const call_participants = await prisma.call_participants.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Call_participants and only return the `id`
     * const call_participantsWithIdOnly = await prisma.call_participants.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends call_participantsCreateManyAndReturnArgs>(args?: SelectSubset<T, call_participantsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Call_participants.
     * @param {call_participantsDeleteArgs} args - Arguments to delete one Call_participants.
     * @example
     * // Delete one Call_participants
     * const Call_participants = await prisma.call_participants.delete({
     *   where: {
     *     // ... filter to delete one Call_participants
     *   }
     * })
     * 
     */
    delete<T extends call_participantsDeleteArgs>(args: SelectSubset<T, call_participantsDeleteArgs<ExtArgs>>): Prisma__call_participantsClient<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Call_participants.
     * @param {call_participantsUpdateArgs} args - Arguments to update one Call_participants.
     * @example
     * // Update one Call_participants
     * const call_participants = await prisma.call_participants.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends call_participantsUpdateArgs>(args: SelectSubset<T, call_participantsUpdateArgs<ExtArgs>>): Prisma__call_participantsClient<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Call_participants.
     * @param {call_participantsDeleteManyArgs} args - Arguments to filter Call_participants to delete.
     * @example
     * // Delete a few Call_participants
     * const { count } = await prisma.call_participants.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends call_participantsDeleteManyArgs>(args?: SelectSubset<T, call_participantsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Call_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_participantsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Call_participants
     * const call_participants = await prisma.call_participants.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends call_participantsUpdateManyArgs>(args: SelectSubset<T, call_participantsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Call_participants and returns the data updated in the database.
     * @param {call_participantsUpdateManyAndReturnArgs} args - Arguments to update many Call_participants.
     * @example
     * // Update many Call_participants
     * const call_participants = await prisma.call_participants.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Call_participants and only return the `id`
     * const call_participantsWithIdOnly = await prisma.call_participants.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends call_participantsUpdateManyAndReturnArgs>(args: SelectSubset<T, call_participantsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Call_participants.
     * @param {call_participantsUpsertArgs} args - Arguments to update or create a Call_participants.
     * @example
     * // Update or create a Call_participants
     * const call_participants = await prisma.call_participants.upsert({
     *   create: {
     *     // ... data to create a Call_participants
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Call_participants we want to update
     *   }
     * })
     */
    upsert<T extends call_participantsUpsertArgs>(args: SelectSubset<T, call_participantsUpsertArgs<ExtArgs>>): Prisma__call_participantsClient<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Call_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_participantsCountArgs} args - Arguments to filter Call_participants to count.
     * @example
     * // Count the number of Call_participants
     * const count = await prisma.call_participants.count({
     *   where: {
     *     // ... the filter for the Call_participants we want to count
     *   }
     * })
    **/
    count<T extends call_participantsCountArgs>(
      args?: Subset<T, call_participantsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Call_participantsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Call_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Call_participantsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Call_participantsAggregateArgs>(args: Subset<T, Call_participantsAggregateArgs>): Prisma.PrismaPromise<GetCall_participantsAggregateType<T>>

    /**
     * Group by Call_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {call_participantsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends call_participantsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: call_participantsGroupByArgs['orderBy'] }
        : { orderBy?: call_participantsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, call_participantsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCall_participantsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the call_participants model
   */
  readonly fields: call_participantsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for call_participants.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__call_participantsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    calls<T extends callsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, callsDefaultArgs<ExtArgs>>): Prisma__callsClient<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the call_participants model
   */
  interface call_participantsFieldRefs {
    readonly id: FieldRef<"call_participants", 'Int'>
    readonly call_id: FieldRef<"call_participants", 'Int'>
    readonly user_id: FieldRef<"call_participants", 'Int'>
    readonly joined_at: FieldRef<"call_participants", 'DateTime'>
    readonly left_at: FieldRef<"call_participants", 'DateTime'>
    readonly is_active: FieldRef<"call_participants", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * call_participants findUnique
   */
  export type call_participantsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsInclude<ExtArgs> | null
    /**
     * Filter, which call_participants to fetch.
     */
    where: call_participantsWhereUniqueInput
  }

  /**
   * call_participants findUniqueOrThrow
   */
  export type call_participantsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsInclude<ExtArgs> | null
    /**
     * Filter, which call_participants to fetch.
     */
    where: call_participantsWhereUniqueInput
  }

  /**
   * call_participants findFirst
   */
  export type call_participantsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsInclude<ExtArgs> | null
    /**
     * Filter, which call_participants to fetch.
     */
    where?: call_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of call_participants to fetch.
     */
    orderBy?: call_participantsOrderByWithRelationInput | call_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for call_participants.
     */
    cursor?: call_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` call_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` call_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of call_participants.
     */
    distinct?: Call_participantsScalarFieldEnum | Call_participantsScalarFieldEnum[]
  }

  /**
   * call_participants findFirstOrThrow
   */
  export type call_participantsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsInclude<ExtArgs> | null
    /**
     * Filter, which call_participants to fetch.
     */
    where?: call_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of call_participants to fetch.
     */
    orderBy?: call_participantsOrderByWithRelationInput | call_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for call_participants.
     */
    cursor?: call_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` call_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` call_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of call_participants.
     */
    distinct?: Call_participantsScalarFieldEnum | Call_participantsScalarFieldEnum[]
  }

  /**
   * call_participants findMany
   */
  export type call_participantsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsInclude<ExtArgs> | null
    /**
     * Filter, which call_participants to fetch.
     */
    where?: call_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of call_participants to fetch.
     */
    orderBy?: call_participantsOrderByWithRelationInput | call_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing call_participants.
     */
    cursor?: call_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` call_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` call_participants.
     */
    skip?: number
    distinct?: Call_participantsScalarFieldEnum | Call_participantsScalarFieldEnum[]
  }

  /**
   * call_participants create
   */
  export type call_participantsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsInclude<ExtArgs> | null
    /**
     * The data needed to create a call_participants.
     */
    data: XOR<call_participantsCreateInput, call_participantsUncheckedCreateInput>
  }

  /**
   * call_participants createMany
   */
  export type call_participantsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many call_participants.
     */
    data: call_participantsCreateManyInput | call_participantsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * call_participants createManyAndReturn
   */
  export type call_participantsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * The data used to create many call_participants.
     */
    data: call_participantsCreateManyInput | call_participantsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * call_participants update
   */
  export type call_participantsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsInclude<ExtArgs> | null
    /**
     * The data needed to update a call_participants.
     */
    data: XOR<call_participantsUpdateInput, call_participantsUncheckedUpdateInput>
    /**
     * Choose, which call_participants to update.
     */
    where: call_participantsWhereUniqueInput
  }

  /**
   * call_participants updateMany
   */
  export type call_participantsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update call_participants.
     */
    data: XOR<call_participantsUpdateManyMutationInput, call_participantsUncheckedUpdateManyInput>
    /**
     * Filter which call_participants to update
     */
    where?: call_participantsWhereInput
    /**
     * Limit how many call_participants to update.
     */
    limit?: number
  }

  /**
   * call_participants updateManyAndReturn
   */
  export type call_participantsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * The data used to update call_participants.
     */
    data: XOR<call_participantsUpdateManyMutationInput, call_participantsUncheckedUpdateManyInput>
    /**
     * Filter which call_participants to update
     */
    where?: call_participantsWhereInput
    /**
     * Limit how many call_participants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * call_participants upsert
   */
  export type call_participantsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsInclude<ExtArgs> | null
    /**
     * The filter to search for the call_participants to update in case it exists.
     */
    where: call_participantsWhereUniqueInput
    /**
     * In case the call_participants found by the `where` argument doesn't exist, create a new call_participants with this data.
     */
    create: XOR<call_participantsCreateInput, call_participantsUncheckedCreateInput>
    /**
     * In case the call_participants was found with the provided `where` argument, update it with this data.
     */
    update: XOR<call_participantsUpdateInput, call_participantsUncheckedUpdateInput>
  }

  /**
   * call_participants delete
   */
  export type call_participantsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsInclude<ExtArgs> | null
    /**
     * Filter which call_participants to delete.
     */
    where: call_participantsWhereUniqueInput
  }

  /**
   * call_participants deleteMany
   */
  export type call_participantsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which call_participants to delete
     */
    where?: call_participantsWhereInput
    /**
     * Limit how many call_participants to delete.
     */
    limit?: number
  }

  /**
   * call_participants without action
   */
  export type call_participantsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsInclude<ExtArgs> | null
  }


  /**
   * Model calls
   */

  export type AggregateCalls = {
    _count: CallsCountAggregateOutputType | null
    _avg: CallsAvgAggregateOutputType | null
    _sum: CallsSumAggregateOutputType | null
    _min: CallsMinAggregateOutputType | null
    _max: CallsMaxAggregateOutputType | null
  }

  export type CallsAvgAggregateOutputType = {
    id: number | null
    document_id: number | null
    initiated_by: number | null
  }

  export type CallsSumAggregateOutputType = {
    id: number | null
    document_id: number | null
    initiated_by: number | null
  }

  export type CallsMinAggregateOutputType = {
    id: number | null
    document_id: number | null
    initiated_by: number | null
    started_at: Date | null
    ended_at: Date | null
    call_type: string | null
    status: string | null
  }

  export type CallsMaxAggregateOutputType = {
    id: number | null
    document_id: number | null
    initiated_by: number | null
    started_at: Date | null
    ended_at: Date | null
    call_type: string | null
    status: string | null
  }

  export type CallsCountAggregateOutputType = {
    id: number
    document_id: number
    initiated_by: number
    started_at: number
    ended_at: number
    call_type: number
    status: number
    _all: number
  }


  export type CallsAvgAggregateInputType = {
    id?: true
    document_id?: true
    initiated_by?: true
  }

  export type CallsSumAggregateInputType = {
    id?: true
    document_id?: true
    initiated_by?: true
  }

  export type CallsMinAggregateInputType = {
    id?: true
    document_id?: true
    initiated_by?: true
    started_at?: true
    ended_at?: true
    call_type?: true
    status?: true
  }

  export type CallsMaxAggregateInputType = {
    id?: true
    document_id?: true
    initiated_by?: true
    started_at?: true
    ended_at?: true
    call_type?: true
    status?: true
  }

  export type CallsCountAggregateInputType = {
    id?: true
    document_id?: true
    initiated_by?: true
    started_at?: true
    ended_at?: true
    call_type?: true
    status?: true
    _all?: true
  }

  export type CallsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which calls to aggregate.
     */
    where?: callsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of calls to fetch.
     */
    orderBy?: callsOrderByWithRelationInput | callsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: callsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` calls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned calls
    **/
    _count?: true | CallsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CallsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CallsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallsMaxAggregateInputType
  }

  export type GetCallsAggregateType<T extends CallsAggregateArgs> = {
        [P in keyof T & keyof AggregateCalls]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCalls[P]>
      : GetScalarType<T[P], AggregateCalls[P]>
  }




  export type callsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: callsWhereInput
    orderBy?: callsOrderByWithAggregationInput | callsOrderByWithAggregationInput[]
    by: CallsScalarFieldEnum[] | CallsScalarFieldEnum
    having?: callsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallsCountAggregateInputType | true
    _avg?: CallsAvgAggregateInputType
    _sum?: CallsSumAggregateInputType
    _min?: CallsMinAggregateInputType
    _max?: CallsMaxAggregateInputType
  }

  export type CallsGroupByOutputType = {
    id: number
    document_id: number
    initiated_by: number
    started_at: Date | null
    ended_at: Date | null
    call_type: string
    status: string | null
    _count: CallsCountAggregateOutputType | null
    _avg: CallsAvgAggregateOutputType | null
    _sum: CallsSumAggregateOutputType | null
    _min: CallsMinAggregateOutputType | null
    _max: CallsMaxAggregateOutputType | null
  }

  type GetCallsGroupByPayload<T extends callsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallsGroupByOutputType[P]>
            : GetScalarType<T[P], CallsGroupByOutputType[P]>
        }
      >
    >


  export type callsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    initiated_by?: boolean
    started_at?: boolean
    ended_at?: boolean
    call_type?: boolean
    status?: boolean
    call_participants?: boolean | calls$call_participantsArgs<ExtArgs>
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | CallsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calls"]>

  export type callsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    initiated_by?: boolean
    started_at?: boolean
    ended_at?: boolean
    call_type?: boolean
    status?: boolean
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calls"]>

  export type callsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    initiated_by?: boolean
    started_at?: boolean
    ended_at?: boolean
    call_type?: boolean
    status?: boolean
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calls"]>

  export type callsSelectScalar = {
    id?: boolean
    document_id?: boolean
    initiated_by?: boolean
    started_at?: boolean
    ended_at?: boolean
    call_type?: boolean
    status?: boolean
  }

  export type callsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "document_id" | "initiated_by" | "started_at" | "ended_at" | "call_type" | "status", ExtArgs["result"]["calls"]>
  export type callsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call_participants?: boolean | calls$call_participantsArgs<ExtArgs>
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | CallsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type callsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type callsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $callsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "calls"
    objects: {
      call_participants: Prisma.$call_participantsPayload<ExtArgs>[]
      documents: Prisma.$documentsPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      document_id: number
      initiated_by: number
      started_at: Date | null
      ended_at: Date | null
      call_type: string
      status: string | null
    }, ExtArgs["result"]["calls"]>
    composites: {}
  }

  type callsGetPayload<S extends boolean | null | undefined | callsDefaultArgs> = $Result.GetResult<Prisma.$callsPayload, S>

  type callsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<callsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CallsCountAggregateInputType | true
    }

  export interface callsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['calls'], meta: { name: 'calls' } }
    /**
     * Find zero or one Calls that matches the filter.
     * @param {callsFindUniqueArgs} args - Arguments to find a Calls
     * @example
     * // Get one Calls
     * const calls = await prisma.calls.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends callsFindUniqueArgs>(args: SelectSubset<T, callsFindUniqueArgs<ExtArgs>>): Prisma__callsClient<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Calls that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {callsFindUniqueOrThrowArgs} args - Arguments to find a Calls
     * @example
     * // Get one Calls
     * const calls = await prisma.calls.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends callsFindUniqueOrThrowArgs>(args: SelectSubset<T, callsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__callsClient<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Calls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {callsFindFirstArgs} args - Arguments to find a Calls
     * @example
     * // Get one Calls
     * const calls = await prisma.calls.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends callsFindFirstArgs>(args?: SelectSubset<T, callsFindFirstArgs<ExtArgs>>): Prisma__callsClient<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Calls that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {callsFindFirstOrThrowArgs} args - Arguments to find a Calls
     * @example
     * // Get one Calls
     * const calls = await prisma.calls.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends callsFindFirstOrThrowArgs>(args?: SelectSubset<T, callsFindFirstOrThrowArgs<ExtArgs>>): Prisma__callsClient<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Calls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {callsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Calls
     * const calls = await prisma.calls.findMany()
     * 
     * // Get first 10 Calls
     * const calls = await prisma.calls.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const callsWithIdOnly = await prisma.calls.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends callsFindManyArgs>(args?: SelectSubset<T, callsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Calls.
     * @param {callsCreateArgs} args - Arguments to create a Calls.
     * @example
     * // Create one Calls
     * const Calls = await prisma.calls.create({
     *   data: {
     *     // ... data to create a Calls
     *   }
     * })
     * 
     */
    create<T extends callsCreateArgs>(args: SelectSubset<T, callsCreateArgs<ExtArgs>>): Prisma__callsClient<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Calls.
     * @param {callsCreateManyArgs} args - Arguments to create many Calls.
     * @example
     * // Create many Calls
     * const calls = await prisma.calls.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends callsCreateManyArgs>(args?: SelectSubset<T, callsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Calls and returns the data saved in the database.
     * @param {callsCreateManyAndReturnArgs} args - Arguments to create many Calls.
     * @example
     * // Create many Calls
     * const calls = await prisma.calls.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Calls and only return the `id`
     * const callsWithIdOnly = await prisma.calls.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends callsCreateManyAndReturnArgs>(args?: SelectSubset<T, callsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Calls.
     * @param {callsDeleteArgs} args - Arguments to delete one Calls.
     * @example
     * // Delete one Calls
     * const Calls = await prisma.calls.delete({
     *   where: {
     *     // ... filter to delete one Calls
     *   }
     * })
     * 
     */
    delete<T extends callsDeleteArgs>(args: SelectSubset<T, callsDeleteArgs<ExtArgs>>): Prisma__callsClient<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Calls.
     * @param {callsUpdateArgs} args - Arguments to update one Calls.
     * @example
     * // Update one Calls
     * const calls = await prisma.calls.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends callsUpdateArgs>(args: SelectSubset<T, callsUpdateArgs<ExtArgs>>): Prisma__callsClient<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Calls.
     * @param {callsDeleteManyArgs} args - Arguments to filter Calls to delete.
     * @example
     * // Delete a few Calls
     * const { count } = await prisma.calls.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends callsDeleteManyArgs>(args?: SelectSubset<T, callsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {callsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Calls
     * const calls = await prisma.calls.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends callsUpdateManyArgs>(args: SelectSubset<T, callsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Calls and returns the data updated in the database.
     * @param {callsUpdateManyAndReturnArgs} args - Arguments to update many Calls.
     * @example
     * // Update many Calls
     * const calls = await prisma.calls.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Calls and only return the `id`
     * const callsWithIdOnly = await prisma.calls.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends callsUpdateManyAndReturnArgs>(args: SelectSubset<T, callsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Calls.
     * @param {callsUpsertArgs} args - Arguments to update or create a Calls.
     * @example
     * // Update or create a Calls
     * const calls = await prisma.calls.upsert({
     *   create: {
     *     // ... data to create a Calls
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Calls we want to update
     *   }
     * })
     */
    upsert<T extends callsUpsertArgs>(args: SelectSubset<T, callsUpsertArgs<ExtArgs>>): Prisma__callsClient<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {callsCountArgs} args - Arguments to filter Calls to count.
     * @example
     * // Count the number of Calls
     * const count = await prisma.calls.count({
     *   where: {
     *     // ... the filter for the Calls we want to count
     *   }
     * })
    **/
    count<T extends callsCountArgs>(
      args?: Subset<T, callsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CallsAggregateArgs>(args: Subset<T, CallsAggregateArgs>): Prisma.PrismaPromise<GetCallsAggregateType<T>>

    /**
     * Group by Calls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {callsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends callsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: callsGroupByArgs['orderBy'] }
        : { orderBy?: callsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, callsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the calls model
   */
  readonly fields: callsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for calls.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__callsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    call_participants<T extends calls$call_participantsArgs<ExtArgs> = {}>(args?: Subset<T, calls$call_participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends documentsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, documentsDefaultArgs<ExtArgs>>): Prisma__documentsClient<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the calls model
   */
  interface callsFieldRefs {
    readonly id: FieldRef<"calls", 'Int'>
    readonly document_id: FieldRef<"calls", 'Int'>
    readonly initiated_by: FieldRef<"calls", 'Int'>
    readonly started_at: FieldRef<"calls", 'DateTime'>
    readonly ended_at: FieldRef<"calls", 'DateTime'>
    readonly call_type: FieldRef<"calls", 'String'>
    readonly status: FieldRef<"calls", 'String'>
  }
    

  // Custom InputTypes
  /**
   * calls findUnique
   */
  export type callsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsInclude<ExtArgs> | null
    /**
     * Filter, which calls to fetch.
     */
    where: callsWhereUniqueInput
  }

  /**
   * calls findUniqueOrThrow
   */
  export type callsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsInclude<ExtArgs> | null
    /**
     * Filter, which calls to fetch.
     */
    where: callsWhereUniqueInput
  }

  /**
   * calls findFirst
   */
  export type callsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsInclude<ExtArgs> | null
    /**
     * Filter, which calls to fetch.
     */
    where?: callsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of calls to fetch.
     */
    orderBy?: callsOrderByWithRelationInput | callsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for calls.
     */
    cursor?: callsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` calls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of calls.
     */
    distinct?: CallsScalarFieldEnum | CallsScalarFieldEnum[]
  }

  /**
   * calls findFirstOrThrow
   */
  export type callsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsInclude<ExtArgs> | null
    /**
     * Filter, which calls to fetch.
     */
    where?: callsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of calls to fetch.
     */
    orderBy?: callsOrderByWithRelationInput | callsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for calls.
     */
    cursor?: callsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` calls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of calls.
     */
    distinct?: CallsScalarFieldEnum | CallsScalarFieldEnum[]
  }

  /**
   * calls findMany
   */
  export type callsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsInclude<ExtArgs> | null
    /**
     * Filter, which calls to fetch.
     */
    where?: callsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of calls to fetch.
     */
    orderBy?: callsOrderByWithRelationInput | callsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing calls.
     */
    cursor?: callsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` calls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` calls.
     */
    skip?: number
    distinct?: CallsScalarFieldEnum | CallsScalarFieldEnum[]
  }

  /**
   * calls create
   */
  export type callsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsInclude<ExtArgs> | null
    /**
     * The data needed to create a calls.
     */
    data: XOR<callsCreateInput, callsUncheckedCreateInput>
  }

  /**
   * calls createMany
   */
  export type callsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many calls.
     */
    data: callsCreateManyInput | callsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * calls createManyAndReturn
   */
  export type callsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * The data used to create many calls.
     */
    data: callsCreateManyInput | callsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * calls update
   */
  export type callsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsInclude<ExtArgs> | null
    /**
     * The data needed to update a calls.
     */
    data: XOR<callsUpdateInput, callsUncheckedUpdateInput>
    /**
     * Choose, which calls to update.
     */
    where: callsWhereUniqueInput
  }

  /**
   * calls updateMany
   */
  export type callsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update calls.
     */
    data: XOR<callsUpdateManyMutationInput, callsUncheckedUpdateManyInput>
    /**
     * Filter which calls to update
     */
    where?: callsWhereInput
    /**
     * Limit how many calls to update.
     */
    limit?: number
  }

  /**
   * calls updateManyAndReturn
   */
  export type callsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * The data used to update calls.
     */
    data: XOR<callsUpdateManyMutationInput, callsUncheckedUpdateManyInput>
    /**
     * Filter which calls to update
     */
    where?: callsWhereInput
    /**
     * Limit how many calls to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * calls upsert
   */
  export type callsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsInclude<ExtArgs> | null
    /**
     * The filter to search for the calls to update in case it exists.
     */
    where: callsWhereUniqueInput
    /**
     * In case the calls found by the `where` argument doesn't exist, create a new calls with this data.
     */
    create: XOR<callsCreateInput, callsUncheckedCreateInput>
    /**
     * In case the calls was found with the provided `where` argument, update it with this data.
     */
    update: XOR<callsUpdateInput, callsUncheckedUpdateInput>
  }

  /**
   * calls delete
   */
  export type callsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsInclude<ExtArgs> | null
    /**
     * Filter which calls to delete.
     */
    where: callsWhereUniqueInput
  }

  /**
   * calls deleteMany
   */
  export type callsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which calls to delete
     */
    where?: callsWhereInput
    /**
     * Limit how many calls to delete.
     */
    limit?: number
  }

  /**
   * calls.call_participants
   */
  export type calls$call_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsInclude<ExtArgs> | null
    where?: call_participantsWhereInput
    orderBy?: call_participantsOrderByWithRelationInput | call_participantsOrderByWithRelationInput[]
    cursor?: call_participantsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Call_participantsScalarFieldEnum | Call_participantsScalarFieldEnum[]
  }

  /**
   * calls without action
   */
  export type callsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsInclude<ExtArgs> | null
  }


  /**
   * Model document_versions
   */

  export type AggregateDocument_versions = {
    _count: Document_versionsCountAggregateOutputType | null
    _avg: Document_versionsAvgAggregateOutputType | null
    _sum: Document_versionsSumAggregateOutputType | null
    _min: Document_versionsMinAggregateOutputType | null
    _max: Document_versionsMaxAggregateOutputType | null
  }

  export type Document_versionsAvgAggregateOutputType = {
    id: number | null
    document_id: number | null
    version_number: number | null
    file_size: number | null
    modified_by: number | null
  }

  export type Document_versionsSumAggregateOutputType = {
    id: number | null
    document_id: number | null
    version_number: number | null
    file_size: bigint | null
    modified_by: number | null
  }

  export type Document_versionsMinAggregateOutputType = {
    id: number | null
    document_id: number | null
    version_number: number | null
    title: string | null
    content: string | null
    file_path: string | null
    file_size: bigint | null
    file_type: string | null
    modified_by: number | null
    modification_date: Date | null
    change_summary: string | null
    is_major_version: boolean | null
  }

  export type Document_versionsMaxAggregateOutputType = {
    id: number | null
    document_id: number | null
    version_number: number | null
    title: string | null
    content: string | null
    file_path: string | null
    file_size: bigint | null
    file_type: string | null
    modified_by: number | null
    modification_date: Date | null
    change_summary: string | null
    is_major_version: boolean | null
  }

  export type Document_versionsCountAggregateOutputType = {
    id: number
    document_id: number
    version_number: number
    title: number
    content: number
    file_path: number
    file_size: number
    file_type: number
    modified_by: number
    modification_date: number
    change_summary: number
    is_major_version: number
    _all: number
  }


  export type Document_versionsAvgAggregateInputType = {
    id?: true
    document_id?: true
    version_number?: true
    file_size?: true
    modified_by?: true
  }

  export type Document_versionsSumAggregateInputType = {
    id?: true
    document_id?: true
    version_number?: true
    file_size?: true
    modified_by?: true
  }

  export type Document_versionsMinAggregateInputType = {
    id?: true
    document_id?: true
    version_number?: true
    title?: true
    content?: true
    file_path?: true
    file_size?: true
    file_type?: true
    modified_by?: true
    modification_date?: true
    change_summary?: true
    is_major_version?: true
  }

  export type Document_versionsMaxAggregateInputType = {
    id?: true
    document_id?: true
    version_number?: true
    title?: true
    content?: true
    file_path?: true
    file_size?: true
    file_type?: true
    modified_by?: true
    modification_date?: true
    change_summary?: true
    is_major_version?: true
  }

  export type Document_versionsCountAggregateInputType = {
    id?: true
    document_id?: true
    version_number?: true
    title?: true
    content?: true
    file_path?: true
    file_size?: true
    file_type?: true
    modified_by?: true
    modification_date?: true
    change_summary?: true
    is_major_version?: true
    _all?: true
  }

  export type Document_versionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which document_versions to aggregate.
     */
    where?: document_versionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_versions to fetch.
     */
    orderBy?: document_versionsOrderByWithRelationInput | document_versionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: document_versionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned document_versions
    **/
    _count?: true | Document_versionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Document_versionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Document_versionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Document_versionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Document_versionsMaxAggregateInputType
  }

  export type GetDocument_versionsAggregateType<T extends Document_versionsAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument_versions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument_versions[P]>
      : GetScalarType<T[P], AggregateDocument_versions[P]>
  }




  export type document_versionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_versionsWhereInput
    orderBy?: document_versionsOrderByWithAggregationInput | document_versionsOrderByWithAggregationInput[]
    by: Document_versionsScalarFieldEnum[] | Document_versionsScalarFieldEnum
    having?: document_versionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Document_versionsCountAggregateInputType | true
    _avg?: Document_versionsAvgAggregateInputType
    _sum?: Document_versionsSumAggregateInputType
    _min?: Document_versionsMinAggregateInputType
    _max?: Document_versionsMaxAggregateInputType
  }

  export type Document_versionsGroupByOutputType = {
    id: number
    document_id: number
    version_number: number
    title: string | null
    content: string | null
    file_path: string | null
    file_size: bigint | null
    file_type: string | null
    modified_by: number
    modification_date: Date
    change_summary: string | null
    is_major_version: boolean
    _count: Document_versionsCountAggregateOutputType | null
    _avg: Document_versionsAvgAggregateOutputType | null
    _sum: Document_versionsSumAggregateOutputType | null
    _min: Document_versionsMinAggregateOutputType | null
    _max: Document_versionsMaxAggregateOutputType | null
  }

  type GetDocument_versionsGroupByPayload<T extends document_versionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Document_versionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Document_versionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Document_versionsGroupByOutputType[P]>
            : GetScalarType<T[P], Document_versionsGroupByOutputType[P]>
        }
      >
    >


  export type document_versionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    version_number?: boolean
    title?: boolean
    content?: boolean
    file_path?: boolean
    file_size?: boolean
    file_type?: boolean
    modified_by?: boolean
    modification_date?: boolean
    change_summary?: boolean
    is_major_version?: boolean
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_versions"]>

  export type document_versionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    version_number?: boolean
    title?: boolean
    content?: boolean
    file_path?: boolean
    file_size?: boolean
    file_type?: boolean
    modified_by?: boolean
    modification_date?: boolean
    change_summary?: boolean
    is_major_version?: boolean
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_versions"]>

  export type document_versionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    version_number?: boolean
    title?: boolean
    content?: boolean
    file_path?: boolean
    file_size?: boolean
    file_type?: boolean
    modified_by?: boolean
    modification_date?: boolean
    change_summary?: boolean
    is_major_version?: boolean
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_versions"]>

  export type document_versionsSelectScalar = {
    id?: boolean
    document_id?: boolean
    version_number?: boolean
    title?: boolean
    content?: boolean
    file_path?: boolean
    file_size?: boolean
    file_type?: boolean
    modified_by?: boolean
    modification_date?: boolean
    change_summary?: boolean
    is_major_version?: boolean
  }

  export type document_versionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "document_id" | "version_number" | "title" | "content" | "file_path" | "file_size" | "file_type" | "modified_by" | "modification_date" | "change_summary" | "is_major_version", ExtArgs["result"]["document_versions"]>
  export type document_versionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type document_versionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type document_versionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $document_versionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "document_versions"
    objects: {
      documents: Prisma.$documentsPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      document_id: number
      version_number: number
      title: string | null
      content: string | null
      file_path: string | null
      file_size: bigint | null
      file_type: string | null
      modified_by: number
      modification_date: Date
      change_summary: string | null
      is_major_version: boolean
    }, ExtArgs["result"]["document_versions"]>
    composites: {}
  }

  type document_versionsGetPayload<S extends boolean | null | undefined | document_versionsDefaultArgs> = $Result.GetResult<Prisma.$document_versionsPayload, S>

  type document_versionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<document_versionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Document_versionsCountAggregateInputType | true
    }

  export interface document_versionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['document_versions'], meta: { name: 'document_versions' } }
    /**
     * Find zero or one Document_versions that matches the filter.
     * @param {document_versionsFindUniqueArgs} args - Arguments to find a Document_versions
     * @example
     * // Get one Document_versions
     * const document_versions = await prisma.document_versions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends document_versionsFindUniqueArgs>(args: SelectSubset<T, document_versionsFindUniqueArgs<ExtArgs>>): Prisma__document_versionsClient<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document_versions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {document_versionsFindUniqueOrThrowArgs} args - Arguments to find a Document_versions
     * @example
     * // Get one Document_versions
     * const document_versions = await prisma.document_versions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends document_versionsFindUniqueOrThrowArgs>(args: SelectSubset<T, document_versionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__document_versionsClient<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document_versions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_versionsFindFirstArgs} args - Arguments to find a Document_versions
     * @example
     * // Get one Document_versions
     * const document_versions = await prisma.document_versions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends document_versionsFindFirstArgs>(args?: SelectSubset<T, document_versionsFindFirstArgs<ExtArgs>>): Prisma__document_versionsClient<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document_versions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_versionsFindFirstOrThrowArgs} args - Arguments to find a Document_versions
     * @example
     * // Get one Document_versions
     * const document_versions = await prisma.document_versions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends document_versionsFindFirstOrThrowArgs>(args?: SelectSubset<T, document_versionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__document_versionsClient<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Document_versions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_versionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Document_versions
     * const document_versions = await prisma.document_versions.findMany()
     * 
     * // Get first 10 Document_versions
     * const document_versions = await prisma.document_versions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const document_versionsWithIdOnly = await prisma.document_versions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends document_versionsFindManyArgs>(args?: SelectSubset<T, document_versionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document_versions.
     * @param {document_versionsCreateArgs} args - Arguments to create a Document_versions.
     * @example
     * // Create one Document_versions
     * const Document_versions = await prisma.document_versions.create({
     *   data: {
     *     // ... data to create a Document_versions
     *   }
     * })
     * 
     */
    create<T extends document_versionsCreateArgs>(args: SelectSubset<T, document_versionsCreateArgs<ExtArgs>>): Prisma__document_versionsClient<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Document_versions.
     * @param {document_versionsCreateManyArgs} args - Arguments to create many Document_versions.
     * @example
     * // Create many Document_versions
     * const document_versions = await prisma.document_versions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends document_versionsCreateManyArgs>(args?: SelectSubset<T, document_versionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Document_versions and returns the data saved in the database.
     * @param {document_versionsCreateManyAndReturnArgs} args - Arguments to create many Document_versions.
     * @example
     * // Create many Document_versions
     * const document_versions = await prisma.document_versions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Document_versions and only return the `id`
     * const document_versionsWithIdOnly = await prisma.document_versions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends document_versionsCreateManyAndReturnArgs>(args?: SelectSubset<T, document_versionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document_versions.
     * @param {document_versionsDeleteArgs} args - Arguments to delete one Document_versions.
     * @example
     * // Delete one Document_versions
     * const Document_versions = await prisma.document_versions.delete({
     *   where: {
     *     // ... filter to delete one Document_versions
     *   }
     * })
     * 
     */
    delete<T extends document_versionsDeleteArgs>(args: SelectSubset<T, document_versionsDeleteArgs<ExtArgs>>): Prisma__document_versionsClient<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document_versions.
     * @param {document_versionsUpdateArgs} args - Arguments to update one Document_versions.
     * @example
     * // Update one Document_versions
     * const document_versions = await prisma.document_versions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends document_versionsUpdateArgs>(args: SelectSubset<T, document_versionsUpdateArgs<ExtArgs>>): Prisma__document_versionsClient<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Document_versions.
     * @param {document_versionsDeleteManyArgs} args - Arguments to filter Document_versions to delete.
     * @example
     * // Delete a few Document_versions
     * const { count } = await prisma.document_versions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends document_versionsDeleteManyArgs>(args?: SelectSubset<T, document_versionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Document_versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_versionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Document_versions
     * const document_versions = await prisma.document_versions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends document_versionsUpdateManyArgs>(args: SelectSubset<T, document_versionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Document_versions and returns the data updated in the database.
     * @param {document_versionsUpdateManyAndReturnArgs} args - Arguments to update many Document_versions.
     * @example
     * // Update many Document_versions
     * const document_versions = await prisma.document_versions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Document_versions and only return the `id`
     * const document_versionsWithIdOnly = await prisma.document_versions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends document_versionsUpdateManyAndReturnArgs>(args: SelectSubset<T, document_versionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document_versions.
     * @param {document_versionsUpsertArgs} args - Arguments to update or create a Document_versions.
     * @example
     * // Update or create a Document_versions
     * const document_versions = await prisma.document_versions.upsert({
     *   create: {
     *     // ... data to create a Document_versions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document_versions we want to update
     *   }
     * })
     */
    upsert<T extends document_versionsUpsertArgs>(args: SelectSubset<T, document_versionsUpsertArgs<ExtArgs>>): Prisma__document_versionsClient<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Document_versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_versionsCountArgs} args - Arguments to filter Document_versions to count.
     * @example
     * // Count the number of Document_versions
     * const count = await prisma.document_versions.count({
     *   where: {
     *     // ... the filter for the Document_versions we want to count
     *   }
     * })
    **/
    count<T extends document_versionsCountArgs>(
      args?: Subset<T, document_versionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Document_versionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document_versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Document_versionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Document_versionsAggregateArgs>(args: Subset<T, Document_versionsAggregateArgs>): Prisma.PrismaPromise<GetDocument_versionsAggregateType<T>>

    /**
     * Group by Document_versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_versionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends document_versionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: document_versionsGroupByArgs['orderBy'] }
        : { orderBy?: document_versionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, document_versionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocument_versionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the document_versions model
   */
  readonly fields: document_versionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for document_versions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__document_versionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documents<T extends documentsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, documentsDefaultArgs<ExtArgs>>): Prisma__documentsClient<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the document_versions model
   */
  interface document_versionsFieldRefs {
    readonly id: FieldRef<"document_versions", 'Int'>
    readonly document_id: FieldRef<"document_versions", 'Int'>
    readonly version_number: FieldRef<"document_versions", 'Int'>
    readonly title: FieldRef<"document_versions", 'String'>
    readonly content: FieldRef<"document_versions", 'String'>
    readonly file_path: FieldRef<"document_versions", 'String'>
    readonly file_size: FieldRef<"document_versions", 'BigInt'>
    readonly file_type: FieldRef<"document_versions", 'String'>
    readonly modified_by: FieldRef<"document_versions", 'Int'>
    readonly modification_date: FieldRef<"document_versions", 'DateTime'>
    readonly change_summary: FieldRef<"document_versions", 'String'>
    readonly is_major_version: FieldRef<"document_versions", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * document_versions findUnique
   */
  export type document_versionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsInclude<ExtArgs> | null
    /**
     * Filter, which document_versions to fetch.
     */
    where: document_versionsWhereUniqueInput
  }

  /**
   * document_versions findUniqueOrThrow
   */
  export type document_versionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsInclude<ExtArgs> | null
    /**
     * Filter, which document_versions to fetch.
     */
    where: document_versionsWhereUniqueInput
  }

  /**
   * document_versions findFirst
   */
  export type document_versionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsInclude<ExtArgs> | null
    /**
     * Filter, which document_versions to fetch.
     */
    where?: document_versionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_versions to fetch.
     */
    orderBy?: document_versionsOrderByWithRelationInput | document_versionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for document_versions.
     */
    cursor?: document_versionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of document_versions.
     */
    distinct?: Document_versionsScalarFieldEnum | Document_versionsScalarFieldEnum[]
  }

  /**
   * document_versions findFirstOrThrow
   */
  export type document_versionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsInclude<ExtArgs> | null
    /**
     * Filter, which document_versions to fetch.
     */
    where?: document_versionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_versions to fetch.
     */
    orderBy?: document_versionsOrderByWithRelationInput | document_versionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for document_versions.
     */
    cursor?: document_versionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of document_versions.
     */
    distinct?: Document_versionsScalarFieldEnum | Document_versionsScalarFieldEnum[]
  }

  /**
   * document_versions findMany
   */
  export type document_versionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsInclude<ExtArgs> | null
    /**
     * Filter, which document_versions to fetch.
     */
    where?: document_versionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_versions to fetch.
     */
    orderBy?: document_versionsOrderByWithRelationInput | document_versionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing document_versions.
     */
    cursor?: document_versionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_versions.
     */
    skip?: number
    distinct?: Document_versionsScalarFieldEnum | Document_versionsScalarFieldEnum[]
  }

  /**
   * document_versions create
   */
  export type document_versionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsInclude<ExtArgs> | null
    /**
     * The data needed to create a document_versions.
     */
    data: XOR<document_versionsCreateInput, document_versionsUncheckedCreateInput>
  }

  /**
   * document_versions createMany
   */
  export type document_versionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many document_versions.
     */
    data: document_versionsCreateManyInput | document_versionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * document_versions createManyAndReturn
   */
  export type document_versionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * The data used to create many document_versions.
     */
    data: document_versionsCreateManyInput | document_versionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * document_versions update
   */
  export type document_versionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsInclude<ExtArgs> | null
    /**
     * The data needed to update a document_versions.
     */
    data: XOR<document_versionsUpdateInput, document_versionsUncheckedUpdateInput>
    /**
     * Choose, which document_versions to update.
     */
    where: document_versionsWhereUniqueInput
  }

  /**
   * document_versions updateMany
   */
  export type document_versionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update document_versions.
     */
    data: XOR<document_versionsUpdateManyMutationInput, document_versionsUncheckedUpdateManyInput>
    /**
     * Filter which document_versions to update
     */
    where?: document_versionsWhereInput
    /**
     * Limit how many document_versions to update.
     */
    limit?: number
  }

  /**
   * document_versions updateManyAndReturn
   */
  export type document_versionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * The data used to update document_versions.
     */
    data: XOR<document_versionsUpdateManyMutationInput, document_versionsUncheckedUpdateManyInput>
    /**
     * Filter which document_versions to update
     */
    where?: document_versionsWhereInput
    /**
     * Limit how many document_versions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * document_versions upsert
   */
  export type document_versionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsInclude<ExtArgs> | null
    /**
     * The filter to search for the document_versions to update in case it exists.
     */
    where: document_versionsWhereUniqueInput
    /**
     * In case the document_versions found by the `where` argument doesn't exist, create a new document_versions with this data.
     */
    create: XOR<document_versionsCreateInput, document_versionsUncheckedCreateInput>
    /**
     * In case the document_versions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<document_versionsUpdateInput, document_versionsUncheckedUpdateInput>
  }

  /**
   * document_versions delete
   */
  export type document_versionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsInclude<ExtArgs> | null
    /**
     * Filter which document_versions to delete.
     */
    where: document_versionsWhereUniqueInput
  }

  /**
   * document_versions deleteMany
   */
  export type document_versionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which document_versions to delete
     */
    where?: document_versionsWhereInput
    /**
     * Limit how many document_versions to delete.
     */
    limit?: number
  }

  /**
   * document_versions without action
   */
  export type document_versionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsInclude<ExtArgs> | null
  }


  /**
   * Model documents
   */

  export type AggregateDocuments = {
    _count: DocumentsCountAggregateOutputType | null
    _avg: DocumentsAvgAggregateOutputType | null
    _sum: DocumentsSumAggregateOutputType | null
    _min: DocumentsMinAggregateOutputType | null
    _max: DocumentsMaxAggregateOutputType | null
  }

  export type DocumentsAvgAggregateOutputType = {
    id: number | null
    file_size: number | null
    owner_id: number | null
    parent_folder_id: number | null
    last_modified_by: number | null
    auto_save_interval: number | null
  }

  export type DocumentsSumAggregateOutputType = {
    id: number | null
    file_size: bigint | null
    owner_id: number | null
    parent_folder_id: number | null
    last_modified_by: number | null
    auto_save_interval: number | null
  }

  export type DocumentsMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    content: string | null
    file_path: string | null
    file_name: string | null
    file_original_name: string | null
    file_type: string | null
    file_size: bigint | null
    file_extension: string | null
    file_upload_date: Date | null
    owner_id: number | null
    parent_folder_id: number | null
    is_folder: boolean | null
    is_deleted: boolean | null
    is_public: boolean | null
    is_template: boolean | null
    created_at: Date | null
    updated_at: Date | null
    last_modified_by: number | null
    last_accessed_at: Date | null
    auto_save_interval: number | null
    allow_comments: boolean | null
    tags: string | null
  }

  export type DocumentsMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    content: string | null
    file_path: string | null
    file_name: string | null
    file_original_name: string | null
    file_type: string | null
    file_size: bigint | null
    file_extension: string | null
    file_upload_date: Date | null
    owner_id: number | null
    parent_folder_id: number | null
    is_folder: boolean | null
    is_deleted: boolean | null
    is_public: boolean | null
    is_template: boolean | null
    created_at: Date | null
    updated_at: Date | null
    last_modified_by: number | null
    last_accessed_at: Date | null
    auto_save_interval: number | null
    allow_comments: boolean | null
    tags: string | null
  }

  export type DocumentsCountAggregateOutputType = {
    id: number
    title: number
    description: number
    content: number
    file_path: number
    file_name: number
    file_original_name: number
    file_type: number
    file_size: number
    file_extension: number
    file_upload_date: number
    owner_id: number
    parent_folder_id: number
    is_folder: number
    is_deleted: number
    is_public: number
    is_template: number
    created_at: number
    updated_at: number
    last_modified_by: number
    last_accessed_at: number
    auto_save_interval: number
    allow_comments: number
    tags: number
    metadata: number
    _all: number
  }


  export type DocumentsAvgAggregateInputType = {
    id?: true
    file_size?: true
    owner_id?: true
    parent_folder_id?: true
    last_modified_by?: true
    auto_save_interval?: true
  }

  export type DocumentsSumAggregateInputType = {
    id?: true
    file_size?: true
    owner_id?: true
    parent_folder_id?: true
    last_modified_by?: true
    auto_save_interval?: true
  }

  export type DocumentsMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    file_path?: true
    file_name?: true
    file_original_name?: true
    file_type?: true
    file_size?: true
    file_extension?: true
    file_upload_date?: true
    owner_id?: true
    parent_folder_id?: true
    is_folder?: true
    is_deleted?: true
    is_public?: true
    is_template?: true
    created_at?: true
    updated_at?: true
    last_modified_by?: true
    last_accessed_at?: true
    auto_save_interval?: true
    allow_comments?: true
    tags?: true
  }

  export type DocumentsMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    file_path?: true
    file_name?: true
    file_original_name?: true
    file_type?: true
    file_size?: true
    file_extension?: true
    file_upload_date?: true
    owner_id?: true
    parent_folder_id?: true
    is_folder?: true
    is_deleted?: true
    is_public?: true
    is_template?: true
    created_at?: true
    updated_at?: true
    last_modified_by?: true
    last_accessed_at?: true
    auto_save_interval?: true
    allow_comments?: true
    tags?: true
  }

  export type DocumentsCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    file_path?: true
    file_name?: true
    file_original_name?: true
    file_type?: true
    file_size?: true
    file_extension?: true
    file_upload_date?: true
    owner_id?: true
    parent_folder_id?: true
    is_folder?: true
    is_deleted?: true
    is_public?: true
    is_template?: true
    created_at?: true
    updated_at?: true
    last_modified_by?: true
    last_accessed_at?: true
    auto_save_interval?: true
    allow_comments?: true
    tags?: true
    metadata?: true
    _all?: true
  }

  export type DocumentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which documents to aggregate.
     */
    where?: documentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of documents to fetch.
     */
    orderBy?: documentsOrderByWithRelationInput | documentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: documentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned documents
    **/
    _count?: true | DocumentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentsMaxAggregateInputType
  }

  export type GetDocumentsAggregateType<T extends DocumentsAggregateArgs> = {
        [P in keyof T & keyof AggregateDocuments]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocuments[P]>
      : GetScalarType<T[P], AggregateDocuments[P]>
  }




  export type documentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: documentsWhereInput
    orderBy?: documentsOrderByWithAggregationInput | documentsOrderByWithAggregationInput[]
    by: DocumentsScalarFieldEnum[] | DocumentsScalarFieldEnum
    having?: documentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentsCountAggregateInputType | true
    _avg?: DocumentsAvgAggregateInputType
    _sum?: DocumentsSumAggregateInputType
    _min?: DocumentsMinAggregateInputType
    _max?: DocumentsMaxAggregateInputType
  }

  export type DocumentsGroupByOutputType = {
    id: number
    title: string
    description: string | null
    content: string | null
    file_path: string | null
    file_name: string | null
    file_original_name: string | null
    file_type: string | null
    file_size: bigint | null
    file_extension: string | null
    file_upload_date: Date | null
    owner_id: number
    parent_folder_id: number | null
    is_folder: boolean
    is_deleted: boolean
    is_public: boolean
    is_template: boolean
    created_at: Date
    updated_at: Date
    last_modified_by: number | null
    last_accessed_at: Date | null
    auto_save_interval: number
    allow_comments: boolean
    tags: string | null
    metadata: JsonValue | null
    _count: DocumentsCountAggregateOutputType | null
    _avg: DocumentsAvgAggregateOutputType | null
    _sum: DocumentsSumAggregateOutputType | null
    _min: DocumentsMinAggregateOutputType | null
    _max: DocumentsMaxAggregateOutputType | null
  }

  type GetDocumentsGroupByPayload<T extends documentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentsGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentsGroupByOutputType[P]>
        }
      >
    >


  export type documentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    file_path?: boolean
    file_name?: boolean
    file_original_name?: boolean
    file_type?: boolean
    file_size?: boolean
    file_extension?: boolean
    file_upload_date?: boolean
    owner_id?: boolean
    parent_folder_id?: boolean
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_modified_by?: boolean
    last_accessed_at?: boolean
    auto_save_interval?: boolean
    allow_comments?: boolean
    tags?: boolean
    metadata?: boolean
    calls?: boolean | documents$callsArgs<ExtArgs>
    document_versions?: boolean | documents$document_versionsArgs<ExtArgs>
    users_documents_last_modified_byTousers?: boolean | documents$users_documents_last_modified_byTousersArgs<ExtArgs>
    users_documents_owner_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    documents?: boolean | documents$documentsArgs<ExtArgs>
    other_documents?: boolean | documents$other_documentsArgs<ExtArgs>
    _count?: boolean | DocumentsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documents"]>

  export type documentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    file_path?: boolean
    file_name?: boolean
    file_original_name?: boolean
    file_type?: boolean
    file_size?: boolean
    file_extension?: boolean
    file_upload_date?: boolean
    owner_id?: boolean
    parent_folder_id?: boolean
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_modified_by?: boolean
    last_accessed_at?: boolean
    auto_save_interval?: boolean
    allow_comments?: boolean
    tags?: boolean
    metadata?: boolean
    users_documents_last_modified_byTousers?: boolean | documents$users_documents_last_modified_byTousersArgs<ExtArgs>
    users_documents_owner_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    documents?: boolean | documents$documentsArgs<ExtArgs>
  }, ExtArgs["result"]["documents"]>

  export type documentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    file_path?: boolean
    file_name?: boolean
    file_original_name?: boolean
    file_type?: boolean
    file_size?: boolean
    file_extension?: boolean
    file_upload_date?: boolean
    owner_id?: boolean
    parent_folder_id?: boolean
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_modified_by?: boolean
    last_accessed_at?: boolean
    auto_save_interval?: boolean
    allow_comments?: boolean
    tags?: boolean
    metadata?: boolean
    users_documents_last_modified_byTousers?: boolean | documents$users_documents_last_modified_byTousersArgs<ExtArgs>
    users_documents_owner_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    documents?: boolean | documents$documentsArgs<ExtArgs>
  }, ExtArgs["result"]["documents"]>

  export type documentsSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    file_path?: boolean
    file_name?: boolean
    file_original_name?: boolean
    file_type?: boolean
    file_size?: boolean
    file_extension?: boolean
    file_upload_date?: boolean
    owner_id?: boolean
    parent_folder_id?: boolean
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_modified_by?: boolean
    last_accessed_at?: boolean
    auto_save_interval?: boolean
    allow_comments?: boolean
    tags?: boolean
    metadata?: boolean
  }

  export type documentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "content" | "file_path" | "file_name" | "file_original_name" | "file_type" | "file_size" | "file_extension" | "file_upload_date" | "owner_id" | "parent_folder_id" | "is_folder" | "is_deleted" | "is_public" | "is_template" | "created_at" | "updated_at" | "last_modified_by" | "last_accessed_at" | "auto_save_interval" | "allow_comments" | "tags" | "metadata", ExtArgs["result"]["documents"]>
  export type documentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | documents$callsArgs<ExtArgs>
    document_versions?: boolean | documents$document_versionsArgs<ExtArgs>
    users_documents_last_modified_byTousers?: boolean | documents$users_documents_last_modified_byTousersArgs<ExtArgs>
    users_documents_owner_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    documents?: boolean | documents$documentsArgs<ExtArgs>
    other_documents?: boolean | documents$other_documentsArgs<ExtArgs>
    _count?: boolean | DocumentsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type documentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_documents_last_modified_byTousers?: boolean | documents$users_documents_last_modified_byTousersArgs<ExtArgs>
    users_documents_owner_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    documents?: boolean | documents$documentsArgs<ExtArgs>
  }
  export type documentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_documents_last_modified_byTousers?: boolean | documents$users_documents_last_modified_byTousersArgs<ExtArgs>
    users_documents_owner_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    documents?: boolean | documents$documentsArgs<ExtArgs>
  }

  export type $documentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "documents"
    objects: {
      calls: Prisma.$callsPayload<ExtArgs>[]
      document_versions: Prisma.$document_versionsPayload<ExtArgs>[]
      users_documents_last_modified_byTousers: Prisma.$usersPayload<ExtArgs> | null
      users_documents_owner_idTousers: Prisma.$usersPayload<ExtArgs>
      documents: Prisma.$documentsPayload<ExtArgs> | null
      other_documents: Prisma.$documentsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      content: string | null
      file_path: string | null
      file_name: string | null
      file_original_name: string | null
      file_type: string | null
      file_size: bigint | null
      file_extension: string | null
      file_upload_date: Date | null
      owner_id: number
      parent_folder_id: number | null
      is_folder: boolean
      is_deleted: boolean
      is_public: boolean
      is_template: boolean
      created_at: Date
      updated_at: Date
      last_modified_by: number | null
      last_accessed_at: Date | null
      auto_save_interval: number
      allow_comments: boolean
      tags: string | null
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["documents"]>
    composites: {}
  }

  type documentsGetPayload<S extends boolean | null | undefined | documentsDefaultArgs> = $Result.GetResult<Prisma.$documentsPayload, S>

  type documentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<documentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentsCountAggregateInputType | true
    }

  export interface documentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['documents'], meta: { name: 'documents' } }
    /**
     * Find zero or one Documents that matches the filter.
     * @param {documentsFindUniqueArgs} args - Arguments to find a Documents
     * @example
     * // Get one Documents
     * const documents = await prisma.documents.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends documentsFindUniqueArgs>(args: SelectSubset<T, documentsFindUniqueArgs<ExtArgs>>): Prisma__documentsClient<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Documents that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {documentsFindUniqueOrThrowArgs} args - Arguments to find a Documents
     * @example
     * // Get one Documents
     * const documents = await prisma.documents.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends documentsFindUniqueOrThrowArgs>(args: SelectSubset<T, documentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__documentsClient<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {documentsFindFirstArgs} args - Arguments to find a Documents
     * @example
     * // Get one Documents
     * const documents = await prisma.documents.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends documentsFindFirstArgs>(args?: SelectSubset<T, documentsFindFirstArgs<ExtArgs>>): Prisma__documentsClient<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Documents that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {documentsFindFirstOrThrowArgs} args - Arguments to find a Documents
     * @example
     * // Get one Documents
     * const documents = await prisma.documents.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends documentsFindFirstOrThrowArgs>(args?: SelectSubset<T, documentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__documentsClient<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {documentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.documents.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.documents.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentsWithIdOnly = await prisma.documents.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends documentsFindManyArgs>(args?: SelectSubset<T, documentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Documents.
     * @param {documentsCreateArgs} args - Arguments to create a Documents.
     * @example
     * // Create one Documents
     * const Documents = await prisma.documents.create({
     *   data: {
     *     // ... data to create a Documents
     *   }
     * })
     * 
     */
    create<T extends documentsCreateArgs>(args: SelectSubset<T, documentsCreateArgs<ExtArgs>>): Prisma__documentsClient<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {documentsCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const documents = await prisma.documents.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends documentsCreateManyArgs>(args?: SelectSubset<T, documentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {documentsCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const documents = await prisma.documents.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentsWithIdOnly = await prisma.documents.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends documentsCreateManyAndReturnArgs>(args?: SelectSubset<T, documentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Documents.
     * @param {documentsDeleteArgs} args - Arguments to delete one Documents.
     * @example
     * // Delete one Documents
     * const Documents = await prisma.documents.delete({
     *   where: {
     *     // ... filter to delete one Documents
     *   }
     * })
     * 
     */
    delete<T extends documentsDeleteArgs>(args: SelectSubset<T, documentsDeleteArgs<ExtArgs>>): Prisma__documentsClient<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Documents.
     * @param {documentsUpdateArgs} args - Arguments to update one Documents.
     * @example
     * // Update one Documents
     * const documents = await prisma.documents.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends documentsUpdateArgs>(args: SelectSubset<T, documentsUpdateArgs<ExtArgs>>): Prisma__documentsClient<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {documentsDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.documents.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends documentsDeleteManyArgs>(args?: SelectSubset<T, documentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {documentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const documents = await prisma.documents.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends documentsUpdateManyArgs>(args: SelectSubset<T, documentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {documentsUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const documents = await prisma.documents.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentsWithIdOnly = await prisma.documents.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends documentsUpdateManyAndReturnArgs>(args: SelectSubset<T, documentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Documents.
     * @param {documentsUpsertArgs} args - Arguments to update or create a Documents.
     * @example
     * // Update or create a Documents
     * const documents = await prisma.documents.upsert({
     *   create: {
     *     // ... data to create a Documents
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Documents we want to update
     *   }
     * })
     */
    upsert<T extends documentsUpsertArgs>(args: SelectSubset<T, documentsUpsertArgs<ExtArgs>>): Prisma__documentsClient<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {documentsCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.documents.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends documentsCountArgs>(
      args?: Subset<T, documentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentsAggregateArgs>(args: Subset<T, DocumentsAggregateArgs>): Prisma.PrismaPromise<GetDocumentsAggregateType<T>>

    /**
     * Group by Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {documentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends documentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: documentsGroupByArgs['orderBy'] }
        : { orderBy?: documentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, documentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the documents model
   */
  readonly fields: documentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for documents.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__documentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    calls<T extends documents$callsArgs<ExtArgs> = {}>(args?: Subset<T, documents$callsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    document_versions<T extends documents$document_versionsArgs<ExtArgs> = {}>(args?: Subset<T, documents$document_versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users_documents_last_modified_byTousers<T extends documents$users_documents_last_modified_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, documents$users_documents_last_modified_byTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users_documents_owner_idTousers<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    documents<T extends documents$documentsArgs<ExtArgs> = {}>(args?: Subset<T, documents$documentsArgs<ExtArgs>>): Prisma__documentsClient<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    other_documents<T extends documents$other_documentsArgs<ExtArgs> = {}>(args?: Subset<T, documents$other_documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the documents model
   */
  interface documentsFieldRefs {
    readonly id: FieldRef<"documents", 'Int'>
    readonly title: FieldRef<"documents", 'String'>
    readonly description: FieldRef<"documents", 'String'>
    readonly content: FieldRef<"documents", 'String'>
    readonly file_path: FieldRef<"documents", 'String'>
    readonly file_name: FieldRef<"documents", 'String'>
    readonly file_original_name: FieldRef<"documents", 'String'>
    readonly file_type: FieldRef<"documents", 'String'>
    readonly file_size: FieldRef<"documents", 'BigInt'>
    readonly file_extension: FieldRef<"documents", 'String'>
    readonly file_upload_date: FieldRef<"documents", 'DateTime'>
    readonly owner_id: FieldRef<"documents", 'Int'>
    readonly parent_folder_id: FieldRef<"documents", 'Int'>
    readonly is_folder: FieldRef<"documents", 'Boolean'>
    readonly is_deleted: FieldRef<"documents", 'Boolean'>
    readonly is_public: FieldRef<"documents", 'Boolean'>
    readonly is_template: FieldRef<"documents", 'Boolean'>
    readonly created_at: FieldRef<"documents", 'DateTime'>
    readonly updated_at: FieldRef<"documents", 'DateTime'>
    readonly last_modified_by: FieldRef<"documents", 'Int'>
    readonly last_accessed_at: FieldRef<"documents", 'DateTime'>
    readonly auto_save_interval: FieldRef<"documents", 'Int'>
    readonly allow_comments: FieldRef<"documents", 'Boolean'>
    readonly tags: FieldRef<"documents", 'String'>
    readonly metadata: FieldRef<"documents", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * documents findUnique
   */
  export type documentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    /**
     * Filter, which documents to fetch.
     */
    where: documentsWhereUniqueInput
  }

  /**
   * documents findUniqueOrThrow
   */
  export type documentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    /**
     * Filter, which documents to fetch.
     */
    where: documentsWhereUniqueInput
  }

  /**
   * documents findFirst
   */
  export type documentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    /**
     * Filter, which documents to fetch.
     */
    where?: documentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of documents to fetch.
     */
    orderBy?: documentsOrderByWithRelationInput | documentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for documents.
     */
    cursor?: documentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of documents.
     */
    distinct?: DocumentsScalarFieldEnum | DocumentsScalarFieldEnum[]
  }

  /**
   * documents findFirstOrThrow
   */
  export type documentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    /**
     * Filter, which documents to fetch.
     */
    where?: documentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of documents to fetch.
     */
    orderBy?: documentsOrderByWithRelationInput | documentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for documents.
     */
    cursor?: documentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of documents.
     */
    distinct?: DocumentsScalarFieldEnum | DocumentsScalarFieldEnum[]
  }

  /**
   * documents findMany
   */
  export type documentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    /**
     * Filter, which documents to fetch.
     */
    where?: documentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of documents to fetch.
     */
    orderBy?: documentsOrderByWithRelationInput | documentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing documents.
     */
    cursor?: documentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` documents.
     */
    skip?: number
    distinct?: DocumentsScalarFieldEnum | DocumentsScalarFieldEnum[]
  }

  /**
   * documents create
   */
  export type documentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    /**
     * The data needed to create a documents.
     */
    data: XOR<documentsCreateInput, documentsUncheckedCreateInput>
  }

  /**
   * documents createMany
   */
  export type documentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many documents.
     */
    data: documentsCreateManyInput | documentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * documents createManyAndReturn
   */
  export type documentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * The data used to create many documents.
     */
    data: documentsCreateManyInput | documentsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * documents update
   */
  export type documentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    /**
     * The data needed to update a documents.
     */
    data: XOR<documentsUpdateInput, documentsUncheckedUpdateInput>
    /**
     * Choose, which documents to update.
     */
    where: documentsWhereUniqueInput
  }

  /**
   * documents updateMany
   */
  export type documentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update documents.
     */
    data: XOR<documentsUpdateManyMutationInput, documentsUncheckedUpdateManyInput>
    /**
     * Filter which documents to update
     */
    where?: documentsWhereInput
    /**
     * Limit how many documents to update.
     */
    limit?: number
  }

  /**
   * documents updateManyAndReturn
   */
  export type documentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * The data used to update documents.
     */
    data: XOR<documentsUpdateManyMutationInput, documentsUncheckedUpdateManyInput>
    /**
     * Filter which documents to update
     */
    where?: documentsWhereInput
    /**
     * Limit how many documents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * documents upsert
   */
  export type documentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    /**
     * The filter to search for the documents to update in case it exists.
     */
    where: documentsWhereUniqueInput
    /**
     * In case the documents found by the `where` argument doesn't exist, create a new documents with this data.
     */
    create: XOR<documentsCreateInput, documentsUncheckedCreateInput>
    /**
     * In case the documents was found with the provided `where` argument, update it with this data.
     */
    update: XOR<documentsUpdateInput, documentsUncheckedUpdateInput>
  }

  /**
   * documents delete
   */
  export type documentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    /**
     * Filter which documents to delete.
     */
    where: documentsWhereUniqueInput
  }

  /**
   * documents deleteMany
   */
  export type documentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which documents to delete
     */
    where?: documentsWhereInput
    /**
     * Limit how many documents to delete.
     */
    limit?: number
  }

  /**
   * documents.calls
   */
  export type documents$callsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsInclude<ExtArgs> | null
    where?: callsWhereInput
    orderBy?: callsOrderByWithRelationInput | callsOrderByWithRelationInput[]
    cursor?: callsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallsScalarFieldEnum | CallsScalarFieldEnum[]
  }

  /**
   * documents.document_versions
   */
  export type documents$document_versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsInclude<ExtArgs> | null
    where?: document_versionsWhereInput
    orderBy?: document_versionsOrderByWithRelationInput | document_versionsOrderByWithRelationInput[]
    cursor?: document_versionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Document_versionsScalarFieldEnum | Document_versionsScalarFieldEnum[]
  }

  /**
   * documents.users_documents_last_modified_byTousers
   */
  export type documents$users_documents_last_modified_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * documents.documents
   */
  export type documents$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    where?: documentsWhereInput
  }

  /**
   * documents.other_documents
   */
  export type documents$other_documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    where?: documentsWhereInput
    orderBy?: documentsOrderByWithRelationInput | documentsOrderByWithRelationInput[]
    cursor?: documentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentsScalarFieldEnum | DocumentsScalarFieldEnum[]
  }

  /**
   * documents without action
   */
  export type documentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
    login_attempts: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
    login_attempts: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password_hash: string | null
    full_name: string | null
    profile_picture: string | null
    two_factor_enabled: boolean | null
    two_factor_secret: string | null
    is_admin: boolean | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
    last_login: Date | null
    login_attempts: number | null
    locked_until: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password_hash: string | null
    full_name: string | null
    profile_picture: string | null
    two_factor_enabled: boolean | null
    two_factor_secret: string | null
    is_admin: boolean | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
    last_login: Date | null
    login_attempts: number | null
    locked_until: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password_hash: number
    full_name: number
    profile_picture: number
    two_factor_enabled: number
    two_factor_secret: number
    is_admin: number
    is_active: number
    created_at: number
    updated_at: number
    last_login: number
    login_attempts: number
    locked_until: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
    login_attempts?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
    login_attempts?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    full_name?: true
    profile_picture?: true
    two_factor_enabled?: true
    two_factor_secret?: true
    is_admin?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    last_login?: true
    login_attempts?: true
    locked_until?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    full_name?: true
    profile_picture?: true
    two_factor_enabled?: true
    two_factor_secret?: true
    is_admin?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    last_login?: true
    login_attempts?: true
    locked_until?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    full_name?: true
    profile_picture?: true
    two_factor_enabled?: true
    two_factor_secret?: true
    is_admin?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    last_login?: true
    login_attempts?: true
    locked_until?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    username: string
    email: string
    password_hash: string
    full_name: string | null
    profile_picture: string | null
    two_factor_enabled: boolean | null
    two_factor_secret: string | null
    is_admin: boolean | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
    last_login: Date | null
    login_attempts: number | null
    locked_until: Date | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    full_name?: boolean
    profile_picture?: boolean
    two_factor_enabled?: boolean
    two_factor_secret?: boolean
    is_admin?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_login?: boolean
    login_attempts?: boolean
    locked_until?: boolean
    call_participants?: boolean | users$call_participantsArgs<ExtArgs>
    calls?: boolean | users$callsArgs<ExtArgs>
    document_versions?: boolean | users$document_versionsArgs<ExtArgs>
    documents_documents_last_modified_byTousers?: boolean | users$documents_documents_last_modified_byTousersArgs<ExtArgs>
    documents_documents_owner_idTousers?: boolean | users$documents_documents_owner_idTousersArgs<ExtArgs>
    conversations_created?: boolean | users$conversations_createdArgs<ExtArgs>
    conversation_participants?: boolean | users$conversation_participantsArgs<ExtArgs>
    messages_sent?: boolean | users$messages_sentArgs<ExtArgs>
    notifications_notifications_user_idTousers?: boolean | users$notifications_notifications_user_idTousersArgs<ExtArgs>
    notifications_notifications_sender_idTousers?: boolean | users$notifications_notifications_sender_idTousersArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    full_name?: boolean
    profile_picture?: boolean
    two_factor_enabled?: boolean
    two_factor_secret?: boolean
    is_admin?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_login?: boolean
    login_attempts?: boolean
    locked_until?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    full_name?: boolean
    profile_picture?: boolean
    two_factor_enabled?: boolean
    two_factor_secret?: boolean
    is_admin?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_login?: boolean
    login_attempts?: boolean
    locked_until?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    full_name?: boolean
    profile_picture?: boolean
    two_factor_enabled?: boolean
    two_factor_secret?: boolean
    is_admin?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_login?: boolean
    login_attempts?: boolean
    locked_until?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password_hash" | "full_name" | "profile_picture" | "two_factor_enabled" | "two_factor_secret" | "is_admin" | "is_active" | "created_at" | "updated_at" | "last_login" | "login_attempts" | "locked_until", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call_participants?: boolean | users$call_participantsArgs<ExtArgs>
    calls?: boolean | users$callsArgs<ExtArgs>
    document_versions?: boolean | users$document_versionsArgs<ExtArgs>
    documents_documents_last_modified_byTousers?: boolean | users$documents_documents_last_modified_byTousersArgs<ExtArgs>
    documents_documents_owner_idTousers?: boolean | users$documents_documents_owner_idTousersArgs<ExtArgs>
    conversations_created?: boolean | users$conversations_createdArgs<ExtArgs>
    conversation_participants?: boolean | users$conversation_participantsArgs<ExtArgs>
    messages_sent?: boolean | users$messages_sentArgs<ExtArgs>
    notifications_notifications_user_idTousers?: boolean | users$notifications_notifications_user_idTousersArgs<ExtArgs>
    notifications_notifications_sender_idTousers?: boolean | users$notifications_notifications_sender_idTousersArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      call_participants: Prisma.$call_participantsPayload<ExtArgs>[]
      calls: Prisma.$callsPayload<ExtArgs>[]
      document_versions: Prisma.$document_versionsPayload<ExtArgs>[]
      documents_documents_last_modified_byTousers: Prisma.$documentsPayload<ExtArgs>[]
      documents_documents_owner_idTousers: Prisma.$documentsPayload<ExtArgs>[]
      conversations_created: Prisma.$conversationsPayload<ExtArgs>[]
      conversation_participants: Prisma.$conversation_participantsPayload<ExtArgs>[]
      messages_sent: Prisma.$messagesPayload<ExtArgs>[]
      notifications_notifications_user_idTousers: Prisma.$notificationsPayload<ExtArgs>[]
      notifications_notifications_sender_idTousers: Prisma.$notificationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      email: string
      password_hash: string
      full_name: string | null
      profile_picture: string | null
      two_factor_enabled: boolean | null
      two_factor_secret: string | null
      is_admin: boolean | null
      is_active: boolean | null
      created_at: Date | null
      updated_at: Date | null
      last_login: Date | null
      login_attempts: number | null
      locked_until: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    call_participants<T extends users$call_participantsArgs<ExtArgs> = {}>(args?: Subset<T, users$call_participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$call_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    calls<T extends users$callsArgs<ExtArgs> = {}>(args?: Subset<T, users$callsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$callsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    document_versions<T extends users$document_versionsArgs<ExtArgs> = {}>(args?: Subset<T, users$document_versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents_documents_last_modified_byTousers<T extends users$documents_documents_last_modified_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$documents_documents_last_modified_byTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents_documents_owner_idTousers<T extends users$documents_documents_owner_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$documents_documents_owner_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conversations_created<T extends users$conversations_createdArgs<ExtArgs> = {}>(args?: Subset<T, users$conversations_createdArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    conversation_participants<T extends users$conversation_participantsArgs<ExtArgs> = {}>(args?: Subset<T, users$conversation_participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages_sent<T extends users$messages_sentArgs<ExtArgs> = {}>(args?: Subset<T, users$messages_sentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications_notifications_user_idTousers<T extends users$notifications_notifications_user_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$notifications_notifications_user_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications_notifications_sender_idTousers<T extends users$notifications_notifications_sender_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$notifications_notifications_sender_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly username: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password_hash: FieldRef<"users", 'String'>
    readonly full_name: FieldRef<"users", 'String'>
    readonly profile_picture: FieldRef<"users", 'String'>
    readonly two_factor_enabled: FieldRef<"users", 'Boolean'>
    readonly two_factor_secret: FieldRef<"users", 'String'>
    readonly is_admin: FieldRef<"users", 'Boolean'>
    readonly is_active: FieldRef<"users", 'Boolean'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
    readonly last_login: FieldRef<"users", 'DateTime'>
    readonly login_attempts: FieldRef<"users", 'Int'>
    readonly locked_until: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.call_participants
   */
  export type users$call_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the call_participants
     */
    select?: call_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the call_participants
     */
    omit?: call_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: call_participantsInclude<ExtArgs> | null
    where?: call_participantsWhereInput
    orderBy?: call_participantsOrderByWithRelationInput | call_participantsOrderByWithRelationInput[]
    cursor?: call_participantsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Call_participantsScalarFieldEnum | Call_participantsScalarFieldEnum[]
  }

  /**
   * users.calls
   */
  export type users$callsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the calls
     */
    select?: callsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the calls
     */
    omit?: callsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: callsInclude<ExtArgs> | null
    where?: callsWhereInput
    orderBy?: callsOrderByWithRelationInput | callsOrderByWithRelationInput[]
    cursor?: callsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallsScalarFieldEnum | CallsScalarFieldEnum[]
  }

  /**
   * users.document_versions
   */
  export type users$document_versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_versions
     */
    select?: document_versionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_versions
     */
    omit?: document_versionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_versionsInclude<ExtArgs> | null
    where?: document_versionsWhereInput
    orderBy?: document_versionsOrderByWithRelationInput | document_versionsOrderByWithRelationInput[]
    cursor?: document_versionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Document_versionsScalarFieldEnum | Document_versionsScalarFieldEnum[]
  }

  /**
   * users.documents_documents_last_modified_byTousers
   */
  export type users$documents_documents_last_modified_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    where?: documentsWhereInput
    orderBy?: documentsOrderByWithRelationInput | documentsOrderByWithRelationInput[]
    cursor?: documentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentsScalarFieldEnum | DocumentsScalarFieldEnum[]
  }

  /**
   * users.documents_documents_owner_idTousers
   */
  export type users$documents_documents_owner_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: documentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the documents
     */
    omit?: documentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: documentsInclude<ExtArgs> | null
    where?: documentsWhereInput
    orderBy?: documentsOrderByWithRelationInput | documentsOrderByWithRelationInput[]
    cursor?: documentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentsScalarFieldEnum | DocumentsScalarFieldEnum[]
  }

  /**
   * users.conversations_created
   */
  export type users$conversations_createdArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsInclude<ExtArgs> | null
    where?: conversationsWhereInput
    orderBy?: conversationsOrderByWithRelationInput | conversationsOrderByWithRelationInput[]
    cursor?: conversationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationsScalarFieldEnum | ConversationsScalarFieldEnum[]
  }

  /**
   * users.conversation_participants
   */
  export type users$conversation_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsInclude<ExtArgs> | null
    where?: conversation_participantsWhereInput
    orderBy?: conversation_participantsOrderByWithRelationInput | conversation_participantsOrderByWithRelationInput[]
    cursor?: conversation_participantsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Conversation_participantsScalarFieldEnum | Conversation_participantsScalarFieldEnum[]
  }

  /**
   * users.messages_sent
   */
  export type users$messages_sentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    where?: messagesWhereInput
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    cursor?: messagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * users.notifications_notifications_user_idTousers
   */
  export type users$notifications_notifications_user_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    where?: notificationsWhereInput
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    cursor?: notificationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * users.notifications_notifications_sender_idTousers
   */
  export type users$notifications_notifications_sender_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    where?: notificationsWhereInput
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    cursor?: notificationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model conversations
   */

  export type AggregateConversations = {
    _count: ConversationsCountAggregateOutputType | null
    _avg: ConversationsAvgAggregateOutputType | null
    _sum: ConversationsSumAggregateOutputType | null
    _min: ConversationsMinAggregateOutputType | null
    _max: ConversationsMaxAggregateOutputType | null
  }

  export type ConversationsAvgAggregateOutputType = {
    id: number | null
    created_by: number | null
  }

  export type ConversationsSumAggregateOutputType = {
    id: number | null
    created_by: number | null
  }

  export type ConversationsMinAggregateOutputType = {
    id: number | null
    name: string | null
    is_group: boolean | null
    created_at: Date | null
    updated_at: Date | null
    created_by: number | null
  }

  export type ConversationsMaxAggregateOutputType = {
    id: number | null
    name: string | null
    is_group: boolean | null
    created_at: Date | null
    updated_at: Date | null
    created_by: number | null
  }

  export type ConversationsCountAggregateOutputType = {
    id: number
    name: number
    is_group: number
    created_at: number
    updated_at: number
    created_by: number
    _all: number
  }


  export type ConversationsAvgAggregateInputType = {
    id?: true
    created_by?: true
  }

  export type ConversationsSumAggregateInputType = {
    id?: true
    created_by?: true
  }

  export type ConversationsMinAggregateInputType = {
    id?: true
    name?: true
    is_group?: true
    created_at?: true
    updated_at?: true
    created_by?: true
  }

  export type ConversationsMaxAggregateInputType = {
    id?: true
    name?: true
    is_group?: true
    created_at?: true
    updated_at?: true
    created_by?: true
  }

  export type ConversationsCountAggregateInputType = {
    id?: true
    name?: true
    is_group?: true
    created_at?: true
    updated_at?: true
    created_by?: true
    _all?: true
  }

  export type ConversationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which conversations to aggregate.
     */
    where?: conversationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conversations to fetch.
     */
    orderBy?: conversationsOrderByWithRelationInput | conversationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: conversationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned conversations
    **/
    _count?: true | ConversationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConversationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConversationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationsMaxAggregateInputType
  }

  export type GetConversationsAggregateType<T extends ConversationsAggregateArgs> = {
        [P in keyof T & keyof AggregateConversations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversations[P]>
      : GetScalarType<T[P], AggregateConversations[P]>
  }




  export type conversationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: conversationsWhereInput
    orderBy?: conversationsOrderByWithAggregationInput | conversationsOrderByWithAggregationInput[]
    by: ConversationsScalarFieldEnum[] | ConversationsScalarFieldEnum
    having?: conversationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationsCountAggregateInputType | true
    _avg?: ConversationsAvgAggregateInputType
    _sum?: ConversationsSumAggregateInputType
    _min?: ConversationsMinAggregateInputType
    _max?: ConversationsMaxAggregateInputType
  }

  export type ConversationsGroupByOutputType = {
    id: number
    name: string | null
    is_group: boolean
    created_at: Date
    updated_at: Date
    created_by: number
    _count: ConversationsCountAggregateOutputType | null
    _avg: ConversationsAvgAggregateOutputType | null
    _sum: ConversationsSumAggregateOutputType | null
    _min: ConversationsMinAggregateOutputType | null
    _max: ConversationsMaxAggregateOutputType | null
  }

  type GetConversationsGroupByPayload<T extends conversationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationsGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationsGroupByOutputType[P]>
        }
      >
    >


  export type conversationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    is_group?: boolean
    created_at?: boolean
    updated_at?: boolean
    created_by?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
    conversation_participants?: boolean | conversations$conversation_participantsArgs<ExtArgs>
    messages?: boolean | conversations$messagesArgs<ExtArgs>
    _count?: boolean | ConversationsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversations"]>

  export type conversationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    is_group?: boolean
    created_at?: boolean
    updated_at?: boolean
    created_by?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversations"]>

  export type conversationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    is_group?: boolean
    created_at?: boolean
    updated_at?: boolean
    created_by?: boolean
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversations"]>

  export type conversationsSelectScalar = {
    id?: boolean
    name?: boolean
    is_group?: boolean
    created_at?: boolean
    updated_at?: boolean
    created_by?: boolean
  }

  export type conversationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "is_group" | "created_at" | "updated_at" | "created_by", ExtArgs["result"]["conversations"]>
  export type conversationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
    conversation_participants?: boolean | conversations$conversation_participantsArgs<ExtArgs>
    messages?: boolean | conversations$messagesArgs<ExtArgs>
    _count?: boolean | ConversationsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type conversationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type conversationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $conversationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "conversations"
    objects: {
      users: Prisma.$usersPayload<ExtArgs>
      conversation_participants: Prisma.$conversation_participantsPayload<ExtArgs>[]
      messages: Prisma.$messagesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      is_group: boolean
      created_at: Date
      updated_at: Date
      created_by: number
    }, ExtArgs["result"]["conversations"]>
    composites: {}
  }

  type conversationsGetPayload<S extends boolean | null | undefined | conversationsDefaultArgs> = $Result.GetResult<Prisma.$conversationsPayload, S>

  type conversationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<conversationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationsCountAggregateInputType | true
    }

  export interface conversationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['conversations'], meta: { name: 'conversations' } }
    /**
     * Find zero or one Conversations that matches the filter.
     * @param {conversationsFindUniqueArgs} args - Arguments to find a Conversations
     * @example
     * // Get one Conversations
     * const conversations = await prisma.conversations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends conversationsFindUniqueArgs>(args: SelectSubset<T, conversationsFindUniqueArgs<ExtArgs>>): Prisma__conversationsClient<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {conversationsFindUniqueOrThrowArgs} args - Arguments to find a Conversations
     * @example
     * // Get one Conversations
     * const conversations = await prisma.conversations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends conversationsFindUniqueOrThrowArgs>(args: SelectSubset<T, conversationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__conversationsClient<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conversationsFindFirstArgs} args - Arguments to find a Conversations
     * @example
     * // Get one Conversations
     * const conversations = await prisma.conversations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends conversationsFindFirstArgs>(args?: SelectSubset<T, conversationsFindFirstArgs<ExtArgs>>): Prisma__conversationsClient<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conversationsFindFirstOrThrowArgs} args - Arguments to find a Conversations
     * @example
     * // Get one Conversations
     * const conversations = await prisma.conversations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends conversationsFindFirstOrThrowArgs>(args?: SelectSubset<T, conversationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__conversationsClient<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conversationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversations.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationsWithIdOnly = await prisma.conversations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends conversationsFindManyArgs>(args?: SelectSubset<T, conversationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversations.
     * @param {conversationsCreateArgs} args - Arguments to create a Conversations.
     * @example
     * // Create one Conversations
     * const Conversations = await prisma.conversations.create({
     *   data: {
     *     // ... data to create a Conversations
     *   }
     * })
     * 
     */
    create<T extends conversationsCreateArgs>(args: SelectSubset<T, conversationsCreateArgs<ExtArgs>>): Prisma__conversationsClient<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversations.
     * @param {conversationsCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversations = await prisma.conversations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends conversationsCreateManyArgs>(args?: SelectSubset<T, conversationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {conversationsCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversations = await prisma.conversations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationsWithIdOnly = await prisma.conversations.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends conversationsCreateManyAndReturnArgs>(args?: SelectSubset<T, conversationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conversations.
     * @param {conversationsDeleteArgs} args - Arguments to delete one Conversations.
     * @example
     * // Delete one Conversations
     * const Conversations = await prisma.conversations.delete({
     *   where: {
     *     // ... filter to delete one Conversations
     *   }
     * })
     * 
     */
    delete<T extends conversationsDeleteArgs>(args: SelectSubset<T, conversationsDeleteArgs<ExtArgs>>): Prisma__conversationsClient<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversations.
     * @param {conversationsUpdateArgs} args - Arguments to update one Conversations.
     * @example
     * // Update one Conversations
     * const conversations = await prisma.conversations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends conversationsUpdateArgs>(args: SelectSubset<T, conversationsUpdateArgs<ExtArgs>>): Prisma__conversationsClient<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversations.
     * @param {conversationsDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends conversationsDeleteManyArgs>(args?: SelectSubset<T, conversationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conversationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversations = await prisma.conversations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends conversationsUpdateManyArgs>(args: SelectSubset<T, conversationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {conversationsUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversations = await prisma.conversations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversations and only return the `id`
     * const conversationsWithIdOnly = await prisma.conversations.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends conversationsUpdateManyAndReturnArgs>(args: SelectSubset<T, conversationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conversations.
     * @param {conversationsUpsertArgs} args - Arguments to update or create a Conversations.
     * @example
     * // Update or create a Conversations
     * const conversations = await prisma.conversations.upsert({
     *   create: {
     *     // ... data to create a Conversations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversations we want to update
     *   }
     * })
     */
    upsert<T extends conversationsUpsertArgs>(args: SelectSubset<T, conversationsUpsertArgs<ExtArgs>>): Prisma__conversationsClient<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conversationsCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversations.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends conversationsCountArgs>(
      args?: Subset<T, conversationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationsAggregateArgs>(args: Subset<T, ConversationsAggregateArgs>): Prisma.PrismaPromise<GetConversationsAggregateType<T>>

    /**
     * Group by Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conversationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends conversationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: conversationsGroupByArgs['orderBy'] }
        : { orderBy?: conversationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, conversationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the conversations model
   */
  readonly fields: conversationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for conversations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__conversationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    conversation_participants<T extends conversations$conversation_participantsArgs<ExtArgs> = {}>(args?: Subset<T, conversations$conversation_participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends conversations$messagesArgs<ExtArgs> = {}>(args?: Subset<T, conversations$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the conversations model
   */
  interface conversationsFieldRefs {
    readonly id: FieldRef<"conversations", 'Int'>
    readonly name: FieldRef<"conversations", 'String'>
    readonly is_group: FieldRef<"conversations", 'Boolean'>
    readonly created_at: FieldRef<"conversations", 'DateTime'>
    readonly updated_at: FieldRef<"conversations", 'DateTime'>
    readonly created_by: FieldRef<"conversations", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * conversations findUnique
   */
  export type conversationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsInclude<ExtArgs> | null
    /**
     * Filter, which conversations to fetch.
     */
    where: conversationsWhereUniqueInput
  }

  /**
   * conversations findUniqueOrThrow
   */
  export type conversationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsInclude<ExtArgs> | null
    /**
     * Filter, which conversations to fetch.
     */
    where: conversationsWhereUniqueInput
  }

  /**
   * conversations findFirst
   */
  export type conversationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsInclude<ExtArgs> | null
    /**
     * Filter, which conversations to fetch.
     */
    where?: conversationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conversations to fetch.
     */
    orderBy?: conversationsOrderByWithRelationInput | conversationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for conversations.
     */
    cursor?: conversationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of conversations.
     */
    distinct?: ConversationsScalarFieldEnum | ConversationsScalarFieldEnum[]
  }

  /**
   * conversations findFirstOrThrow
   */
  export type conversationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsInclude<ExtArgs> | null
    /**
     * Filter, which conversations to fetch.
     */
    where?: conversationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conversations to fetch.
     */
    orderBy?: conversationsOrderByWithRelationInput | conversationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for conversations.
     */
    cursor?: conversationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of conversations.
     */
    distinct?: ConversationsScalarFieldEnum | ConversationsScalarFieldEnum[]
  }

  /**
   * conversations findMany
   */
  export type conversationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsInclude<ExtArgs> | null
    /**
     * Filter, which conversations to fetch.
     */
    where?: conversationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conversations to fetch.
     */
    orderBy?: conversationsOrderByWithRelationInput | conversationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing conversations.
     */
    cursor?: conversationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conversations.
     */
    skip?: number
    distinct?: ConversationsScalarFieldEnum | ConversationsScalarFieldEnum[]
  }

  /**
   * conversations create
   */
  export type conversationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsInclude<ExtArgs> | null
    /**
     * The data needed to create a conversations.
     */
    data: XOR<conversationsCreateInput, conversationsUncheckedCreateInput>
  }

  /**
   * conversations createMany
   */
  export type conversationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many conversations.
     */
    data: conversationsCreateManyInput | conversationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * conversations createManyAndReturn
   */
  export type conversationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * The data used to create many conversations.
     */
    data: conversationsCreateManyInput | conversationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * conversations update
   */
  export type conversationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsInclude<ExtArgs> | null
    /**
     * The data needed to update a conversations.
     */
    data: XOR<conversationsUpdateInput, conversationsUncheckedUpdateInput>
    /**
     * Choose, which conversations to update.
     */
    where: conversationsWhereUniqueInput
  }

  /**
   * conversations updateMany
   */
  export type conversationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update conversations.
     */
    data: XOR<conversationsUpdateManyMutationInput, conversationsUncheckedUpdateManyInput>
    /**
     * Filter which conversations to update
     */
    where?: conversationsWhereInput
    /**
     * Limit how many conversations to update.
     */
    limit?: number
  }

  /**
   * conversations updateManyAndReturn
   */
  export type conversationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * The data used to update conversations.
     */
    data: XOR<conversationsUpdateManyMutationInput, conversationsUncheckedUpdateManyInput>
    /**
     * Filter which conversations to update
     */
    where?: conversationsWhereInput
    /**
     * Limit how many conversations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * conversations upsert
   */
  export type conversationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsInclude<ExtArgs> | null
    /**
     * The filter to search for the conversations to update in case it exists.
     */
    where: conversationsWhereUniqueInput
    /**
     * In case the conversations found by the `where` argument doesn't exist, create a new conversations with this data.
     */
    create: XOR<conversationsCreateInput, conversationsUncheckedCreateInput>
    /**
     * In case the conversations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<conversationsUpdateInput, conversationsUncheckedUpdateInput>
  }

  /**
   * conversations delete
   */
  export type conversationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsInclude<ExtArgs> | null
    /**
     * Filter which conversations to delete.
     */
    where: conversationsWhereUniqueInput
  }

  /**
   * conversations deleteMany
   */
  export type conversationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which conversations to delete
     */
    where?: conversationsWhereInput
    /**
     * Limit how many conversations to delete.
     */
    limit?: number
  }

  /**
   * conversations.conversation_participants
   */
  export type conversations$conversation_participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsInclude<ExtArgs> | null
    where?: conversation_participantsWhereInput
    orderBy?: conversation_participantsOrderByWithRelationInput | conversation_participantsOrderByWithRelationInput[]
    cursor?: conversation_participantsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Conversation_participantsScalarFieldEnum | Conversation_participantsScalarFieldEnum[]
  }

  /**
   * conversations.messages
   */
  export type conversations$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    where?: messagesWhereInput
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    cursor?: messagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * conversations without action
   */
  export type conversationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversations
     */
    select?: conversationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversations
     */
    omit?: conversationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversationsInclude<ExtArgs> | null
  }


  /**
   * Model conversation_participants
   */

  export type AggregateConversation_participants = {
    _count: Conversation_participantsCountAggregateOutputType | null
    _avg: Conversation_participantsAvgAggregateOutputType | null
    _sum: Conversation_participantsSumAggregateOutputType | null
    _min: Conversation_participantsMinAggregateOutputType | null
    _max: Conversation_participantsMaxAggregateOutputType | null
  }

  export type Conversation_participantsAvgAggregateOutputType = {
    id: number | null
    conversation_id: number | null
    user_id: number | null
  }

  export type Conversation_participantsSumAggregateOutputType = {
    id: number | null
    conversation_id: number | null
    user_id: number | null
  }

  export type Conversation_participantsMinAggregateOutputType = {
    id: number | null
    conversation_id: number | null
    user_id: number | null
    joined_at: Date | null
    left_at: Date | null
    is_active: boolean | null
  }

  export type Conversation_participantsMaxAggregateOutputType = {
    id: number | null
    conversation_id: number | null
    user_id: number | null
    joined_at: Date | null
    left_at: Date | null
    is_active: boolean | null
  }

  export type Conversation_participantsCountAggregateOutputType = {
    id: number
    conversation_id: number
    user_id: number
    joined_at: number
    left_at: number
    is_active: number
    _all: number
  }


  export type Conversation_participantsAvgAggregateInputType = {
    id?: true
    conversation_id?: true
    user_id?: true
  }

  export type Conversation_participantsSumAggregateInputType = {
    id?: true
    conversation_id?: true
    user_id?: true
  }

  export type Conversation_participantsMinAggregateInputType = {
    id?: true
    conversation_id?: true
    user_id?: true
    joined_at?: true
    left_at?: true
    is_active?: true
  }

  export type Conversation_participantsMaxAggregateInputType = {
    id?: true
    conversation_id?: true
    user_id?: true
    joined_at?: true
    left_at?: true
    is_active?: true
  }

  export type Conversation_participantsCountAggregateInputType = {
    id?: true
    conversation_id?: true
    user_id?: true
    joined_at?: true
    left_at?: true
    is_active?: true
    _all?: true
  }

  export type Conversation_participantsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which conversation_participants to aggregate.
     */
    where?: conversation_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conversation_participants to fetch.
     */
    orderBy?: conversation_participantsOrderByWithRelationInput | conversation_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: conversation_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conversation_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conversation_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned conversation_participants
    **/
    _count?: true | Conversation_participantsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Conversation_participantsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Conversation_participantsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Conversation_participantsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Conversation_participantsMaxAggregateInputType
  }

  export type GetConversation_participantsAggregateType<T extends Conversation_participantsAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation_participants]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation_participants[P]>
      : GetScalarType<T[P], AggregateConversation_participants[P]>
  }




  export type conversation_participantsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: conversation_participantsWhereInput
    orderBy?: conversation_participantsOrderByWithAggregationInput | conversation_participantsOrderByWithAggregationInput[]
    by: Conversation_participantsScalarFieldEnum[] | Conversation_participantsScalarFieldEnum
    having?: conversation_participantsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Conversation_participantsCountAggregateInputType | true
    _avg?: Conversation_participantsAvgAggregateInputType
    _sum?: Conversation_participantsSumAggregateInputType
    _min?: Conversation_participantsMinAggregateInputType
    _max?: Conversation_participantsMaxAggregateInputType
  }

  export type Conversation_participantsGroupByOutputType = {
    id: number
    conversation_id: number
    user_id: number
    joined_at: Date
    left_at: Date | null
    is_active: boolean
    _count: Conversation_participantsCountAggregateOutputType | null
    _avg: Conversation_participantsAvgAggregateOutputType | null
    _sum: Conversation_participantsSumAggregateOutputType | null
    _min: Conversation_participantsMinAggregateOutputType | null
    _max: Conversation_participantsMaxAggregateOutputType | null
  }

  type GetConversation_participantsGroupByPayload<T extends conversation_participantsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Conversation_participantsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Conversation_participantsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Conversation_participantsGroupByOutputType[P]>
            : GetScalarType<T[P], Conversation_participantsGroupByOutputType[P]>
        }
      >
    >


  export type conversation_participantsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversation_id?: boolean
    user_id?: boolean
    joined_at?: boolean
    left_at?: boolean
    is_active?: boolean
    conversations?: boolean | conversationsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation_participants"]>

  export type conversation_participantsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversation_id?: boolean
    user_id?: boolean
    joined_at?: boolean
    left_at?: boolean
    is_active?: boolean
    conversations?: boolean | conversationsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation_participants"]>

  export type conversation_participantsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversation_id?: boolean
    user_id?: boolean
    joined_at?: boolean
    left_at?: boolean
    is_active?: boolean
    conversations?: boolean | conversationsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation_participants"]>

  export type conversation_participantsSelectScalar = {
    id?: boolean
    conversation_id?: boolean
    user_id?: boolean
    joined_at?: boolean
    left_at?: boolean
    is_active?: boolean
  }

  export type conversation_participantsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversation_id" | "user_id" | "joined_at" | "left_at" | "is_active", ExtArgs["result"]["conversation_participants"]>
  export type conversation_participantsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | conversationsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type conversation_participantsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | conversationsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type conversation_participantsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | conversationsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $conversation_participantsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "conversation_participants"
    objects: {
      conversations: Prisma.$conversationsPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      conversation_id: number
      user_id: number
      joined_at: Date
      left_at: Date | null
      is_active: boolean
    }, ExtArgs["result"]["conversation_participants"]>
    composites: {}
  }

  type conversation_participantsGetPayload<S extends boolean | null | undefined | conversation_participantsDefaultArgs> = $Result.GetResult<Prisma.$conversation_participantsPayload, S>

  type conversation_participantsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<conversation_participantsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Conversation_participantsCountAggregateInputType | true
    }

  export interface conversation_participantsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['conversation_participants'], meta: { name: 'conversation_participants' } }
    /**
     * Find zero or one Conversation_participants that matches the filter.
     * @param {conversation_participantsFindUniqueArgs} args - Arguments to find a Conversation_participants
     * @example
     * // Get one Conversation_participants
     * const conversation_participants = await prisma.conversation_participants.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends conversation_participantsFindUniqueArgs>(args: SelectSubset<T, conversation_participantsFindUniqueArgs<ExtArgs>>): Prisma__conversation_participantsClient<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conversation_participants that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {conversation_participantsFindUniqueOrThrowArgs} args - Arguments to find a Conversation_participants
     * @example
     * // Get one Conversation_participants
     * const conversation_participants = await prisma.conversation_participants.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends conversation_participantsFindUniqueOrThrowArgs>(args: SelectSubset<T, conversation_participantsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__conversation_participantsClient<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation_participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conversation_participantsFindFirstArgs} args - Arguments to find a Conversation_participants
     * @example
     * // Get one Conversation_participants
     * const conversation_participants = await prisma.conversation_participants.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends conversation_participantsFindFirstArgs>(args?: SelectSubset<T, conversation_participantsFindFirstArgs<ExtArgs>>): Prisma__conversation_participantsClient<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conversation_participants that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conversation_participantsFindFirstOrThrowArgs} args - Arguments to find a Conversation_participants
     * @example
     * // Get one Conversation_participants
     * const conversation_participants = await prisma.conversation_participants.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends conversation_participantsFindFirstOrThrowArgs>(args?: SelectSubset<T, conversation_participantsFindFirstOrThrowArgs<ExtArgs>>): Prisma__conversation_participantsClient<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conversation_participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conversation_participantsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversation_participants
     * const conversation_participants = await prisma.conversation_participants.findMany()
     * 
     * // Get first 10 Conversation_participants
     * const conversation_participants = await prisma.conversation_participants.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversation_participantsWithIdOnly = await prisma.conversation_participants.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends conversation_participantsFindManyArgs>(args?: SelectSubset<T, conversation_participantsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conversation_participants.
     * @param {conversation_participantsCreateArgs} args - Arguments to create a Conversation_participants.
     * @example
     * // Create one Conversation_participants
     * const Conversation_participants = await prisma.conversation_participants.create({
     *   data: {
     *     // ... data to create a Conversation_participants
     *   }
     * })
     * 
     */
    create<T extends conversation_participantsCreateArgs>(args: SelectSubset<T, conversation_participantsCreateArgs<ExtArgs>>): Prisma__conversation_participantsClient<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conversation_participants.
     * @param {conversation_participantsCreateManyArgs} args - Arguments to create many Conversation_participants.
     * @example
     * // Create many Conversation_participants
     * const conversation_participants = await prisma.conversation_participants.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends conversation_participantsCreateManyArgs>(args?: SelectSubset<T, conversation_participantsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversation_participants and returns the data saved in the database.
     * @param {conversation_participantsCreateManyAndReturnArgs} args - Arguments to create many Conversation_participants.
     * @example
     * // Create many Conversation_participants
     * const conversation_participants = await prisma.conversation_participants.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversation_participants and only return the `id`
     * const conversation_participantsWithIdOnly = await prisma.conversation_participants.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends conversation_participantsCreateManyAndReturnArgs>(args?: SelectSubset<T, conversation_participantsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conversation_participants.
     * @param {conversation_participantsDeleteArgs} args - Arguments to delete one Conversation_participants.
     * @example
     * // Delete one Conversation_participants
     * const Conversation_participants = await prisma.conversation_participants.delete({
     *   where: {
     *     // ... filter to delete one Conversation_participants
     *   }
     * })
     * 
     */
    delete<T extends conversation_participantsDeleteArgs>(args: SelectSubset<T, conversation_participantsDeleteArgs<ExtArgs>>): Prisma__conversation_participantsClient<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conversation_participants.
     * @param {conversation_participantsUpdateArgs} args - Arguments to update one Conversation_participants.
     * @example
     * // Update one Conversation_participants
     * const conversation_participants = await prisma.conversation_participants.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends conversation_participantsUpdateArgs>(args: SelectSubset<T, conversation_participantsUpdateArgs<ExtArgs>>): Prisma__conversation_participantsClient<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conversation_participants.
     * @param {conversation_participantsDeleteManyArgs} args - Arguments to filter Conversation_participants to delete.
     * @example
     * // Delete a few Conversation_participants
     * const { count } = await prisma.conversation_participants.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends conversation_participantsDeleteManyArgs>(args?: SelectSubset<T, conversation_participantsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversation_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conversation_participantsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversation_participants
     * const conversation_participants = await prisma.conversation_participants.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends conversation_participantsUpdateManyArgs>(args: SelectSubset<T, conversation_participantsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversation_participants and returns the data updated in the database.
     * @param {conversation_participantsUpdateManyAndReturnArgs} args - Arguments to update many Conversation_participants.
     * @example
     * // Update many Conversation_participants
     * const conversation_participants = await prisma.conversation_participants.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversation_participants and only return the `id`
     * const conversation_participantsWithIdOnly = await prisma.conversation_participants.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends conversation_participantsUpdateManyAndReturnArgs>(args: SelectSubset<T, conversation_participantsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conversation_participants.
     * @param {conversation_participantsUpsertArgs} args - Arguments to update or create a Conversation_participants.
     * @example
     * // Update or create a Conversation_participants
     * const conversation_participants = await prisma.conversation_participants.upsert({
     *   create: {
     *     // ... data to create a Conversation_participants
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation_participants we want to update
     *   }
     * })
     */
    upsert<T extends conversation_participantsUpsertArgs>(args: SelectSubset<T, conversation_participantsUpsertArgs<ExtArgs>>): Prisma__conversation_participantsClient<$Result.GetResult<Prisma.$conversation_participantsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conversation_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conversation_participantsCountArgs} args - Arguments to filter Conversation_participants to count.
     * @example
     * // Count the number of Conversation_participants
     * const count = await prisma.conversation_participants.count({
     *   where: {
     *     // ... the filter for the Conversation_participants we want to count
     *   }
     * })
    **/
    count<T extends conversation_participantsCountArgs>(
      args?: Subset<T, conversation_participantsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Conversation_participantsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Conversation_participantsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Conversation_participantsAggregateArgs>(args: Subset<T, Conversation_participantsAggregateArgs>): Prisma.PrismaPromise<GetConversation_participantsAggregateType<T>>

    /**
     * Group by Conversation_participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conversation_participantsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends conversation_participantsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: conversation_participantsGroupByArgs['orderBy'] }
        : { orderBy?: conversation_participantsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, conversation_participantsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversation_participantsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the conversation_participants model
   */
  readonly fields: conversation_participantsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for conversation_participants.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__conversation_participantsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversations<T extends conversationsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, conversationsDefaultArgs<ExtArgs>>): Prisma__conversationsClient<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the conversation_participants model
   */
  interface conversation_participantsFieldRefs {
    readonly id: FieldRef<"conversation_participants", 'Int'>
    readonly conversation_id: FieldRef<"conversation_participants", 'Int'>
    readonly user_id: FieldRef<"conversation_participants", 'Int'>
    readonly joined_at: FieldRef<"conversation_participants", 'DateTime'>
    readonly left_at: FieldRef<"conversation_participants", 'DateTime'>
    readonly is_active: FieldRef<"conversation_participants", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * conversation_participants findUnique
   */
  export type conversation_participantsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsInclude<ExtArgs> | null
    /**
     * Filter, which conversation_participants to fetch.
     */
    where: conversation_participantsWhereUniqueInput
  }

  /**
   * conversation_participants findUniqueOrThrow
   */
  export type conversation_participantsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsInclude<ExtArgs> | null
    /**
     * Filter, which conversation_participants to fetch.
     */
    where: conversation_participantsWhereUniqueInput
  }

  /**
   * conversation_participants findFirst
   */
  export type conversation_participantsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsInclude<ExtArgs> | null
    /**
     * Filter, which conversation_participants to fetch.
     */
    where?: conversation_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conversation_participants to fetch.
     */
    orderBy?: conversation_participantsOrderByWithRelationInput | conversation_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for conversation_participants.
     */
    cursor?: conversation_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conversation_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conversation_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of conversation_participants.
     */
    distinct?: Conversation_participantsScalarFieldEnum | Conversation_participantsScalarFieldEnum[]
  }

  /**
   * conversation_participants findFirstOrThrow
   */
  export type conversation_participantsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsInclude<ExtArgs> | null
    /**
     * Filter, which conversation_participants to fetch.
     */
    where?: conversation_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conversation_participants to fetch.
     */
    orderBy?: conversation_participantsOrderByWithRelationInput | conversation_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for conversation_participants.
     */
    cursor?: conversation_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conversation_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conversation_participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of conversation_participants.
     */
    distinct?: Conversation_participantsScalarFieldEnum | Conversation_participantsScalarFieldEnum[]
  }

  /**
   * conversation_participants findMany
   */
  export type conversation_participantsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsInclude<ExtArgs> | null
    /**
     * Filter, which conversation_participants to fetch.
     */
    where?: conversation_participantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conversation_participants to fetch.
     */
    orderBy?: conversation_participantsOrderByWithRelationInput | conversation_participantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing conversation_participants.
     */
    cursor?: conversation_participantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conversation_participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conversation_participants.
     */
    skip?: number
    distinct?: Conversation_participantsScalarFieldEnum | Conversation_participantsScalarFieldEnum[]
  }

  /**
   * conversation_participants create
   */
  export type conversation_participantsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsInclude<ExtArgs> | null
    /**
     * The data needed to create a conversation_participants.
     */
    data: XOR<conversation_participantsCreateInput, conversation_participantsUncheckedCreateInput>
  }

  /**
   * conversation_participants createMany
   */
  export type conversation_participantsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many conversation_participants.
     */
    data: conversation_participantsCreateManyInput | conversation_participantsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * conversation_participants createManyAndReturn
   */
  export type conversation_participantsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * The data used to create many conversation_participants.
     */
    data: conversation_participantsCreateManyInput | conversation_participantsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * conversation_participants update
   */
  export type conversation_participantsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsInclude<ExtArgs> | null
    /**
     * The data needed to update a conversation_participants.
     */
    data: XOR<conversation_participantsUpdateInput, conversation_participantsUncheckedUpdateInput>
    /**
     * Choose, which conversation_participants to update.
     */
    where: conversation_participantsWhereUniqueInput
  }

  /**
   * conversation_participants updateMany
   */
  export type conversation_participantsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update conversation_participants.
     */
    data: XOR<conversation_participantsUpdateManyMutationInput, conversation_participantsUncheckedUpdateManyInput>
    /**
     * Filter which conversation_participants to update
     */
    where?: conversation_participantsWhereInput
    /**
     * Limit how many conversation_participants to update.
     */
    limit?: number
  }

  /**
   * conversation_participants updateManyAndReturn
   */
  export type conversation_participantsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * The data used to update conversation_participants.
     */
    data: XOR<conversation_participantsUpdateManyMutationInput, conversation_participantsUncheckedUpdateManyInput>
    /**
     * Filter which conversation_participants to update
     */
    where?: conversation_participantsWhereInput
    /**
     * Limit how many conversation_participants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * conversation_participants upsert
   */
  export type conversation_participantsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsInclude<ExtArgs> | null
    /**
     * The filter to search for the conversation_participants to update in case it exists.
     */
    where: conversation_participantsWhereUniqueInput
    /**
     * In case the conversation_participants found by the `where` argument doesn't exist, create a new conversation_participants with this data.
     */
    create: XOR<conversation_participantsCreateInput, conversation_participantsUncheckedCreateInput>
    /**
     * In case the conversation_participants was found with the provided `where` argument, update it with this data.
     */
    update: XOR<conversation_participantsUpdateInput, conversation_participantsUncheckedUpdateInput>
  }

  /**
   * conversation_participants delete
   */
  export type conversation_participantsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsInclude<ExtArgs> | null
    /**
     * Filter which conversation_participants to delete.
     */
    where: conversation_participantsWhereUniqueInput
  }

  /**
   * conversation_participants deleteMany
   */
  export type conversation_participantsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which conversation_participants to delete
     */
    where?: conversation_participantsWhereInput
    /**
     * Limit how many conversation_participants to delete.
     */
    limit?: number
  }

  /**
   * conversation_participants without action
   */
  export type conversation_participantsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conversation_participants
     */
    select?: conversation_participantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conversation_participants
     */
    omit?: conversation_participantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conversation_participantsInclude<ExtArgs> | null
  }


  /**
   * Model messages
   */

  export type AggregateMessages = {
    _count: MessagesCountAggregateOutputType | null
    _avg: MessagesAvgAggregateOutputType | null
    _sum: MessagesSumAggregateOutputType | null
    _min: MessagesMinAggregateOutputType | null
    _max: MessagesMaxAggregateOutputType | null
  }

  export type MessagesAvgAggregateOutputType = {
    id: number | null
    conversation_id: number | null
    sender_id: number | null
  }

  export type MessagesSumAggregateOutputType = {
    id: number | null
    conversation_id: number | null
    sender_id: number | null
  }

  export type MessagesMinAggregateOutputType = {
    id: number | null
    conversation_id: number | null
    sender_id: number | null
    content: string | null
    sent_at: Date | null
    read_at: Date | null
    is_deleted: boolean | null
  }

  export type MessagesMaxAggregateOutputType = {
    id: number | null
    conversation_id: number | null
    sender_id: number | null
    content: string | null
    sent_at: Date | null
    read_at: Date | null
    is_deleted: boolean | null
  }

  export type MessagesCountAggregateOutputType = {
    id: number
    conversation_id: number
    sender_id: number
    content: number
    sent_at: number
    read_at: number
    is_deleted: number
    _all: number
  }


  export type MessagesAvgAggregateInputType = {
    id?: true
    conversation_id?: true
    sender_id?: true
  }

  export type MessagesSumAggregateInputType = {
    id?: true
    conversation_id?: true
    sender_id?: true
  }

  export type MessagesMinAggregateInputType = {
    id?: true
    conversation_id?: true
    sender_id?: true
    content?: true
    sent_at?: true
    read_at?: true
    is_deleted?: true
  }

  export type MessagesMaxAggregateInputType = {
    id?: true
    conversation_id?: true
    sender_id?: true
    content?: true
    sent_at?: true
    read_at?: true
    is_deleted?: true
  }

  export type MessagesCountAggregateInputType = {
    id?: true
    conversation_id?: true
    sender_id?: true
    content?: true
    sent_at?: true
    read_at?: true
    is_deleted?: true
    _all?: true
  }

  export type MessagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which messages to aggregate.
     */
    where?: messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     */
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned messages
    **/
    _count?: true | MessagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MessagesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MessagesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessagesMaxAggregateInputType
  }

  export type GetMessagesAggregateType<T extends MessagesAggregateArgs> = {
        [P in keyof T & keyof AggregateMessages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessages[P]>
      : GetScalarType<T[P], AggregateMessages[P]>
  }




  export type messagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: messagesWhereInput
    orderBy?: messagesOrderByWithAggregationInput | messagesOrderByWithAggregationInput[]
    by: MessagesScalarFieldEnum[] | MessagesScalarFieldEnum
    having?: messagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessagesCountAggregateInputType | true
    _avg?: MessagesAvgAggregateInputType
    _sum?: MessagesSumAggregateInputType
    _min?: MessagesMinAggregateInputType
    _max?: MessagesMaxAggregateInputType
  }

  export type MessagesGroupByOutputType = {
    id: number
    conversation_id: number
    sender_id: number
    content: string
    sent_at: Date
    read_at: Date | null
    is_deleted: boolean
    _count: MessagesCountAggregateOutputType | null
    _avg: MessagesAvgAggregateOutputType | null
    _sum: MessagesSumAggregateOutputType | null
    _min: MessagesMinAggregateOutputType | null
    _max: MessagesMaxAggregateOutputType | null
  }

  type GetMessagesGroupByPayload<T extends messagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessagesGroupByOutputType[P]>
            : GetScalarType<T[P], MessagesGroupByOutputType[P]>
        }
      >
    >


  export type messagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversation_id?: boolean
    sender_id?: boolean
    content?: boolean
    sent_at?: boolean
    read_at?: boolean
    is_deleted?: boolean
    conversations?: boolean | conversationsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messages"]>

  export type messagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversation_id?: boolean
    sender_id?: boolean
    content?: boolean
    sent_at?: boolean
    read_at?: boolean
    is_deleted?: boolean
    conversations?: boolean | conversationsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messages"]>

  export type messagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversation_id?: boolean
    sender_id?: boolean
    content?: boolean
    sent_at?: boolean
    read_at?: boolean
    is_deleted?: boolean
    conversations?: boolean | conversationsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["messages"]>

  export type messagesSelectScalar = {
    id?: boolean
    conversation_id?: boolean
    sender_id?: boolean
    content?: boolean
    sent_at?: boolean
    read_at?: boolean
    is_deleted?: boolean
  }

  export type messagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversation_id" | "sender_id" | "content" | "sent_at" | "read_at" | "is_deleted", ExtArgs["result"]["messages"]>
  export type messagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | conversationsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type messagesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | conversationsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type messagesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | conversationsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $messagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "messages"
    objects: {
      conversations: Prisma.$conversationsPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      conversation_id: number
      sender_id: number
      content: string
      sent_at: Date
      read_at: Date | null
      is_deleted: boolean
    }, ExtArgs["result"]["messages"]>
    composites: {}
  }

  type messagesGetPayload<S extends boolean | null | undefined | messagesDefaultArgs> = $Result.GetResult<Prisma.$messagesPayload, S>

  type messagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<messagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessagesCountAggregateInputType | true
    }

  export interface messagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['messages'], meta: { name: 'messages' } }
    /**
     * Find zero or one Messages that matches the filter.
     * @param {messagesFindUniqueArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends messagesFindUniqueArgs>(args: SelectSubset<T, messagesFindUniqueArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Messages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {messagesFindUniqueOrThrowArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends messagesFindUniqueOrThrowArgs>(args: SelectSubset<T, messagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesFindFirstArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends messagesFindFirstArgs>(args?: SelectSubset<T, messagesFindFirstArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Messages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesFindFirstOrThrowArgs} args - Arguments to find a Messages
     * @example
     * // Get one Messages
     * const messages = await prisma.messages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends messagesFindFirstOrThrowArgs>(args?: SelectSubset<T, messagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.messages.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.messages.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messagesWithIdOnly = await prisma.messages.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends messagesFindManyArgs>(args?: SelectSubset<T, messagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Messages.
     * @param {messagesCreateArgs} args - Arguments to create a Messages.
     * @example
     * // Create one Messages
     * const Messages = await prisma.messages.create({
     *   data: {
     *     // ... data to create a Messages
     *   }
     * })
     * 
     */
    create<T extends messagesCreateArgs>(args: SelectSubset<T, messagesCreateArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {messagesCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const messages = await prisma.messages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends messagesCreateManyArgs>(args?: SelectSubset<T, messagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {messagesCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const messages = await prisma.messages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messagesWithIdOnly = await prisma.messages.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends messagesCreateManyAndReturnArgs>(args?: SelectSubset<T, messagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Messages.
     * @param {messagesDeleteArgs} args - Arguments to delete one Messages.
     * @example
     * // Delete one Messages
     * const Messages = await prisma.messages.delete({
     *   where: {
     *     // ... filter to delete one Messages
     *   }
     * })
     * 
     */
    delete<T extends messagesDeleteArgs>(args: SelectSubset<T, messagesDeleteArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Messages.
     * @param {messagesUpdateArgs} args - Arguments to update one Messages.
     * @example
     * // Update one Messages
     * const messages = await prisma.messages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends messagesUpdateArgs>(args: SelectSubset<T, messagesUpdateArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {messagesDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.messages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends messagesDeleteManyArgs>(args?: SelectSubset<T, messagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const messages = await prisma.messages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends messagesUpdateManyArgs>(args: SelectSubset<T, messagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {messagesUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const messages = await prisma.messages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messagesWithIdOnly = await prisma.messages.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends messagesUpdateManyAndReturnArgs>(args: SelectSubset<T, messagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Messages.
     * @param {messagesUpsertArgs} args - Arguments to update or create a Messages.
     * @example
     * // Update or create a Messages
     * const messages = await prisma.messages.upsert({
     *   create: {
     *     // ... data to create a Messages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Messages we want to update
     *   }
     * })
     */
    upsert<T extends messagesUpsertArgs>(args: SelectSubset<T, messagesUpsertArgs<ExtArgs>>): Prisma__messagesClient<$Result.GetResult<Prisma.$messagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.messages.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends messagesCountArgs>(
      args?: Subset<T, messagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessagesAggregateArgs>(args: Subset<T, MessagesAggregateArgs>): Prisma.PrismaPromise<GetMessagesAggregateType<T>>

    /**
     * Group by Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {messagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends messagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: messagesGroupByArgs['orderBy'] }
        : { orderBy?: messagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, messagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the messages model
   */
  readonly fields: messagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for messages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__messagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversations<T extends conversationsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, conversationsDefaultArgs<ExtArgs>>): Prisma__conversationsClient<$Result.GetResult<Prisma.$conversationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the messages model
   */
  interface messagesFieldRefs {
    readonly id: FieldRef<"messages", 'Int'>
    readonly conversation_id: FieldRef<"messages", 'Int'>
    readonly sender_id: FieldRef<"messages", 'Int'>
    readonly content: FieldRef<"messages", 'String'>
    readonly sent_at: FieldRef<"messages", 'DateTime'>
    readonly read_at: FieldRef<"messages", 'DateTime'>
    readonly is_deleted: FieldRef<"messages", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * messages findUnique
   */
  export type messagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where: messagesWhereUniqueInput
  }

  /**
   * messages findUniqueOrThrow
   */
  export type messagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where: messagesWhereUniqueInput
  }

  /**
   * messages findFirst
   */
  export type messagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where?: messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     */
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for messages.
     */
    cursor?: messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of messages.
     */
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * messages findFirstOrThrow
   */
  export type messagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where?: messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     */
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for messages.
     */
    cursor?: messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of messages.
     */
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * messages findMany
   */
  export type messagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter, which messages to fetch.
     */
    where?: messagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of messages to fetch.
     */
    orderBy?: messagesOrderByWithRelationInput | messagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing messages.
     */
    cursor?: messagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` messages.
     */
    skip?: number
    distinct?: MessagesScalarFieldEnum | MessagesScalarFieldEnum[]
  }

  /**
   * messages create
   */
  export type messagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * The data needed to create a messages.
     */
    data: XOR<messagesCreateInput, messagesUncheckedCreateInput>
  }

  /**
   * messages createMany
   */
  export type messagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many messages.
     */
    data: messagesCreateManyInput | messagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * messages createManyAndReturn
   */
  export type messagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * The data used to create many messages.
     */
    data: messagesCreateManyInput | messagesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * messages update
   */
  export type messagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * The data needed to update a messages.
     */
    data: XOR<messagesUpdateInput, messagesUncheckedUpdateInput>
    /**
     * Choose, which messages to update.
     */
    where: messagesWhereUniqueInput
  }

  /**
   * messages updateMany
   */
  export type messagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update messages.
     */
    data: XOR<messagesUpdateManyMutationInput, messagesUncheckedUpdateManyInput>
    /**
     * Filter which messages to update
     */
    where?: messagesWhereInput
    /**
     * Limit how many messages to update.
     */
    limit?: number
  }

  /**
   * messages updateManyAndReturn
   */
  export type messagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * The data used to update messages.
     */
    data: XOR<messagesUpdateManyMutationInput, messagesUncheckedUpdateManyInput>
    /**
     * Filter which messages to update
     */
    where?: messagesWhereInput
    /**
     * Limit how many messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * messages upsert
   */
  export type messagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * The filter to search for the messages to update in case it exists.
     */
    where: messagesWhereUniqueInput
    /**
     * In case the messages found by the `where` argument doesn't exist, create a new messages with this data.
     */
    create: XOR<messagesCreateInput, messagesUncheckedCreateInput>
    /**
     * In case the messages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<messagesUpdateInput, messagesUncheckedUpdateInput>
  }

  /**
   * messages delete
   */
  export type messagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
    /**
     * Filter which messages to delete.
     */
    where: messagesWhereUniqueInput
  }

  /**
   * messages deleteMany
   */
  export type messagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which messages to delete
     */
    where?: messagesWhereInput
    /**
     * Limit how many messages to delete.
     */
    limit?: number
  }

  /**
   * messages without action
   */
  export type messagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the messages
     */
    select?: messagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the messages
     */
    omit?: messagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: messagesInclude<ExtArgs> | null
  }


  /**
   * Model notifications
   */

  export type AggregateNotifications = {
    _count: NotificationsCountAggregateOutputType | null
    _avg: NotificationsAvgAggregateOutputType | null
    _sum: NotificationsSumAggregateOutputType | null
    _min: NotificationsMinAggregateOutputType | null
    _max: NotificationsMaxAggregateOutputType | null
  }

  export type NotificationsAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    sender_id: number | null
  }

  export type NotificationsSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    sender_id: number | null
  }

  export type NotificationsMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    type: string | null
    content: string | null
    sender_id: number | null
    created_at: Date | null
    read_at: Date | null
    is_read: boolean | null
  }

  export type NotificationsMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    type: string | null
    content: string | null
    sender_id: number | null
    created_at: Date | null
    read_at: Date | null
    is_read: boolean | null
  }

  export type NotificationsCountAggregateOutputType = {
    id: number
    user_id: number
    type: number
    content: number
    sender_id: number
    created_at: number
    read_at: number
    is_read: number
    _all: number
  }


  export type NotificationsAvgAggregateInputType = {
    id?: true
    user_id?: true
    sender_id?: true
  }

  export type NotificationsSumAggregateInputType = {
    id?: true
    user_id?: true
    sender_id?: true
  }

  export type NotificationsMinAggregateInputType = {
    id?: true
    user_id?: true
    type?: true
    content?: true
    sender_id?: true
    created_at?: true
    read_at?: true
    is_read?: true
  }

  export type NotificationsMaxAggregateInputType = {
    id?: true
    user_id?: true
    type?: true
    content?: true
    sender_id?: true
    created_at?: true
    read_at?: true
    is_read?: true
  }

  export type NotificationsCountAggregateInputType = {
    id?: true
    user_id?: true
    type?: true
    content?: true
    sender_id?: true
    created_at?: true
    read_at?: true
    is_read?: true
    _all?: true
  }

  export type NotificationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notifications to aggregate.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned notifications
    **/
    _count?: true | NotificationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationsMaxAggregateInputType
  }

  export type GetNotificationsAggregateType<T extends NotificationsAggregateArgs> = {
        [P in keyof T & keyof AggregateNotifications]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotifications[P]>
      : GetScalarType<T[P], AggregateNotifications[P]>
  }




  export type notificationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notificationsWhereInput
    orderBy?: notificationsOrderByWithAggregationInput | notificationsOrderByWithAggregationInput[]
    by: NotificationsScalarFieldEnum[] | NotificationsScalarFieldEnum
    having?: notificationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationsCountAggregateInputType | true
    _avg?: NotificationsAvgAggregateInputType
    _sum?: NotificationsSumAggregateInputType
    _min?: NotificationsMinAggregateInputType
    _max?: NotificationsMaxAggregateInputType
  }

  export type NotificationsGroupByOutputType = {
    id: number
    user_id: number
    type: string
    content: string
    sender_id: number | null
    created_at: Date
    read_at: Date | null
    is_read: boolean
    _count: NotificationsCountAggregateOutputType | null
    _avg: NotificationsAvgAggregateOutputType | null
    _sum: NotificationsSumAggregateOutputType | null
    _min: NotificationsMinAggregateOutputType | null
    _max: NotificationsMaxAggregateOutputType | null
  }

  type GetNotificationsGroupByPayload<T extends notificationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationsGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationsGroupByOutputType[P]>
        }
      >
    >


  export type notificationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    type?: boolean
    content?: boolean
    sender_id?: boolean
    created_at?: boolean
    read_at?: boolean
    is_read?: boolean
    users_notifications_user_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_notifications_sender_idTousers?: boolean | notifications$users_notifications_sender_idTousersArgs<ExtArgs>
  }, ExtArgs["result"]["notifications"]>

  export type notificationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    type?: boolean
    content?: boolean
    sender_id?: boolean
    created_at?: boolean
    read_at?: boolean
    is_read?: boolean
    users_notifications_user_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_notifications_sender_idTousers?: boolean | notifications$users_notifications_sender_idTousersArgs<ExtArgs>
  }, ExtArgs["result"]["notifications"]>

  export type notificationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    type?: boolean
    content?: boolean
    sender_id?: boolean
    created_at?: boolean
    read_at?: boolean
    is_read?: boolean
    users_notifications_user_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_notifications_sender_idTousers?: boolean | notifications$users_notifications_sender_idTousersArgs<ExtArgs>
  }, ExtArgs["result"]["notifications"]>

  export type notificationsSelectScalar = {
    id?: boolean
    user_id?: boolean
    type?: boolean
    content?: boolean
    sender_id?: boolean
    created_at?: boolean
    read_at?: boolean
    is_read?: boolean
  }

  export type notificationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "type" | "content" | "sender_id" | "created_at" | "read_at" | "is_read", ExtArgs["result"]["notifications"]>
  export type notificationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_notifications_user_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_notifications_sender_idTousers?: boolean | notifications$users_notifications_sender_idTousersArgs<ExtArgs>
  }
  export type notificationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_notifications_user_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_notifications_sender_idTousers?: boolean | notifications$users_notifications_sender_idTousersArgs<ExtArgs>
  }
  export type notificationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users_notifications_user_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    users_notifications_sender_idTousers?: boolean | notifications$users_notifications_sender_idTousersArgs<ExtArgs>
  }

  export type $notificationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "notifications"
    objects: {
      users_notifications_user_idTousers: Prisma.$usersPayload<ExtArgs>
      users_notifications_sender_idTousers: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      type: string
      content: string
      sender_id: number | null
      created_at: Date
      read_at: Date | null
      is_read: boolean
    }, ExtArgs["result"]["notifications"]>
    composites: {}
  }

  type notificationsGetPayload<S extends boolean | null | undefined | notificationsDefaultArgs> = $Result.GetResult<Prisma.$notificationsPayload, S>

  type notificationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<notificationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationsCountAggregateInputType | true
    }

  export interface notificationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['notifications'], meta: { name: 'notifications' } }
    /**
     * Find zero or one Notifications that matches the filter.
     * @param {notificationsFindUniqueArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends notificationsFindUniqueArgs>(args: SelectSubset<T, notificationsFindUniqueArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notifications that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {notificationsFindUniqueOrThrowArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends notificationsFindUniqueOrThrowArgs>(args: SelectSubset<T, notificationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsFindFirstArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends notificationsFindFirstArgs>(args?: SelectSubset<T, notificationsFindFirstArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notifications that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsFindFirstOrThrowArgs} args - Arguments to find a Notifications
     * @example
     * // Get one Notifications
     * const notifications = await prisma.notifications.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends notificationsFindFirstOrThrowArgs>(args?: SelectSubset<T, notificationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notifications.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notifications.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationsWithIdOnly = await prisma.notifications.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends notificationsFindManyArgs>(args?: SelectSubset<T, notificationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notifications.
     * @param {notificationsCreateArgs} args - Arguments to create a Notifications.
     * @example
     * // Create one Notifications
     * const Notifications = await prisma.notifications.create({
     *   data: {
     *     // ... data to create a Notifications
     *   }
     * })
     * 
     */
    create<T extends notificationsCreateArgs>(args: SelectSubset<T, notificationsCreateArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {notificationsCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notifications = await prisma.notifications.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends notificationsCreateManyArgs>(args?: SelectSubset<T, notificationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {notificationsCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notifications = await prisma.notifications.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationsWithIdOnly = await prisma.notifications.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends notificationsCreateManyAndReturnArgs>(args?: SelectSubset<T, notificationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notifications.
     * @param {notificationsDeleteArgs} args - Arguments to delete one Notifications.
     * @example
     * // Delete one Notifications
     * const Notifications = await prisma.notifications.delete({
     *   where: {
     *     // ... filter to delete one Notifications
     *   }
     * })
     * 
     */
    delete<T extends notificationsDeleteArgs>(args: SelectSubset<T, notificationsDeleteArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notifications.
     * @param {notificationsUpdateArgs} args - Arguments to update one Notifications.
     * @example
     * // Update one Notifications
     * const notifications = await prisma.notifications.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends notificationsUpdateArgs>(args: SelectSubset<T, notificationsUpdateArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {notificationsDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notifications.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends notificationsDeleteManyArgs>(args?: SelectSubset<T, notificationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notifications = await prisma.notifications.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends notificationsUpdateManyArgs>(args: SelectSubset<T, notificationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {notificationsUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notifications = await prisma.notifications.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationsWithIdOnly = await prisma.notifications.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends notificationsUpdateManyAndReturnArgs>(args: SelectSubset<T, notificationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notifications.
     * @param {notificationsUpsertArgs} args - Arguments to update or create a Notifications.
     * @example
     * // Update or create a Notifications
     * const notifications = await prisma.notifications.upsert({
     *   create: {
     *     // ... data to create a Notifications
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notifications we want to update
     *   }
     * })
     */
    upsert<T extends notificationsUpsertArgs>(args: SelectSubset<T, notificationsUpsertArgs<ExtArgs>>): Prisma__notificationsClient<$Result.GetResult<Prisma.$notificationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notifications.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends notificationsCountArgs>(
      args?: Subset<T, notificationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationsAggregateArgs>(args: Subset<T, NotificationsAggregateArgs>): Prisma.PrismaPromise<GetNotificationsAggregateType<T>>

    /**
     * Group by Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notificationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends notificationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: notificationsGroupByArgs['orderBy'] }
        : { orderBy?: notificationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, notificationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the notifications model
   */
  readonly fields: notificationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for notifications.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__notificationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users_notifications_user_idTousers<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users_notifications_sender_idTousers<T extends notifications$users_notifications_sender_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, notifications$users_notifications_sender_idTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the notifications model
   */
  interface notificationsFieldRefs {
    readonly id: FieldRef<"notifications", 'Int'>
    readonly user_id: FieldRef<"notifications", 'Int'>
    readonly type: FieldRef<"notifications", 'String'>
    readonly content: FieldRef<"notifications", 'String'>
    readonly sender_id: FieldRef<"notifications", 'Int'>
    readonly created_at: FieldRef<"notifications", 'DateTime'>
    readonly read_at: FieldRef<"notifications", 'DateTime'>
    readonly is_read: FieldRef<"notifications", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * notifications findUnique
   */
  export type notificationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications findUniqueOrThrow
   */
  export type notificationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications findFirst
   */
  export type notificationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notifications.
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notifications.
     */
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * notifications findFirstOrThrow
   */
  export type notificationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notifications.
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notifications.
     */
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * notifications findMany
   */
  export type notificationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter, which notifications to fetch.
     */
    where?: notificationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notifications to fetch.
     */
    orderBy?: notificationsOrderByWithRelationInput | notificationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing notifications.
     */
    cursor?: notificationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notifications.
     */
    skip?: number
    distinct?: NotificationsScalarFieldEnum | NotificationsScalarFieldEnum[]
  }

  /**
   * notifications create
   */
  export type notificationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * The data needed to create a notifications.
     */
    data: XOR<notificationsCreateInput, notificationsUncheckedCreateInput>
  }

  /**
   * notifications createMany
   */
  export type notificationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many notifications.
     */
    data: notificationsCreateManyInput | notificationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * notifications createManyAndReturn
   */
  export type notificationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * The data used to create many notifications.
     */
    data: notificationsCreateManyInput | notificationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * notifications update
   */
  export type notificationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * The data needed to update a notifications.
     */
    data: XOR<notificationsUpdateInput, notificationsUncheckedUpdateInput>
    /**
     * Choose, which notifications to update.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications updateMany
   */
  export type notificationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update notifications.
     */
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyInput>
    /**
     * Filter which notifications to update
     */
    where?: notificationsWhereInput
    /**
     * Limit how many notifications to update.
     */
    limit?: number
  }

  /**
   * notifications updateManyAndReturn
   */
  export type notificationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * The data used to update notifications.
     */
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyInput>
    /**
     * Filter which notifications to update
     */
    where?: notificationsWhereInput
    /**
     * Limit how many notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * notifications upsert
   */
  export type notificationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * The filter to search for the notifications to update in case it exists.
     */
    where: notificationsWhereUniqueInput
    /**
     * In case the notifications found by the `where` argument doesn't exist, create a new notifications with this data.
     */
    create: XOR<notificationsCreateInput, notificationsUncheckedCreateInput>
    /**
     * In case the notifications was found with the provided `where` argument, update it with this data.
     */
    update: XOR<notificationsUpdateInput, notificationsUncheckedUpdateInput>
  }

  /**
   * notifications delete
   */
  export type notificationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
    /**
     * Filter which notifications to delete.
     */
    where: notificationsWhereUniqueInput
  }

  /**
   * notifications deleteMany
   */
  export type notificationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notifications to delete
     */
    where?: notificationsWhereInput
    /**
     * Limit how many notifications to delete.
     */
    limit?: number
  }

  /**
   * notifications.users_notifications_sender_idTousers
   */
  export type notifications$users_notifications_sender_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * notifications without action
   */
  export type notificationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notifications
     */
    select?: notificationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notifications
     */
    omit?: notificationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notificationsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Call_participantsScalarFieldEnum: {
    id: 'id',
    call_id: 'call_id',
    user_id: 'user_id',
    joined_at: 'joined_at',
    left_at: 'left_at',
    is_active: 'is_active'
  };

  export type Call_participantsScalarFieldEnum = (typeof Call_participantsScalarFieldEnum)[keyof typeof Call_participantsScalarFieldEnum]


  export const CallsScalarFieldEnum: {
    id: 'id',
    document_id: 'document_id',
    initiated_by: 'initiated_by',
    started_at: 'started_at',
    ended_at: 'ended_at',
    call_type: 'call_type',
    status: 'status'
  };

  export type CallsScalarFieldEnum = (typeof CallsScalarFieldEnum)[keyof typeof CallsScalarFieldEnum]


  export const Document_versionsScalarFieldEnum: {
    id: 'id',
    document_id: 'document_id',
    version_number: 'version_number',
    title: 'title',
    content: 'content',
    file_path: 'file_path',
    file_size: 'file_size',
    file_type: 'file_type',
    modified_by: 'modified_by',
    modification_date: 'modification_date',
    change_summary: 'change_summary',
    is_major_version: 'is_major_version'
  };

  export type Document_versionsScalarFieldEnum = (typeof Document_versionsScalarFieldEnum)[keyof typeof Document_versionsScalarFieldEnum]


  export const DocumentsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    content: 'content',
    file_path: 'file_path',
    file_name: 'file_name',
    file_original_name: 'file_original_name',
    file_type: 'file_type',
    file_size: 'file_size',
    file_extension: 'file_extension',
    file_upload_date: 'file_upload_date',
    owner_id: 'owner_id',
    parent_folder_id: 'parent_folder_id',
    is_folder: 'is_folder',
    is_deleted: 'is_deleted',
    is_public: 'is_public',
    is_template: 'is_template',
    created_at: 'created_at',
    updated_at: 'updated_at',
    last_modified_by: 'last_modified_by',
    last_accessed_at: 'last_accessed_at',
    auto_save_interval: 'auto_save_interval',
    allow_comments: 'allow_comments',
    tags: 'tags',
    metadata: 'metadata'
  };

  export type DocumentsScalarFieldEnum = (typeof DocumentsScalarFieldEnum)[keyof typeof DocumentsScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password_hash: 'password_hash',
    full_name: 'full_name',
    profile_picture: 'profile_picture',
    two_factor_enabled: 'two_factor_enabled',
    two_factor_secret: 'two_factor_secret',
    is_admin: 'is_admin',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at',
    last_login: 'last_login',
    login_attempts: 'login_attempts',
    locked_until: 'locked_until'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const ConversationsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    is_group: 'is_group',
    created_at: 'created_at',
    updated_at: 'updated_at',
    created_by: 'created_by'
  };

  export type ConversationsScalarFieldEnum = (typeof ConversationsScalarFieldEnum)[keyof typeof ConversationsScalarFieldEnum]


  export const Conversation_participantsScalarFieldEnum: {
    id: 'id',
    conversation_id: 'conversation_id',
    user_id: 'user_id',
    joined_at: 'joined_at',
    left_at: 'left_at',
    is_active: 'is_active'
  };

  export type Conversation_participantsScalarFieldEnum = (typeof Conversation_participantsScalarFieldEnum)[keyof typeof Conversation_participantsScalarFieldEnum]


  export const MessagesScalarFieldEnum: {
    id: 'id',
    conversation_id: 'conversation_id',
    sender_id: 'sender_id',
    content: 'content',
    sent_at: 'sent_at',
    read_at: 'read_at',
    is_deleted: 'is_deleted'
  };

  export type MessagesScalarFieldEnum = (typeof MessagesScalarFieldEnum)[keyof typeof MessagesScalarFieldEnum]


  export const NotificationsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    type: 'type',
    content: 'content',
    sender_id: 'sender_id',
    created_at: 'created_at',
    read_at: 'read_at',
    is_read: 'is_read'
  };

  export type NotificationsScalarFieldEnum = (typeof NotificationsScalarFieldEnum)[keyof typeof NotificationsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type call_participantsWhereInput = {
    AND?: call_participantsWhereInput | call_participantsWhereInput[]
    OR?: call_participantsWhereInput[]
    NOT?: call_participantsWhereInput | call_participantsWhereInput[]
    id?: IntFilter<"call_participants"> | number
    call_id?: IntFilter<"call_participants"> | number
    user_id?: IntFilter<"call_participants"> | number
    joined_at?: DateTimeNullableFilter<"call_participants"> | Date | string | null
    left_at?: DateTimeNullableFilter<"call_participants"> | Date | string | null
    is_active?: BoolNullableFilter<"call_participants"> | boolean | null
    calls?: XOR<CallsScalarRelationFilter, callsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type call_participantsOrderByWithRelationInput = {
    id?: SortOrder
    call_id?: SortOrder
    user_id?: SortOrder
    joined_at?: SortOrderInput | SortOrder
    left_at?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    calls?: callsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type call_participantsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    call_id_user_id?: call_participantsCall_id_user_idCompoundUniqueInput
    AND?: call_participantsWhereInput | call_participantsWhereInput[]
    OR?: call_participantsWhereInput[]
    NOT?: call_participantsWhereInput | call_participantsWhereInput[]
    call_id?: IntFilter<"call_participants"> | number
    user_id?: IntFilter<"call_participants"> | number
    joined_at?: DateTimeNullableFilter<"call_participants"> | Date | string | null
    left_at?: DateTimeNullableFilter<"call_participants"> | Date | string | null
    is_active?: BoolNullableFilter<"call_participants"> | boolean | null
    calls?: XOR<CallsScalarRelationFilter, callsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "call_id_user_id">

  export type call_participantsOrderByWithAggregationInput = {
    id?: SortOrder
    call_id?: SortOrder
    user_id?: SortOrder
    joined_at?: SortOrderInput | SortOrder
    left_at?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    _count?: call_participantsCountOrderByAggregateInput
    _avg?: call_participantsAvgOrderByAggregateInput
    _max?: call_participantsMaxOrderByAggregateInput
    _min?: call_participantsMinOrderByAggregateInput
    _sum?: call_participantsSumOrderByAggregateInput
  }

  export type call_participantsScalarWhereWithAggregatesInput = {
    AND?: call_participantsScalarWhereWithAggregatesInput | call_participantsScalarWhereWithAggregatesInput[]
    OR?: call_participantsScalarWhereWithAggregatesInput[]
    NOT?: call_participantsScalarWhereWithAggregatesInput | call_participantsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"call_participants"> | number
    call_id?: IntWithAggregatesFilter<"call_participants"> | number
    user_id?: IntWithAggregatesFilter<"call_participants"> | number
    joined_at?: DateTimeNullableWithAggregatesFilter<"call_participants"> | Date | string | null
    left_at?: DateTimeNullableWithAggregatesFilter<"call_participants"> | Date | string | null
    is_active?: BoolNullableWithAggregatesFilter<"call_participants"> | boolean | null
  }

  export type callsWhereInput = {
    AND?: callsWhereInput | callsWhereInput[]
    OR?: callsWhereInput[]
    NOT?: callsWhereInput | callsWhereInput[]
    id?: IntFilter<"calls"> | number
    document_id?: IntFilter<"calls"> | number
    initiated_by?: IntFilter<"calls"> | number
    started_at?: DateTimeNullableFilter<"calls"> | Date | string | null
    ended_at?: DateTimeNullableFilter<"calls"> | Date | string | null
    call_type?: StringFilter<"calls"> | string
    status?: StringNullableFilter<"calls"> | string | null
    call_participants?: Call_participantsListRelationFilter
    documents?: XOR<DocumentsScalarRelationFilter, documentsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type callsOrderByWithRelationInput = {
    id?: SortOrder
    document_id?: SortOrder
    initiated_by?: SortOrder
    started_at?: SortOrderInput | SortOrder
    ended_at?: SortOrderInput | SortOrder
    call_type?: SortOrder
    status?: SortOrderInput | SortOrder
    call_participants?: call_participantsOrderByRelationAggregateInput
    documents?: documentsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type callsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: callsWhereInput | callsWhereInput[]
    OR?: callsWhereInput[]
    NOT?: callsWhereInput | callsWhereInput[]
    document_id?: IntFilter<"calls"> | number
    initiated_by?: IntFilter<"calls"> | number
    started_at?: DateTimeNullableFilter<"calls"> | Date | string | null
    ended_at?: DateTimeNullableFilter<"calls"> | Date | string | null
    call_type?: StringFilter<"calls"> | string
    status?: StringNullableFilter<"calls"> | string | null
    call_participants?: Call_participantsListRelationFilter
    documents?: XOR<DocumentsScalarRelationFilter, documentsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type callsOrderByWithAggregationInput = {
    id?: SortOrder
    document_id?: SortOrder
    initiated_by?: SortOrder
    started_at?: SortOrderInput | SortOrder
    ended_at?: SortOrderInput | SortOrder
    call_type?: SortOrder
    status?: SortOrderInput | SortOrder
    _count?: callsCountOrderByAggregateInput
    _avg?: callsAvgOrderByAggregateInput
    _max?: callsMaxOrderByAggregateInput
    _min?: callsMinOrderByAggregateInput
    _sum?: callsSumOrderByAggregateInput
  }

  export type callsScalarWhereWithAggregatesInput = {
    AND?: callsScalarWhereWithAggregatesInput | callsScalarWhereWithAggregatesInput[]
    OR?: callsScalarWhereWithAggregatesInput[]
    NOT?: callsScalarWhereWithAggregatesInput | callsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"calls"> | number
    document_id?: IntWithAggregatesFilter<"calls"> | number
    initiated_by?: IntWithAggregatesFilter<"calls"> | number
    started_at?: DateTimeNullableWithAggregatesFilter<"calls"> | Date | string | null
    ended_at?: DateTimeNullableWithAggregatesFilter<"calls"> | Date | string | null
    call_type?: StringWithAggregatesFilter<"calls"> | string
    status?: StringNullableWithAggregatesFilter<"calls"> | string | null
  }

  export type document_versionsWhereInput = {
    AND?: document_versionsWhereInput | document_versionsWhereInput[]
    OR?: document_versionsWhereInput[]
    NOT?: document_versionsWhereInput | document_versionsWhereInput[]
    id?: IntFilter<"document_versions"> | number
    document_id?: IntFilter<"document_versions"> | number
    version_number?: IntFilter<"document_versions"> | number
    title?: StringNullableFilter<"document_versions"> | string | null
    content?: StringNullableFilter<"document_versions"> | string | null
    file_path?: StringNullableFilter<"document_versions"> | string | null
    file_size?: BigIntNullableFilter<"document_versions"> | bigint | number | null
    file_type?: StringNullableFilter<"document_versions"> | string | null
    modified_by?: IntFilter<"document_versions"> | number
    modification_date?: DateTimeFilter<"document_versions"> | Date | string
    change_summary?: StringNullableFilter<"document_versions"> | string | null
    is_major_version?: BoolFilter<"document_versions"> | boolean
    documents?: XOR<DocumentsScalarRelationFilter, documentsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type document_versionsOrderByWithRelationInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    file_path?: SortOrderInput | SortOrder
    file_size?: SortOrderInput | SortOrder
    file_type?: SortOrderInput | SortOrder
    modified_by?: SortOrder
    modification_date?: SortOrder
    change_summary?: SortOrderInput | SortOrder
    is_major_version?: SortOrder
    documents?: documentsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type document_versionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    document_id_version_number?: document_versionsDocument_idVersion_numberCompoundUniqueInput
    AND?: document_versionsWhereInput | document_versionsWhereInput[]
    OR?: document_versionsWhereInput[]
    NOT?: document_versionsWhereInput | document_versionsWhereInput[]
    document_id?: IntFilter<"document_versions"> | number
    version_number?: IntFilter<"document_versions"> | number
    title?: StringNullableFilter<"document_versions"> | string | null
    content?: StringNullableFilter<"document_versions"> | string | null
    file_path?: StringNullableFilter<"document_versions"> | string | null
    file_size?: BigIntNullableFilter<"document_versions"> | bigint | number | null
    file_type?: StringNullableFilter<"document_versions"> | string | null
    modified_by?: IntFilter<"document_versions"> | number
    modification_date?: DateTimeFilter<"document_versions"> | Date | string
    change_summary?: StringNullableFilter<"document_versions"> | string | null
    is_major_version?: BoolFilter<"document_versions"> | boolean
    documents?: XOR<DocumentsScalarRelationFilter, documentsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "document_id_version_number">

  export type document_versionsOrderByWithAggregationInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    file_path?: SortOrderInput | SortOrder
    file_size?: SortOrderInput | SortOrder
    file_type?: SortOrderInput | SortOrder
    modified_by?: SortOrder
    modification_date?: SortOrder
    change_summary?: SortOrderInput | SortOrder
    is_major_version?: SortOrder
    _count?: document_versionsCountOrderByAggregateInput
    _avg?: document_versionsAvgOrderByAggregateInput
    _max?: document_versionsMaxOrderByAggregateInput
    _min?: document_versionsMinOrderByAggregateInput
    _sum?: document_versionsSumOrderByAggregateInput
  }

  export type document_versionsScalarWhereWithAggregatesInput = {
    AND?: document_versionsScalarWhereWithAggregatesInput | document_versionsScalarWhereWithAggregatesInput[]
    OR?: document_versionsScalarWhereWithAggregatesInput[]
    NOT?: document_versionsScalarWhereWithAggregatesInput | document_versionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"document_versions"> | number
    document_id?: IntWithAggregatesFilter<"document_versions"> | number
    version_number?: IntWithAggregatesFilter<"document_versions"> | number
    title?: StringNullableWithAggregatesFilter<"document_versions"> | string | null
    content?: StringNullableWithAggregatesFilter<"document_versions"> | string | null
    file_path?: StringNullableWithAggregatesFilter<"document_versions"> | string | null
    file_size?: BigIntNullableWithAggregatesFilter<"document_versions"> | bigint | number | null
    file_type?: StringNullableWithAggregatesFilter<"document_versions"> | string | null
    modified_by?: IntWithAggregatesFilter<"document_versions"> | number
    modification_date?: DateTimeWithAggregatesFilter<"document_versions"> | Date | string
    change_summary?: StringNullableWithAggregatesFilter<"document_versions"> | string | null
    is_major_version?: BoolWithAggregatesFilter<"document_versions"> | boolean
  }

  export type documentsWhereInput = {
    AND?: documentsWhereInput | documentsWhereInput[]
    OR?: documentsWhereInput[]
    NOT?: documentsWhereInput | documentsWhereInput[]
    id?: IntFilter<"documents"> | number
    title?: StringFilter<"documents"> | string
    description?: StringNullableFilter<"documents"> | string | null
    content?: StringNullableFilter<"documents"> | string | null
    file_path?: StringNullableFilter<"documents"> | string | null
    file_name?: StringNullableFilter<"documents"> | string | null
    file_original_name?: StringNullableFilter<"documents"> | string | null
    file_type?: StringNullableFilter<"documents"> | string | null
    file_size?: BigIntNullableFilter<"documents"> | bigint | number | null
    file_extension?: StringNullableFilter<"documents"> | string | null
    file_upload_date?: DateTimeNullableFilter<"documents"> | Date | string | null
    owner_id?: IntFilter<"documents"> | number
    parent_folder_id?: IntNullableFilter<"documents"> | number | null
    is_folder?: BoolFilter<"documents"> | boolean
    is_deleted?: BoolFilter<"documents"> | boolean
    is_public?: BoolFilter<"documents"> | boolean
    is_template?: BoolFilter<"documents"> | boolean
    created_at?: DateTimeFilter<"documents"> | Date | string
    updated_at?: DateTimeFilter<"documents"> | Date | string
    last_modified_by?: IntNullableFilter<"documents"> | number | null
    last_accessed_at?: DateTimeNullableFilter<"documents"> | Date | string | null
    auto_save_interval?: IntFilter<"documents"> | number
    allow_comments?: BoolFilter<"documents"> | boolean
    tags?: StringNullableFilter<"documents"> | string | null
    metadata?: JsonNullableFilter<"documents">
    calls?: CallsListRelationFilter
    document_versions?: Document_versionsListRelationFilter
    users_documents_last_modified_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_documents_owner_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    documents?: XOR<DocumentsNullableScalarRelationFilter, documentsWhereInput> | null
    other_documents?: DocumentsListRelationFilter
  }

  export type documentsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    file_path?: SortOrderInput | SortOrder
    file_name?: SortOrderInput | SortOrder
    file_original_name?: SortOrderInput | SortOrder
    file_type?: SortOrderInput | SortOrder
    file_size?: SortOrderInput | SortOrder
    file_extension?: SortOrderInput | SortOrder
    file_upload_date?: SortOrderInput | SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrderInput | SortOrder
    is_folder?: SortOrder
    is_deleted?: SortOrder
    is_public?: SortOrder
    is_template?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_modified_by?: SortOrderInput | SortOrder
    last_accessed_at?: SortOrderInput | SortOrder
    auto_save_interval?: SortOrder
    allow_comments?: SortOrder
    tags?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    calls?: callsOrderByRelationAggregateInput
    document_versions?: document_versionsOrderByRelationAggregateInput
    users_documents_last_modified_byTousers?: usersOrderByWithRelationInput
    users_documents_owner_idTousers?: usersOrderByWithRelationInput
    documents?: documentsOrderByWithRelationInput
    other_documents?: documentsOrderByRelationAggregateInput
  }

  export type documentsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: documentsWhereInput | documentsWhereInput[]
    OR?: documentsWhereInput[]
    NOT?: documentsWhereInput | documentsWhereInput[]
    title?: StringFilter<"documents"> | string
    description?: StringNullableFilter<"documents"> | string | null
    content?: StringNullableFilter<"documents"> | string | null
    file_path?: StringNullableFilter<"documents"> | string | null
    file_name?: StringNullableFilter<"documents"> | string | null
    file_original_name?: StringNullableFilter<"documents"> | string | null
    file_type?: StringNullableFilter<"documents"> | string | null
    file_size?: BigIntNullableFilter<"documents"> | bigint | number | null
    file_extension?: StringNullableFilter<"documents"> | string | null
    file_upload_date?: DateTimeNullableFilter<"documents"> | Date | string | null
    owner_id?: IntFilter<"documents"> | number
    parent_folder_id?: IntNullableFilter<"documents"> | number | null
    is_folder?: BoolFilter<"documents"> | boolean
    is_deleted?: BoolFilter<"documents"> | boolean
    is_public?: BoolFilter<"documents"> | boolean
    is_template?: BoolFilter<"documents"> | boolean
    created_at?: DateTimeFilter<"documents"> | Date | string
    updated_at?: DateTimeFilter<"documents"> | Date | string
    last_modified_by?: IntNullableFilter<"documents"> | number | null
    last_accessed_at?: DateTimeNullableFilter<"documents"> | Date | string | null
    auto_save_interval?: IntFilter<"documents"> | number
    allow_comments?: BoolFilter<"documents"> | boolean
    tags?: StringNullableFilter<"documents"> | string | null
    metadata?: JsonNullableFilter<"documents">
    calls?: CallsListRelationFilter
    document_versions?: Document_versionsListRelationFilter
    users_documents_last_modified_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_documents_owner_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    documents?: XOR<DocumentsNullableScalarRelationFilter, documentsWhereInput> | null
    other_documents?: DocumentsListRelationFilter
  }, "id">

  export type documentsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    file_path?: SortOrderInput | SortOrder
    file_name?: SortOrderInput | SortOrder
    file_original_name?: SortOrderInput | SortOrder
    file_type?: SortOrderInput | SortOrder
    file_size?: SortOrderInput | SortOrder
    file_extension?: SortOrderInput | SortOrder
    file_upload_date?: SortOrderInput | SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrderInput | SortOrder
    is_folder?: SortOrder
    is_deleted?: SortOrder
    is_public?: SortOrder
    is_template?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_modified_by?: SortOrderInput | SortOrder
    last_accessed_at?: SortOrderInput | SortOrder
    auto_save_interval?: SortOrder
    allow_comments?: SortOrder
    tags?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: documentsCountOrderByAggregateInput
    _avg?: documentsAvgOrderByAggregateInput
    _max?: documentsMaxOrderByAggregateInput
    _min?: documentsMinOrderByAggregateInput
    _sum?: documentsSumOrderByAggregateInput
  }

  export type documentsScalarWhereWithAggregatesInput = {
    AND?: documentsScalarWhereWithAggregatesInput | documentsScalarWhereWithAggregatesInput[]
    OR?: documentsScalarWhereWithAggregatesInput[]
    NOT?: documentsScalarWhereWithAggregatesInput | documentsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"documents"> | number
    title?: StringWithAggregatesFilter<"documents"> | string
    description?: StringNullableWithAggregatesFilter<"documents"> | string | null
    content?: StringNullableWithAggregatesFilter<"documents"> | string | null
    file_path?: StringNullableWithAggregatesFilter<"documents"> | string | null
    file_name?: StringNullableWithAggregatesFilter<"documents"> | string | null
    file_original_name?: StringNullableWithAggregatesFilter<"documents"> | string | null
    file_type?: StringNullableWithAggregatesFilter<"documents"> | string | null
    file_size?: BigIntNullableWithAggregatesFilter<"documents"> | bigint | number | null
    file_extension?: StringNullableWithAggregatesFilter<"documents"> | string | null
    file_upload_date?: DateTimeNullableWithAggregatesFilter<"documents"> | Date | string | null
    owner_id?: IntWithAggregatesFilter<"documents"> | number
    parent_folder_id?: IntNullableWithAggregatesFilter<"documents"> | number | null
    is_folder?: BoolWithAggregatesFilter<"documents"> | boolean
    is_deleted?: BoolWithAggregatesFilter<"documents"> | boolean
    is_public?: BoolWithAggregatesFilter<"documents"> | boolean
    is_template?: BoolWithAggregatesFilter<"documents"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"documents"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"documents"> | Date | string
    last_modified_by?: IntNullableWithAggregatesFilter<"documents"> | number | null
    last_accessed_at?: DateTimeNullableWithAggregatesFilter<"documents"> | Date | string | null
    auto_save_interval?: IntWithAggregatesFilter<"documents"> | number
    allow_comments?: BoolWithAggregatesFilter<"documents"> | boolean
    tags?: StringNullableWithAggregatesFilter<"documents"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"documents">
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    full_name?: StringNullableFilter<"users"> | string | null
    profile_picture?: StringNullableFilter<"users"> | string | null
    two_factor_enabled?: BoolNullableFilter<"users"> | boolean | null
    two_factor_secret?: StringNullableFilter<"users"> | string | null
    is_admin?: BoolNullableFilter<"users"> | boolean | null
    is_active?: BoolNullableFilter<"users"> | boolean | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    last_login?: DateTimeNullableFilter<"users"> | Date | string | null
    login_attempts?: IntNullableFilter<"users"> | number | null
    locked_until?: DateTimeNullableFilter<"users"> | Date | string | null
    call_participants?: Call_participantsListRelationFilter
    calls?: CallsListRelationFilter
    document_versions?: Document_versionsListRelationFilter
    documents_documents_last_modified_byTousers?: DocumentsListRelationFilter
    documents_documents_owner_idTousers?: DocumentsListRelationFilter
    conversations_created?: ConversationsListRelationFilter
    conversation_participants?: Conversation_participantsListRelationFilter
    messages_sent?: MessagesListRelationFilter
    notifications_notifications_user_idTousers?: NotificationsListRelationFilter
    notifications_notifications_sender_idTousers?: NotificationsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    full_name?: SortOrderInput | SortOrder
    profile_picture?: SortOrderInput | SortOrder
    two_factor_enabled?: SortOrderInput | SortOrder
    two_factor_secret?: SortOrderInput | SortOrder
    is_admin?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    last_login?: SortOrderInput | SortOrder
    login_attempts?: SortOrderInput | SortOrder
    locked_until?: SortOrderInput | SortOrder
    call_participants?: call_participantsOrderByRelationAggregateInput
    calls?: callsOrderByRelationAggregateInput
    document_versions?: document_versionsOrderByRelationAggregateInput
    documents_documents_last_modified_byTousers?: documentsOrderByRelationAggregateInput
    documents_documents_owner_idTousers?: documentsOrderByRelationAggregateInput
    conversations_created?: conversationsOrderByRelationAggregateInput
    conversation_participants?: conversation_participantsOrderByRelationAggregateInput
    messages_sent?: messagesOrderByRelationAggregateInput
    notifications_notifications_user_idTousers?: notificationsOrderByRelationAggregateInput
    notifications_notifications_sender_idTousers?: notificationsOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password_hash?: StringFilter<"users"> | string
    full_name?: StringNullableFilter<"users"> | string | null
    profile_picture?: StringNullableFilter<"users"> | string | null
    two_factor_enabled?: BoolNullableFilter<"users"> | boolean | null
    two_factor_secret?: StringNullableFilter<"users"> | string | null
    is_admin?: BoolNullableFilter<"users"> | boolean | null
    is_active?: BoolNullableFilter<"users"> | boolean | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    last_login?: DateTimeNullableFilter<"users"> | Date | string | null
    login_attempts?: IntNullableFilter<"users"> | number | null
    locked_until?: DateTimeNullableFilter<"users"> | Date | string | null
    call_participants?: Call_participantsListRelationFilter
    calls?: CallsListRelationFilter
    document_versions?: Document_versionsListRelationFilter
    documents_documents_last_modified_byTousers?: DocumentsListRelationFilter
    documents_documents_owner_idTousers?: DocumentsListRelationFilter
    conversations_created?: ConversationsListRelationFilter
    conversation_participants?: Conversation_participantsListRelationFilter
    messages_sent?: MessagesListRelationFilter
    notifications_notifications_user_idTousers?: NotificationsListRelationFilter
    notifications_notifications_sender_idTousers?: NotificationsListRelationFilter
  }, "id" | "username" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    full_name?: SortOrderInput | SortOrder
    profile_picture?: SortOrderInput | SortOrder
    two_factor_enabled?: SortOrderInput | SortOrder
    two_factor_secret?: SortOrderInput | SortOrder
    is_admin?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    last_login?: SortOrderInput | SortOrder
    login_attempts?: SortOrderInput | SortOrder
    locked_until?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    username?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password_hash?: StringWithAggregatesFilter<"users"> | string
    full_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    profile_picture?: StringNullableWithAggregatesFilter<"users"> | string | null
    two_factor_enabled?: BoolNullableWithAggregatesFilter<"users"> | boolean | null
    two_factor_secret?: StringNullableWithAggregatesFilter<"users"> | string | null
    is_admin?: BoolNullableWithAggregatesFilter<"users"> | boolean | null
    is_active?: BoolNullableWithAggregatesFilter<"users"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    last_login?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    login_attempts?: IntNullableWithAggregatesFilter<"users"> | number | null
    locked_until?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type conversationsWhereInput = {
    AND?: conversationsWhereInput | conversationsWhereInput[]
    OR?: conversationsWhereInput[]
    NOT?: conversationsWhereInput | conversationsWhereInput[]
    id?: IntFilter<"conversations"> | number
    name?: StringNullableFilter<"conversations"> | string | null
    is_group?: BoolFilter<"conversations"> | boolean
    created_at?: DateTimeFilter<"conversations"> | Date | string
    updated_at?: DateTimeFilter<"conversations"> | Date | string
    created_by?: IntFilter<"conversations"> | number
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    conversation_participants?: Conversation_participantsListRelationFilter
    messages?: MessagesListRelationFilter
  }

  export type conversationsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    is_group?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    created_by?: SortOrder
    users?: usersOrderByWithRelationInput
    conversation_participants?: conversation_participantsOrderByRelationAggregateInput
    messages?: messagesOrderByRelationAggregateInput
  }

  export type conversationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: conversationsWhereInput | conversationsWhereInput[]
    OR?: conversationsWhereInput[]
    NOT?: conversationsWhereInput | conversationsWhereInput[]
    name?: StringNullableFilter<"conversations"> | string | null
    is_group?: BoolFilter<"conversations"> | boolean
    created_at?: DateTimeFilter<"conversations"> | Date | string
    updated_at?: DateTimeFilter<"conversations"> | Date | string
    created_by?: IntFilter<"conversations"> | number
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    conversation_participants?: Conversation_participantsListRelationFilter
    messages?: MessagesListRelationFilter
  }, "id">

  export type conversationsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    is_group?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    created_by?: SortOrder
    _count?: conversationsCountOrderByAggregateInput
    _avg?: conversationsAvgOrderByAggregateInput
    _max?: conversationsMaxOrderByAggregateInput
    _min?: conversationsMinOrderByAggregateInput
    _sum?: conversationsSumOrderByAggregateInput
  }

  export type conversationsScalarWhereWithAggregatesInput = {
    AND?: conversationsScalarWhereWithAggregatesInput | conversationsScalarWhereWithAggregatesInput[]
    OR?: conversationsScalarWhereWithAggregatesInput[]
    NOT?: conversationsScalarWhereWithAggregatesInput | conversationsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"conversations"> | number
    name?: StringNullableWithAggregatesFilter<"conversations"> | string | null
    is_group?: BoolWithAggregatesFilter<"conversations"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"conversations"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"conversations"> | Date | string
    created_by?: IntWithAggregatesFilter<"conversations"> | number
  }

  export type conversation_participantsWhereInput = {
    AND?: conversation_participantsWhereInput | conversation_participantsWhereInput[]
    OR?: conversation_participantsWhereInput[]
    NOT?: conversation_participantsWhereInput | conversation_participantsWhereInput[]
    id?: IntFilter<"conversation_participants"> | number
    conversation_id?: IntFilter<"conversation_participants"> | number
    user_id?: IntFilter<"conversation_participants"> | number
    joined_at?: DateTimeFilter<"conversation_participants"> | Date | string
    left_at?: DateTimeNullableFilter<"conversation_participants"> | Date | string | null
    is_active?: BoolFilter<"conversation_participants"> | boolean
    conversations?: XOR<ConversationsScalarRelationFilter, conversationsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type conversation_participantsOrderByWithRelationInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    user_id?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrderInput | SortOrder
    is_active?: SortOrder
    conversations?: conversationsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type conversation_participantsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    conversation_id_user_id?: conversation_participantsConversation_idUser_idCompoundUniqueInput
    AND?: conversation_participantsWhereInput | conversation_participantsWhereInput[]
    OR?: conversation_participantsWhereInput[]
    NOT?: conversation_participantsWhereInput | conversation_participantsWhereInput[]
    conversation_id?: IntFilter<"conversation_participants"> | number
    user_id?: IntFilter<"conversation_participants"> | number
    joined_at?: DateTimeFilter<"conversation_participants"> | Date | string
    left_at?: DateTimeNullableFilter<"conversation_participants"> | Date | string | null
    is_active?: BoolFilter<"conversation_participants"> | boolean
    conversations?: XOR<ConversationsScalarRelationFilter, conversationsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "conversation_id_user_id">

  export type conversation_participantsOrderByWithAggregationInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    user_id?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrderInput | SortOrder
    is_active?: SortOrder
    _count?: conversation_participantsCountOrderByAggregateInput
    _avg?: conversation_participantsAvgOrderByAggregateInput
    _max?: conversation_participantsMaxOrderByAggregateInput
    _min?: conversation_participantsMinOrderByAggregateInput
    _sum?: conversation_participantsSumOrderByAggregateInput
  }

  export type conversation_participantsScalarWhereWithAggregatesInput = {
    AND?: conversation_participantsScalarWhereWithAggregatesInput | conversation_participantsScalarWhereWithAggregatesInput[]
    OR?: conversation_participantsScalarWhereWithAggregatesInput[]
    NOT?: conversation_participantsScalarWhereWithAggregatesInput | conversation_participantsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"conversation_participants"> | number
    conversation_id?: IntWithAggregatesFilter<"conversation_participants"> | number
    user_id?: IntWithAggregatesFilter<"conversation_participants"> | number
    joined_at?: DateTimeWithAggregatesFilter<"conversation_participants"> | Date | string
    left_at?: DateTimeNullableWithAggregatesFilter<"conversation_participants"> | Date | string | null
    is_active?: BoolWithAggregatesFilter<"conversation_participants"> | boolean
  }

  export type messagesWhereInput = {
    AND?: messagesWhereInput | messagesWhereInput[]
    OR?: messagesWhereInput[]
    NOT?: messagesWhereInput | messagesWhereInput[]
    id?: IntFilter<"messages"> | number
    conversation_id?: IntFilter<"messages"> | number
    sender_id?: IntFilter<"messages"> | number
    content?: StringFilter<"messages"> | string
    sent_at?: DateTimeFilter<"messages"> | Date | string
    read_at?: DateTimeNullableFilter<"messages"> | Date | string | null
    is_deleted?: BoolFilter<"messages"> | boolean
    conversations?: XOR<ConversationsScalarRelationFilter, conversationsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type messagesOrderByWithRelationInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    sender_id?: SortOrder
    content?: SortOrder
    sent_at?: SortOrder
    read_at?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    conversations?: conversationsOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type messagesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: messagesWhereInput | messagesWhereInput[]
    OR?: messagesWhereInput[]
    NOT?: messagesWhereInput | messagesWhereInput[]
    conversation_id?: IntFilter<"messages"> | number
    sender_id?: IntFilter<"messages"> | number
    content?: StringFilter<"messages"> | string
    sent_at?: DateTimeFilter<"messages"> | Date | string
    read_at?: DateTimeNullableFilter<"messages"> | Date | string | null
    is_deleted?: BoolFilter<"messages"> | boolean
    conversations?: XOR<ConversationsScalarRelationFilter, conversationsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type messagesOrderByWithAggregationInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    sender_id?: SortOrder
    content?: SortOrder
    sent_at?: SortOrder
    read_at?: SortOrderInput | SortOrder
    is_deleted?: SortOrder
    _count?: messagesCountOrderByAggregateInput
    _avg?: messagesAvgOrderByAggregateInput
    _max?: messagesMaxOrderByAggregateInput
    _min?: messagesMinOrderByAggregateInput
    _sum?: messagesSumOrderByAggregateInput
  }

  export type messagesScalarWhereWithAggregatesInput = {
    AND?: messagesScalarWhereWithAggregatesInput | messagesScalarWhereWithAggregatesInput[]
    OR?: messagesScalarWhereWithAggregatesInput[]
    NOT?: messagesScalarWhereWithAggregatesInput | messagesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"messages"> | number
    conversation_id?: IntWithAggregatesFilter<"messages"> | number
    sender_id?: IntWithAggregatesFilter<"messages"> | number
    content?: StringWithAggregatesFilter<"messages"> | string
    sent_at?: DateTimeWithAggregatesFilter<"messages"> | Date | string
    read_at?: DateTimeNullableWithAggregatesFilter<"messages"> | Date | string | null
    is_deleted?: BoolWithAggregatesFilter<"messages"> | boolean
  }

  export type notificationsWhereInput = {
    AND?: notificationsWhereInput | notificationsWhereInput[]
    OR?: notificationsWhereInput[]
    NOT?: notificationsWhereInput | notificationsWhereInput[]
    id?: IntFilter<"notifications"> | number
    user_id?: IntFilter<"notifications"> | number
    type?: StringFilter<"notifications"> | string
    content?: StringFilter<"notifications"> | string
    sender_id?: IntNullableFilter<"notifications"> | number | null
    created_at?: DateTimeFilter<"notifications"> | Date | string
    read_at?: DateTimeNullableFilter<"notifications"> | Date | string | null
    is_read?: BoolFilter<"notifications"> | boolean
    users_notifications_user_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    users_notifications_sender_idTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type notificationsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    sender_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    read_at?: SortOrderInput | SortOrder
    is_read?: SortOrder
    users_notifications_user_idTousers?: usersOrderByWithRelationInput
    users_notifications_sender_idTousers?: usersOrderByWithRelationInput
  }

  export type notificationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: notificationsWhereInput | notificationsWhereInput[]
    OR?: notificationsWhereInput[]
    NOT?: notificationsWhereInput | notificationsWhereInput[]
    user_id?: IntFilter<"notifications"> | number
    type?: StringFilter<"notifications"> | string
    content?: StringFilter<"notifications"> | string
    sender_id?: IntNullableFilter<"notifications"> | number | null
    created_at?: DateTimeFilter<"notifications"> | Date | string
    read_at?: DateTimeNullableFilter<"notifications"> | Date | string | null
    is_read?: BoolFilter<"notifications"> | boolean
    users_notifications_user_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    users_notifications_sender_idTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "id">

  export type notificationsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    sender_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    read_at?: SortOrderInput | SortOrder
    is_read?: SortOrder
    _count?: notificationsCountOrderByAggregateInput
    _avg?: notificationsAvgOrderByAggregateInput
    _max?: notificationsMaxOrderByAggregateInput
    _min?: notificationsMinOrderByAggregateInput
    _sum?: notificationsSumOrderByAggregateInput
  }

  export type notificationsScalarWhereWithAggregatesInput = {
    AND?: notificationsScalarWhereWithAggregatesInput | notificationsScalarWhereWithAggregatesInput[]
    OR?: notificationsScalarWhereWithAggregatesInput[]
    NOT?: notificationsScalarWhereWithAggregatesInput | notificationsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"notifications"> | number
    user_id?: IntWithAggregatesFilter<"notifications"> | number
    type?: StringWithAggregatesFilter<"notifications"> | string
    content?: StringWithAggregatesFilter<"notifications"> | string
    sender_id?: IntNullableWithAggregatesFilter<"notifications"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"notifications"> | Date | string
    read_at?: DateTimeNullableWithAggregatesFilter<"notifications"> | Date | string | null
    is_read?: BoolWithAggregatesFilter<"notifications"> | boolean
  }

  export type call_participantsCreateInput = {
    joined_at?: Date | string | null
    left_at?: Date | string | null
    is_active?: boolean | null
    calls: callsCreateNestedOneWithoutCall_participantsInput
    users: usersCreateNestedOneWithoutCall_participantsInput
  }

  export type call_participantsUncheckedCreateInput = {
    id?: number
    call_id: number
    user_id: number
    joined_at?: Date | string | null
    left_at?: Date | string | null
    is_active?: boolean | null
  }

  export type call_participantsUpdateInput = {
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    calls?: callsUpdateOneRequiredWithoutCall_participantsNestedInput
    users?: usersUpdateOneRequiredWithoutCall_participantsNestedInput
  }

  export type call_participantsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    call_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type call_participantsCreateManyInput = {
    id?: number
    call_id: number
    user_id: number
    joined_at?: Date | string | null
    left_at?: Date | string | null
    is_active?: boolean | null
  }

  export type call_participantsUpdateManyMutationInput = {
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type call_participantsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    call_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type callsCreateInput = {
    started_at?: Date | string | null
    ended_at?: Date | string | null
    call_type: string
    status?: string | null
    call_participants?: call_participantsCreateNestedManyWithoutCallsInput
    documents: documentsCreateNestedOneWithoutCallsInput
    users: usersCreateNestedOneWithoutCallsInput
  }

  export type callsUncheckedCreateInput = {
    id?: number
    document_id: number
    initiated_by: number
    started_at?: Date | string | null
    ended_at?: Date | string | null
    call_type: string
    status?: string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutCallsInput
  }

  export type callsUpdateInput = {
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    call_participants?: call_participantsUpdateManyWithoutCallsNestedInput
    documents?: documentsUpdateOneRequiredWithoutCallsNestedInput
    users?: usersUpdateOneRequiredWithoutCallsNestedInput
  }

  export type callsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    initiated_by?: IntFieldUpdateOperationsInput | number
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutCallsNestedInput
  }

  export type callsCreateManyInput = {
    id?: number
    document_id: number
    initiated_by: number
    started_at?: Date | string | null
    ended_at?: Date | string | null
    call_type: string
    status?: string | null
  }

  export type callsUpdateManyMutationInput = {
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type callsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    initiated_by?: IntFieldUpdateOperationsInput | number
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type document_versionsCreateInput = {
    version_number: number
    title?: string | null
    content?: string | null
    file_path?: string | null
    file_size?: bigint | number | null
    file_type?: string | null
    modification_date?: Date | string
    change_summary?: string | null
    is_major_version?: boolean
    documents: documentsCreateNestedOneWithoutDocument_versionsInput
    users: usersCreateNestedOneWithoutDocument_versionsInput
  }

  export type document_versionsUncheckedCreateInput = {
    id?: number
    document_id: number
    version_number: number
    title?: string | null
    content?: string | null
    file_path?: string | null
    file_size?: bigint | number | null
    file_type?: string | null
    modified_by: number
    modification_date?: Date | string
    change_summary?: string | null
    is_major_version?: boolean
  }

  export type document_versionsUpdateInput = {
    version_number?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    modification_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    is_major_version?: BoolFieldUpdateOperationsInput | boolean
    documents?: documentsUpdateOneRequiredWithoutDocument_versionsNestedInput
    users?: usersUpdateOneRequiredWithoutDocument_versionsNestedInput
  }

  export type document_versionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    version_number?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    modified_by?: IntFieldUpdateOperationsInput | number
    modification_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    is_major_version?: BoolFieldUpdateOperationsInput | boolean
  }

  export type document_versionsCreateManyInput = {
    id?: number
    document_id: number
    version_number: number
    title?: string | null
    content?: string | null
    file_path?: string | null
    file_size?: bigint | number | null
    file_type?: string | null
    modified_by: number
    modification_date?: Date | string
    change_summary?: string | null
    is_major_version?: boolean
  }

  export type document_versionsUpdateManyMutationInput = {
    version_number?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    modification_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    is_major_version?: BoolFieldUpdateOperationsInput | boolean
  }

  export type document_versionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    version_number?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    modified_by?: IntFieldUpdateOperationsInput | number
    modification_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    is_major_version?: BoolFieldUpdateOperationsInput | boolean
  }

  export type documentsCreateInput = {
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_modified_by?: number | null
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutDocumentsInput
    other_documents?: documentsUncheckedCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutDocumentsNestedInput
    other_documents?: documentsUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_modified_by?: number | null
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type documentsUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type documentsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type usersCreateInput = {
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsCreateNestedManyWithoutUsersInput
    calls?: callsCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsCreateNestedManyWithoutUsersInput
    messages_sent?: messagesCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutUsersInput
    calls?: callsUncheckedCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsUncheckedCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutUsersInput
    messages_sent?: messagesUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUpdateManyWithoutUsersNestedInput
    calls?: callsUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutUsersNestedInput
    calls?: callsUncheckedUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUncheckedUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type conversationsCreateInput = {
    name?: string | null
    is_group?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    users: usersCreateNestedOneWithoutConversations_createdInput
    conversation_participants?: conversation_participantsCreateNestedManyWithoutConversationsInput
    messages?: messagesCreateNestedManyWithoutConversationsInput
  }

  export type conversationsUncheckedCreateInput = {
    id?: number
    name?: string | null
    is_group?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    created_by: number
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutConversationsInput
    messages?: messagesUncheckedCreateNestedManyWithoutConversationsInput
  }

  export type conversationsUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    is_group?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutConversations_createdNestedInput
    conversation_participants?: conversation_participantsUpdateManyWithoutConversationsNestedInput
    messages?: messagesUpdateManyWithoutConversationsNestedInput
  }

  export type conversationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    is_group?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: IntFieldUpdateOperationsInput | number
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutConversationsNestedInput
    messages?: messagesUncheckedUpdateManyWithoutConversationsNestedInput
  }

  export type conversationsCreateManyInput = {
    id?: number
    name?: string | null
    is_group?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    created_by: number
  }

  export type conversationsUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    is_group?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type conversationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    is_group?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: IntFieldUpdateOperationsInput | number
  }

  export type conversation_participantsCreateInput = {
    joined_at?: Date | string
    left_at?: Date | string | null
    is_active?: boolean
    conversations: conversationsCreateNestedOneWithoutConversation_participantsInput
    users: usersCreateNestedOneWithoutConversation_participantsInput
  }

  export type conversation_participantsUncheckedCreateInput = {
    id?: number
    conversation_id: number
    user_id: number
    joined_at?: Date | string
    left_at?: Date | string | null
    is_active?: boolean
  }

  export type conversation_participantsUpdateInput = {
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    conversations?: conversationsUpdateOneRequiredWithoutConversation_participantsNestedInput
    users?: usersUpdateOneRequiredWithoutConversation_participantsNestedInput
  }

  export type conversation_participantsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    conversation_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type conversation_participantsCreateManyInput = {
    id?: number
    conversation_id: number
    user_id: number
    joined_at?: Date | string
    left_at?: Date | string | null
    is_active?: boolean
  }

  export type conversation_participantsUpdateManyMutationInput = {
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type conversation_participantsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    conversation_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type messagesCreateInput = {
    content: string
    sent_at?: Date | string
    read_at?: Date | string | null
    is_deleted?: boolean
    conversations: conversationsCreateNestedOneWithoutMessagesInput
    users: usersCreateNestedOneWithoutMessages_sentInput
  }

  export type messagesUncheckedCreateInput = {
    id?: number
    conversation_id: number
    sender_id: number
    content: string
    sent_at?: Date | string
    read_at?: Date | string | null
    is_deleted?: boolean
  }

  export type messagesUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    conversations?: conversationsUpdateOneRequiredWithoutMessagesNestedInput
    users?: usersUpdateOneRequiredWithoutMessages_sentNestedInput
  }

  export type messagesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    conversation_id?: IntFieldUpdateOperationsInput | number
    sender_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type messagesCreateManyInput = {
    id?: number
    conversation_id: number
    sender_id: number
    content: string
    sent_at?: Date | string
    read_at?: Date | string | null
    is_deleted?: boolean
  }

  export type messagesUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type messagesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    conversation_id?: IntFieldUpdateOperationsInput | number
    sender_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type notificationsCreateInput = {
    type: string
    content: string
    created_at?: Date | string
    read_at?: Date | string | null
    is_read?: boolean
    users_notifications_user_idTousers: usersCreateNestedOneWithoutNotifications_notifications_user_idTousersInput
    users_notifications_sender_idTousers?: usersCreateNestedOneWithoutNotifications_notifications_sender_idTousersInput
  }

  export type notificationsUncheckedCreateInput = {
    id?: number
    user_id: number
    type: string
    content: string
    sender_id?: number | null
    created_at?: Date | string
    read_at?: Date | string | null
    is_read?: boolean
  }

  export type notificationsUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
    users_notifications_user_idTousers?: usersUpdateOneRequiredWithoutNotifications_notifications_user_idTousersNestedInput
    users_notifications_sender_idTousers?: usersUpdateOneWithoutNotifications_notifications_sender_idTousersNestedInput
  }

  export type notificationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sender_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type notificationsCreateManyInput = {
    id?: number
    user_id: number
    type: string
    content: string
    sender_id?: number | null
    created_at?: Date | string
    read_at?: Date | string | null
    is_read?: boolean
  }

  export type notificationsUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type notificationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sender_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type CallsScalarRelationFilter = {
    is?: callsWhereInput
    isNot?: callsWhereInput
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type call_participantsCall_id_user_idCompoundUniqueInput = {
    call_id: number
    user_id: number
  }

  export type call_participantsCountOrderByAggregateInput = {
    id?: SortOrder
    call_id?: SortOrder
    user_id?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrder
    is_active?: SortOrder
  }

  export type call_participantsAvgOrderByAggregateInput = {
    id?: SortOrder
    call_id?: SortOrder
    user_id?: SortOrder
  }

  export type call_participantsMaxOrderByAggregateInput = {
    id?: SortOrder
    call_id?: SortOrder
    user_id?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrder
    is_active?: SortOrder
  }

  export type call_participantsMinOrderByAggregateInput = {
    id?: SortOrder
    call_id?: SortOrder
    user_id?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrder
    is_active?: SortOrder
  }

  export type call_participantsSumOrderByAggregateInput = {
    id?: SortOrder
    call_id?: SortOrder
    user_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Call_participantsListRelationFilter = {
    every?: call_participantsWhereInput
    some?: call_participantsWhereInput
    none?: call_participantsWhereInput
  }

  export type DocumentsScalarRelationFilter = {
    is?: documentsWhereInput
    isNot?: documentsWhereInput
  }

  export type call_participantsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type callsCountOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    initiated_by?: SortOrder
    started_at?: SortOrder
    ended_at?: SortOrder
    call_type?: SortOrder
    status?: SortOrder
  }

  export type callsAvgOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    initiated_by?: SortOrder
  }

  export type callsMaxOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    initiated_by?: SortOrder
    started_at?: SortOrder
    ended_at?: SortOrder
    call_type?: SortOrder
    status?: SortOrder
  }

  export type callsMinOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    initiated_by?: SortOrder
    started_at?: SortOrder
    ended_at?: SortOrder
    call_type?: SortOrder
    status?: SortOrder
  }

  export type callsSumOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    initiated_by?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type document_versionsDocument_idVersion_numberCompoundUniqueInput = {
    document_id: number
    version_number: number
  }

  export type document_versionsCountOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    title?: SortOrder
    content?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    file_type?: SortOrder
    modified_by?: SortOrder
    modification_date?: SortOrder
    change_summary?: SortOrder
    is_major_version?: SortOrder
  }

  export type document_versionsAvgOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    file_size?: SortOrder
    modified_by?: SortOrder
  }

  export type document_versionsMaxOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    title?: SortOrder
    content?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    file_type?: SortOrder
    modified_by?: SortOrder
    modification_date?: SortOrder
    change_summary?: SortOrder
    is_major_version?: SortOrder
  }

  export type document_versionsMinOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    title?: SortOrder
    content?: SortOrder
    file_path?: SortOrder
    file_size?: SortOrder
    file_type?: SortOrder
    modified_by?: SortOrder
    modification_date?: SortOrder
    change_summary?: SortOrder
    is_major_version?: SortOrder
  }

  export type document_versionsSumOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    file_size?: SortOrder
    modified_by?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type CallsListRelationFilter = {
    every?: callsWhereInput
    some?: callsWhereInput
    none?: callsWhereInput
  }

  export type Document_versionsListRelationFilter = {
    every?: document_versionsWhereInput
    some?: document_versionsWhereInput
    none?: document_versionsWhereInput
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type DocumentsNullableScalarRelationFilter = {
    is?: documentsWhereInput | null
    isNot?: documentsWhereInput | null
  }

  export type DocumentsListRelationFilter = {
    every?: documentsWhereInput
    some?: documentsWhereInput
    none?: documentsWhereInput
  }

  export type callsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type document_versionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type documentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type documentsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    file_path?: SortOrder
    file_name?: SortOrder
    file_original_name?: SortOrder
    file_type?: SortOrder
    file_size?: SortOrder
    file_extension?: SortOrder
    file_upload_date?: SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrder
    is_folder?: SortOrder
    is_deleted?: SortOrder
    is_public?: SortOrder
    is_template?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_modified_by?: SortOrder
    last_accessed_at?: SortOrder
    auto_save_interval?: SortOrder
    allow_comments?: SortOrder
    tags?: SortOrder
    metadata?: SortOrder
  }

  export type documentsAvgOrderByAggregateInput = {
    id?: SortOrder
    file_size?: SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrder
    last_modified_by?: SortOrder
    auto_save_interval?: SortOrder
  }

  export type documentsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    file_path?: SortOrder
    file_name?: SortOrder
    file_original_name?: SortOrder
    file_type?: SortOrder
    file_size?: SortOrder
    file_extension?: SortOrder
    file_upload_date?: SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrder
    is_folder?: SortOrder
    is_deleted?: SortOrder
    is_public?: SortOrder
    is_template?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_modified_by?: SortOrder
    last_accessed_at?: SortOrder
    auto_save_interval?: SortOrder
    allow_comments?: SortOrder
    tags?: SortOrder
  }

  export type documentsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    file_path?: SortOrder
    file_name?: SortOrder
    file_original_name?: SortOrder
    file_type?: SortOrder
    file_size?: SortOrder
    file_extension?: SortOrder
    file_upload_date?: SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrder
    is_folder?: SortOrder
    is_deleted?: SortOrder
    is_public?: SortOrder
    is_template?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_modified_by?: SortOrder
    last_accessed_at?: SortOrder
    auto_save_interval?: SortOrder
    allow_comments?: SortOrder
    tags?: SortOrder
  }

  export type documentsSumOrderByAggregateInput = {
    id?: SortOrder
    file_size?: SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrder
    last_modified_by?: SortOrder
    auto_save_interval?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ConversationsListRelationFilter = {
    every?: conversationsWhereInput
    some?: conversationsWhereInput
    none?: conversationsWhereInput
  }

  export type Conversation_participantsListRelationFilter = {
    every?: conversation_participantsWhereInput
    some?: conversation_participantsWhereInput
    none?: conversation_participantsWhereInput
  }

  export type MessagesListRelationFilter = {
    every?: messagesWhereInput
    some?: messagesWhereInput
    none?: messagesWhereInput
  }

  export type NotificationsListRelationFilter = {
    every?: notificationsWhereInput
    some?: notificationsWhereInput
    none?: notificationsWhereInput
  }

  export type conversationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type conversation_participantsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type messagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type notificationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    full_name?: SortOrder
    profile_picture?: SortOrder
    two_factor_enabled?: SortOrder
    two_factor_secret?: SortOrder
    is_admin?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_login?: SortOrder
    login_attempts?: SortOrder
    locked_until?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
    login_attempts?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    full_name?: SortOrder
    profile_picture?: SortOrder
    two_factor_enabled?: SortOrder
    two_factor_secret?: SortOrder
    is_admin?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_login?: SortOrder
    login_attempts?: SortOrder
    locked_until?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    full_name?: SortOrder
    profile_picture?: SortOrder
    two_factor_enabled?: SortOrder
    two_factor_secret?: SortOrder
    is_admin?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_login?: SortOrder
    login_attempts?: SortOrder
    locked_until?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
    login_attempts?: SortOrder
  }

  export type conversationsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    is_group?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    created_by?: SortOrder
  }

  export type conversationsAvgOrderByAggregateInput = {
    id?: SortOrder
    created_by?: SortOrder
  }

  export type conversationsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    is_group?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    created_by?: SortOrder
  }

  export type conversationsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    is_group?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    created_by?: SortOrder
  }

  export type conversationsSumOrderByAggregateInput = {
    id?: SortOrder
    created_by?: SortOrder
  }

  export type ConversationsScalarRelationFilter = {
    is?: conversationsWhereInput
    isNot?: conversationsWhereInput
  }

  export type conversation_participantsConversation_idUser_idCompoundUniqueInput = {
    conversation_id: number
    user_id: number
  }

  export type conversation_participantsCountOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    user_id?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrder
    is_active?: SortOrder
  }

  export type conversation_participantsAvgOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    user_id?: SortOrder
  }

  export type conversation_participantsMaxOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    user_id?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrder
    is_active?: SortOrder
  }

  export type conversation_participantsMinOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    user_id?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrder
    is_active?: SortOrder
  }

  export type conversation_participantsSumOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    user_id?: SortOrder
  }

  export type messagesCountOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    sender_id?: SortOrder
    content?: SortOrder
    sent_at?: SortOrder
    read_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type messagesAvgOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    sender_id?: SortOrder
  }

  export type messagesMaxOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    sender_id?: SortOrder
    content?: SortOrder
    sent_at?: SortOrder
    read_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type messagesMinOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    sender_id?: SortOrder
    content?: SortOrder
    sent_at?: SortOrder
    read_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type messagesSumOrderByAggregateInput = {
    id?: SortOrder
    conversation_id?: SortOrder
    sender_id?: SortOrder
  }

  export type notificationsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    sender_id?: SortOrder
    created_at?: SortOrder
    read_at?: SortOrder
    is_read?: SortOrder
  }

  export type notificationsAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    sender_id?: SortOrder
  }

  export type notificationsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    sender_id?: SortOrder
    created_at?: SortOrder
    read_at?: SortOrder
    is_read?: SortOrder
  }

  export type notificationsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    sender_id?: SortOrder
    created_at?: SortOrder
    read_at?: SortOrder
    is_read?: SortOrder
  }

  export type notificationsSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    sender_id?: SortOrder
  }

  export type callsCreateNestedOneWithoutCall_participantsInput = {
    create?: XOR<callsCreateWithoutCall_participantsInput, callsUncheckedCreateWithoutCall_participantsInput>
    connectOrCreate?: callsCreateOrConnectWithoutCall_participantsInput
    connect?: callsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutCall_participantsInput = {
    create?: XOR<usersCreateWithoutCall_participantsInput, usersUncheckedCreateWithoutCall_participantsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCall_participantsInput
    connect?: usersWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type callsUpdateOneRequiredWithoutCall_participantsNestedInput = {
    create?: XOR<callsCreateWithoutCall_participantsInput, callsUncheckedCreateWithoutCall_participantsInput>
    connectOrCreate?: callsCreateOrConnectWithoutCall_participantsInput
    upsert?: callsUpsertWithoutCall_participantsInput
    connect?: callsWhereUniqueInput
    update?: XOR<XOR<callsUpdateToOneWithWhereWithoutCall_participantsInput, callsUpdateWithoutCall_participantsInput>, callsUncheckedUpdateWithoutCall_participantsInput>
  }

  export type usersUpdateOneRequiredWithoutCall_participantsNestedInput = {
    create?: XOR<usersCreateWithoutCall_participantsInput, usersUncheckedCreateWithoutCall_participantsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCall_participantsInput
    upsert?: usersUpsertWithoutCall_participantsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutCall_participantsInput, usersUpdateWithoutCall_participantsInput>, usersUncheckedUpdateWithoutCall_participantsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type call_participantsCreateNestedManyWithoutCallsInput = {
    create?: XOR<call_participantsCreateWithoutCallsInput, call_participantsUncheckedCreateWithoutCallsInput> | call_participantsCreateWithoutCallsInput[] | call_participantsUncheckedCreateWithoutCallsInput[]
    connectOrCreate?: call_participantsCreateOrConnectWithoutCallsInput | call_participantsCreateOrConnectWithoutCallsInput[]
    createMany?: call_participantsCreateManyCallsInputEnvelope
    connect?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
  }

  export type documentsCreateNestedOneWithoutCallsInput = {
    create?: XOR<documentsCreateWithoutCallsInput, documentsUncheckedCreateWithoutCallsInput>
    connectOrCreate?: documentsCreateOrConnectWithoutCallsInput
    connect?: documentsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutCallsInput = {
    create?: XOR<usersCreateWithoutCallsInput, usersUncheckedCreateWithoutCallsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCallsInput
    connect?: usersWhereUniqueInput
  }

  export type call_participantsUncheckedCreateNestedManyWithoutCallsInput = {
    create?: XOR<call_participantsCreateWithoutCallsInput, call_participantsUncheckedCreateWithoutCallsInput> | call_participantsCreateWithoutCallsInput[] | call_participantsUncheckedCreateWithoutCallsInput[]
    connectOrCreate?: call_participantsCreateOrConnectWithoutCallsInput | call_participantsCreateOrConnectWithoutCallsInput[]
    createMany?: call_participantsCreateManyCallsInputEnvelope
    connect?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type call_participantsUpdateManyWithoutCallsNestedInput = {
    create?: XOR<call_participantsCreateWithoutCallsInput, call_participantsUncheckedCreateWithoutCallsInput> | call_participantsCreateWithoutCallsInput[] | call_participantsUncheckedCreateWithoutCallsInput[]
    connectOrCreate?: call_participantsCreateOrConnectWithoutCallsInput | call_participantsCreateOrConnectWithoutCallsInput[]
    upsert?: call_participantsUpsertWithWhereUniqueWithoutCallsInput | call_participantsUpsertWithWhereUniqueWithoutCallsInput[]
    createMany?: call_participantsCreateManyCallsInputEnvelope
    set?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    disconnect?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    delete?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    connect?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    update?: call_participantsUpdateWithWhereUniqueWithoutCallsInput | call_participantsUpdateWithWhereUniqueWithoutCallsInput[]
    updateMany?: call_participantsUpdateManyWithWhereWithoutCallsInput | call_participantsUpdateManyWithWhereWithoutCallsInput[]
    deleteMany?: call_participantsScalarWhereInput | call_participantsScalarWhereInput[]
  }

  export type documentsUpdateOneRequiredWithoutCallsNestedInput = {
    create?: XOR<documentsCreateWithoutCallsInput, documentsUncheckedCreateWithoutCallsInput>
    connectOrCreate?: documentsCreateOrConnectWithoutCallsInput
    upsert?: documentsUpsertWithoutCallsInput
    connect?: documentsWhereUniqueInput
    update?: XOR<XOR<documentsUpdateToOneWithWhereWithoutCallsInput, documentsUpdateWithoutCallsInput>, documentsUncheckedUpdateWithoutCallsInput>
  }

  export type usersUpdateOneRequiredWithoutCallsNestedInput = {
    create?: XOR<usersCreateWithoutCallsInput, usersUncheckedCreateWithoutCallsInput>
    connectOrCreate?: usersCreateOrConnectWithoutCallsInput
    upsert?: usersUpsertWithoutCallsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutCallsInput, usersUpdateWithoutCallsInput>, usersUncheckedUpdateWithoutCallsInput>
  }

  export type call_participantsUncheckedUpdateManyWithoutCallsNestedInput = {
    create?: XOR<call_participantsCreateWithoutCallsInput, call_participantsUncheckedCreateWithoutCallsInput> | call_participantsCreateWithoutCallsInput[] | call_participantsUncheckedCreateWithoutCallsInput[]
    connectOrCreate?: call_participantsCreateOrConnectWithoutCallsInput | call_participantsCreateOrConnectWithoutCallsInput[]
    upsert?: call_participantsUpsertWithWhereUniqueWithoutCallsInput | call_participantsUpsertWithWhereUniqueWithoutCallsInput[]
    createMany?: call_participantsCreateManyCallsInputEnvelope
    set?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    disconnect?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    delete?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    connect?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    update?: call_participantsUpdateWithWhereUniqueWithoutCallsInput | call_participantsUpdateWithWhereUniqueWithoutCallsInput[]
    updateMany?: call_participantsUpdateManyWithWhereWithoutCallsInput | call_participantsUpdateManyWithWhereWithoutCallsInput[]
    deleteMany?: call_participantsScalarWhereInput | call_participantsScalarWhereInput[]
  }

  export type documentsCreateNestedOneWithoutDocument_versionsInput = {
    create?: XOR<documentsCreateWithoutDocument_versionsInput, documentsUncheckedCreateWithoutDocument_versionsInput>
    connectOrCreate?: documentsCreateOrConnectWithoutDocument_versionsInput
    connect?: documentsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutDocument_versionsInput = {
    create?: XOR<usersCreateWithoutDocument_versionsInput, usersUncheckedCreateWithoutDocument_versionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutDocument_versionsInput
    connect?: usersWhereUniqueInput
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type documentsUpdateOneRequiredWithoutDocument_versionsNestedInput = {
    create?: XOR<documentsCreateWithoutDocument_versionsInput, documentsUncheckedCreateWithoutDocument_versionsInput>
    connectOrCreate?: documentsCreateOrConnectWithoutDocument_versionsInput
    upsert?: documentsUpsertWithoutDocument_versionsInput
    connect?: documentsWhereUniqueInput
    update?: XOR<XOR<documentsUpdateToOneWithWhereWithoutDocument_versionsInput, documentsUpdateWithoutDocument_versionsInput>, documentsUncheckedUpdateWithoutDocument_versionsInput>
  }

  export type usersUpdateOneRequiredWithoutDocument_versionsNestedInput = {
    create?: XOR<usersCreateWithoutDocument_versionsInput, usersUncheckedCreateWithoutDocument_versionsInput>
    connectOrCreate?: usersCreateOrConnectWithoutDocument_versionsInput
    upsert?: usersUpsertWithoutDocument_versionsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutDocument_versionsInput, usersUpdateWithoutDocument_versionsInput>, usersUncheckedUpdateWithoutDocument_versionsInput>
  }

  export type callsCreateNestedManyWithoutDocumentsInput = {
    create?: XOR<callsCreateWithoutDocumentsInput, callsUncheckedCreateWithoutDocumentsInput> | callsCreateWithoutDocumentsInput[] | callsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: callsCreateOrConnectWithoutDocumentsInput | callsCreateOrConnectWithoutDocumentsInput[]
    createMany?: callsCreateManyDocumentsInputEnvelope
    connect?: callsWhereUniqueInput | callsWhereUniqueInput[]
  }

  export type document_versionsCreateNestedManyWithoutDocumentsInput = {
    create?: XOR<document_versionsCreateWithoutDocumentsInput, document_versionsUncheckedCreateWithoutDocumentsInput> | document_versionsCreateWithoutDocumentsInput[] | document_versionsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: document_versionsCreateOrConnectWithoutDocumentsInput | document_versionsCreateOrConnectWithoutDocumentsInput[]
    createMany?: document_versionsCreateManyDocumentsInputEnvelope
    connect?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput = {
    create?: XOR<usersCreateWithoutDocuments_documents_last_modified_byTousersInput, usersUncheckedCreateWithoutDocuments_documents_last_modified_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutDocuments_documents_last_modified_byTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput = {
    create?: XOR<usersCreateWithoutDocuments_documents_owner_idTousersInput, usersUncheckedCreateWithoutDocuments_documents_owner_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutDocuments_documents_owner_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type documentsCreateNestedOneWithoutOther_documentsInput = {
    create?: XOR<documentsCreateWithoutOther_documentsInput, documentsUncheckedCreateWithoutOther_documentsInput>
    connectOrCreate?: documentsCreateOrConnectWithoutOther_documentsInput
    connect?: documentsWhereUniqueInput
  }

  export type documentsCreateNestedManyWithoutDocumentsInput = {
    create?: XOR<documentsCreateWithoutDocumentsInput, documentsUncheckedCreateWithoutDocumentsInput> | documentsCreateWithoutDocumentsInput[] | documentsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: documentsCreateOrConnectWithoutDocumentsInput | documentsCreateOrConnectWithoutDocumentsInput[]
    createMany?: documentsCreateManyDocumentsInputEnvelope
    connect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
  }

  export type callsUncheckedCreateNestedManyWithoutDocumentsInput = {
    create?: XOR<callsCreateWithoutDocumentsInput, callsUncheckedCreateWithoutDocumentsInput> | callsCreateWithoutDocumentsInput[] | callsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: callsCreateOrConnectWithoutDocumentsInput | callsCreateOrConnectWithoutDocumentsInput[]
    createMany?: callsCreateManyDocumentsInputEnvelope
    connect?: callsWhereUniqueInput | callsWhereUniqueInput[]
  }

  export type document_versionsUncheckedCreateNestedManyWithoutDocumentsInput = {
    create?: XOR<document_versionsCreateWithoutDocumentsInput, document_versionsUncheckedCreateWithoutDocumentsInput> | document_versionsCreateWithoutDocumentsInput[] | document_versionsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: document_versionsCreateOrConnectWithoutDocumentsInput | document_versionsCreateOrConnectWithoutDocumentsInput[]
    createMany?: document_versionsCreateManyDocumentsInputEnvelope
    connect?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
  }

  export type documentsUncheckedCreateNestedManyWithoutDocumentsInput = {
    create?: XOR<documentsCreateWithoutDocumentsInput, documentsUncheckedCreateWithoutDocumentsInput> | documentsCreateWithoutDocumentsInput[] | documentsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: documentsCreateOrConnectWithoutDocumentsInput | documentsCreateOrConnectWithoutDocumentsInput[]
    createMany?: documentsCreateManyDocumentsInputEnvelope
    connect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
  }

  export type callsUpdateManyWithoutDocumentsNestedInput = {
    create?: XOR<callsCreateWithoutDocumentsInput, callsUncheckedCreateWithoutDocumentsInput> | callsCreateWithoutDocumentsInput[] | callsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: callsCreateOrConnectWithoutDocumentsInput | callsCreateOrConnectWithoutDocumentsInput[]
    upsert?: callsUpsertWithWhereUniqueWithoutDocumentsInput | callsUpsertWithWhereUniqueWithoutDocumentsInput[]
    createMany?: callsCreateManyDocumentsInputEnvelope
    set?: callsWhereUniqueInput | callsWhereUniqueInput[]
    disconnect?: callsWhereUniqueInput | callsWhereUniqueInput[]
    delete?: callsWhereUniqueInput | callsWhereUniqueInput[]
    connect?: callsWhereUniqueInput | callsWhereUniqueInput[]
    update?: callsUpdateWithWhereUniqueWithoutDocumentsInput | callsUpdateWithWhereUniqueWithoutDocumentsInput[]
    updateMany?: callsUpdateManyWithWhereWithoutDocumentsInput | callsUpdateManyWithWhereWithoutDocumentsInput[]
    deleteMany?: callsScalarWhereInput | callsScalarWhereInput[]
  }

  export type document_versionsUpdateManyWithoutDocumentsNestedInput = {
    create?: XOR<document_versionsCreateWithoutDocumentsInput, document_versionsUncheckedCreateWithoutDocumentsInput> | document_versionsCreateWithoutDocumentsInput[] | document_versionsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: document_versionsCreateOrConnectWithoutDocumentsInput | document_versionsCreateOrConnectWithoutDocumentsInput[]
    upsert?: document_versionsUpsertWithWhereUniqueWithoutDocumentsInput | document_versionsUpsertWithWhereUniqueWithoutDocumentsInput[]
    createMany?: document_versionsCreateManyDocumentsInputEnvelope
    set?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    disconnect?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    delete?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    connect?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    update?: document_versionsUpdateWithWhereUniqueWithoutDocumentsInput | document_versionsUpdateWithWhereUniqueWithoutDocumentsInput[]
    updateMany?: document_versionsUpdateManyWithWhereWithoutDocumentsInput | document_versionsUpdateManyWithWhereWithoutDocumentsInput[]
    deleteMany?: document_versionsScalarWhereInput | document_versionsScalarWhereInput[]
  }

  export type usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput = {
    create?: XOR<usersCreateWithoutDocuments_documents_last_modified_byTousersInput, usersUncheckedCreateWithoutDocuments_documents_last_modified_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutDocuments_documents_last_modified_byTousersInput
    upsert?: usersUpsertWithoutDocuments_documents_last_modified_byTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutDocuments_documents_last_modified_byTousersInput, usersUpdateWithoutDocuments_documents_last_modified_byTousersInput>, usersUncheckedUpdateWithoutDocuments_documents_last_modified_byTousersInput>
  }

  export type usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutDocuments_documents_owner_idTousersInput, usersUncheckedCreateWithoutDocuments_documents_owner_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutDocuments_documents_owner_idTousersInput
    upsert?: usersUpsertWithoutDocuments_documents_owner_idTousersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutDocuments_documents_owner_idTousersInput, usersUpdateWithoutDocuments_documents_owner_idTousersInput>, usersUncheckedUpdateWithoutDocuments_documents_owner_idTousersInput>
  }

  export type documentsUpdateOneWithoutOther_documentsNestedInput = {
    create?: XOR<documentsCreateWithoutOther_documentsInput, documentsUncheckedCreateWithoutOther_documentsInput>
    connectOrCreate?: documentsCreateOrConnectWithoutOther_documentsInput
    upsert?: documentsUpsertWithoutOther_documentsInput
    disconnect?: documentsWhereInput | boolean
    delete?: documentsWhereInput | boolean
    connect?: documentsWhereUniqueInput
    update?: XOR<XOR<documentsUpdateToOneWithWhereWithoutOther_documentsInput, documentsUpdateWithoutOther_documentsInput>, documentsUncheckedUpdateWithoutOther_documentsInput>
  }

  export type documentsUpdateManyWithoutDocumentsNestedInput = {
    create?: XOR<documentsCreateWithoutDocumentsInput, documentsUncheckedCreateWithoutDocumentsInput> | documentsCreateWithoutDocumentsInput[] | documentsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: documentsCreateOrConnectWithoutDocumentsInput | documentsCreateOrConnectWithoutDocumentsInput[]
    upsert?: documentsUpsertWithWhereUniqueWithoutDocumentsInput | documentsUpsertWithWhereUniqueWithoutDocumentsInput[]
    createMany?: documentsCreateManyDocumentsInputEnvelope
    set?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    disconnect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    delete?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    connect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    update?: documentsUpdateWithWhereUniqueWithoutDocumentsInput | documentsUpdateWithWhereUniqueWithoutDocumentsInput[]
    updateMany?: documentsUpdateManyWithWhereWithoutDocumentsInput | documentsUpdateManyWithWhereWithoutDocumentsInput[]
    deleteMany?: documentsScalarWhereInput | documentsScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type callsUncheckedUpdateManyWithoutDocumentsNestedInput = {
    create?: XOR<callsCreateWithoutDocumentsInput, callsUncheckedCreateWithoutDocumentsInput> | callsCreateWithoutDocumentsInput[] | callsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: callsCreateOrConnectWithoutDocumentsInput | callsCreateOrConnectWithoutDocumentsInput[]
    upsert?: callsUpsertWithWhereUniqueWithoutDocumentsInput | callsUpsertWithWhereUniqueWithoutDocumentsInput[]
    createMany?: callsCreateManyDocumentsInputEnvelope
    set?: callsWhereUniqueInput | callsWhereUniqueInput[]
    disconnect?: callsWhereUniqueInput | callsWhereUniqueInput[]
    delete?: callsWhereUniqueInput | callsWhereUniqueInput[]
    connect?: callsWhereUniqueInput | callsWhereUniqueInput[]
    update?: callsUpdateWithWhereUniqueWithoutDocumentsInput | callsUpdateWithWhereUniqueWithoutDocumentsInput[]
    updateMany?: callsUpdateManyWithWhereWithoutDocumentsInput | callsUpdateManyWithWhereWithoutDocumentsInput[]
    deleteMany?: callsScalarWhereInput | callsScalarWhereInput[]
  }

  export type document_versionsUncheckedUpdateManyWithoutDocumentsNestedInput = {
    create?: XOR<document_versionsCreateWithoutDocumentsInput, document_versionsUncheckedCreateWithoutDocumentsInput> | document_versionsCreateWithoutDocumentsInput[] | document_versionsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: document_versionsCreateOrConnectWithoutDocumentsInput | document_versionsCreateOrConnectWithoutDocumentsInput[]
    upsert?: document_versionsUpsertWithWhereUniqueWithoutDocumentsInput | document_versionsUpsertWithWhereUniqueWithoutDocumentsInput[]
    createMany?: document_versionsCreateManyDocumentsInputEnvelope
    set?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    disconnect?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    delete?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    connect?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    update?: document_versionsUpdateWithWhereUniqueWithoutDocumentsInput | document_versionsUpdateWithWhereUniqueWithoutDocumentsInput[]
    updateMany?: document_versionsUpdateManyWithWhereWithoutDocumentsInput | document_versionsUpdateManyWithWhereWithoutDocumentsInput[]
    deleteMany?: document_versionsScalarWhereInput | document_versionsScalarWhereInput[]
  }

  export type documentsUncheckedUpdateManyWithoutDocumentsNestedInput = {
    create?: XOR<documentsCreateWithoutDocumentsInput, documentsUncheckedCreateWithoutDocumentsInput> | documentsCreateWithoutDocumentsInput[] | documentsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: documentsCreateOrConnectWithoutDocumentsInput | documentsCreateOrConnectWithoutDocumentsInput[]
    upsert?: documentsUpsertWithWhereUniqueWithoutDocumentsInput | documentsUpsertWithWhereUniqueWithoutDocumentsInput[]
    createMany?: documentsCreateManyDocumentsInputEnvelope
    set?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    disconnect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    delete?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    connect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    update?: documentsUpdateWithWhereUniqueWithoutDocumentsInput | documentsUpdateWithWhereUniqueWithoutDocumentsInput[]
    updateMany?: documentsUpdateManyWithWhereWithoutDocumentsInput | documentsUpdateManyWithWhereWithoutDocumentsInput[]
    deleteMany?: documentsScalarWhereInput | documentsScalarWhereInput[]
  }

  export type call_participantsCreateNestedManyWithoutUsersInput = {
    create?: XOR<call_participantsCreateWithoutUsersInput, call_participantsUncheckedCreateWithoutUsersInput> | call_participantsCreateWithoutUsersInput[] | call_participantsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: call_participantsCreateOrConnectWithoutUsersInput | call_participantsCreateOrConnectWithoutUsersInput[]
    createMany?: call_participantsCreateManyUsersInputEnvelope
    connect?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
  }

  export type callsCreateNestedManyWithoutUsersInput = {
    create?: XOR<callsCreateWithoutUsersInput, callsUncheckedCreateWithoutUsersInput> | callsCreateWithoutUsersInput[] | callsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: callsCreateOrConnectWithoutUsersInput | callsCreateOrConnectWithoutUsersInput[]
    createMany?: callsCreateManyUsersInputEnvelope
    connect?: callsWhereUniqueInput | callsWhereUniqueInput[]
  }

  export type document_versionsCreateNestedManyWithoutUsersInput = {
    create?: XOR<document_versionsCreateWithoutUsersInput, document_versionsUncheckedCreateWithoutUsersInput> | document_versionsCreateWithoutUsersInput[] | document_versionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: document_versionsCreateOrConnectWithoutUsersInput | document_versionsCreateOrConnectWithoutUsersInput[]
    createMany?: document_versionsCreateManyUsersInputEnvelope
    connect?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
  }

  export type documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput = {
    create?: XOR<documentsCreateWithoutUsers_documents_last_modified_byTousersInput, documentsUncheckedCreateWithoutUsers_documents_last_modified_byTousersInput> | documentsCreateWithoutUsers_documents_last_modified_byTousersInput[] | documentsUncheckedCreateWithoutUsers_documents_last_modified_byTousersInput[]
    connectOrCreate?: documentsCreateOrConnectWithoutUsers_documents_last_modified_byTousersInput | documentsCreateOrConnectWithoutUsers_documents_last_modified_byTousersInput[]
    createMany?: documentsCreateManyUsers_documents_last_modified_byTousersInputEnvelope
    connect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
  }

  export type documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput = {
    create?: XOR<documentsCreateWithoutUsers_documents_owner_idTousersInput, documentsUncheckedCreateWithoutUsers_documents_owner_idTousersInput> | documentsCreateWithoutUsers_documents_owner_idTousersInput[] | documentsUncheckedCreateWithoutUsers_documents_owner_idTousersInput[]
    connectOrCreate?: documentsCreateOrConnectWithoutUsers_documents_owner_idTousersInput | documentsCreateOrConnectWithoutUsers_documents_owner_idTousersInput[]
    createMany?: documentsCreateManyUsers_documents_owner_idTousersInputEnvelope
    connect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
  }

  export type conversationsCreateNestedManyWithoutUsersInput = {
    create?: XOR<conversationsCreateWithoutUsersInput, conversationsUncheckedCreateWithoutUsersInput> | conversationsCreateWithoutUsersInput[] | conversationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: conversationsCreateOrConnectWithoutUsersInput | conversationsCreateOrConnectWithoutUsersInput[]
    createMany?: conversationsCreateManyUsersInputEnvelope
    connect?: conversationsWhereUniqueInput | conversationsWhereUniqueInput[]
  }

  export type conversation_participantsCreateNestedManyWithoutUsersInput = {
    create?: XOR<conversation_participantsCreateWithoutUsersInput, conversation_participantsUncheckedCreateWithoutUsersInput> | conversation_participantsCreateWithoutUsersInput[] | conversation_participantsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: conversation_participantsCreateOrConnectWithoutUsersInput | conversation_participantsCreateOrConnectWithoutUsersInput[]
    createMany?: conversation_participantsCreateManyUsersInputEnvelope
    connect?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
  }

  export type messagesCreateNestedManyWithoutUsersInput = {
    create?: XOR<messagesCreateWithoutUsersInput, messagesUncheckedCreateWithoutUsersInput> | messagesCreateWithoutUsersInput[] | messagesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUsersInput | messagesCreateOrConnectWithoutUsersInput[]
    createMany?: messagesCreateManyUsersInputEnvelope
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
  }

  export type notificationsCreateNestedManyWithoutUsers_notifications_user_idTousersInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_user_idTousersInput> | notificationsCreateWithoutUsers_notifications_user_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_user_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_user_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_user_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_user_idTousersInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type notificationsCreateNestedManyWithoutUsers_notifications_sender_idTousersInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_sender_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_sender_idTousersInput> | notificationsCreateWithoutUsers_notifications_sender_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_sender_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_sender_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_sender_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_sender_idTousersInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type call_participantsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<call_participantsCreateWithoutUsersInput, call_participantsUncheckedCreateWithoutUsersInput> | call_participantsCreateWithoutUsersInput[] | call_participantsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: call_participantsCreateOrConnectWithoutUsersInput | call_participantsCreateOrConnectWithoutUsersInput[]
    createMany?: call_participantsCreateManyUsersInputEnvelope
    connect?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
  }

  export type callsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<callsCreateWithoutUsersInput, callsUncheckedCreateWithoutUsersInput> | callsCreateWithoutUsersInput[] | callsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: callsCreateOrConnectWithoutUsersInput | callsCreateOrConnectWithoutUsersInput[]
    createMany?: callsCreateManyUsersInputEnvelope
    connect?: callsWhereUniqueInput | callsWhereUniqueInput[]
  }

  export type document_versionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<document_versionsCreateWithoutUsersInput, document_versionsUncheckedCreateWithoutUsersInput> | document_versionsCreateWithoutUsersInput[] | document_versionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: document_versionsCreateOrConnectWithoutUsersInput | document_versionsCreateOrConnectWithoutUsersInput[]
    createMany?: document_versionsCreateManyUsersInputEnvelope
    connect?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
  }

  export type documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput = {
    create?: XOR<documentsCreateWithoutUsers_documents_last_modified_byTousersInput, documentsUncheckedCreateWithoutUsers_documents_last_modified_byTousersInput> | documentsCreateWithoutUsers_documents_last_modified_byTousersInput[] | documentsUncheckedCreateWithoutUsers_documents_last_modified_byTousersInput[]
    connectOrCreate?: documentsCreateOrConnectWithoutUsers_documents_last_modified_byTousersInput | documentsCreateOrConnectWithoutUsers_documents_last_modified_byTousersInput[]
    createMany?: documentsCreateManyUsers_documents_last_modified_byTousersInputEnvelope
    connect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
  }

  export type documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput = {
    create?: XOR<documentsCreateWithoutUsers_documents_owner_idTousersInput, documentsUncheckedCreateWithoutUsers_documents_owner_idTousersInput> | documentsCreateWithoutUsers_documents_owner_idTousersInput[] | documentsUncheckedCreateWithoutUsers_documents_owner_idTousersInput[]
    connectOrCreate?: documentsCreateOrConnectWithoutUsers_documents_owner_idTousersInput | documentsCreateOrConnectWithoutUsers_documents_owner_idTousersInput[]
    createMany?: documentsCreateManyUsers_documents_owner_idTousersInputEnvelope
    connect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
  }

  export type conversationsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<conversationsCreateWithoutUsersInput, conversationsUncheckedCreateWithoutUsersInput> | conversationsCreateWithoutUsersInput[] | conversationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: conversationsCreateOrConnectWithoutUsersInput | conversationsCreateOrConnectWithoutUsersInput[]
    createMany?: conversationsCreateManyUsersInputEnvelope
    connect?: conversationsWhereUniqueInput | conversationsWhereUniqueInput[]
  }

  export type conversation_participantsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<conversation_participantsCreateWithoutUsersInput, conversation_participantsUncheckedCreateWithoutUsersInput> | conversation_participantsCreateWithoutUsersInput[] | conversation_participantsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: conversation_participantsCreateOrConnectWithoutUsersInput | conversation_participantsCreateOrConnectWithoutUsersInput[]
    createMany?: conversation_participantsCreateManyUsersInputEnvelope
    connect?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
  }

  export type messagesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<messagesCreateWithoutUsersInput, messagesUncheckedCreateWithoutUsersInput> | messagesCreateWithoutUsersInput[] | messagesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUsersInput | messagesCreateOrConnectWithoutUsersInput[]
    createMany?: messagesCreateManyUsersInputEnvelope
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
  }

  export type notificationsUncheckedCreateNestedManyWithoutUsers_notifications_user_idTousersInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_user_idTousersInput> | notificationsCreateWithoutUsers_notifications_user_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_user_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_user_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_user_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_user_idTousersInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type notificationsUncheckedCreateNestedManyWithoutUsers_notifications_sender_idTousersInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_sender_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_sender_idTousersInput> | notificationsCreateWithoutUsers_notifications_sender_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_sender_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_sender_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_sender_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_sender_idTousersInputEnvelope
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
  }

  export type call_participantsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<call_participantsCreateWithoutUsersInput, call_participantsUncheckedCreateWithoutUsersInput> | call_participantsCreateWithoutUsersInput[] | call_participantsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: call_participantsCreateOrConnectWithoutUsersInput | call_participantsCreateOrConnectWithoutUsersInput[]
    upsert?: call_participantsUpsertWithWhereUniqueWithoutUsersInput | call_participantsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: call_participantsCreateManyUsersInputEnvelope
    set?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    disconnect?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    delete?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    connect?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    update?: call_participantsUpdateWithWhereUniqueWithoutUsersInput | call_participantsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: call_participantsUpdateManyWithWhereWithoutUsersInput | call_participantsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: call_participantsScalarWhereInput | call_participantsScalarWhereInput[]
  }

  export type callsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<callsCreateWithoutUsersInput, callsUncheckedCreateWithoutUsersInput> | callsCreateWithoutUsersInput[] | callsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: callsCreateOrConnectWithoutUsersInput | callsCreateOrConnectWithoutUsersInput[]
    upsert?: callsUpsertWithWhereUniqueWithoutUsersInput | callsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: callsCreateManyUsersInputEnvelope
    set?: callsWhereUniqueInput | callsWhereUniqueInput[]
    disconnect?: callsWhereUniqueInput | callsWhereUniqueInput[]
    delete?: callsWhereUniqueInput | callsWhereUniqueInput[]
    connect?: callsWhereUniqueInput | callsWhereUniqueInput[]
    update?: callsUpdateWithWhereUniqueWithoutUsersInput | callsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: callsUpdateManyWithWhereWithoutUsersInput | callsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: callsScalarWhereInput | callsScalarWhereInput[]
  }

  export type document_versionsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<document_versionsCreateWithoutUsersInput, document_versionsUncheckedCreateWithoutUsersInput> | document_versionsCreateWithoutUsersInput[] | document_versionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: document_versionsCreateOrConnectWithoutUsersInput | document_versionsCreateOrConnectWithoutUsersInput[]
    upsert?: document_versionsUpsertWithWhereUniqueWithoutUsersInput | document_versionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: document_versionsCreateManyUsersInputEnvelope
    set?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    disconnect?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    delete?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    connect?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    update?: document_versionsUpdateWithWhereUniqueWithoutUsersInput | document_versionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: document_versionsUpdateManyWithWhereWithoutUsersInput | document_versionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: document_versionsScalarWhereInput | document_versionsScalarWhereInput[]
  }

  export type documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput = {
    create?: XOR<documentsCreateWithoutUsers_documents_last_modified_byTousersInput, documentsUncheckedCreateWithoutUsers_documents_last_modified_byTousersInput> | documentsCreateWithoutUsers_documents_last_modified_byTousersInput[] | documentsUncheckedCreateWithoutUsers_documents_last_modified_byTousersInput[]
    connectOrCreate?: documentsCreateOrConnectWithoutUsers_documents_last_modified_byTousersInput | documentsCreateOrConnectWithoutUsers_documents_last_modified_byTousersInput[]
    upsert?: documentsUpsertWithWhereUniqueWithoutUsers_documents_last_modified_byTousersInput | documentsUpsertWithWhereUniqueWithoutUsers_documents_last_modified_byTousersInput[]
    createMany?: documentsCreateManyUsers_documents_last_modified_byTousersInputEnvelope
    set?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    disconnect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    delete?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    connect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    update?: documentsUpdateWithWhereUniqueWithoutUsers_documents_last_modified_byTousersInput | documentsUpdateWithWhereUniqueWithoutUsers_documents_last_modified_byTousersInput[]
    updateMany?: documentsUpdateManyWithWhereWithoutUsers_documents_last_modified_byTousersInput | documentsUpdateManyWithWhereWithoutUsers_documents_last_modified_byTousersInput[]
    deleteMany?: documentsScalarWhereInput | documentsScalarWhereInput[]
  }

  export type documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput = {
    create?: XOR<documentsCreateWithoutUsers_documents_owner_idTousersInput, documentsUncheckedCreateWithoutUsers_documents_owner_idTousersInput> | documentsCreateWithoutUsers_documents_owner_idTousersInput[] | documentsUncheckedCreateWithoutUsers_documents_owner_idTousersInput[]
    connectOrCreate?: documentsCreateOrConnectWithoutUsers_documents_owner_idTousersInput | documentsCreateOrConnectWithoutUsers_documents_owner_idTousersInput[]
    upsert?: documentsUpsertWithWhereUniqueWithoutUsers_documents_owner_idTousersInput | documentsUpsertWithWhereUniqueWithoutUsers_documents_owner_idTousersInput[]
    createMany?: documentsCreateManyUsers_documents_owner_idTousersInputEnvelope
    set?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    disconnect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    delete?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    connect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    update?: documentsUpdateWithWhereUniqueWithoutUsers_documents_owner_idTousersInput | documentsUpdateWithWhereUniqueWithoutUsers_documents_owner_idTousersInput[]
    updateMany?: documentsUpdateManyWithWhereWithoutUsers_documents_owner_idTousersInput | documentsUpdateManyWithWhereWithoutUsers_documents_owner_idTousersInput[]
    deleteMany?: documentsScalarWhereInput | documentsScalarWhereInput[]
  }

  export type conversationsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<conversationsCreateWithoutUsersInput, conversationsUncheckedCreateWithoutUsersInput> | conversationsCreateWithoutUsersInput[] | conversationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: conversationsCreateOrConnectWithoutUsersInput | conversationsCreateOrConnectWithoutUsersInput[]
    upsert?: conversationsUpsertWithWhereUniqueWithoutUsersInput | conversationsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: conversationsCreateManyUsersInputEnvelope
    set?: conversationsWhereUniqueInput | conversationsWhereUniqueInput[]
    disconnect?: conversationsWhereUniqueInput | conversationsWhereUniqueInput[]
    delete?: conversationsWhereUniqueInput | conversationsWhereUniqueInput[]
    connect?: conversationsWhereUniqueInput | conversationsWhereUniqueInput[]
    update?: conversationsUpdateWithWhereUniqueWithoutUsersInput | conversationsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: conversationsUpdateManyWithWhereWithoutUsersInput | conversationsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: conversationsScalarWhereInput | conversationsScalarWhereInput[]
  }

  export type conversation_participantsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<conversation_participantsCreateWithoutUsersInput, conversation_participantsUncheckedCreateWithoutUsersInput> | conversation_participantsCreateWithoutUsersInput[] | conversation_participantsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: conversation_participantsCreateOrConnectWithoutUsersInput | conversation_participantsCreateOrConnectWithoutUsersInput[]
    upsert?: conversation_participantsUpsertWithWhereUniqueWithoutUsersInput | conversation_participantsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: conversation_participantsCreateManyUsersInputEnvelope
    set?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    disconnect?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    delete?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    connect?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    update?: conversation_participantsUpdateWithWhereUniqueWithoutUsersInput | conversation_participantsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: conversation_participantsUpdateManyWithWhereWithoutUsersInput | conversation_participantsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: conversation_participantsScalarWhereInput | conversation_participantsScalarWhereInput[]
  }

  export type messagesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<messagesCreateWithoutUsersInput, messagesUncheckedCreateWithoutUsersInput> | messagesCreateWithoutUsersInput[] | messagesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUsersInput | messagesCreateOrConnectWithoutUsersInput[]
    upsert?: messagesUpsertWithWhereUniqueWithoutUsersInput | messagesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: messagesCreateManyUsersInputEnvelope
    set?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    disconnect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    delete?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    update?: messagesUpdateWithWhereUniqueWithoutUsersInput | messagesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: messagesUpdateManyWithWhereWithoutUsersInput | messagesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: messagesScalarWhereInput | messagesScalarWhereInput[]
  }

  export type notificationsUpdateManyWithoutUsers_notifications_user_idTousersNestedInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_user_idTousersInput> | notificationsCreateWithoutUsers_notifications_user_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_user_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_user_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_user_idTousersInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutUsers_notifications_user_idTousersInput | notificationsUpsertWithWhereUniqueWithoutUsers_notifications_user_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_user_idTousersInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutUsers_notifications_user_idTousersInput | notificationsUpdateWithWhereUniqueWithoutUsers_notifications_user_idTousersInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutUsers_notifications_user_idTousersInput | notificationsUpdateManyWithWhereWithoutUsers_notifications_user_idTousersInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type notificationsUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_sender_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_sender_idTousersInput> | notificationsCreateWithoutUsers_notifications_sender_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_sender_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_sender_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_sender_idTousersInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutUsers_notifications_sender_idTousersInput | notificationsUpsertWithWhereUniqueWithoutUsers_notifications_sender_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_sender_idTousersInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutUsers_notifications_sender_idTousersInput | notificationsUpdateWithWhereUniqueWithoutUsers_notifications_sender_idTousersInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutUsers_notifications_sender_idTousersInput | notificationsUpdateManyWithWhereWithoutUsers_notifications_sender_idTousersInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type call_participantsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<call_participantsCreateWithoutUsersInput, call_participantsUncheckedCreateWithoutUsersInput> | call_participantsCreateWithoutUsersInput[] | call_participantsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: call_participantsCreateOrConnectWithoutUsersInput | call_participantsCreateOrConnectWithoutUsersInput[]
    upsert?: call_participantsUpsertWithWhereUniqueWithoutUsersInput | call_participantsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: call_participantsCreateManyUsersInputEnvelope
    set?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    disconnect?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    delete?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    connect?: call_participantsWhereUniqueInput | call_participantsWhereUniqueInput[]
    update?: call_participantsUpdateWithWhereUniqueWithoutUsersInput | call_participantsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: call_participantsUpdateManyWithWhereWithoutUsersInput | call_participantsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: call_participantsScalarWhereInput | call_participantsScalarWhereInput[]
  }

  export type callsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<callsCreateWithoutUsersInput, callsUncheckedCreateWithoutUsersInput> | callsCreateWithoutUsersInput[] | callsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: callsCreateOrConnectWithoutUsersInput | callsCreateOrConnectWithoutUsersInput[]
    upsert?: callsUpsertWithWhereUniqueWithoutUsersInput | callsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: callsCreateManyUsersInputEnvelope
    set?: callsWhereUniqueInput | callsWhereUniqueInput[]
    disconnect?: callsWhereUniqueInput | callsWhereUniqueInput[]
    delete?: callsWhereUniqueInput | callsWhereUniqueInput[]
    connect?: callsWhereUniqueInput | callsWhereUniqueInput[]
    update?: callsUpdateWithWhereUniqueWithoutUsersInput | callsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: callsUpdateManyWithWhereWithoutUsersInput | callsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: callsScalarWhereInput | callsScalarWhereInput[]
  }

  export type document_versionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<document_versionsCreateWithoutUsersInput, document_versionsUncheckedCreateWithoutUsersInput> | document_versionsCreateWithoutUsersInput[] | document_versionsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: document_versionsCreateOrConnectWithoutUsersInput | document_versionsCreateOrConnectWithoutUsersInput[]
    upsert?: document_versionsUpsertWithWhereUniqueWithoutUsersInput | document_versionsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: document_versionsCreateManyUsersInputEnvelope
    set?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    disconnect?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    delete?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    connect?: document_versionsWhereUniqueInput | document_versionsWhereUniqueInput[]
    update?: document_versionsUpdateWithWhereUniqueWithoutUsersInput | document_versionsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: document_versionsUpdateManyWithWhereWithoutUsersInput | document_versionsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: document_versionsScalarWhereInput | document_versionsScalarWhereInput[]
  }

  export type documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput = {
    create?: XOR<documentsCreateWithoutUsers_documents_last_modified_byTousersInput, documentsUncheckedCreateWithoutUsers_documents_last_modified_byTousersInput> | documentsCreateWithoutUsers_documents_last_modified_byTousersInput[] | documentsUncheckedCreateWithoutUsers_documents_last_modified_byTousersInput[]
    connectOrCreate?: documentsCreateOrConnectWithoutUsers_documents_last_modified_byTousersInput | documentsCreateOrConnectWithoutUsers_documents_last_modified_byTousersInput[]
    upsert?: documentsUpsertWithWhereUniqueWithoutUsers_documents_last_modified_byTousersInput | documentsUpsertWithWhereUniqueWithoutUsers_documents_last_modified_byTousersInput[]
    createMany?: documentsCreateManyUsers_documents_last_modified_byTousersInputEnvelope
    set?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    disconnect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    delete?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    connect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    update?: documentsUpdateWithWhereUniqueWithoutUsers_documents_last_modified_byTousersInput | documentsUpdateWithWhereUniqueWithoutUsers_documents_last_modified_byTousersInput[]
    updateMany?: documentsUpdateManyWithWhereWithoutUsers_documents_last_modified_byTousersInput | documentsUpdateManyWithWhereWithoutUsers_documents_last_modified_byTousersInput[]
    deleteMany?: documentsScalarWhereInput | documentsScalarWhereInput[]
  }

  export type documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput = {
    create?: XOR<documentsCreateWithoutUsers_documents_owner_idTousersInput, documentsUncheckedCreateWithoutUsers_documents_owner_idTousersInput> | documentsCreateWithoutUsers_documents_owner_idTousersInput[] | documentsUncheckedCreateWithoutUsers_documents_owner_idTousersInput[]
    connectOrCreate?: documentsCreateOrConnectWithoutUsers_documents_owner_idTousersInput | documentsCreateOrConnectWithoutUsers_documents_owner_idTousersInput[]
    upsert?: documentsUpsertWithWhereUniqueWithoutUsers_documents_owner_idTousersInput | documentsUpsertWithWhereUniqueWithoutUsers_documents_owner_idTousersInput[]
    createMany?: documentsCreateManyUsers_documents_owner_idTousersInputEnvelope
    set?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    disconnect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    delete?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    connect?: documentsWhereUniqueInput | documentsWhereUniqueInput[]
    update?: documentsUpdateWithWhereUniqueWithoutUsers_documents_owner_idTousersInput | documentsUpdateWithWhereUniqueWithoutUsers_documents_owner_idTousersInput[]
    updateMany?: documentsUpdateManyWithWhereWithoutUsers_documents_owner_idTousersInput | documentsUpdateManyWithWhereWithoutUsers_documents_owner_idTousersInput[]
    deleteMany?: documentsScalarWhereInput | documentsScalarWhereInput[]
  }

  export type conversationsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<conversationsCreateWithoutUsersInput, conversationsUncheckedCreateWithoutUsersInput> | conversationsCreateWithoutUsersInput[] | conversationsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: conversationsCreateOrConnectWithoutUsersInput | conversationsCreateOrConnectWithoutUsersInput[]
    upsert?: conversationsUpsertWithWhereUniqueWithoutUsersInput | conversationsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: conversationsCreateManyUsersInputEnvelope
    set?: conversationsWhereUniqueInput | conversationsWhereUniqueInput[]
    disconnect?: conversationsWhereUniqueInput | conversationsWhereUniqueInput[]
    delete?: conversationsWhereUniqueInput | conversationsWhereUniqueInput[]
    connect?: conversationsWhereUniqueInput | conversationsWhereUniqueInput[]
    update?: conversationsUpdateWithWhereUniqueWithoutUsersInput | conversationsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: conversationsUpdateManyWithWhereWithoutUsersInput | conversationsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: conversationsScalarWhereInput | conversationsScalarWhereInput[]
  }

  export type conversation_participantsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<conversation_participantsCreateWithoutUsersInput, conversation_participantsUncheckedCreateWithoutUsersInput> | conversation_participantsCreateWithoutUsersInput[] | conversation_participantsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: conversation_participantsCreateOrConnectWithoutUsersInput | conversation_participantsCreateOrConnectWithoutUsersInput[]
    upsert?: conversation_participantsUpsertWithWhereUniqueWithoutUsersInput | conversation_participantsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: conversation_participantsCreateManyUsersInputEnvelope
    set?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    disconnect?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    delete?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    connect?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    update?: conversation_participantsUpdateWithWhereUniqueWithoutUsersInput | conversation_participantsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: conversation_participantsUpdateManyWithWhereWithoutUsersInput | conversation_participantsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: conversation_participantsScalarWhereInput | conversation_participantsScalarWhereInput[]
  }

  export type messagesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<messagesCreateWithoutUsersInput, messagesUncheckedCreateWithoutUsersInput> | messagesCreateWithoutUsersInput[] | messagesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutUsersInput | messagesCreateOrConnectWithoutUsersInput[]
    upsert?: messagesUpsertWithWhereUniqueWithoutUsersInput | messagesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: messagesCreateManyUsersInputEnvelope
    set?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    disconnect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    delete?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    update?: messagesUpdateWithWhereUniqueWithoutUsersInput | messagesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: messagesUpdateManyWithWhereWithoutUsersInput | messagesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: messagesScalarWhereInput | messagesScalarWhereInput[]
  }

  export type notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersNestedInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_user_idTousersInput> | notificationsCreateWithoutUsers_notifications_user_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_user_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_user_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_user_idTousersInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutUsers_notifications_user_idTousersInput | notificationsUpsertWithWhereUniqueWithoutUsers_notifications_user_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_user_idTousersInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutUsers_notifications_user_idTousersInput | notificationsUpdateWithWhereUniqueWithoutUsers_notifications_user_idTousersInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutUsers_notifications_user_idTousersInput | notificationsUpdateManyWithWhereWithoutUsers_notifications_user_idTousersInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput = {
    create?: XOR<notificationsCreateWithoutUsers_notifications_sender_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_sender_idTousersInput> | notificationsCreateWithoutUsers_notifications_sender_idTousersInput[] | notificationsUncheckedCreateWithoutUsers_notifications_sender_idTousersInput[]
    connectOrCreate?: notificationsCreateOrConnectWithoutUsers_notifications_sender_idTousersInput | notificationsCreateOrConnectWithoutUsers_notifications_sender_idTousersInput[]
    upsert?: notificationsUpsertWithWhereUniqueWithoutUsers_notifications_sender_idTousersInput | notificationsUpsertWithWhereUniqueWithoutUsers_notifications_sender_idTousersInput[]
    createMany?: notificationsCreateManyUsers_notifications_sender_idTousersInputEnvelope
    set?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    disconnect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    delete?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    connect?: notificationsWhereUniqueInput | notificationsWhereUniqueInput[]
    update?: notificationsUpdateWithWhereUniqueWithoutUsers_notifications_sender_idTousersInput | notificationsUpdateWithWhereUniqueWithoutUsers_notifications_sender_idTousersInput[]
    updateMany?: notificationsUpdateManyWithWhereWithoutUsers_notifications_sender_idTousersInput | notificationsUpdateManyWithWhereWithoutUsers_notifications_sender_idTousersInput[]
    deleteMany?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutConversations_createdInput = {
    create?: XOR<usersCreateWithoutConversations_createdInput, usersUncheckedCreateWithoutConversations_createdInput>
    connectOrCreate?: usersCreateOrConnectWithoutConversations_createdInput
    connect?: usersWhereUniqueInput
  }

  export type conversation_participantsCreateNestedManyWithoutConversationsInput = {
    create?: XOR<conversation_participantsCreateWithoutConversationsInput, conversation_participantsUncheckedCreateWithoutConversationsInput> | conversation_participantsCreateWithoutConversationsInput[] | conversation_participantsUncheckedCreateWithoutConversationsInput[]
    connectOrCreate?: conversation_participantsCreateOrConnectWithoutConversationsInput | conversation_participantsCreateOrConnectWithoutConversationsInput[]
    createMany?: conversation_participantsCreateManyConversationsInputEnvelope
    connect?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
  }

  export type messagesCreateNestedManyWithoutConversationsInput = {
    create?: XOR<messagesCreateWithoutConversationsInput, messagesUncheckedCreateWithoutConversationsInput> | messagesCreateWithoutConversationsInput[] | messagesUncheckedCreateWithoutConversationsInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutConversationsInput | messagesCreateOrConnectWithoutConversationsInput[]
    createMany?: messagesCreateManyConversationsInputEnvelope
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
  }

  export type conversation_participantsUncheckedCreateNestedManyWithoutConversationsInput = {
    create?: XOR<conversation_participantsCreateWithoutConversationsInput, conversation_participantsUncheckedCreateWithoutConversationsInput> | conversation_participantsCreateWithoutConversationsInput[] | conversation_participantsUncheckedCreateWithoutConversationsInput[]
    connectOrCreate?: conversation_participantsCreateOrConnectWithoutConversationsInput | conversation_participantsCreateOrConnectWithoutConversationsInput[]
    createMany?: conversation_participantsCreateManyConversationsInputEnvelope
    connect?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
  }

  export type messagesUncheckedCreateNestedManyWithoutConversationsInput = {
    create?: XOR<messagesCreateWithoutConversationsInput, messagesUncheckedCreateWithoutConversationsInput> | messagesCreateWithoutConversationsInput[] | messagesUncheckedCreateWithoutConversationsInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutConversationsInput | messagesCreateOrConnectWithoutConversationsInput[]
    createMany?: messagesCreateManyConversationsInputEnvelope
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
  }

  export type usersUpdateOneRequiredWithoutConversations_createdNestedInput = {
    create?: XOR<usersCreateWithoutConversations_createdInput, usersUncheckedCreateWithoutConversations_createdInput>
    connectOrCreate?: usersCreateOrConnectWithoutConversations_createdInput
    upsert?: usersUpsertWithoutConversations_createdInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutConversations_createdInput, usersUpdateWithoutConversations_createdInput>, usersUncheckedUpdateWithoutConversations_createdInput>
  }

  export type conversation_participantsUpdateManyWithoutConversationsNestedInput = {
    create?: XOR<conversation_participantsCreateWithoutConversationsInput, conversation_participantsUncheckedCreateWithoutConversationsInput> | conversation_participantsCreateWithoutConversationsInput[] | conversation_participantsUncheckedCreateWithoutConversationsInput[]
    connectOrCreate?: conversation_participantsCreateOrConnectWithoutConversationsInput | conversation_participantsCreateOrConnectWithoutConversationsInput[]
    upsert?: conversation_participantsUpsertWithWhereUniqueWithoutConversationsInput | conversation_participantsUpsertWithWhereUniqueWithoutConversationsInput[]
    createMany?: conversation_participantsCreateManyConversationsInputEnvelope
    set?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    disconnect?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    delete?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    connect?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    update?: conversation_participantsUpdateWithWhereUniqueWithoutConversationsInput | conversation_participantsUpdateWithWhereUniqueWithoutConversationsInput[]
    updateMany?: conversation_participantsUpdateManyWithWhereWithoutConversationsInput | conversation_participantsUpdateManyWithWhereWithoutConversationsInput[]
    deleteMany?: conversation_participantsScalarWhereInput | conversation_participantsScalarWhereInput[]
  }

  export type messagesUpdateManyWithoutConversationsNestedInput = {
    create?: XOR<messagesCreateWithoutConversationsInput, messagesUncheckedCreateWithoutConversationsInput> | messagesCreateWithoutConversationsInput[] | messagesUncheckedCreateWithoutConversationsInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutConversationsInput | messagesCreateOrConnectWithoutConversationsInput[]
    upsert?: messagesUpsertWithWhereUniqueWithoutConversationsInput | messagesUpsertWithWhereUniqueWithoutConversationsInput[]
    createMany?: messagesCreateManyConversationsInputEnvelope
    set?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    disconnect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    delete?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    update?: messagesUpdateWithWhereUniqueWithoutConversationsInput | messagesUpdateWithWhereUniqueWithoutConversationsInput[]
    updateMany?: messagesUpdateManyWithWhereWithoutConversationsInput | messagesUpdateManyWithWhereWithoutConversationsInput[]
    deleteMany?: messagesScalarWhereInput | messagesScalarWhereInput[]
  }

  export type conversation_participantsUncheckedUpdateManyWithoutConversationsNestedInput = {
    create?: XOR<conversation_participantsCreateWithoutConversationsInput, conversation_participantsUncheckedCreateWithoutConversationsInput> | conversation_participantsCreateWithoutConversationsInput[] | conversation_participantsUncheckedCreateWithoutConversationsInput[]
    connectOrCreate?: conversation_participantsCreateOrConnectWithoutConversationsInput | conversation_participantsCreateOrConnectWithoutConversationsInput[]
    upsert?: conversation_participantsUpsertWithWhereUniqueWithoutConversationsInput | conversation_participantsUpsertWithWhereUniqueWithoutConversationsInput[]
    createMany?: conversation_participantsCreateManyConversationsInputEnvelope
    set?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    disconnect?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    delete?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    connect?: conversation_participantsWhereUniqueInput | conversation_participantsWhereUniqueInput[]
    update?: conversation_participantsUpdateWithWhereUniqueWithoutConversationsInput | conversation_participantsUpdateWithWhereUniqueWithoutConversationsInput[]
    updateMany?: conversation_participantsUpdateManyWithWhereWithoutConversationsInput | conversation_participantsUpdateManyWithWhereWithoutConversationsInput[]
    deleteMany?: conversation_participantsScalarWhereInput | conversation_participantsScalarWhereInput[]
  }

  export type messagesUncheckedUpdateManyWithoutConversationsNestedInput = {
    create?: XOR<messagesCreateWithoutConversationsInput, messagesUncheckedCreateWithoutConversationsInput> | messagesCreateWithoutConversationsInput[] | messagesUncheckedCreateWithoutConversationsInput[]
    connectOrCreate?: messagesCreateOrConnectWithoutConversationsInput | messagesCreateOrConnectWithoutConversationsInput[]
    upsert?: messagesUpsertWithWhereUniqueWithoutConversationsInput | messagesUpsertWithWhereUniqueWithoutConversationsInput[]
    createMany?: messagesCreateManyConversationsInputEnvelope
    set?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    disconnect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    delete?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    connect?: messagesWhereUniqueInput | messagesWhereUniqueInput[]
    update?: messagesUpdateWithWhereUniqueWithoutConversationsInput | messagesUpdateWithWhereUniqueWithoutConversationsInput[]
    updateMany?: messagesUpdateManyWithWhereWithoutConversationsInput | messagesUpdateManyWithWhereWithoutConversationsInput[]
    deleteMany?: messagesScalarWhereInput | messagesScalarWhereInput[]
  }

  export type conversationsCreateNestedOneWithoutConversation_participantsInput = {
    create?: XOR<conversationsCreateWithoutConversation_participantsInput, conversationsUncheckedCreateWithoutConversation_participantsInput>
    connectOrCreate?: conversationsCreateOrConnectWithoutConversation_participantsInput
    connect?: conversationsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutConversation_participantsInput = {
    create?: XOR<usersCreateWithoutConversation_participantsInput, usersUncheckedCreateWithoutConversation_participantsInput>
    connectOrCreate?: usersCreateOrConnectWithoutConversation_participantsInput
    connect?: usersWhereUniqueInput
  }

  export type conversationsUpdateOneRequiredWithoutConversation_participantsNestedInput = {
    create?: XOR<conversationsCreateWithoutConversation_participantsInput, conversationsUncheckedCreateWithoutConversation_participantsInput>
    connectOrCreate?: conversationsCreateOrConnectWithoutConversation_participantsInput
    upsert?: conversationsUpsertWithoutConversation_participantsInput
    connect?: conversationsWhereUniqueInput
    update?: XOR<XOR<conversationsUpdateToOneWithWhereWithoutConversation_participantsInput, conversationsUpdateWithoutConversation_participantsInput>, conversationsUncheckedUpdateWithoutConversation_participantsInput>
  }

  export type usersUpdateOneRequiredWithoutConversation_participantsNestedInput = {
    create?: XOR<usersCreateWithoutConversation_participantsInput, usersUncheckedCreateWithoutConversation_participantsInput>
    connectOrCreate?: usersCreateOrConnectWithoutConversation_participantsInput
    upsert?: usersUpsertWithoutConversation_participantsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutConversation_participantsInput, usersUpdateWithoutConversation_participantsInput>, usersUncheckedUpdateWithoutConversation_participantsInput>
  }

  export type conversationsCreateNestedOneWithoutMessagesInput = {
    create?: XOR<conversationsCreateWithoutMessagesInput, conversationsUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: conversationsCreateOrConnectWithoutMessagesInput
    connect?: conversationsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutMessages_sentInput = {
    create?: XOR<usersCreateWithoutMessages_sentInput, usersUncheckedCreateWithoutMessages_sentInput>
    connectOrCreate?: usersCreateOrConnectWithoutMessages_sentInput
    connect?: usersWhereUniqueInput
  }

  export type conversationsUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<conversationsCreateWithoutMessagesInput, conversationsUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: conversationsCreateOrConnectWithoutMessagesInput
    upsert?: conversationsUpsertWithoutMessagesInput
    connect?: conversationsWhereUniqueInput
    update?: XOR<XOR<conversationsUpdateToOneWithWhereWithoutMessagesInput, conversationsUpdateWithoutMessagesInput>, conversationsUncheckedUpdateWithoutMessagesInput>
  }

  export type usersUpdateOneRequiredWithoutMessages_sentNestedInput = {
    create?: XOR<usersCreateWithoutMessages_sentInput, usersUncheckedCreateWithoutMessages_sentInput>
    connectOrCreate?: usersCreateOrConnectWithoutMessages_sentInput
    upsert?: usersUpsertWithoutMessages_sentInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutMessages_sentInput, usersUpdateWithoutMessages_sentInput>, usersUncheckedUpdateWithoutMessages_sentInput>
  }

  export type usersCreateNestedOneWithoutNotifications_notifications_user_idTousersInput = {
    create?: XOR<usersCreateWithoutNotifications_notifications_user_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_user_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutNotifications_notifications_user_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutNotifications_notifications_sender_idTousersInput = {
    create?: XOR<usersCreateWithoutNotifications_notifications_sender_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_sender_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutNotifications_notifications_sender_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutNotifications_notifications_user_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutNotifications_notifications_user_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_user_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutNotifications_notifications_user_idTousersInput
    upsert?: usersUpsertWithoutNotifications_notifications_user_idTousersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutNotifications_notifications_user_idTousersInput, usersUpdateWithoutNotifications_notifications_user_idTousersInput>, usersUncheckedUpdateWithoutNotifications_notifications_user_idTousersInput>
  }

  export type usersUpdateOneWithoutNotifications_notifications_sender_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutNotifications_notifications_sender_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_sender_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutNotifications_notifications_sender_idTousersInput
    upsert?: usersUpsertWithoutNotifications_notifications_sender_idTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutNotifications_notifications_sender_idTousersInput, usersUpdateWithoutNotifications_notifications_sender_idTousersInput>, usersUncheckedUpdateWithoutNotifications_notifications_sender_idTousersInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type callsCreateWithoutCall_participantsInput = {
    started_at?: Date | string | null
    ended_at?: Date | string | null
    call_type: string
    status?: string | null
    documents: documentsCreateNestedOneWithoutCallsInput
    users: usersCreateNestedOneWithoutCallsInput
  }

  export type callsUncheckedCreateWithoutCall_participantsInput = {
    id?: number
    document_id: number
    initiated_by: number
    started_at?: Date | string | null
    ended_at?: Date | string | null
    call_type: string
    status?: string | null
  }

  export type callsCreateOrConnectWithoutCall_participantsInput = {
    where: callsWhereUniqueInput
    create: XOR<callsCreateWithoutCall_participantsInput, callsUncheckedCreateWithoutCall_participantsInput>
  }

  export type usersCreateWithoutCall_participantsInput = {
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    calls?: callsCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsCreateNestedManyWithoutUsersInput
    messages_sent?: messagesCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersUncheckedCreateWithoutCall_participantsInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    calls?: callsUncheckedCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsUncheckedCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutUsersInput
    messages_sent?: messagesUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersCreateOrConnectWithoutCall_participantsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCall_participantsInput, usersUncheckedCreateWithoutCall_participantsInput>
  }

  export type callsUpsertWithoutCall_participantsInput = {
    update: XOR<callsUpdateWithoutCall_participantsInput, callsUncheckedUpdateWithoutCall_participantsInput>
    create: XOR<callsCreateWithoutCall_participantsInput, callsUncheckedCreateWithoutCall_participantsInput>
    where?: callsWhereInput
  }

  export type callsUpdateToOneWithWhereWithoutCall_participantsInput = {
    where?: callsWhereInput
    data: XOR<callsUpdateWithoutCall_participantsInput, callsUncheckedUpdateWithoutCall_participantsInput>
  }

  export type callsUpdateWithoutCall_participantsInput = {
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: documentsUpdateOneRequiredWithoutCallsNestedInput
    users?: usersUpdateOneRequiredWithoutCallsNestedInput
  }

  export type callsUncheckedUpdateWithoutCall_participantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    initiated_by?: IntFieldUpdateOperationsInput | number
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersUpsertWithoutCall_participantsInput = {
    update: XOR<usersUpdateWithoutCall_participantsInput, usersUncheckedUpdateWithoutCall_participantsInput>
    create: XOR<usersCreateWithoutCall_participantsInput, usersUncheckedCreateWithoutCall_participantsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutCall_participantsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutCall_participantsInput, usersUncheckedUpdateWithoutCall_participantsInput>
  }

  export type usersUpdateWithoutCall_participantsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    calls?: callsUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutCall_participantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    calls?: callsUncheckedUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUncheckedUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type call_participantsCreateWithoutCallsInput = {
    joined_at?: Date | string | null
    left_at?: Date | string | null
    is_active?: boolean | null
    users: usersCreateNestedOneWithoutCall_participantsInput
  }

  export type call_participantsUncheckedCreateWithoutCallsInput = {
    id?: number
    user_id: number
    joined_at?: Date | string | null
    left_at?: Date | string | null
    is_active?: boolean | null
  }

  export type call_participantsCreateOrConnectWithoutCallsInput = {
    where: call_participantsWhereUniqueInput
    create: XOR<call_participantsCreateWithoutCallsInput, call_participantsUncheckedCreateWithoutCallsInput>
  }

  export type call_participantsCreateManyCallsInputEnvelope = {
    data: call_participantsCreateManyCallsInput | call_participantsCreateManyCallsInput[]
    skipDuplicates?: boolean
  }

  export type documentsCreateWithoutCallsInput = {
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateWithoutCallsInput = {
    id?: number
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_modified_by?: number | null
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutDocumentsInput
    other_documents?: documentsUncheckedCreateNestedManyWithoutDocumentsInput
  }

  export type documentsCreateOrConnectWithoutCallsInput = {
    where: documentsWhereUniqueInput
    create: XOR<documentsCreateWithoutCallsInput, documentsUncheckedCreateWithoutCallsInput>
  }

  export type usersCreateWithoutCallsInput = {
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsCreateNestedManyWithoutUsersInput
    messages_sent?: messagesCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersUncheckedCreateWithoutCallsInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsUncheckedCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutUsersInput
    messages_sent?: messagesUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersCreateOrConnectWithoutCallsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutCallsInput, usersUncheckedCreateWithoutCallsInput>
  }

  export type call_participantsUpsertWithWhereUniqueWithoutCallsInput = {
    where: call_participantsWhereUniqueInput
    update: XOR<call_participantsUpdateWithoutCallsInput, call_participantsUncheckedUpdateWithoutCallsInput>
    create: XOR<call_participantsCreateWithoutCallsInput, call_participantsUncheckedCreateWithoutCallsInput>
  }

  export type call_participantsUpdateWithWhereUniqueWithoutCallsInput = {
    where: call_participantsWhereUniqueInput
    data: XOR<call_participantsUpdateWithoutCallsInput, call_participantsUncheckedUpdateWithoutCallsInput>
  }

  export type call_participantsUpdateManyWithWhereWithoutCallsInput = {
    where: call_participantsScalarWhereInput
    data: XOR<call_participantsUpdateManyMutationInput, call_participantsUncheckedUpdateManyWithoutCallsInput>
  }

  export type call_participantsScalarWhereInput = {
    AND?: call_participantsScalarWhereInput | call_participantsScalarWhereInput[]
    OR?: call_participantsScalarWhereInput[]
    NOT?: call_participantsScalarWhereInput | call_participantsScalarWhereInput[]
    id?: IntFilter<"call_participants"> | number
    call_id?: IntFilter<"call_participants"> | number
    user_id?: IntFilter<"call_participants"> | number
    joined_at?: DateTimeNullableFilter<"call_participants"> | Date | string | null
    left_at?: DateTimeNullableFilter<"call_participants"> | Date | string | null
    is_active?: BoolNullableFilter<"call_participants"> | boolean | null
  }

  export type documentsUpsertWithoutCallsInput = {
    update: XOR<documentsUpdateWithoutCallsInput, documentsUncheckedUpdateWithoutCallsInput>
    create: XOR<documentsCreateWithoutCallsInput, documentsUncheckedCreateWithoutCallsInput>
    where?: documentsWhereInput
  }

  export type documentsUpdateToOneWithWhereWithoutCallsInput = {
    where?: documentsWhereInput
    data: XOR<documentsUpdateWithoutCallsInput, documentsUncheckedUpdateWithoutCallsInput>
  }

  export type documentsUpdateWithoutCallsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutCallsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    document_versions?: document_versionsUncheckedUpdateManyWithoutDocumentsNestedInput
    other_documents?: documentsUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type usersUpsertWithoutCallsInput = {
    update: XOR<usersUpdateWithoutCallsInput, usersUncheckedUpdateWithoutCallsInput>
    create: XOR<usersCreateWithoutCallsInput, usersUncheckedCreateWithoutCallsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutCallsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutCallsInput, usersUncheckedUpdateWithoutCallsInput>
  }

  export type usersUpdateWithoutCallsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutCallsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUncheckedUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type documentsCreateWithoutDocument_versionsInput = {
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateWithoutDocument_versionsInput = {
    id?: number
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_modified_by?: number | null
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    other_documents?: documentsUncheckedCreateNestedManyWithoutDocumentsInput
  }

  export type documentsCreateOrConnectWithoutDocument_versionsInput = {
    where: documentsWhereUniqueInput
    create: XOR<documentsCreateWithoutDocument_versionsInput, documentsUncheckedCreateWithoutDocument_versionsInput>
  }

  export type usersCreateWithoutDocument_versionsInput = {
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsCreateNestedManyWithoutUsersInput
    calls?: callsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsCreateNestedManyWithoutUsersInput
    messages_sent?: messagesCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersUncheckedCreateWithoutDocument_versionsInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutUsersInput
    calls?: callsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsUncheckedCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutUsersInput
    messages_sent?: messagesUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersCreateOrConnectWithoutDocument_versionsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutDocument_versionsInput, usersUncheckedCreateWithoutDocument_versionsInput>
  }

  export type documentsUpsertWithoutDocument_versionsInput = {
    update: XOR<documentsUpdateWithoutDocument_versionsInput, documentsUncheckedUpdateWithoutDocument_versionsInput>
    create: XOR<documentsCreateWithoutDocument_versionsInput, documentsUncheckedCreateWithoutDocument_versionsInput>
    where?: documentsWhereInput
  }

  export type documentsUpdateToOneWithWhereWithoutDocument_versionsInput = {
    where?: documentsWhereInput
    data: XOR<documentsUpdateWithoutDocument_versionsInput, documentsUncheckedUpdateWithoutDocument_versionsInput>
  }

  export type documentsUpdateWithoutDocument_versionsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutDocument_versionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    other_documents?: documentsUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type usersUpsertWithoutDocument_versionsInput = {
    update: XOR<usersUpdateWithoutDocument_versionsInput, usersUncheckedUpdateWithoutDocument_versionsInput>
    create: XOR<usersCreateWithoutDocument_versionsInput, usersUncheckedCreateWithoutDocument_versionsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutDocument_versionsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutDocument_versionsInput, usersUncheckedUpdateWithoutDocument_versionsInput>
  }

  export type usersUpdateWithoutDocument_versionsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUpdateManyWithoutUsersNestedInput
    calls?: callsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutDocument_versionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutUsersNestedInput
    calls?: callsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUncheckedUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type callsCreateWithoutDocumentsInput = {
    started_at?: Date | string | null
    ended_at?: Date | string | null
    call_type: string
    status?: string | null
    call_participants?: call_participantsCreateNestedManyWithoutCallsInput
    users: usersCreateNestedOneWithoutCallsInput
  }

  export type callsUncheckedCreateWithoutDocumentsInput = {
    id?: number
    initiated_by: number
    started_at?: Date | string | null
    ended_at?: Date | string | null
    call_type: string
    status?: string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutCallsInput
  }

  export type callsCreateOrConnectWithoutDocumentsInput = {
    where: callsWhereUniqueInput
    create: XOR<callsCreateWithoutDocumentsInput, callsUncheckedCreateWithoutDocumentsInput>
  }

  export type callsCreateManyDocumentsInputEnvelope = {
    data: callsCreateManyDocumentsInput | callsCreateManyDocumentsInput[]
    skipDuplicates?: boolean
  }

  export type document_versionsCreateWithoutDocumentsInput = {
    version_number: number
    title?: string | null
    content?: string | null
    file_path?: string | null
    file_size?: bigint | number | null
    file_type?: string | null
    modification_date?: Date | string
    change_summary?: string | null
    is_major_version?: boolean
    users: usersCreateNestedOneWithoutDocument_versionsInput
  }

  export type document_versionsUncheckedCreateWithoutDocumentsInput = {
    id?: number
    version_number: number
    title?: string | null
    content?: string | null
    file_path?: string | null
    file_size?: bigint | number | null
    file_type?: string | null
    modified_by: number
    modification_date?: Date | string
    change_summary?: string | null
    is_major_version?: boolean
  }

  export type document_versionsCreateOrConnectWithoutDocumentsInput = {
    where: document_versionsWhereUniqueInput
    create: XOR<document_versionsCreateWithoutDocumentsInput, document_versionsUncheckedCreateWithoutDocumentsInput>
  }

  export type document_versionsCreateManyDocumentsInputEnvelope = {
    data: document_versionsCreateManyDocumentsInput | document_versionsCreateManyDocumentsInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutDocuments_documents_last_modified_byTousersInput = {
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsCreateNestedManyWithoutUsersInput
    calls?: callsCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsCreateNestedManyWithoutUsersInput
    messages_sent?: messagesCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersUncheckedCreateWithoutDocuments_documents_last_modified_byTousersInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutUsersInput
    calls?: callsUncheckedCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsUncheckedCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutUsersInput
    messages_sent?: messagesUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersCreateOrConnectWithoutDocuments_documents_last_modified_byTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutDocuments_documents_last_modified_byTousersInput, usersUncheckedCreateWithoutDocuments_documents_last_modified_byTousersInput>
  }

  export type usersCreateWithoutDocuments_documents_owner_idTousersInput = {
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsCreateNestedManyWithoutUsersInput
    calls?: callsCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    conversations_created?: conversationsCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsCreateNestedManyWithoutUsersInput
    messages_sent?: messagesCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersUncheckedCreateWithoutDocuments_documents_owner_idTousersInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutUsersInput
    calls?: callsUncheckedCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    conversations_created?: conversationsUncheckedCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutUsersInput
    messages_sent?: messagesUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersCreateOrConnectWithoutDocuments_documents_owner_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutDocuments_documents_owner_idTousersInput, usersUncheckedCreateWithoutDocuments_documents_owner_idTousersInput>
  }

  export type documentsCreateWithoutOther_documentsInput = {
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
  }

  export type documentsUncheckedCreateWithoutOther_documentsInput = {
    id?: number
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_modified_by?: number | null
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutDocumentsInput
  }

  export type documentsCreateOrConnectWithoutOther_documentsInput = {
    where: documentsWhereUniqueInput
    create: XOR<documentsCreateWithoutOther_documentsInput, documentsUncheckedCreateWithoutOther_documentsInput>
  }

  export type documentsCreateWithoutDocumentsInput = {
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateWithoutDocumentsInput = {
    id?: number
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    owner_id: number
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_modified_by?: number | null
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutDocumentsInput
    other_documents?: documentsUncheckedCreateNestedManyWithoutDocumentsInput
  }

  export type documentsCreateOrConnectWithoutDocumentsInput = {
    where: documentsWhereUniqueInput
    create: XOR<documentsCreateWithoutDocumentsInput, documentsUncheckedCreateWithoutDocumentsInput>
  }

  export type documentsCreateManyDocumentsInputEnvelope = {
    data: documentsCreateManyDocumentsInput | documentsCreateManyDocumentsInput[]
    skipDuplicates?: boolean
  }

  export type callsUpsertWithWhereUniqueWithoutDocumentsInput = {
    where: callsWhereUniqueInput
    update: XOR<callsUpdateWithoutDocumentsInput, callsUncheckedUpdateWithoutDocumentsInput>
    create: XOR<callsCreateWithoutDocumentsInput, callsUncheckedCreateWithoutDocumentsInput>
  }

  export type callsUpdateWithWhereUniqueWithoutDocumentsInput = {
    where: callsWhereUniqueInput
    data: XOR<callsUpdateWithoutDocumentsInput, callsUncheckedUpdateWithoutDocumentsInput>
  }

  export type callsUpdateManyWithWhereWithoutDocumentsInput = {
    where: callsScalarWhereInput
    data: XOR<callsUpdateManyMutationInput, callsUncheckedUpdateManyWithoutDocumentsInput>
  }

  export type callsScalarWhereInput = {
    AND?: callsScalarWhereInput | callsScalarWhereInput[]
    OR?: callsScalarWhereInput[]
    NOT?: callsScalarWhereInput | callsScalarWhereInput[]
    id?: IntFilter<"calls"> | number
    document_id?: IntFilter<"calls"> | number
    initiated_by?: IntFilter<"calls"> | number
    started_at?: DateTimeNullableFilter<"calls"> | Date | string | null
    ended_at?: DateTimeNullableFilter<"calls"> | Date | string | null
    call_type?: StringFilter<"calls"> | string
    status?: StringNullableFilter<"calls"> | string | null
  }

  export type document_versionsUpsertWithWhereUniqueWithoutDocumentsInput = {
    where: document_versionsWhereUniqueInput
    update: XOR<document_versionsUpdateWithoutDocumentsInput, document_versionsUncheckedUpdateWithoutDocumentsInput>
    create: XOR<document_versionsCreateWithoutDocumentsInput, document_versionsUncheckedCreateWithoutDocumentsInput>
  }

  export type document_versionsUpdateWithWhereUniqueWithoutDocumentsInput = {
    where: document_versionsWhereUniqueInput
    data: XOR<document_versionsUpdateWithoutDocumentsInput, document_versionsUncheckedUpdateWithoutDocumentsInput>
  }

  export type document_versionsUpdateManyWithWhereWithoutDocumentsInput = {
    where: document_versionsScalarWhereInput
    data: XOR<document_versionsUpdateManyMutationInput, document_versionsUncheckedUpdateManyWithoutDocumentsInput>
  }

  export type document_versionsScalarWhereInput = {
    AND?: document_versionsScalarWhereInput | document_versionsScalarWhereInput[]
    OR?: document_versionsScalarWhereInput[]
    NOT?: document_versionsScalarWhereInput | document_versionsScalarWhereInput[]
    id?: IntFilter<"document_versions"> | number
    document_id?: IntFilter<"document_versions"> | number
    version_number?: IntFilter<"document_versions"> | number
    title?: StringNullableFilter<"document_versions"> | string | null
    content?: StringNullableFilter<"document_versions"> | string | null
    file_path?: StringNullableFilter<"document_versions"> | string | null
    file_size?: BigIntNullableFilter<"document_versions"> | bigint | number | null
    file_type?: StringNullableFilter<"document_versions"> | string | null
    modified_by?: IntFilter<"document_versions"> | number
    modification_date?: DateTimeFilter<"document_versions"> | Date | string
    change_summary?: StringNullableFilter<"document_versions"> | string | null
    is_major_version?: BoolFilter<"document_versions"> | boolean
  }

  export type usersUpsertWithoutDocuments_documents_last_modified_byTousersInput = {
    update: XOR<usersUpdateWithoutDocuments_documents_last_modified_byTousersInput, usersUncheckedUpdateWithoutDocuments_documents_last_modified_byTousersInput>
    create: XOR<usersCreateWithoutDocuments_documents_last_modified_byTousersInput, usersUncheckedCreateWithoutDocuments_documents_last_modified_byTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutDocuments_documents_last_modified_byTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutDocuments_documents_last_modified_byTousersInput, usersUncheckedUpdateWithoutDocuments_documents_last_modified_byTousersInput>
  }

  export type usersUpdateWithoutDocuments_documents_last_modified_byTousersInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUpdateManyWithoutUsersNestedInput
    calls?: callsUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutDocuments_documents_last_modified_byTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutUsersNestedInput
    calls?: callsUncheckedUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUncheckedUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersUpsertWithoutDocuments_documents_owner_idTousersInput = {
    update: XOR<usersUpdateWithoutDocuments_documents_owner_idTousersInput, usersUncheckedUpdateWithoutDocuments_documents_owner_idTousersInput>
    create: XOR<usersCreateWithoutDocuments_documents_owner_idTousersInput, usersUncheckedCreateWithoutDocuments_documents_owner_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutDocuments_documents_owner_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutDocuments_documents_owner_idTousersInput, usersUncheckedUpdateWithoutDocuments_documents_owner_idTousersInput>
  }

  export type usersUpdateWithoutDocuments_documents_owner_idTousersInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUpdateManyWithoutUsersNestedInput
    calls?: callsUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    conversations_created?: conversationsUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutDocuments_documents_owner_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutUsersNestedInput
    calls?: callsUncheckedUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    conversations_created?: conversationsUncheckedUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type documentsUpsertWithoutOther_documentsInput = {
    update: XOR<documentsUpdateWithoutOther_documentsInput, documentsUncheckedUpdateWithoutOther_documentsInput>
    create: XOR<documentsCreateWithoutOther_documentsInput, documentsUncheckedCreateWithoutOther_documentsInput>
    where?: documentsWhereInput
  }

  export type documentsUpdateToOneWithWhereWithoutOther_documentsInput = {
    where?: documentsWhereInput
    data: XOR<documentsUpdateWithoutOther_documentsInput, documentsUncheckedUpdateWithoutOther_documentsInput>
  }

  export type documentsUpdateWithoutOther_documentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutOther_documentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUpsertWithWhereUniqueWithoutDocumentsInput = {
    where: documentsWhereUniqueInput
    update: XOR<documentsUpdateWithoutDocumentsInput, documentsUncheckedUpdateWithoutDocumentsInput>
    create: XOR<documentsCreateWithoutDocumentsInput, documentsUncheckedCreateWithoutDocumentsInput>
  }

  export type documentsUpdateWithWhereUniqueWithoutDocumentsInput = {
    where: documentsWhereUniqueInput
    data: XOR<documentsUpdateWithoutDocumentsInput, documentsUncheckedUpdateWithoutDocumentsInput>
  }

  export type documentsUpdateManyWithWhereWithoutDocumentsInput = {
    where: documentsScalarWhereInput
    data: XOR<documentsUpdateManyMutationInput, documentsUncheckedUpdateManyWithoutDocumentsInput>
  }

  export type documentsScalarWhereInput = {
    AND?: documentsScalarWhereInput | documentsScalarWhereInput[]
    OR?: documentsScalarWhereInput[]
    NOT?: documentsScalarWhereInput | documentsScalarWhereInput[]
    id?: IntFilter<"documents"> | number
    title?: StringFilter<"documents"> | string
    description?: StringNullableFilter<"documents"> | string | null
    content?: StringNullableFilter<"documents"> | string | null
    file_path?: StringNullableFilter<"documents"> | string | null
    file_name?: StringNullableFilter<"documents"> | string | null
    file_original_name?: StringNullableFilter<"documents"> | string | null
    file_type?: StringNullableFilter<"documents"> | string | null
    file_size?: BigIntNullableFilter<"documents"> | bigint | number | null
    file_extension?: StringNullableFilter<"documents"> | string | null
    file_upload_date?: DateTimeNullableFilter<"documents"> | Date | string | null
    owner_id?: IntFilter<"documents"> | number
    parent_folder_id?: IntNullableFilter<"documents"> | number | null
    is_folder?: BoolFilter<"documents"> | boolean
    is_deleted?: BoolFilter<"documents"> | boolean
    is_public?: BoolFilter<"documents"> | boolean
    is_template?: BoolFilter<"documents"> | boolean
    created_at?: DateTimeFilter<"documents"> | Date | string
    updated_at?: DateTimeFilter<"documents"> | Date | string
    last_modified_by?: IntNullableFilter<"documents"> | number | null
    last_accessed_at?: DateTimeNullableFilter<"documents"> | Date | string | null
    auto_save_interval?: IntFilter<"documents"> | number
    allow_comments?: BoolFilter<"documents"> | boolean
    tags?: StringNullableFilter<"documents"> | string | null
    metadata?: JsonNullableFilter<"documents">
  }

  export type call_participantsCreateWithoutUsersInput = {
    joined_at?: Date | string | null
    left_at?: Date | string | null
    is_active?: boolean | null
    calls: callsCreateNestedOneWithoutCall_participantsInput
  }

  export type call_participantsUncheckedCreateWithoutUsersInput = {
    id?: number
    call_id: number
    joined_at?: Date | string | null
    left_at?: Date | string | null
    is_active?: boolean | null
  }

  export type call_participantsCreateOrConnectWithoutUsersInput = {
    where: call_participantsWhereUniqueInput
    create: XOR<call_participantsCreateWithoutUsersInput, call_participantsUncheckedCreateWithoutUsersInput>
  }

  export type call_participantsCreateManyUsersInputEnvelope = {
    data: call_participantsCreateManyUsersInput | call_participantsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type callsCreateWithoutUsersInput = {
    started_at?: Date | string | null
    ended_at?: Date | string | null
    call_type: string
    status?: string | null
    call_participants?: call_participantsCreateNestedManyWithoutCallsInput
    documents: documentsCreateNestedOneWithoutCallsInput
  }

  export type callsUncheckedCreateWithoutUsersInput = {
    id?: number
    document_id: number
    started_at?: Date | string | null
    ended_at?: Date | string | null
    call_type: string
    status?: string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutCallsInput
  }

  export type callsCreateOrConnectWithoutUsersInput = {
    where: callsWhereUniqueInput
    create: XOR<callsCreateWithoutUsersInput, callsUncheckedCreateWithoutUsersInput>
  }

  export type callsCreateManyUsersInputEnvelope = {
    data: callsCreateManyUsersInput | callsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type document_versionsCreateWithoutUsersInput = {
    version_number: number
    title?: string | null
    content?: string | null
    file_path?: string | null
    file_size?: bigint | number | null
    file_type?: string | null
    modification_date?: Date | string
    change_summary?: string | null
    is_major_version?: boolean
    documents: documentsCreateNestedOneWithoutDocument_versionsInput
  }

  export type document_versionsUncheckedCreateWithoutUsersInput = {
    id?: number
    document_id: number
    version_number: number
    title?: string | null
    content?: string | null
    file_path?: string | null
    file_size?: bigint | number | null
    file_type?: string | null
    modification_date?: Date | string
    change_summary?: string | null
    is_major_version?: boolean
  }

  export type document_versionsCreateOrConnectWithoutUsersInput = {
    where: document_versionsWhereUniqueInput
    create: XOR<document_versionsCreateWithoutUsersInput, document_versionsUncheckedCreateWithoutUsersInput>
  }

  export type document_versionsCreateManyUsersInputEnvelope = {
    data: document_versionsCreateManyUsersInput | document_versionsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type documentsCreateWithoutUsers_documents_last_modified_byTousersInput = {
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateWithoutUsers_documents_last_modified_byTousersInput = {
    id?: number
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutDocumentsInput
    other_documents?: documentsUncheckedCreateNestedManyWithoutDocumentsInput
  }

  export type documentsCreateOrConnectWithoutUsers_documents_last_modified_byTousersInput = {
    where: documentsWhereUniqueInput
    create: XOR<documentsCreateWithoutUsers_documents_last_modified_byTousersInput, documentsUncheckedCreateWithoutUsers_documents_last_modified_byTousersInput>
  }

  export type documentsCreateManyUsers_documents_last_modified_byTousersInputEnvelope = {
    data: documentsCreateManyUsers_documents_last_modified_byTousersInput | documentsCreateManyUsers_documents_last_modified_byTousersInput[]
    skipDuplicates?: boolean
  }

  export type documentsCreateWithoutUsers_documents_owner_idTousersInput = {
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateWithoutUsers_documents_owner_idTousersInput = {
    id?: number
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    parent_folder_id?: number | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_modified_by?: number | null
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutDocumentsInput
    other_documents?: documentsUncheckedCreateNestedManyWithoutDocumentsInput
  }

  export type documentsCreateOrConnectWithoutUsers_documents_owner_idTousersInput = {
    where: documentsWhereUniqueInput
    create: XOR<documentsCreateWithoutUsers_documents_owner_idTousersInput, documentsUncheckedCreateWithoutUsers_documents_owner_idTousersInput>
  }

  export type documentsCreateManyUsers_documents_owner_idTousersInputEnvelope = {
    data: documentsCreateManyUsers_documents_owner_idTousersInput | documentsCreateManyUsers_documents_owner_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type conversationsCreateWithoutUsersInput = {
    name?: string | null
    is_group?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    conversation_participants?: conversation_participantsCreateNestedManyWithoutConversationsInput
    messages?: messagesCreateNestedManyWithoutConversationsInput
  }

  export type conversationsUncheckedCreateWithoutUsersInput = {
    id?: number
    name?: string | null
    is_group?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutConversationsInput
    messages?: messagesUncheckedCreateNestedManyWithoutConversationsInput
  }

  export type conversationsCreateOrConnectWithoutUsersInput = {
    where: conversationsWhereUniqueInput
    create: XOR<conversationsCreateWithoutUsersInput, conversationsUncheckedCreateWithoutUsersInput>
  }

  export type conversationsCreateManyUsersInputEnvelope = {
    data: conversationsCreateManyUsersInput | conversationsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type conversation_participantsCreateWithoutUsersInput = {
    joined_at?: Date | string
    left_at?: Date | string | null
    is_active?: boolean
    conversations: conversationsCreateNestedOneWithoutConversation_participantsInput
  }

  export type conversation_participantsUncheckedCreateWithoutUsersInput = {
    id?: number
    conversation_id: number
    joined_at?: Date | string
    left_at?: Date | string | null
    is_active?: boolean
  }

  export type conversation_participantsCreateOrConnectWithoutUsersInput = {
    where: conversation_participantsWhereUniqueInput
    create: XOR<conversation_participantsCreateWithoutUsersInput, conversation_participantsUncheckedCreateWithoutUsersInput>
  }

  export type conversation_participantsCreateManyUsersInputEnvelope = {
    data: conversation_participantsCreateManyUsersInput | conversation_participantsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type messagesCreateWithoutUsersInput = {
    content: string
    sent_at?: Date | string
    read_at?: Date | string | null
    is_deleted?: boolean
    conversations: conversationsCreateNestedOneWithoutMessagesInput
  }

  export type messagesUncheckedCreateWithoutUsersInput = {
    id?: number
    conversation_id: number
    content: string
    sent_at?: Date | string
    read_at?: Date | string | null
    is_deleted?: boolean
  }

  export type messagesCreateOrConnectWithoutUsersInput = {
    where: messagesWhereUniqueInput
    create: XOR<messagesCreateWithoutUsersInput, messagesUncheckedCreateWithoutUsersInput>
  }

  export type messagesCreateManyUsersInputEnvelope = {
    data: messagesCreateManyUsersInput | messagesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type notificationsCreateWithoutUsers_notifications_user_idTousersInput = {
    type: string
    content: string
    created_at?: Date | string
    read_at?: Date | string | null
    is_read?: boolean
    users_notifications_sender_idTousers?: usersCreateNestedOneWithoutNotifications_notifications_sender_idTousersInput
  }

  export type notificationsUncheckedCreateWithoutUsers_notifications_user_idTousersInput = {
    id?: number
    type: string
    content: string
    sender_id?: number | null
    created_at?: Date | string
    read_at?: Date | string | null
    is_read?: boolean
  }

  export type notificationsCreateOrConnectWithoutUsers_notifications_user_idTousersInput = {
    where: notificationsWhereUniqueInput
    create: XOR<notificationsCreateWithoutUsers_notifications_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_user_idTousersInput>
  }

  export type notificationsCreateManyUsers_notifications_user_idTousersInputEnvelope = {
    data: notificationsCreateManyUsers_notifications_user_idTousersInput | notificationsCreateManyUsers_notifications_user_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type notificationsCreateWithoutUsers_notifications_sender_idTousersInput = {
    type: string
    content: string
    created_at?: Date | string
    read_at?: Date | string | null
    is_read?: boolean
    users_notifications_user_idTousers: usersCreateNestedOneWithoutNotifications_notifications_user_idTousersInput
  }

  export type notificationsUncheckedCreateWithoutUsers_notifications_sender_idTousersInput = {
    id?: number
    user_id: number
    type: string
    content: string
    created_at?: Date | string
    read_at?: Date | string | null
    is_read?: boolean
  }

  export type notificationsCreateOrConnectWithoutUsers_notifications_sender_idTousersInput = {
    where: notificationsWhereUniqueInput
    create: XOR<notificationsCreateWithoutUsers_notifications_sender_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_sender_idTousersInput>
  }

  export type notificationsCreateManyUsers_notifications_sender_idTousersInputEnvelope = {
    data: notificationsCreateManyUsers_notifications_sender_idTousersInput | notificationsCreateManyUsers_notifications_sender_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type call_participantsUpsertWithWhereUniqueWithoutUsersInput = {
    where: call_participantsWhereUniqueInput
    update: XOR<call_participantsUpdateWithoutUsersInput, call_participantsUncheckedUpdateWithoutUsersInput>
    create: XOR<call_participantsCreateWithoutUsersInput, call_participantsUncheckedCreateWithoutUsersInput>
  }

  export type call_participantsUpdateWithWhereUniqueWithoutUsersInput = {
    where: call_participantsWhereUniqueInput
    data: XOR<call_participantsUpdateWithoutUsersInput, call_participantsUncheckedUpdateWithoutUsersInput>
  }

  export type call_participantsUpdateManyWithWhereWithoutUsersInput = {
    where: call_participantsScalarWhereInput
    data: XOR<call_participantsUpdateManyMutationInput, call_participantsUncheckedUpdateManyWithoutUsersInput>
  }

  export type callsUpsertWithWhereUniqueWithoutUsersInput = {
    where: callsWhereUniqueInput
    update: XOR<callsUpdateWithoutUsersInput, callsUncheckedUpdateWithoutUsersInput>
    create: XOR<callsCreateWithoutUsersInput, callsUncheckedCreateWithoutUsersInput>
  }

  export type callsUpdateWithWhereUniqueWithoutUsersInput = {
    where: callsWhereUniqueInput
    data: XOR<callsUpdateWithoutUsersInput, callsUncheckedUpdateWithoutUsersInput>
  }

  export type callsUpdateManyWithWhereWithoutUsersInput = {
    where: callsScalarWhereInput
    data: XOR<callsUpdateManyMutationInput, callsUncheckedUpdateManyWithoutUsersInput>
  }

  export type document_versionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: document_versionsWhereUniqueInput
    update: XOR<document_versionsUpdateWithoutUsersInput, document_versionsUncheckedUpdateWithoutUsersInput>
    create: XOR<document_versionsCreateWithoutUsersInput, document_versionsUncheckedCreateWithoutUsersInput>
  }

  export type document_versionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: document_versionsWhereUniqueInput
    data: XOR<document_versionsUpdateWithoutUsersInput, document_versionsUncheckedUpdateWithoutUsersInput>
  }

  export type document_versionsUpdateManyWithWhereWithoutUsersInput = {
    where: document_versionsScalarWhereInput
    data: XOR<document_versionsUpdateManyMutationInput, document_versionsUncheckedUpdateManyWithoutUsersInput>
  }

  export type documentsUpsertWithWhereUniqueWithoutUsers_documents_last_modified_byTousersInput = {
    where: documentsWhereUniqueInput
    update: XOR<documentsUpdateWithoutUsers_documents_last_modified_byTousersInput, documentsUncheckedUpdateWithoutUsers_documents_last_modified_byTousersInput>
    create: XOR<documentsCreateWithoutUsers_documents_last_modified_byTousersInput, documentsUncheckedCreateWithoutUsers_documents_last_modified_byTousersInput>
  }

  export type documentsUpdateWithWhereUniqueWithoutUsers_documents_last_modified_byTousersInput = {
    where: documentsWhereUniqueInput
    data: XOR<documentsUpdateWithoutUsers_documents_last_modified_byTousersInput, documentsUncheckedUpdateWithoutUsers_documents_last_modified_byTousersInput>
  }

  export type documentsUpdateManyWithWhereWithoutUsers_documents_last_modified_byTousersInput = {
    where: documentsScalarWhereInput
    data: XOR<documentsUpdateManyMutationInput, documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersInput>
  }

  export type documentsUpsertWithWhereUniqueWithoutUsers_documents_owner_idTousersInput = {
    where: documentsWhereUniqueInput
    update: XOR<documentsUpdateWithoutUsers_documents_owner_idTousersInput, documentsUncheckedUpdateWithoutUsers_documents_owner_idTousersInput>
    create: XOR<documentsCreateWithoutUsers_documents_owner_idTousersInput, documentsUncheckedCreateWithoutUsers_documents_owner_idTousersInput>
  }

  export type documentsUpdateWithWhereUniqueWithoutUsers_documents_owner_idTousersInput = {
    where: documentsWhereUniqueInput
    data: XOR<documentsUpdateWithoutUsers_documents_owner_idTousersInput, documentsUncheckedUpdateWithoutUsers_documents_owner_idTousersInput>
  }

  export type documentsUpdateManyWithWhereWithoutUsers_documents_owner_idTousersInput = {
    where: documentsScalarWhereInput
    data: XOR<documentsUpdateManyMutationInput, documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersInput>
  }

  export type conversationsUpsertWithWhereUniqueWithoutUsersInput = {
    where: conversationsWhereUniqueInput
    update: XOR<conversationsUpdateWithoutUsersInput, conversationsUncheckedUpdateWithoutUsersInput>
    create: XOR<conversationsCreateWithoutUsersInput, conversationsUncheckedCreateWithoutUsersInput>
  }

  export type conversationsUpdateWithWhereUniqueWithoutUsersInput = {
    where: conversationsWhereUniqueInput
    data: XOR<conversationsUpdateWithoutUsersInput, conversationsUncheckedUpdateWithoutUsersInput>
  }

  export type conversationsUpdateManyWithWhereWithoutUsersInput = {
    where: conversationsScalarWhereInput
    data: XOR<conversationsUpdateManyMutationInput, conversationsUncheckedUpdateManyWithoutUsersInput>
  }

  export type conversationsScalarWhereInput = {
    AND?: conversationsScalarWhereInput | conversationsScalarWhereInput[]
    OR?: conversationsScalarWhereInput[]
    NOT?: conversationsScalarWhereInput | conversationsScalarWhereInput[]
    id?: IntFilter<"conversations"> | number
    name?: StringNullableFilter<"conversations"> | string | null
    is_group?: BoolFilter<"conversations"> | boolean
    created_at?: DateTimeFilter<"conversations"> | Date | string
    updated_at?: DateTimeFilter<"conversations"> | Date | string
    created_by?: IntFilter<"conversations"> | number
  }

  export type conversation_participantsUpsertWithWhereUniqueWithoutUsersInput = {
    where: conversation_participantsWhereUniqueInput
    update: XOR<conversation_participantsUpdateWithoutUsersInput, conversation_participantsUncheckedUpdateWithoutUsersInput>
    create: XOR<conversation_participantsCreateWithoutUsersInput, conversation_participantsUncheckedCreateWithoutUsersInput>
  }

  export type conversation_participantsUpdateWithWhereUniqueWithoutUsersInput = {
    where: conversation_participantsWhereUniqueInput
    data: XOR<conversation_participantsUpdateWithoutUsersInput, conversation_participantsUncheckedUpdateWithoutUsersInput>
  }

  export type conversation_participantsUpdateManyWithWhereWithoutUsersInput = {
    where: conversation_participantsScalarWhereInput
    data: XOR<conversation_participantsUpdateManyMutationInput, conversation_participantsUncheckedUpdateManyWithoutUsersInput>
  }

  export type conversation_participantsScalarWhereInput = {
    AND?: conversation_participantsScalarWhereInput | conversation_participantsScalarWhereInput[]
    OR?: conversation_participantsScalarWhereInput[]
    NOT?: conversation_participantsScalarWhereInput | conversation_participantsScalarWhereInput[]
    id?: IntFilter<"conversation_participants"> | number
    conversation_id?: IntFilter<"conversation_participants"> | number
    user_id?: IntFilter<"conversation_participants"> | number
    joined_at?: DateTimeFilter<"conversation_participants"> | Date | string
    left_at?: DateTimeNullableFilter<"conversation_participants"> | Date | string | null
    is_active?: BoolFilter<"conversation_participants"> | boolean
  }

  export type messagesUpsertWithWhereUniqueWithoutUsersInput = {
    where: messagesWhereUniqueInput
    update: XOR<messagesUpdateWithoutUsersInput, messagesUncheckedUpdateWithoutUsersInput>
    create: XOR<messagesCreateWithoutUsersInput, messagesUncheckedCreateWithoutUsersInput>
  }

  export type messagesUpdateWithWhereUniqueWithoutUsersInput = {
    where: messagesWhereUniqueInput
    data: XOR<messagesUpdateWithoutUsersInput, messagesUncheckedUpdateWithoutUsersInput>
  }

  export type messagesUpdateManyWithWhereWithoutUsersInput = {
    where: messagesScalarWhereInput
    data: XOR<messagesUpdateManyMutationInput, messagesUncheckedUpdateManyWithoutUsersInput>
  }

  export type messagesScalarWhereInput = {
    AND?: messagesScalarWhereInput | messagesScalarWhereInput[]
    OR?: messagesScalarWhereInput[]
    NOT?: messagesScalarWhereInput | messagesScalarWhereInput[]
    id?: IntFilter<"messages"> | number
    conversation_id?: IntFilter<"messages"> | number
    sender_id?: IntFilter<"messages"> | number
    content?: StringFilter<"messages"> | string
    sent_at?: DateTimeFilter<"messages"> | Date | string
    read_at?: DateTimeNullableFilter<"messages"> | Date | string | null
    is_deleted?: BoolFilter<"messages"> | boolean
  }

  export type notificationsUpsertWithWhereUniqueWithoutUsers_notifications_user_idTousersInput = {
    where: notificationsWhereUniqueInput
    update: XOR<notificationsUpdateWithoutUsers_notifications_user_idTousersInput, notificationsUncheckedUpdateWithoutUsers_notifications_user_idTousersInput>
    create: XOR<notificationsCreateWithoutUsers_notifications_user_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_user_idTousersInput>
  }

  export type notificationsUpdateWithWhereUniqueWithoutUsers_notifications_user_idTousersInput = {
    where: notificationsWhereUniqueInput
    data: XOR<notificationsUpdateWithoutUsers_notifications_user_idTousersInput, notificationsUncheckedUpdateWithoutUsers_notifications_user_idTousersInput>
  }

  export type notificationsUpdateManyWithWhereWithoutUsers_notifications_user_idTousersInput = {
    where: notificationsScalarWhereInput
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersInput>
  }

  export type notificationsScalarWhereInput = {
    AND?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
    OR?: notificationsScalarWhereInput[]
    NOT?: notificationsScalarWhereInput | notificationsScalarWhereInput[]
    id?: IntFilter<"notifications"> | number
    user_id?: IntFilter<"notifications"> | number
    type?: StringFilter<"notifications"> | string
    content?: StringFilter<"notifications"> | string
    sender_id?: IntNullableFilter<"notifications"> | number | null
    created_at?: DateTimeFilter<"notifications"> | Date | string
    read_at?: DateTimeNullableFilter<"notifications"> | Date | string | null
    is_read?: BoolFilter<"notifications"> | boolean
  }

  export type notificationsUpsertWithWhereUniqueWithoutUsers_notifications_sender_idTousersInput = {
    where: notificationsWhereUniqueInput
    update: XOR<notificationsUpdateWithoutUsers_notifications_sender_idTousersInput, notificationsUncheckedUpdateWithoutUsers_notifications_sender_idTousersInput>
    create: XOR<notificationsCreateWithoutUsers_notifications_sender_idTousersInput, notificationsUncheckedCreateWithoutUsers_notifications_sender_idTousersInput>
  }

  export type notificationsUpdateWithWhereUniqueWithoutUsers_notifications_sender_idTousersInput = {
    where: notificationsWhereUniqueInput
    data: XOR<notificationsUpdateWithoutUsers_notifications_sender_idTousersInput, notificationsUncheckedUpdateWithoutUsers_notifications_sender_idTousersInput>
  }

  export type notificationsUpdateManyWithWhereWithoutUsers_notifications_sender_idTousersInput = {
    where: notificationsScalarWhereInput
    data: XOR<notificationsUpdateManyMutationInput, notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersInput>
  }

  export type usersCreateWithoutConversations_createdInput = {
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsCreateNestedManyWithoutUsersInput
    calls?: callsCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversation_participants?: conversation_participantsCreateNestedManyWithoutUsersInput
    messages_sent?: messagesCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersUncheckedCreateWithoutConversations_createdInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutUsersInput
    calls?: callsUncheckedCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutUsersInput
    messages_sent?: messagesUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersCreateOrConnectWithoutConversations_createdInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutConversations_createdInput, usersUncheckedCreateWithoutConversations_createdInput>
  }

  export type conversation_participantsCreateWithoutConversationsInput = {
    joined_at?: Date | string
    left_at?: Date | string | null
    is_active?: boolean
    users: usersCreateNestedOneWithoutConversation_participantsInput
  }

  export type conversation_participantsUncheckedCreateWithoutConversationsInput = {
    id?: number
    user_id: number
    joined_at?: Date | string
    left_at?: Date | string | null
    is_active?: boolean
  }

  export type conversation_participantsCreateOrConnectWithoutConversationsInput = {
    where: conversation_participantsWhereUniqueInput
    create: XOR<conversation_participantsCreateWithoutConversationsInput, conversation_participantsUncheckedCreateWithoutConversationsInput>
  }

  export type conversation_participantsCreateManyConversationsInputEnvelope = {
    data: conversation_participantsCreateManyConversationsInput | conversation_participantsCreateManyConversationsInput[]
    skipDuplicates?: boolean
  }

  export type messagesCreateWithoutConversationsInput = {
    content: string
    sent_at?: Date | string
    read_at?: Date | string | null
    is_deleted?: boolean
    users: usersCreateNestedOneWithoutMessages_sentInput
  }

  export type messagesUncheckedCreateWithoutConversationsInput = {
    id?: number
    sender_id: number
    content: string
    sent_at?: Date | string
    read_at?: Date | string | null
    is_deleted?: boolean
  }

  export type messagesCreateOrConnectWithoutConversationsInput = {
    where: messagesWhereUniqueInput
    create: XOR<messagesCreateWithoutConversationsInput, messagesUncheckedCreateWithoutConversationsInput>
  }

  export type messagesCreateManyConversationsInputEnvelope = {
    data: messagesCreateManyConversationsInput | messagesCreateManyConversationsInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithoutConversations_createdInput = {
    update: XOR<usersUpdateWithoutConversations_createdInput, usersUncheckedUpdateWithoutConversations_createdInput>
    create: XOR<usersCreateWithoutConversations_createdInput, usersUncheckedCreateWithoutConversations_createdInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutConversations_createdInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutConversations_createdInput, usersUncheckedUpdateWithoutConversations_createdInput>
  }

  export type usersUpdateWithoutConversations_createdInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUpdateManyWithoutUsersNestedInput
    calls?: callsUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversation_participants?: conversation_participantsUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutConversations_createdInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutUsersNestedInput
    calls?: callsUncheckedUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type conversation_participantsUpsertWithWhereUniqueWithoutConversationsInput = {
    where: conversation_participantsWhereUniqueInput
    update: XOR<conversation_participantsUpdateWithoutConversationsInput, conversation_participantsUncheckedUpdateWithoutConversationsInput>
    create: XOR<conversation_participantsCreateWithoutConversationsInput, conversation_participantsUncheckedCreateWithoutConversationsInput>
  }

  export type conversation_participantsUpdateWithWhereUniqueWithoutConversationsInput = {
    where: conversation_participantsWhereUniqueInput
    data: XOR<conversation_participantsUpdateWithoutConversationsInput, conversation_participantsUncheckedUpdateWithoutConversationsInput>
  }

  export type conversation_participantsUpdateManyWithWhereWithoutConversationsInput = {
    where: conversation_participantsScalarWhereInput
    data: XOR<conversation_participantsUpdateManyMutationInput, conversation_participantsUncheckedUpdateManyWithoutConversationsInput>
  }

  export type messagesUpsertWithWhereUniqueWithoutConversationsInput = {
    where: messagesWhereUniqueInput
    update: XOR<messagesUpdateWithoutConversationsInput, messagesUncheckedUpdateWithoutConversationsInput>
    create: XOR<messagesCreateWithoutConversationsInput, messagesUncheckedCreateWithoutConversationsInput>
  }

  export type messagesUpdateWithWhereUniqueWithoutConversationsInput = {
    where: messagesWhereUniqueInput
    data: XOR<messagesUpdateWithoutConversationsInput, messagesUncheckedUpdateWithoutConversationsInput>
  }

  export type messagesUpdateManyWithWhereWithoutConversationsInput = {
    where: messagesScalarWhereInput
    data: XOR<messagesUpdateManyMutationInput, messagesUncheckedUpdateManyWithoutConversationsInput>
  }

  export type conversationsCreateWithoutConversation_participantsInput = {
    name?: string | null
    is_group?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    users: usersCreateNestedOneWithoutConversations_createdInput
    messages?: messagesCreateNestedManyWithoutConversationsInput
  }

  export type conversationsUncheckedCreateWithoutConversation_participantsInput = {
    id?: number
    name?: string | null
    is_group?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    created_by: number
    messages?: messagesUncheckedCreateNestedManyWithoutConversationsInput
  }

  export type conversationsCreateOrConnectWithoutConversation_participantsInput = {
    where: conversationsWhereUniqueInput
    create: XOR<conversationsCreateWithoutConversation_participantsInput, conversationsUncheckedCreateWithoutConversation_participantsInput>
  }

  export type usersCreateWithoutConversation_participantsInput = {
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsCreateNestedManyWithoutUsersInput
    calls?: callsCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsCreateNestedManyWithoutUsersInput
    messages_sent?: messagesCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersUncheckedCreateWithoutConversation_participantsInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutUsersInput
    calls?: callsUncheckedCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsUncheckedCreateNestedManyWithoutUsersInput
    messages_sent?: messagesUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersCreateOrConnectWithoutConversation_participantsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutConversation_participantsInput, usersUncheckedCreateWithoutConversation_participantsInput>
  }

  export type conversationsUpsertWithoutConversation_participantsInput = {
    update: XOR<conversationsUpdateWithoutConversation_participantsInput, conversationsUncheckedUpdateWithoutConversation_participantsInput>
    create: XOR<conversationsCreateWithoutConversation_participantsInput, conversationsUncheckedCreateWithoutConversation_participantsInput>
    where?: conversationsWhereInput
  }

  export type conversationsUpdateToOneWithWhereWithoutConversation_participantsInput = {
    where?: conversationsWhereInput
    data: XOR<conversationsUpdateWithoutConversation_participantsInput, conversationsUncheckedUpdateWithoutConversation_participantsInput>
  }

  export type conversationsUpdateWithoutConversation_participantsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    is_group?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutConversations_createdNestedInput
    messages?: messagesUpdateManyWithoutConversationsNestedInput
  }

  export type conversationsUncheckedUpdateWithoutConversation_participantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    is_group?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: IntFieldUpdateOperationsInput | number
    messages?: messagesUncheckedUpdateManyWithoutConversationsNestedInput
  }

  export type usersUpsertWithoutConversation_participantsInput = {
    update: XOR<usersUpdateWithoutConversation_participantsInput, usersUncheckedUpdateWithoutConversation_participantsInput>
    create: XOR<usersCreateWithoutConversation_participantsInput, usersUncheckedCreateWithoutConversation_participantsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutConversation_participantsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutConversation_participantsInput, usersUncheckedUpdateWithoutConversation_participantsInput>
  }

  export type usersUpdateWithoutConversation_participantsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUpdateManyWithoutUsersNestedInput
    calls?: callsUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutConversation_participantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutUsersNestedInput
    calls?: callsUncheckedUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUncheckedUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type conversationsCreateWithoutMessagesInput = {
    name?: string | null
    is_group?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    users: usersCreateNestedOneWithoutConversations_createdInput
    conversation_participants?: conversation_participantsCreateNestedManyWithoutConversationsInput
  }

  export type conversationsUncheckedCreateWithoutMessagesInput = {
    id?: number
    name?: string | null
    is_group?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    created_by: number
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutConversationsInput
  }

  export type conversationsCreateOrConnectWithoutMessagesInput = {
    where: conversationsWhereUniqueInput
    create: XOR<conversationsCreateWithoutMessagesInput, conversationsUncheckedCreateWithoutMessagesInput>
  }

  export type usersCreateWithoutMessages_sentInput = {
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsCreateNestedManyWithoutUsersInput
    calls?: callsCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersUncheckedCreateWithoutMessages_sentInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutUsersInput
    calls?: callsUncheckedCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsUncheckedCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_user_idTousersInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersCreateOrConnectWithoutMessages_sentInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutMessages_sentInput, usersUncheckedCreateWithoutMessages_sentInput>
  }

  export type conversationsUpsertWithoutMessagesInput = {
    update: XOR<conversationsUpdateWithoutMessagesInput, conversationsUncheckedUpdateWithoutMessagesInput>
    create: XOR<conversationsCreateWithoutMessagesInput, conversationsUncheckedCreateWithoutMessagesInput>
    where?: conversationsWhereInput
  }

  export type conversationsUpdateToOneWithWhereWithoutMessagesInput = {
    where?: conversationsWhereInput
    data: XOR<conversationsUpdateWithoutMessagesInput, conversationsUncheckedUpdateWithoutMessagesInput>
  }

  export type conversationsUpdateWithoutMessagesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    is_group?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutConversations_createdNestedInput
    conversation_participants?: conversation_participantsUpdateManyWithoutConversationsNestedInput
  }

  export type conversationsUncheckedUpdateWithoutMessagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    is_group?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: IntFieldUpdateOperationsInput | number
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutConversationsNestedInput
  }

  export type usersUpsertWithoutMessages_sentInput = {
    update: XOR<usersUpdateWithoutMessages_sentInput, usersUncheckedUpdateWithoutMessages_sentInput>
    create: XOR<usersCreateWithoutMessages_sentInput, usersUncheckedCreateWithoutMessages_sentInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutMessages_sentInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutMessages_sentInput, usersUncheckedUpdateWithoutMessages_sentInput>
  }

  export type usersUpdateWithoutMessages_sentInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUpdateManyWithoutUsersNestedInput
    calls?: callsUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutMessages_sentInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutUsersNestedInput
    calls?: callsUncheckedUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUncheckedUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersCreateWithoutNotifications_notifications_user_idTousersInput = {
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsCreateNestedManyWithoutUsersInput
    calls?: callsCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsCreateNestedManyWithoutUsersInput
    messages_sent?: messagesCreateNestedManyWithoutUsersInput
    notifications_notifications_sender_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersUncheckedCreateWithoutNotifications_notifications_user_idTousersInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutUsersInput
    calls?: callsUncheckedCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsUncheckedCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutUsersInput
    messages_sent?: messagesUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_sender_idTousersInput
  }

  export type usersCreateOrConnectWithoutNotifications_notifications_user_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutNotifications_notifications_user_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_user_idTousersInput>
  }

  export type usersCreateWithoutNotifications_notifications_sender_idTousersInput = {
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsCreateNestedManyWithoutUsersInput
    calls?: callsCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsCreateNestedManyWithoutUsersInput
    messages_sent?: messagesCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsCreateNestedManyWithoutUsers_notifications_user_idTousersInput
  }

  export type usersUncheckedCreateWithoutNotifications_notifications_sender_idTousersInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    full_name?: string | null
    profile_picture?: string | null
    two_factor_enabled?: boolean | null
    two_factor_secret?: string | null
    is_admin?: boolean | null
    is_active?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_login?: Date | string | null
    login_attempts?: number | null
    locked_until?: Date | string | null
    call_participants?: call_participantsUncheckedCreateNestedManyWithoutUsersInput
    calls?: callsUncheckedCreateNestedManyWithoutUsersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
    conversations_created?: conversationsUncheckedCreateNestedManyWithoutUsersInput
    conversation_participants?: conversation_participantsUncheckedCreateNestedManyWithoutUsersInput
    messages_sent?: messagesUncheckedCreateNestedManyWithoutUsersInput
    notifications_notifications_user_idTousers?: notificationsUncheckedCreateNestedManyWithoutUsers_notifications_user_idTousersInput
  }

  export type usersCreateOrConnectWithoutNotifications_notifications_sender_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutNotifications_notifications_sender_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_sender_idTousersInput>
  }

  export type usersUpsertWithoutNotifications_notifications_user_idTousersInput = {
    update: XOR<usersUpdateWithoutNotifications_notifications_user_idTousersInput, usersUncheckedUpdateWithoutNotifications_notifications_user_idTousersInput>
    create: XOR<usersCreateWithoutNotifications_notifications_user_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_user_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutNotifications_notifications_user_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutNotifications_notifications_user_idTousersInput, usersUncheckedUpdateWithoutNotifications_notifications_user_idTousersInput>
  }

  export type usersUpdateWithoutNotifications_notifications_user_idTousersInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUpdateManyWithoutUsersNestedInput
    calls?: callsUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUpdateManyWithoutUsersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutNotifications_notifications_user_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutUsersNestedInput
    calls?: callsUncheckedUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUncheckedUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_sender_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersNestedInput
  }

  export type usersUpsertWithoutNotifications_notifications_sender_idTousersInput = {
    update: XOR<usersUpdateWithoutNotifications_notifications_sender_idTousersInput, usersUncheckedUpdateWithoutNotifications_notifications_sender_idTousersInput>
    create: XOR<usersCreateWithoutNotifications_notifications_sender_idTousersInput, usersUncheckedCreateWithoutNotifications_notifications_sender_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutNotifications_notifications_sender_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutNotifications_notifications_sender_idTousersInput, usersUncheckedUpdateWithoutNotifications_notifications_sender_idTousersInput>
  }

  export type usersUpdateWithoutNotifications_notifications_sender_idTousersInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUpdateManyWithoutUsersNestedInput
    calls?: callsUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutNotifications_notifications_sender_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    two_factor_enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    two_factor_secret?: NullableStringFieldUpdateOperationsInput | string | null
    is_admin?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    login_attempts?: NullableIntFieldUpdateOperationsInput | number | null
    locked_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutUsersNestedInput
    calls?: callsUncheckedUpdateManyWithoutUsersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
    conversations_created?: conversationsUncheckedUpdateManyWithoutUsersNestedInput
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutUsersNestedInput
    messages_sent?: messagesUncheckedUpdateManyWithoutUsersNestedInput
    notifications_notifications_user_idTousers?: notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersNestedInput
  }

  export type call_participantsCreateManyCallsInput = {
    id?: number
    user_id: number
    joined_at?: Date | string | null
    left_at?: Date | string | null
    is_active?: boolean | null
  }

  export type call_participantsUpdateWithoutCallsInput = {
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    users?: usersUpdateOneRequiredWithoutCall_participantsNestedInput
  }

  export type call_participantsUncheckedUpdateWithoutCallsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type call_participantsUncheckedUpdateManyWithoutCallsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type callsCreateManyDocumentsInput = {
    id?: number
    initiated_by: number
    started_at?: Date | string | null
    ended_at?: Date | string | null
    call_type: string
    status?: string | null
  }

  export type document_versionsCreateManyDocumentsInput = {
    id?: number
    version_number: number
    title?: string | null
    content?: string | null
    file_path?: string | null
    file_size?: bigint | number | null
    file_type?: string | null
    modified_by: number
    modification_date?: Date | string
    change_summary?: string | null
    is_major_version?: boolean
  }

  export type documentsCreateManyDocumentsInput = {
    id?: number
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    owner_id: number
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_modified_by?: number | null
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type callsUpdateWithoutDocumentsInput = {
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    call_participants?: call_participantsUpdateManyWithoutCallsNestedInput
    users?: usersUpdateOneRequiredWithoutCallsNestedInput
  }

  export type callsUncheckedUpdateWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    initiated_by?: IntFieldUpdateOperationsInput | number
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutCallsNestedInput
  }

  export type callsUncheckedUpdateManyWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    initiated_by?: IntFieldUpdateOperationsInput | number
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type document_versionsUpdateWithoutDocumentsInput = {
    version_number?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    modification_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    is_major_version?: BoolFieldUpdateOperationsInput | boolean
    users?: usersUpdateOneRequiredWithoutDocument_versionsNestedInput
  }

  export type document_versionsUncheckedUpdateWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    version_number?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    modified_by?: IntFieldUpdateOperationsInput | number
    modification_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    is_major_version?: BoolFieldUpdateOperationsInput | boolean
  }

  export type document_versionsUncheckedUpdateManyWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    version_number?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    modified_by?: IntFieldUpdateOperationsInput | number
    modification_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    is_major_version?: BoolFieldUpdateOperationsInput | boolean
  }

  export type documentsUpdateWithoutDocumentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner_id?: IntFieldUpdateOperationsInput | number
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutDocumentsNestedInput
    other_documents?: documentsUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateManyWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner_id?: IntFieldUpdateOperationsInput | number
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type call_participantsCreateManyUsersInput = {
    id?: number
    call_id: number
    joined_at?: Date | string | null
    left_at?: Date | string | null
    is_active?: boolean | null
  }

  export type callsCreateManyUsersInput = {
    id?: number
    document_id: number
    started_at?: Date | string | null
    ended_at?: Date | string | null
    call_type: string
    status?: string | null
  }

  export type document_versionsCreateManyUsersInput = {
    id?: number
    document_id: number
    version_number: number
    title?: string | null
    content?: string | null
    file_path?: string | null
    file_size?: bigint | number | null
    file_type?: string | null
    modification_date?: Date | string
    change_summary?: string | null
    is_major_version?: boolean
  }

  export type documentsCreateManyUsers_documents_last_modified_byTousersInput = {
    id?: number
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type documentsCreateManyUsers_documents_owner_idTousersInput = {
    id?: number
    title: string
    description?: string | null
    content?: string | null
    file_path?: string | null
    file_name?: string | null
    file_original_name?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    file_extension?: string | null
    file_upload_date?: Date | string | null
    parent_folder_id?: number | null
    is_folder?: boolean
    is_deleted?: boolean
    is_public?: boolean
    is_template?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    last_modified_by?: number | null
    last_accessed_at?: Date | string | null
    auto_save_interval?: number
    allow_comments?: boolean
    tags?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type conversationsCreateManyUsersInput = {
    id?: number
    name?: string | null
    is_group?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type conversation_participantsCreateManyUsersInput = {
    id?: number
    conversation_id: number
    joined_at?: Date | string
    left_at?: Date | string | null
    is_active?: boolean
  }

  export type messagesCreateManyUsersInput = {
    id?: number
    conversation_id: number
    content: string
    sent_at?: Date | string
    read_at?: Date | string | null
    is_deleted?: boolean
  }

  export type notificationsCreateManyUsers_notifications_user_idTousersInput = {
    id?: number
    type: string
    content: string
    sender_id?: number | null
    created_at?: Date | string
    read_at?: Date | string | null
    is_read?: boolean
  }

  export type notificationsCreateManyUsers_notifications_sender_idTousersInput = {
    id?: number
    user_id: number
    type: string
    content: string
    created_at?: Date | string
    read_at?: Date | string | null
    is_read?: boolean
  }

  export type call_participantsUpdateWithoutUsersInput = {
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    calls?: callsUpdateOneRequiredWithoutCall_participantsNestedInput
  }

  export type call_participantsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    call_id?: IntFieldUpdateOperationsInput | number
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type call_participantsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    call_id?: IntFieldUpdateOperationsInput | number
    joined_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type callsUpdateWithoutUsersInput = {
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    call_participants?: call_participantsUpdateManyWithoutCallsNestedInput
    documents?: documentsUpdateOneRequiredWithoutCallsNestedInput
  }

  export type callsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    call_participants?: call_participantsUncheckedUpdateManyWithoutCallsNestedInput
  }

  export type callsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    started_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    call_type?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type document_versionsUpdateWithoutUsersInput = {
    version_number?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    modification_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    is_major_version?: BoolFieldUpdateOperationsInput | boolean
    documents?: documentsUpdateOneRequiredWithoutDocument_versionsNestedInput
  }

  export type document_versionsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    version_number?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    modification_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    is_major_version?: BoolFieldUpdateOperationsInput | boolean
  }

  export type document_versionsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    version_number?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    modification_date?: DateTimeFieldUpdateOperationsInput | Date | string
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    is_major_version?: BoolFieldUpdateOperationsInput | boolean
  }

  export type documentsUpdateWithoutUsers_documents_last_modified_byTousersInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutUsers_documents_last_modified_byTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutDocumentsNestedInput
    other_documents?: documentsUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type documentsUpdateWithoutUsers_documents_owner_idTousersInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutUsers_documents_owner_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutDocumentsNestedInput
    other_documents?: documentsUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_original_name?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    file_extension?: NullableStringFieldUpdateOperationsInput | string | null
    file_upload_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: BoolFieldUpdateOperationsInput | boolean
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    is_public?: BoolFieldUpdateOperationsInput | boolean
    is_template?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    last_accessed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: IntFieldUpdateOperationsInput | number
    allow_comments?: BoolFieldUpdateOperationsInput | boolean
    tags?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type conversationsUpdateWithoutUsersInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    is_group?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation_participants?: conversation_participantsUpdateManyWithoutConversationsNestedInput
    messages?: messagesUpdateManyWithoutConversationsNestedInput
  }

  export type conversationsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    is_group?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation_participants?: conversation_participantsUncheckedUpdateManyWithoutConversationsNestedInput
    messages?: messagesUncheckedUpdateManyWithoutConversationsNestedInput
  }

  export type conversationsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    is_group?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type conversation_participantsUpdateWithoutUsersInput = {
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    conversations?: conversationsUpdateOneRequiredWithoutConversation_participantsNestedInput
  }

  export type conversation_participantsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    conversation_id?: IntFieldUpdateOperationsInput | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type conversation_participantsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    conversation_id?: IntFieldUpdateOperationsInput | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type messagesUpdateWithoutUsersInput = {
    content?: StringFieldUpdateOperationsInput | string
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    conversations?: conversationsUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type messagesUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    conversation_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type messagesUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    conversation_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type notificationsUpdateWithoutUsers_notifications_user_idTousersInput = {
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
    users_notifications_sender_idTousers?: usersUpdateOneWithoutNotifications_notifications_sender_idTousersNestedInput
  }

  export type notificationsUncheckedUpdateWithoutUsers_notifications_user_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sender_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type notificationsUncheckedUpdateManyWithoutUsers_notifications_user_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    sender_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type notificationsUpdateWithoutUsers_notifications_sender_idTousersInput = {
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
    users_notifications_user_idTousers?: usersUpdateOneRequiredWithoutNotifications_notifications_user_idTousersNestedInput
  }

  export type notificationsUncheckedUpdateWithoutUsers_notifications_sender_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type notificationsUncheckedUpdateManyWithoutUsers_notifications_sender_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_read?: BoolFieldUpdateOperationsInput | boolean
  }

  export type conversation_participantsCreateManyConversationsInput = {
    id?: number
    user_id: number
    joined_at?: Date | string
    left_at?: Date | string | null
    is_active?: boolean
  }

  export type messagesCreateManyConversationsInput = {
    id?: number
    sender_id: number
    content: string
    sent_at?: Date | string
    read_at?: Date | string | null
    is_deleted?: boolean
  }

  export type conversation_participantsUpdateWithoutConversationsInput = {
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    users?: usersUpdateOneRequiredWithoutConversation_participantsNestedInput
  }

  export type conversation_participantsUncheckedUpdateWithoutConversationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type conversation_participantsUncheckedUpdateManyWithoutConversationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type messagesUpdateWithoutConversationsInput = {
    content?: StringFieldUpdateOperationsInput | string
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    users?: usersUpdateOneRequiredWithoutMessages_sentNestedInput
  }

  export type messagesUncheckedUpdateWithoutConversationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    sender_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type messagesUncheckedUpdateManyWithoutConversationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    sender_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    sent_at?: DateTimeFieldUpdateOperationsInput | Date | string
    read_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}