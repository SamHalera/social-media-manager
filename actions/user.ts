"use server";
import prisma from "@/db";
import { SHA256 } from "crypto-js";
import uid2 from "uid2";
import encBase64 from "crypto-js/enc-base64";
export const registerUser = async (values: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}) => {
  try {
    const { email, password, firstname, lastname } = values;
    console.log(values);

    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(64);
    const dataToPersist = {
      email,
      firstname,
      lastname,
      salt,
      hash,
      token,
    };

    const newUser = await prisma.user.create({
      data: dataToPersist,
    });
    if (!newUser) {
      return {
        error:
          "Oups! Something went wrong! Sorry for that. Pleas, try again...",
      };
    }
    return {
      success: `Hi ${newUser.firstname}! Your account has been created!`,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Oups! Something went wrong! Sorry for that. Pleas, try again...",
    };
  }
};
