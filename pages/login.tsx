/* eslint-disable react/no-unescaped-entities */
import { Head } from "@/components/Head";
import { TextLink } from "@/components/Link";
import {
  GithubLinkButton,
  githubLoginUrlBaseUrl,
} from "@/components/GithubButton";
import {
  PageCard,
  PageCardBody,
  PageCardContainer,
  PageCardFooter,
  PageCardHeader,
  PageCardTitle,
} from "@/components/PageCard";

export default function Pricing() {
  return (
    <>
      <Head title="Argos - Login" />

      <PageCardContainer>
        <PageCard>
          <PageCardHeader>
            <PageCardTitle>Log in to Argos</PageCardTitle>
          </PageCardHeader>
          <PageCardBody>
            <GithubLinkButton href={githubLoginUrlBaseUrl} />
          </PageCardBody>
          <PageCardFooter>
            Don't have account? <TextLink href="/signup">Sign Up</TextLink>
          </PageCardFooter>
        </PageCard>
      </PageCardContainer>
    </>
  );
}
