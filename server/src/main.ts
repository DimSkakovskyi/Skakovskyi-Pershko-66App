import 'reflect-metadata';

interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ITask {
    id: number;
    userId: number;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    createdAt: Date;
    updatedAt: Date;
}

interface IHabit {
    id: number;
    userId: number;
    title: string;
    description: string;
    status: 'active' | 'paused' | 'completed';
    currentStreak: number;
    maxStreak: number;
    createdAt: Date;
    updatedAt: Date;
}

interface IHabitProgress {
    id: number;
    habitId: number;
    progressDate: Date;
    status: boolean;
    createdAt: Date;
}

interface IPomodoroSession {
    id: number;
    userId: number;
    workDuration: string;
    breakDuration: string;
    numberOfStreaks: number;
    sessionDate: Date;
}