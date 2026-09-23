"use server";

type FormState = {
  message: string;
};

export async function Login(
  previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(`Data received: ${email} | ${password}`);

  if (!email || !password) {
    return {
      message: "Email and Password are required.",
    };
  }

  return {
    message: `Login received for ${email}`,
  };
}

export async function Register(
  previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const user = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(`Data received: ${user} | ${email} | ${password}`);

  if (!user || !email || !password) {
    return {
      message: "Data required to register missing.",
    };
  }

  return {
    message: `Welcome, ${user}!`,
  };
}
