
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Shop
 * 
 */
export type Shop = $Result.DefaultSelection<Prisma.$ShopPayload>
/**
 * Model DSR
 * 
 */
export type DSR = $Result.DefaultSelection<Prisma.$DSRPayload>
/**
 * Model Assignment
 * 
 */
export type Assignment = $Result.DefaultSelection<Prisma.$AssignmentPayload>
/**
 * Model TransferRecord
 * 
 */
export type TransferRecord = $Result.DefaultSelection<Prisma.$TransferRecordPayload>
/**
 * Model SalesRecord
 * 
 */
export type SalesRecord = $Result.DefaultSelection<Prisma.$SalesRecordPayload>
/**
 * Model PublicHoliday
 * 
 */
export type PublicHoliday = $Result.DefaultSelection<Prisma.$PublicHolidayPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EmploymentStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  ON_LEAVE: 'ON_LEAVE',
  TERMINATED: 'TERMINATED'
};

export type EmploymentStatus = (typeof EmploymentStatus)[keyof typeof EmploymentStatus]


export const EducationLevel: {
  HIGH_SCHOOL: 'HIGH_SCHOOL',
  DIPLOMA: 'DIPLOMA',
  BACHELOR: 'BACHELOR',
  MASTER: 'MASTER',
  PHD: 'PHD',
  OTHER: 'OTHER'
};

export type EducationLevel = (typeof EducationLevel)[keyof typeof EducationLevel]


export const AssignmentStatus: {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  TERMINATED: 'TERMINATED'
};

export type AssignmentStatus = (typeof AssignmentStatus)[keyof typeof AssignmentStatus]


export const TransferReason: {
  PERFORMANCE_IMPROVEMENT: 'PERFORMANCE_IMPROVEMENT',
  SHOP_NEEDS: 'SHOP_NEEDS',
  AGENT_REQUEST: 'AGENT_REQUEST',
  DISCIPLINARY: 'DISCIPLINARY',
  RESTRUCTURING: 'RESTRUCTURING',
  OTHER: 'OTHER'
};

export type TransferReason = (typeof TransferReason)[keyof typeof TransferReason]


export const DataSource: {
  GOOGLE_FORMS: 'GOOGLE_FORMS',
  MICROSOFT_FORMS: 'MICROSOFT_FORMS',
  MANUAL_ENTRY: 'MANUAL_ENTRY',
  API: 'API'
};

export type DataSource = (typeof DataSource)[keyof typeof DataSource]

}

export type EmploymentStatus = $Enums.EmploymentStatus

export const EmploymentStatus: typeof $Enums.EmploymentStatus

export type EducationLevel = $Enums.EducationLevel

export const EducationLevel: typeof $Enums.EducationLevel

export type AssignmentStatus = $Enums.AssignmentStatus

export const AssignmentStatus: typeof $Enums.AssignmentStatus

export type TransferReason = $Enums.TransferReason

export const TransferReason: typeof $Enums.TransferReason

export type DataSource = $Enums.DataSource

