import { Db, ObjectId } from "mongodb";
import { getMongoClient } from "../config";
import { hashPass } from "../utils/bcrypt";
import { z } from "zod";

//Makes a user model type
export type UserModel = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  pfpUrl: string | null;
  password: string;
};

export type UserInputModel = {
  name: string;
  username: string;
  email: string;
  pfpUrl: string | null;
  password: string;
};

//Makes a user model for INPUTS
export type UserModelInput = Omit<UserModel, "_id">;

const dbName = process.env.MONGODB_NAME;

export const getDb = async () => {
  const client = await getMongoClient();
  const db: Db = client.db(dbName);
  return db;
};

export const getUsers = async () => {
  const userCollection = (await getDb()).collection("users");
  const users = await userCollection.find().project({ password: 0 }).toArray();
  return users;
};

export const createUser = async (user: UserInputModel) => {
  const userCollection = (await getDb()).collection("users");
  const findUsername = await userCollection.findOne({
    username: user.username,
  });
  const findEmail = await userCollection.findOne({ email: user.email });
  if (findEmail) throw new Error(`Email is already taken`);
  if (findUsername) throw new Error(`Username is already taken`);

  user.password = hashPass(user.password);
  const newUser = await userCollection.insertOne(user);
  return newUser;
};

export const findUser = async (usernameEmail: string) => {
  const userCollection = (await getDb()).collection("users");
  const findUser = await userCollection.findOne({
    $or: [{ username: usernameEmail }, { email: usernameEmail }],
  });
  return findUser as UserModel;
};
