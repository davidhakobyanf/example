type TypeUser = {
    name: string;
    age: number;
};

type TypeAddress = {
    city: string;
    country: string;
};

const user: TypeUser = {
    age: 24,
    name: 'Max',
};
const address: TypeAddress = {
    city: 'SPB',
    country: 'Russian',
};
let common: TypeUser & TypeAddress;
common = {
    ...user,
    ...address,
};

let array: string[];
array = ['1', '2'];

const numbers: ReadonlyArray<number> = [0, 1, 2, 3];

type TypeArray = [number, string, null];
const newArray: TypeArray = [1, 'example', null];

function getChannel(name: string) {
    return { name };
}

class Car {
    name: string;
    price: null;
    constructor(name: string, price: number) {
        this.name;
    }
}

function identity<T>(value: T): T {
    return value;
}
console.log(identity<number>(42)); // 42
console.log(identity<string>('Hello')); // "Hello"
console.log(identity<boolean>(true)); // true

interface Box<T> {
    content: T;
}
const stringBox: Box<string> = { content: 'sdasda' };
const numberBox: Box<number> = { content: 4578 };
console.log(stringBox.content); // "Hello"
console.log(numberBox.content); // 100

type Pair<T, U> = {
    first: T;
    second: U;
};
const pair1: Pair<string, number> = { first: 'asda', second: 45 };
const pair2: Pair<boolean, string> = { first: true, second: 'asda' };

//Readonly
//добавляет каждому члену обьекта модификатором readonly
//делая их тем самым доступными только для чтения

type Task = Readonly<{
    id: number;
    text: string;
    isCompleted?: boolean;
    completedDate?: Date | undefined;
}>;

const task: Task = {
    id: 1,
    text: 'Text',
};

function completeTask(task: Task) {
    task.isCompleted = true;
    task.completedDate = new Date();
}
completeTask(task);

//Partial
//сделать все поля обьекта опциональными
type Task1 = {
    id: number;
    text: string;
    isCompleted?: boolean;
    completedDate?: Date | undefined;
};
function update(task: Task1, patch: Partial<Task>): Task {
    return {
        ...task,
        ...patch,
    };
}
update(task, { text: 'asd' });

//Required
//сделать все поля обьекта обязательными
// type Task2 = Required<{
//     id: number;
//     text: string;
//     isCompleted?: boolean;
//     completedDate?: Date | undefined;
// }>;
type Task2 = {
    id: number;
    text: string;
    isCompleted?: boolean;
    completedDate?: Date | undefined;
};
const task2: Task2 = {
    id: 1,
    text: 'Text',
};
function getCompleted(tasks: Task[]) {
    return tasks.filter((t) => t.isCompleted && t.completedDate) as Required<Task2>[];
}
const tasks = getCompleted([task2]);
tasks[0].isCompleted;

//Pick
//Отфильтровать обьектный тип добавляя
type UserSchemaType = {
    username: string;
    email: string;
    bio: string;
    image: string;
    hash: string;
    salt: string;
    id: number;
};

type PublicUserFields = Pick<UserSchemaType, 'username' | 'email' | 'bio' | 'image'>;

// Omit
//Отфильтровать обьектный тип удаляя
type PublicUserFields1 = Omit<UserSchemaType, 'hash' | 'salt'>;

//Record<K, T>
//определить поля в обьекте
type Obj = Record<string, string>;

type O = Record<'A' | 'B' | 'C', string>;

type ThemeParams = {
    fontSize: number;
    color: string;
};

type Theme = 'light' | 'dark';

type AppTheme = Record<Theme, ThemeParams>;

const t: AppTheme = {
    light: {
        fontSize: 20,
        color: 'red',
    },
    dark: {
        fontSize: 24,
        color: 'black',
    },
};

//Exclude<T, U>
//исключает из первого типа признаки присушие второму
type UserSchemaType1 = {
    username: string;
    email: string;
    bio: string;
    image: string;
    id: number;
    hash: string;
    salt: string;
};
type PublicFields = Exclude<keyof UserSchemaType1, 'hash' | 'salt'>;

//Extract<T, U>
//обшие для двух типов признаки

type Intersection = Extract<'id' | 'name', 'name'>;
type Task3 = {
    id: number;
    text: string;
    isCompleted?: boolean;
    completedDate?: Date | undefined;
};

type UserSchemaType3 = {
    username: string;
    email: string;
    bio: string;
    image: string;
    hash: string;
    salt: string;
    id: number;
};

type I = Extract<keyof Task, keyof UserSchemaType3>;

//NonNullable
//удаляет типы null и undefined
type Task4 = {
    id: number;
    text: string;
    isCompleted?: boolean;
    completedDate?: Date | undefined;
};

function getTaskDate(date: Task['completedDate']): NonNullable<Task['completedDate']> {
    if (!date) {
        return new Date();
    }
    return date;
}

const task4: Task4 = {
    id: 0,
    text: 'Text',
};
const r = getTaskDate(task.completedDate);

//Return Type
//тип возможного значения из функции

function getInt(n: string) {
    return parseInt(n);
}
type R = ReturnType<typeof getInt>;
function createTask() {
    return{(
        id:1,
        text:"Text"
    )}
}
type CreateTaskResult = ReturnType<typeof createTask>

//Parameters
//получить тип картежа аргументов функции

function getInt2(n:string) {
    return parseInt(n);
}
type Input = Parameters<typeof getInt>

//ConstructorParameters
//позволяет получить тип данных из аргументов конструктора

class Person {
    constructor(
        public name:string,
        public surname:string,
        public age:number
    ) {}
}

type Input = ConstructorParameters<typeof Person>

//Awaited<T>
//выполняет развертывания промисов 
declare function fetch(): Promise<string>

type FetchResult = Awaited<ReturnType<typeof fetch>>

//Uppercase | LowerCase | Capitalize | Uncapitalize
type Name = Uppercase<'name'>

type User = typeof user4;

type WithGetters<T extends string> = Record<`get${T}`,() => string>
const user4 = {
    name:"John",
    age:40
}

declare function createGetters(u:User) User & WithGetters<keyof User>

const userWithGetters = createGetters(user4)

userWithGetters.name()
userWithGetters.getAge()