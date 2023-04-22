import { GithubWhite } from "@/components/icons/GithubWhite";
import { Button, ButtonProps } from "@/components/Button";
import { Link } from "@/components/Link";
import clsx from "clsx";

type GithubButtonProps = ButtonProps & {
  href: string;
};

export const githubLoginUrlBaseUrl =
  "https://github.com/login/oauth/authorize?scope=user:email&client_id=Iv1.d1a5403395ac817e";

export const GithubLinkButton: React.FC<GithubButtonProps> = ({
  href,
  className,
  ...props
}) => {
  return (
    <Button color="black" className={clsx("w-full", className)} {...props}>
      {(buttonProps) => (
        <Link {...buttonProps} href={href}>
          <div className="w-full flex justify-center items-center py-1 gap-2">
            <GithubWhite className="w-4 h-4 shrink-0" />
            Connect with GitHub
          </div>
        </Link>
      )}
    </Button>
  );
};

export const GithubButton: React.FC<ButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <Button
      color="black"
      className={clsx(
        "w-full flex justify-center items-center py-3 gap-2",
        className
      )}
      {...props}
    >
      <GithubWhite className="w-4 h-4 shrink-0" />
      Connect with GitHub
    </Button>
  );
};
