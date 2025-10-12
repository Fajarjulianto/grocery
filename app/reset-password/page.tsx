"use client";
import React, { JSX } from "react";
import { useSearchParams } from "next/navigation";

// Components
import Navigator from "@/components/utils/Navigator";

// API
import UserAPI from "@/lib/userAPI";

export default function Page(): JSX.Element {
  const params = useSearchParams();

  const token: string | null = params.get("token");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [verifyPassword, setVerifyPassword] = React.useState<string>("");

  const [message, setMessage] = React.useState<string>("");
  const [alert, setAlert] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    if (!token) {
      setMessage("Session expired");
      setAlert(true);
      return;
    }

    if (newPassword !== verifyPassword) {
      setMessage("Password does not match");
      setAlert(true);
      return;
    }

    const response: string | false = await UserAPI.changePassword(
      token,
      newPassword
    );
    console.log(response);

    if (!response) {
      setMessage("Server error, please try again later");
      setAlert(true);
      return;
    }

    setMessage(response);
    setSuccess(true);
    return;
  }
  return (
    <div className="w-full bg-secondary flex justify-center h-screen">
      <div className="bg-white w-screen md:max-w-2xl">
        <div className="w-full">
          <Navigator favorite={false} title="Change Password" />
        </div>
        <div className="h-full flex">
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            className="w-full flex flex-col justify-center items-center gap-3"
          >
            <p className="text-primary">Reset Password</p>
            <input
              onChange={(event) => {
                setNewPassword(event.target.value as string);
              }}
              type="password"
              className="border-2 border-solid border-primary w-60 md:w-[40%] h-10 rounded-md text-center outline-0"
              placeholder="New password"
            ></input>
            <input
              onChange={(event) => {
                setVerifyPassword(event.target.value as string);
              }}
              type="password"
              className="border-2 border-solid border-primary w-60 md:w-[40%] h-10 rounded-md text-center outline-0"
              placeholder="Verify your new password"
            ></input>
            {alert && <span className="text-red-600">{message}</span>}
            {success && <span className="text-primary">{message}</span>}
            <button
              type="submit"
              className="text-white bg-primary hover:bg-green-600 px-4 py-2 rounded-md"
            >
              Send Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
