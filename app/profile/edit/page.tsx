import { JSX } from "react";

import { EditProfileForm } from "@/components/profile/edit/EditProfileForm";
import { EditProfileHeader } from "@/components/profile/edit/EditProfileHeader";

/**
 * The main page for editing a user's profile.
 * As a Server Component, it fetches initial data and composes client components
 * to handle interactivity.
 *
 * @returns {Promise<JSX.Element>} The rendered page component.
 */
export default async function EditProfilePage(): Promise<JSX.Element> {
  return (
    <div className="w-full bg-secondary flex justify-center font-inter min-h-screen">
      <div className="relative bg-white w-screen md:max-w-2xl mx-auto shadow-lg">
        <EditProfileHeader />
        <main className="p-4 sm:p-6">
          <EditProfileForm />
        </main>
      </div>
    </div>
  );
}
