
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
 * Model document_invitations
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type document_invitations = $Result.DefaultSelection<Prisma.$document_invitationsPayload>
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
   * `prisma.document_invitations`: Exposes CRUD operations for the **document_invitations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Document_invitations
    * const document_invitations = await prisma.document_invitations.findMany()
    * ```
    */
  get document_invitations(): Prisma.document_invitationsDelegate<ExtArgs, ClientOptions>;

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
    document_invitations: 'document_invitations',
    document_versions: 'document_versions',
    documents: 'documents',
    users: 'users'
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
      modelProps: "call_participants" | "calls" | "document_invitations" | "document_versions" | "documents" | "users"
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
      document_invitations: {
        payload: Prisma.$document_invitationsPayload<ExtArgs>
        fields: Prisma.document_invitationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.document_invitationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_invitationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.document_invitationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_invitationsPayload>
          }
          findFirst: {
            args: Prisma.document_invitationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_invitationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.document_invitationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_invitationsPayload>
          }
          findMany: {
            args: Prisma.document_invitationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_invitationsPayload>[]
          }
          create: {
            args: Prisma.document_invitationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_invitationsPayload>
          }
          createMany: {
            args: Prisma.document_invitationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.document_invitationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_invitationsPayload>[]
          }
          delete: {
            args: Prisma.document_invitationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_invitationsPayload>
          }
          update: {
            args: Prisma.document_invitationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_invitationsPayload>
          }
          deleteMany: {
            args: Prisma.document_invitationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.document_invitationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.document_invitationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_invitationsPayload>[]
          }
          upsert: {
            args: Prisma.document_invitationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$document_invitationsPayload>
          }
          aggregate: {
            args: Prisma.Document_invitationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument_invitations>
          }
          groupBy: {
            args: Prisma.document_invitationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Document_invitationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.document_invitationsCountArgs<ExtArgs>
            result: $Utils.Optional<Document_invitationsCountAggregateOutputType> | number
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
    document_invitations?: document_invitationsOmit
    document_versions?: document_versionsOmit
    documents?: documentsOmit
    users?: usersOmit
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
    document_invitations: number
    document_versions: number
    other_documents: number
  }

  export type DocumentsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | DocumentsCountOutputTypeCountCallsArgs
    document_invitations?: boolean | DocumentsCountOutputTypeCountDocument_invitationsArgs
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
  export type DocumentsCountOutputTypeCountDocument_invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_invitationsWhereInput
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
    document_invitations_document_invitations_invited_byTousers: number
    document_invitations_document_invitations_user_idTousers: number
    document_versions: number
    documents_documents_last_modified_byTousers: number
    documents_documents_owner_idTousers: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    call_participants?: boolean | UsersCountOutputTypeCountCall_participantsArgs
    calls?: boolean | UsersCountOutputTypeCountCallsArgs
    document_invitations_document_invitations_invited_byTousers?: boolean | UsersCountOutputTypeCountDocument_invitations_document_invitations_invited_byTousersArgs
    document_invitations_document_invitations_user_idTousers?: boolean | UsersCountOutputTypeCountDocument_invitations_document_invitations_user_idTousersArgs
    document_versions?: boolean | UsersCountOutputTypeCountDocument_versionsArgs
    documents_documents_last_modified_byTousers?: boolean | UsersCountOutputTypeCountDocuments_documents_last_modified_byTousersArgs
    documents_documents_owner_idTousers?: boolean | UsersCountOutputTypeCountDocuments_documents_owner_idTousersArgs
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
  export type UsersCountOutputTypeCountDocument_invitations_document_invitations_invited_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_invitationsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountDocument_invitations_document_invitations_user_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_invitationsWhereInput
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
   * Model document_invitations
   */

  export type AggregateDocument_invitations = {
    _count: Document_invitationsCountAggregateOutputType | null
    _avg: Document_invitationsAvgAggregateOutputType | null
    _sum: Document_invitationsSumAggregateOutputType | null
    _min: Document_invitationsMinAggregateOutputType | null
    _max: Document_invitationsMaxAggregateOutputType | null
  }

  export type Document_invitationsAvgAggregateOutputType = {
    id: number | null
    document_id: number | null
    user_id: number | null
    invited_by: number | null
  }

  export type Document_invitationsSumAggregateOutputType = {
    id: number | null
    document_id: number | null
    user_id: number | null
    invited_by: number | null
  }

  export type Document_invitationsMinAggregateOutputType = {
    id: number | null
    document_id: number | null
    user_id: number | null
    permission_level: string | null
    invited_by: number | null
    invitation_date: Date | null
    accepted_date: Date | null
    is_active: boolean | null
  }

  export type Document_invitationsMaxAggregateOutputType = {
    id: number | null
    document_id: number | null
    user_id: number | null
    permission_level: string | null
    invited_by: number | null
    invitation_date: Date | null
    accepted_date: Date | null
    is_active: boolean | null
  }

  export type Document_invitationsCountAggregateOutputType = {
    id: number
    document_id: number
    user_id: number
    permission_level: number
    invited_by: number
    invitation_date: number
    accepted_date: number
    is_active: number
    _all: number
  }


  export type Document_invitationsAvgAggregateInputType = {
    id?: true
    document_id?: true
    user_id?: true
    invited_by?: true
  }

  export type Document_invitationsSumAggregateInputType = {
    id?: true
    document_id?: true
    user_id?: true
    invited_by?: true
  }

  export type Document_invitationsMinAggregateInputType = {
    id?: true
    document_id?: true
    user_id?: true
    permission_level?: true
    invited_by?: true
    invitation_date?: true
    accepted_date?: true
    is_active?: true
  }

  export type Document_invitationsMaxAggregateInputType = {
    id?: true
    document_id?: true
    user_id?: true
    permission_level?: true
    invited_by?: true
    invitation_date?: true
    accepted_date?: true
    is_active?: true
  }

  export type Document_invitationsCountAggregateInputType = {
    id?: true
    document_id?: true
    user_id?: true
    permission_level?: true
    invited_by?: true
    invitation_date?: true
    accepted_date?: true
    is_active?: true
    _all?: true
  }

  export type Document_invitationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which document_invitations to aggregate.
     */
    where?: document_invitationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_invitations to fetch.
     */
    orderBy?: document_invitationsOrderByWithRelationInput | document_invitationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: document_invitationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned document_invitations
    **/
    _count?: true | Document_invitationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Document_invitationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Document_invitationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Document_invitationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Document_invitationsMaxAggregateInputType
  }

  export type GetDocument_invitationsAggregateType<T extends Document_invitationsAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument_invitations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument_invitations[P]>
      : GetScalarType<T[P], AggregateDocument_invitations[P]>
  }




  export type document_invitationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: document_invitationsWhereInput
    orderBy?: document_invitationsOrderByWithAggregationInput | document_invitationsOrderByWithAggregationInput[]
    by: Document_invitationsScalarFieldEnum[] | Document_invitationsScalarFieldEnum
    having?: document_invitationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Document_invitationsCountAggregateInputType | true
    _avg?: Document_invitationsAvgAggregateInputType
    _sum?: Document_invitationsSumAggregateInputType
    _min?: Document_invitationsMinAggregateInputType
    _max?: Document_invitationsMaxAggregateInputType
  }

  export type Document_invitationsGroupByOutputType = {
    id: number
    document_id: number
    user_id: number
    permission_level: string
    invited_by: number | null
    invitation_date: Date | null
    accepted_date: Date | null
    is_active: boolean | null
    _count: Document_invitationsCountAggregateOutputType | null
    _avg: Document_invitationsAvgAggregateOutputType | null
    _sum: Document_invitationsSumAggregateOutputType | null
    _min: Document_invitationsMinAggregateOutputType | null
    _max: Document_invitationsMaxAggregateOutputType | null
  }

  type GetDocument_invitationsGroupByPayload<T extends document_invitationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Document_invitationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Document_invitationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Document_invitationsGroupByOutputType[P]>
            : GetScalarType<T[P], Document_invitationsGroupByOutputType[P]>
        }
      >
    >


  export type document_invitationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    user_id?: boolean
    permission_level?: boolean
    invited_by?: boolean
    invitation_date?: boolean
    accepted_date?: boolean
    is_active?: boolean
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users_document_invitations_invited_byTousers?: boolean | document_invitations$users_document_invitations_invited_byTousersArgs<ExtArgs>
    users_document_invitations_user_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_invitations"]>

  export type document_invitationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    user_id?: boolean
    permission_level?: boolean
    invited_by?: boolean
    invitation_date?: boolean
    accepted_date?: boolean
    is_active?: boolean
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users_document_invitations_invited_byTousers?: boolean | document_invitations$users_document_invitations_invited_byTousersArgs<ExtArgs>
    users_document_invitations_user_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_invitations"]>

  export type document_invitationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    user_id?: boolean
    permission_level?: boolean
    invited_by?: boolean
    invitation_date?: boolean
    accepted_date?: boolean
    is_active?: boolean
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users_document_invitations_invited_byTousers?: boolean | document_invitations$users_document_invitations_invited_byTousersArgs<ExtArgs>
    users_document_invitations_user_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_invitations"]>

  export type document_invitationsSelectScalar = {
    id?: boolean
    document_id?: boolean
    user_id?: boolean
    permission_level?: boolean
    invited_by?: boolean
    invitation_date?: boolean
    accepted_date?: boolean
    is_active?: boolean
  }

  export type document_invitationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "document_id" | "user_id" | "permission_level" | "invited_by" | "invitation_date" | "accepted_date" | "is_active", ExtArgs["result"]["document_invitations"]>
  export type document_invitationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users_document_invitations_invited_byTousers?: boolean | document_invitations$users_document_invitations_invited_byTousersArgs<ExtArgs>
    users_document_invitations_user_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type document_invitationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users_document_invitations_invited_byTousers?: boolean | document_invitations$users_document_invitations_invited_byTousersArgs<ExtArgs>
    users_document_invitations_user_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type document_invitationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users_document_invitations_invited_byTousers?: boolean | document_invitations$users_document_invitations_invited_byTousersArgs<ExtArgs>
    users_document_invitations_user_idTousers?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $document_invitationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "document_invitations"
    objects: {
      documents: Prisma.$documentsPayload<ExtArgs>
      users_document_invitations_invited_byTousers: Prisma.$usersPayload<ExtArgs> | null
      users_document_invitations_user_idTousers: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      document_id: number
      user_id: number
      permission_level: string
      invited_by: number | null
      invitation_date: Date | null
      accepted_date: Date | null
      is_active: boolean | null
    }, ExtArgs["result"]["document_invitations"]>
    composites: {}
  }

  type document_invitationsGetPayload<S extends boolean | null | undefined | document_invitationsDefaultArgs> = $Result.GetResult<Prisma.$document_invitationsPayload, S>

  type document_invitationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<document_invitationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Document_invitationsCountAggregateInputType | true
    }

  export interface document_invitationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['document_invitations'], meta: { name: 'document_invitations' } }
    /**
     * Find zero or one Document_invitations that matches the filter.
     * @param {document_invitationsFindUniqueArgs} args - Arguments to find a Document_invitations
     * @example
     * // Get one Document_invitations
     * const document_invitations = await prisma.document_invitations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends document_invitationsFindUniqueArgs>(args: SelectSubset<T, document_invitationsFindUniqueArgs<ExtArgs>>): Prisma__document_invitationsClient<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document_invitations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {document_invitationsFindUniqueOrThrowArgs} args - Arguments to find a Document_invitations
     * @example
     * // Get one Document_invitations
     * const document_invitations = await prisma.document_invitations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends document_invitationsFindUniqueOrThrowArgs>(args: SelectSubset<T, document_invitationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__document_invitationsClient<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document_invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_invitationsFindFirstArgs} args - Arguments to find a Document_invitations
     * @example
     * // Get one Document_invitations
     * const document_invitations = await prisma.document_invitations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends document_invitationsFindFirstArgs>(args?: SelectSubset<T, document_invitationsFindFirstArgs<ExtArgs>>): Prisma__document_invitationsClient<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document_invitations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_invitationsFindFirstOrThrowArgs} args - Arguments to find a Document_invitations
     * @example
     * // Get one Document_invitations
     * const document_invitations = await prisma.document_invitations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends document_invitationsFindFirstOrThrowArgs>(args?: SelectSubset<T, document_invitationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__document_invitationsClient<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Document_invitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_invitationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Document_invitations
     * const document_invitations = await prisma.document_invitations.findMany()
     * 
     * // Get first 10 Document_invitations
     * const document_invitations = await prisma.document_invitations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const document_invitationsWithIdOnly = await prisma.document_invitations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends document_invitationsFindManyArgs>(args?: SelectSubset<T, document_invitationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document_invitations.
     * @param {document_invitationsCreateArgs} args - Arguments to create a Document_invitations.
     * @example
     * // Create one Document_invitations
     * const Document_invitations = await prisma.document_invitations.create({
     *   data: {
     *     // ... data to create a Document_invitations
     *   }
     * })
     * 
     */
    create<T extends document_invitationsCreateArgs>(args: SelectSubset<T, document_invitationsCreateArgs<ExtArgs>>): Prisma__document_invitationsClient<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Document_invitations.
     * @param {document_invitationsCreateManyArgs} args - Arguments to create many Document_invitations.
     * @example
     * // Create many Document_invitations
     * const document_invitations = await prisma.document_invitations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends document_invitationsCreateManyArgs>(args?: SelectSubset<T, document_invitationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Document_invitations and returns the data saved in the database.
     * @param {document_invitationsCreateManyAndReturnArgs} args - Arguments to create many Document_invitations.
     * @example
     * // Create many Document_invitations
     * const document_invitations = await prisma.document_invitations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Document_invitations and only return the `id`
     * const document_invitationsWithIdOnly = await prisma.document_invitations.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends document_invitationsCreateManyAndReturnArgs>(args?: SelectSubset<T, document_invitationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document_invitations.
     * @param {document_invitationsDeleteArgs} args - Arguments to delete one Document_invitations.
     * @example
     * // Delete one Document_invitations
     * const Document_invitations = await prisma.document_invitations.delete({
     *   where: {
     *     // ... filter to delete one Document_invitations
     *   }
     * })
     * 
     */
    delete<T extends document_invitationsDeleteArgs>(args: SelectSubset<T, document_invitationsDeleteArgs<ExtArgs>>): Prisma__document_invitationsClient<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document_invitations.
     * @param {document_invitationsUpdateArgs} args - Arguments to update one Document_invitations.
     * @example
     * // Update one Document_invitations
     * const document_invitations = await prisma.document_invitations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends document_invitationsUpdateArgs>(args: SelectSubset<T, document_invitationsUpdateArgs<ExtArgs>>): Prisma__document_invitationsClient<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Document_invitations.
     * @param {document_invitationsDeleteManyArgs} args - Arguments to filter Document_invitations to delete.
     * @example
     * // Delete a few Document_invitations
     * const { count } = await prisma.document_invitations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends document_invitationsDeleteManyArgs>(args?: SelectSubset<T, document_invitationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Document_invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_invitationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Document_invitations
     * const document_invitations = await prisma.document_invitations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends document_invitationsUpdateManyArgs>(args: SelectSubset<T, document_invitationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Document_invitations and returns the data updated in the database.
     * @param {document_invitationsUpdateManyAndReturnArgs} args - Arguments to update many Document_invitations.
     * @example
     * // Update many Document_invitations
     * const document_invitations = await prisma.document_invitations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Document_invitations and only return the `id`
     * const document_invitationsWithIdOnly = await prisma.document_invitations.updateManyAndReturn({
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
    updateManyAndReturn<T extends document_invitationsUpdateManyAndReturnArgs>(args: SelectSubset<T, document_invitationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document_invitations.
     * @param {document_invitationsUpsertArgs} args - Arguments to update or create a Document_invitations.
     * @example
     * // Update or create a Document_invitations
     * const document_invitations = await prisma.document_invitations.upsert({
     *   create: {
     *     // ... data to create a Document_invitations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document_invitations we want to update
     *   }
     * })
     */
    upsert<T extends document_invitationsUpsertArgs>(args: SelectSubset<T, document_invitationsUpsertArgs<ExtArgs>>): Prisma__document_invitationsClient<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Document_invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_invitationsCountArgs} args - Arguments to filter Document_invitations to count.
     * @example
     * // Count the number of Document_invitations
     * const count = await prisma.document_invitations.count({
     *   where: {
     *     // ... the filter for the Document_invitations we want to count
     *   }
     * })
    **/
    count<T extends document_invitationsCountArgs>(
      args?: Subset<T, document_invitationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Document_invitationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document_invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Document_invitationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Document_invitationsAggregateArgs>(args: Subset<T, Document_invitationsAggregateArgs>): Prisma.PrismaPromise<GetDocument_invitationsAggregateType<T>>

    /**
     * Group by Document_invitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {document_invitationsGroupByArgs} args - Group by arguments.
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
      T extends document_invitationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: document_invitationsGroupByArgs['orderBy'] }
        : { orderBy?: document_invitationsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, document_invitationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocument_invitationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the document_invitations model
   */
  readonly fields: document_invitationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for document_invitations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__document_invitationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documents<T extends documentsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, documentsDefaultArgs<ExtArgs>>): Prisma__documentsClient<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users_document_invitations_invited_byTousers<T extends document_invitations$users_document_invitations_invited_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, document_invitations$users_document_invitations_invited_byTousersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users_document_invitations_user_idTousers<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the document_invitations model
   */
  interface document_invitationsFieldRefs {
    readonly id: FieldRef<"document_invitations", 'Int'>
    readonly document_id: FieldRef<"document_invitations", 'Int'>
    readonly user_id: FieldRef<"document_invitations", 'Int'>
    readonly permission_level: FieldRef<"document_invitations", 'String'>
    readonly invited_by: FieldRef<"document_invitations", 'Int'>
    readonly invitation_date: FieldRef<"document_invitations", 'DateTime'>
    readonly accepted_date: FieldRef<"document_invitations", 'DateTime'>
    readonly is_active: FieldRef<"document_invitations", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * document_invitations findUnique
   */
  export type document_invitationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
    /**
     * Filter, which document_invitations to fetch.
     */
    where: document_invitationsWhereUniqueInput
  }

  /**
   * document_invitations findUniqueOrThrow
   */
  export type document_invitationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
    /**
     * Filter, which document_invitations to fetch.
     */
    where: document_invitationsWhereUniqueInput
  }

  /**
   * document_invitations findFirst
   */
  export type document_invitationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
    /**
     * Filter, which document_invitations to fetch.
     */
    where?: document_invitationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_invitations to fetch.
     */
    orderBy?: document_invitationsOrderByWithRelationInput | document_invitationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for document_invitations.
     */
    cursor?: document_invitationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of document_invitations.
     */
    distinct?: Document_invitationsScalarFieldEnum | Document_invitationsScalarFieldEnum[]
  }

  /**
   * document_invitations findFirstOrThrow
   */
  export type document_invitationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
    /**
     * Filter, which document_invitations to fetch.
     */
    where?: document_invitationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_invitations to fetch.
     */
    orderBy?: document_invitationsOrderByWithRelationInput | document_invitationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for document_invitations.
     */
    cursor?: document_invitationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_invitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of document_invitations.
     */
    distinct?: Document_invitationsScalarFieldEnum | Document_invitationsScalarFieldEnum[]
  }

  /**
   * document_invitations findMany
   */
  export type document_invitationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
    /**
     * Filter, which document_invitations to fetch.
     */
    where?: document_invitationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of document_invitations to fetch.
     */
    orderBy?: document_invitationsOrderByWithRelationInput | document_invitationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing document_invitations.
     */
    cursor?: document_invitationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` document_invitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` document_invitations.
     */
    skip?: number
    distinct?: Document_invitationsScalarFieldEnum | Document_invitationsScalarFieldEnum[]
  }

  /**
   * document_invitations create
   */
  export type document_invitationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
    /**
     * The data needed to create a document_invitations.
     */
    data: XOR<document_invitationsCreateInput, document_invitationsUncheckedCreateInput>
  }

  /**
   * document_invitations createMany
   */
  export type document_invitationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many document_invitations.
     */
    data: document_invitationsCreateManyInput | document_invitationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * document_invitations createManyAndReturn
   */
  export type document_invitationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * The data used to create many document_invitations.
     */
    data: document_invitationsCreateManyInput | document_invitationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * document_invitations update
   */
  export type document_invitationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
    /**
     * The data needed to update a document_invitations.
     */
    data: XOR<document_invitationsUpdateInput, document_invitationsUncheckedUpdateInput>
    /**
     * Choose, which document_invitations to update.
     */
    where: document_invitationsWhereUniqueInput
  }

  /**
   * document_invitations updateMany
   */
  export type document_invitationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update document_invitations.
     */
    data: XOR<document_invitationsUpdateManyMutationInput, document_invitationsUncheckedUpdateManyInput>
    /**
     * Filter which document_invitations to update
     */
    where?: document_invitationsWhereInput
    /**
     * Limit how many document_invitations to update.
     */
    limit?: number
  }

  /**
   * document_invitations updateManyAndReturn
   */
  export type document_invitationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * The data used to update document_invitations.
     */
    data: XOR<document_invitationsUpdateManyMutationInput, document_invitationsUncheckedUpdateManyInput>
    /**
     * Filter which document_invitations to update
     */
    where?: document_invitationsWhereInput
    /**
     * Limit how many document_invitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * document_invitations upsert
   */
  export type document_invitationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
    /**
     * The filter to search for the document_invitations to update in case it exists.
     */
    where: document_invitationsWhereUniqueInput
    /**
     * In case the document_invitations found by the `where` argument doesn't exist, create a new document_invitations with this data.
     */
    create: XOR<document_invitationsCreateInput, document_invitationsUncheckedCreateInput>
    /**
     * In case the document_invitations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<document_invitationsUpdateInput, document_invitationsUncheckedUpdateInput>
  }

  /**
   * document_invitations delete
   */
  export type document_invitationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
    /**
     * Filter which document_invitations to delete.
     */
    where: document_invitationsWhereUniqueInput
  }

  /**
   * document_invitations deleteMany
   */
  export type document_invitationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which document_invitations to delete
     */
    where?: document_invitationsWhereInput
    /**
     * Limit how many document_invitations to delete.
     */
    limit?: number
  }

  /**
   * document_invitations.users_document_invitations_invited_byTousers
   */
  export type document_invitations$users_document_invitations_invited_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * document_invitations without action
   */
  export type document_invitationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
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
    modified_by: number | null
  }

  export type Document_versionsSumAggregateOutputType = {
    id: number | null
    document_id: number | null
    version_number: number | null
    modified_by: number | null
  }

  export type Document_versionsMinAggregateOutputType = {
    id: number | null
    document_id: number | null
    version_number: number | null
    content: string | null
    modified_by: number | null
    modification_date: Date | null
    change_summary: string | null
  }

  export type Document_versionsMaxAggregateOutputType = {
    id: number | null
    document_id: number | null
    version_number: number | null
    content: string | null
    modified_by: number | null
    modification_date: Date | null
    change_summary: string | null
  }

  export type Document_versionsCountAggregateOutputType = {
    id: number
    document_id: number
    version_number: number
    content: number
    modified_by: number
    modification_date: number
    change_summary: number
    _all: number
  }


  export type Document_versionsAvgAggregateInputType = {
    id?: true
    document_id?: true
    version_number?: true
    modified_by?: true
  }

  export type Document_versionsSumAggregateInputType = {
    id?: true
    document_id?: true
    version_number?: true
    modified_by?: true
  }

  export type Document_versionsMinAggregateInputType = {
    id?: true
    document_id?: true
    version_number?: true
    content?: true
    modified_by?: true
    modification_date?: true
    change_summary?: true
  }

  export type Document_versionsMaxAggregateInputType = {
    id?: true
    document_id?: true
    version_number?: true
    content?: true
    modified_by?: true
    modification_date?: true
    change_summary?: true
  }

  export type Document_versionsCountAggregateInputType = {
    id?: true
    document_id?: true
    version_number?: true
    content?: true
    modified_by?: true
    modification_date?: true
    change_summary?: true
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
    content: string | null
    modified_by: number
    modification_date: Date | null
    change_summary: string | null
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
    content?: boolean
    modified_by?: boolean
    modification_date?: boolean
    change_summary?: boolean
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_versions"]>

  export type document_versionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    version_number?: boolean
    content?: boolean
    modified_by?: boolean
    modification_date?: boolean
    change_summary?: boolean
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_versions"]>

  export type document_versionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    version_number?: boolean
    content?: boolean
    modified_by?: boolean
    modification_date?: boolean
    change_summary?: boolean
    documents?: boolean | documentsDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document_versions"]>

  export type document_versionsSelectScalar = {
    id?: boolean
    document_id?: boolean
    version_number?: boolean
    content?: boolean
    modified_by?: boolean
    modification_date?: boolean
    change_summary?: boolean
  }

  export type document_versionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "document_id" | "version_number" | "content" | "modified_by" | "modification_date" | "change_summary", ExtArgs["result"]["document_versions"]>
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
      content: string | null
      modified_by: number
      modification_date: Date | null
      change_summary: string | null
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
    readonly content: FieldRef<"document_versions", 'String'>
    readonly modified_by: FieldRef<"document_versions", 'Int'>
    readonly modification_date: FieldRef<"document_versions", 'DateTime'>
    readonly change_summary: FieldRef<"document_versions", 'String'>
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
    content: string | null
    file_path: string | null
    file_type: string | null
    file_size: bigint | null
    owner_id: number | null
    parent_folder_id: number | null
    is_folder: boolean | null
    is_deleted: boolean | null
    created_at: Date | null
    updated_at: Date | null
    last_modified_by: number | null
    auto_save_interval: number | null
  }

  export type DocumentsMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    file_path: string | null
    file_type: string | null
    file_size: bigint | null
    owner_id: number | null
    parent_folder_id: number | null
    is_folder: boolean | null
    is_deleted: boolean | null
    created_at: Date | null
    updated_at: Date | null
    last_modified_by: number | null
    auto_save_interval: number | null
  }

  export type DocumentsCountAggregateOutputType = {
    id: number
    title: number
    content: number
    file_path: number
    file_type: number
    file_size: number
    owner_id: number
    parent_folder_id: number
    is_folder: number
    is_deleted: number
    created_at: number
    updated_at: number
    last_modified_by: number
    auto_save_interval: number
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
    content?: true
    file_path?: true
    file_type?: true
    file_size?: true
    owner_id?: true
    parent_folder_id?: true
    is_folder?: true
    is_deleted?: true
    created_at?: true
    updated_at?: true
    last_modified_by?: true
    auto_save_interval?: true
  }

  export type DocumentsMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    file_path?: true
    file_type?: true
    file_size?: true
    owner_id?: true
    parent_folder_id?: true
    is_folder?: true
    is_deleted?: true
    created_at?: true
    updated_at?: true
    last_modified_by?: true
    auto_save_interval?: true
  }

  export type DocumentsCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    file_path?: true
    file_type?: true
    file_size?: true
    owner_id?: true
    parent_folder_id?: true
    is_folder?: true
    is_deleted?: true
    created_at?: true
    updated_at?: true
    last_modified_by?: true
    auto_save_interval?: true
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
    content: string | null
    file_path: string | null
    file_type: string | null
    file_size: bigint | null
    owner_id: number
    parent_folder_id: number | null
    is_folder: boolean | null
    is_deleted: boolean | null
    created_at: Date | null
    updated_at: Date | null
    last_modified_by: number | null
    auto_save_interval: number | null
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
    content?: boolean
    file_path?: boolean
    file_type?: boolean
    file_size?: boolean
    owner_id?: boolean
    parent_folder_id?: boolean
    is_folder?: boolean
    is_deleted?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_modified_by?: boolean
    auto_save_interval?: boolean
    calls?: boolean | documents$callsArgs<ExtArgs>
    document_invitations?: boolean | documents$document_invitationsArgs<ExtArgs>
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
    content?: boolean
    file_path?: boolean
    file_type?: boolean
    file_size?: boolean
    owner_id?: boolean
    parent_folder_id?: boolean
    is_folder?: boolean
    is_deleted?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_modified_by?: boolean
    auto_save_interval?: boolean
    users_documents_last_modified_byTousers?: boolean | documents$users_documents_last_modified_byTousersArgs<ExtArgs>
    users_documents_owner_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    documents?: boolean | documents$documentsArgs<ExtArgs>
  }, ExtArgs["result"]["documents"]>

  export type documentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    file_path?: boolean
    file_type?: boolean
    file_size?: boolean
    owner_id?: boolean
    parent_folder_id?: boolean
    is_folder?: boolean
    is_deleted?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_modified_by?: boolean
    auto_save_interval?: boolean
    users_documents_last_modified_byTousers?: boolean | documents$users_documents_last_modified_byTousersArgs<ExtArgs>
    users_documents_owner_idTousers?: boolean | usersDefaultArgs<ExtArgs>
    documents?: boolean | documents$documentsArgs<ExtArgs>
  }, ExtArgs["result"]["documents"]>

  export type documentsSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    file_path?: boolean
    file_type?: boolean
    file_size?: boolean
    owner_id?: boolean
    parent_folder_id?: boolean
    is_folder?: boolean
    is_deleted?: boolean
    created_at?: boolean
    updated_at?: boolean
    last_modified_by?: boolean
    auto_save_interval?: boolean
  }

  export type documentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "file_path" | "file_type" | "file_size" | "owner_id" | "parent_folder_id" | "is_folder" | "is_deleted" | "created_at" | "updated_at" | "last_modified_by" | "auto_save_interval", ExtArgs["result"]["documents"]>
  export type documentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calls?: boolean | documents$callsArgs<ExtArgs>
    document_invitations?: boolean | documents$document_invitationsArgs<ExtArgs>
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
      document_invitations: Prisma.$document_invitationsPayload<ExtArgs>[]
      document_versions: Prisma.$document_versionsPayload<ExtArgs>[]
      users_documents_last_modified_byTousers: Prisma.$usersPayload<ExtArgs> | null
      users_documents_owner_idTousers: Prisma.$usersPayload<ExtArgs>
      documents: Prisma.$documentsPayload<ExtArgs> | null
      other_documents: Prisma.$documentsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      content: string | null
      file_path: string | null
      file_type: string | null
      file_size: bigint | null
      owner_id: number
      parent_folder_id: number | null
      is_folder: boolean | null
      is_deleted: boolean | null
      created_at: Date | null
      updated_at: Date | null
      last_modified_by: number | null
      auto_save_interval: number | null
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
    document_invitations<T extends documents$document_invitationsArgs<ExtArgs> = {}>(args?: Subset<T, documents$document_invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly content: FieldRef<"documents", 'String'>
    readonly file_path: FieldRef<"documents", 'String'>
    readonly file_type: FieldRef<"documents", 'String'>
    readonly file_size: FieldRef<"documents", 'BigInt'>
    readonly owner_id: FieldRef<"documents", 'Int'>
    readonly parent_folder_id: FieldRef<"documents", 'Int'>
    readonly is_folder: FieldRef<"documents", 'Boolean'>
    readonly is_deleted: FieldRef<"documents", 'Boolean'>
    readonly created_at: FieldRef<"documents", 'DateTime'>
    readonly updated_at: FieldRef<"documents", 'DateTime'>
    readonly last_modified_by: FieldRef<"documents", 'Int'>
    readonly auto_save_interval: FieldRef<"documents", 'Int'>
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
   * documents.document_invitations
   */
  export type documents$document_invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
    where?: document_invitationsWhereInput
    orderBy?: document_invitationsOrderByWithRelationInput | document_invitationsOrderByWithRelationInput[]
    cursor?: document_invitationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Document_invitationsScalarFieldEnum | Document_invitationsScalarFieldEnum[]
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
    document_invitations_document_invitations_invited_byTousers?: boolean | users$document_invitations_document_invitations_invited_byTousersArgs<ExtArgs>
    document_invitations_document_invitations_user_idTousers?: boolean | users$document_invitations_document_invitations_user_idTousersArgs<ExtArgs>
    document_versions?: boolean | users$document_versionsArgs<ExtArgs>
    documents_documents_last_modified_byTousers?: boolean | users$documents_documents_last_modified_byTousersArgs<ExtArgs>
    documents_documents_owner_idTousers?: boolean | users$documents_documents_owner_idTousersArgs<ExtArgs>
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
    document_invitations_document_invitations_invited_byTousers?: boolean | users$document_invitations_document_invitations_invited_byTousersArgs<ExtArgs>
    document_invitations_document_invitations_user_idTousers?: boolean | users$document_invitations_document_invitations_user_idTousersArgs<ExtArgs>
    document_versions?: boolean | users$document_versionsArgs<ExtArgs>
    documents_documents_last_modified_byTousers?: boolean | users$documents_documents_last_modified_byTousersArgs<ExtArgs>
    documents_documents_owner_idTousers?: boolean | users$documents_documents_owner_idTousersArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      call_participants: Prisma.$call_participantsPayload<ExtArgs>[]
      calls: Prisma.$callsPayload<ExtArgs>[]
      document_invitations_document_invitations_invited_byTousers: Prisma.$document_invitationsPayload<ExtArgs>[]
      document_invitations_document_invitations_user_idTousers: Prisma.$document_invitationsPayload<ExtArgs>[]
      document_versions: Prisma.$document_versionsPayload<ExtArgs>[]
      documents_documents_last_modified_byTousers: Prisma.$documentsPayload<ExtArgs>[]
      documents_documents_owner_idTousers: Prisma.$documentsPayload<ExtArgs>[]
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
    document_invitations_document_invitations_invited_byTousers<T extends users$document_invitations_document_invitations_invited_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$document_invitations_document_invitations_invited_byTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    document_invitations_document_invitations_user_idTousers<T extends users$document_invitations_document_invitations_user_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$document_invitations_document_invitations_user_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_invitationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    document_versions<T extends users$document_versionsArgs<ExtArgs> = {}>(args?: Subset<T, users$document_versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$document_versionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents_documents_last_modified_byTousers<T extends users$documents_documents_last_modified_byTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$documents_documents_last_modified_byTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents_documents_owner_idTousers<T extends users$documents_documents_owner_idTousersArgs<ExtArgs> = {}>(args?: Subset<T, users$documents_documents_owner_idTousersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * users.document_invitations_document_invitations_invited_byTousers
   */
  export type users$document_invitations_document_invitations_invited_byTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
    where?: document_invitationsWhereInput
    orderBy?: document_invitationsOrderByWithRelationInput | document_invitationsOrderByWithRelationInput[]
    cursor?: document_invitationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Document_invitationsScalarFieldEnum | Document_invitationsScalarFieldEnum[]
  }

  /**
   * users.document_invitations_document_invitations_user_idTousers
   */
  export type users$document_invitations_document_invitations_user_idTousersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the document_invitations
     */
    select?: document_invitationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the document_invitations
     */
    omit?: document_invitationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: document_invitationsInclude<ExtArgs> | null
    where?: document_invitationsWhereInput
    orderBy?: document_invitationsOrderByWithRelationInput | document_invitationsOrderByWithRelationInput[]
    cursor?: document_invitationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Document_invitationsScalarFieldEnum | Document_invitationsScalarFieldEnum[]
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


  export const Document_invitationsScalarFieldEnum: {
    id: 'id',
    document_id: 'document_id',
    user_id: 'user_id',
    permission_level: 'permission_level',
    invited_by: 'invited_by',
    invitation_date: 'invitation_date',
    accepted_date: 'accepted_date',
    is_active: 'is_active'
  };

  export type Document_invitationsScalarFieldEnum = (typeof Document_invitationsScalarFieldEnum)[keyof typeof Document_invitationsScalarFieldEnum]


  export const Document_versionsScalarFieldEnum: {
    id: 'id',
    document_id: 'document_id',
    version_number: 'version_number',
    content: 'content',
    modified_by: 'modified_by',
    modification_date: 'modification_date',
    change_summary: 'change_summary'
  };

  export type Document_versionsScalarFieldEnum = (typeof Document_versionsScalarFieldEnum)[keyof typeof Document_versionsScalarFieldEnum]


  export const DocumentsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    file_path: 'file_path',
    file_type: 'file_type',
    file_size: 'file_size',
    owner_id: 'owner_id',
    parent_folder_id: 'parent_folder_id',
    is_folder: 'is_folder',
    is_deleted: 'is_deleted',
    created_at: 'created_at',
    updated_at: 'updated_at',
    last_modified_by: 'last_modified_by',
    auto_save_interval: 'auto_save_interval'
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


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
    call_id_user_id?: call_participantsCall_idUser_idCompoundUniqueInput
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

  export type document_invitationsWhereInput = {
    AND?: document_invitationsWhereInput | document_invitationsWhereInput[]
    OR?: document_invitationsWhereInput[]
    NOT?: document_invitationsWhereInput | document_invitationsWhereInput[]
    id?: IntFilter<"document_invitations"> | number
    document_id?: IntFilter<"document_invitations"> | number
    user_id?: IntFilter<"document_invitations"> | number
    permission_level?: StringFilter<"document_invitations"> | string
    invited_by?: IntNullableFilter<"document_invitations"> | number | null
    invitation_date?: DateTimeNullableFilter<"document_invitations"> | Date | string | null
    accepted_date?: DateTimeNullableFilter<"document_invitations"> | Date | string | null
    is_active?: BoolNullableFilter<"document_invitations"> | boolean | null
    documents?: XOR<DocumentsScalarRelationFilter, documentsWhereInput>
    users_document_invitations_invited_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_document_invitations_user_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type document_invitationsOrderByWithRelationInput = {
    id?: SortOrder
    document_id?: SortOrder
    user_id?: SortOrder
    permission_level?: SortOrder
    invited_by?: SortOrderInput | SortOrder
    invitation_date?: SortOrderInput | SortOrder
    accepted_date?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    documents?: documentsOrderByWithRelationInput
    users_document_invitations_invited_byTousers?: usersOrderByWithRelationInput
    users_document_invitations_user_idTousers?: usersOrderByWithRelationInput
  }

  export type document_invitationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    document_id_user_id?: document_invitationsDocument_idUser_idCompoundUniqueInput
    AND?: document_invitationsWhereInput | document_invitationsWhereInput[]
    OR?: document_invitationsWhereInput[]
    NOT?: document_invitationsWhereInput | document_invitationsWhereInput[]
    document_id?: IntFilter<"document_invitations"> | number
    user_id?: IntFilter<"document_invitations"> | number
    permission_level?: StringFilter<"document_invitations"> | string
    invited_by?: IntNullableFilter<"document_invitations"> | number | null
    invitation_date?: DateTimeNullableFilter<"document_invitations"> | Date | string | null
    accepted_date?: DateTimeNullableFilter<"document_invitations"> | Date | string | null
    is_active?: BoolNullableFilter<"document_invitations"> | boolean | null
    documents?: XOR<DocumentsScalarRelationFilter, documentsWhereInput>
    users_document_invitations_invited_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_document_invitations_user_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "document_id_user_id">

  export type document_invitationsOrderByWithAggregationInput = {
    id?: SortOrder
    document_id?: SortOrder
    user_id?: SortOrder
    permission_level?: SortOrder
    invited_by?: SortOrderInput | SortOrder
    invitation_date?: SortOrderInput | SortOrder
    accepted_date?: SortOrderInput | SortOrder
    is_active?: SortOrderInput | SortOrder
    _count?: document_invitationsCountOrderByAggregateInput
    _avg?: document_invitationsAvgOrderByAggregateInput
    _max?: document_invitationsMaxOrderByAggregateInput
    _min?: document_invitationsMinOrderByAggregateInput
    _sum?: document_invitationsSumOrderByAggregateInput
  }

  export type document_invitationsScalarWhereWithAggregatesInput = {
    AND?: document_invitationsScalarWhereWithAggregatesInput | document_invitationsScalarWhereWithAggregatesInput[]
    OR?: document_invitationsScalarWhereWithAggregatesInput[]
    NOT?: document_invitationsScalarWhereWithAggregatesInput | document_invitationsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"document_invitations"> | number
    document_id?: IntWithAggregatesFilter<"document_invitations"> | number
    user_id?: IntWithAggregatesFilter<"document_invitations"> | number
    permission_level?: StringWithAggregatesFilter<"document_invitations"> | string
    invited_by?: IntNullableWithAggregatesFilter<"document_invitations"> | number | null
    invitation_date?: DateTimeNullableWithAggregatesFilter<"document_invitations"> | Date | string | null
    accepted_date?: DateTimeNullableWithAggregatesFilter<"document_invitations"> | Date | string | null
    is_active?: BoolNullableWithAggregatesFilter<"document_invitations"> | boolean | null
  }

  export type document_versionsWhereInput = {
    AND?: document_versionsWhereInput | document_versionsWhereInput[]
    OR?: document_versionsWhereInput[]
    NOT?: document_versionsWhereInput | document_versionsWhereInput[]
    id?: IntFilter<"document_versions"> | number
    document_id?: IntFilter<"document_versions"> | number
    version_number?: IntFilter<"document_versions"> | number
    content?: StringNullableFilter<"document_versions"> | string | null
    modified_by?: IntFilter<"document_versions"> | number
    modification_date?: DateTimeNullableFilter<"document_versions"> | Date | string | null
    change_summary?: StringNullableFilter<"document_versions"> | string | null
    documents?: XOR<DocumentsScalarRelationFilter, documentsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type document_versionsOrderByWithRelationInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    content?: SortOrderInput | SortOrder
    modified_by?: SortOrder
    modification_date?: SortOrderInput | SortOrder
    change_summary?: SortOrderInput | SortOrder
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
    content?: StringNullableFilter<"document_versions"> | string | null
    modified_by?: IntFilter<"document_versions"> | number
    modification_date?: DateTimeNullableFilter<"document_versions"> | Date | string | null
    change_summary?: StringNullableFilter<"document_versions"> | string | null
    documents?: XOR<DocumentsScalarRelationFilter, documentsWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "document_id_version_number">

  export type document_versionsOrderByWithAggregationInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    content?: SortOrderInput | SortOrder
    modified_by?: SortOrder
    modification_date?: SortOrderInput | SortOrder
    change_summary?: SortOrderInput | SortOrder
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
    content?: StringNullableWithAggregatesFilter<"document_versions"> | string | null
    modified_by?: IntWithAggregatesFilter<"document_versions"> | number
    modification_date?: DateTimeNullableWithAggregatesFilter<"document_versions"> | Date | string | null
    change_summary?: StringNullableWithAggregatesFilter<"document_versions"> | string | null
  }

  export type documentsWhereInput = {
    AND?: documentsWhereInput | documentsWhereInput[]
    OR?: documentsWhereInput[]
    NOT?: documentsWhereInput | documentsWhereInput[]
    id?: IntFilter<"documents"> | number
    title?: StringFilter<"documents"> | string
    content?: StringNullableFilter<"documents"> | string | null
    file_path?: StringNullableFilter<"documents"> | string | null
    file_type?: StringNullableFilter<"documents"> | string | null
    file_size?: BigIntNullableFilter<"documents"> | bigint | number | null
    owner_id?: IntFilter<"documents"> | number
    parent_folder_id?: IntNullableFilter<"documents"> | number | null
    is_folder?: BoolNullableFilter<"documents"> | boolean | null
    is_deleted?: BoolNullableFilter<"documents"> | boolean | null
    created_at?: DateTimeNullableFilter<"documents"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"documents"> | Date | string | null
    last_modified_by?: IntNullableFilter<"documents"> | number | null
    auto_save_interval?: IntNullableFilter<"documents"> | number | null
    calls?: CallsListRelationFilter
    document_invitations?: Document_invitationsListRelationFilter
    document_versions?: Document_versionsListRelationFilter
    users_documents_last_modified_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_documents_owner_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    documents?: XOR<DocumentsNullableScalarRelationFilter, documentsWhereInput> | null
    other_documents?: DocumentsListRelationFilter
  }

  export type documentsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    file_path?: SortOrderInput | SortOrder
    file_type?: SortOrderInput | SortOrder
    file_size?: SortOrderInput | SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrderInput | SortOrder
    is_folder?: SortOrderInput | SortOrder
    is_deleted?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    last_modified_by?: SortOrderInput | SortOrder
    auto_save_interval?: SortOrderInput | SortOrder
    calls?: callsOrderByRelationAggregateInput
    document_invitations?: document_invitationsOrderByRelationAggregateInput
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
    content?: StringNullableFilter<"documents"> | string | null
    file_path?: StringNullableFilter<"documents"> | string | null
    file_type?: StringNullableFilter<"documents"> | string | null
    file_size?: BigIntNullableFilter<"documents"> | bigint | number | null
    owner_id?: IntFilter<"documents"> | number
    parent_folder_id?: IntNullableFilter<"documents"> | number | null
    is_folder?: BoolNullableFilter<"documents"> | boolean | null
    is_deleted?: BoolNullableFilter<"documents"> | boolean | null
    created_at?: DateTimeNullableFilter<"documents"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"documents"> | Date | string | null
    last_modified_by?: IntNullableFilter<"documents"> | number | null
    auto_save_interval?: IntNullableFilter<"documents"> | number | null
    calls?: CallsListRelationFilter
    document_invitations?: Document_invitationsListRelationFilter
    document_versions?: Document_versionsListRelationFilter
    users_documents_last_modified_byTousers?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
    users_documents_owner_idTousers?: XOR<UsersScalarRelationFilter, usersWhereInput>
    documents?: XOR<DocumentsNullableScalarRelationFilter, documentsWhereInput> | null
    other_documents?: DocumentsListRelationFilter
  }, "id">

  export type documentsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    file_path?: SortOrderInput | SortOrder
    file_type?: SortOrderInput | SortOrder
    file_size?: SortOrderInput | SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrderInput | SortOrder
    is_folder?: SortOrderInput | SortOrder
    is_deleted?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    last_modified_by?: SortOrderInput | SortOrder
    auto_save_interval?: SortOrderInput | SortOrder
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
    content?: StringNullableWithAggregatesFilter<"documents"> | string | null
    file_path?: StringNullableWithAggregatesFilter<"documents"> | string | null
    file_type?: StringNullableWithAggregatesFilter<"documents"> | string | null
    file_size?: BigIntNullableWithAggregatesFilter<"documents"> | bigint | number | null
    owner_id?: IntWithAggregatesFilter<"documents"> | number
    parent_folder_id?: IntNullableWithAggregatesFilter<"documents"> | number | null
    is_folder?: BoolNullableWithAggregatesFilter<"documents"> | boolean | null
    is_deleted?: BoolNullableWithAggregatesFilter<"documents"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"documents"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"documents"> | Date | string | null
    last_modified_by?: IntNullableWithAggregatesFilter<"documents"> | number | null
    auto_save_interval?: IntNullableWithAggregatesFilter<"documents"> | number | null
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
    document_invitations_document_invitations_invited_byTousers?: Document_invitationsListRelationFilter
    document_invitations_document_invitations_user_idTousers?: Document_invitationsListRelationFilter
    document_versions?: Document_versionsListRelationFilter
    documents_documents_last_modified_byTousers?: DocumentsListRelationFilter
    documents_documents_owner_idTousers?: DocumentsListRelationFilter
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsOrderByRelationAggregateInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsOrderByRelationAggregateInput
    document_versions?: document_versionsOrderByRelationAggregateInput
    documents_documents_last_modified_byTousers?: documentsOrderByRelationAggregateInput
    documents_documents_owner_idTousers?: documentsOrderByRelationAggregateInput
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
    document_invitations_document_invitations_invited_byTousers?: Document_invitationsListRelationFilter
    document_invitations_document_invitations_user_idTousers?: Document_invitationsListRelationFilter
    document_versions?: Document_versionsListRelationFilter
    documents_documents_last_modified_byTousers?: DocumentsListRelationFilter
    documents_documents_owner_idTousers?: DocumentsListRelationFilter
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

  export type document_invitationsCreateInput = {
    permission_level: string
    invitation_date?: Date | string | null
    accepted_date?: Date | string | null
    is_active?: boolean | null
    documents: documentsCreateNestedOneWithoutDocument_invitationsInput
    users_document_invitations_invited_byTousers?: usersCreateNestedOneWithoutDocument_invitations_document_invitations_invited_byTousersInput
    users_document_invitations_user_idTousers: usersCreateNestedOneWithoutDocument_invitations_document_invitations_user_idTousersInput
  }

  export type document_invitationsUncheckedCreateInput = {
    id?: number
    document_id: number
    user_id: number
    permission_level: string
    invited_by?: number | null
    invitation_date?: Date | string | null
    accepted_date?: Date | string | null
    is_active?: boolean | null
  }

  export type document_invitationsUpdateInput = {
    permission_level?: StringFieldUpdateOperationsInput | string
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    documents?: documentsUpdateOneRequiredWithoutDocument_invitationsNestedInput
    users_document_invitations_invited_byTousers?: usersUpdateOneWithoutDocument_invitations_document_invitations_invited_byTousersNestedInput
    users_document_invitations_user_idTousers?: usersUpdateOneRequiredWithoutDocument_invitations_document_invitations_user_idTousersNestedInput
  }

  export type document_invitationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    permission_level?: StringFieldUpdateOperationsInput | string
    invited_by?: NullableIntFieldUpdateOperationsInput | number | null
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type document_invitationsCreateManyInput = {
    id?: number
    document_id: number
    user_id: number
    permission_level: string
    invited_by?: number | null
    invitation_date?: Date | string | null
    accepted_date?: Date | string | null
    is_active?: boolean | null
  }

  export type document_invitationsUpdateManyMutationInput = {
    permission_level?: StringFieldUpdateOperationsInput | string
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type document_invitationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    permission_level?: StringFieldUpdateOperationsInput | string
    invited_by?: NullableIntFieldUpdateOperationsInput | number | null
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type document_versionsCreateInput = {
    version_number: number
    content?: string | null
    modification_date?: Date | string | null
    change_summary?: string | null
    documents: documentsCreateNestedOneWithoutDocument_versionsInput
    users: usersCreateNestedOneWithoutDocument_versionsInput
  }

  export type document_versionsUncheckedCreateInput = {
    id?: number
    document_id: number
    version_number: number
    content?: string | null
    modified_by: number
    modification_date?: Date | string | null
    change_summary?: string | null
  }

  export type document_versionsUpdateInput = {
    version_number?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    modification_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: documentsUpdateOneRequiredWithoutDocument_versionsNestedInput
    users?: usersUpdateOneRequiredWithoutDocument_versionsNestedInput
  }

  export type document_versionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    version_number?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    modified_by?: IntFieldUpdateOperationsInput | number
    modification_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type document_versionsCreateManyInput = {
    id?: number
    document_id: number
    version_number: number
    content?: string | null
    modified_by: number
    modification_date?: Date | string | null
    change_summary?: string | null
  }

  export type document_versionsUpdateManyMutationInput = {
    version_number?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    modification_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type document_versionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    version_number?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    modified_by?: IntFieldUpdateOperationsInput | number
    modification_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type documentsCreateInput = {
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    auto_save_interval?: number | null
    calls?: callsCreateNestedManyWithoutDocumentsInput
    document_invitations?: document_invitationsCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateInput = {
    id?: number
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_modified_by?: number | null
    auto_save_interval?: number | null
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    document_invitations?: document_invitationsUncheckedCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutDocumentsInput
    other_documents?: documentsUncheckedCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    document_invitations?: document_invitationsUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_invitations?: document_invitationsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutDocumentsNestedInput
    other_documents?: documentsUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsCreateManyInput = {
    id?: number
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_modified_by?: number | null
    auto_save_interval?: number | null
  }

  export type documentsUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type documentsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
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

  export type call_participantsCall_idUser_idCompoundUniqueInput = {
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

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type document_invitationsDocument_idUser_idCompoundUniqueInput = {
    document_id: number
    user_id: number
  }

  export type document_invitationsCountOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    user_id?: SortOrder
    permission_level?: SortOrder
    invited_by?: SortOrder
    invitation_date?: SortOrder
    accepted_date?: SortOrder
    is_active?: SortOrder
  }

  export type document_invitationsAvgOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    user_id?: SortOrder
    invited_by?: SortOrder
  }

  export type document_invitationsMaxOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    user_id?: SortOrder
    permission_level?: SortOrder
    invited_by?: SortOrder
    invitation_date?: SortOrder
    accepted_date?: SortOrder
    is_active?: SortOrder
  }

  export type document_invitationsMinOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    user_id?: SortOrder
    permission_level?: SortOrder
    invited_by?: SortOrder
    invitation_date?: SortOrder
    accepted_date?: SortOrder
    is_active?: SortOrder
  }

  export type document_invitationsSumOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    user_id?: SortOrder
    invited_by?: SortOrder
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

  export type document_versionsDocument_idVersion_numberCompoundUniqueInput = {
    document_id: number
    version_number: number
  }

  export type document_versionsCountOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    content?: SortOrder
    modified_by?: SortOrder
    modification_date?: SortOrder
    change_summary?: SortOrder
  }

  export type document_versionsAvgOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    modified_by?: SortOrder
  }

  export type document_versionsMaxOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    content?: SortOrder
    modified_by?: SortOrder
    modification_date?: SortOrder
    change_summary?: SortOrder
  }

  export type document_versionsMinOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    content?: SortOrder
    modified_by?: SortOrder
    modification_date?: SortOrder
    change_summary?: SortOrder
  }

  export type document_versionsSumOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    version_number?: SortOrder
    modified_by?: SortOrder
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

  export type CallsListRelationFilter = {
    every?: callsWhereInput
    some?: callsWhereInput
    none?: callsWhereInput
  }

  export type Document_invitationsListRelationFilter = {
    every?: document_invitationsWhereInput
    some?: document_invitationsWhereInput
    none?: document_invitationsWhereInput
  }

  export type Document_versionsListRelationFilter = {
    every?: document_versionsWhereInput
    some?: document_versionsWhereInput
    none?: document_versionsWhereInput
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

  export type document_invitationsOrderByRelationAggregateInput = {
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
    content?: SortOrder
    file_path?: SortOrder
    file_type?: SortOrder
    file_size?: SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrder
    is_folder?: SortOrder
    is_deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_modified_by?: SortOrder
    auto_save_interval?: SortOrder
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
    content?: SortOrder
    file_path?: SortOrder
    file_type?: SortOrder
    file_size?: SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrder
    is_folder?: SortOrder
    is_deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_modified_by?: SortOrder
    auto_save_interval?: SortOrder
  }

  export type documentsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    file_path?: SortOrder
    file_type?: SortOrder
    file_size?: SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrder
    is_folder?: SortOrder
    is_deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    last_modified_by?: SortOrder
    auto_save_interval?: SortOrder
  }

  export type documentsSumOrderByAggregateInput = {
    id?: SortOrder
    file_size?: SortOrder
    owner_id?: SortOrder
    parent_folder_id?: SortOrder
    last_modified_by?: SortOrder
    auto_save_interval?: SortOrder
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

  export type documentsCreateNestedOneWithoutDocument_invitationsInput = {
    create?: XOR<documentsCreateWithoutDocument_invitationsInput, documentsUncheckedCreateWithoutDocument_invitationsInput>
    connectOrCreate?: documentsCreateOrConnectWithoutDocument_invitationsInput
    connect?: documentsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutDocument_invitations_document_invitations_invited_byTousersInput = {
    create?: XOR<usersCreateWithoutDocument_invitations_document_invitations_invited_byTousersInput, usersUncheckedCreateWithoutDocument_invitations_document_invitations_invited_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutDocument_invitations_document_invitations_invited_byTousersInput
    connect?: usersWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutDocument_invitations_document_invitations_user_idTousersInput = {
    create?: XOR<usersCreateWithoutDocument_invitations_document_invitations_user_idTousersInput, usersUncheckedCreateWithoutDocument_invitations_document_invitations_user_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutDocument_invitations_document_invitations_user_idTousersInput
    connect?: usersWhereUniqueInput
  }

  export type documentsUpdateOneRequiredWithoutDocument_invitationsNestedInput = {
    create?: XOR<documentsCreateWithoutDocument_invitationsInput, documentsUncheckedCreateWithoutDocument_invitationsInput>
    connectOrCreate?: documentsCreateOrConnectWithoutDocument_invitationsInput
    upsert?: documentsUpsertWithoutDocument_invitationsInput
    connect?: documentsWhereUniqueInput
    update?: XOR<XOR<documentsUpdateToOneWithWhereWithoutDocument_invitationsInput, documentsUpdateWithoutDocument_invitationsInput>, documentsUncheckedUpdateWithoutDocument_invitationsInput>
  }

  export type usersUpdateOneWithoutDocument_invitations_document_invitations_invited_byTousersNestedInput = {
    create?: XOR<usersCreateWithoutDocument_invitations_document_invitations_invited_byTousersInput, usersUncheckedCreateWithoutDocument_invitations_document_invitations_invited_byTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutDocument_invitations_document_invitations_invited_byTousersInput
    upsert?: usersUpsertWithoutDocument_invitations_document_invitations_invited_byTousersInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutDocument_invitations_document_invitations_invited_byTousersInput, usersUpdateWithoutDocument_invitations_document_invitations_invited_byTousersInput>, usersUncheckedUpdateWithoutDocument_invitations_document_invitations_invited_byTousersInput>
  }

  export type usersUpdateOneRequiredWithoutDocument_invitations_document_invitations_user_idTousersNestedInput = {
    create?: XOR<usersCreateWithoutDocument_invitations_document_invitations_user_idTousersInput, usersUncheckedCreateWithoutDocument_invitations_document_invitations_user_idTousersInput>
    connectOrCreate?: usersCreateOrConnectWithoutDocument_invitations_document_invitations_user_idTousersInput
    upsert?: usersUpsertWithoutDocument_invitations_document_invitations_user_idTousersInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutDocument_invitations_document_invitations_user_idTousersInput, usersUpdateWithoutDocument_invitations_document_invitations_user_idTousersInput>, usersUncheckedUpdateWithoutDocument_invitations_document_invitations_user_idTousersInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type document_invitationsCreateNestedManyWithoutDocumentsInput = {
    create?: XOR<document_invitationsCreateWithoutDocumentsInput, document_invitationsUncheckedCreateWithoutDocumentsInput> | document_invitationsCreateWithoutDocumentsInput[] | document_invitationsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: document_invitationsCreateOrConnectWithoutDocumentsInput | document_invitationsCreateOrConnectWithoutDocumentsInput[]
    createMany?: document_invitationsCreateManyDocumentsInputEnvelope
    connect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
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

  export type document_invitationsUncheckedCreateNestedManyWithoutDocumentsInput = {
    create?: XOR<document_invitationsCreateWithoutDocumentsInput, document_invitationsUncheckedCreateWithoutDocumentsInput> | document_invitationsCreateWithoutDocumentsInput[] | document_invitationsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: document_invitationsCreateOrConnectWithoutDocumentsInput | document_invitationsCreateOrConnectWithoutDocumentsInput[]
    createMany?: document_invitationsCreateManyDocumentsInputEnvelope
    connect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
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

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
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

  export type document_invitationsUpdateManyWithoutDocumentsNestedInput = {
    create?: XOR<document_invitationsCreateWithoutDocumentsInput, document_invitationsUncheckedCreateWithoutDocumentsInput> | document_invitationsCreateWithoutDocumentsInput[] | document_invitationsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: document_invitationsCreateOrConnectWithoutDocumentsInput | document_invitationsCreateOrConnectWithoutDocumentsInput[]
    upsert?: document_invitationsUpsertWithWhereUniqueWithoutDocumentsInput | document_invitationsUpsertWithWhereUniqueWithoutDocumentsInput[]
    createMany?: document_invitationsCreateManyDocumentsInputEnvelope
    set?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    disconnect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    delete?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    connect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    update?: document_invitationsUpdateWithWhereUniqueWithoutDocumentsInput | document_invitationsUpdateWithWhereUniqueWithoutDocumentsInput[]
    updateMany?: document_invitationsUpdateManyWithWhereWithoutDocumentsInput | document_invitationsUpdateManyWithWhereWithoutDocumentsInput[]
    deleteMany?: document_invitationsScalarWhereInput | document_invitationsScalarWhereInput[]
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

  export type document_invitationsUncheckedUpdateManyWithoutDocumentsNestedInput = {
    create?: XOR<document_invitationsCreateWithoutDocumentsInput, document_invitationsUncheckedCreateWithoutDocumentsInput> | document_invitationsCreateWithoutDocumentsInput[] | document_invitationsUncheckedCreateWithoutDocumentsInput[]
    connectOrCreate?: document_invitationsCreateOrConnectWithoutDocumentsInput | document_invitationsCreateOrConnectWithoutDocumentsInput[]
    upsert?: document_invitationsUpsertWithWhereUniqueWithoutDocumentsInput | document_invitationsUpsertWithWhereUniqueWithoutDocumentsInput[]
    createMany?: document_invitationsCreateManyDocumentsInputEnvelope
    set?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    disconnect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    delete?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    connect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    update?: document_invitationsUpdateWithWhereUniqueWithoutDocumentsInput | document_invitationsUpdateWithWhereUniqueWithoutDocumentsInput[]
    updateMany?: document_invitationsUpdateManyWithWhereWithoutDocumentsInput | document_invitationsUpdateManyWithWhereWithoutDocumentsInput[]
    deleteMany?: document_invitationsScalarWhereInput | document_invitationsScalarWhereInput[]
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

  export type document_invitationsCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput = {
    create?: XOR<document_invitationsCreateWithoutUsers_document_invitations_invited_byTousersInput, document_invitationsUncheckedCreateWithoutUsers_document_invitations_invited_byTousersInput> | document_invitationsCreateWithoutUsers_document_invitations_invited_byTousersInput[] | document_invitationsUncheckedCreateWithoutUsers_document_invitations_invited_byTousersInput[]
    connectOrCreate?: document_invitationsCreateOrConnectWithoutUsers_document_invitations_invited_byTousersInput | document_invitationsCreateOrConnectWithoutUsers_document_invitations_invited_byTousersInput[]
    createMany?: document_invitationsCreateManyUsers_document_invitations_invited_byTousersInputEnvelope
    connect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
  }

  export type document_invitationsCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput = {
    create?: XOR<document_invitationsCreateWithoutUsers_document_invitations_user_idTousersInput, document_invitationsUncheckedCreateWithoutUsers_document_invitations_user_idTousersInput> | document_invitationsCreateWithoutUsers_document_invitations_user_idTousersInput[] | document_invitationsUncheckedCreateWithoutUsers_document_invitations_user_idTousersInput[]
    connectOrCreate?: document_invitationsCreateOrConnectWithoutUsers_document_invitations_user_idTousersInput | document_invitationsCreateOrConnectWithoutUsers_document_invitations_user_idTousersInput[]
    createMany?: document_invitationsCreateManyUsers_document_invitations_user_idTousersInputEnvelope
    connect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
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

  export type document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput = {
    create?: XOR<document_invitationsCreateWithoutUsers_document_invitations_invited_byTousersInput, document_invitationsUncheckedCreateWithoutUsers_document_invitations_invited_byTousersInput> | document_invitationsCreateWithoutUsers_document_invitations_invited_byTousersInput[] | document_invitationsUncheckedCreateWithoutUsers_document_invitations_invited_byTousersInput[]
    connectOrCreate?: document_invitationsCreateOrConnectWithoutUsers_document_invitations_invited_byTousersInput | document_invitationsCreateOrConnectWithoutUsers_document_invitations_invited_byTousersInput[]
    createMany?: document_invitationsCreateManyUsers_document_invitations_invited_byTousersInputEnvelope
    connect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
  }

  export type document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput = {
    create?: XOR<document_invitationsCreateWithoutUsers_document_invitations_user_idTousersInput, document_invitationsUncheckedCreateWithoutUsers_document_invitations_user_idTousersInput> | document_invitationsCreateWithoutUsers_document_invitations_user_idTousersInput[] | document_invitationsUncheckedCreateWithoutUsers_document_invitations_user_idTousersInput[]
    connectOrCreate?: document_invitationsCreateOrConnectWithoutUsers_document_invitations_user_idTousersInput | document_invitationsCreateOrConnectWithoutUsers_document_invitations_user_idTousersInput[]
    createMany?: document_invitationsCreateManyUsers_document_invitations_user_idTousersInputEnvelope
    connect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
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

  export type document_invitationsUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput = {
    create?: XOR<document_invitationsCreateWithoutUsers_document_invitations_invited_byTousersInput, document_invitationsUncheckedCreateWithoutUsers_document_invitations_invited_byTousersInput> | document_invitationsCreateWithoutUsers_document_invitations_invited_byTousersInput[] | document_invitationsUncheckedCreateWithoutUsers_document_invitations_invited_byTousersInput[]
    connectOrCreate?: document_invitationsCreateOrConnectWithoutUsers_document_invitations_invited_byTousersInput | document_invitationsCreateOrConnectWithoutUsers_document_invitations_invited_byTousersInput[]
    upsert?: document_invitationsUpsertWithWhereUniqueWithoutUsers_document_invitations_invited_byTousersInput | document_invitationsUpsertWithWhereUniqueWithoutUsers_document_invitations_invited_byTousersInput[]
    createMany?: document_invitationsCreateManyUsers_document_invitations_invited_byTousersInputEnvelope
    set?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    disconnect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    delete?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    connect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    update?: document_invitationsUpdateWithWhereUniqueWithoutUsers_document_invitations_invited_byTousersInput | document_invitationsUpdateWithWhereUniqueWithoutUsers_document_invitations_invited_byTousersInput[]
    updateMany?: document_invitationsUpdateManyWithWhereWithoutUsers_document_invitations_invited_byTousersInput | document_invitationsUpdateManyWithWhereWithoutUsers_document_invitations_invited_byTousersInput[]
    deleteMany?: document_invitationsScalarWhereInput | document_invitationsScalarWhereInput[]
  }

  export type document_invitationsUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput = {
    create?: XOR<document_invitationsCreateWithoutUsers_document_invitations_user_idTousersInput, document_invitationsUncheckedCreateWithoutUsers_document_invitations_user_idTousersInput> | document_invitationsCreateWithoutUsers_document_invitations_user_idTousersInput[] | document_invitationsUncheckedCreateWithoutUsers_document_invitations_user_idTousersInput[]
    connectOrCreate?: document_invitationsCreateOrConnectWithoutUsers_document_invitations_user_idTousersInput | document_invitationsCreateOrConnectWithoutUsers_document_invitations_user_idTousersInput[]
    upsert?: document_invitationsUpsertWithWhereUniqueWithoutUsers_document_invitations_user_idTousersInput | document_invitationsUpsertWithWhereUniqueWithoutUsers_document_invitations_user_idTousersInput[]
    createMany?: document_invitationsCreateManyUsers_document_invitations_user_idTousersInputEnvelope
    set?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    disconnect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    delete?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    connect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    update?: document_invitationsUpdateWithWhereUniqueWithoutUsers_document_invitations_user_idTousersInput | document_invitationsUpdateWithWhereUniqueWithoutUsers_document_invitations_user_idTousersInput[]
    updateMany?: document_invitationsUpdateManyWithWhereWithoutUsers_document_invitations_user_idTousersInput | document_invitationsUpdateManyWithWhereWithoutUsers_document_invitations_user_idTousersInput[]
    deleteMany?: document_invitationsScalarWhereInput | document_invitationsScalarWhereInput[]
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

  export type document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput = {
    create?: XOR<document_invitationsCreateWithoutUsers_document_invitations_invited_byTousersInput, document_invitationsUncheckedCreateWithoutUsers_document_invitations_invited_byTousersInput> | document_invitationsCreateWithoutUsers_document_invitations_invited_byTousersInput[] | document_invitationsUncheckedCreateWithoutUsers_document_invitations_invited_byTousersInput[]
    connectOrCreate?: document_invitationsCreateOrConnectWithoutUsers_document_invitations_invited_byTousersInput | document_invitationsCreateOrConnectWithoutUsers_document_invitations_invited_byTousersInput[]
    upsert?: document_invitationsUpsertWithWhereUniqueWithoutUsers_document_invitations_invited_byTousersInput | document_invitationsUpsertWithWhereUniqueWithoutUsers_document_invitations_invited_byTousersInput[]
    createMany?: document_invitationsCreateManyUsers_document_invitations_invited_byTousersInputEnvelope
    set?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    disconnect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    delete?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    connect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    update?: document_invitationsUpdateWithWhereUniqueWithoutUsers_document_invitations_invited_byTousersInput | document_invitationsUpdateWithWhereUniqueWithoutUsers_document_invitations_invited_byTousersInput[]
    updateMany?: document_invitationsUpdateManyWithWhereWithoutUsers_document_invitations_invited_byTousersInput | document_invitationsUpdateManyWithWhereWithoutUsers_document_invitations_invited_byTousersInput[]
    deleteMany?: document_invitationsScalarWhereInput | document_invitationsScalarWhereInput[]
  }

  export type document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput = {
    create?: XOR<document_invitationsCreateWithoutUsers_document_invitations_user_idTousersInput, document_invitationsUncheckedCreateWithoutUsers_document_invitations_user_idTousersInput> | document_invitationsCreateWithoutUsers_document_invitations_user_idTousersInput[] | document_invitationsUncheckedCreateWithoutUsers_document_invitations_user_idTousersInput[]
    connectOrCreate?: document_invitationsCreateOrConnectWithoutUsers_document_invitations_user_idTousersInput | document_invitationsCreateOrConnectWithoutUsers_document_invitations_user_idTousersInput[]
    upsert?: document_invitationsUpsertWithWhereUniqueWithoutUsers_document_invitations_user_idTousersInput | document_invitationsUpsertWithWhereUniqueWithoutUsers_document_invitations_user_idTousersInput[]
    createMany?: document_invitationsCreateManyUsers_document_invitations_user_idTousersInputEnvelope
    set?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    disconnect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    delete?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    connect?: document_invitationsWhereUniqueInput | document_invitationsWhereUniqueInput[]
    update?: document_invitationsUpdateWithWhereUniqueWithoutUsers_document_invitations_user_idTousersInput | document_invitationsUpdateWithWhereUniqueWithoutUsers_document_invitations_user_idTousersInput[]
    updateMany?: document_invitationsUpdateManyWithWhereWithoutUsers_document_invitations_user_idTousersInput | document_invitationsUpdateManyWithWhereWithoutUsers_document_invitations_user_idTousersInput[]
    deleteMany?: document_invitationsScalarWhereInput | document_invitationsScalarWhereInput[]
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
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
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    auto_save_interval?: number | null
    document_invitations?: document_invitationsCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateWithoutCallsInput = {
    id?: number
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_modified_by?: number | null
    auto_save_interval?: number | null
    document_invitations?: document_invitationsUncheckedCreateNestedManyWithoutDocumentsInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
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
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    document_invitations?: document_invitationsUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutCallsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    document_invitations?: document_invitationsUncheckedUpdateManyWithoutDocumentsNestedInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
  }

  export type documentsCreateWithoutDocument_invitationsInput = {
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    auto_save_interval?: number | null
    calls?: callsCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateWithoutDocument_invitationsInput = {
    id?: number
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_modified_by?: number | null
    auto_save_interval?: number | null
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutDocumentsInput
    other_documents?: documentsUncheckedCreateNestedManyWithoutDocumentsInput
  }

  export type documentsCreateOrConnectWithoutDocument_invitationsInput = {
    where: documentsWhereUniqueInput
    create: XOR<documentsCreateWithoutDocument_invitationsInput, documentsUncheckedCreateWithoutDocument_invitationsInput>
  }

  export type usersCreateWithoutDocument_invitations_document_invitations_invited_byTousersInput = {
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
    document_invitations_document_invitations_user_idTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
  }

  export type usersUncheckedCreateWithoutDocument_invitations_document_invitations_invited_byTousersInput = {
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
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
  }

  export type usersCreateOrConnectWithoutDocument_invitations_document_invitations_invited_byTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutDocument_invitations_document_invitations_invited_byTousersInput, usersUncheckedCreateWithoutDocument_invitations_document_invitations_invited_byTousersInput>
  }

  export type usersCreateWithoutDocument_invitations_document_invitations_user_idTousersInput = {
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
  }

  export type usersUncheckedCreateWithoutDocument_invitations_document_invitations_user_idTousersInput = {
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
  }

  export type usersCreateOrConnectWithoutDocument_invitations_document_invitations_user_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutDocument_invitations_document_invitations_user_idTousersInput, usersUncheckedCreateWithoutDocument_invitations_document_invitations_user_idTousersInput>
  }

  export type documentsUpsertWithoutDocument_invitationsInput = {
    update: XOR<documentsUpdateWithoutDocument_invitationsInput, documentsUncheckedUpdateWithoutDocument_invitationsInput>
    create: XOR<documentsCreateWithoutDocument_invitationsInput, documentsUncheckedCreateWithoutDocument_invitationsInput>
    where?: documentsWhereInput
  }

  export type documentsUpdateToOneWithWhereWithoutDocument_invitationsInput = {
    where?: documentsWhereInput
    data: XOR<documentsUpdateWithoutDocument_invitationsInput, documentsUncheckedUpdateWithoutDocument_invitationsInput>
  }

  export type documentsUpdateWithoutDocument_invitationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutDocument_invitationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutDocumentsNestedInput
    other_documents?: documentsUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type usersUpsertWithoutDocument_invitations_document_invitations_invited_byTousersInput = {
    update: XOR<usersUpdateWithoutDocument_invitations_document_invitations_invited_byTousersInput, usersUncheckedUpdateWithoutDocument_invitations_document_invitations_invited_byTousersInput>
    create: XOR<usersCreateWithoutDocument_invitations_document_invitations_invited_byTousersInput, usersUncheckedCreateWithoutDocument_invitations_document_invitations_invited_byTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutDocument_invitations_document_invitations_invited_byTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutDocument_invitations_document_invitations_invited_byTousersInput, usersUncheckedUpdateWithoutDocument_invitations_document_invitations_invited_byTousersInput>
  }

  export type usersUpdateWithoutDocument_invitations_document_invitations_invited_byTousersInput = {
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
    document_invitations_document_invitations_user_idTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutDocument_invitations_document_invitations_invited_byTousersInput = {
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
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
  }

  export type usersUpsertWithoutDocument_invitations_document_invitations_user_idTousersInput = {
    update: XOR<usersUpdateWithoutDocument_invitations_document_invitations_user_idTousersInput, usersUncheckedUpdateWithoutDocument_invitations_document_invitations_user_idTousersInput>
    create: XOR<usersCreateWithoutDocument_invitations_document_invitations_user_idTousersInput, usersUncheckedCreateWithoutDocument_invitations_document_invitations_user_idTousersInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutDocument_invitations_document_invitations_user_idTousersInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutDocument_invitations_document_invitations_user_idTousersInput, usersUncheckedUpdateWithoutDocument_invitations_document_invitations_user_idTousersInput>
  }

  export type usersUpdateWithoutDocument_invitations_document_invitations_user_idTousersInput = {
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
  }

  export type usersUncheckedUpdateWithoutDocument_invitations_document_invitations_user_idTousersInput = {
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
  }

  export type documentsCreateWithoutDocument_versionsInput = {
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    auto_save_interval?: number | null
    calls?: callsCreateNestedManyWithoutDocumentsInput
    document_invitations?: document_invitationsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateWithoutDocument_versionsInput = {
    id?: number
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_modified_by?: number | null
    auto_save_interval?: number | null
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    document_invitations?: document_invitationsUncheckedCreateNestedManyWithoutDocumentsInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
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
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    document_invitations?: document_invitationsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutDocument_versionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_invitations?: document_invitationsUncheckedUpdateManyWithoutDocumentsNestedInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
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

  export type document_invitationsCreateWithoutDocumentsInput = {
    permission_level: string
    invitation_date?: Date | string | null
    accepted_date?: Date | string | null
    is_active?: boolean | null
    users_document_invitations_invited_byTousers?: usersCreateNestedOneWithoutDocument_invitations_document_invitations_invited_byTousersInput
    users_document_invitations_user_idTousers: usersCreateNestedOneWithoutDocument_invitations_document_invitations_user_idTousersInput
  }

  export type document_invitationsUncheckedCreateWithoutDocumentsInput = {
    id?: number
    user_id: number
    permission_level: string
    invited_by?: number | null
    invitation_date?: Date | string | null
    accepted_date?: Date | string | null
    is_active?: boolean | null
  }

  export type document_invitationsCreateOrConnectWithoutDocumentsInput = {
    where: document_invitationsWhereUniqueInput
    create: XOR<document_invitationsCreateWithoutDocumentsInput, document_invitationsUncheckedCreateWithoutDocumentsInput>
  }

  export type document_invitationsCreateManyDocumentsInputEnvelope = {
    data: document_invitationsCreateManyDocumentsInput | document_invitationsCreateManyDocumentsInput[]
    skipDuplicates?: boolean
  }

  export type document_versionsCreateWithoutDocumentsInput = {
    version_number: number
    content?: string | null
    modification_date?: Date | string | null
    change_summary?: string | null
    users: usersCreateNestedOneWithoutDocument_versionsInput
  }

  export type document_versionsUncheckedCreateWithoutDocumentsInput = {
    id?: number
    version_number: number
    content?: string | null
    modified_by: number
    modification_date?: Date | string | null
    change_summary?: string | null
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_owner_idTousers?: documentsCreateNestedManyWithoutUsers_documents_owner_idTousersInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_owner_idTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_owner_idTousersInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    document_versions?: document_versionsCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_invited_byTousersInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedCreateNestedManyWithoutUsers_document_invitations_user_idTousersInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutUsersInput
    documents_documents_last_modified_byTousers?: documentsUncheckedCreateNestedManyWithoutUsers_documents_last_modified_byTousersInput
  }

  export type usersCreateOrConnectWithoutDocuments_documents_owner_idTousersInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutDocuments_documents_owner_idTousersInput, usersUncheckedCreateWithoutDocuments_documents_owner_idTousersInput>
  }

  export type documentsCreateWithoutOther_documentsInput = {
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    auto_save_interval?: number | null
    calls?: callsCreateNestedManyWithoutDocumentsInput
    document_invitations?: document_invitationsCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
  }

  export type documentsUncheckedCreateWithoutOther_documentsInput = {
    id?: number
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_modified_by?: number | null
    auto_save_interval?: number | null
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    document_invitations?: document_invitationsUncheckedCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsUncheckedCreateNestedManyWithoutDocumentsInput
  }

  export type documentsCreateOrConnectWithoutOther_documentsInput = {
    where: documentsWhereUniqueInput
    create: XOR<documentsCreateWithoutOther_documentsInput, documentsUncheckedCreateWithoutOther_documentsInput>
  }

  export type documentsCreateWithoutDocumentsInput = {
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    auto_save_interval?: number | null
    calls?: callsCreateNestedManyWithoutDocumentsInput
    document_invitations?: document_invitationsCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateWithoutDocumentsInput = {
    id?: number
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    owner_id: number
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_modified_by?: number | null
    auto_save_interval?: number | null
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    document_invitations?: document_invitationsUncheckedCreateNestedManyWithoutDocumentsInput
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

  export type document_invitationsUpsertWithWhereUniqueWithoutDocumentsInput = {
    where: document_invitationsWhereUniqueInput
    update: XOR<document_invitationsUpdateWithoutDocumentsInput, document_invitationsUncheckedUpdateWithoutDocumentsInput>
    create: XOR<document_invitationsCreateWithoutDocumentsInput, document_invitationsUncheckedCreateWithoutDocumentsInput>
  }

  export type document_invitationsUpdateWithWhereUniqueWithoutDocumentsInput = {
    where: document_invitationsWhereUniqueInput
    data: XOR<document_invitationsUpdateWithoutDocumentsInput, document_invitationsUncheckedUpdateWithoutDocumentsInput>
  }

  export type document_invitationsUpdateManyWithWhereWithoutDocumentsInput = {
    where: document_invitationsScalarWhereInput
    data: XOR<document_invitationsUpdateManyMutationInput, document_invitationsUncheckedUpdateManyWithoutDocumentsInput>
  }

  export type document_invitationsScalarWhereInput = {
    AND?: document_invitationsScalarWhereInput | document_invitationsScalarWhereInput[]
    OR?: document_invitationsScalarWhereInput[]
    NOT?: document_invitationsScalarWhereInput | document_invitationsScalarWhereInput[]
    id?: IntFilter<"document_invitations"> | number
    document_id?: IntFilter<"document_invitations"> | number
    user_id?: IntFilter<"document_invitations"> | number
    permission_level?: StringFilter<"document_invitations"> | string
    invited_by?: IntNullableFilter<"document_invitations"> | number | null
    invitation_date?: DateTimeNullableFilter<"document_invitations"> | Date | string | null
    accepted_date?: DateTimeNullableFilter<"document_invitations"> | Date | string | null
    is_active?: BoolNullableFilter<"document_invitations"> | boolean | null
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
    content?: StringNullableFilter<"document_versions"> | string | null
    modified_by?: IntFilter<"document_versions"> | number
    modification_date?: DateTimeNullableFilter<"document_versions"> | Date | string | null
    change_summary?: StringNullableFilter<"document_versions"> | string | null
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_owner_idTousers?: documentsUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_owner_idTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersNestedInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    document_versions?: document_versionsUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
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
    document_invitations_document_invitations_invited_byTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_invited_byTousersNestedInput
    document_invitations_document_invitations_user_idTousers?: document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_user_idTousersNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutUsersNestedInput
    documents_documents_last_modified_byTousers?: documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersNestedInput
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
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    document_invitations?: document_invitationsUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutOther_documentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_invitations?: document_invitationsUncheckedUpdateManyWithoutDocumentsNestedInput
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
    content?: StringNullableFilter<"documents"> | string | null
    file_path?: StringNullableFilter<"documents"> | string | null
    file_type?: StringNullableFilter<"documents"> | string | null
    file_size?: BigIntNullableFilter<"documents"> | bigint | number | null
    owner_id?: IntFilter<"documents"> | number
    parent_folder_id?: IntNullableFilter<"documents"> | number | null
    is_folder?: BoolNullableFilter<"documents"> | boolean | null
    is_deleted?: BoolNullableFilter<"documents"> | boolean | null
    created_at?: DateTimeNullableFilter<"documents"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"documents"> | Date | string | null
    last_modified_by?: IntNullableFilter<"documents"> | number | null
    auto_save_interval?: IntNullableFilter<"documents"> | number | null
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

  export type document_invitationsCreateWithoutUsers_document_invitations_invited_byTousersInput = {
    permission_level: string
    invitation_date?: Date | string | null
    accepted_date?: Date | string | null
    is_active?: boolean | null
    documents: documentsCreateNestedOneWithoutDocument_invitationsInput
    users_document_invitations_user_idTousers: usersCreateNestedOneWithoutDocument_invitations_document_invitations_user_idTousersInput
  }

  export type document_invitationsUncheckedCreateWithoutUsers_document_invitations_invited_byTousersInput = {
    id?: number
    document_id: number
    user_id: number
    permission_level: string
    invitation_date?: Date | string | null
    accepted_date?: Date | string | null
    is_active?: boolean | null
  }

  export type document_invitationsCreateOrConnectWithoutUsers_document_invitations_invited_byTousersInput = {
    where: document_invitationsWhereUniqueInput
    create: XOR<document_invitationsCreateWithoutUsers_document_invitations_invited_byTousersInput, document_invitationsUncheckedCreateWithoutUsers_document_invitations_invited_byTousersInput>
  }

  export type document_invitationsCreateManyUsers_document_invitations_invited_byTousersInputEnvelope = {
    data: document_invitationsCreateManyUsers_document_invitations_invited_byTousersInput | document_invitationsCreateManyUsers_document_invitations_invited_byTousersInput[]
    skipDuplicates?: boolean
  }

  export type document_invitationsCreateWithoutUsers_document_invitations_user_idTousersInput = {
    permission_level: string
    invitation_date?: Date | string | null
    accepted_date?: Date | string | null
    is_active?: boolean | null
    documents: documentsCreateNestedOneWithoutDocument_invitationsInput
    users_document_invitations_invited_byTousers?: usersCreateNestedOneWithoutDocument_invitations_document_invitations_invited_byTousersInput
  }

  export type document_invitationsUncheckedCreateWithoutUsers_document_invitations_user_idTousersInput = {
    id?: number
    document_id: number
    permission_level: string
    invited_by?: number | null
    invitation_date?: Date | string | null
    accepted_date?: Date | string | null
    is_active?: boolean | null
  }

  export type document_invitationsCreateOrConnectWithoutUsers_document_invitations_user_idTousersInput = {
    where: document_invitationsWhereUniqueInput
    create: XOR<document_invitationsCreateWithoutUsers_document_invitations_user_idTousersInput, document_invitationsUncheckedCreateWithoutUsers_document_invitations_user_idTousersInput>
  }

  export type document_invitationsCreateManyUsers_document_invitations_user_idTousersInputEnvelope = {
    data: document_invitationsCreateManyUsers_document_invitations_user_idTousersInput | document_invitationsCreateManyUsers_document_invitations_user_idTousersInput[]
    skipDuplicates?: boolean
  }

  export type document_versionsCreateWithoutUsersInput = {
    version_number: number
    content?: string | null
    modification_date?: Date | string | null
    change_summary?: string | null
    documents: documentsCreateNestedOneWithoutDocument_versionsInput
  }

  export type document_versionsUncheckedCreateWithoutUsersInput = {
    id?: number
    document_id: number
    version_number: number
    content?: string | null
    modification_date?: Date | string | null
    change_summary?: string | null
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
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    auto_save_interval?: number | null
    calls?: callsCreateNestedManyWithoutDocumentsInput
    document_invitations?: document_invitationsCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_owner_idTousers: usersCreateNestedOneWithoutDocuments_documents_owner_idTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateWithoutUsers_documents_last_modified_byTousersInput = {
    id?: number
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    auto_save_interval?: number | null
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    document_invitations?: document_invitationsUncheckedCreateNestedManyWithoutDocumentsInput
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
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    auto_save_interval?: number | null
    calls?: callsCreateNestedManyWithoutDocumentsInput
    document_invitations?: document_invitationsCreateNestedManyWithoutDocumentsInput
    document_versions?: document_versionsCreateNestedManyWithoutDocumentsInput
    users_documents_last_modified_byTousers?: usersCreateNestedOneWithoutDocuments_documents_last_modified_byTousersInput
    documents?: documentsCreateNestedOneWithoutOther_documentsInput
    other_documents?: documentsCreateNestedManyWithoutDocumentsInput
  }

  export type documentsUncheckedCreateWithoutUsers_documents_owner_idTousersInput = {
    id?: number
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    parent_folder_id?: number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_modified_by?: number | null
    auto_save_interval?: number | null
    calls?: callsUncheckedCreateNestedManyWithoutDocumentsInput
    document_invitations?: document_invitationsUncheckedCreateNestedManyWithoutDocumentsInput
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

  export type document_invitationsUpsertWithWhereUniqueWithoutUsers_document_invitations_invited_byTousersInput = {
    where: document_invitationsWhereUniqueInput
    update: XOR<document_invitationsUpdateWithoutUsers_document_invitations_invited_byTousersInput, document_invitationsUncheckedUpdateWithoutUsers_document_invitations_invited_byTousersInput>
    create: XOR<document_invitationsCreateWithoutUsers_document_invitations_invited_byTousersInput, document_invitationsUncheckedCreateWithoutUsers_document_invitations_invited_byTousersInput>
  }

  export type document_invitationsUpdateWithWhereUniqueWithoutUsers_document_invitations_invited_byTousersInput = {
    where: document_invitationsWhereUniqueInput
    data: XOR<document_invitationsUpdateWithoutUsers_document_invitations_invited_byTousersInput, document_invitationsUncheckedUpdateWithoutUsers_document_invitations_invited_byTousersInput>
  }

  export type document_invitationsUpdateManyWithWhereWithoutUsers_document_invitations_invited_byTousersInput = {
    where: document_invitationsScalarWhereInput
    data: XOR<document_invitationsUpdateManyMutationInput, document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_invited_byTousersInput>
  }

  export type document_invitationsUpsertWithWhereUniqueWithoutUsers_document_invitations_user_idTousersInput = {
    where: document_invitationsWhereUniqueInput
    update: XOR<document_invitationsUpdateWithoutUsers_document_invitations_user_idTousersInput, document_invitationsUncheckedUpdateWithoutUsers_document_invitations_user_idTousersInput>
    create: XOR<document_invitationsCreateWithoutUsers_document_invitations_user_idTousersInput, document_invitationsUncheckedCreateWithoutUsers_document_invitations_user_idTousersInput>
  }

  export type document_invitationsUpdateWithWhereUniqueWithoutUsers_document_invitations_user_idTousersInput = {
    where: document_invitationsWhereUniqueInput
    data: XOR<document_invitationsUpdateWithoutUsers_document_invitations_user_idTousersInput, document_invitationsUncheckedUpdateWithoutUsers_document_invitations_user_idTousersInput>
  }

  export type document_invitationsUpdateManyWithWhereWithoutUsers_document_invitations_user_idTousersInput = {
    where: document_invitationsScalarWhereInput
    data: XOR<document_invitationsUpdateManyMutationInput, document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_user_idTousersInput>
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

  export type document_invitationsCreateManyDocumentsInput = {
    id?: number
    user_id: number
    permission_level: string
    invited_by?: number | null
    invitation_date?: Date | string | null
    accepted_date?: Date | string | null
    is_active?: boolean | null
  }

  export type document_versionsCreateManyDocumentsInput = {
    id?: number
    version_number: number
    content?: string | null
    modified_by: number
    modification_date?: Date | string | null
    change_summary?: string | null
  }

  export type documentsCreateManyDocumentsInput = {
    id?: number
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    owner_id: number
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_modified_by?: number | null
    auto_save_interval?: number | null
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

  export type document_invitationsUpdateWithoutDocumentsInput = {
    permission_level?: StringFieldUpdateOperationsInput | string
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    users_document_invitations_invited_byTousers?: usersUpdateOneWithoutDocument_invitations_document_invitations_invited_byTousersNestedInput
    users_document_invitations_user_idTousers?: usersUpdateOneRequiredWithoutDocument_invitations_document_invitations_user_idTousersNestedInput
  }

  export type document_invitationsUncheckedUpdateWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    permission_level?: StringFieldUpdateOperationsInput | string
    invited_by?: NullableIntFieldUpdateOperationsInput | number | null
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type document_invitationsUncheckedUpdateManyWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    permission_level?: StringFieldUpdateOperationsInput | string
    invited_by?: NullableIntFieldUpdateOperationsInput | number | null
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type document_versionsUpdateWithoutDocumentsInput = {
    version_number?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    modification_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    users?: usersUpdateOneRequiredWithoutDocument_versionsNestedInput
  }

  export type document_versionsUncheckedUpdateWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    version_number?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    modified_by?: IntFieldUpdateOperationsInput | number
    modification_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type document_versionsUncheckedUpdateManyWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    version_number?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    modified_by?: IntFieldUpdateOperationsInput | number
    modification_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type documentsUpdateWithoutDocumentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    document_invitations?: document_invitationsUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    owner_id?: IntFieldUpdateOperationsInput | number
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_invitations?: document_invitationsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutDocumentsNestedInput
    other_documents?: documentsUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateManyWithoutDocumentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    owner_id?: IntFieldUpdateOperationsInput | number
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
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

  export type document_invitationsCreateManyUsers_document_invitations_invited_byTousersInput = {
    id?: number
    document_id: number
    user_id: number
    permission_level: string
    invitation_date?: Date | string | null
    accepted_date?: Date | string | null
    is_active?: boolean | null
  }

  export type document_invitationsCreateManyUsers_document_invitations_user_idTousersInput = {
    id?: number
    document_id: number
    permission_level: string
    invited_by?: number | null
    invitation_date?: Date | string | null
    accepted_date?: Date | string | null
    is_active?: boolean | null
  }

  export type document_versionsCreateManyUsersInput = {
    id?: number
    document_id: number
    version_number: number
    content?: string | null
    modification_date?: Date | string | null
    change_summary?: string | null
  }

  export type documentsCreateManyUsers_documents_last_modified_byTousersInput = {
    id?: number
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    owner_id: number
    parent_folder_id?: number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    auto_save_interval?: number | null
  }

  export type documentsCreateManyUsers_documents_owner_idTousersInput = {
    id?: number
    title: string
    content?: string | null
    file_path?: string | null
    file_type?: string | null
    file_size?: bigint | number | null
    parent_folder_id?: number | null
    is_folder?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    last_modified_by?: number | null
    auto_save_interval?: number | null
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

  export type document_invitationsUpdateWithoutUsers_document_invitations_invited_byTousersInput = {
    permission_level?: StringFieldUpdateOperationsInput | string
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    documents?: documentsUpdateOneRequiredWithoutDocument_invitationsNestedInput
    users_document_invitations_user_idTousers?: usersUpdateOneRequiredWithoutDocument_invitations_document_invitations_user_idTousersNestedInput
  }

  export type document_invitationsUncheckedUpdateWithoutUsers_document_invitations_invited_byTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    permission_level?: StringFieldUpdateOperationsInput | string
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_invited_byTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    permission_level?: StringFieldUpdateOperationsInput | string
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type document_invitationsUpdateWithoutUsers_document_invitations_user_idTousersInput = {
    permission_level?: StringFieldUpdateOperationsInput | string
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
    documents?: documentsUpdateOneRequiredWithoutDocument_invitationsNestedInput
    users_document_invitations_invited_byTousers?: usersUpdateOneWithoutDocument_invitations_document_invitations_invited_byTousersNestedInput
  }

  export type document_invitationsUncheckedUpdateWithoutUsers_document_invitations_user_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    permission_level?: StringFieldUpdateOperationsInput | string
    invited_by?: NullableIntFieldUpdateOperationsInput | number | null
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type document_invitationsUncheckedUpdateManyWithoutUsers_document_invitations_user_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    permission_level?: StringFieldUpdateOperationsInput | string
    invited_by?: NullableIntFieldUpdateOperationsInput | number | null
    invitation_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accepted_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type document_versionsUpdateWithoutUsersInput = {
    version_number?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    modification_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: documentsUpdateOneRequiredWithoutDocument_versionsNestedInput
  }

  export type document_versionsUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    version_number?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    modification_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type document_versionsUncheckedUpdateManyWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    document_id?: IntFieldUpdateOperationsInput | number
    version_number?: IntFieldUpdateOperationsInput | number
    content?: NullableStringFieldUpdateOperationsInput | string | null
    modification_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    change_summary?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type documentsUpdateWithoutUsers_documents_last_modified_byTousersInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    document_invitations?: document_invitationsUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_owner_idTousers?: usersUpdateOneRequiredWithoutDocuments_documents_owner_idTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutUsers_documents_last_modified_byTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_invitations?: document_invitationsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutDocumentsNestedInput
    other_documents?: documentsUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateManyWithoutUsers_documents_last_modified_byTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    owner_id?: IntFieldUpdateOperationsInput | number
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type documentsUpdateWithoutUsers_documents_owner_idTousersInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUpdateManyWithoutDocumentsNestedInput
    document_invitations?: document_invitationsUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUpdateManyWithoutDocumentsNestedInput
    users_documents_last_modified_byTousers?: usersUpdateOneWithoutDocuments_documents_last_modified_byTousersNestedInput
    documents?: documentsUpdateOneWithoutOther_documentsNestedInput
    other_documents?: documentsUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateWithoutUsers_documents_owner_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
    calls?: callsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_invitations?: document_invitationsUncheckedUpdateManyWithoutDocumentsNestedInput
    document_versions?: document_versionsUncheckedUpdateManyWithoutDocumentsNestedInput
    other_documents?: documentsUncheckedUpdateManyWithoutDocumentsNestedInput
  }

  export type documentsUncheckedUpdateManyWithoutUsers_documents_owner_idTousersInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    file_path?: NullableStringFieldUpdateOperationsInput | string | null
    file_type?: NullableStringFieldUpdateOperationsInput | string | null
    file_size?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    parent_folder_id?: NullableIntFieldUpdateOperationsInput | number | null
    is_folder?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_deleted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    last_modified_by?: NullableIntFieldUpdateOperationsInput | number | null
    auto_save_interval?: NullableIntFieldUpdateOperationsInput | number | null
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