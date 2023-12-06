"use client";
import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  async function login(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const user = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (user?.error) {
        console.log(user);
        return;
      }
      router.replace("/admin");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main className="flex justify-center items-center align-center w-screen h-screen bg-slate-900">
      <form
        onSubmit={login}
        className="flex text-white flex-col w-1/5 border-2 items-center gap-10 bg-slate-800 p-10 rounded-md">
        <h1 className="text-4xl">Sign in</h1>
        <div className="flex flex-col gap-5 w-4/5">
          <div className="flex flex-col gap-2">
            <span>Email</span>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="text-black"></input>
          </div>
          <div className="flex flex-col gap-2">
            <span>Password</span>
            <input
              onChange={(e) => setPass(e.target.value)}
              className="text-black"></input>
          </div>
          <button className="bg-green-400 rounded-sm mt-5">Login</button>
        </div>
      </form>
    </main>
  );
}
