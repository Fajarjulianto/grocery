"use client";
import React, { JSX } from "react";

// API
import UserAPI from "@/lib/userAPI";

// Components
import Navigator from "@/components/utils/Navigator";
import Alert from "@/components/utils/Alert";

export default function Page(): JSX.Element {
  const [email, setEmail] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [alert, setAlert] = React.useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    const response: string | false = await UserAPI.requestResetPassword(email);
    console.log(response);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setMessage("Invalid email");
      setAlert(true);
      return;
    }

    if (!response) {
      setMessage("Server error");
      setAlert(true);
      return;
    }

    setMessage(response);
    setAlert(true);
    return;
  }
  return (
    <>
      <Alert
        message={message}
        onConfirm={() => {
          setAlert(false);
        }}
        isOpen={alert}
      />
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
              <p className="text-primary">
                We will send you a verification email
              </p>
              <input
                onChange={(event) => {
                  setEmail(event.target.value as string);
                }}
                type="email"
                className="border-2 border-solid border-primary w-60 md:w-[40%] h-10 rounded-md text-center outline-0"
                placeholder="Enter your email address"
              ></input>
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
    </>
  );
}
