/* eslint-disable react/no-unescaped-entities */
import * as Ariakit from "@ariakit/react";
import { Head } from "@/components/Head";
import { useRouter } from "next/router";
import clsx from "clsx";
import { TextLink } from "@/components/Link";
import { GithubButton, githubLoginUrlBaseUrl } from "@/components/GithubButton";
import {
  PageCard,
  PageCardBody,
  PageCardContainer,
  PageCardFooter,
  PageCardHeader,
  PageCardTitle,
} from "@/components/PageCard";
import { FormTextInput } from "@/components/FormTextInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { RadioField } from "@/components/RadioField";
import { base64Encode } from "@/lib/utils/encoding";

type Inputs = {
  projectType: string;
  name?: string;
};

export default function Pricing() {
  const router = useRouter();
  const projectTypeRadio = Ariakit.useRadioStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm<Inputs>({
    defaultValues: { projectType: "", name: "" },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const githubConnectUrl = new URL(githubLoginUrlBaseUrl);
    const state = base64Encode({
      projectType: data.projectType,
      name: data.name,
    });
    githubConnectUrl.searchParams.set("state", state);
    router.push(githubConnectUrl.href);
  };

  const projectType = watch("projectType");
  const hobbyProjectType = projectType === "hobby";

  return (
    <>
      <Head title="Argos - Sign up" />
      <PageCardContainer>
        <PageCard>
          <PageCardHeader>
            <PageCardTitle>
              Create your
              <br />
              Argos Account
            </PageCardTitle>
          </PageCardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <PageCardBody>
              <Ariakit.RadioGroup
                store={projectTypeRadio}
                className="flex flex-col justify-start w-full gap-6"
                onChange={() => resetField("name")}
              >
                <RadioField
                  label="Hobby"
                  value="hobby"
                  {...register("projectType", { required: true })}
                >
                  I'm working on personal projects
                </RadioField>
                <RadioField
                  label="Pro"
                  value="pro"
                  {...register("projectType", { required: true })}
                >
                  I'm working on a team or my project is on a Github
                  organization
                </RadioField>
              </Ariakit.RadioGroup>

              <div
                className={clsx(
                  "transition text-left",
                  !projectType && "opacity-0"
                )}
              >
                <div className="h-24">
                  <FormTextInput
                    label={hobbyProjectType ? "Your Name" : "Team Name"}
                    autoFocus
                    error={errors.name}
                    {...register("name", {
                      required: {
                        value: true,
                        message: hobbyProjectType
                          ? "Your name is required"
                          : "Team name is required",
                      },
                    })}
                  />
                </div>

                <div
                  className={clsx(
                    "font-medium text-sm mt-6",
                    hobbyProjectType && "opacity-0"
                  )}
                >
                  Continuing will start a 14-day Pro plan trial.
                </div>

                <GithubButton type="submit" className="mt-2" />
              </div>
            </PageCardBody>
          </form>

          <PageCardFooter>
            Have a complex company use case?{" "}
            <TextLink href="mailto:contact@argos-ci.com">
              Get enterprise-grade assistance
            </TextLink>
          </PageCardFooter>
        </PageCard>
      </PageCardContainer>
    </>
  );
}
