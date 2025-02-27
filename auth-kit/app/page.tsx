"use client";

import { useUserContext } from "@/context/UserContext";
import useRedirect from "@/hooks/useuserRedirect";
import { useState } from "react";

export default function Home() {
  useRedirect("/login");
  const { logoutUser, user, handleUserInput, userState, updateUser } =
    useUserContext();
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
        <h1 className="text-[2rem] font-bold">
          Welcome <span className="text-red-500">{name}</span>
        </h1>
        <div className="flex items-center gap-5">
          <img
            src={photo}
            alt={name}
            className="w-[40px] h-[40px] rounded-full"
          />
          {!isVerified ? (
            <button className="px-4 py-2 font-bold bg-black text-white rounded-md">
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
        <p>{bio}</p>
        <h1>
          <button
            onClick={myToggle}
            className="px-4 py-2 font-bold bg-red-600 text-white rounded-md"
          >
            Update Bio
          </button>
          {isOpen && (
            <form className="max-w-[400px] w-full">
              <div className="flex flex-col">
                <label htmlFor="bio" className="mb1 txt-[#999]">
                  Bio
                </label>
                <textarea
                  name=""
                  id=""
                  cols={8}
                  rows={4}
                  className="border max-h-[150px] rounded-lg border-black"
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
            </form>
          )}
        </h1>
      </section>
    </main>
  );
}
