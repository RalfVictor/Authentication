"use client";

import { useUserContext } from "@/context/UserContext";
import useRedirect from "@/hooks/useuserRedirect";
import { useState } from "react";
import ChangePasswordForm from "./components/auth/changepasswordform/ChangePasswordForm";

export default function Home() {
  useRedirect("/login");
  const {
    logoutUser,
    user,
    handleUserInput,
    userState,
    updateUser,
    emailVerification,
    deleteUser,
    allUsers
  } = useUserContext();
  const { name, photo, isVerified, bio } = user;
  const [isOpen, setIsOpen] = useState(false);
  const myToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="py-[2rem] mx-[10rem]">
      <header
        className="flex
     justify-between"
      >
        <h1 className="text-[2rem]  font-bold">
          Welcome <span className="text-red-500">{name}</span>
        </h1>
        <div className="flex items-center gap-5">
          <img
            src={photo}
            alt={name}
            className="w-[40px] h-[40px] rounded-full"
          />
          {!isVerified ? (
            <button
              onClick={emailVerification}
              className="px-4 py-2 font-bold bg-black text-white rounded-md"
            >
              Verify Now
            </button>
          ) : null}
          <button
            onClick={logoutUser}
            className="px-4 py-2 font-bold bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </header>
      <section>
        <p className="text-[20px] ">{bio}</p>
        <h1>
          <button
            onClick={myToggle}
            className="px-4 py-2 font-bold bg-red-600 text-white rounded-md"
          >
            Update Bio
          </button>
          {isOpen && (
            <div className="max-w-[400px] w-full">
              <div className="flex flex-col">
                <label htmlFor="bio" className="mb1 txt-[#999]">
                  Bio
                </label>
                <textarea
                  name=""
                  id=""
                  cols={8}
                  rows={4}
                  className="border max-h-[150px]  rounded-lg border-black"
                  defaultValue={bio}
                  onChange={(e) => handleUserInput("bio")(e)}
                ></textarea>
              </div>
              <button
                onClick={(e) =>
                  updateUser(e, { bio: userState.bio, name: name })
                }
                type="submit"
                className="mt-2 px-4 py-2 font-bold bg-blue-600 text-white rounded-md"
              >
                Confirm Update
              </button>
            </div>
          )}
        </h1>
      </section>
      <div className="flex gap-6">
        <div className="flex-1">
          <ChangePasswordForm />
        </div>
        <div className="flex-1">
          {user.role === "admin" && (
            <ul>
              {allUsers.map(
                (user: any, i: number) =>
                  user.role !== "admin" && (
                    <li
                      key={i}
                      className="mb-2 px-2 py-3 border grid grid-cols-4 items-center gap-8 rounded-md"
                    >
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-[40px]  h-[40px] rounded-full"
                      />
                      <p>{user.name}</p>
                      <p>{user.bio}</p>
                      <button
                        className="bg-red-500 text-white p-2 rounded-md"
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        Delete User
                      </button>
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