export const DataSource: typeof $Enums.DataSource

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shop`: Exposes CRUD operations for the **Shop** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shops
    * const shops = await prisma.shop.findMany()
    * ```
    */
  get shop(): Prisma.ShopDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dSR`: Exposes CRUD operations for the **DSR** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DSRS
    * const dSRS = await prisma.dSR.findMany()
    * ```
    */
  get dSR(): Prisma.DSRDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assignment`: Exposes CRUD operations for the **Assignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assignments
    * const assignments = await prisma.assignment.findMany()
    * ```
    */
  get assignment(): Prisma.AssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transferRecord`: Exposes CRUD operations for the **TransferRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TransferRecords
    * const transferRecords = await prisma.transferRecord.findMany()
    * ```
    */
  get transferRecord(): Prisma.TransferRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.salesRecord`: Exposes CRUD operations for the **SalesRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SalesRecords
    * const salesRecords = await prisma.salesRecord.findMany()
    * ```
    */
  get salesRecord(): Prisma.SalesRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.publicHoliday`: Exposes CRUD operations for the **PublicHoliday** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PublicHolidays
    * const publicHolidays = await prisma.publicHoliday.findMany()
    * ```
    */
  get publicHoliday(): Prisma.PublicHolidayDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    User: 'User',
    Shop: 'Shop',
    DSR: 'DSR',
    Assignment: 'Assignment',
    TransferRecord: 'TransferRecord',
    SalesRecord: 'SalesRecord',
    PublicHoliday: 'PublicHoliday'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "shop" | "dSR" | "assignment" | "transferRecord" | "salesRecord" | "publicHoliday"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Shop: {
        payload: Prisma.$ShopPayload<ExtArgs>
        fields: Prisma.ShopFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShopFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShopFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          findFirst: {
            args: Prisma.ShopFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShopFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          findMany: {
            args: Prisma.ShopFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>[]
          }
          create: {
            args: Prisma.ShopCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          createMany: {
            args: Prisma.ShopCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShopCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>[]
          }
          delete: {
            args: Prisma.ShopDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          update: {
            args: Prisma.ShopUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          deleteMany: {
            args: Prisma.ShopDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShopUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShopUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>[]
          }
          upsert: {
            args: Prisma.ShopUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShopPayload>
          }
          aggregate: {
            args: Prisma.ShopAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShop>
          }
          groupBy: {
            args: Prisma.ShopGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShopGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShopCountArgs<ExtArgs>
            result: $Utils.Optional<ShopCountAggregateOutputType> | number
          }
        }
      }
      DSR: {
        payload: Prisma.$DSRPayload<ExtArgs>
        fields: Prisma.DSRFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DSRFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DSRPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DSRFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DSRPayload>
          }
          findFirst: {
            args: Prisma.DSRFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DSRPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DSRFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DSRPayload>
          }
          findMany: {
            args: Prisma.DSRFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DSRPayload>[]
          }
          create: {
            args: Prisma.DSRCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DSRPayload>
          }
          createMany: {
            args: Prisma.DSRCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DSRCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DSRPayload>[]
          }
          delete: {
            args: Prisma.DSRDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DSRPayload>
          }
          update: {
            args: Prisma.DSRUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DSRPayload>
          }
          deleteMany: {
            args: Prisma.DSRDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DSRUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DSRUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DSRPayload>[]
          }
          upsert: {
            args: Prisma.DSRUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DSRPayload>
          }
          aggregate: {
            args: Prisma.DSRAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDSR>
          }
          groupBy: {
            args: Prisma.DSRGroupByArgs<ExtArgs>
            result: $Utils.Optional<DSRGroupByOutputType>[]
          }
          count: {
            args: Prisma.DSRCountArgs<ExtArgs>
            result: $Utils.Optional<DSRCountAggregateOutputType> | number
          }
        }
      }
      Assignment: {
        payload: Prisma.$AssignmentPayload<ExtArgs>
        fields: Prisma.AssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          findFirst: {
            args: Prisma.AssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          findMany: {
            args: Prisma.AssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>[]
          }
          create: {
            args: Prisma.AssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          createMany: {
            args: Prisma.AssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>[]
          }
          delete: {
            args: Prisma.AssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          update: {
            args: Prisma.AssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          deleteMany: {
            args: Prisma.AssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>[]
          }
          upsert: {
            args: Prisma.AssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          aggregate: {
            args: Prisma.AssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssignment>
          }
          groupBy: {
            args: Prisma.AssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<AssignmentCountAggregateOutputType> | number
          }
        }
      }
      TransferRecord: {
        payload: Prisma.$TransferRecordPayload<ExtArgs>
        fields: Prisma.TransferRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransferRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransferRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferRecordPayload>
          }
          findFirst: {
            args: Prisma.TransferRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransferRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferRecordPayload>
          }
          findMany: {
            args: Prisma.TransferRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferRecordPayload>[]
          }
          create: {
            args: Prisma.TransferRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferRecordPayload>
          }
          createMany: {
            args: Prisma.TransferRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransferRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferRecordPayload>[]
          }
          delete: {
            args: Prisma.TransferRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferRecordPayload>
          }
          update: {
            args: Prisma.TransferRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferRecordPayload>
          }
          deleteMany: {
            args: Prisma.TransferRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransferRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransferRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferRecordPayload>[]
          }
          upsert: {
            args: Prisma.TransferRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransferRecordPayload>
          }
          aggregate: {
            args: Prisma.TransferRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransferRecord>
          }
          groupBy: {
            args: Prisma.TransferRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransferRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransferRecordCountArgs<ExtArgs>
            result: $Utils.Optional<TransferRecordCountAggregateOutputType> | number
          }
        }
      }
      SalesRecord: {
        payload: Prisma.$SalesRecordPayload<ExtArgs>
        fields: Prisma.SalesRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SalesRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SalesRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesRecordPayload>
          }
          findFirst: {
            args: Prisma.SalesRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SalesRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesRecordPayload>
          }
          findMany: {
            args: Prisma.SalesRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesRecordPayload>[]
          }
          create: {
            args: Prisma.SalesRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesRecordPayload>
          }
          createMany: {
            args: Prisma.SalesRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SalesRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesRecordPayload>[]
          }
          delete: {
            args: Prisma.SalesRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesRecordPayload>
          }
          update: {
            args: Prisma.SalesRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesRecordPayload>
          }
          deleteMany: {
            args: Prisma.SalesRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SalesRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SalesRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesRecordPayload>[]
          }
          upsert: {
            args: Prisma.SalesRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalesRecordPayload>
          }
          aggregate: {
            args: Prisma.SalesRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSalesRecord>
          }
          groupBy: {
            args: Prisma.SalesRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<SalesRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.SalesRecordCountArgs<ExtArgs>
            result: $Utils.Optional<SalesRecordCountAggregateOutputType> | number
          }
        }
      }
      PublicHoliday: {
        payload: Prisma.$PublicHolidayPayload<ExtArgs>
        fields: Prisma.PublicHolidayFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PublicHolidayFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicHolidayPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PublicHolidayFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicHolidayPayload>
          }
          findFirst: {
            args: Prisma.PublicHolidayFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicHolidayPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PublicHolidayFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicHolidayPayload>
          }
          findMany: {
            args: Prisma.PublicHolidayFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicHolidayPayload>[]
          }
          create: {
            args: Prisma.PublicHolidayCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicHolidayPayload>
          }
          createMany: {
            args: Prisma.PublicHolidayCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PublicHolidayCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicHolidayPayload>[]
          }
          delete: {
            args: Prisma.PublicHolidayDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicHolidayPayload>
          }
          update: {
            args: Prisma.PublicHolidayUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicHolidayPayload>
          }
          deleteMany: {
            args: Prisma.PublicHolidayDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PublicHolidayUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PublicHolidayUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicHolidayPayload>[]
          }
          upsert: {
            args: Prisma.PublicHolidayUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicHolidayPayload>
          }
          aggregate: {
            args: Prisma.PublicHolidayAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePublicHoliday>
          }
          groupBy: {
            args: Prisma.PublicHolidayGroupByArgs<ExtArgs>
            result: $Utils.Optional<PublicHolidayGroupByOutputType>[]
          }
          count: {
            args: Prisma.PublicHolidayCountArgs<ExtArgs>
            result: $Utils.Optional<PublicHolidayCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    shop?: ShopOmit
    dSR?: DSROmit
    assignment?: AssignmentOmit
    transferRecord?: TransferRecordOmit
    salesRecord?: SalesRecordOmit
    publicHoliday?: PublicHolidayOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    verifiedSalesRecords: number
    approvedTransfers: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verifiedSalesRecords?: boolean | UserCountOutputTypeCountVerifiedSalesRecordsArgs
    approvedTransfers?: boolean | UserCountOutputTypeCountApprovedTransfersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVerifiedSalesRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalesRecordWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApprovedTransfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferRecordWhereInput
  }


  /**
   * Count Type ShopCountOutputType
   */

  export type ShopCountOutputType = {
    assignments: number
    salesRecords: number
    transfersFrom: number
    transfersTo: number
  }

  export type ShopCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | ShopCountOutputTypeCountAssignmentsArgs
    salesRecords?: boolean | ShopCountOutputTypeCountSalesRecordsArgs
    transfersFrom?: boolean | ShopCountOutputTypeCountTransfersFromArgs
    transfersTo?: boolean | ShopCountOutputTypeCountTransfersToArgs
  }

  // Custom InputTypes
  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShopCountOutputType
     */
    select?: ShopCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentWhereInput
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountSalesRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalesRecordWhereInput
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountTransfersFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferRecordWhereInput
  }

  /**
   * ShopCountOutputType without action
   */
  export type ShopCountOutputTypeCountTransfersToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferRecordWhereInput
  }


  /**
   * Count Type DSRCountOutputType
   */

  export type DSRCountOutputType = {
    assignments: number
    salesRecords: number
    transfers: number
  }

  export type DSRCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | DSRCountOutputTypeCountAssignmentsArgs
    salesRecords?: boolean | DSRCountOutputTypeCountSalesRecordsArgs
    transfers?: boolean | DSRCountOutputTypeCountTransfersArgs
  }

  // Custom InputTypes
  /**
   * DSRCountOutputType without action
   */
  export type DSRCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSRCountOutputType
     */
    select?: DSRCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DSRCountOutputType without action
   */
  export type DSRCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentWhereInput
  }

  /**
   * DSRCountOutputType without action
   */
  export type DSRCountOutputTypeCountSalesRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalesRecordWhereInput
  }

  /**
   * DSRCountOutputType without action
   */
  export type DSRCountOutputTypeCountTransfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferRecordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    fullName: string | null
    hashedPassword: string | null
    isActive: boolean | null
    isSuperuser: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    fullName: string | null
    hashedPassword: string | null
    isActive: boolean | null
    isSuperuser: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    fullName: number
    hashedPassword: number
    isActive: number
    isSuperuser: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    hashedPassword?: true
    isActive?: true
    isSuperuser?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    hashedPassword?: true
    isActive?: true
    isSuperuser?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    hashedPassword?: true
    isActive?: true
    isSuperuser?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    fullName: string
    hashedPassword: string
    isActive: boolean
    isSuperuser: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    hashedPassword?: boolean
    isActive?: boolean
    isSuperuser?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    verifiedSalesRecords?: boolean | User$verifiedSalesRecordsArgs<ExtArgs>
    approvedTransfers?: boolean | User$approvedTransfersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    hashedPassword?: boolean
    isActive?: boolean
    isSuperuser?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    hashedPassword?: boolean
    isActive?: boolean
    isSuperuser?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    fullName?: boolean
    hashedPassword?: boolean
    isActive?: boolean
    isSuperuser?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "fullName" | "hashedPassword" | "isActive" | "isSuperuser" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    verifiedSalesRecords?: boolean | User$verifiedSalesRecordsArgs<ExtArgs>
    approvedTransfers?: boolean | User$approvedTransfersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      verifiedSalesRecords: Prisma.$SalesRecordPayload<ExtArgs>[]
      approvedTransfers: Prisma.$TransferRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      fullName: string
      hashedPassword: string
      isActive: boolean
      isSuperuser: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    verifiedSalesRecords<T extends User$verifiedSalesRecordsArgs<ExtArgs> = {}>(args?: Subset<T, User$verifiedSalesRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    approvedTransfers<T extends User$approvedTransfersArgs<ExtArgs> = {}>(args?: Subset<T, User$approvedTransfersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly hashedPassword: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly isSuperuser: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.verifiedSalesRecords
   */
  export type User$verifiedSalesRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
    where?: SalesRecordWhereInput
    orderBy?: SalesRecordOrderByWithRelationInput | SalesRecordOrderByWithRelationInput[]
    cursor?: SalesRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SalesRecordScalarFieldEnum | SalesRecordScalarFieldEnum[]
  }

  /**
   * User.approvedTransfers
   */
  export type User$approvedTransfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    where?: TransferRecordWhereInput
    orderBy?: TransferRecordOrderByWithRelationInput | TransferRecordOrderByWithRelationInput[]
    cursor?: TransferRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransferRecordScalarFieldEnum | TransferRecordScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Shop
   */

  export type AggregateShop = {
    _count: ShopCountAggregateOutputType | null
    _avg: ShopAvgAggregateOutputType | null
    _sum: ShopSumAggregateOutputType | null
    _min: ShopMinAggregateOutputType | null
    _max: ShopMaxAggregateOutputType | null
  }

  export type ShopAvgAggregateOutputType = {
    id: number | null
  }

  export type ShopSumAggregateOutputType = {
    id: number | null
  }

  export type ShopMinAggregateOutputType = {
    id: number | null
    name: string | null
    location: string | null
    region: string | null
    district: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ShopMaxAggregateOutputType = {
    id: number | null
    name: string | null
    location: string | null
    region: string | null
    district: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type ShopCountAggregateOutputType = {
    id: number
    name: number
    location: number
    region: number
    district: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type ShopAvgAggregateInputType = {
    id?: true
  }

  export type ShopSumAggregateInputType = {
    id?: true
  }

  export type ShopMinAggregateInputType = {
    id?: true
    name?: true
    location?: true
    region?: true
    district?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ShopMaxAggregateInputType = {
    id?: true
    name?: true
    location?: true
    region?: true
    district?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type ShopCountAggregateInputType = {
    id?: true
    name?: true
    location?: true
    region?: true
    district?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type ShopAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shop to aggregate.
     */
    where?: ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shops to fetch.
     */
    orderBy?: ShopOrderByWithRelationInput | ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shops
    **/
    _count?: true | ShopCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShopAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShopSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShopMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShopMaxAggregateInputType
  }

  export type GetShopAggregateType<T extends ShopAggregateArgs> = {
        [P in keyof T & keyof AggregateShop]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShop[P]>
      : GetScalarType<T[P], AggregateShop[P]>
  }




  export type ShopGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShopWhereInput
    orderBy?: ShopOrderByWithAggregationInput | ShopOrderByWithAggregationInput[]
    by: ShopScalarFieldEnum[] | ShopScalarFieldEnum
    having?: ShopScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShopCountAggregateInputType | true
    _avg?: ShopAvgAggregateInputType
    _sum?: ShopSumAggregateInputType
    _min?: ShopMinAggregateInputType
    _max?: ShopMaxAggregateInputType
  }

  export type ShopGroupByOutputType = {
    id: number
    name: string
    location: string
    region: string
    district: string | null
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: ShopCountAggregateOutputType | null
    _avg: ShopAvgAggregateOutputType | null
    _sum: ShopSumAggregateOutputType | null
    _min: ShopMinAggregateOutputType | null
    _max: ShopMaxAggregateOutputType | null
  }

  type GetShopGroupByPayload<T extends ShopGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShopGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShopGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShopGroupByOutputType[P]>
            : GetScalarType<T[P], ShopGroupByOutputType[P]>
        }
      >
    >


  export type ShopSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    region?: boolean
    district?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    assignments?: boolean | Shop$assignmentsArgs<ExtArgs>
    salesRecords?: boolean | Shop$salesRecordsArgs<ExtArgs>
    transfersFrom?: boolean | Shop$transfersFromArgs<ExtArgs>
    transfersTo?: boolean | Shop$transfersToArgs<ExtArgs>
    _count?: boolean | ShopCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shop"]>

  export type ShopSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    region?: boolean
    district?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["shop"]>

  export type ShopSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    location?: boolean
    region?: boolean
    district?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["shop"]>

  export type ShopSelectScalar = {
    id?: boolean
    name?: boolean
    location?: boolean
    region?: boolean
    district?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type ShopOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "location" | "region" | "district" | "description" | "isActive" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["shop"]>
  export type ShopInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | Shop$assignmentsArgs<ExtArgs>
    salesRecords?: boolean | Shop$salesRecordsArgs<ExtArgs>
    transfersFrom?: boolean | Shop$transfersFromArgs<ExtArgs>
    transfersTo?: boolean | Shop$transfersToArgs<ExtArgs>
    _count?: boolean | ShopCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ShopIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ShopIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ShopPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shop"
    objects: {
      assignments: Prisma.$AssignmentPayload<ExtArgs>[]
      salesRecords: Prisma.$SalesRecordPayload<ExtArgs>[]
      transfersFrom: Prisma.$TransferRecordPayload<ExtArgs>[]
      transfersTo: Prisma.$TransferRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      location: string
      region: string
      district: string | null
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["shop"]>
    composites: {}
  }

  type ShopGetPayload<S extends boolean | null | undefined | ShopDefaultArgs> = $Result.GetResult<Prisma.$ShopPayload, S>

  type ShopCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShopFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShopCountAggregateInputType | true
    }

  export interface ShopDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shop'], meta: { name: 'Shop' } }
    /**
     * Find zero or one Shop that matches the filter.
     * @param {ShopFindUniqueArgs} args - Arguments to find a Shop
     * @example
     * // Get one Shop
     * const shop = await prisma.shop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShopFindUniqueArgs>(args: SelectSubset<T, ShopFindUniqueArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShopFindUniqueOrThrowArgs} args - Arguments to find a Shop
     * @example
     * // Get one Shop
     * const shop = await prisma.shop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShopFindUniqueOrThrowArgs>(args: SelectSubset<T, ShopFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopFindFirstArgs} args - Arguments to find a Shop
     * @example
     * // Get one Shop
     * const shop = await prisma.shop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShopFindFirstArgs>(args?: SelectSubset<T, ShopFindFirstArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopFindFirstOrThrowArgs} args - Arguments to find a Shop
     * @example
     * // Get one Shop
     * const shop = await prisma.shop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShopFindFirstOrThrowArgs>(args?: SelectSubset<T, ShopFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shops
     * const shops = await prisma.shop.findMany()
     * 
     * // Get first 10 Shops
     * const shops = await prisma.shop.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shopWithIdOnly = await prisma.shop.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShopFindManyArgs>(args?: SelectSubset<T, ShopFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shop.
     * @param {ShopCreateArgs} args - Arguments to create a Shop.
     * @example
     * // Create one Shop
     * const Shop = await prisma.shop.create({
     *   data: {
     *     // ... data to create a Shop
     *   }
     * })
     * 
     */
    create<T extends ShopCreateArgs>(args: SelectSubset<T, ShopCreateArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shops.
     * @param {ShopCreateManyArgs} args - Arguments to create many Shops.
     * @example
     * // Create many Shops
     * const shop = await prisma.shop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShopCreateManyArgs>(args?: SelectSubset<T, ShopCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shops and returns the data saved in the database.
     * @param {ShopCreateManyAndReturnArgs} args - Arguments to create many Shops.
     * @example
     * // Create many Shops
     * const shop = await prisma.shop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shops and only return the `id`
     * const shopWithIdOnly = await prisma.shop.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShopCreateManyAndReturnArgs>(args?: SelectSubset<T, ShopCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Shop.
     * @param {ShopDeleteArgs} args - Arguments to delete one Shop.
     * @example
     * // Delete one Shop
     * const Shop = await prisma.shop.delete({
     *   where: {
     *     // ... filter to delete one Shop
     *   }
     * })
     * 
     */
    delete<T extends ShopDeleteArgs>(args: SelectSubset<T, ShopDeleteArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shop.
     * @param {ShopUpdateArgs} args - Arguments to update one Shop.
     * @example
     * // Update one Shop
     * const shop = await prisma.shop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShopUpdateArgs>(args: SelectSubset<T, ShopUpdateArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shops.
     * @param {ShopDeleteManyArgs} args - Arguments to filter Shops to delete.
     * @example
     * // Delete a few Shops
     * const { count } = await prisma.shop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShopDeleteManyArgs>(args?: SelectSubset<T, ShopDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shops
     * const shop = await prisma.shop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShopUpdateManyArgs>(args: SelectSubset<T, ShopUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shops and returns the data updated in the database.
     * @param {ShopUpdateManyAndReturnArgs} args - Arguments to update many Shops.
     * @example
     * // Update many Shops
     * const shop = await prisma.shop.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Shops and only return the `id`
     * const shopWithIdOnly = await prisma.shop.updateManyAndReturn({
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
    updateManyAndReturn<T extends ShopUpdateManyAndReturnArgs>(args: SelectSubset<T, ShopUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Shop.
     * @param {ShopUpsertArgs} args - Arguments to update or create a Shop.
     * @example
     * // Update or create a Shop
     * const shop = await prisma.shop.upsert({
     *   create: {
     *     // ... data to create a Shop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shop we want to update
     *   }
     * })
     */
    upsert<T extends ShopUpsertArgs>(args: SelectSubset<T, ShopUpsertArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopCountArgs} args - Arguments to filter Shops to count.
     * @example
     * // Count the number of Shops
     * const count = await prisma.shop.count({
     *   where: {
     *     // ... the filter for the Shops we want to count
     *   }
     * })
    **/
    count<T extends ShopCountArgs>(
      args?: Subset<T, ShopCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShopCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ShopAggregateArgs>(args: Subset<T, ShopAggregateArgs>): Prisma.PrismaPromise<GetShopAggregateType<T>>

    /**
     * Group by Shop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShopGroupByArgs} args - Group by arguments.
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
      T extends ShopGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShopGroupByArgs['orderBy'] }
        : { orderBy?: ShopGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ShopGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shop model
   */
  readonly fields: ShopFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shop.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShopClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignments<T extends Shop$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Shop$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    salesRecords<T extends Shop$salesRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Shop$salesRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfersFrom<T extends Shop$transfersFromArgs<ExtArgs> = {}>(args?: Subset<T, Shop$transfersFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfersTo<T extends Shop$transfersToArgs<ExtArgs> = {}>(args?: Subset<T, Shop$transfersToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Shop model
   */
  interface ShopFieldRefs {
    readonly id: FieldRef<"Shop", 'Int'>
    readonly name: FieldRef<"Shop", 'String'>
    readonly location: FieldRef<"Shop", 'String'>
    readonly region: FieldRef<"Shop", 'String'>
    readonly district: FieldRef<"Shop", 'String'>
    readonly description: FieldRef<"Shop", 'String'>
    readonly isActive: FieldRef<"Shop", 'Boolean'>
    readonly createdAt: FieldRef<"Shop", 'DateTime'>
    readonly updatedAt: FieldRef<"Shop", 'DateTime'>
    readonly deletedAt: FieldRef<"Shop", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Shop findUnique
   */
  export type ShopFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shop to fetch.
     */
    where: ShopWhereUniqueInput
  }

  /**
   * Shop findUniqueOrThrow
   */
  export type ShopFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shop to fetch.
     */
    where: ShopWhereUniqueInput
  }

  /**
   * Shop findFirst
   */
  export type ShopFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shop to fetch.
     */
    where?: ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shops to fetch.
     */
    orderBy?: ShopOrderByWithRelationInput | ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shops.
     */
    cursor?: ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shops.
     */
    distinct?: ShopScalarFieldEnum | ShopScalarFieldEnum[]
  }

  /**
   * Shop findFirstOrThrow
   */
  export type ShopFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shop to fetch.
     */
    where?: ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shops to fetch.
     */
    orderBy?: ShopOrderByWithRelationInput | ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shops.
     */
    cursor?: ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shops.
     */
    distinct?: ShopScalarFieldEnum | ShopScalarFieldEnum[]
  }

  /**
   * Shop findMany
   */
  export type ShopFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter, which Shops to fetch.
     */
    where?: ShopWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shops to fetch.
     */
    orderBy?: ShopOrderByWithRelationInput | ShopOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shops.
     */
    cursor?: ShopWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shops.
     */
    distinct?: ShopScalarFieldEnum | ShopScalarFieldEnum[]
  }

  /**
   * Shop create
   */
  export type ShopCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * The data needed to create a Shop.
     */
    data: XOR<ShopCreateInput, ShopUncheckedCreateInput>
  }

  /**
   * Shop createMany
   */
  export type ShopCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shops.
     */
    data: ShopCreateManyInput | ShopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shop createManyAndReturn
   */
  export type ShopCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * The data used to create many Shops.
     */
    data: ShopCreateManyInput | ShopCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Shop update
   */
  export type ShopUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * The data needed to update a Shop.
     */
    data: XOR<ShopUpdateInput, ShopUncheckedUpdateInput>
    /**
     * Choose, which Shop to update.
     */
    where: ShopWhereUniqueInput
  }

  /**
   * Shop updateMany
   */
  export type ShopUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shops.
     */
    data: XOR<ShopUpdateManyMutationInput, ShopUncheckedUpdateManyInput>
    /**
     * Filter which Shops to update
     */
    where?: ShopWhereInput
    /**
     * Limit how many Shops to update.
     */
    limit?: number
  }

  /**
   * Shop updateManyAndReturn
   */
  export type ShopUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * The data used to update Shops.
     */
    data: XOR<ShopUpdateManyMutationInput, ShopUncheckedUpdateManyInput>
    /**
     * Filter which Shops to update
     */
    where?: ShopWhereInput
    /**
     * Limit how many Shops to update.
     */
    limit?: number
  }

  /**
   * Shop upsert
   */
  export type ShopUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * The filter to search for the Shop to update in case it exists.
     */
    where: ShopWhereUniqueInput
    /**
     * In case the Shop found by the `where` argument doesn't exist, create a new Shop with this data.
     */
    create: XOR<ShopCreateInput, ShopUncheckedCreateInput>
    /**
     * In case the Shop was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShopUpdateInput, ShopUncheckedUpdateInput>
  }

  /**
   * Shop delete
   */
  export type ShopDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
    /**
     * Filter which Shop to delete.
     */
    where: ShopWhereUniqueInput
  }

  /**
   * Shop deleteMany
   */
  export type ShopDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shops to delete
     */
    where?: ShopWhereInput
    /**
     * Limit how many Shops to delete.
     */
    limit?: number
  }

  /**
   * Shop.assignments
   */
  export type Shop$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    where?: AssignmentWhereInput
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    cursor?: AssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Shop.salesRecords
   */
  export type Shop$salesRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
    where?: SalesRecordWhereInput
    orderBy?: SalesRecordOrderByWithRelationInput | SalesRecordOrderByWithRelationInput[]
    cursor?: SalesRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SalesRecordScalarFieldEnum | SalesRecordScalarFieldEnum[]
  }

  /**
   * Shop.transfersFrom
   */
  export type Shop$transfersFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    where?: TransferRecordWhereInput
    orderBy?: TransferRecordOrderByWithRelationInput | TransferRecordOrderByWithRelationInput[]
    cursor?: TransferRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransferRecordScalarFieldEnum | TransferRecordScalarFieldEnum[]
  }

  /**
   * Shop.transfersTo
   */
  export type Shop$transfersToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    where?: TransferRecordWhereInput
    orderBy?: TransferRecordOrderByWithRelationInput | TransferRecordOrderByWithRelationInput[]
    cursor?: TransferRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransferRecordScalarFieldEnum | TransferRecordScalarFieldEnum[]
  }

  /**
   * Shop without action
   */
  export type ShopDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shop
     */
    select?: ShopSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Shop
     */
    omit?: ShopOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShopInclude<ExtArgs> | null
  }


  /**
   * Model DSR
   */

  export type AggregateDSR = {
    _count: DSRCountAggregateOutputType | null
    _avg: DSRAvgAggregateOutputType | null
    _sum: DSRSumAggregateOutputType | null
    _min: DSRMinAggregateOutputType | null
    _max: DSRMaxAggregateOutputType | null
  }

  export type DSRAvgAggregateOutputType = {
    id: number | null
    educationYear: number | null
  }

  export type DSRSumAggregateOutputType = {
    id: number | null
    educationYear: number | null
  }

  export type DSRMinAggregateOutputType = {
    id: number | null
    accountNumber: string | null
    fullName: string | null
    email: string | null
    secondaryNumber: string | null
    dateOfBirth: Date | null
    gender: string | null
    address: string | null
    educationLevel: $Enums.EducationLevel | null
    educationInstitution: string | null
    educationYear: number | null
    employmentDate: Date | null
    employmentStatus: $Enums.EmploymentStatus | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type DSRMaxAggregateOutputType = {
    id: number | null
    accountNumber: string | null
    fullName: string | null
    email: string | null
    secondaryNumber: string | null
    dateOfBirth: Date | null
    gender: string | null
    address: string | null
    educationLevel: $Enums.EducationLevel | null
    educationInstitution: string | null
    educationYear: number | null
    employmentDate: Date | null
    employmentStatus: $Enums.EmploymentStatus | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
    deletedAt: Date | null
  }

  export type DSRCountAggregateOutputType = {
    id: number
    accountNumber: number
    fullName: number
    email: number
    secondaryNumber: number
    dateOfBirth: number
    gender: number
    address: number
    educationLevel: number
    educationInstitution: number
    educationYear: number
    employmentDate: number
    employmentStatus: number
    emergencyContactName: number
    emergencyContactPhone: number
    notes: number
    createdAt: number
    updatedAt: number
    deletedAt: number
    _all: number
  }


  export type DSRAvgAggregateInputType = {
    id?: true
    educationYear?: true
  }

  export type DSRSumAggregateInputType = {
    id?: true
    educationYear?: true
  }

  export type DSRMinAggregateInputType = {
    id?: true
    accountNumber?: true
    fullName?: true
    email?: true
    secondaryNumber?: true
    dateOfBirth?: true
    gender?: true
    address?: true
    educationLevel?: true
    educationInstitution?: true
    educationYear?: true
    employmentDate?: true
    employmentStatus?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type DSRMaxAggregateInputType = {
    id?: true
    accountNumber?: true
    fullName?: true
    email?: true
    secondaryNumber?: true
    dateOfBirth?: true
    gender?: true
    address?: true
    educationLevel?: true
    educationInstitution?: true
    educationYear?: true
    employmentDate?: true
    employmentStatus?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
  }

  export type DSRCountAggregateInputType = {
    id?: true
    accountNumber?: true
    fullName?: true
    email?: true
    secondaryNumber?: true
    dateOfBirth?: true
    gender?: true
    address?: true
    educationLevel?: true
    educationInstitution?: true
    educationYear?: true
    employmentDate?: true
    employmentStatus?: true
    emergencyContactName?: true
    emergencyContactPhone?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    deletedAt?: true
    _all?: true
  }

  export type DSRAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DSR to aggregate.
     */
    where?: DSRWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DSRS to fetch.
     */
    orderBy?: DSROrderByWithRelationInput | DSROrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DSRWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DSRS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DSRS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DSRS
    **/
    _count?: true | DSRCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DSRAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DSRSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DSRMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DSRMaxAggregateInputType
  }

  export type GetDSRAggregateType<T extends DSRAggregateArgs> = {
        [P in keyof T & keyof AggregateDSR]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDSR[P]>
      : GetScalarType<T[P], AggregateDSR[P]>
  }




  export type DSRGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DSRWhereInput
    orderBy?: DSROrderByWithAggregationInput | DSROrderByWithAggregationInput[]
    by: DSRScalarFieldEnum[] | DSRScalarFieldEnum
    having?: DSRScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DSRCountAggregateInputType | true
    _avg?: DSRAvgAggregateInputType
    _sum?: DSRSumAggregateInputType
    _min?: DSRMinAggregateInputType
    _max?: DSRMaxAggregateInputType
  }

  export type DSRGroupByOutputType = {
    id: number
    accountNumber: string
    fullName: string
    email: string | null
    secondaryNumber: string | null
    dateOfBirth: Date | null
    gender: string | null
    address: string | null
    educationLevel: $Enums.EducationLevel | null
    educationInstitution: string | null
    educationYear: number | null
    employmentDate: Date | null
    employmentStatus: $Enums.EmploymentStatus
    emergencyContactName: string | null
    emergencyContactPhone: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    _count: DSRCountAggregateOutputType | null
    _avg: DSRAvgAggregateOutputType | null
    _sum: DSRSumAggregateOutputType | null
    _min: DSRMinAggregateOutputType | null
    _max: DSRMaxAggregateOutputType | null
  }

  type GetDSRGroupByPayload<T extends DSRGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DSRGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DSRGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DSRGroupByOutputType[P]>
            : GetScalarType<T[P], DSRGroupByOutputType[P]>
        }
      >
    >


  export type DSRSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountNumber?: boolean
    fullName?: boolean
    email?: boolean
    secondaryNumber?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    address?: boolean
    educationLevel?: boolean
    educationInstitution?: boolean
    educationYear?: boolean
    employmentDate?: boolean
    employmentStatus?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
    assignments?: boolean | DSR$assignmentsArgs<ExtArgs>
    salesRecords?: boolean | DSR$salesRecordsArgs<ExtArgs>
    transfers?: boolean | DSR$transfersArgs<ExtArgs>
    _count?: boolean | DSRCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dSR"]>

  export type DSRSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountNumber?: boolean
    fullName?: boolean
    email?: boolean
    secondaryNumber?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    address?: boolean
    educationLevel?: boolean
    educationInstitution?: boolean
    educationYear?: boolean
    employmentDate?: boolean
    employmentStatus?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["dSR"]>

  export type DSRSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountNumber?: boolean
    fullName?: boolean
    email?: boolean
    secondaryNumber?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    address?: boolean
    educationLevel?: boolean
    educationInstitution?: boolean
    educationYear?: boolean
    employmentDate?: boolean
    employmentStatus?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["dSR"]>

  export type DSRSelectScalar = {
    id?: boolean
    accountNumber?: boolean
    fullName?: boolean
    email?: boolean
    secondaryNumber?: boolean
    dateOfBirth?: boolean
    gender?: boolean
    address?: boolean
    educationLevel?: boolean
    educationInstitution?: boolean
    educationYear?: boolean
    employmentDate?: boolean
    employmentStatus?: boolean
    emergencyContactName?: boolean
    emergencyContactPhone?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    deletedAt?: boolean
  }

  export type DSROmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountNumber" | "fullName" | "email" | "secondaryNumber" | "dateOfBirth" | "gender" | "address" | "educationLevel" | "educationInstitution" | "educationYear" | "employmentDate" | "employmentStatus" | "emergencyContactName" | "emergencyContactPhone" | "notes" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["dSR"]>
  export type DSRInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | DSR$assignmentsArgs<ExtArgs>
    salesRecords?: boolean | DSR$salesRecordsArgs<ExtArgs>
    transfers?: boolean | DSR$transfersArgs<ExtArgs>
    _count?: boolean | DSRCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DSRIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DSRIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DSRPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DSR"
    objects: {
      assignments: Prisma.$AssignmentPayload<ExtArgs>[]
      salesRecords: Prisma.$SalesRecordPayload<ExtArgs>[]
      transfers: Prisma.$TransferRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      accountNumber: string
      fullName: string
      email: string | null
      secondaryNumber: string | null
      dateOfBirth: Date | null
      gender: string | null
      address: string | null
      educationLevel: $Enums.EducationLevel | null
      educationInstitution: string | null
      educationYear: number | null
      employmentDate: Date | null
      employmentStatus: $Enums.EmploymentStatus
      emergencyContactName: string | null
      emergencyContactPhone: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
      deletedAt: Date | null
    }, ExtArgs["result"]["dSR"]>
    composites: {}
  }

  type DSRGetPayload<S extends boolean | null | undefined | DSRDefaultArgs> = $Result.GetResult<Prisma.$DSRPayload, S>

  type DSRCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DSRFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DSRCountAggregateInputType | true
    }

  export interface DSRDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DSR'], meta: { name: 'DSR' } }
    /**
     * Find zero or one DSR that matches the filter.
     * @param {DSRFindUniqueArgs} args - Arguments to find a DSR
     * @example
     * // Get one DSR
     * const dSR = await prisma.dSR.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DSRFindUniqueArgs>(args: SelectSubset<T, DSRFindUniqueArgs<ExtArgs>>): Prisma__DSRClient<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DSR that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DSRFindUniqueOrThrowArgs} args - Arguments to find a DSR
     * @example
     * // Get one DSR
     * const dSR = await prisma.dSR.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DSRFindUniqueOrThrowArgs>(args: SelectSubset<T, DSRFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DSRClient<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DSR that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DSRFindFirstArgs} args - Arguments to find a DSR
     * @example
     * // Get one DSR
     * const dSR = await prisma.dSR.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DSRFindFirstArgs>(args?: SelectSubset<T, DSRFindFirstArgs<ExtArgs>>): Prisma__DSRClient<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DSR that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DSRFindFirstOrThrowArgs} args - Arguments to find a DSR
     * @example
     * // Get one DSR
     * const dSR = await prisma.dSR.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DSRFindFirstOrThrowArgs>(args?: SelectSubset<T, DSRFindFirstOrThrowArgs<ExtArgs>>): Prisma__DSRClient<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DSRS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DSRFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DSRS
     * const dSRS = await prisma.dSR.findMany()
     * 
     * // Get first 10 DSRS
     * const dSRS = await prisma.dSR.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dSRWithIdOnly = await prisma.dSR.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DSRFindManyArgs>(args?: SelectSubset<T, DSRFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DSR.
     * @param {DSRCreateArgs} args - Arguments to create a DSR.
     * @example
     * // Create one DSR
     * const DSR = await prisma.dSR.create({
     *   data: {
     *     // ... data to create a DSR
     *   }
     * })
     * 
     */
    create<T extends DSRCreateArgs>(args: SelectSubset<T, DSRCreateArgs<ExtArgs>>): Prisma__DSRClient<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DSRS.
     * @param {DSRCreateManyArgs} args - Arguments to create many DSRS.
     * @example
     * // Create many DSRS
     * const dSR = await prisma.dSR.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DSRCreateManyArgs>(args?: SelectSubset<T, DSRCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DSRS and returns the data saved in the database.
     * @param {DSRCreateManyAndReturnArgs} args - Arguments to create many DSRS.
     * @example
     * // Create many DSRS
     * const dSR = await prisma.dSR.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DSRS and only return the `id`
     * const dSRWithIdOnly = await prisma.dSR.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DSRCreateManyAndReturnArgs>(args?: SelectSubset<T, DSRCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DSR.
     * @param {DSRDeleteArgs} args - Arguments to delete one DSR.
     * @example
     * // Delete one DSR
     * const DSR = await prisma.dSR.delete({
     *   where: {
     *     // ... filter to delete one DSR
     *   }
     * })
     * 
     */
    delete<T extends DSRDeleteArgs>(args: SelectSubset<T, DSRDeleteArgs<ExtArgs>>): Prisma__DSRClient<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DSR.
     * @param {DSRUpdateArgs} args - Arguments to update one DSR.
     * @example
     * // Update one DSR
     * const dSR = await prisma.dSR.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DSRUpdateArgs>(args: SelectSubset<T, DSRUpdateArgs<ExtArgs>>): Prisma__DSRClient<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DSRS.
     * @param {DSRDeleteManyArgs} args - Arguments to filter DSRS to delete.
     * @example
     * // Delete a few DSRS
     * const { count } = await prisma.dSR.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DSRDeleteManyArgs>(args?: SelectSubset<T, DSRDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DSRS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DSRUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DSRS
     * const dSR = await prisma.dSR.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DSRUpdateManyArgs>(args: SelectSubset<T, DSRUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DSRS and returns the data updated in the database.
     * @param {DSRUpdateManyAndReturnArgs} args - Arguments to update many DSRS.
     * @example
     * // Update many DSRS
     * const dSR = await prisma.dSR.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DSRS and only return the `id`
     * const dSRWithIdOnly = await prisma.dSR.updateManyAndReturn({
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
    updateManyAndReturn<T extends DSRUpdateManyAndReturnArgs>(args: SelectSubset<T, DSRUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DSR.
     * @param {DSRUpsertArgs} args - Arguments to update or create a DSR.
     * @example
     * // Update or create a DSR
     * const dSR = await prisma.dSR.upsert({
     *   create: {
     *     // ... data to create a DSR
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DSR we want to update
     *   }
     * })
     */
    upsert<T extends DSRUpsertArgs>(args: SelectSubset<T, DSRUpsertArgs<ExtArgs>>): Prisma__DSRClient<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DSRS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DSRCountArgs} args - Arguments to filter DSRS to count.
     * @example
     * // Count the number of DSRS
     * const count = await prisma.dSR.count({
     *   where: {
     *     // ... the filter for the DSRS we want to count
     *   }
     * })
    **/
    count<T extends DSRCountArgs>(
      args?: Subset<T, DSRCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DSRCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DSR.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DSRAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DSRAggregateArgs>(args: Subset<T, DSRAggregateArgs>): Prisma.PrismaPromise<GetDSRAggregateType<T>>

    /**
     * Group by DSR.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DSRGroupByArgs} args - Group by arguments.
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
      T extends DSRGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DSRGroupByArgs['orderBy'] }
        : { orderBy?: DSRGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DSRGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDSRGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DSR model
   */
  readonly fields: DSRFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DSR.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DSRClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignments<T extends DSR$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, DSR$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    salesRecords<T extends DSR$salesRecordsArgs<ExtArgs> = {}>(args?: Subset<T, DSR$salesRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transfers<T extends DSR$transfersArgs<ExtArgs> = {}>(args?: Subset<T, DSR$transfersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the DSR model
   */
  interface DSRFieldRefs {
    readonly id: FieldRef<"DSR", 'Int'>
    readonly accountNumber: FieldRef<"DSR", 'String'>
    readonly fullName: FieldRef<"DSR", 'String'>
    readonly email: FieldRef<"DSR", 'String'>
    readonly secondaryNumber: FieldRef<"DSR", 'String'>
    readonly dateOfBirth: FieldRef<"DSR", 'DateTime'>
    readonly gender: FieldRef<"DSR", 'String'>
    readonly address: FieldRef<"DSR", 'String'>
    readonly educationLevel: FieldRef<"DSR", 'EducationLevel'>
    readonly educationInstitution: FieldRef<"DSR", 'String'>
    readonly educationYear: FieldRef<"DSR", 'Int'>
    readonly employmentDate: FieldRef<"DSR", 'DateTime'>
    readonly employmentStatus: FieldRef<"DSR", 'EmploymentStatus'>
    readonly emergencyContactName: FieldRef<"DSR", 'String'>
    readonly emergencyContactPhone: FieldRef<"DSR", 'String'>
    readonly notes: FieldRef<"DSR", 'String'>
    readonly createdAt: FieldRef<"DSR", 'DateTime'>
    readonly updatedAt: FieldRef<"DSR", 'DateTime'>
    readonly deletedAt: FieldRef<"DSR", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DSR findUnique
   */
  export type DSRFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSR
     */
    select?: DSRSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DSR
     */
    omit?: DSROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DSRInclude<ExtArgs> | null
    /**
     * Filter, which DSR to fetch.
     */
    where: DSRWhereUniqueInput
  }

  /**
   * DSR findUniqueOrThrow
   */
  export type DSRFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSR
     */
    select?: DSRSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DSR
     */
    omit?: DSROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DSRInclude<ExtArgs> | null
    /**
     * Filter, which DSR to fetch.
     */
    where: DSRWhereUniqueInput
  }

  /**
   * DSR findFirst
   */
  export type DSRFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSR
     */
    select?: DSRSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DSR
     */
    omit?: DSROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DSRInclude<ExtArgs> | null
    /**
     * Filter, which DSR to fetch.
     */
    where?: DSRWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DSRS to fetch.
     */
    orderBy?: DSROrderByWithRelationInput | DSROrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DSRS.
     */
    cursor?: DSRWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DSRS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DSRS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DSRS.
     */
    distinct?: DSRScalarFieldEnum | DSRScalarFieldEnum[]
  }

  /**
   * DSR findFirstOrThrow
   */
  export type DSRFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSR
     */
    select?: DSRSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DSR
     */
    omit?: DSROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DSRInclude<ExtArgs> | null
    /**
     * Filter, which DSR to fetch.
     */
    where?: DSRWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DSRS to fetch.
     */
    orderBy?: DSROrderByWithRelationInput | DSROrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DSRS.
     */
    cursor?: DSRWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DSRS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DSRS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DSRS.
     */
    distinct?: DSRScalarFieldEnum | DSRScalarFieldEnum[]
  }

  /**
   * DSR findMany
   */
  export type DSRFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSR
     */
    select?: DSRSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DSR
     */
    omit?: DSROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DSRInclude<ExtArgs> | null
    /**
     * Filter, which DSRS to fetch.
     */
    where?: DSRWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DSRS to fetch.
     */
    orderBy?: DSROrderByWithRelationInput | DSROrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DSRS.
     */
    cursor?: DSRWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DSRS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DSRS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DSRS.
     */
    distinct?: DSRScalarFieldEnum | DSRScalarFieldEnum[]
  }

  /**
   * DSR create
   */
  export type DSRCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSR
     */
    select?: DSRSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DSR
     */
    omit?: DSROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DSRInclude<ExtArgs> | null
    /**
     * The data needed to create a DSR.
     */
    data: XOR<DSRCreateInput, DSRUncheckedCreateInput>
  }

  /**
   * DSR createMany
   */
  export type DSRCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DSRS.
     */
    data: DSRCreateManyInput | DSRCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DSR createManyAndReturn
   */
  export type DSRCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSR
     */
    select?: DSRSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DSR
     */
    omit?: DSROmit<ExtArgs> | null
    /**
     * The data used to create many DSRS.
     */
    data: DSRCreateManyInput | DSRCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DSR update
   */
  export type DSRUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSR
     */
    select?: DSRSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DSR
     */
    omit?: DSROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DSRInclude<ExtArgs> | null
    /**
     * The data needed to update a DSR.
     */
    data: XOR<DSRUpdateInput, DSRUncheckedUpdateInput>
    /**
     * Choose, which DSR to update.
     */
    where: DSRWhereUniqueInput
  }

  /**
   * DSR updateMany
   */
  export type DSRUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DSRS.
     */
    data: XOR<DSRUpdateManyMutationInput, DSRUncheckedUpdateManyInput>
    /**
     * Filter which DSRS to update
     */
    where?: DSRWhereInput
    /**
     * Limit how many DSRS to update.
     */
    limit?: number
  }

  /**
   * DSR updateManyAndReturn
   */
  export type DSRUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSR
     */
    select?: DSRSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DSR
     */
    omit?: DSROmit<ExtArgs> | null
    /**
     * The data used to update DSRS.
     */
    data: XOR<DSRUpdateManyMutationInput, DSRUncheckedUpdateManyInput>
    /**
     * Filter which DSRS to update
     */
    where?: DSRWhereInput
    /**
     * Limit how many DSRS to update.
     */
    limit?: number
  }

  /**
   * DSR upsert
   */
  export type DSRUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSR
     */
    select?: DSRSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DSR
     */
    omit?: DSROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DSRInclude<ExtArgs> | null
    /**
     * The filter to search for the DSR to update in case it exists.
     */
    where: DSRWhereUniqueInput
    /**
     * In case the DSR found by the `where` argument doesn't exist, create a new DSR with this data.
     */
    create: XOR<DSRCreateInput, DSRUncheckedCreateInput>
    /**
     * In case the DSR was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DSRUpdateInput, DSRUncheckedUpdateInput>
  }

  /**
   * DSR delete
   */
  export type DSRDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSR
     */
    select?: DSRSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DSR
     */
    omit?: DSROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DSRInclude<ExtArgs> | null
    /**
     * Filter which DSR to delete.
     */
    where: DSRWhereUniqueInput
  }

  /**
   * DSR deleteMany
   */
  export type DSRDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DSRS to delete
     */
    where?: DSRWhereInput
    /**
     * Limit how many DSRS to delete.
     */
    limit?: number
  }

  /**
   * DSR.assignments
   */
  export type DSR$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    where?: AssignmentWhereInput
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    cursor?: AssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * DSR.salesRecords
   */
  export type DSR$salesRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
    where?: SalesRecordWhereInput
    orderBy?: SalesRecordOrderByWithRelationInput | SalesRecordOrderByWithRelationInput[]
    cursor?: SalesRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SalesRecordScalarFieldEnum | SalesRecordScalarFieldEnum[]
  }

  /**
   * DSR.transfers
   */
  export type DSR$transfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    where?: TransferRecordWhereInput
    orderBy?: TransferRecordOrderByWithRelationInput | TransferRecordOrderByWithRelationInput[]
    cursor?: TransferRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransferRecordScalarFieldEnum | TransferRecordScalarFieldEnum[]
  }

  /**
   * DSR without action
   */
  export type DSRDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DSR
     */
    select?: DSRSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DSR
     */
    omit?: DSROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DSRInclude<ExtArgs> | null
  }


  /**
   * Model Assignment
   */

  export type AggregateAssignment = {
    _count: AssignmentCountAggregateOutputType | null
    _avg: AssignmentAvgAggregateOutputType | null
    _sum: AssignmentSumAggregateOutputType | null
    _min: AssignmentMinAggregateOutputType | null
    _max: AssignmentMaxAggregateOutputType | null
  }

  export type AssignmentAvgAggregateOutputType = {
    id: number | null
    dsrId: number | null
    shopId: number | null
  }

  export type AssignmentSumAggregateOutputType = {
    id: number | null
    dsrId: number | null
    shopId: number | null
  }

  export type AssignmentMinAggregateOutputType = {
    id: number | null
    dsrId: number | null
    shopId: number | null
    startDate: Date | null
    endDate: Date | null
    status: $Enums.AssignmentStatus | null
    teamName: string | null
    role: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssignmentMaxAggregateOutputType = {
    id: number | null
    dsrId: number | null
    shopId: number | null
    startDate: Date | null
    endDate: Date | null
    status: $Enums.AssignmentStatus | null
    teamName: string | null
    role: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AssignmentCountAggregateOutputType = {
    id: number
    dsrId: number
    shopId: number
    startDate: number
    endDate: number
    status: number
    teamName: number
    role: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AssignmentAvgAggregateInputType = {
    id?: true
    dsrId?: true
    shopId?: true
  }

  export type AssignmentSumAggregateInputType = {
    id?: true
    dsrId?: true
    shopId?: true
  }

  export type AssignmentMinAggregateInputType = {
    id?: true
    dsrId?: true
    shopId?: true
    startDate?: true
    endDate?: true
    status?: true
    teamName?: true
    role?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssignmentMaxAggregateInputType = {
    id?: true
    dsrId?: true
    shopId?: true
    startDate?: true
    endDate?: true
    status?: true
    teamName?: true
    role?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AssignmentCountAggregateInputType = {
    id?: true
    dsrId?: true
    shopId?: true
    startDate?: true
    endDate?: true
    status?: true
    teamName?: true
    role?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assignment to aggregate.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assignments
    **/
    _count?: true | AssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssignmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssignmentMaxAggregateInputType
  }

  export type GetAssignmentAggregateType<T extends AssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssignment[P]>
      : GetScalarType<T[P], AggregateAssignment[P]>
  }




  export type AssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentWhereInput
    orderBy?: AssignmentOrderByWithAggregationInput | AssignmentOrderByWithAggregationInput[]
    by: AssignmentScalarFieldEnum[] | AssignmentScalarFieldEnum
    having?: AssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssignmentCountAggregateInputType | true
    _avg?: AssignmentAvgAggregateInputType
    _sum?: AssignmentSumAggregateInputType
    _min?: AssignmentMinAggregateInputType
    _max?: AssignmentMaxAggregateInputType
  }

  export type AssignmentGroupByOutputType = {
    id: number
    dsrId: number
    shopId: number
    startDate: Date
    endDate: Date | null
    status: $Enums.AssignmentStatus
    teamName: string | null
    role: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: AssignmentCountAggregateOutputType | null
    _avg: AssignmentAvgAggregateOutputType | null
    _sum: AssignmentSumAggregateOutputType | null
    _min: AssignmentMinAggregateOutputType | null
    _max: AssignmentMaxAggregateOutputType | null
  }

  type GetAssignmentGroupByPayload<T extends AssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], AssignmentGroupByOutputType[P]>
        }
      >
    >


  export type AssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dsrId?: boolean
    shopId?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    teamName?: boolean
    role?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignment"]>

  export type AssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dsrId?: boolean
    shopId?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    teamName?: boolean
    role?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignment"]>

  export type AssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dsrId?: boolean
    shopId?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    teamName?: boolean
    role?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignment"]>

  export type AssignmentSelectScalar = {
    id?: boolean
    dsrId?: boolean
    shopId?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    teamName?: boolean
    role?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dsrId" | "shopId" | "startDate" | "endDate" | "status" | "teamName" | "role" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["assignment"]>
  export type AssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type AssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }
  export type AssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
  }

  export type $AssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assignment"
    objects: {
      dsr: Prisma.$DSRPayload<ExtArgs>
      shop: Prisma.$ShopPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      dsrId: number
      shopId: number
      startDate: Date
      endDate: Date | null
      status: $Enums.AssignmentStatus
      teamName: string | null
      role: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["assignment"]>
    composites: {}
  }

  type AssignmentGetPayload<S extends boolean | null | undefined | AssignmentDefaultArgs> = $Result.GetResult<Prisma.$AssignmentPayload, S>

  type AssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssignmentCountAggregateInputType | true
    }

  export interface AssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assignment'], meta: { name: 'Assignment' } }
    /**
     * Find zero or one Assignment that matches the filter.
     * @param {AssignmentFindUniqueArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssignmentFindUniqueArgs>(args: SelectSubset<T, AssignmentFindUniqueArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssignmentFindUniqueOrThrowArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentFindFirstArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssignmentFindFirstArgs>(args?: SelectSubset<T, AssignmentFindFirstArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentFindFirstOrThrowArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assignments
     * const assignments = await prisma.assignment.findMany()
     * 
     * // Get first 10 Assignments
     * const assignments = await prisma.assignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assignmentWithIdOnly = await prisma.assignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssignmentFindManyArgs>(args?: SelectSubset<T, AssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assignment.
     * @param {AssignmentCreateArgs} args - Arguments to create a Assignment.
     * @example
     * // Create one Assignment
     * const Assignment = await prisma.assignment.create({
     *   data: {
     *     // ... data to create a Assignment
     *   }
     * })
     * 
     */
    create<T extends AssignmentCreateArgs>(args: SelectSubset<T, AssignmentCreateArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assignments.
     * @param {AssignmentCreateManyArgs} args - Arguments to create many Assignments.
     * @example
     * // Create many Assignments
     * const assignment = await prisma.assignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssignmentCreateManyArgs>(args?: SelectSubset<T, AssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assignments and returns the data saved in the database.
     * @param {AssignmentCreateManyAndReturnArgs} args - Arguments to create many Assignments.
     * @example
     * // Create many Assignments
     * const assignment = await prisma.assignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assignments and only return the `id`
     * const assignmentWithIdOnly = await prisma.assignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Assignment.
     * @param {AssignmentDeleteArgs} args - Arguments to delete one Assignment.
     * @example
     * // Delete one Assignment
     * const Assignment = await prisma.assignment.delete({
     *   where: {
     *     // ... filter to delete one Assignment
     *   }
     * })
     * 
     */
    delete<T extends AssignmentDeleteArgs>(args: SelectSubset<T, AssignmentDeleteArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assignment.
     * @param {AssignmentUpdateArgs} args - Arguments to update one Assignment.
     * @example
     * // Update one Assignment
     * const assignment = await prisma.assignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssignmentUpdateArgs>(args: SelectSubset<T, AssignmentUpdateArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assignments.
     * @param {AssignmentDeleteManyArgs} args - Arguments to filter Assignments to delete.
     * @example
     * // Delete a few Assignments
     * const { count } = await prisma.assignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssignmentDeleteManyArgs>(args?: SelectSubset<T, AssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assignments
     * const assignment = await prisma.assignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssignmentUpdateManyArgs>(args: SelectSubset<T, AssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assignments and returns the data updated in the database.
     * @param {AssignmentUpdateManyAndReturnArgs} args - Arguments to update many Assignments.
     * @example
     * // Update many Assignments
     * const assignment = await prisma.assignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assignments and only return the `id`
     * const assignmentWithIdOnly = await prisma.assignment.updateManyAndReturn({
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
    updateManyAndReturn<T extends AssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Assignment.
     * @param {AssignmentUpsertArgs} args - Arguments to update or create a Assignment.
     * @example
     * // Update or create a Assignment
     * const assignment = await prisma.assignment.upsert({
     *   create: {
     *     // ... data to create a Assignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assignment we want to update
     *   }
     * })
     */
    upsert<T extends AssignmentUpsertArgs>(args: SelectSubset<T, AssignmentUpsertArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentCountArgs} args - Arguments to filter Assignments to count.
     * @example
     * // Count the number of Assignments
     * const count = await prisma.assignment.count({
     *   where: {
     *     // ... the filter for the Assignments we want to count
     *   }
     * })
    **/
    count<T extends AssignmentCountArgs>(
      args?: Subset<T, AssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssignmentAggregateArgs>(args: Subset<T, AssignmentAggregateArgs>): Prisma.PrismaPromise<GetAssignmentAggregateType<T>>

    /**
     * Group by Assignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentGroupByArgs} args - Group by arguments.
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
      T extends AssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssignmentGroupByArgs['orderBy'] }
        : { orderBy?: AssignmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assignment model
   */
  readonly fields: AssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dsr<T extends DSRDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DSRDefaultArgs<ExtArgs>>): Prisma__DSRClient<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Assignment model
   */
  interface AssignmentFieldRefs {
    readonly id: FieldRef<"Assignment", 'Int'>
    readonly dsrId: FieldRef<"Assignment", 'Int'>
    readonly shopId: FieldRef<"Assignment", 'Int'>
    readonly startDate: FieldRef<"Assignment", 'DateTime'>
    readonly endDate: FieldRef<"Assignment", 'DateTime'>
    readonly status: FieldRef<"Assignment", 'AssignmentStatus'>
    readonly teamName: FieldRef<"Assignment", 'String'>
    readonly role: FieldRef<"Assignment", 'String'>
    readonly notes: FieldRef<"Assignment", 'String'>
    readonly createdAt: FieldRef<"Assignment", 'DateTime'>
    readonly updatedAt: FieldRef<"Assignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Assignment findUnique
   */
  export type AssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment findUniqueOrThrow
   */
  export type AssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment findFirst
   */
  export type AssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assignments.
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assignments.
     */
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Assignment findFirstOrThrow
   */
  export type AssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assignments.
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assignments.
     */
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Assignment findMany
   */
  export type AssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignments to fetch.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assignments.
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assignments.
     */
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Assignment create
   */
  export type AssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Assignment.
     */
    data: XOR<AssignmentCreateInput, AssignmentUncheckedCreateInput>
  }

  /**
   * Assignment createMany
   */
  export type AssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assignments.
     */
    data: AssignmentCreateManyInput | AssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assignment createManyAndReturn
   */
  export type AssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many Assignments.
     */
    data: AssignmentCreateManyInput | AssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assignment update
   */
  export type AssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Assignment.
     */
    data: XOR<AssignmentUpdateInput, AssignmentUncheckedUpdateInput>
    /**
     * Choose, which Assignment to update.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment updateMany
   */
  export type AssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assignments.
     */
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyInput>
    /**
     * Filter which Assignments to update
     */
    where?: AssignmentWhereInput
    /**
     * Limit how many Assignments to update.
     */
    limit?: number
  }

  /**
   * Assignment updateManyAndReturn
   */
  export type AssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * The data used to update Assignments.
     */
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyInput>
    /**
     * Filter which Assignments to update
     */
    where?: AssignmentWhereInput
    /**
     * Limit how many Assignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assignment upsert
   */
  export type AssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Assignment to update in case it exists.
     */
    where: AssignmentWhereUniqueInput
    /**
     * In case the Assignment found by the `where` argument doesn't exist, create a new Assignment with this data.
     */
    create: XOR<AssignmentCreateInput, AssignmentUncheckedCreateInput>
    /**
     * In case the Assignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssignmentUpdateInput, AssignmentUncheckedUpdateInput>
  }

  /**
   * Assignment delete
   */
  export type AssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter which Assignment to delete.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment deleteMany
   */
  export type AssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assignments to delete
     */
    where?: AssignmentWhereInput
    /**
     * Limit how many Assignments to delete.
     */
    limit?: number
  }

  /**
   * Assignment without action
   */
  export type AssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
  }


  /**
   * Model TransferRecord
   */

  export type AggregateTransferRecord = {
    _count: TransferRecordCountAggregateOutputType | null
    _avg: TransferRecordAvgAggregateOutputType | null
    _sum: TransferRecordSumAggregateOutputType | null
    _min: TransferRecordMinAggregateOutputType | null
    _max: TransferRecordMaxAggregateOutputType | null
  }

  export type TransferRecordAvgAggregateOutputType = {
    id: number | null
    dsrId: number | null
    fromShopId: number | null
    toShopId: number | null
    approvedById: number | null
    effectivenessScore: number | null
  }

  export type TransferRecordSumAggregateOutputType = {
    id: number | null
    dsrId: number | null
    fromShopId: number | null
    toShopId: number | null
    approvedById: number | null
    effectivenessScore: number | null
  }

  export type TransferRecordMinAggregateOutputType = {
    id: number | null
    dsrId: number | null
    fromShopId: number | null
    toShopId: number | null
    transferDate: Date | null
    reason: $Enums.TransferReason | null
    reasonDetail: string | null
    approvedById: number | null
    effectivenessScore: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransferRecordMaxAggregateOutputType = {
    id: number | null
    dsrId: number | null
    fromShopId: number | null
    toShopId: number | null
    transferDate: Date | null
    reason: $Enums.TransferReason | null
    reasonDetail: string | null
    approvedById: number | null
    effectivenessScore: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransferRecordCountAggregateOutputType = {
    id: number
    dsrId: number
    fromShopId: number
    toShopId: number
    transferDate: number
    reason: number
    reasonDetail: number
    approvedById: number
    effectivenessScore: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransferRecordAvgAggregateInputType = {
    id?: true
    dsrId?: true
    fromShopId?: true
    toShopId?: true
    approvedById?: true
    effectivenessScore?: true
  }

  export type TransferRecordSumAggregateInputType = {
    id?: true
    dsrId?: true
    fromShopId?: true
    toShopId?: true
    approvedById?: true
    effectivenessScore?: true
  }

  export type TransferRecordMinAggregateInputType = {
    id?: true
    dsrId?: true
    fromShopId?: true
    toShopId?: true
    transferDate?: true
    reason?: true
    reasonDetail?: true
    approvedById?: true
    effectivenessScore?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransferRecordMaxAggregateInputType = {
    id?: true
    dsrId?: true
    fromShopId?: true
    toShopId?: true
    transferDate?: true
    reason?: true
    reasonDetail?: true
    approvedById?: true
    effectivenessScore?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransferRecordCountAggregateInputType = {
    id?: true
    dsrId?: true
    fromShopId?: true
    toShopId?: true
    transferDate?: true
    reason?: true
    reasonDetail?: true
    approvedById?: true
    effectivenessScore?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransferRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransferRecord to aggregate.
     */
    where?: TransferRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransferRecords to fetch.
     */
    orderBy?: TransferRecordOrderByWithRelationInput | TransferRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransferRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransferRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransferRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TransferRecords
    **/
    _count?: true | TransferRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransferRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransferRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransferRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransferRecordMaxAggregateInputType
  }

  export type GetTransferRecordAggregateType<T extends TransferRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateTransferRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransferRecord[P]>
      : GetScalarType<T[P], AggregateTransferRecord[P]>
  }




  export type TransferRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransferRecordWhereInput
    orderBy?: TransferRecordOrderByWithAggregationInput | TransferRecordOrderByWithAggregationInput[]
    by: TransferRecordScalarFieldEnum[] | TransferRecordScalarFieldEnum
    having?: TransferRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransferRecordCountAggregateInputType | true
    _avg?: TransferRecordAvgAggregateInputType
    _sum?: TransferRecordSumAggregateInputType
    _min?: TransferRecordMinAggregateInputType
    _max?: TransferRecordMaxAggregateInputType
  }

  export type TransferRecordGroupByOutputType = {
    id: number
    dsrId: number
    fromShopId: number
    toShopId: number
    transferDate: Date
    reason: $Enums.TransferReason
    reasonDetail: string | null
    approvedById: number | null
    effectivenessScore: number | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: TransferRecordCountAggregateOutputType | null
    _avg: TransferRecordAvgAggregateOutputType | null
    _sum: TransferRecordSumAggregateOutputType | null
    _min: TransferRecordMinAggregateOutputType | null
    _max: TransferRecordMaxAggregateOutputType | null
  }

  type GetTransferRecordGroupByPayload<T extends TransferRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransferRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransferRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransferRecordGroupByOutputType[P]>
            : GetScalarType<T[P], TransferRecordGroupByOutputType[P]>
        }
      >
    >


  export type TransferRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dsrId?: boolean
    fromShopId?: boolean
    toShopId?: boolean
    transferDate?: boolean
    reason?: boolean
    reasonDetail?: boolean
    approvedById?: boolean
    effectivenessScore?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    fromShop?: boolean | ShopDefaultArgs<ExtArgs>
    toShop?: boolean | ShopDefaultArgs<ExtArgs>
    approvedBy?: boolean | TransferRecord$approvedByArgs<ExtArgs>
  }, ExtArgs["result"]["transferRecord"]>

  export type TransferRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dsrId?: boolean
    fromShopId?: boolean
    toShopId?: boolean
    transferDate?: boolean
    reason?: boolean
    reasonDetail?: boolean
    approvedById?: boolean
    effectivenessScore?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    fromShop?: boolean | ShopDefaultArgs<ExtArgs>
    toShop?: boolean | ShopDefaultArgs<ExtArgs>
    approvedBy?: boolean | TransferRecord$approvedByArgs<ExtArgs>
  }, ExtArgs["result"]["transferRecord"]>

  export type TransferRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dsrId?: boolean
    fromShopId?: boolean
    toShopId?: boolean
    transferDate?: boolean
    reason?: boolean
    reasonDetail?: boolean
    approvedById?: boolean
    effectivenessScore?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    fromShop?: boolean | ShopDefaultArgs<ExtArgs>
    toShop?: boolean | ShopDefaultArgs<ExtArgs>
    approvedBy?: boolean | TransferRecord$approvedByArgs<ExtArgs>
  }, ExtArgs["result"]["transferRecord"]>

  export type TransferRecordSelectScalar = {
    id?: boolean
    dsrId?: boolean
    fromShopId?: boolean
    toShopId?: boolean
    transferDate?: boolean
    reason?: boolean
    reasonDetail?: boolean
    approvedById?: boolean
    effectivenessScore?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TransferRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dsrId" | "fromShopId" | "toShopId" | "transferDate" | "reason" | "reasonDetail" | "approvedById" | "effectivenessScore" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["transferRecord"]>
  export type TransferRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    fromShop?: boolean | ShopDefaultArgs<ExtArgs>
    toShop?: boolean | ShopDefaultArgs<ExtArgs>
    approvedBy?: boolean | TransferRecord$approvedByArgs<ExtArgs>
  }
  export type TransferRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    fromShop?: boolean | ShopDefaultArgs<ExtArgs>
    toShop?: boolean | ShopDefaultArgs<ExtArgs>
    approvedBy?: boolean | TransferRecord$approvedByArgs<ExtArgs>
  }
  export type TransferRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    fromShop?: boolean | ShopDefaultArgs<ExtArgs>
    toShop?: boolean | ShopDefaultArgs<ExtArgs>
    approvedBy?: boolean | TransferRecord$approvedByArgs<ExtArgs>
  }

  export type $TransferRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TransferRecord"
    objects: {
      dsr: Prisma.$DSRPayload<ExtArgs>
      fromShop: Prisma.$ShopPayload<ExtArgs>
      toShop: Prisma.$ShopPayload<ExtArgs>
      approvedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      dsrId: number
      fromShopId: number
      toShopId: number
      transferDate: Date
      reason: $Enums.TransferReason
      reasonDetail: string | null
      approvedById: number | null
      effectivenessScore: number | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transferRecord"]>
    composites: {}
  }

  type TransferRecordGetPayload<S extends boolean | null | undefined | TransferRecordDefaultArgs> = $Result.GetResult<Prisma.$TransferRecordPayload, S>

  type TransferRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransferRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransferRecordCountAggregateInputType | true
    }

  export interface TransferRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TransferRecord'], meta: { name: 'TransferRecord' } }
    /**
     * Find zero or one TransferRecord that matches the filter.
     * @param {TransferRecordFindUniqueArgs} args - Arguments to find a TransferRecord
     * @example
     * // Get one TransferRecord
     * const transferRecord = await prisma.transferRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransferRecordFindUniqueArgs>(args: SelectSubset<T, TransferRecordFindUniqueArgs<ExtArgs>>): Prisma__TransferRecordClient<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TransferRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransferRecordFindUniqueOrThrowArgs} args - Arguments to find a TransferRecord
     * @example
     * // Get one TransferRecord
     * const transferRecord = await prisma.transferRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransferRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, TransferRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransferRecordClient<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TransferRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferRecordFindFirstArgs} args - Arguments to find a TransferRecord
     * @example
     * // Get one TransferRecord
     * const transferRecord = await prisma.transferRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransferRecordFindFirstArgs>(args?: SelectSubset<T, TransferRecordFindFirstArgs<ExtArgs>>): Prisma__TransferRecordClient<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TransferRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferRecordFindFirstOrThrowArgs} args - Arguments to find a TransferRecord
     * @example
     * // Get one TransferRecord
     * const transferRecord = await prisma.transferRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransferRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, TransferRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransferRecordClient<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TransferRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TransferRecords
     * const transferRecords = await prisma.transferRecord.findMany()
     * 
     * // Get first 10 TransferRecords
     * const transferRecords = await prisma.transferRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transferRecordWithIdOnly = await prisma.transferRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransferRecordFindManyArgs>(args?: SelectSubset<T, TransferRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TransferRecord.
     * @param {TransferRecordCreateArgs} args - Arguments to create a TransferRecord.
     * @example
     * // Create one TransferRecord
     * const TransferRecord = await prisma.transferRecord.create({
     *   data: {
     *     // ... data to create a TransferRecord
     *   }
     * })
     * 
     */
    create<T extends TransferRecordCreateArgs>(args: SelectSubset<T, TransferRecordCreateArgs<ExtArgs>>): Prisma__TransferRecordClient<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TransferRecords.
     * @param {TransferRecordCreateManyArgs} args - Arguments to create many TransferRecords.
     * @example
     * // Create many TransferRecords
     * const transferRecord = await prisma.transferRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransferRecordCreateManyArgs>(args?: SelectSubset<T, TransferRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TransferRecords and returns the data saved in the database.
     * @param {TransferRecordCreateManyAndReturnArgs} args - Arguments to create many TransferRecords.
     * @example
     * // Create many TransferRecords
     * const transferRecord = await prisma.transferRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TransferRecords and only return the `id`
     * const transferRecordWithIdOnly = await prisma.transferRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransferRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, TransferRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TransferRecord.
     * @param {TransferRecordDeleteArgs} args - Arguments to delete one TransferRecord.
     * @example
     * // Delete one TransferRecord
     * const TransferRecord = await prisma.transferRecord.delete({
     *   where: {
     *     // ... filter to delete one TransferRecord
     *   }
     * })
     * 
     */
    delete<T extends TransferRecordDeleteArgs>(args: SelectSubset<T, TransferRecordDeleteArgs<ExtArgs>>): Prisma__TransferRecordClient<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TransferRecord.
     * @param {TransferRecordUpdateArgs} args - Arguments to update one TransferRecord.
     * @example
     * // Update one TransferRecord
     * const transferRecord = await prisma.transferRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransferRecordUpdateArgs>(args: SelectSubset<T, TransferRecordUpdateArgs<ExtArgs>>): Prisma__TransferRecordClient<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TransferRecords.
     * @param {TransferRecordDeleteManyArgs} args - Arguments to filter TransferRecords to delete.
     * @example
     * // Delete a few TransferRecords
     * const { count } = await prisma.transferRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransferRecordDeleteManyArgs>(args?: SelectSubset<T, TransferRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransferRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TransferRecords
     * const transferRecord = await prisma.transferRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransferRecordUpdateManyArgs>(args: SelectSubset<T, TransferRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TransferRecords and returns the data updated in the database.
     * @param {TransferRecordUpdateManyAndReturnArgs} args - Arguments to update many TransferRecords.
     * @example
     * // Update many TransferRecords
     * const transferRecord = await prisma.transferRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TransferRecords and only return the `id`
     * const transferRecordWithIdOnly = await prisma.transferRecord.updateManyAndReturn({
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
    updateManyAndReturn<T extends TransferRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, TransferRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TransferRecord.
     * @param {TransferRecordUpsertArgs} args - Arguments to update or create a TransferRecord.
     * @example
     * // Update or create a TransferRecord
     * const transferRecord = await prisma.transferRecord.upsert({
     *   create: {
     *     // ... data to create a TransferRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TransferRecord we want to update
     *   }
     * })
     */
    upsert<T extends TransferRecordUpsertArgs>(args: SelectSubset<T, TransferRecordUpsertArgs<ExtArgs>>): Prisma__TransferRecordClient<$Result.GetResult<Prisma.$TransferRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TransferRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferRecordCountArgs} args - Arguments to filter TransferRecords to count.
     * @example
     * // Count the number of TransferRecords
     * const count = await prisma.transferRecord.count({
     *   where: {
     *     // ... the filter for the TransferRecords we want to count
     *   }
     * })
    **/
    count<T extends TransferRecordCountArgs>(
      args?: Subset<T, TransferRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransferRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TransferRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransferRecordAggregateArgs>(args: Subset<T, TransferRecordAggregateArgs>): Prisma.PrismaPromise<GetTransferRecordAggregateType<T>>

    /**
     * Group by TransferRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransferRecordGroupByArgs} args - Group by arguments.
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
      T extends TransferRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransferRecordGroupByArgs['orderBy'] }
        : { orderBy?: TransferRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransferRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransferRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TransferRecord model
   */
  readonly fields: TransferRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TransferRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransferRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dsr<T extends DSRDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DSRDefaultArgs<ExtArgs>>): Prisma__DSRClient<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    fromShop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    toShop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    approvedBy<T extends TransferRecord$approvedByArgs<ExtArgs> = {}>(args?: Subset<T, TransferRecord$approvedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TransferRecord model
   */
  interface TransferRecordFieldRefs {
    readonly id: FieldRef<"TransferRecord", 'Int'>
    readonly dsrId: FieldRef<"TransferRecord", 'Int'>
    readonly fromShopId: FieldRef<"TransferRecord", 'Int'>
    readonly toShopId: FieldRef<"TransferRecord", 'Int'>
    readonly transferDate: FieldRef<"TransferRecord", 'DateTime'>
    readonly reason: FieldRef<"TransferRecord", 'TransferReason'>
    readonly reasonDetail: FieldRef<"TransferRecord", 'String'>
    readonly approvedById: FieldRef<"TransferRecord", 'Int'>
    readonly effectivenessScore: FieldRef<"TransferRecord", 'Int'>
    readonly notes: FieldRef<"TransferRecord", 'String'>
    readonly createdAt: FieldRef<"TransferRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"TransferRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TransferRecord findUnique
   */
  export type TransferRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    /**
     * Filter, which TransferRecord to fetch.
     */
    where: TransferRecordWhereUniqueInput
  }

  /**
   * TransferRecord findUniqueOrThrow
   */
  export type TransferRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    /**
     * Filter, which TransferRecord to fetch.
     */
    where: TransferRecordWhereUniqueInput
  }

  /**
   * TransferRecord findFirst
   */
  export type TransferRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    /**
     * Filter, which TransferRecord to fetch.
     */
    where?: TransferRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransferRecords to fetch.
     */
    orderBy?: TransferRecordOrderByWithRelationInput | TransferRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransferRecords.
     */
    cursor?: TransferRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransferRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransferRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransferRecords.
     */
    distinct?: TransferRecordScalarFieldEnum | TransferRecordScalarFieldEnum[]
  }

  /**
   * TransferRecord findFirstOrThrow
   */
  export type TransferRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    /**
     * Filter, which TransferRecord to fetch.
     */
    where?: TransferRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransferRecords to fetch.
     */
    orderBy?: TransferRecordOrderByWithRelationInput | TransferRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TransferRecords.
     */
    cursor?: TransferRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransferRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransferRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransferRecords.
     */
    distinct?: TransferRecordScalarFieldEnum | TransferRecordScalarFieldEnum[]
  }

  /**
   * TransferRecord findMany
   */
  export type TransferRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    /**
     * Filter, which TransferRecords to fetch.
     */
    where?: TransferRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TransferRecords to fetch.
     */
    orderBy?: TransferRecordOrderByWithRelationInput | TransferRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TransferRecords.
     */
    cursor?: TransferRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TransferRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TransferRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TransferRecords.
     */
    distinct?: TransferRecordScalarFieldEnum | TransferRecordScalarFieldEnum[]
  }

  /**
   * TransferRecord create
   */
  export type TransferRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a TransferRecord.
     */
    data: XOR<TransferRecordCreateInput, TransferRecordUncheckedCreateInput>
  }

  /**
   * TransferRecord createMany
   */
  export type TransferRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TransferRecords.
     */
    data: TransferRecordCreateManyInput | TransferRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TransferRecord createManyAndReturn
   */
  export type TransferRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * The data used to create many TransferRecords.
     */
    data: TransferRecordCreateManyInput | TransferRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TransferRecord update
   */
  export type TransferRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a TransferRecord.
     */
    data: XOR<TransferRecordUpdateInput, TransferRecordUncheckedUpdateInput>
    /**
     * Choose, which TransferRecord to update.
     */
    where: TransferRecordWhereUniqueInput
  }

  /**
   * TransferRecord updateMany
   */
  export type TransferRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TransferRecords.
     */
    data: XOR<TransferRecordUpdateManyMutationInput, TransferRecordUncheckedUpdateManyInput>
    /**
     * Filter which TransferRecords to update
     */
    where?: TransferRecordWhereInput
    /**
     * Limit how many TransferRecords to update.
     */
    limit?: number
  }

  /**
   * TransferRecord updateManyAndReturn
   */
  export type TransferRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * The data used to update TransferRecords.
     */
    data: XOR<TransferRecordUpdateManyMutationInput, TransferRecordUncheckedUpdateManyInput>
    /**
     * Filter which TransferRecords to update
     */
    where?: TransferRecordWhereInput
    /**
     * Limit how many TransferRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TransferRecord upsert
   */
  export type TransferRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the TransferRecord to update in case it exists.
     */
    where: TransferRecordWhereUniqueInput
    /**
     * In case the TransferRecord found by the `where` argument doesn't exist, create a new TransferRecord with this data.
     */
    create: XOR<TransferRecordCreateInput, TransferRecordUncheckedCreateInput>
    /**
     * In case the TransferRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransferRecordUpdateInput, TransferRecordUncheckedUpdateInput>
  }

  /**
   * TransferRecord delete
   */
  export type TransferRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
    /**
     * Filter which TransferRecord to delete.
     */
    where: TransferRecordWhereUniqueInput
  }

  /**
   * TransferRecord deleteMany
   */
  export type TransferRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TransferRecords to delete
     */
    where?: TransferRecordWhereInput
    /**
     * Limit how many TransferRecords to delete.
     */
    limit?: number
  }

  /**
   * TransferRecord.approvedBy
   */
  export type TransferRecord$approvedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TransferRecord without action
   */
  export type TransferRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransferRecord
     */
    select?: TransferRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TransferRecord
     */
    omit?: TransferRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransferRecordInclude<ExtArgs> | null
  }


  /**
   * Model SalesRecord
   */

  export type AggregateSalesRecord = {
    _count: SalesRecordCountAggregateOutputType | null
    _avg: SalesRecordAvgAggregateOutputType | null
    _sum: SalesRecordSumAggregateOutputType | null
    _min: SalesRecordMinAggregateOutputType | null
    _max: SalesRecordMaxAggregateOutputType | null
  }

  export type SalesRecordAvgAggregateOutputType = {
    id: number | null
    dsrId: number | null
    shopId: number | null
    devicesSold: number | null
    verifiedById: number | null
  }

  export type SalesRecordSumAggregateOutputType = {
    id: number | null
    dsrId: number | null
    shopId: number | null
    devicesSold: number | null
    verifiedById: number | null
  }

  export type SalesRecordMinAggregateOutputType = {
    id: number | null
    dsrId: number | null
    shopId: number | null
    saleDate: Date | null
    devicesSold: number | null
    remarks: string | null
    dataSource: $Enums.DataSource | null
    externalId: string | null
    verified: boolean | null
    verifiedById: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SalesRecordMaxAggregateOutputType = {
    id: number | null
    dsrId: number | null
    shopId: number | null
    saleDate: Date | null
    devicesSold: number | null
    remarks: string | null
    dataSource: $Enums.DataSource | null
    externalId: string | null
    verified: boolean | null
    verifiedById: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SalesRecordCountAggregateOutputType = {
    id: number
    dsrId: number
    shopId: number
    saleDate: number
    devicesSold: number
    remarks: number
    dataSource: number
    externalId: number
    verified: number
    verifiedById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SalesRecordAvgAggregateInputType = {
    id?: true
    dsrId?: true
    shopId?: true
    devicesSold?: true
    verifiedById?: true
  }

  export type SalesRecordSumAggregateInputType = {
    id?: true
    dsrId?: true
    shopId?: true
    devicesSold?: true
    verifiedById?: true
  }

  export type SalesRecordMinAggregateInputType = {
    id?: true
    dsrId?: true
    shopId?: true
    saleDate?: true
    devicesSold?: true
    remarks?: true
    dataSource?: true
    externalId?: true
    verified?: true
    verifiedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SalesRecordMaxAggregateInputType = {
    id?: true
    dsrId?: true
    shopId?: true
    saleDate?: true
    devicesSold?: true
    remarks?: true
    dataSource?: true
    externalId?: true
    verified?: true
    verifiedById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SalesRecordCountAggregateInputType = {
    id?: true
    dsrId?: true
    shopId?: true
    saleDate?: true
    devicesSold?: true
    remarks?: true
    dataSource?: true
    externalId?: true
    verified?: true
    verifiedById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SalesRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SalesRecord to aggregate.
     */
    where?: SalesRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalesRecords to fetch.
     */
    orderBy?: SalesRecordOrderByWithRelationInput | SalesRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SalesRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalesRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalesRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SalesRecords
    **/
    _count?: true | SalesRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SalesRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SalesRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SalesRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SalesRecordMaxAggregateInputType
  }

  export type GetSalesRecordAggregateType<T extends SalesRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateSalesRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSalesRecord[P]>
      : GetScalarType<T[P], AggregateSalesRecord[P]>
  }




  export type SalesRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalesRecordWhereInput
    orderBy?: SalesRecordOrderByWithAggregationInput | SalesRecordOrderByWithAggregationInput[]
    by: SalesRecordScalarFieldEnum[] | SalesRecordScalarFieldEnum
    having?: SalesRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SalesRecordCountAggregateInputType | true
    _avg?: SalesRecordAvgAggregateInputType
    _sum?: SalesRecordSumAggregateInputType
    _min?: SalesRecordMinAggregateInputType
    _max?: SalesRecordMaxAggregateInputType
  }

  export type SalesRecordGroupByOutputType = {
    id: number
    dsrId: number
    shopId: number
    saleDate: Date
    devicesSold: number
    remarks: string | null
    dataSource: $Enums.DataSource
    externalId: string | null
    verified: boolean
    verifiedById: number | null
    createdAt: Date
    updatedAt: Date
    _count: SalesRecordCountAggregateOutputType | null
    _avg: SalesRecordAvgAggregateOutputType | null
    _sum: SalesRecordSumAggregateOutputType | null
    _min: SalesRecordMinAggregateOutputType | null
    _max: SalesRecordMaxAggregateOutputType | null
  }

  type GetSalesRecordGroupByPayload<T extends SalesRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SalesRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SalesRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SalesRecordGroupByOutputType[P]>
            : GetScalarType<T[P], SalesRecordGroupByOutputType[P]>
        }
      >
    >


  export type SalesRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dsrId?: boolean
    shopId?: boolean
    saleDate?: boolean
    devicesSold?: boolean
    remarks?: boolean
    dataSource?: boolean
    externalId?: boolean
    verified?: boolean
    verifiedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    verifiedBy?: boolean | SalesRecord$verifiedByArgs<ExtArgs>
  }, ExtArgs["result"]["salesRecord"]>

  export type SalesRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dsrId?: boolean
    shopId?: boolean
    saleDate?: boolean
    devicesSold?: boolean
    remarks?: boolean
    dataSource?: boolean
    externalId?: boolean
    verified?: boolean
    verifiedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    verifiedBy?: boolean | SalesRecord$verifiedByArgs<ExtArgs>
  }, ExtArgs["result"]["salesRecord"]>

  export type SalesRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dsrId?: boolean
    shopId?: boolean
    saleDate?: boolean
    devicesSold?: boolean
    remarks?: boolean
    dataSource?: boolean
    externalId?: boolean
    verified?: boolean
    verifiedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    verifiedBy?: boolean | SalesRecord$verifiedByArgs<ExtArgs>
  }, ExtArgs["result"]["salesRecord"]>

  export type SalesRecordSelectScalar = {
    id?: boolean
    dsrId?: boolean
    shopId?: boolean
    saleDate?: boolean
    devicesSold?: boolean
    remarks?: boolean
    dataSource?: boolean
    externalId?: boolean
    verified?: boolean
    verifiedById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SalesRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dsrId" | "shopId" | "saleDate" | "devicesSold" | "remarks" | "dataSource" | "externalId" | "verified" | "verifiedById" | "createdAt" | "updatedAt", ExtArgs["result"]["salesRecord"]>
  export type SalesRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    verifiedBy?: boolean | SalesRecord$verifiedByArgs<ExtArgs>
  }
  export type SalesRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    verifiedBy?: boolean | SalesRecord$verifiedByArgs<ExtArgs>
  }
  export type SalesRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dsr?: boolean | DSRDefaultArgs<ExtArgs>
    shop?: boolean | ShopDefaultArgs<ExtArgs>
    verifiedBy?: boolean | SalesRecord$verifiedByArgs<ExtArgs>
  }

  export type $SalesRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SalesRecord"
    objects: {
      dsr: Prisma.$DSRPayload<ExtArgs>
      shop: Prisma.$ShopPayload<ExtArgs>
      verifiedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      dsrId: number
      shopId: number
      saleDate: Date
      devicesSold: number
      remarks: string | null
      dataSource: $Enums.DataSource
      externalId: string | null
      verified: boolean
      verifiedById: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["salesRecord"]>
    composites: {}
  }

  type SalesRecordGetPayload<S extends boolean | null | undefined | SalesRecordDefaultArgs> = $Result.GetResult<Prisma.$SalesRecordPayload, S>

  type SalesRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SalesRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SalesRecordCountAggregateInputType | true
    }

  export interface SalesRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SalesRecord'], meta: { name: 'SalesRecord' } }
    /**
     * Find zero or one SalesRecord that matches the filter.
     * @param {SalesRecordFindUniqueArgs} args - Arguments to find a SalesRecord
     * @example
     * // Get one SalesRecord
     * const salesRecord = await prisma.salesRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SalesRecordFindUniqueArgs>(args: SelectSubset<T, SalesRecordFindUniqueArgs<ExtArgs>>): Prisma__SalesRecordClient<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SalesRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SalesRecordFindUniqueOrThrowArgs} args - Arguments to find a SalesRecord
     * @example
     * // Get one SalesRecord
     * const salesRecord = await prisma.salesRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SalesRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, SalesRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SalesRecordClient<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SalesRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesRecordFindFirstArgs} args - Arguments to find a SalesRecord
     * @example
     * // Get one SalesRecord
     * const salesRecord = await prisma.salesRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SalesRecordFindFirstArgs>(args?: SelectSubset<T, SalesRecordFindFirstArgs<ExtArgs>>): Prisma__SalesRecordClient<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SalesRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesRecordFindFirstOrThrowArgs} args - Arguments to find a SalesRecord
     * @example
     * // Get one SalesRecord
     * const salesRecord = await prisma.salesRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SalesRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, SalesRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__SalesRecordClient<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SalesRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SalesRecords
     * const salesRecords = await prisma.salesRecord.findMany()
     * 
     * // Get first 10 SalesRecords
     * const salesRecords = await prisma.salesRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const salesRecordWithIdOnly = await prisma.salesRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SalesRecordFindManyArgs>(args?: SelectSubset<T, SalesRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SalesRecord.
     * @param {SalesRecordCreateArgs} args - Arguments to create a SalesRecord.
     * @example
     * // Create one SalesRecord
     * const SalesRecord = await prisma.salesRecord.create({
     *   data: {
     *     // ... data to create a SalesRecord
     *   }
     * })
     * 
     */
    create<T extends SalesRecordCreateArgs>(args: SelectSubset<T, SalesRecordCreateArgs<ExtArgs>>): Prisma__SalesRecordClient<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SalesRecords.
     * @param {SalesRecordCreateManyArgs} args - Arguments to create many SalesRecords.
     * @example
     * // Create many SalesRecords
     * const salesRecord = await prisma.salesRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SalesRecordCreateManyArgs>(args?: SelectSubset<T, SalesRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SalesRecords and returns the data saved in the database.
     * @param {SalesRecordCreateManyAndReturnArgs} args - Arguments to create many SalesRecords.
     * @example
     * // Create many SalesRecords
     * const salesRecord = await prisma.salesRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SalesRecords and only return the `id`
     * const salesRecordWithIdOnly = await prisma.salesRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SalesRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, SalesRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SalesRecord.
     * @param {SalesRecordDeleteArgs} args - Arguments to delete one SalesRecord.
     * @example
     * // Delete one SalesRecord
     * const SalesRecord = await prisma.salesRecord.delete({
     *   where: {
     *     // ... filter to delete one SalesRecord
     *   }
     * })
     * 
     */
    delete<T extends SalesRecordDeleteArgs>(args: SelectSubset<T, SalesRecordDeleteArgs<ExtArgs>>): Prisma__SalesRecordClient<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SalesRecord.
     * @param {SalesRecordUpdateArgs} args - Arguments to update one SalesRecord.
     * @example
     * // Update one SalesRecord
     * const salesRecord = await prisma.salesRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SalesRecordUpdateArgs>(args: SelectSubset<T, SalesRecordUpdateArgs<ExtArgs>>): Prisma__SalesRecordClient<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SalesRecords.
     * @param {SalesRecordDeleteManyArgs} args - Arguments to filter SalesRecords to delete.
     * @example
     * // Delete a few SalesRecords
     * const { count } = await prisma.salesRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SalesRecordDeleteManyArgs>(args?: SelectSubset<T, SalesRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SalesRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SalesRecords
     * const salesRecord = await prisma.salesRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SalesRecordUpdateManyArgs>(args: SelectSubset<T, SalesRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SalesRecords and returns the data updated in the database.
     * @param {SalesRecordUpdateManyAndReturnArgs} args - Arguments to update many SalesRecords.
     * @example
     * // Update many SalesRecords
     * const salesRecord = await prisma.salesRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SalesRecords and only return the `id`
     * const salesRecordWithIdOnly = await prisma.salesRecord.updateManyAndReturn({
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
    updateManyAndReturn<T extends SalesRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, SalesRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SalesRecord.
     * @param {SalesRecordUpsertArgs} args - Arguments to update or create a SalesRecord.
     * @example
     * // Update or create a SalesRecord
     * const salesRecord = await prisma.salesRecord.upsert({
     *   create: {
     *     // ... data to create a SalesRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SalesRecord we want to update
     *   }
     * })
     */
    upsert<T extends SalesRecordUpsertArgs>(args: SelectSubset<T, SalesRecordUpsertArgs<ExtArgs>>): Prisma__SalesRecordClient<$Result.GetResult<Prisma.$SalesRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SalesRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesRecordCountArgs} args - Arguments to filter SalesRecords to count.
     * @example
     * // Count the number of SalesRecords
     * const count = await prisma.salesRecord.count({
     *   where: {
     *     // ... the filter for the SalesRecords we want to count
     *   }
     * })
    **/
    count<T extends SalesRecordCountArgs>(
      args?: Subset<T, SalesRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SalesRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SalesRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SalesRecordAggregateArgs>(args: Subset<T, SalesRecordAggregateArgs>): Prisma.PrismaPromise<GetSalesRecordAggregateType<T>>

    /**
     * Group by SalesRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalesRecordGroupByArgs} args - Group by arguments.
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
      T extends SalesRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SalesRecordGroupByArgs['orderBy'] }
        : { orderBy?: SalesRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SalesRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSalesRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SalesRecord model
   */
  readonly fields: SalesRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SalesRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SalesRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dsr<T extends DSRDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DSRDefaultArgs<ExtArgs>>): Prisma__DSRClient<$Result.GetResult<Prisma.$DSRPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    shop<T extends ShopDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ShopDefaultArgs<ExtArgs>>): Prisma__ShopClient<$Result.GetResult<Prisma.$ShopPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    verifiedBy<T extends SalesRecord$verifiedByArgs<ExtArgs> = {}>(args?: Subset<T, SalesRecord$verifiedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SalesRecord model
   */
  interface SalesRecordFieldRefs {
    readonly id: FieldRef<"SalesRecord", 'Int'>
    readonly dsrId: FieldRef<"SalesRecord", 'Int'>
    readonly shopId: FieldRef<"SalesRecord", 'Int'>
    readonly saleDate: FieldRef<"SalesRecord", 'DateTime'>
    readonly devicesSold: FieldRef<"SalesRecord", 'Int'>
    readonly remarks: FieldRef<"SalesRecord", 'String'>
    readonly dataSource: FieldRef<"SalesRecord", 'DataSource'>
    readonly externalId: FieldRef<"SalesRecord", 'String'>
    readonly verified: FieldRef<"SalesRecord", 'Boolean'>
    readonly verifiedById: FieldRef<"SalesRecord", 'Int'>
    readonly createdAt: FieldRef<"SalesRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"SalesRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SalesRecord findUnique
   */
  export type SalesRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
    /**
     * Filter, which SalesRecord to fetch.
     */
    where: SalesRecordWhereUniqueInput
  }

  /**
   * SalesRecord findUniqueOrThrow
   */
  export type SalesRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
    /**
     * Filter, which SalesRecord to fetch.
     */
    where: SalesRecordWhereUniqueInput
  }

  /**
   * SalesRecord findFirst
   */
  export type SalesRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
    /**
     * Filter, which SalesRecord to fetch.
     */
    where?: SalesRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalesRecords to fetch.
     */
    orderBy?: SalesRecordOrderByWithRelationInput | SalesRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SalesRecords.
     */
    cursor?: SalesRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalesRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalesRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SalesRecords.
     */
    distinct?: SalesRecordScalarFieldEnum | SalesRecordScalarFieldEnum[]
  }

  /**
   * SalesRecord findFirstOrThrow
   */
  export type SalesRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
    /**
     * Filter, which SalesRecord to fetch.
     */
    where?: SalesRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalesRecords to fetch.
     */
    orderBy?: SalesRecordOrderByWithRelationInput | SalesRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SalesRecords.
     */
    cursor?: SalesRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalesRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalesRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SalesRecords.
     */
    distinct?: SalesRecordScalarFieldEnum | SalesRecordScalarFieldEnum[]
  }

  /**
   * SalesRecord findMany
   */
  export type SalesRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
    /**
     * Filter, which SalesRecords to fetch.
     */
    where?: SalesRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SalesRecords to fetch.
     */
    orderBy?: SalesRecordOrderByWithRelationInput | SalesRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SalesRecords.
     */
    cursor?: SalesRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SalesRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SalesRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SalesRecords.
     */
    distinct?: SalesRecordScalarFieldEnum | SalesRecordScalarFieldEnum[]
  }

  /**
   * SalesRecord create
   */
  export type SalesRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a SalesRecord.
     */
    data: XOR<SalesRecordCreateInput, SalesRecordUncheckedCreateInput>
  }

  /**
   * SalesRecord createMany
   */
  export type SalesRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SalesRecords.
     */
    data: SalesRecordCreateManyInput | SalesRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SalesRecord createManyAndReturn
   */
  export type SalesRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * The data used to create many SalesRecords.
     */
    data: SalesRecordCreateManyInput | SalesRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SalesRecord update
   */
  export type SalesRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a SalesRecord.
     */
    data: XOR<SalesRecordUpdateInput, SalesRecordUncheckedUpdateInput>
    /**
     * Choose, which SalesRecord to update.
     */
    where: SalesRecordWhereUniqueInput
  }

  /**
   * SalesRecord updateMany
   */
  export type SalesRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SalesRecords.
     */
    data: XOR<SalesRecordUpdateManyMutationInput, SalesRecordUncheckedUpdateManyInput>
    /**
     * Filter which SalesRecords to update
     */
    where?: SalesRecordWhereInput
    /**
     * Limit how many SalesRecords to update.
     */
    limit?: number
  }

  /**
   * SalesRecord updateManyAndReturn
   */
  export type SalesRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * The data used to update SalesRecords.
     */
    data: XOR<SalesRecordUpdateManyMutationInput, SalesRecordUncheckedUpdateManyInput>
    /**
     * Filter which SalesRecords to update
     */
    where?: SalesRecordWhereInput
    /**
     * Limit how many SalesRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SalesRecord upsert
   */
  export type SalesRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the SalesRecord to update in case it exists.
     */
    where: SalesRecordWhereUniqueInput
    /**
     * In case the SalesRecord found by the `where` argument doesn't exist, create a new SalesRecord with this data.
     */
    create: XOR<SalesRecordCreateInput, SalesRecordUncheckedCreateInput>
    /**
     * In case the SalesRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SalesRecordUpdateInput, SalesRecordUncheckedUpdateInput>
  }

  /**
   * SalesRecord delete
   */
  export type SalesRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
    /**
     * Filter which SalesRecord to delete.
     */
    where: SalesRecordWhereUniqueInput
  }

  /**
   * SalesRecord deleteMany
   */
  export type SalesRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SalesRecords to delete
     */
    where?: SalesRecordWhereInput
    /**
     * Limit how many SalesRecords to delete.
     */
    limit?: number
  }

  /**
   * SalesRecord.verifiedBy
   */
  export type SalesRecord$verifiedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * SalesRecord without action
   */
  export type SalesRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalesRecord
     */
    select?: SalesRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SalesRecord
     */
    omit?: SalesRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalesRecordInclude<ExtArgs> | null
  }


  /**
   * Model PublicHoliday
   */

  export type AggregatePublicHoliday = {
    _count: PublicHolidayCountAggregateOutputType | null
    _avg: PublicHolidayAvgAggregateOutputType | null
    _sum: PublicHolidaySumAggregateOutputType | null
    _min: PublicHolidayMinAggregateOutputType | null
    _max: PublicHolidayMaxAggregateOutputType | null
  }

  export type PublicHolidayAvgAggregateOutputType = {
    id: number | null
  }

  export type PublicHolidaySumAggregateOutputType = {
    id: number | null
  }

  export type PublicHolidayMinAggregateOutputType = {
    id: number | null
    date: Date | null
    name: string | null
    countryCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PublicHolidayMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    name: string | null
    countryCode: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PublicHolidayCountAggregateOutputType = {
    id: number
    date: number
    name: number
    countryCode: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PublicHolidayAvgAggregateInputType = {
    id?: true
  }

  export type PublicHolidaySumAggregateInputType = {
    id?: true
  }

  export type PublicHolidayMinAggregateInputType = {
    id?: true
    date?: true
    name?: true
    countryCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PublicHolidayMaxAggregateInputType = {
    id?: true
    date?: true
    name?: true
    countryCode?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PublicHolidayCountAggregateInputType = {
    id?: true
    date?: true
    name?: true
    countryCode?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PublicHolidayAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PublicHoliday to aggregate.
     */
    where?: PublicHolidayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicHolidays to fetch.
     */
    orderBy?: PublicHolidayOrderByWithRelationInput | PublicHolidayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PublicHolidayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicHolidays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicHolidays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PublicHolidays
    **/
    _count?: true | PublicHolidayCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PublicHolidayAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PublicHolidaySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PublicHolidayMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PublicHolidayMaxAggregateInputType
  }

  export type GetPublicHolidayAggregateType<T extends PublicHolidayAggregateArgs> = {
        [P in keyof T & keyof AggregatePublicHoliday]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePublicHoliday[P]>
      : GetScalarType<T[P], AggregatePublicHoliday[P]>
  }




  export type PublicHolidayGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicHolidayWhereInput
    orderBy?: PublicHolidayOrderByWithAggregationInput | PublicHolidayOrderByWithAggregationInput[]
    by: PublicHolidayScalarFieldEnum[] | PublicHolidayScalarFieldEnum
    having?: PublicHolidayScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PublicHolidayCountAggregateInputType | true
    _avg?: PublicHolidayAvgAggregateInputType
    _sum?: PublicHolidaySumAggregateInputType
    _min?: PublicHolidayMinAggregateInputType
    _max?: PublicHolidayMaxAggregateInputType
  }

  export type PublicHolidayGroupByOutputType = {
    id: number
    date: Date
    name: string
    countryCode: string
    createdAt: Date
    updatedAt: Date
    _count: PublicHolidayCountAggregateOutputType | null
    _avg: PublicHolidayAvgAggregateOutputType | null
    _sum: PublicHolidaySumAggregateOutputType | null
    _min: PublicHolidayMinAggregateOutputType | null
    _max: PublicHolidayMaxAggregateOutputType | null
  }

  type GetPublicHolidayGroupByPayload<T extends PublicHolidayGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PublicHolidayGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PublicHolidayGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PublicHolidayGroupByOutputType[P]>
            : GetScalarType<T[P], PublicHolidayGroupByOutputType[P]>
        }
      >
    >


  export type PublicHolidaySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    name?: boolean
    countryCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["publicHoliday"]>

  export type PublicHolidaySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    name?: boolean
    countryCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["publicHoliday"]>

  export type PublicHolidaySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    name?: boolean
    countryCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["publicHoliday"]>

  export type PublicHolidaySelectScalar = {
    id?: boolean
    date?: boolean
    name?: boolean
    countryCode?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PublicHolidayOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "name" | "countryCode" | "createdAt" | "updatedAt", ExtArgs["result"]["publicHoliday"]>

  export type $PublicHolidayPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PublicHoliday"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date
      name: string
      countryCode: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["publicHoliday"]>
    composites: {}
  }

  type PublicHolidayGetPayload<S extends boolean | null | undefined | PublicHolidayDefaultArgs> = $Result.GetResult<Prisma.$PublicHolidayPayload, S>

  type PublicHolidayCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PublicHolidayFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PublicHolidayCountAggregateInputType | true
    }

  export interface PublicHolidayDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PublicHoliday'], meta: { name: 'PublicHoliday' } }
    /**
     * Find zero or one PublicHoliday that matches the filter.
     * @param {PublicHolidayFindUniqueArgs} args - Arguments to find a PublicHoliday
     * @example
     * // Get one PublicHoliday
     * const publicHoliday = await prisma.publicHoliday.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PublicHolidayFindUniqueArgs>(args: SelectSubset<T, PublicHolidayFindUniqueArgs<ExtArgs>>): Prisma__PublicHolidayClient<$Result.GetResult<Prisma.$PublicHolidayPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PublicHoliday that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PublicHolidayFindUniqueOrThrowArgs} args - Arguments to find a PublicHoliday
     * @example
     * // Get one PublicHoliday
     * const publicHoliday = await prisma.publicHoliday.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PublicHolidayFindUniqueOrThrowArgs>(args: SelectSubset<T, PublicHolidayFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PublicHolidayClient<$Result.GetResult<Prisma.$PublicHolidayPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PublicHoliday that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicHolidayFindFirstArgs} args - Arguments to find a PublicHoliday
     * @example
     * // Get one PublicHoliday
     * const publicHoliday = await prisma.publicHoliday.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PublicHolidayFindFirstArgs>(args?: SelectSubset<T, PublicHolidayFindFirstArgs<ExtArgs>>): Prisma__PublicHolidayClient<$Result.GetResult<Prisma.$PublicHolidayPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PublicHoliday that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicHolidayFindFirstOrThrowArgs} args - Arguments to find a PublicHoliday
     * @example
     * // Get one PublicHoliday
     * const publicHoliday = await prisma.publicHoliday.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PublicHolidayFindFirstOrThrowArgs>(args?: SelectSubset<T, PublicHolidayFindFirstOrThrowArgs<ExtArgs>>): Prisma__PublicHolidayClient<$Result.GetResult<Prisma.$PublicHolidayPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PublicHolidays that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicHolidayFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PublicHolidays
     * const publicHolidays = await prisma.publicHoliday.findMany()
     * 
     * // Get first 10 PublicHolidays
     * const publicHolidays = await prisma.publicHoliday.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const publicHolidayWithIdOnly = await prisma.publicHoliday.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PublicHolidayFindManyArgs>(args?: SelectSubset<T, PublicHolidayFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicHolidayPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PublicHoliday.
     * @param {PublicHolidayCreateArgs} args - Arguments to create a PublicHoliday.
     * @example
     * // Create one PublicHoliday
     * const PublicHoliday = await prisma.publicHoliday.create({
     *   data: {
     *     // ... data to create a PublicHoliday
     *   }
     * })
     * 
     */
    create<T extends PublicHolidayCreateArgs>(args: SelectSubset<T, PublicHolidayCreateArgs<ExtArgs>>): Prisma__PublicHolidayClient<$Result.GetResult<Prisma.$PublicHolidayPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PublicHolidays.
     * @param {PublicHolidayCreateManyArgs} args - Arguments to create many PublicHolidays.
     * @example
     * // Create many PublicHolidays
     * const publicHoliday = await prisma.publicHoliday.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PublicHolidayCreateManyArgs>(args?: SelectSubset<T, PublicHolidayCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PublicHolidays and returns the data saved in the database.
     * @param {PublicHolidayCreateManyAndReturnArgs} args - Arguments to create many PublicHolidays.
     * @example
     * // Create many PublicHolidays
     * const publicHoliday = await prisma.publicHoliday.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PublicHolidays and only return the `id`
     * const publicHolidayWithIdOnly = await prisma.publicHoliday.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PublicHolidayCreateManyAndReturnArgs>(args?: SelectSubset<T, PublicHolidayCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicHolidayPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PublicHoliday.
     * @param {PublicHolidayDeleteArgs} args - Arguments to delete one PublicHoliday.
     * @example
     * // Delete one PublicHoliday
     * const PublicHoliday = await prisma.publicHoliday.delete({
     *   where: {
     *     // ... filter to delete one PublicHoliday
     *   }
     * })
     * 
     */
    delete<T extends PublicHolidayDeleteArgs>(args: SelectSubset<T, PublicHolidayDeleteArgs<ExtArgs>>): Prisma__PublicHolidayClient<$Result.GetResult<Prisma.$PublicHolidayPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PublicHoliday.
     * @param {PublicHolidayUpdateArgs} args - Arguments to update one PublicHoliday.
     * @example
     * // Update one PublicHoliday
     * const publicHoliday = await prisma.publicHoliday.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PublicHolidayUpdateArgs>(args: SelectSubset<T, PublicHolidayUpdateArgs<ExtArgs>>): Prisma__PublicHolidayClient<$Result.GetResult<Prisma.$PublicHolidayPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PublicHolidays.
     * @param {PublicHolidayDeleteManyArgs} args - Arguments to filter PublicHolidays to delete.
     * @example
     * // Delete a few PublicHolidays
     * const { count } = await prisma.publicHoliday.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PublicHolidayDeleteManyArgs>(args?: SelectSubset<T, PublicHolidayDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PublicHolidays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicHolidayUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PublicHolidays
     * const publicHoliday = await prisma.publicHoliday.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PublicHolidayUpdateManyArgs>(args: SelectSubset<T, PublicHolidayUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PublicHolidays and returns the data updated in the database.
     * @param {PublicHolidayUpdateManyAndReturnArgs} args - Arguments to update many PublicHolidays.
     * @example
     * // Update many PublicHolidays
     * const publicHoliday = await prisma.publicHoliday.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PublicHolidays and only return the `id`
     * const publicHolidayWithIdOnly = await prisma.publicHoliday.updateManyAndReturn({
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
    updateManyAndReturn<T extends PublicHolidayUpdateManyAndReturnArgs>(args: SelectSubset<T, PublicHolidayUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicHolidayPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PublicHoliday.
     * @param {PublicHolidayUpsertArgs} args - Arguments to update or create a PublicHoliday.
     * @example
     * // Update or create a PublicHoliday
     * const publicHoliday = await prisma.publicHoliday.upsert({
     *   create: {
     *     // ... data to create a PublicHoliday
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PublicHoliday we want to update
     *   }
     * })
     */
    upsert<T extends PublicHolidayUpsertArgs>(args: SelectSubset<T, PublicHolidayUpsertArgs<ExtArgs>>): Prisma__PublicHolidayClient<$Result.GetResult<Prisma.$PublicHolidayPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PublicHolidays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicHolidayCountArgs} args - Arguments to filter PublicHolidays to count.
     * @example
     * // Count the number of PublicHolidays
     * const count = await prisma.publicHoliday.count({
     *   where: {
     *     // ... the filter for the PublicHolidays we want to count
     *   }
     * })
    **/
    count<T extends PublicHolidayCountArgs>(
      args?: Subset<T, PublicHolidayCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PublicHolidayCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PublicHoliday.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicHolidayAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PublicHolidayAggregateArgs>(args: Subset<T, PublicHolidayAggregateArgs>): Prisma.PrismaPromise<GetPublicHolidayAggregateType<T>>

    /**
     * Group by PublicHoliday.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicHolidayGroupByArgs} args - Group by arguments.
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
      T extends PublicHolidayGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PublicHolidayGroupByArgs['orderBy'] }
        : { orderBy?: PublicHolidayGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PublicHolidayGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicHolidayGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PublicHoliday model
   */
  readonly fields: PublicHolidayFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PublicHoliday.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PublicHolidayClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the PublicHoliday model
   */
  interface PublicHolidayFieldRefs {
    readonly id: FieldRef<"PublicHoliday", 'Int'>
    readonly date: FieldRef<"PublicHoliday", 'DateTime'>
    readonly name: FieldRef<"PublicHoliday", 'String'>
    readonly countryCode: FieldRef<"PublicHoliday", 'String'>
    readonly createdAt: FieldRef<"PublicHoliday", 'DateTime'>
    readonly updatedAt: FieldRef<"PublicHoliday", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PublicHoliday findUnique
   */
  export type PublicHolidayFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicHoliday
     */
    select?: PublicHolidaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicHoliday
     */
    omit?: PublicHolidayOmit<ExtArgs> | null
    /**
     * Filter, which PublicHoliday to fetch.
     */
    where: PublicHolidayWhereUniqueInput
  }

  /**
   * PublicHoliday findUniqueOrThrow
   */
  export type PublicHolidayFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicHoliday
     */
    select?: PublicHolidaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicHoliday
     */
    omit?: PublicHolidayOmit<ExtArgs> | null
    /**
     * Filter, which PublicHoliday to fetch.
     */
    where: PublicHolidayWhereUniqueInput
  }

  /**
   * PublicHoliday findFirst
   */
  export type PublicHolidayFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicHoliday
     */
    select?: PublicHolidaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicHoliday
     */
    omit?: PublicHolidayOmit<ExtArgs> | null
    /**
     * Filter, which PublicHoliday to fetch.
     */
    where?: PublicHolidayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicHolidays to fetch.
     */
    orderBy?: PublicHolidayOrderByWithRelationInput | PublicHolidayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PublicHolidays.
     */
    cursor?: PublicHolidayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicHolidays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicHolidays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicHolidays.
     */
    distinct?: PublicHolidayScalarFieldEnum | PublicHolidayScalarFieldEnum[]
  }

  /**
   * PublicHoliday findFirstOrThrow
   */
  export type PublicHolidayFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicHoliday
     */
    select?: PublicHolidaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicHoliday
     */
    omit?: PublicHolidayOmit<ExtArgs> | null
    /**
     * Filter, which PublicHoliday to fetch.
     */
    where?: PublicHolidayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicHolidays to fetch.
     */
    orderBy?: PublicHolidayOrderByWithRelationInput | PublicHolidayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PublicHolidays.
     */
    cursor?: PublicHolidayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicHolidays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicHolidays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicHolidays.
     */
    distinct?: PublicHolidayScalarFieldEnum | PublicHolidayScalarFieldEnum[]
  }

  /**
   * PublicHoliday findMany
   */
  export type PublicHolidayFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicHoliday
     */
    select?: PublicHolidaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicHoliday
     */
    omit?: PublicHolidayOmit<ExtArgs> | null
    /**
     * Filter, which PublicHolidays to fetch.
     */
    where?: PublicHolidayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PublicHolidays to fetch.
     */
    orderBy?: PublicHolidayOrderByWithRelationInput | PublicHolidayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PublicHolidays.
     */
    cursor?: PublicHolidayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PublicHolidays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PublicHolidays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PublicHolidays.
     */
    distinct?: PublicHolidayScalarFieldEnum | PublicHolidayScalarFieldEnum[]
  }

  /**
   * PublicHoliday create
   */
  export type PublicHolidayCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicHoliday
     */
    select?: PublicHolidaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicHoliday
     */
    omit?: PublicHolidayOmit<ExtArgs> | null
    /**
     * The data needed to create a PublicHoliday.
     */
    data: XOR<PublicHolidayCreateInput, PublicHolidayUncheckedCreateInput>
  }

  /**
   * PublicHoliday createMany
   */
  export type PublicHolidayCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PublicHolidays.
     */
    data: PublicHolidayCreateManyInput | PublicHolidayCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PublicHoliday createManyAndReturn
   */
  export type PublicHolidayCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicHoliday
     */
    select?: PublicHolidaySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PublicHoliday
     */
    omit?: PublicHolidayOmit<ExtArgs> | null
    /**
     * The data used to create many PublicHolidays.
     */
    data: PublicHolidayCreateManyInput | PublicHolidayCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PublicHoliday update
   */
  export type PublicHolidayUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicHoliday
     */
    select?: PublicHolidaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicHoliday
     */
    omit?: PublicHolidayOmit<ExtArgs> | null
    /**
     * The data needed to update a PublicHoliday.
     */
    data: XOR<PublicHolidayUpdateInput, PublicHolidayUncheckedUpdateInput>
    /**
     * Choose, which PublicHoliday to update.
     */
    where: PublicHolidayWhereUniqueInput
  }

  /**
   * PublicHoliday updateMany
   */
  export type PublicHolidayUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PublicHolidays.
     */
    data: XOR<PublicHolidayUpdateManyMutationInput, PublicHolidayUncheckedUpdateManyInput>
    /**
     * Filter which PublicHolidays to update
     */
    where?: PublicHolidayWhereInput
    /**
     * Limit how many PublicHolidays to update.
     */
    limit?: number
  }

  /**
   * PublicHoliday updateManyAndReturn
   */
  export type PublicHolidayUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicHoliday
     */
    select?: PublicHolidaySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PublicHoliday
     */
    omit?: PublicHolidayOmit<ExtArgs> | null
    /**
     * The data used to update PublicHolidays.
     */
    data: XOR<PublicHolidayUpdateManyMutationInput, PublicHolidayUncheckedUpdateManyInput>
    /**
     * Filter which PublicHolidays to update
     */
    where?: PublicHolidayWhereInput
    /**
     * Limit how many PublicHolidays to update.
     */
    limit?: number
  }

  /**
   * PublicHoliday upsert
   */
  export type PublicHolidayUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicHoliday
     */
    select?: PublicHolidaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicHoliday
     */
    omit?: PublicHolidayOmit<ExtArgs> | null
    /**
     * The filter to search for the PublicHoliday to update in case it exists.
     */
    where: PublicHolidayWhereUniqueInput
    /**
     * In case the PublicHoliday found by the `where` argument doesn't exist, create a new PublicHoliday with this data.
     */
    create: XOR<PublicHolidayCreateInput, PublicHolidayUncheckedCreateInput>
    /**
     * In case the PublicHoliday was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PublicHolidayUpdateInput, PublicHolidayUncheckedUpdateInput>
  }

  /**
   * PublicHoliday delete
   */
  export type PublicHolidayDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicHoliday
     */
    select?: PublicHolidaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicHoliday
     */
    omit?: PublicHolidayOmit<ExtArgs> | null
    /**
     * Filter which PublicHoliday to delete.
     */
    where: PublicHolidayWhereUniqueInput
  }

  /**
   * PublicHoliday deleteMany
   */
  export type PublicHolidayDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PublicHolidays to delete
     */
    where?: PublicHolidayWhereInput
    /**
     * Limit how many PublicHolidays to delete.
     */
    limit?: number
  }

  /**
   * PublicHoliday without action
   */
  export type PublicHolidayDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicHoliday
     */
    select?: PublicHolidaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PublicHoliday
     */
    omit?: PublicHolidayOmit<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    fullName: 'fullName',
    hashedPassword: 'hashedPassword',
    isActive: 'isActive',
    isSuperuser: 'isSuperuser',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ShopScalarFieldEnum: {
    id: 'id',
    name: 'name',
    location: 'location',
    region: 'region',
    district: 'district',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type ShopScalarFieldEnum = (typeof ShopScalarFieldEnum)[keyof typeof ShopScalarFieldEnum]


  export const DSRScalarFieldEnum: {
    id: 'id',
    accountNumber: 'accountNumber',
    fullName: 'fullName',
    email: 'email',
    secondaryNumber: 'secondaryNumber',
    dateOfBirth: 'dateOfBirth',
    gender: 'gender',
    address: 'address',
    educationLevel: 'educationLevel',
    educationInstitution: 'educationInstitution',
    educationYear: 'educationYear',
    employmentDate: 'employmentDate',
    employmentStatus: 'employmentStatus',
    emergencyContactName: 'emergencyContactName',
    emergencyContactPhone: 'emergencyContactPhone',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
  };

  export type DSRScalarFieldEnum = (typeof DSRScalarFieldEnum)[keyof typeof DSRScalarFieldEnum]


  export const AssignmentScalarFieldEnum: {
    id: 'id',
    dsrId: 'dsrId',
    shopId: 'shopId',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    teamName: 'teamName',
    role: 'role',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AssignmentScalarFieldEnum = (typeof AssignmentScalarFieldEnum)[keyof typeof AssignmentScalarFieldEnum]


  export const TransferRecordScalarFieldEnum: {
    id: 'id',
    dsrId: 'dsrId',
    fromShopId: 'fromShopId',
    toShopId: 'toShopId',
    transferDate: 'transferDate',
    reason: 'reason',
    reasonDetail: 'reasonDetail',
    approvedById: 'approvedById',
    effectivenessScore: 'effectivenessScore',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TransferRecordScalarFieldEnum = (typeof TransferRecordScalarFieldEnum)[keyof typeof TransferRecordScalarFieldEnum]


  export const SalesRecordScalarFieldEnum: {
    id: 'id',
    dsrId: 'dsrId',
    shopId: 'shopId',
    saleDate: 'saleDate',
    devicesSold: 'devicesSold',
    remarks: 'remarks',
    dataSource: 'dataSource',
    externalId: 'externalId',
    verified: 'verified',
    verifiedById: 'verifiedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SalesRecordScalarFieldEnum = (typeof SalesRecordScalarFieldEnum)[keyof typeof SalesRecordScalarFieldEnum]


  export const PublicHolidayScalarFieldEnum: {
    id: 'id',
    date: 'date',
    name: 'name',
    countryCode: 'countryCode',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PublicHolidayScalarFieldEnum = (typeof PublicHolidayScalarFieldEnum)[keyof typeof PublicHolidayScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


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
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'EducationLevel'
   */
  export type EnumEducationLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EducationLevel'>
    


  /**
   * Reference to a field of type 'EducationLevel[]'
   */
  export type ListEnumEducationLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EducationLevel[]'>
    


  /**
   * Reference to a field of type 'EmploymentStatus'
   */
  export type EnumEmploymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmploymentStatus'>
    


  /**
   * Reference to a field of type 'EmploymentStatus[]'
   */
  export type ListEnumEmploymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmploymentStatus[]'>
    


  /**
   * Reference to a field of type 'AssignmentStatus'
   */
  export type EnumAssignmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssignmentStatus'>
    


  /**
   * Reference to a field of type 'AssignmentStatus[]'
   */
  export type ListEnumAssignmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssignmentStatus[]'>
    


  /**
   * Reference to a field of type 'TransferReason'
   */
  export type EnumTransferReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransferReason'>
    


  /**
   * Reference to a field of type 'TransferReason[]'
   */
  export type ListEnumTransferReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransferReason[]'>
    


  /**
   * Reference to a field of type 'DataSource'
   */
  export type EnumDataSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DataSource'>
    


  /**
   * Reference to a field of type 'DataSource[]'
   */
  export type ListEnumDataSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DataSource[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    hashedPassword?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    isSuperuser?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    verifiedSalesRecords?: SalesRecordListRelationFilter
    approvedTransfers?: TransferRecordListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    hashedPassword?: SortOrder
    isActive?: SortOrder
    isSuperuser?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    verifiedSalesRecords?: SalesRecordOrderByRelationAggregateInput
    approvedTransfers?: TransferRecordOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    hashedPassword?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    isSuperuser?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    verifiedSalesRecords?: SalesRecordListRelationFilter
    approvedTransfers?: TransferRecordListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    hashedPassword?: SortOrder
    isActive?: SortOrder
    isSuperuser?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    hashedPassword?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    isSuperuser?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ShopWhereInput = {
    AND?: ShopWhereInput | ShopWhereInput[]
    OR?: ShopWhereInput[]
    NOT?: ShopWhereInput | ShopWhereInput[]
    id?: IntFilter<"Shop"> | number
    name?: StringFilter<"Shop"> | string
    location?: StringFilter<"Shop"> | string
    region?: StringFilter<"Shop"> | string
    district?: StringNullableFilter<"Shop"> | string | null
    description?: StringNullableFilter<"Shop"> | string | null
    isActive?: BoolFilter<"Shop"> | boolean
    createdAt?: DateTimeFilter<"Shop"> | Date | string
    updatedAt?: DateTimeFilter<"Shop"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Shop"> | Date | string | null
    assignments?: AssignmentListRelationFilter
    salesRecords?: SalesRecordListRelationFilter
    transfersFrom?: TransferRecordListRelationFilter
    transfersTo?: TransferRecordListRelationFilter
  }

  export type ShopOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    region?: SortOrder
    district?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    assignments?: AssignmentOrderByRelationAggregateInput
    salesRecords?: SalesRecordOrderByRelationAggregateInput
    transfersFrom?: TransferRecordOrderByRelationAggregateInput
    transfersTo?: TransferRecordOrderByRelationAggregateInput
  }

  export type ShopWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uq_shop_name_location?: ShopUq_shop_name_locationCompoundUniqueInput
    AND?: ShopWhereInput | ShopWhereInput[]
    OR?: ShopWhereInput[]
    NOT?: ShopWhereInput | ShopWhereInput[]
    name?: StringFilter<"Shop"> | string
    location?: StringFilter<"Shop"> | string
    region?: StringFilter<"Shop"> | string
    district?: StringNullableFilter<"Shop"> | string | null
    description?: StringNullableFilter<"Shop"> | string | null
    isActive?: BoolFilter<"Shop"> | boolean
    createdAt?: DateTimeFilter<"Shop"> | Date | string
    updatedAt?: DateTimeFilter<"Shop"> | Date | string
    deletedAt?: DateTimeNullableFilter<"Shop"> | Date | string | null
    assignments?: AssignmentListRelationFilter
    salesRecords?: SalesRecordListRelationFilter
    transfersFrom?: TransferRecordListRelationFilter
    transfersTo?: TransferRecordListRelationFilter
  }, "id" | "uq_shop_name_location">

  export type ShopOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    region?: SortOrder
    district?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: ShopCountOrderByAggregateInput
    _avg?: ShopAvgOrderByAggregateInput
    _max?: ShopMaxOrderByAggregateInput
    _min?: ShopMinOrderByAggregateInput
    _sum?: ShopSumOrderByAggregateInput
  }

  export type ShopScalarWhereWithAggregatesInput = {
    AND?: ShopScalarWhereWithAggregatesInput | ShopScalarWhereWithAggregatesInput[]
    OR?: ShopScalarWhereWithAggregatesInput[]
    NOT?: ShopScalarWhereWithAggregatesInput | ShopScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Shop"> | number
    name?: StringWithAggregatesFilter<"Shop"> | string
    location?: StringWithAggregatesFilter<"Shop"> | string
    region?: StringWithAggregatesFilter<"Shop"> | string
    district?: StringNullableWithAggregatesFilter<"Shop"> | string | null
    description?: StringNullableWithAggregatesFilter<"Shop"> | string | null
    isActive?: BoolWithAggregatesFilter<"Shop"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Shop"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Shop"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Shop"> | Date | string | null
  }

  export type DSRWhereInput = {
    AND?: DSRWhereInput | DSRWhereInput[]
    OR?: DSRWhereInput[]
    NOT?: DSRWhereInput | DSRWhereInput[]
    id?: IntFilter<"DSR"> | number
    accountNumber?: StringFilter<"DSR"> | string
    fullName?: StringFilter<"DSR"> | string
    email?: StringNullableFilter<"DSR"> | string | null
    secondaryNumber?: StringNullableFilter<"DSR"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"DSR"> | Date | string | null
    gender?: StringNullableFilter<"DSR"> | string | null
    address?: StringNullableFilter<"DSR"> | string | null
    educationLevel?: EnumEducationLevelNullableFilter<"DSR"> | $Enums.EducationLevel | null
    educationInstitution?: StringNullableFilter<"DSR"> | string | null
    educationYear?: IntNullableFilter<"DSR"> | number | null
    employmentDate?: DateTimeNullableFilter<"DSR"> | Date | string | null
    employmentStatus?: EnumEmploymentStatusFilter<"DSR"> | $Enums.EmploymentStatus
    emergencyContactName?: StringNullableFilter<"DSR"> | string | null
    emergencyContactPhone?: StringNullableFilter<"DSR"> | string | null
    notes?: StringNullableFilter<"DSR"> | string | null
    createdAt?: DateTimeFilter<"DSR"> | Date | string
    updatedAt?: DateTimeFilter<"DSR"> | Date | string
    deletedAt?: DateTimeNullableFilter<"DSR"> | Date | string | null
    assignments?: AssignmentListRelationFilter
    salesRecords?: SalesRecordListRelationFilter
    transfers?: TransferRecordListRelationFilter
  }

  export type DSROrderByWithRelationInput = {
    id?: SortOrder
    accountNumber?: SortOrder
    fullName?: SortOrder
    email?: SortOrderInput | SortOrder
    secondaryNumber?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    educationLevel?: SortOrderInput | SortOrder
    educationInstitution?: SortOrderInput | SortOrder
    educationYear?: SortOrderInput | SortOrder
    employmentDate?: SortOrderInput | SortOrder
    employmentStatus?: SortOrder
    emergencyContactName?: SortOrderInput | SortOrder
    emergencyContactPhone?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    assignments?: AssignmentOrderByRelationAggregateInput
    salesRecords?: SalesRecordOrderByRelationAggregateInput
    transfers?: TransferRecordOrderByRelationAggregateInput
  }

  export type DSRWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    accountNumber?: string
    email?: string
    AND?: DSRWhereInput | DSRWhereInput[]
    OR?: DSRWhereInput[]
    NOT?: DSRWhereInput | DSRWhereInput[]
    fullName?: StringFilter<"DSR"> | string
    secondaryNumber?: StringNullableFilter<"DSR"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"DSR"> | Date | string | null
    gender?: StringNullableFilter<"DSR"> | string | null
    address?: StringNullableFilter<"DSR"> | string | null
    educationLevel?: EnumEducationLevelNullableFilter<"DSR"> | $Enums.EducationLevel | null
    educationInstitution?: StringNullableFilter<"DSR"> | string | null
    educationYear?: IntNullableFilter<"DSR"> | number | null
    employmentDate?: DateTimeNullableFilter<"DSR"> | Date | string | null
    employmentStatus?: EnumEmploymentStatusFilter<"DSR"> | $Enums.EmploymentStatus
    emergencyContactName?: StringNullableFilter<"DSR"> | string | null
    emergencyContactPhone?: StringNullableFilter<"DSR"> | string | null
    notes?: StringNullableFilter<"DSR"> | string | null
    createdAt?: DateTimeFilter<"DSR"> | Date | string
    updatedAt?: DateTimeFilter<"DSR"> | Date | string
    deletedAt?: DateTimeNullableFilter<"DSR"> | Date | string | null
    assignments?: AssignmentListRelationFilter
    salesRecords?: SalesRecordListRelationFilter
    transfers?: TransferRecordListRelationFilter
  }, "id" | "accountNumber" | "email">

  export type DSROrderByWithAggregationInput = {
    id?: SortOrder
    accountNumber?: SortOrder
    fullName?: SortOrder
    email?: SortOrderInput | SortOrder
    secondaryNumber?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    educationLevel?: SortOrderInput | SortOrder
    educationInstitution?: SortOrderInput | SortOrder
    educationYear?: SortOrderInput | SortOrder
    employmentDate?: SortOrderInput | SortOrder
    employmentStatus?: SortOrder
    emergencyContactName?: SortOrderInput | SortOrder
    emergencyContactPhone?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: DSRCountOrderByAggregateInput
    _avg?: DSRAvgOrderByAggregateInput
    _max?: DSRMaxOrderByAggregateInput
    _min?: DSRMinOrderByAggregateInput
    _sum?: DSRSumOrderByAggregateInput
  }

  export type DSRScalarWhereWithAggregatesInput = {
    AND?: DSRScalarWhereWithAggregatesInput | DSRScalarWhereWithAggregatesInput[]
    OR?: DSRScalarWhereWithAggregatesInput[]
    NOT?: DSRScalarWhereWithAggregatesInput | DSRScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DSR"> | number
    accountNumber?: StringWithAggregatesFilter<"DSR"> | string
    fullName?: StringWithAggregatesFilter<"DSR"> | string
    email?: StringNullableWithAggregatesFilter<"DSR"> | string | null
    secondaryNumber?: StringNullableWithAggregatesFilter<"DSR"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"DSR"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"DSR"> | string | null
    address?: StringNullableWithAggregatesFilter<"DSR"> | string | null
    educationLevel?: EnumEducationLevelNullableWithAggregatesFilter<"DSR"> | $Enums.EducationLevel | null
    educationInstitution?: StringNullableWithAggregatesFilter<"DSR"> | string | null
    educationYear?: IntNullableWithAggregatesFilter<"DSR"> | number | null
    employmentDate?: DateTimeNullableWithAggregatesFilter<"DSR"> | Date | string | null
    employmentStatus?: EnumEmploymentStatusWithAggregatesFilter<"DSR"> | $Enums.EmploymentStatus
    emergencyContactName?: StringNullableWithAggregatesFilter<"DSR"> | string | null
    emergencyContactPhone?: StringNullableWithAggregatesFilter<"DSR"> | string | null
    notes?: StringNullableWithAggregatesFilter<"DSR"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DSR"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DSR"> | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter<"DSR"> | Date | string | null
  }

  export type AssignmentWhereInput = {
    AND?: AssignmentWhereInput | AssignmentWhereInput[]
    OR?: AssignmentWhereInput[]
    NOT?: AssignmentWhereInput | AssignmentWhereInput[]
    id?: IntFilter<"Assignment"> | number
    dsrId?: IntFilter<"Assignment"> | number
    shopId?: IntFilter<"Assignment"> | number
    startDate?: DateTimeFilter<"Assignment"> | Date | string
    endDate?: DateTimeNullableFilter<"Assignment"> | Date | string | null
    status?: EnumAssignmentStatusFilter<"Assignment"> | $Enums.AssignmentStatus
    teamName?: StringNullableFilter<"Assignment"> | string | null
    role?: StringNullableFilter<"Assignment"> | string | null
    notes?: StringNullableFilter<"Assignment"> | string | null
    createdAt?: DateTimeFilter<"Assignment"> | Date | string
    updatedAt?: DateTimeFilter<"Assignment"> | Date | string
    dsr?: XOR<DSRScalarRelationFilter, DSRWhereInput>
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
  }

  export type AssignmentOrderByWithRelationInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    status?: SortOrder
    teamName?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dsr?: DSROrderByWithRelationInput
    shop?: ShopOrderByWithRelationInput
  }

  export type AssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AssignmentWhereInput | AssignmentWhereInput[]
    OR?: AssignmentWhereInput[]
    NOT?: AssignmentWhereInput | AssignmentWhereInput[]
    dsrId?: IntFilter<"Assignment"> | number
    shopId?: IntFilter<"Assignment"> | number
    startDate?: DateTimeFilter<"Assignment"> | Date | string
    endDate?: DateTimeNullableFilter<"Assignment"> | Date | string | null
    status?: EnumAssignmentStatusFilter<"Assignment"> | $Enums.AssignmentStatus
    teamName?: StringNullableFilter<"Assignment"> | string | null
    role?: StringNullableFilter<"Assignment"> | string | null
    notes?: StringNullableFilter<"Assignment"> | string | null
    createdAt?: DateTimeFilter<"Assignment"> | Date | string
    updatedAt?: DateTimeFilter<"Assignment"> | Date | string
    dsr?: XOR<DSRScalarRelationFilter, DSRWhereInput>
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
  }, "id">

  export type AssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrderInput | SortOrder
    status?: SortOrder
    teamName?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AssignmentCountOrderByAggregateInput
    _avg?: AssignmentAvgOrderByAggregateInput
    _max?: AssignmentMaxOrderByAggregateInput
    _min?: AssignmentMinOrderByAggregateInput
    _sum?: AssignmentSumOrderByAggregateInput
  }

  export type AssignmentScalarWhereWithAggregatesInput = {
    AND?: AssignmentScalarWhereWithAggregatesInput | AssignmentScalarWhereWithAggregatesInput[]
    OR?: AssignmentScalarWhereWithAggregatesInput[]
    NOT?: AssignmentScalarWhereWithAggregatesInput | AssignmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Assignment"> | number
    dsrId?: IntWithAggregatesFilter<"Assignment"> | number
    shopId?: IntWithAggregatesFilter<"Assignment"> | number
    startDate?: DateTimeWithAggregatesFilter<"Assignment"> | Date | string
    endDate?: DateTimeNullableWithAggregatesFilter<"Assignment"> | Date | string | null
    status?: EnumAssignmentStatusWithAggregatesFilter<"Assignment"> | $Enums.AssignmentStatus
    teamName?: StringNullableWithAggregatesFilter<"Assignment"> | string | null
    role?: StringNullableWithAggregatesFilter<"Assignment"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Assignment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Assignment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Assignment"> | Date | string
  }

  export type TransferRecordWhereInput = {
    AND?: TransferRecordWhereInput | TransferRecordWhereInput[]
    OR?: TransferRecordWhereInput[]
    NOT?: TransferRecordWhereInput | TransferRecordWhereInput[]
    id?: IntFilter<"TransferRecord"> | number
    dsrId?: IntFilter<"TransferRecord"> | number
    fromShopId?: IntFilter<"TransferRecord"> | number
    toShopId?: IntFilter<"TransferRecord"> | number
    transferDate?: DateTimeFilter<"TransferRecord"> | Date | string
    reason?: EnumTransferReasonFilter<"TransferRecord"> | $Enums.TransferReason
    reasonDetail?: StringNullableFilter<"TransferRecord"> | string | null
    approvedById?: IntNullableFilter<"TransferRecord"> | number | null
    effectivenessScore?: IntNullableFilter<"TransferRecord"> | number | null
    notes?: StringNullableFilter<"TransferRecord"> | string | null
    createdAt?: DateTimeFilter<"TransferRecord"> | Date | string
    updatedAt?: DateTimeFilter<"TransferRecord"> | Date | string
    dsr?: XOR<DSRScalarRelationFilter, DSRWhereInput>
    fromShop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    toShop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    approvedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type TransferRecordOrderByWithRelationInput = {
    id?: SortOrder
    dsrId?: SortOrder
    fromShopId?: SortOrder
    toShopId?: SortOrder
    transferDate?: SortOrder
    reason?: SortOrder
    reasonDetail?: SortOrderInput | SortOrder
    approvedById?: SortOrderInput | SortOrder
    effectivenessScore?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dsr?: DSROrderByWithRelationInput
    fromShop?: ShopOrderByWithRelationInput
    toShop?: ShopOrderByWithRelationInput
    approvedBy?: UserOrderByWithRelationInput
  }

  export type TransferRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TransferRecordWhereInput | TransferRecordWhereInput[]
    OR?: TransferRecordWhereInput[]
    NOT?: TransferRecordWhereInput | TransferRecordWhereInput[]
    dsrId?: IntFilter<"TransferRecord"> | number
    fromShopId?: IntFilter<"TransferRecord"> | number
    toShopId?: IntFilter<"TransferRecord"> | number
    transferDate?: DateTimeFilter<"TransferRecord"> | Date | string
    reason?: EnumTransferReasonFilter<"TransferRecord"> | $Enums.TransferReason
    reasonDetail?: StringNullableFilter<"TransferRecord"> | string | null
    approvedById?: IntNullableFilter<"TransferRecord"> | number | null
    effectivenessScore?: IntNullableFilter<"TransferRecord"> | number | null
    notes?: StringNullableFilter<"TransferRecord"> | string | null
    createdAt?: DateTimeFilter<"TransferRecord"> | Date | string
    updatedAt?: DateTimeFilter<"TransferRecord"> | Date | string
    dsr?: XOR<DSRScalarRelationFilter, DSRWhereInput>
    fromShop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    toShop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    approvedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type TransferRecordOrderByWithAggregationInput = {
    id?: SortOrder
    dsrId?: SortOrder
    fromShopId?: SortOrder
    toShopId?: SortOrder
    transferDate?: SortOrder
    reason?: SortOrder
    reasonDetail?: SortOrderInput | SortOrder
    approvedById?: SortOrderInput | SortOrder
    effectivenessScore?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TransferRecordCountOrderByAggregateInput
    _avg?: TransferRecordAvgOrderByAggregateInput
    _max?: TransferRecordMaxOrderByAggregateInput
    _min?: TransferRecordMinOrderByAggregateInput
    _sum?: TransferRecordSumOrderByAggregateInput
  }

  export type TransferRecordScalarWhereWithAggregatesInput = {
    AND?: TransferRecordScalarWhereWithAggregatesInput | TransferRecordScalarWhereWithAggregatesInput[]
    OR?: TransferRecordScalarWhereWithAggregatesInput[]
    NOT?: TransferRecordScalarWhereWithAggregatesInput | TransferRecordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TransferRecord"> | number
    dsrId?: IntWithAggregatesFilter<"TransferRecord"> | number
    fromShopId?: IntWithAggregatesFilter<"TransferRecord"> | number
    toShopId?: IntWithAggregatesFilter<"TransferRecord"> | number
    transferDate?: DateTimeWithAggregatesFilter<"TransferRecord"> | Date | string
    reason?: EnumTransferReasonWithAggregatesFilter<"TransferRecord"> | $Enums.TransferReason
    reasonDetail?: StringNullableWithAggregatesFilter<"TransferRecord"> | string | null
    approvedById?: IntNullableWithAggregatesFilter<"TransferRecord"> | number | null
    effectivenessScore?: IntNullableWithAggregatesFilter<"TransferRecord"> | number | null
    notes?: StringNullableWithAggregatesFilter<"TransferRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TransferRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TransferRecord"> | Date | string
  }

  export type SalesRecordWhereInput = {
    AND?: SalesRecordWhereInput | SalesRecordWhereInput[]
    OR?: SalesRecordWhereInput[]
    NOT?: SalesRecordWhereInput | SalesRecordWhereInput[]
    id?: IntFilter<"SalesRecord"> | number
    dsrId?: IntFilter<"SalesRecord"> | number
    shopId?: IntFilter<"SalesRecord"> | number
    saleDate?: DateTimeFilter<"SalesRecord"> | Date | string
    devicesSold?: IntFilter<"SalesRecord"> | number
    remarks?: StringNullableFilter<"SalesRecord"> | string | null
    dataSource?: EnumDataSourceFilter<"SalesRecord"> | $Enums.DataSource
    externalId?: StringNullableFilter<"SalesRecord"> | string | null
    verified?: BoolFilter<"SalesRecord"> | boolean
    verifiedById?: IntNullableFilter<"SalesRecord"> | number | null
    createdAt?: DateTimeFilter<"SalesRecord"> | Date | string
    updatedAt?: DateTimeFilter<"SalesRecord"> | Date | string
    dsr?: XOR<DSRScalarRelationFilter, DSRWhereInput>
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    verifiedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type SalesRecordOrderByWithRelationInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
    saleDate?: SortOrder
    devicesSold?: SortOrder
    remarks?: SortOrderInput | SortOrder
    dataSource?: SortOrder
    externalId?: SortOrderInput | SortOrder
    verified?: SortOrder
    verifiedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dsr?: DSROrderByWithRelationInput
    shop?: ShopOrderByWithRelationInput
    verifiedBy?: UserOrderByWithRelationInput
  }

  export type SalesRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    externalId?: string
    AND?: SalesRecordWhereInput | SalesRecordWhereInput[]
    OR?: SalesRecordWhereInput[]
    NOT?: SalesRecordWhereInput | SalesRecordWhereInput[]
    dsrId?: IntFilter<"SalesRecord"> | number
    shopId?: IntFilter<"SalesRecord"> | number
    saleDate?: DateTimeFilter<"SalesRecord"> | Date | string
    devicesSold?: IntFilter<"SalesRecord"> | number
    remarks?: StringNullableFilter<"SalesRecord"> | string | null
    dataSource?: EnumDataSourceFilter<"SalesRecord"> | $Enums.DataSource
    verified?: BoolFilter<"SalesRecord"> | boolean
    verifiedById?: IntNullableFilter<"SalesRecord"> | number | null
    createdAt?: DateTimeFilter<"SalesRecord"> | Date | string
    updatedAt?: DateTimeFilter<"SalesRecord"> | Date | string
    dsr?: XOR<DSRScalarRelationFilter, DSRWhereInput>
    shop?: XOR<ShopScalarRelationFilter, ShopWhereInput>
    verifiedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "externalId">

  export type SalesRecordOrderByWithAggregationInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
    saleDate?: SortOrder
    devicesSold?: SortOrder
    remarks?: SortOrderInput | SortOrder
    dataSource?: SortOrder
    externalId?: SortOrderInput | SortOrder
    verified?: SortOrder
    verifiedById?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SalesRecordCountOrderByAggregateInput
    _avg?: SalesRecordAvgOrderByAggregateInput
    _max?: SalesRecordMaxOrderByAggregateInput
    _min?: SalesRecordMinOrderByAggregateInput
    _sum?: SalesRecordSumOrderByAggregateInput
  }

  export type SalesRecordScalarWhereWithAggregatesInput = {
    AND?: SalesRecordScalarWhereWithAggregatesInput | SalesRecordScalarWhereWithAggregatesInput[]
    OR?: SalesRecordScalarWhereWithAggregatesInput[]
    NOT?: SalesRecordScalarWhereWithAggregatesInput | SalesRecordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SalesRecord"> | number
    dsrId?: IntWithAggregatesFilter<"SalesRecord"> | number
    shopId?: IntWithAggregatesFilter<"SalesRecord"> | number
    saleDate?: DateTimeWithAggregatesFilter<"SalesRecord"> | Date | string
    devicesSold?: IntWithAggregatesFilter<"SalesRecord"> | number
    remarks?: StringNullableWithAggregatesFilter<"SalesRecord"> | string | null
    dataSource?: EnumDataSourceWithAggregatesFilter<"SalesRecord"> | $Enums.DataSource
    externalId?: StringNullableWithAggregatesFilter<"SalesRecord"> | string | null
    verified?: BoolWithAggregatesFilter<"SalesRecord"> | boolean
    verifiedById?: IntNullableWithAggregatesFilter<"SalesRecord"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"SalesRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SalesRecord"> | Date | string
  }

  export type PublicHolidayWhereInput = {
    AND?: PublicHolidayWhereInput | PublicHolidayWhereInput[]
    OR?: PublicHolidayWhereInput[]
    NOT?: PublicHolidayWhereInput | PublicHolidayWhereInput[]
    id?: IntFilter<"PublicHoliday"> | number
    date?: DateTimeFilter<"PublicHoliday"> | Date | string
    name?: StringFilter<"PublicHoliday"> | string
    countryCode?: StringFilter<"PublicHoliday"> | string
    createdAt?: DateTimeFilter<"PublicHoliday"> | Date | string
    updatedAt?: DateTimeFilter<"PublicHoliday"> | Date | string
  }

  export type PublicHolidayOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    name?: SortOrder
    countryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicHolidayWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    date?: Date | string
    AND?: PublicHolidayWhereInput | PublicHolidayWhereInput[]
    OR?: PublicHolidayWhereInput[]
    NOT?: PublicHolidayWhereInput | PublicHolidayWhereInput[]
    name?: StringFilter<"PublicHoliday"> | string
    countryCode?: StringFilter<"PublicHoliday"> | string
    createdAt?: DateTimeFilter<"PublicHoliday"> | Date | string
    updatedAt?: DateTimeFilter<"PublicHoliday"> | Date | string
  }, "id" | "date">

  export type PublicHolidayOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    name?: SortOrder
    countryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PublicHolidayCountOrderByAggregateInput
    _avg?: PublicHolidayAvgOrderByAggregateInput
    _max?: PublicHolidayMaxOrderByAggregateInput
    _min?: PublicHolidayMinOrderByAggregateInput
    _sum?: PublicHolidaySumOrderByAggregateInput
  }

  export type PublicHolidayScalarWhereWithAggregatesInput = {
    AND?: PublicHolidayScalarWhereWithAggregatesInput | PublicHolidayScalarWhereWithAggregatesInput[]
    OR?: PublicHolidayScalarWhereWithAggregatesInput[]
    NOT?: PublicHolidayScalarWhereWithAggregatesInput | PublicHolidayScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PublicHoliday"> | number
    date?: DateTimeWithAggregatesFilter<"PublicHoliday"> | Date | string
    name?: StringWithAggregatesFilter<"PublicHoliday"> | string
    countryCode?: StringWithAggregatesFilter<"PublicHoliday"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PublicHoliday"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PublicHoliday"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    isSuperuser?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    verifiedSalesRecords?: SalesRecordCreateNestedManyWithoutVerifiedByInput
    approvedTransfers?: TransferRecordCreateNestedManyWithoutApprovedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    isSuperuser?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    verifiedSalesRecords?: SalesRecordUncheckedCreateNestedManyWithoutVerifiedByInput
    approvedTransfers?: TransferRecordUncheckedCreateNestedManyWithoutApprovedByInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isSuperuser?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedSalesRecords?: SalesRecordUpdateManyWithoutVerifiedByNestedInput
    approvedTransfers?: TransferRecordUpdateManyWithoutApprovedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isSuperuser?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedSalesRecords?: SalesRecordUncheckedUpdateManyWithoutVerifiedByNestedInput
    approvedTransfers?: TransferRecordUncheckedUpdateManyWithoutApprovedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    isSuperuser?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isSuperuser?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isSuperuser?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShopCreateInput = {
    name: string
    location: string
    region?: string
    district?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentCreateNestedManyWithoutShopInput
    salesRecords?: SalesRecordCreateNestedManyWithoutShopInput
    transfersFrom?: TransferRecordCreateNestedManyWithoutFromShopInput
    transfersTo?: TransferRecordCreateNestedManyWithoutToShopInput
  }

  export type ShopUncheckedCreateInput = {
    id?: number
    name: string
    location: string
    region?: string
    district?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentUncheckedCreateNestedManyWithoutShopInput
    salesRecords?: SalesRecordUncheckedCreateNestedManyWithoutShopInput
    transfersFrom?: TransferRecordUncheckedCreateNestedManyWithoutFromShopInput
    transfersTo?: TransferRecordUncheckedCreateNestedManyWithoutToShopInput
  }

  export type ShopUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUpdateManyWithoutShopNestedInput
    salesRecords?: SalesRecordUpdateManyWithoutShopNestedInput
    transfersFrom?: TransferRecordUpdateManyWithoutFromShopNestedInput
    transfersTo?: TransferRecordUpdateManyWithoutToShopNestedInput
  }

  export type ShopUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUncheckedUpdateManyWithoutShopNestedInput
    salesRecords?: SalesRecordUncheckedUpdateManyWithoutShopNestedInput
    transfersFrom?: TransferRecordUncheckedUpdateManyWithoutFromShopNestedInput
    transfersTo?: TransferRecordUncheckedUpdateManyWithoutToShopNestedInput
  }

  export type ShopCreateManyInput = {
    id?: number
    name: string
    location: string
    region?: string
    district?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type ShopUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ShopUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DSRCreateInput = {
    accountNumber: string
    fullName: string
    email?: string | null
    secondaryNumber?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    address?: string | null
    educationLevel?: $Enums.EducationLevel | null
    educationInstitution?: string | null
    educationYear?: number | null
    employmentDate?: Date | string | null
    employmentStatus?: $Enums.EmploymentStatus
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentCreateNestedManyWithoutDsrInput
    salesRecords?: SalesRecordCreateNestedManyWithoutDsrInput
    transfers?: TransferRecordCreateNestedManyWithoutDsrInput
  }

  export type DSRUncheckedCreateInput = {
    id?: number
    accountNumber: string
    fullName: string
    email?: string | null
    secondaryNumber?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    address?: string | null
    educationLevel?: $Enums.EducationLevel | null
    educationInstitution?: string | null
    educationYear?: number | null
    employmentDate?: Date | string | null
    employmentStatus?: $Enums.EmploymentStatus
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentUncheckedCreateNestedManyWithoutDsrInput
    salesRecords?: SalesRecordUncheckedCreateNestedManyWithoutDsrInput
    transfers?: TransferRecordUncheckedCreateNestedManyWithoutDsrInput
  }

  export type DSRUpdateInput = {
    accountNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    educationInstitution?: NullableStringFieldUpdateOperationsInput | string | null
    educationYear?: NullableIntFieldUpdateOperationsInput | number | null
    employmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentStatus?: EnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUpdateManyWithoutDsrNestedInput
    salesRecords?: SalesRecordUpdateManyWithoutDsrNestedInput
    transfers?: TransferRecordUpdateManyWithoutDsrNestedInput
  }

  export type DSRUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    accountNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    educationInstitution?: NullableStringFieldUpdateOperationsInput | string | null
    educationYear?: NullableIntFieldUpdateOperationsInput | number | null
    employmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentStatus?: EnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUncheckedUpdateManyWithoutDsrNestedInput
    salesRecords?: SalesRecordUncheckedUpdateManyWithoutDsrNestedInput
    transfers?: TransferRecordUncheckedUpdateManyWithoutDsrNestedInput
  }

  export type DSRCreateManyInput = {
    id?: number
    accountNumber: string
    fullName: string
    email?: string | null
    secondaryNumber?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    address?: string | null
    educationLevel?: $Enums.EducationLevel | null
    educationInstitution?: string | null
    educationYear?: number | null
    employmentDate?: Date | string | null
    employmentStatus?: $Enums.EmploymentStatus
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
  }

  export type DSRUpdateManyMutationInput = {
    accountNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    educationInstitution?: NullableStringFieldUpdateOperationsInput | string | null
    educationYear?: NullableIntFieldUpdateOperationsInput | number | null
    employmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentStatus?: EnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DSRUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    accountNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    educationInstitution?: NullableStringFieldUpdateOperationsInput | string | null
    educationYear?: NullableIntFieldUpdateOperationsInput | number | null
    employmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentStatus?: EnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AssignmentCreateInput = {
    startDate: Date | string
    endDate?: Date | string | null
    status?: $Enums.AssignmentStatus
    teamName?: string | null
    role?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dsr: DSRCreateNestedOneWithoutAssignmentsInput
    shop: ShopCreateNestedOneWithoutAssignmentsInput
  }

  export type AssignmentUncheckedCreateInput = {
    id?: number
    dsrId: number
    shopId: number
    startDate: Date | string
    endDate?: Date | string | null
    status?: $Enums.AssignmentStatus
    teamName?: string | null
    role?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssignmentUpdateInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    teamName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dsr?: DSRUpdateOneRequiredWithoutAssignmentsNestedInput
    shop?: ShopUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type AssignmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    shopId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    teamName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssignmentCreateManyInput = {
    id?: number
    dsrId: number
    shopId: number
    startDate: Date | string
    endDate?: Date | string | null
    status?: $Enums.AssignmentStatus
    teamName?: string | null
    role?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssignmentUpdateManyMutationInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    teamName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssignmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    shopId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    teamName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferRecordCreateInput = {
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dsr: DSRCreateNestedOneWithoutTransfersInput
    fromShop: ShopCreateNestedOneWithoutTransfersFromInput
    toShop: ShopCreateNestedOneWithoutTransfersToInput
    approvedBy?: UserCreateNestedOneWithoutApprovedTransfersInput
  }

  export type TransferRecordUncheckedCreateInput = {
    id?: number
    dsrId: number
    fromShopId: number
    toShopId: number
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    approvedById?: number | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferRecordUpdateInput = {
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dsr?: DSRUpdateOneRequiredWithoutTransfersNestedInput
    fromShop?: ShopUpdateOneRequiredWithoutTransfersFromNestedInput
    toShop?: ShopUpdateOneRequiredWithoutTransfersToNestedInput
    approvedBy?: UserUpdateOneWithoutApprovedTransfersNestedInput
  }

  export type TransferRecordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    fromShopId?: IntFieldUpdateOperationsInput | number
    toShopId?: IntFieldUpdateOperationsInput | number
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableIntFieldUpdateOperationsInput | number | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferRecordCreateManyInput = {
    id?: number
    dsrId: number
    fromShopId: number
    toShopId: number
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    approvedById?: number | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferRecordUpdateManyMutationInput = {
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferRecordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    fromShopId?: IntFieldUpdateOperationsInput | number
    toShopId?: IntFieldUpdateOperationsInput | number
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableIntFieldUpdateOperationsInput | number | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalesRecordCreateInput = {
    saleDate: Date | string
    devicesSold?: number
    remarks?: string | null
    dataSource?: $Enums.DataSource
    externalId?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dsr: DSRCreateNestedOneWithoutSalesRecordsInput
    shop: ShopCreateNestedOneWithoutSalesRecordsInput
    verifiedBy?: UserCreateNestedOneWithoutVerifiedSalesRecordsInput
  }

  export type SalesRecordUncheckedCreateInput = {
    id?: number
    dsrId: number
    shopId: number
    saleDate: Date | string
    devicesSold?: number
    remarks?: string | null
    dataSource?: $Enums.DataSource
    externalId?: string | null
    verified?: boolean
    verifiedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalesRecordUpdateInput = {
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dsr?: DSRUpdateOneRequiredWithoutSalesRecordsNestedInput
    shop?: ShopUpdateOneRequiredWithoutSalesRecordsNestedInput
    verifiedBy?: UserUpdateOneWithoutVerifiedSalesRecordsNestedInput
  }

  export type SalesRecordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    shopId?: IntFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    verifiedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalesRecordCreateManyInput = {
    id?: number
    dsrId: number
    shopId: number
    saleDate: Date | string
    devicesSold?: number
    remarks?: string | null
    dataSource?: $Enums.DataSource
    externalId?: string | null
    verified?: boolean
    verifiedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalesRecordUpdateManyMutationInput = {
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalesRecordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    shopId?: IntFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    verifiedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicHolidayCreateInput = {
    date: Date | string
    name: string
    countryCode?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicHolidayUncheckedCreateInput = {
    id?: number
    date: Date | string
    name: string
    countryCode?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicHolidayUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicHolidayUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicHolidayCreateManyInput = {
    id?: number
    date: Date | string
    name: string
    countryCode?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicHolidayUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicHolidayUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    countryCode?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type SalesRecordListRelationFilter = {
    every?: SalesRecordWhereInput
    some?: SalesRecordWhereInput
    none?: SalesRecordWhereInput
  }

  export type TransferRecordListRelationFilter = {
    every?: TransferRecordWhereInput
    some?: TransferRecordWhereInput
    none?: TransferRecordWhereInput
  }

  export type SalesRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransferRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    hashedPassword?: SortOrder
    isActive?: SortOrder
    isSuperuser?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    hashedPassword?: SortOrder
    isActive?: SortOrder
    isSuperuser?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    hashedPassword?: SortOrder
    isActive?: SortOrder
    isSuperuser?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type AssignmentListRelationFilter = {
    every?: AssignmentWhereInput
    some?: AssignmentWhereInput
    none?: AssignmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShopUq_shop_name_locationCompoundUniqueInput = {
    name: string
    location: string
  }

  export type ShopCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    region?: SortOrder
    district?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ShopAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ShopMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    region?: SortOrder
    district?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ShopMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    location?: SortOrder
    region?: SortOrder
    district?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type ShopSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type EnumEducationLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEducationLevelNullableFilter<$PrismaModel> | $Enums.EducationLevel | null
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

  export type EnumEmploymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentStatus | EnumEmploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmploymentStatusFilter<$PrismaModel> | $Enums.EmploymentStatus
  }

  export type DSRCountOrderByAggregateInput = {
    id?: SortOrder
    accountNumber?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    secondaryNumber?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    address?: SortOrder
    educationLevel?: SortOrder
    educationInstitution?: SortOrder
    educationYear?: SortOrder
    employmentDate?: SortOrder
    employmentStatus?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type DSRAvgOrderByAggregateInput = {
    id?: SortOrder
    educationYear?: SortOrder
  }

  export type DSRMaxOrderByAggregateInput = {
    id?: SortOrder
    accountNumber?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    secondaryNumber?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    address?: SortOrder
    educationLevel?: SortOrder
    educationInstitution?: SortOrder
    educationYear?: SortOrder
    employmentDate?: SortOrder
    employmentStatus?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type DSRMinOrderByAggregateInput = {
    id?: SortOrder
    accountNumber?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    secondaryNumber?: SortOrder
    dateOfBirth?: SortOrder
    gender?: SortOrder
    address?: SortOrder
    educationLevel?: SortOrder
    educationInstitution?: SortOrder
    educationYear?: SortOrder
    employmentDate?: SortOrder
    employmentStatus?: SortOrder
    emergencyContactName?: SortOrder
    emergencyContactPhone?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    deletedAt?: SortOrder
  }

  export type DSRSumOrderByAggregateInput = {
    id?: SortOrder
    educationYear?: SortOrder
  }

  export type EnumEducationLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEducationLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.EducationLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEducationLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumEducationLevelNullableFilter<$PrismaModel>
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

  export type EnumEmploymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentStatus | EnumEmploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmploymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmploymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmploymentStatusFilter<$PrismaModel>
    _max?: NestedEnumEmploymentStatusFilter<$PrismaModel>
  }

  export type EnumAssignmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentStatus | EnumAssignmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentStatusFilter<$PrismaModel> | $Enums.AssignmentStatus
  }

  export type DSRScalarRelationFilter = {
    is?: DSRWhereInput
    isNot?: DSRWhereInput
  }

  export type ShopScalarRelationFilter = {
    is?: ShopWhereInput
    isNot?: ShopWhereInput
  }

  export type AssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    teamName?: SortOrder
    role?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssignmentAvgOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
  }

  export type AssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    teamName?: SortOrder
    role?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    teamName?: SortOrder
    role?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AssignmentSumOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
  }

  export type EnumAssignmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentStatus | EnumAssignmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AssignmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssignmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAssignmentStatusFilter<$PrismaModel>
  }

  export type EnumTransferReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.TransferReason | EnumTransferReasonFieldRefInput<$PrismaModel>
    in?: $Enums.TransferReason[] | ListEnumTransferReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransferReason[] | ListEnumTransferReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumTransferReasonFilter<$PrismaModel> | $Enums.TransferReason
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TransferRecordCountOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    fromShopId?: SortOrder
    toShopId?: SortOrder
    transferDate?: SortOrder
    reason?: SortOrder
    reasonDetail?: SortOrder
    approvedById?: SortOrder
    effectivenessScore?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransferRecordAvgOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    fromShopId?: SortOrder
    toShopId?: SortOrder
    approvedById?: SortOrder
    effectivenessScore?: SortOrder
  }

  export type TransferRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    fromShopId?: SortOrder
    toShopId?: SortOrder
    transferDate?: SortOrder
    reason?: SortOrder
    reasonDetail?: SortOrder
    approvedById?: SortOrder
    effectivenessScore?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransferRecordMinOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    fromShopId?: SortOrder
    toShopId?: SortOrder
    transferDate?: SortOrder
    reason?: SortOrder
    reasonDetail?: SortOrder
    approvedById?: SortOrder
    effectivenessScore?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransferRecordSumOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    fromShopId?: SortOrder
    toShopId?: SortOrder
    approvedById?: SortOrder
    effectivenessScore?: SortOrder
  }

  export type EnumTransferReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransferReason | EnumTransferReasonFieldRefInput<$PrismaModel>
    in?: $Enums.TransferReason[] | ListEnumTransferReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransferReason[] | ListEnumTransferReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumTransferReasonWithAggregatesFilter<$PrismaModel> | $Enums.TransferReason
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransferReasonFilter<$PrismaModel>
    _max?: NestedEnumTransferReasonFilter<$PrismaModel>
  }

  export type EnumDataSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.DataSource | EnumDataSourceFieldRefInput<$PrismaModel>
    in?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumDataSourceFilter<$PrismaModel> | $Enums.DataSource
  }

  export type SalesRecordCountOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
    saleDate?: SortOrder
    devicesSold?: SortOrder
    remarks?: SortOrder
    dataSource?: SortOrder
    externalId?: SortOrder
    verified?: SortOrder
    verifiedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SalesRecordAvgOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
    devicesSold?: SortOrder
    verifiedById?: SortOrder
  }

  export type SalesRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
    saleDate?: SortOrder
    devicesSold?: SortOrder
    remarks?: SortOrder
    dataSource?: SortOrder
    externalId?: SortOrder
    verified?: SortOrder
    verifiedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SalesRecordMinOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
    saleDate?: SortOrder
    devicesSold?: SortOrder
    remarks?: SortOrder
    dataSource?: SortOrder
    externalId?: SortOrder
    verified?: SortOrder
    verifiedById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SalesRecordSumOrderByAggregateInput = {
    id?: SortOrder
    dsrId?: SortOrder
    shopId?: SortOrder
    devicesSold?: SortOrder
    verifiedById?: SortOrder
  }

  export type EnumDataSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DataSource | EnumDataSourceFieldRefInput<$PrismaModel>
    in?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumDataSourceWithAggregatesFilter<$PrismaModel> | $Enums.DataSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDataSourceFilter<$PrismaModel>
    _max?: NestedEnumDataSourceFilter<$PrismaModel>
  }

  export type PublicHolidayCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    name?: SortOrder
    countryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicHolidayAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PublicHolidayMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    name?: SortOrder
    countryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicHolidayMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    name?: SortOrder
    countryCode?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicHolidaySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SalesRecordCreateNestedManyWithoutVerifiedByInput = {
    create?: XOR<SalesRecordCreateWithoutVerifiedByInput, SalesRecordUncheckedCreateWithoutVerifiedByInput> | SalesRecordCreateWithoutVerifiedByInput[] | SalesRecordUncheckedCreateWithoutVerifiedByInput[]
    connectOrCreate?: SalesRecordCreateOrConnectWithoutVerifiedByInput | SalesRecordCreateOrConnectWithoutVerifiedByInput[]
    createMany?: SalesRecordCreateManyVerifiedByInputEnvelope
    connect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
  }

  export type TransferRecordCreateNestedManyWithoutApprovedByInput = {
    create?: XOR<TransferRecordCreateWithoutApprovedByInput, TransferRecordUncheckedCreateWithoutApprovedByInput> | TransferRecordCreateWithoutApprovedByInput[] | TransferRecordUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutApprovedByInput | TransferRecordCreateOrConnectWithoutApprovedByInput[]
    createMany?: TransferRecordCreateManyApprovedByInputEnvelope
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
  }

  export type SalesRecordUncheckedCreateNestedManyWithoutVerifiedByInput = {
    create?: XOR<SalesRecordCreateWithoutVerifiedByInput, SalesRecordUncheckedCreateWithoutVerifiedByInput> | SalesRecordCreateWithoutVerifiedByInput[] | SalesRecordUncheckedCreateWithoutVerifiedByInput[]
    connectOrCreate?: SalesRecordCreateOrConnectWithoutVerifiedByInput | SalesRecordCreateOrConnectWithoutVerifiedByInput[]
    createMany?: SalesRecordCreateManyVerifiedByInputEnvelope
    connect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
  }

  export type TransferRecordUncheckedCreateNestedManyWithoutApprovedByInput = {
    create?: XOR<TransferRecordCreateWithoutApprovedByInput, TransferRecordUncheckedCreateWithoutApprovedByInput> | TransferRecordCreateWithoutApprovedByInput[] | TransferRecordUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutApprovedByInput | TransferRecordCreateOrConnectWithoutApprovedByInput[]
    createMany?: TransferRecordCreateManyApprovedByInputEnvelope
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SalesRecordUpdateManyWithoutVerifiedByNestedInput = {
    create?: XOR<SalesRecordCreateWithoutVerifiedByInput, SalesRecordUncheckedCreateWithoutVerifiedByInput> | SalesRecordCreateWithoutVerifiedByInput[] | SalesRecordUncheckedCreateWithoutVerifiedByInput[]
    connectOrCreate?: SalesRecordCreateOrConnectWithoutVerifiedByInput | SalesRecordCreateOrConnectWithoutVerifiedByInput[]
    upsert?: SalesRecordUpsertWithWhereUniqueWithoutVerifiedByInput | SalesRecordUpsertWithWhereUniqueWithoutVerifiedByInput[]
    createMany?: SalesRecordCreateManyVerifiedByInputEnvelope
    set?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    disconnect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    delete?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    connect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    update?: SalesRecordUpdateWithWhereUniqueWithoutVerifiedByInput | SalesRecordUpdateWithWhereUniqueWithoutVerifiedByInput[]
    updateMany?: SalesRecordUpdateManyWithWhereWithoutVerifiedByInput | SalesRecordUpdateManyWithWhereWithoutVerifiedByInput[]
    deleteMany?: SalesRecordScalarWhereInput | SalesRecordScalarWhereInput[]
  }

  export type TransferRecordUpdateManyWithoutApprovedByNestedInput = {
    create?: XOR<TransferRecordCreateWithoutApprovedByInput, TransferRecordUncheckedCreateWithoutApprovedByInput> | TransferRecordCreateWithoutApprovedByInput[] | TransferRecordUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutApprovedByInput | TransferRecordCreateOrConnectWithoutApprovedByInput[]
    upsert?: TransferRecordUpsertWithWhereUniqueWithoutApprovedByInput | TransferRecordUpsertWithWhereUniqueWithoutApprovedByInput[]
    createMany?: TransferRecordCreateManyApprovedByInputEnvelope
    set?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    disconnect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    delete?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    update?: TransferRecordUpdateWithWhereUniqueWithoutApprovedByInput | TransferRecordUpdateWithWhereUniqueWithoutApprovedByInput[]
    updateMany?: TransferRecordUpdateManyWithWhereWithoutApprovedByInput | TransferRecordUpdateManyWithWhereWithoutApprovedByInput[]
    deleteMany?: TransferRecordScalarWhereInput | TransferRecordScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SalesRecordUncheckedUpdateManyWithoutVerifiedByNestedInput = {
    create?: XOR<SalesRecordCreateWithoutVerifiedByInput, SalesRecordUncheckedCreateWithoutVerifiedByInput> | SalesRecordCreateWithoutVerifiedByInput[] | SalesRecordUncheckedCreateWithoutVerifiedByInput[]
    connectOrCreate?: SalesRecordCreateOrConnectWithoutVerifiedByInput | SalesRecordCreateOrConnectWithoutVerifiedByInput[]
    upsert?: SalesRecordUpsertWithWhereUniqueWithoutVerifiedByInput | SalesRecordUpsertWithWhereUniqueWithoutVerifiedByInput[]
    createMany?: SalesRecordCreateManyVerifiedByInputEnvelope
    set?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    disconnect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    delete?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    connect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    update?: SalesRecordUpdateWithWhereUniqueWithoutVerifiedByInput | SalesRecordUpdateWithWhereUniqueWithoutVerifiedByInput[]
    updateMany?: SalesRecordUpdateManyWithWhereWithoutVerifiedByInput | SalesRecordUpdateManyWithWhereWithoutVerifiedByInput[]
    deleteMany?: SalesRecordScalarWhereInput | SalesRecordScalarWhereInput[]
  }

  export type TransferRecordUncheckedUpdateManyWithoutApprovedByNestedInput = {
    create?: XOR<TransferRecordCreateWithoutApprovedByInput, TransferRecordUncheckedCreateWithoutApprovedByInput> | TransferRecordCreateWithoutApprovedByInput[] | TransferRecordUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutApprovedByInput | TransferRecordCreateOrConnectWithoutApprovedByInput[]
    upsert?: TransferRecordUpsertWithWhereUniqueWithoutApprovedByInput | TransferRecordUpsertWithWhereUniqueWithoutApprovedByInput[]
    createMany?: TransferRecordCreateManyApprovedByInputEnvelope
    set?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    disconnect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    delete?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    update?: TransferRecordUpdateWithWhereUniqueWithoutApprovedByInput | TransferRecordUpdateWithWhereUniqueWithoutApprovedByInput[]
    updateMany?: TransferRecordUpdateManyWithWhereWithoutApprovedByInput | TransferRecordUpdateManyWithWhereWithoutApprovedByInput[]
    deleteMany?: TransferRecordScalarWhereInput | TransferRecordScalarWhereInput[]
  }

  export type AssignmentCreateNestedManyWithoutShopInput = {
    create?: XOR<AssignmentCreateWithoutShopInput, AssignmentUncheckedCreateWithoutShopInput> | AssignmentCreateWithoutShopInput[] | AssignmentUncheckedCreateWithoutShopInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutShopInput | AssignmentCreateOrConnectWithoutShopInput[]
    createMany?: AssignmentCreateManyShopInputEnvelope
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
  }

  export type SalesRecordCreateNestedManyWithoutShopInput = {
    create?: XOR<SalesRecordCreateWithoutShopInput, SalesRecordUncheckedCreateWithoutShopInput> | SalesRecordCreateWithoutShopInput[] | SalesRecordUncheckedCreateWithoutShopInput[]
    connectOrCreate?: SalesRecordCreateOrConnectWithoutShopInput | SalesRecordCreateOrConnectWithoutShopInput[]
    createMany?: SalesRecordCreateManyShopInputEnvelope
    connect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
  }

  export type TransferRecordCreateNestedManyWithoutFromShopInput = {
    create?: XOR<TransferRecordCreateWithoutFromShopInput, TransferRecordUncheckedCreateWithoutFromShopInput> | TransferRecordCreateWithoutFromShopInput[] | TransferRecordUncheckedCreateWithoutFromShopInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutFromShopInput | TransferRecordCreateOrConnectWithoutFromShopInput[]
    createMany?: TransferRecordCreateManyFromShopInputEnvelope
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
  }

  export type TransferRecordCreateNestedManyWithoutToShopInput = {
    create?: XOR<TransferRecordCreateWithoutToShopInput, TransferRecordUncheckedCreateWithoutToShopInput> | TransferRecordCreateWithoutToShopInput[] | TransferRecordUncheckedCreateWithoutToShopInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutToShopInput | TransferRecordCreateOrConnectWithoutToShopInput[]
    createMany?: TransferRecordCreateManyToShopInputEnvelope
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
  }

  export type AssignmentUncheckedCreateNestedManyWithoutShopInput = {
    create?: XOR<AssignmentCreateWithoutShopInput, AssignmentUncheckedCreateWithoutShopInput> | AssignmentCreateWithoutShopInput[] | AssignmentUncheckedCreateWithoutShopInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutShopInput | AssignmentCreateOrConnectWithoutShopInput[]
    createMany?: AssignmentCreateManyShopInputEnvelope
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
  }

  export type SalesRecordUncheckedCreateNestedManyWithoutShopInput = {
    create?: XOR<SalesRecordCreateWithoutShopInput, SalesRecordUncheckedCreateWithoutShopInput> | SalesRecordCreateWithoutShopInput[] | SalesRecordUncheckedCreateWithoutShopInput[]
    connectOrCreate?: SalesRecordCreateOrConnectWithoutShopInput | SalesRecordCreateOrConnectWithoutShopInput[]
    createMany?: SalesRecordCreateManyShopInputEnvelope
    connect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
  }

  export type TransferRecordUncheckedCreateNestedManyWithoutFromShopInput = {
    create?: XOR<TransferRecordCreateWithoutFromShopInput, TransferRecordUncheckedCreateWithoutFromShopInput> | TransferRecordCreateWithoutFromShopInput[] | TransferRecordUncheckedCreateWithoutFromShopInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutFromShopInput | TransferRecordCreateOrConnectWithoutFromShopInput[]
    createMany?: TransferRecordCreateManyFromShopInputEnvelope
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
  }

  export type TransferRecordUncheckedCreateNestedManyWithoutToShopInput = {
    create?: XOR<TransferRecordCreateWithoutToShopInput, TransferRecordUncheckedCreateWithoutToShopInput> | TransferRecordCreateWithoutToShopInput[] | TransferRecordUncheckedCreateWithoutToShopInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutToShopInput | TransferRecordCreateOrConnectWithoutToShopInput[]
    createMany?: TransferRecordCreateManyToShopInputEnvelope
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AssignmentUpdateManyWithoutShopNestedInput = {
    create?: XOR<AssignmentCreateWithoutShopInput, AssignmentUncheckedCreateWithoutShopInput> | AssignmentCreateWithoutShopInput[] | AssignmentUncheckedCreateWithoutShopInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutShopInput | AssignmentCreateOrConnectWithoutShopInput[]
    upsert?: AssignmentUpsertWithWhereUniqueWithoutShopInput | AssignmentUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: AssignmentCreateManyShopInputEnvelope
    set?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    disconnect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    delete?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    update?: AssignmentUpdateWithWhereUniqueWithoutShopInput | AssignmentUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: AssignmentUpdateManyWithWhereWithoutShopInput | AssignmentUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
  }

  export type SalesRecordUpdateManyWithoutShopNestedInput = {
    create?: XOR<SalesRecordCreateWithoutShopInput, SalesRecordUncheckedCreateWithoutShopInput> | SalesRecordCreateWithoutShopInput[] | SalesRecordUncheckedCreateWithoutShopInput[]
    connectOrCreate?: SalesRecordCreateOrConnectWithoutShopInput | SalesRecordCreateOrConnectWithoutShopInput[]
    upsert?: SalesRecordUpsertWithWhereUniqueWithoutShopInput | SalesRecordUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: SalesRecordCreateManyShopInputEnvelope
    set?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    disconnect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    delete?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    connect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    update?: SalesRecordUpdateWithWhereUniqueWithoutShopInput | SalesRecordUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: SalesRecordUpdateManyWithWhereWithoutShopInput | SalesRecordUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: SalesRecordScalarWhereInput | SalesRecordScalarWhereInput[]
  }

  export type TransferRecordUpdateManyWithoutFromShopNestedInput = {
    create?: XOR<TransferRecordCreateWithoutFromShopInput, TransferRecordUncheckedCreateWithoutFromShopInput> | TransferRecordCreateWithoutFromShopInput[] | TransferRecordUncheckedCreateWithoutFromShopInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutFromShopInput | TransferRecordCreateOrConnectWithoutFromShopInput[]
    upsert?: TransferRecordUpsertWithWhereUniqueWithoutFromShopInput | TransferRecordUpsertWithWhereUniqueWithoutFromShopInput[]
    createMany?: TransferRecordCreateManyFromShopInputEnvelope
    set?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    disconnect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    delete?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    update?: TransferRecordUpdateWithWhereUniqueWithoutFromShopInput | TransferRecordUpdateWithWhereUniqueWithoutFromShopInput[]
    updateMany?: TransferRecordUpdateManyWithWhereWithoutFromShopInput | TransferRecordUpdateManyWithWhereWithoutFromShopInput[]
    deleteMany?: TransferRecordScalarWhereInput | TransferRecordScalarWhereInput[]
  }

  export type TransferRecordUpdateManyWithoutToShopNestedInput = {
    create?: XOR<TransferRecordCreateWithoutToShopInput, TransferRecordUncheckedCreateWithoutToShopInput> | TransferRecordCreateWithoutToShopInput[] | TransferRecordUncheckedCreateWithoutToShopInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutToShopInput | TransferRecordCreateOrConnectWithoutToShopInput[]
    upsert?: TransferRecordUpsertWithWhereUniqueWithoutToShopInput | TransferRecordUpsertWithWhereUniqueWithoutToShopInput[]
    createMany?: TransferRecordCreateManyToShopInputEnvelope
    set?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    disconnect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    delete?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    update?: TransferRecordUpdateWithWhereUniqueWithoutToShopInput | TransferRecordUpdateWithWhereUniqueWithoutToShopInput[]
    updateMany?: TransferRecordUpdateManyWithWhereWithoutToShopInput | TransferRecordUpdateManyWithWhereWithoutToShopInput[]
    deleteMany?: TransferRecordScalarWhereInput | TransferRecordScalarWhereInput[]
  }

  export type AssignmentUncheckedUpdateManyWithoutShopNestedInput = {
    create?: XOR<AssignmentCreateWithoutShopInput, AssignmentUncheckedCreateWithoutShopInput> | AssignmentCreateWithoutShopInput[] | AssignmentUncheckedCreateWithoutShopInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutShopInput | AssignmentCreateOrConnectWithoutShopInput[]
    upsert?: AssignmentUpsertWithWhereUniqueWithoutShopInput | AssignmentUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: AssignmentCreateManyShopInputEnvelope
    set?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    disconnect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    delete?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    update?: AssignmentUpdateWithWhereUniqueWithoutShopInput | AssignmentUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: AssignmentUpdateManyWithWhereWithoutShopInput | AssignmentUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
  }

  export type SalesRecordUncheckedUpdateManyWithoutShopNestedInput = {
    create?: XOR<SalesRecordCreateWithoutShopInput, SalesRecordUncheckedCreateWithoutShopInput> | SalesRecordCreateWithoutShopInput[] | SalesRecordUncheckedCreateWithoutShopInput[]
    connectOrCreate?: SalesRecordCreateOrConnectWithoutShopInput | SalesRecordCreateOrConnectWithoutShopInput[]
    upsert?: SalesRecordUpsertWithWhereUniqueWithoutShopInput | SalesRecordUpsertWithWhereUniqueWithoutShopInput[]
    createMany?: SalesRecordCreateManyShopInputEnvelope
    set?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    disconnect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    delete?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    connect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    update?: SalesRecordUpdateWithWhereUniqueWithoutShopInput | SalesRecordUpdateWithWhereUniqueWithoutShopInput[]
    updateMany?: SalesRecordUpdateManyWithWhereWithoutShopInput | SalesRecordUpdateManyWithWhereWithoutShopInput[]
    deleteMany?: SalesRecordScalarWhereInput | SalesRecordScalarWhereInput[]
  }

  export type TransferRecordUncheckedUpdateManyWithoutFromShopNestedInput = {
    create?: XOR<TransferRecordCreateWithoutFromShopInput, TransferRecordUncheckedCreateWithoutFromShopInput> | TransferRecordCreateWithoutFromShopInput[] | TransferRecordUncheckedCreateWithoutFromShopInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutFromShopInput | TransferRecordCreateOrConnectWithoutFromShopInput[]
    upsert?: TransferRecordUpsertWithWhereUniqueWithoutFromShopInput | TransferRecordUpsertWithWhereUniqueWithoutFromShopInput[]
    createMany?: TransferRecordCreateManyFromShopInputEnvelope
    set?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    disconnect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    delete?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    update?: TransferRecordUpdateWithWhereUniqueWithoutFromShopInput | TransferRecordUpdateWithWhereUniqueWithoutFromShopInput[]
    updateMany?: TransferRecordUpdateManyWithWhereWithoutFromShopInput | TransferRecordUpdateManyWithWhereWithoutFromShopInput[]
    deleteMany?: TransferRecordScalarWhereInput | TransferRecordScalarWhereInput[]
  }

  export type TransferRecordUncheckedUpdateManyWithoutToShopNestedInput = {
    create?: XOR<TransferRecordCreateWithoutToShopInput, TransferRecordUncheckedCreateWithoutToShopInput> | TransferRecordCreateWithoutToShopInput[] | TransferRecordUncheckedCreateWithoutToShopInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutToShopInput | TransferRecordCreateOrConnectWithoutToShopInput[]
    upsert?: TransferRecordUpsertWithWhereUniqueWithoutToShopInput | TransferRecordUpsertWithWhereUniqueWithoutToShopInput[]
    createMany?: TransferRecordCreateManyToShopInputEnvelope
    set?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    disconnect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    delete?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    update?: TransferRecordUpdateWithWhereUniqueWithoutToShopInput | TransferRecordUpdateWithWhereUniqueWithoutToShopInput[]
    updateMany?: TransferRecordUpdateManyWithWhereWithoutToShopInput | TransferRecordUpdateManyWithWhereWithoutToShopInput[]
    deleteMany?: TransferRecordScalarWhereInput | TransferRecordScalarWhereInput[]
  }

  export type AssignmentCreateNestedManyWithoutDsrInput = {
    create?: XOR<AssignmentCreateWithoutDsrInput, AssignmentUncheckedCreateWithoutDsrInput> | AssignmentCreateWithoutDsrInput[] | AssignmentUncheckedCreateWithoutDsrInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutDsrInput | AssignmentCreateOrConnectWithoutDsrInput[]
    createMany?: AssignmentCreateManyDsrInputEnvelope
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
  }

  export type SalesRecordCreateNestedManyWithoutDsrInput = {
    create?: XOR<SalesRecordCreateWithoutDsrInput, SalesRecordUncheckedCreateWithoutDsrInput> | SalesRecordCreateWithoutDsrInput[] | SalesRecordUncheckedCreateWithoutDsrInput[]
    connectOrCreate?: SalesRecordCreateOrConnectWithoutDsrInput | SalesRecordCreateOrConnectWithoutDsrInput[]
    createMany?: SalesRecordCreateManyDsrInputEnvelope
    connect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
  }

  export type TransferRecordCreateNestedManyWithoutDsrInput = {
    create?: XOR<TransferRecordCreateWithoutDsrInput, TransferRecordUncheckedCreateWithoutDsrInput> | TransferRecordCreateWithoutDsrInput[] | TransferRecordUncheckedCreateWithoutDsrInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutDsrInput | TransferRecordCreateOrConnectWithoutDsrInput[]
    createMany?: TransferRecordCreateManyDsrInputEnvelope
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
  }

  export type AssignmentUncheckedCreateNestedManyWithoutDsrInput = {
    create?: XOR<AssignmentCreateWithoutDsrInput, AssignmentUncheckedCreateWithoutDsrInput> | AssignmentCreateWithoutDsrInput[] | AssignmentUncheckedCreateWithoutDsrInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutDsrInput | AssignmentCreateOrConnectWithoutDsrInput[]
    createMany?: AssignmentCreateManyDsrInputEnvelope
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
  }

  export type SalesRecordUncheckedCreateNestedManyWithoutDsrInput = {
    create?: XOR<SalesRecordCreateWithoutDsrInput, SalesRecordUncheckedCreateWithoutDsrInput> | SalesRecordCreateWithoutDsrInput[] | SalesRecordUncheckedCreateWithoutDsrInput[]
    connectOrCreate?: SalesRecordCreateOrConnectWithoutDsrInput | SalesRecordCreateOrConnectWithoutDsrInput[]
    createMany?: SalesRecordCreateManyDsrInputEnvelope
    connect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
  }

  export type TransferRecordUncheckedCreateNestedManyWithoutDsrInput = {
    create?: XOR<TransferRecordCreateWithoutDsrInput, TransferRecordUncheckedCreateWithoutDsrInput> | TransferRecordCreateWithoutDsrInput[] | TransferRecordUncheckedCreateWithoutDsrInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutDsrInput | TransferRecordCreateOrConnectWithoutDsrInput[]
    createMany?: TransferRecordCreateManyDsrInputEnvelope
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
  }

  export type NullableEnumEducationLevelFieldUpdateOperationsInput = {
    set?: $Enums.EducationLevel | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumEmploymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.EmploymentStatus
  }

  export type AssignmentUpdateManyWithoutDsrNestedInput = {
    create?: XOR<AssignmentCreateWithoutDsrInput, AssignmentUncheckedCreateWithoutDsrInput> | AssignmentCreateWithoutDsrInput[] | AssignmentUncheckedCreateWithoutDsrInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutDsrInput | AssignmentCreateOrConnectWithoutDsrInput[]
    upsert?: AssignmentUpsertWithWhereUniqueWithoutDsrInput | AssignmentUpsertWithWhereUniqueWithoutDsrInput[]
    createMany?: AssignmentCreateManyDsrInputEnvelope
    set?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    disconnect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    delete?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    update?: AssignmentUpdateWithWhereUniqueWithoutDsrInput | AssignmentUpdateWithWhereUniqueWithoutDsrInput[]
    updateMany?: AssignmentUpdateManyWithWhereWithoutDsrInput | AssignmentUpdateManyWithWhereWithoutDsrInput[]
    deleteMany?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
  }

  export type SalesRecordUpdateManyWithoutDsrNestedInput = {
    create?: XOR<SalesRecordCreateWithoutDsrInput, SalesRecordUncheckedCreateWithoutDsrInput> | SalesRecordCreateWithoutDsrInput[] | SalesRecordUncheckedCreateWithoutDsrInput[]
    connectOrCreate?: SalesRecordCreateOrConnectWithoutDsrInput | SalesRecordCreateOrConnectWithoutDsrInput[]
    upsert?: SalesRecordUpsertWithWhereUniqueWithoutDsrInput | SalesRecordUpsertWithWhereUniqueWithoutDsrInput[]
    createMany?: SalesRecordCreateManyDsrInputEnvelope
    set?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    disconnect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    delete?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    connect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    update?: SalesRecordUpdateWithWhereUniqueWithoutDsrInput | SalesRecordUpdateWithWhereUniqueWithoutDsrInput[]
    updateMany?: SalesRecordUpdateManyWithWhereWithoutDsrInput | SalesRecordUpdateManyWithWhereWithoutDsrInput[]
    deleteMany?: SalesRecordScalarWhereInput | SalesRecordScalarWhereInput[]
  }

  export type TransferRecordUpdateManyWithoutDsrNestedInput = {
    create?: XOR<TransferRecordCreateWithoutDsrInput, TransferRecordUncheckedCreateWithoutDsrInput> | TransferRecordCreateWithoutDsrInput[] | TransferRecordUncheckedCreateWithoutDsrInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutDsrInput | TransferRecordCreateOrConnectWithoutDsrInput[]
    upsert?: TransferRecordUpsertWithWhereUniqueWithoutDsrInput | TransferRecordUpsertWithWhereUniqueWithoutDsrInput[]
    createMany?: TransferRecordCreateManyDsrInputEnvelope
    set?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    disconnect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    delete?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    update?: TransferRecordUpdateWithWhereUniqueWithoutDsrInput | TransferRecordUpdateWithWhereUniqueWithoutDsrInput[]
    updateMany?: TransferRecordUpdateManyWithWhereWithoutDsrInput | TransferRecordUpdateManyWithWhereWithoutDsrInput[]
    deleteMany?: TransferRecordScalarWhereInput | TransferRecordScalarWhereInput[]
  }

  export type AssignmentUncheckedUpdateManyWithoutDsrNestedInput = {
    create?: XOR<AssignmentCreateWithoutDsrInput, AssignmentUncheckedCreateWithoutDsrInput> | AssignmentCreateWithoutDsrInput[] | AssignmentUncheckedCreateWithoutDsrInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutDsrInput | AssignmentCreateOrConnectWithoutDsrInput[]
    upsert?: AssignmentUpsertWithWhereUniqueWithoutDsrInput | AssignmentUpsertWithWhereUniqueWithoutDsrInput[]
    createMany?: AssignmentCreateManyDsrInputEnvelope
    set?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    disconnect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    delete?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    update?: AssignmentUpdateWithWhereUniqueWithoutDsrInput | AssignmentUpdateWithWhereUniqueWithoutDsrInput[]
    updateMany?: AssignmentUpdateManyWithWhereWithoutDsrInput | AssignmentUpdateManyWithWhereWithoutDsrInput[]
    deleteMany?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
  }

  export type SalesRecordUncheckedUpdateManyWithoutDsrNestedInput = {
    create?: XOR<SalesRecordCreateWithoutDsrInput, SalesRecordUncheckedCreateWithoutDsrInput> | SalesRecordCreateWithoutDsrInput[] | SalesRecordUncheckedCreateWithoutDsrInput[]
    connectOrCreate?: SalesRecordCreateOrConnectWithoutDsrInput | SalesRecordCreateOrConnectWithoutDsrInput[]
    upsert?: SalesRecordUpsertWithWhereUniqueWithoutDsrInput | SalesRecordUpsertWithWhereUniqueWithoutDsrInput[]
    createMany?: SalesRecordCreateManyDsrInputEnvelope
    set?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    disconnect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    delete?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    connect?: SalesRecordWhereUniqueInput | SalesRecordWhereUniqueInput[]
    update?: SalesRecordUpdateWithWhereUniqueWithoutDsrInput | SalesRecordUpdateWithWhereUniqueWithoutDsrInput[]
    updateMany?: SalesRecordUpdateManyWithWhereWithoutDsrInput | SalesRecordUpdateManyWithWhereWithoutDsrInput[]
    deleteMany?: SalesRecordScalarWhereInput | SalesRecordScalarWhereInput[]
  }

  export type TransferRecordUncheckedUpdateManyWithoutDsrNestedInput = {
    create?: XOR<TransferRecordCreateWithoutDsrInput, TransferRecordUncheckedCreateWithoutDsrInput> | TransferRecordCreateWithoutDsrInput[] | TransferRecordUncheckedCreateWithoutDsrInput[]
    connectOrCreate?: TransferRecordCreateOrConnectWithoutDsrInput | TransferRecordCreateOrConnectWithoutDsrInput[]
    upsert?: TransferRecordUpsertWithWhereUniqueWithoutDsrInput | TransferRecordUpsertWithWhereUniqueWithoutDsrInput[]
    createMany?: TransferRecordCreateManyDsrInputEnvelope
    set?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    disconnect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    delete?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    connect?: TransferRecordWhereUniqueInput | TransferRecordWhereUniqueInput[]
    update?: TransferRecordUpdateWithWhereUniqueWithoutDsrInput | TransferRecordUpdateWithWhereUniqueWithoutDsrInput[]
    updateMany?: TransferRecordUpdateManyWithWhereWithoutDsrInput | TransferRecordUpdateManyWithWhereWithoutDsrInput[]
    deleteMany?: TransferRecordScalarWhereInput | TransferRecordScalarWhereInput[]
  }

  export type DSRCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<DSRCreateWithoutAssignmentsInput, DSRUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: DSRCreateOrConnectWithoutAssignmentsInput
    connect?: DSRWhereUniqueInput
  }

  export type ShopCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<ShopCreateWithoutAssignmentsInput, ShopUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutAssignmentsInput
    connect?: ShopWhereUniqueInput
  }

  export type EnumAssignmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AssignmentStatus
  }

  export type DSRUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<DSRCreateWithoutAssignmentsInput, DSRUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: DSRCreateOrConnectWithoutAssignmentsInput
    upsert?: DSRUpsertWithoutAssignmentsInput
    connect?: DSRWhereUniqueInput
    update?: XOR<XOR<DSRUpdateToOneWithWhereWithoutAssignmentsInput, DSRUpdateWithoutAssignmentsInput>, DSRUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ShopUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<ShopCreateWithoutAssignmentsInput, ShopUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutAssignmentsInput
    upsert?: ShopUpsertWithoutAssignmentsInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutAssignmentsInput, ShopUpdateWithoutAssignmentsInput>, ShopUncheckedUpdateWithoutAssignmentsInput>
  }

  export type DSRCreateNestedOneWithoutTransfersInput = {
    create?: XOR<DSRCreateWithoutTransfersInput, DSRUncheckedCreateWithoutTransfersInput>
    connectOrCreate?: DSRCreateOrConnectWithoutTransfersInput
    connect?: DSRWhereUniqueInput
  }

  export type ShopCreateNestedOneWithoutTransfersFromInput = {
    create?: XOR<ShopCreateWithoutTransfersFromInput, ShopUncheckedCreateWithoutTransfersFromInput>
    connectOrCreate?: ShopCreateOrConnectWithoutTransfersFromInput
    connect?: ShopWhereUniqueInput
  }

  export type ShopCreateNestedOneWithoutTransfersToInput = {
    create?: XOR<ShopCreateWithoutTransfersToInput, ShopUncheckedCreateWithoutTransfersToInput>
    connectOrCreate?: ShopCreateOrConnectWithoutTransfersToInput
    connect?: ShopWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutApprovedTransfersInput = {
    create?: XOR<UserCreateWithoutApprovedTransfersInput, UserUncheckedCreateWithoutApprovedTransfersInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovedTransfersInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTransferReasonFieldUpdateOperationsInput = {
    set?: $Enums.TransferReason
  }

  export type DSRUpdateOneRequiredWithoutTransfersNestedInput = {
    create?: XOR<DSRCreateWithoutTransfersInput, DSRUncheckedCreateWithoutTransfersInput>
    connectOrCreate?: DSRCreateOrConnectWithoutTransfersInput
    upsert?: DSRUpsertWithoutTransfersInput
    connect?: DSRWhereUniqueInput
    update?: XOR<XOR<DSRUpdateToOneWithWhereWithoutTransfersInput, DSRUpdateWithoutTransfersInput>, DSRUncheckedUpdateWithoutTransfersInput>
  }

  export type ShopUpdateOneRequiredWithoutTransfersFromNestedInput = {
    create?: XOR<ShopCreateWithoutTransfersFromInput, ShopUncheckedCreateWithoutTransfersFromInput>
    connectOrCreate?: ShopCreateOrConnectWithoutTransfersFromInput
    upsert?: ShopUpsertWithoutTransfersFromInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutTransfersFromInput, ShopUpdateWithoutTransfersFromInput>, ShopUncheckedUpdateWithoutTransfersFromInput>
  }

  export type ShopUpdateOneRequiredWithoutTransfersToNestedInput = {
    create?: XOR<ShopCreateWithoutTransfersToInput, ShopUncheckedCreateWithoutTransfersToInput>
    connectOrCreate?: ShopCreateOrConnectWithoutTransfersToInput
    upsert?: ShopUpsertWithoutTransfersToInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutTransfersToInput, ShopUpdateWithoutTransfersToInput>, ShopUncheckedUpdateWithoutTransfersToInput>
  }

  export type UserUpdateOneWithoutApprovedTransfersNestedInput = {
    create?: XOR<UserCreateWithoutApprovedTransfersInput, UserUncheckedCreateWithoutApprovedTransfersInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovedTransfersInput
    upsert?: UserUpsertWithoutApprovedTransfersInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApprovedTransfersInput, UserUpdateWithoutApprovedTransfersInput>, UserUncheckedUpdateWithoutApprovedTransfersInput>
  }

  export type DSRCreateNestedOneWithoutSalesRecordsInput = {
    create?: XOR<DSRCreateWithoutSalesRecordsInput, DSRUncheckedCreateWithoutSalesRecordsInput>
    connectOrCreate?: DSRCreateOrConnectWithoutSalesRecordsInput
    connect?: DSRWhereUniqueInput
  }

  export type ShopCreateNestedOneWithoutSalesRecordsInput = {
    create?: XOR<ShopCreateWithoutSalesRecordsInput, ShopUncheckedCreateWithoutSalesRecordsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutSalesRecordsInput
    connect?: ShopWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutVerifiedSalesRecordsInput = {
    create?: XOR<UserCreateWithoutVerifiedSalesRecordsInput, UserUncheckedCreateWithoutVerifiedSalesRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerifiedSalesRecordsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumDataSourceFieldUpdateOperationsInput = {
    set?: $Enums.DataSource
  }

  export type DSRUpdateOneRequiredWithoutSalesRecordsNestedInput = {
    create?: XOR<DSRCreateWithoutSalesRecordsInput, DSRUncheckedCreateWithoutSalesRecordsInput>
    connectOrCreate?: DSRCreateOrConnectWithoutSalesRecordsInput
    upsert?: DSRUpsertWithoutSalesRecordsInput
    connect?: DSRWhereUniqueInput
    update?: XOR<XOR<DSRUpdateToOneWithWhereWithoutSalesRecordsInput, DSRUpdateWithoutSalesRecordsInput>, DSRUncheckedUpdateWithoutSalesRecordsInput>
  }

  export type ShopUpdateOneRequiredWithoutSalesRecordsNestedInput = {
    create?: XOR<ShopCreateWithoutSalesRecordsInput, ShopUncheckedCreateWithoutSalesRecordsInput>
    connectOrCreate?: ShopCreateOrConnectWithoutSalesRecordsInput
    upsert?: ShopUpsertWithoutSalesRecordsInput
    connect?: ShopWhereUniqueInput
    update?: XOR<XOR<ShopUpdateToOneWithWhereWithoutSalesRecordsInput, ShopUpdateWithoutSalesRecordsInput>, ShopUncheckedUpdateWithoutSalesRecordsInput>
  }

  export type UserUpdateOneWithoutVerifiedSalesRecordsNestedInput = {
    create?: XOR<UserCreateWithoutVerifiedSalesRecordsInput, UserUncheckedCreateWithoutVerifiedSalesRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutVerifiedSalesRecordsInput
    upsert?: UserUpsertWithoutVerifiedSalesRecordsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVerifiedSalesRecordsInput, UserUpdateWithoutVerifiedSalesRecordsInput>, UserUncheckedUpdateWithoutVerifiedSalesRecordsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumEducationLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEducationLevelNullableFilter<$PrismaModel> | $Enums.EducationLevel | null
  }

  export type NestedEnumEmploymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentStatus | EnumEmploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmploymentStatusFilter<$PrismaModel> | $Enums.EmploymentStatus
  }

  export type NestedEnumEducationLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EducationLevel | EnumEducationLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.EducationLevel[] | ListEnumEducationLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEducationLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.EducationLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEducationLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumEducationLevelNullableFilter<$PrismaModel>
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

  export type NestedEnumEmploymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmploymentStatus | EnumEmploymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmploymentStatus[] | ListEnumEmploymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmploymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmploymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmploymentStatusFilter<$PrismaModel>
    _max?: NestedEnumEmploymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumAssignmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentStatus | EnumAssignmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentStatusFilter<$PrismaModel> | $Enums.AssignmentStatus
  }

  export type NestedEnumAssignmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentStatus | EnumAssignmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AssignmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssignmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAssignmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumTransferReasonFilter<$PrismaModel = never> = {
    equals?: $Enums.TransferReason | EnumTransferReasonFieldRefInput<$PrismaModel>
    in?: $Enums.TransferReason[] | ListEnumTransferReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransferReason[] | ListEnumTransferReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumTransferReasonFilter<$PrismaModel> | $Enums.TransferReason
  }

  export type NestedEnumTransferReasonWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransferReason | EnumTransferReasonFieldRefInput<$PrismaModel>
    in?: $Enums.TransferReason[] | ListEnumTransferReasonFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransferReason[] | ListEnumTransferReasonFieldRefInput<$PrismaModel>
    not?: NestedEnumTransferReasonWithAggregatesFilter<$PrismaModel> | $Enums.TransferReason
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransferReasonFilter<$PrismaModel>
    _max?: NestedEnumTransferReasonFilter<$PrismaModel>
  }

  export type NestedEnumDataSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.DataSource | EnumDataSourceFieldRefInput<$PrismaModel>
    in?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumDataSourceFilter<$PrismaModel> | $Enums.DataSource
  }

  export type NestedEnumDataSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DataSource | EnumDataSourceFieldRefInput<$PrismaModel>
    in?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.DataSource[] | ListEnumDataSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumDataSourceWithAggregatesFilter<$PrismaModel> | $Enums.DataSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDataSourceFilter<$PrismaModel>
    _max?: NestedEnumDataSourceFilter<$PrismaModel>
  }

  export type SalesRecordCreateWithoutVerifiedByInput = {
    saleDate: Date | string
    devicesSold?: number
    remarks?: string | null
    dataSource?: $Enums.DataSource
    externalId?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dsr: DSRCreateNestedOneWithoutSalesRecordsInput
    shop: ShopCreateNestedOneWithoutSalesRecordsInput
  }

  export type SalesRecordUncheckedCreateWithoutVerifiedByInput = {
    id?: number
    dsrId: number
    shopId: number
    saleDate: Date | string
    devicesSold?: number
    remarks?: string | null
    dataSource?: $Enums.DataSource
    externalId?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalesRecordCreateOrConnectWithoutVerifiedByInput = {
    where: SalesRecordWhereUniqueInput
    create: XOR<SalesRecordCreateWithoutVerifiedByInput, SalesRecordUncheckedCreateWithoutVerifiedByInput>
  }

  export type SalesRecordCreateManyVerifiedByInputEnvelope = {
    data: SalesRecordCreateManyVerifiedByInput | SalesRecordCreateManyVerifiedByInput[]
    skipDuplicates?: boolean
  }

  export type TransferRecordCreateWithoutApprovedByInput = {
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dsr: DSRCreateNestedOneWithoutTransfersInput
    fromShop: ShopCreateNestedOneWithoutTransfersFromInput
    toShop: ShopCreateNestedOneWithoutTransfersToInput
  }

  export type TransferRecordUncheckedCreateWithoutApprovedByInput = {
    id?: number
    dsrId: number
    fromShopId: number
    toShopId: number
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferRecordCreateOrConnectWithoutApprovedByInput = {
    where: TransferRecordWhereUniqueInput
    create: XOR<TransferRecordCreateWithoutApprovedByInput, TransferRecordUncheckedCreateWithoutApprovedByInput>
  }

  export type TransferRecordCreateManyApprovedByInputEnvelope = {
    data: TransferRecordCreateManyApprovedByInput | TransferRecordCreateManyApprovedByInput[]
    skipDuplicates?: boolean
  }

  export type SalesRecordUpsertWithWhereUniqueWithoutVerifiedByInput = {
    where: SalesRecordWhereUniqueInput
    update: XOR<SalesRecordUpdateWithoutVerifiedByInput, SalesRecordUncheckedUpdateWithoutVerifiedByInput>
    create: XOR<SalesRecordCreateWithoutVerifiedByInput, SalesRecordUncheckedCreateWithoutVerifiedByInput>
  }

  export type SalesRecordUpdateWithWhereUniqueWithoutVerifiedByInput = {
    where: SalesRecordWhereUniqueInput
    data: XOR<SalesRecordUpdateWithoutVerifiedByInput, SalesRecordUncheckedUpdateWithoutVerifiedByInput>
  }

  export type SalesRecordUpdateManyWithWhereWithoutVerifiedByInput = {
    where: SalesRecordScalarWhereInput
    data: XOR<SalesRecordUpdateManyMutationInput, SalesRecordUncheckedUpdateManyWithoutVerifiedByInput>
  }

  export type SalesRecordScalarWhereInput = {
    AND?: SalesRecordScalarWhereInput | SalesRecordScalarWhereInput[]
    OR?: SalesRecordScalarWhereInput[]
    NOT?: SalesRecordScalarWhereInput | SalesRecordScalarWhereInput[]
    id?: IntFilter<"SalesRecord"> | number
    dsrId?: IntFilter<"SalesRecord"> | number
    shopId?: IntFilter<"SalesRecord"> | number
    saleDate?: DateTimeFilter<"SalesRecord"> | Date | string
    devicesSold?: IntFilter<"SalesRecord"> | number
    remarks?: StringNullableFilter<"SalesRecord"> | string | null
    dataSource?: EnumDataSourceFilter<"SalesRecord"> | $Enums.DataSource
    externalId?: StringNullableFilter<"SalesRecord"> | string | null
    verified?: BoolFilter<"SalesRecord"> | boolean
    verifiedById?: IntNullableFilter<"SalesRecord"> | number | null
    createdAt?: DateTimeFilter<"SalesRecord"> | Date | string
    updatedAt?: DateTimeFilter<"SalesRecord"> | Date | string
  }

  export type TransferRecordUpsertWithWhereUniqueWithoutApprovedByInput = {
    where: TransferRecordWhereUniqueInput
    update: XOR<TransferRecordUpdateWithoutApprovedByInput, TransferRecordUncheckedUpdateWithoutApprovedByInput>
    create: XOR<TransferRecordCreateWithoutApprovedByInput, TransferRecordUncheckedCreateWithoutApprovedByInput>
  }

  export type TransferRecordUpdateWithWhereUniqueWithoutApprovedByInput = {
    where: TransferRecordWhereUniqueInput
    data: XOR<TransferRecordUpdateWithoutApprovedByInput, TransferRecordUncheckedUpdateWithoutApprovedByInput>
  }

  export type TransferRecordUpdateManyWithWhereWithoutApprovedByInput = {
    where: TransferRecordScalarWhereInput
    data: XOR<TransferRecordUpdateManyMutationInput, TransferRecordUncheckedUpdateManyWithoutApprovedByInput>
  }

  export type TransferRecordScalarWhereInput = {
    AND?: TransferRecordScalarWhereInput | TransferRecordScalarWhereInput[]
    OR?: TransferRecordScalarWhereInput[]
    NOT?: TransferRecordScalarWhereInput | TransferRecordScalarWhereInput[]
    id?: IntFilter<"TransferRecord"> | number
    dsrId?: IntFilter<"TransferRecord"> | number
    fromShopId?: IntFilter<"TransferRecord"> | number
    toShopId?: IntFilter<"TransferRecord"> | number
    transferDate?: DateTimeFilter<"TransferRecord"> | Date | string
    reason?: EnumTransferReasonFilter<"TransferRecord"> | $Enums.TransferReason
    reasonDetail?: StringNullableFilter<"TransferRecord"> | string | null
    approvedById?: IntNullableFilter<"TransferRecord"> | number | null
    effectivenessScore?: IntNullableFilter<"TransferRecord"> | number | null
    notes?: StringNullableFilter<"TransferRecord"> | string | null
    createdAt?: DateTimeFilter<"TransferRecord"> | Date | string
    updatedAt?: DateTimeFilter<"TransferRecord"> | Date | string
  }

  export type AssignmentCreateWithoutShopInput = {
    startDate: Date | string
    endDate?: Date | string | null
    status?: $Enums.AssignmentStatus
    teamName?: string | null
    role?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dsr: DSRCreateNestedOneWithoutAssignmentsInput
  }

  export type AssignmentUncheckedCreateWithoutShopInput = {
    id?: number
    dsrId: number
    startDate: Date | string
    endDate?: Date | string | null
    status?: $Enums.AssignmentStatus
    teamName?: string | null
    role?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssignmentCreateOrConnectWithoutShopInput = {
    where: AssignmentWhereUniqueInput
    create: XOR<AssignmentCreateWithoutShopInput, AssignmentUncheckedCreateWithoutShopInput>
  }

  export type AssignmentCreateManyShopInputEnvelope = {
    data: AssignmentCreateManyShopInput | AssignmentCreateManyShopInput[]
    skipDuplicates?: boolean
  }

  export type SalesRecordCreateWithoutShopInput = {
    saleDate: Date | string
    devicesSold?: number
    remarks?: string | null
    dataSource?: $Enums.DataSource
    externalId?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    dsr: DSRCreateNestedOneWithoutSalesRecordsInput
    verifiedBy?: UserCreateNestedOneWithoutVerifiedSalesRecordsInput
  }

  export type SalesRecordUncheckedCreateWithoutShopInput = {
    id?: number
    dsrId: number
    saleDate: Date | string
    devicesSold?: number
    remarks?: string | null
    dataSource?: $Enums.DataSource
    externalId?: string | null
    verified?: boolean
    verifiedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalesRecordCreateOrConnectWithoutShopInput = {
    where: SalesRecordWhereUniqueInput
    create: XOR<SalesRecordCreateWithoutShopInput, SalesRecordUncheckedCreateWithoutShopInput>
  }

  export type SalesRecordCreateManyShopInputEnvelope = {
    data: SalesRecordCreateManyShopInput | SalesRecordCreateManyShopInput[]
    skipDuplicates?: boolean
  }

  export type TransferRecordCreateWithoutFromShopInput = {
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dsr: DSRCreateNestedOneWithoutTransfersInput
    toShop: ShopCreateNestedOneWithoutTransfersToInput
    approvedBy?: UserCreateNestedOneWithoutApprovedTransfersInput
  }

  export type TransferRecordUncheckedCreateWithoutFromShopInput = {
    id?: number
    dsrId: number
    toShopId: number
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    approvedById?: number | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferRecordCreateOrConnectWithoutFromShopInput = {
    where: TransferRecordWhereUniqueInput
    create: XOR<TransferRecordCreateWithoutFromShopInput, TransferRecordUncheckedCreateWithoutFromShopInput>
  }

  export type TransferRecordCreateManyFromShopInputEnvelope = {
    data: TransferRecordCreateManyFromShopInput | TransferRecordCreateManyFromShopInput[]
    skipDuplicates?: boolean
  }

  export type TransferRecordCreateWithoutToShopInput = {
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dsr: DSRCreateNestedOneWithoutTransfersInput
    fromShop: ShopCreateNestedOneWithoutTransfersFromInput
    approvedBy?: UserCreateNestedOneWithoutApprovedTransfersInput
  }

  export type TransferRecordUncheckedCreateWithoutToShopInput = {
    id?: number
    dsrId: number
    fromShopId: number
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    approvedById?: number | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferRecordCreateOrConnectWithoutToShopInput = {
    where: TransferRecordWhereUniqueInput
    create: XOR<TransferRecordCreateWithoutToShopInput, TransferRecordUncheckedCreateWithoutToShopInput>
  }

  export type TransferRecordCreateManyToShopInputEnvelope = {
    data: TransferRecordCreateManyToShopInput | TransferRecordCreateManyToShopInput[]
    skipDuplicates?: boolean
  }

  export type AssignmentUpsertWithWhereUniqueWithoutShopInput = {
    where: AssignmentWhereUniqueInput
    update: XOR<AssignmentUpdateWithoutShopInput, AssignmentUncheckedUpdateWithoutShopInput>
    create: XOR<AssignmentCreateWithoutShopInput, AssignmentUncheckedCreateWithoutShopInput>
  }

  export type AssignmentUpdateWithWhereUniqueWithoutShopInput = {
    where: AssignmentWhereUniqueInput
    data: XOR<AssignmentUpdateWithoutShopInput, AssignmentUncheckedUpdateWithoutShopInput>
  }

  export type AssignmentUpdateManyWithWhereWithoutShopInput = {
    where: AssignmentScalarWhereInput
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyWithoutShopInput>
  }

  export type AssignmentScalarWhereInput = {
    AND?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
    OR?: AssignmentScalarWhereInput[]
    NOT?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
    id?: IntFilter<"Assignment"> | number
    dsrId?: IntFilter<"Assignment"> | number
    shopId?: IntFilter<"Assignment"> | number
    startDate?: DateTimeFilter<"Assignment"> | Date | string
    endDate?: DateTimeNullableFilter<"Assignment"> | Date | string | null
    status?: EnumAssignmentStatusFilter<"Assignment"> | $Enums.AssignmentStatus
    teamName?: StringNullableFilter<"Assignment"> | string | null
    role?: StringNullableFilter<"Assignment"> | string | null
    notes?: StringNullableFilter<"Assignment"> | string | null
    createdAt?: DateTimeFilter<"Assignment"> | Date | string
    updatedAt?: DateTimeFilter<"Assignment"> | Date | string
  }

  export type SalesRecordUpsertWithWhereUniqueWithoutShopInput = {
    where: SalesRecordWhereUniqueInput
    update: XOR<SalesRecordUpdateWithoutShopInput, SalesRecordUncheckedUpdateWithoutShopInput>
    create: XOR<SalesRecordCreateWithoutShopInput, SalesRecordUncheckedCreateWithoutShopInput>
  }

  export type SalesRecordUpdateWithWhereUniqueWithoutShopInput = {
    where: SalesRecordWhereUniqueInput
    data: XOR<SalesRecordUpdateWithoutShopInput, SalesRecordUncheckedUpdateWithoutShopInput>
  }

  export type SalesRecordUpdateManyWithWhereWithoutShopInput = {
    where: SalesRecordScalarWhereInput
    data: XOR<SalesRecordUpdateManyMutationInput, SalesRecordUncheckedUpdateManyWithoutShopInput>
  }

  export type TransferRecordUpsertWithWhereUniqueWithoutFromShopInput = {
    where: TransferRecordWhereUniqueInput
    update: XOR<TransferRecordUpdateWithoutFromShopInput, TransferRecordUncheckedUpdateWithoutFromShopInput>
    create: XOR<TransferRecordCreateWithoutFromShopInput, TransferRecordUncheckedCreateWithoutFromShopInput>
  }

  export type TransferRecordUpdateWithWhereUniqueWithoutFromShopInput = {
    where: TransferRecordWhereUniqueInput
    data: XOR<TransferRecordUpdateWithoutFromShopInput, TransferRecordUncheckedUpdateWithoutFromShopInput>
  }

  export type TransferRecordUpdateManyWithWhereWithoutFromShopInput = {
    where: TransferRecordScalarWhereInput
    data: XOR<TransferRecordUpdateManyMutationInput, TransferRecordUncheckedUpdateManyWithoutFromShopInput>
  }

  export type TransferRecordUpsertWithWhereUniqueWithoutToShopInput = {
    where: TransferRecordWhereUniqueInput
    update: XOR<TransferRecordUpdateWithoutToShopInput, TransferRecordUncheckedUpdateWithoutToShopInput>
    create: XOR<TransferRecordCreateWithoutToShopInput, TransferRecordUncheckedCreateWithoutToShopInput>
  }

  export type TransferRecordUpdateWithWhereUniqueWithoutToShopInput = {
    where: TransferRecordWhereUniqueInput
    data: XOR<TransferRecordUpdateWithoutToShopInput, TransferRecordUncheckedUpdateWithoutToShopInput>
  }

  export type TransferRecordUpdateManyWithWhereWithoutToShopInput = {
    where: TransferRecordScalarWhereInput
    data: XOR<TransferRecordUpdateManyMutationInput, TransferRecordUncheckedUpdateManyWithoutToShopInput>
  }

  export type AssignmentCreateWithoutDsrInput = {
    startDate: Date | string
    endDate?: Date | string | null
    status?: $Enums.AssignmentStatus
    teamName?: string | null
    role?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutAssignmentsInput
  }

  export type AssignmentUncheckedCreateWithoutDsrInput = {
    id?: number
    shopId: number
    startDate: Date | string
    endDate?: Date | string | null
    status?: $Enums.AssignmentStatus
    teamName?: string | null
    role?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssignmentCreateOrConnectWithoutDsrInput = {
    where: AssignmentWhereUniqueInput
    create: XOR<AssignmentCreateWithoutDsrInput, AssignmentUncheckedCreateWithoutDsrInput>
  }

  export type AssignmentCreateManyDsrInputEnvelope = {
    data: AssignmentCreateManyDsrInput | AssignmentCreateManyDsrInput[]
    skipDuplicates?: boolean
  }

  export type SalesRecordCreateWithoutDsrInput = {
    saleDate: Date | string
    devicesSold?: number
    remarks?: string | null
    dataSource?: $Enums.DataSource
    externalId?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    shop: ShopCreateNestedOneWithoutSalesRecordsInput
    verifiedBy?: UserCreateNestedOneWithoutVerifiedSalesRecordsInput
  }

  export type SalesRecordUncheckedCreateWithoutDsrInput = {
    id?: number
    shopId: number
    saleDate: Date | string
    devicesSold?: number
    remarks?: string | null
    dataSource?: $Enums.DataSource
    externalId?: string | null
    verified?: boolean
    verifiedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalesRecordCreateOrConnectWithoutDsrInput = {
    where: SalesRecordWhereUniqueInput
    create: XOR<SalesRecordCreateWithoutDsrInput, SalesRecordUncheckedCreateWithoutDsrInput>
  }

  export type SalesRecordCreateManyDsrInputEnvelope = {
    data: SalesRecordCreateManyDsrInput | SalesRecordCreateManyDsrInput[]
    skipDuplicates?: boolean
  }

  export type TransferRecordCreateWithoutDsrInput = {
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    fromShop: ShopCreateNestedOneWithoutTransfersFromInput
    toShop: ShopCreateNestedOneWithoutTransfersToInput
    approvedBy?: UserCreateNestedOneWithoutApprovedTransfersInput
  }

  export type TransferRecordUncheckedCreateWithoutDsrInput = {
    id?: number
    fromShopId: number
    toShopId: number
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    approvedById?: number | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferRecordCreateOrConnectWithoutDsrInput = {
    where: TransferRecordWhereUniqueInput
    create: XOR<TransferRecordCreateWithoutDsrInput, TransferRecordUncheckedCreateWithoutDsrInput>
  }

  export type TransferRecordCreateManyDsrInputEnvelope = {
    data: TransferRecordCreateManyDsrInput | TransferRecordCreateManyDsrInput[]
    skipDuplicates?: boolean
  }

  export type AssignmentUpsertWithWhereUniqueWithoutDsrInput = {
    where: AssignmentWhereUniqueInput
    update: XOR<AssignmentUpdateWithoutDsrInput, AssignmentUncheckedUpdateWithoutDsrInput>
    create: XOR<AssignmentCreateWithoutDsrInput, AssignmentUncheckedCreateWithoutDsrInput>
  }

  export type AssignmentUpdateWithWhereUniqueWithoutDsrInput = {
    where: AssignmentWhereUniqueInput
    data: XOR<AssignmentUpdateWithoutDsrInput, AssignmentUncheckedUpdateWithoutDsrInput>
  }

  export type AssignmentUpdateManyWithWhereWithoutDsrInput = {
    where: AssignmentScalarWhereInput
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyWithoutDsrInput>
  }

  export type SalesRecordUpsertWithWhereUniqueWithoutDsrInput = {
    where: SalesRecordWhereUniqueInput
    update: XOR<SalesRecordUpdateWithoutDsrInput, SalesRecordUncheckedUpdateWithoutDsrInput>
    create: XOR<SalesRecordCreateWithoutDsrInput, SalesRecordUncheckedCreateWithoutDsrInput>
  }

  export type SalesRecordUpdateWithWhereUniqueWithoutDsrInput = {
    where: SalesRecordWhereUniqueInput
    data: XOR<SalesRecordUpdateWithoutDsrInput, SalesRecordUncheckedUpdateWithoutDsrInput>
  }

  export type SalesRecordUpdateManyWithWhereWithoutDsrInput = {
    where: SalesRecordScalarWhereInput
    data: XOR<SalesRecordUpdateManyMutationInput, SalesRecordUncheckedUpdateManyWithoutDsrInput>
  }

  export type TransferRecordUpsertWithWhereUniqueWithoutDsrInput = {
    where: TransferRecordWhereUniqueInput
    update: XOR<TransferRecordUpdateWithoutDsrInput, TransferRecordUncheckedUpdateWithoutDsrInput>
    create: XOR<TransferRecordCreateWithoutDsrInput, TransferRecordUncheckedCreateWithoutDsrInput>
  }

  export type TransferRecordUpdateWithWhereUniqueWithoutDsrInput = {
    where: TransferRecordWhereUniqueInput
    data: XOR<TransferRecordUpdateWithoutDsrInput, TransferRecordUncheckedUpdateWithoutDsrInput>
  }

  export type TransferRecordUpdateManyWithWhereWithoutDsrInput = {
    where: TransferRecordScalarWhereInput
    data: XOR<TransferRecordUpdateManyMutationInput, TransferRecordUncheckedUpdateManyWithoutDsrInput>
  }

  export type DSRCreateWithoutAssignmentsInput = {
    accountNumber: string
    fullName: string
    email?: string | null
    secondaryNumber?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    address?: string | null
    educationLevel?: $Enums.EducationLevel | null
    educationInstitution?: string | null
    educationYear?: number | null
    employmentDate?: Date | string | null
    employmentStatus?: $Enums.EmploymentStatus
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    salesRecords?: SalesRecordCreateNestedManyWithoutDsrInput
    transfers?: TransferRecordCreateNestedManyWithoutDsrInput
  }

  export type DSRUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    accountNumber: string
    fullName: string
    email?: string | null
    secondaryNumber?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    address?: string | null
    educationLevel?: $Enums.EducationLevel | null
    educationInstitution?: string | null
    educationYear?: number | null
    employmentDate?: Date | string | null
    employmentStatus?: $Enums.EmploymentStatus
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    salesRecords?: SalesRecordUncheckedCreateNestedManyWithoutDsrInput
    transfers?: TransferRecordUncheckedCreateNestedManyWithoutDsrInput
  }

  export type DSRCreateOrConnectWithoutAssignmentsInput = {
    where: DSRWhereUniqueInput
    create: XOR<DSRCreateWithoutAssignmentsInput, DSRUncheckedCreateWithoutAssignmentsInput>
  }

  export type ShopCreateWithoutAssignmentsInput = {
    name: string
    location: string
    region?: string
    district?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    salesRecords?: SalesRecordCreateNestedManyWithoutShopInput
    transfersFrom?: TransferRecordCreateNestedManyWithoutFromShopInput
    transfersTo?: TransferRecordCreateNestedManyWithoutToShopInput
  }

  export type ShopUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    name: string
    location: string
    region?: string
    district?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    salesRecords?: SalesRecordUncheckedCreateNestedManyWithoutShopInput
    transfersFrom?: TransferRecordUncheckedCreateNestedManyWithoutFromShopInput
    transfersTo?: TransferRecordUncheckedCreateNestedManyWithoutToShopInput
  }

  export type ShopCreateOrConnectWithoutAssignmentsInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutAssignmentsInput, ShopUncheckedCreateWithoutAssignmentsInput>
  }

  export type DSRUpsertWithoutAssignmentsInput = {
    update: XOR<DSRUpdateWithoutAssignmentsInput, DSRUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<DSRCreateWithoutAssignmentsInput, DSRUncheckedCreateWithoutAssignmentsInput>
    where?: DSRWhereInput
  }

  export type DSRUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: DSRWhereInput
    data: XOR<DSRUpdateWithoutAssignmentsInput, DSRUncheckedUpdateWithoutAssignmentsInput>
  }

  export type DSRUpdateWithoutAssignmentsInput = {
    accountNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    educationInstitution?: NullableStringFieldUpdateOperationsInput | string | null
    educationYear?: NullableIntFieldUpdateOperationsInput | number | null
    employmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentStatus?: EnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salesRecords?: SalesRecordUpdateManyWithoutDsrNestedInput
    transfers?: TransferRecordUpdateManyWithoutDsrNestedInput
  }

  export type DSRUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    accountNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    educationInstitution?: NullableStringFieldUpdateOperationsInput | string | null
    educationYear?: NullableIntFieldUpdateOperationsInput | number | null
    employmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentStatus?: EnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salesRecords?: SalesRecordUncheckedUpdateManyWithoutDsrNestedInput
    transfers?: TransferRecordUncheckedUpdateManyWithoutDsrNestedInput
  }

  export type ShopUpsertWithoutAssignmentsInput = {
    update: XOR<ShopUpdateWithoutAssignmentsInput, ShopUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<ShopCreateWithoutAssignmentsInput, ShopUncheckedCreateWithoutAssignmentsInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutAssignmentsInput, ShopUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ShopUpdateWithoutAssignmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salesRecords?: SalesRecordUpdateManyWithoutShopNestedInput
    transfersFrom?: TransferRecordUpdateManyWithoutFromShopNestedInput
    transfersTo?: TransferRecordUpdateManyWithoutToShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    salesRecords?: SalesRecordUncheckedUpdateManyWithoutShopNestedInput
    transfersFrom?: TransferRecordUncheckedUpdateManyWithoutFromShopNestedInput
    transfersTo?: TransferRecordUncheckedUpdateManyWithoutToShopNestedInput
  }

  export type DSRCreateWithoutTransfersInput = {
    accountNumber: string
    fullName: string
    email?: string | null
    secondaryNumber?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    address?: string | null
    educationLevel?: $Enums.EducationLevel | null
    educationInstitution?: string | null
    educationYear?: number | null
    employmentDate?: Date | string | null
    employmentStatus?: $Enums.EmploymentStatus
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentCreateNestedManyWithoutDsrInput
    salesRecords?: SalesRecordCreateNestedManyWithoutDsrInput
  }

  export type DSRUncheckedCreateWithoutTransfersInput = {
    id?: number
    accountNumber: string
    fullName: string
    email?: string | null
    secondaryNumber?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    address?: string | null
    educationLevel?: $Enums.EducationLevel | null
    educationInstitution?: string | null
    educationYear?: number | null
    employmentDate?: Date | string | null
    employmentStatus?: $Enums.EmploymentStatus
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentUncheckedCreateNestedManyWithoutDsrInput
    salesRecords?: SalesRecordUncheckedCreateNestedManyWithoutDsrInput
  }

  export type DSRCreateOrConnectWithoutTransfersInput = {
    where: DSRWhereUniqueInput
    create: XOR<DSRCreateWithoutTransfersInput, DSRUncheckedCreateWithoutTransfersInput>
  }

  export type ShopCreateWithoutTransfersFromInput = {
    name: string
    location: string
    region?: string
    district?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentCreateNestedManyWithoutShopInput
    salesRecords?: SalesRecordCreateNestedManyWithoutShopInput
    transfersTo?: TransferRecordCreateNestedManyWithoutToShopInput
  }

  export type ShopUncheckedCreateWithoutTransfersFromInput = {
    id?: number
    name: string
    location: string
    region?: string
    district?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentUncheckedCreateNestedManyWithoutShopInput
    salesRecords?: SalesRecordUncheckedCreateNestedManyWithoutShopInput
    transfersTo?: TransferRecordUncheckedCreateNestedManyWithoutToShopInput
  }

  export type ShopCreateOrConnectWithoutTransfersFromInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutTransfersFromInput, ShopUncheckedCreateWithoutTransfersFromInput>
  }

  export type ShopCreateWithoutTransfersToInput = {
    name: string
    location: string
    region?: string
    district?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentCreateNestedManyWithoutShopInput
    salesRecords?: SalesRecordCreateNestedManyWithoutShopInput
    transfersFrom?: TransferRecordCreateNestedManyWithoutFromShopInput
  }

  export type ShopUncheckedCreateWithoutTransfersToInput = {
    id?: number
    name: string
    location: string
    region?: string
    district?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentUncheckedCreateNestedManyWithoutShopInput
    salesRecords?: SalesRecordUncheckedCreateNestedManyWithoutShopInput
    transfersFrom?: TransferRecordUncheckedCreateNestedManyWithoutFromShopInput
  }

  export type ShopCreateOrConnectWithoutTransfersToInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutTransfersToInput, ShopUncheckedCreateWithoutTransfersToInput>
  }

  export type UserCreateWithoutApprovedTransfersInput = {
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    isSuperuser?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    verifiedSalesRecords?: SalesRecordCreateNestedManyWithoutVerifiedByInput
  }

  export type UserUncheckedCreateWithoutApprovedTransfersInput = {
    id?: number
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    isSuperuser?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    verifiedSalesRecords?: SalesRecordUncheckedCreateNestedManyWithoutVerifiedByInput
  }

  export type UserCreateOrConnectWithoutApprovedTransfersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApprovedTransfersInput, UserUncheckedCreateWithoutApprovedTransfersInput>
  }

  export type DSRUpsertWithoutTransfersInput = {
    update: XOR<DSRUpdateWithoutTransfersInput, DSRUncheckedUpdateWithoutTransfersInput>
    create: XOR<DSRCreateWithoutTransfersInput, DSRUncheckedCreateWithoutTransfersInput>
    where?: DSRWhereInput
  }

  export type DSRUpdateToOneWithWhereWithoutTransfersInput = {
    where?: DSRWhereInput
    data: XOR<DSRUpdateWithoutTransfersInput, DSRUncheckedUpdateWithoutTransfersInput>
  }

  export type DSRUpdateWithoutTransfersInput = {
    accountNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    educationInstitution?: NullableStringFieldUpdateOperationsInput | string | null
    educationYear?: NullableIntFieldUpdateOperationsInput | number | null
    employmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentStatus?: EnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUpdateManyWithoutDsrNestedInput
    salesRecords?: SalesRecordUpdateManyWithoutDsrNestedInput
  }

  export type DSRUncheckedUpdateWithoutTransfersInput = {
    id?: IntFieldUpdateOperationsInput | number
    accountNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    educationInstitution?: NullableStringFieldUpdateOperationsInput | string | null
    educationYear?: NullableIntFieldUpdateOperationsInput | number | null
    employmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentStatus?: EnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUncheckedUpdateManyWithoutDsrNestedInput
    salesRecords?: SalesRecordUncheckedUpdateManyWithoutDsrNestedInput
  }

  export type ShopUpsertWithoutTransfersFromInput = {
    update: XOR<ShopUpdateWithoutTransfersFromInput, ShopUncheckedUpdateWithoutTransfersFromInput>
    create: XOR<ShopCreateWithoutTransfersFromInput, ShopUncheckedCreateWithoutTransfersFromInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutTransfersFromInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutTransfersFromInput, ShopUncheckedUpdateWithoutTransfersFromInput>
  }

  export type ShopUpdateWithoutTransfersFromInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUpdateManyWithoutShopNestedInput
    salesRecords?: SalesRecordUpdateManyWithoutShopNestedInput
    transfersTo?: TransferRecordUpdateManyWithoutToShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutTransfersFromInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUncheckedUpdateManyWithoutShopNestedInput
    salesRecords?: SalesRecordUncheckedUpdateManyWithoutShopNestedInput
    transfersTo?: TransferRecordUncheckedUpdateManyWithoutToShopNestedInput
  }

  export type ShopUpsertWithoutTransfersToInput = {
    update: XOR<ShopUpdateWithoutTransfersToInput, ShopUncheckedUpdateWithoutTransfersToInput>
    create: XOR<ShopCreateWithoutTransfersToInput, ShopUncheckedCreateWithoutTransfersToInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutTransfersToInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutTransfersToInput, ShopUncheckedUpdateWithoutTransfersToInput>
  }

  export type ShopUpdateWithoutTransfersToInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUpdateManyWithoutShopNestedInput
    salesRecords?: SalesRecordUpdateManyWithoutShopNestedInput
    transfersFrom?: TransferRecordUpdateManyWithoutFromShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutTransfersToInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUncheckedUpdateManyWithoutShopNestedInput
    salesRecords?: SalesRecordUncheckedUpdateManyWithoutShopNestedInput
    transfersFrom?: TransferRecordUncheckedUpdateManyWithoutFromShopNestedInput
  }

  export type UserUpsertWithoutApprovedTransfersInput = {
    update: XOR<UserUpdateWithoutApprovedTransfersInput, UserUncheckedUpdateWithoutApprovedTransfersInput>
    create: XOR<UserCreateWithoutApprovedTransfersInput, UserUncheckedCreateWithoutApprovedTransfersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApprovedTransfersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApprovedTransfersInput, UserUncheckedUpdateWithoutApprovedTransfersInput>
  }

  export type UserUpdateWithoutApprovedTransfersInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isSuperuser?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedSalesRecords?: SalesRecordUpdateManyWithoutVerifiedByNestedInput
  }

  export type UserUncheckedUpdateWithoutApprovedTransfersInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isSuperuser?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    verifiedSalesRecords?: SalesRecordUncheckedUpdateManyWithoutVerifiedByNestedInput
  }

  export type DSRCreateWithoutSalesRecordsInput = {
    accountNumber: string
    fullName: string
    email?: string | null
    secondaryNumber?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    address?: string | null
    educationLevel?: $Enums.EducationLevel | null
    educationInstitution?: string | null
    educationYear?: number | null
    employmentDate?: Date | string | null
    employmentStatus?: $Enums.EmploymentStatus
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentCreateNestedManyWithoutDsrInput
    transfers?: TransferRecordCreateNestedManyWithoutDsrInput
  }

  export type DSRUncheckedCreateWithoutSalesRecordsInput = {
    id?: number
    accountNumber: string
    fullName: string
    email?: string | null
    secondaryNumber?: string | null
    dateOfBirth?: Date | string | null
    gender?: string | null
    address?: string | null
    educationLevel?: $Enums.EducationLevel | null
    educationInstitution?: string | null
    educationYear?: number | null
    employmentDate?: Date | string | null
    employmentStatus?: $Enums.EmploymentStatus
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentUncheckedCreateNestedManyWithoutDsrInput
    transfers?: TransferRecordUncheckedCreateNestedManyWithoutDsrInput
  }

  export type DSRCreateOrConnectWithoutSalesRecordsInput = {
    where: DSRWhereUniqueInput
    create: XOR<DSRCreateWithoutSalesRecordsInput, DSRUncheckedCreateWithoutSalesRecordsInput>
  }

  export type ShopCreateWithoutSalesRecordsInput = {
    name: string
    location: string
    region?: string
    district?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentCreateNestedManyWithoutShopInput
    transfersFrom?: TransferRecordCreateNestedManyWithoutFromShopInput
    transfersTo?: TransferRecordCreateNestedManyWithoutToShopInput
  }

  export type ShopUncheckedCreateWithoutSalesRecordsInput = {
    id?: number
    name: string
    location: string
    region?: string
    district?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    deletedAt?: Date | string | null
    assignments?: AssignmentUncheckedCreateNestedManyWithoutShopInput
    transfersFrom?: TransferRecordUncheckedCreateNestedManyWithoutFromShopInput
    transfersTo?: TransferRecordUncheckedCreateNestedManyWithoutToShopInput
  }

  export type ShopCreateOrConnectWithoutSalesRecordsInput = {
    where: ShopWhereUniqueInput
    create: XOR<ShopCreateWithoutSalesRecordsInput, ShopUncheckedCreateWithoutSalesRecordsInput>
  }

  export type UserCreateWithoutVerifiedSalesRecordsInput = {
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    isSuperuser?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedTransfers?: TransferRecordCreateNestedManyWithoutApprovedByInput
  }

  export type UserUncheckedCreateWithoutVerifiedSalesRecordsInput = {
    id?: number
    email: string
    fullName: string
    hashedPassword: string
    isActive?: boolean
    isSuperuser?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    approvedTransfers?: TransferRecordUncheckedCreateNestedManyWithoutApprovedByInput
  }

  export type UserCreateOrConnectWithoutVerifiedSalesRecordsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVerifiedSalesRecordsInput, UserUncheckedCreateWithoutVerifiedSalesRecordsInput>
  }

  export type DSRUpsertWithoutSalesRecordsInput = {
    update: XOR<DSRUpdateWithoutSalesRecordsInput, DSRUncheckedUpdateWithoutSalesRecordsInput>
    create: XOR<DSRCreateWithoutSalesRecordsInput, DSRUncheckedCreateWithoutSalesRecordsInput>
    where?: DSRWhereInput
  }

  export type DSRUpdateToOneWithWhereWithoutSalesRecordsInput = {
    where?: DSRWhereInput
    data: XOR<DSRUpdateWithoutSalesRecordsInput, DSRUncheckedUpdateWithoutSalesRecordsInput>
  }

  export type DSRUpdateWithoutSalesRecordsInput = {
    accountNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    educationInstitution?: NullableStringFieldUpdateOperationsInput | string | null
    educationYear?: NullableIntFieldUpdateOperationsInput | number | null
    employmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentStatus?: EnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUpdateManyWithoutDsrNestedInput
    transfers?: TransferRecordUpdateManyWithoutDsrNestedInput
  }

  export type DSRUncheckedUpdateWithoutSalesRecordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    accountNumber?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryNumber?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableEnumEducationLevelFieldUpdateOperationsInput | $Enums.EducationLevel | null
    educationInstitution?: NullableStringFieldUpdateOperationsInput | string | null
    educationYear?: NullableIntFieldUpdateOperationsInput | number | null
    employmentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    employmentStatus?: EnumEmploymentStatusFieldUpdateOperationsInput | $Enums.EmploymentStatus
    emergencyContactName?: NullableStringFieldUpdateOperationsInput | string | null
    emergencyContactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUncheckedUpdateManyWithoutDsrNestedInput
    transfers?: TransferRecordUncheckedUpdateManyWithoutDsrNestedInput
  }

  export type ShopUpsertWithoutSalesRecordsInput = {
    update: XOR<ShopUpdateWithoutSalesRecordsInput, ShopUncheckedUpdateWithoutSalesRecordsInput>
    create: XOR<ShopCreateWithoutSalesRecordsInput, ShopUncheckedCreateWithoutSalesRecordsInput>
    where?: ShopWhereInput
  }

  export type ShopUpdateToOneWithWhereWithoutSalesRecordsInput = {
    where?: ShopWhereInput
    data: XOR<ShopUpdateWithoutSalesRecordsInput, ShopUncheckedUpdateWithoutSalesRecordsInput>
  }

  export type ShopUpdateWithoutSalesRecordsInput = {
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUpdateManyWithoutShopNestedInput
    transfersFrom?: TransferRecordUpdateManyWithoutFromShopNestedInput
    transfersTo?: TransferRecordUpdateManyWithoutToShopNestedInput
  }

  export type ShopUncheckedUpdateWithoutSalesRecordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    region?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignments?: AssignmentUncheckedUpdateManyWithoutShopNestedInput
    transfersFrom?: TransferRecordUncheckedUpdateManyWithoutFromShopNestedInput
    transfersTo?: TransferRecordUncheckedUpdateManyWithoutToShopNestedInput
  }

  export type UserUpsertWithoutVerifiedSalesRecordsInput = {
    update: XOR<UserUpdateWithoutVerifiedSalesRecordsInput, UserUncheckedUpdateWithoutVerifiedSalesRecordsInput>
    create: XOR<UserCreateWithoutVerifiedSalesRecordsInput, UserUncheckedCreateWithoutVerifiedSalesRecordsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVerifiedSalesRecordsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVerifiedSalesRecordsInput, UserUncheckedUpdateWithoutVerifiedSalesRecordsInput>
  }

  export type UserUpdateWithoutVerifiedSalesRecordsInput = {
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isSuperuser?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedTransfers?: TransferRecordUpdateManyWithoutApprovedByNestedInput
  }

  export type UserUncheckedUpdateWithoutVerifiedSalesRecordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    hashedPassword?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isSuperuser?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedTransfers?: TransferRecordUncheckedUpdateManyWithoutApprovedByNestedInput
  }

  export type SalesRecordCreateManyVerifiedByInput = {
    id?: number
    dsrId: number
    shopId: number
    saleDate: Date | string
    devicesSold?: number
    remarks?: string | null
    dataSource?: $Enums.DataSource
    externalId?: string | null
    verified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferRecordCreateManyApprovedByInput = {
    id?: number
    dsrId: number
    fromShopId: number
    toShopId: number
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalesRecordUpdateWithoutVerifiedByInput = {
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dsr?: DSRUpdateOneRequiredWithoutSalesRecordsNestedInput
    shop?: ShopUpdateOneRequiredWithoutSalesRecordsNestedInput
  }

  export type SalesRecordUncheckedUpdateWithoutVerifiedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    shopId?: IntFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalesRecordUncheckedUpdateManyWithoutVerifiedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    shopId?: IntFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferRecordUpdateWithoutApprovedByInput = {
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dsr?: DSRUpdateOneRequiredWithoutTransfersNestedInput
    fromShop?: ShopUpdateOneRequiredWithoutTransfersFromNestedInput
    toShop?: ShopUpdateOneRequiredWithoutTransfersToNestedInput
  }

  export type TransferRecordUncheckedUpdateWithoutApprovedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    fromShopId?: IntFieldUpdateOperationsInput | number
    toShopId?: IntFieldUpdateOperationsInput | number
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferRecordUncheckedUpdateManyWithoutApprovedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    fromShopId?: IntFieldUpdateOperationsInput | number
    toShopId?: IntFieldUpdateOperationsInput | number
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssignmentCreateManyShopInput = {
    id?: number
    dsrId: number
    startDate: Date | string
    endDate?: Date | string | null
    status?: $Enums.AssignmentStatus
    teamName?: string | null
    role?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalesRecordCreateManyShopInput = {
    id?: number
    dsrId: number
    saleDate: Date | string
    devicesSold?: number
    remarks?: string | null
    dataSource?: $Enums.DataSource
    externalId?: string | null
    verified?: boolean
    verifiedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferRecordCreateManyFromShopInput = {
    id?: number
    dsrId: number
    toShopId: number
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    approvedById?: number | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferRecordCreateManyToShopInput = {
    id?: number
    dsrId: number
    fromShopId: number
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    approvedById?: number | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssignmentUpdateWithoutShopInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    teamName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dsr?: DSRUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type AssignmentUncheckedUpdateWithoutShopInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    teamName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssignmentUncheckedUpdateManyWithoutShopInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    teamName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalesRecordUpdateWithoutShopInput = {
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dsr?: DSRUpdateOneRequiredWithoutSalesRecordsNestedInput
    verifiedBy?: UserUpdateOneWithoutVerifiedSalesRecordsNestedInput
  }

  export type SalesRecordUncheckedUpdateWithoutShopInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    verifiedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalesRecordUncheckedUpdateManyWithoutShopInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    verifiedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferRecordUpdateWithoutFromShopInput = {
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dsr?: DSRUpdateOneRequiredWithoutTransfersNestedInput
    toShop?: ShopUpdateOneRequiredWithoutTransfersToNestedInput
    approvedBy?: UserUpdateOneWithoutApprovedTransfersNestedInput
  }

  export type TransferRecordUncheckedUpdateWithoutFromShopInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    toShopId?: IntFieldUpdateOperationsInput | number
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableIntFieldUpdateOperationsInput | number | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferRecordUncheckedUpdateManyWithoutFromShopInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    toShopId?: IntFieldUpdateOperationsInput | number
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableIntFieldUpdateOperationsInput | number | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferRecordUpdateWithoutToShopInput = {
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dsr?: DSRUpdateOneRequiredWithoutTransfersNestedInput
    fromShop?: ShopUpdateOneRequiredWithoutTransfersFromNestedInput
    approvedBy?: UserUpdateOneWithoutApprovedTransfersNestedInput
  }

  export type TransferRecordUncheckedUpdateWithoutToShopInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    fromShopId?: IntFieldUpdateOperationsInput | number
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableIntFieldUpdateOperationsInput | number | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferRecordUncheckedUpdateManyWithoutToShopInput = {
    id?: IntFieldUpdateOperationsInput | number
    dsrId?: IntFieldUpdateOperationsInput | number
    fromShopId?: IntFieldUpdateOperationsInput | number
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableIntFieldUpdateOperationsInput | number | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssignmentCreateManyDsrInput = {
    id?: number
    shopId: number
    startDate: Date | string
    endDate?: Date | string | null
    status?: $Enums.AssignmentStatus
    teamName?: string | null
    role?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SalesRecordCreateManyDsrInput = {
    id?: number
    shopId: number
    saleDate: Date | string
    devicesSold?: number
    remarks?: string | null
    dataSource?: $Enums.DataSource
    externalId?: string | null
    verified?: boolean
    verifiedById?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransferRecordCreateManyDsrInput = {
    id?: number
    fromShopId: number
    toShopId: number
    transferDate: Date | string
    reason: $Enums.TransferReason
    reasonDetail?: string | null
    approvedById?: number | null
    effectivenessScore?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AssignmentUpdateWithoutDsrInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    teamName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type AssignmentUncheckedUpdateWithoutDsrInput = {
    id?: IntFieldUpdateOperationsInput | number
    shopId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    teamName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssignmentUncheckedUpdateManyWithoutDsrInput = {
    id?: IntFieldUpdateOperationsInput | number
    shopId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    teamName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalesRecordUpdateWithoutDsrInput = {
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shop?: ShopUpdateOneRequiredWithoutSalesRecordsNestedInput
    verifiedBy?: UserUpdateOneWithoutVerifiedSalesRecordsNestedInput
  }

  export type SalesRecordUncheckedUpdateWithoutDsrInput = {
    id?: IntFieldUpdateOperationsInput | number
    shopId?: IntFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    verifiedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SalesRecordUncheckedUpdateManyWithoutDsrInput = {
    id?: IntFieldUpdateOperationsInput | number
    shopId?: IntFieldUpdateOperationsInput | number
    saleDate?: DateTimeFieldUpdateOperationsInput | Date | string
    devicesSold?: IntFieldUpdateOperationsInput | number
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    dataSource?: EnumDataSourceFieldUpdateOperationsInput | $Enums.DataSource
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    verified?: BoolFieldUpdateOperationsInput | boolean
    verifiedById?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferRecordUpdateWithoutDsrInput = {
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fromShop?: ShopUpdateOneRequiredWithoutTransfersFromNestedInput
    toShop?: ShopUpdateOneRequiredWithoutTransfersToNestedInput
    approvedBy?: UserUpdateOneWithoutApprovedTransfersNestedInput
  }

  export type TransferRecordUncheckedUpdateWithoutDsrInput = {
    id?: IntFieldUpdateOperationsInput | number
    fromShopId?: IntFieldUpdateOperationsInput | number
    toShopId?: IntFieldUpdateOperationsInput | number
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableIntFieldUpdateOperationsInput | number | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransferRecordUncheckedUpdateManyWithoutDsrInput = {
    id?: IntFieldUpdateOperationsInput | number
    fromShopId?: IntFieldUpdateOperationsInput | number
    toShopId?: IntFieldUpdateOperationsInput | number
    transferDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: EnumTransferReasonFieldUpdateOperationsInput | $Enums.TransferReason
    reasonDetail?: NullableStringFieldUpdateOperationsInput | string | null
    approvedById?: NullableIntFieldUpdateOperationsInput | number | null
    effectivenessScore?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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