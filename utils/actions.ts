"use server";

import { redirect } from "next/navigation";
import { prisma } from "./prisma-client";
import { z } from "zod";
import { put } from "@vercel/blob";
import { PostStateProps, UserStateProps } from "./definitions";

const UserSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1),
  lastName: z.string({ required_error: "Last name is required" }).trim().min(1),
  email: z
    .string({ required_error: "Email must not be empty" })
    .email({ message: "Invalid email address" })
    .trim()
    .min(5),
  password: z.string().trim().optional(),
});

const FormSchema = z.object({
  email: z
    .string({ required_error: "Email is required to publish the post" })
    .email({ message: "Invalid email address" })
    .min(5),
  title: z.string({ required_error: "Title is required" }).min(1),
  description: z
    .string({ required_error: "Provide description to clarify your post" })
    .min(1),
  details: z
    .string({ required_error: "Provide specific details about your post" })
    .min(1),
  thumbnail: z.coerce.string().optional(),
});

export async function retrieveUsers() {
  try {
    const result = await prisma.post.findMany();
    console.log("Successfully retrieved users");
    return result;
  } catch (err) {
    console.log("Failed to fetch users data");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

export async function createUser(
  prevState: UserStateProps,
  formData: FormData
) {
  const validatedFields = UserSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Unable to validate fields!",
    };
  }

  const { firstName, lastName, email, password } = validatedFields.data;

  try {
    const result = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });
    console.log("Successfully created the post");
    console.dir(result, { depth: null });
  } catch (err) {
    console.error(err);
    return {
      message: "Failed to create user",
    };
  } finally {
    await prisma.$disconnect();
  }

  redirect("/post/create");
}

export async function createPost(prev: PostStateProps, formData: FormData) {
  const imageFile = formData.get("fileUpload") as File;
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
  });

  const validatedFields = FormSchema.safeParse({
    email: formData.get("email"),
    title: formData.get("title"),
    description: formData.get("description"),
    details: formData.get("details"),
    thumbnail: blob.url,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Unable to validate!",
    };
  }

  const { email, title, description, details, thumbnail } =
    validatedFields.data;

  try {
    const createdPost = await prisma.post.create({
      data: {
        title,
        description,
        details,
        thumbnail,
        user: {
          connect: {
            email,
          },
        },
      },
    });
    console.log("Successfully created the post...!");
    console.dir(createdPost, { depth: null });
  } catch (err) {
    console.log("Failed to create the post...!");
    console.error(err);
    return {
      message: "Failed to create post",
    };
  } finally {
    console.log("Done...!");
    await prisma.$disconnect();
  }

  redirect("/");
}
