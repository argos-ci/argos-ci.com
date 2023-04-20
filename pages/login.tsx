/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Head } from "@/components/Head";
import { Link } from "@/components/Link";
import { GithubWhite } from "@/components/icons/GithubWhite";

export default function Pricing() {
  return (
    <div className="flex flex-col gap-[176px] md:gap-[240px] ">
      <Head title="Argos - Login" />

      <Container className="flex flex-col text-center items-center py-20 h-[500px] ">
        <div className="bg-neutral-300 p-10 rounded border border-border bg-gradient-to-br from-slate-900 via-slate-800 to-black">
          <h1 className="text-3xl mb-10 whitespace-nowrap">Log in to Argos</h1>
          <Button color="black" className="w-full">
            {(buttonProps) => (
              <Link
                {...buttonProps}
                href="https://github.com/login/oauth/authorize?scope=user:email&client_id=Iv1.d1a5403395ac817e"
              >
                <div className="flex justify-center items-center w-full">
                  <GithubWhite className="w-4 h-4 shrink-0 mr-2" />
                  Connect with GitHub
                </div>
              </Link>
            )}
          </Button>
        </div>
      </Container>
    </div>
  );
}
