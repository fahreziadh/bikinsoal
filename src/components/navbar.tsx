import React from "react";
import { Card } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { GithubIcon, Twitter, Youtube } from "lucide-react";
import { getServerAuthSession } from "../server/auth";
import { Profile } from "./profile";
import { TokenCount } from "./token-count";

const Navbar = async () => {
  const session = await getServerAuthSession()
  return (
    <div className="container grid grid-cols-3 pt-3 justify-center items-center">
      <div>
        <TokenCount session={session} />
      </div>
      <CardLink />
      <ProfileSection />
    </div>
  );
};

const CardLink = () => {
  return (
    <Card className="flex w-max items-center gap-2  place-self-center px-2 py-1">
      <Link target="_blank" href="https://github.com/fahreziadh/bikinsoal.com">
        <Button size={"icon"} variant="ghost">
          <GithubIcon size={18} />
        </Button>
      </Link>
      <Link
        target="_blank"
        href="https://www.youtube.com/channel/UCOhmLMgnGXcQIzeQihpHiYw"
      >
        <Button size={"icon"} variant="ghost">
          <Youtube size={18} />
        </Button>
      </Link>
      <Link href="https://twitter.com/fahreziadhaa" target="_blank">
        <Button size={"icon"} variant="ghost">
          <Twitter size={18} />
        </Button>
      </Link>
    </Card>
  );
};

const ProfileSection = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="place-self-end self-center">
      {!session ? (
        <Link href={"/api/auth/signin"}>
          <Button size="sm" variant="outline">
            Login
          </Button>
        </Link>
      ) : null}

      {session ? <Profile /> : null}
    </div>
  );
};

export default Navbar;
