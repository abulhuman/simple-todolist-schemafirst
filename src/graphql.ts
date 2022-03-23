
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum TodoStatus {
    PENDING = "PENDING",
    DONE = "DONE"
}

export interface CreateAccountInput {
    email: string;
    password: string;
    ownerId: string;
}

export interface UpdateAccountInput {
    id: string;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export interface SigninInput {
    email: string;
    password: string;
}

export interface CreateTodoInput {
    title: string;
    ownerId: string;
}

export interface UpdateTodoInput {
    id: string;
    title?: Nullable<string>;
    status?: Nullable<TodoStatus>;
}

export interface CreateUserInput {
    fisrtName: string;
    middleName: string;
    lastName: string;
}

export interface UpdateUserInput {
    id: string;
    fisrtName?: Nullable<string>;
    middleName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export interface Account {
    id: string;
    created_at: Date;
    updated_at?: Nullable<Date>;
    email: string;
    password?: Nullable<string>;
    ownerId: string;
    owner: User;
}

export interface IQuery {
    getAllAccounts(): Nullable<Account>[] | Promise<Nullable<Account>[]>;
    getAccountById(id: string): Nullable<Account> | Promise<Nullable<Account>>;
    getAllTodos(): Nullable<Todo>[] | Promise<Nullable<Todo>[]>;
    getTodoById(id: string): Nullable<Todo> | Promise<Nullable<Todo>>;
    getAllUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
    getUserById(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createAccount(createAccountInput: CreateAccountInput): Account | Promise<Account>;
    updateAccount(updateAccountInput: UpdateAccountInput): Account | Promise<Account>;
    removeAccount(id: string): Nullable<Account> | Promise<Nullable<Account>>;
    signup(createAccountInput: CreateAccountInput): Account | Promise<Account>;
    signin(signinInput: SigninInput): Account | Promise<Account>;
    signout(): boolean | Promise<boolean>;
    createTodo(createTodoInput: CreateTodoInput): Todo | Promise<Todo>;
    updateTodo(updateTodoInput: UpdateTodoInput): Todo | Promise<Todo>;
    removeTodo(id: string): Nullable<Todo> | Promise<Nullable<Todo>>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface Todo {
    id: string;
    created_at: Date;
    updated_at?: Nullable<Date>;
    title: string;
    status: TodoStatus;
    ownerId?: Nullable<string>;
    owner: User;
}

export interface User {
    id: string;
    created_at: Date;
    updated_at?: Nullable<Date>;
    fisrtName: string;
    middleName: string;
    lastName: string;
    todos: Nullable<Todo>[];
    accounts: Nullable<Account>[];
}

type Nullable<T> = T | null;
