"use server";

export async function Login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(`Data received: ${email} | ${password}`);
}

export async function Register(formData: FormData) {
  const user = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(`Data received: ${user} | ${email} | ${password}`);
}
