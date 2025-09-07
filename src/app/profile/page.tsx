import { redirect } from "next/navigation";

const ProfilePage = () => {
  redirect("/settings/account");
};

export default ProfilePage;
