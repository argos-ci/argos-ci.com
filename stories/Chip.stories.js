import { x } from "@xstyled/styled-components";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { Chip } from "@/components/Chip";

const main = {
  title: "Chip",
};

export default main;

export const Primary = () => (
  <x.div display="flex" flexDirection="column" gap={3}>
    <Chip>Chip</Chip>
    <Chip>
      <x.div as={SparklesIcon} w={4} />
      Chip with icon
    </Chip>
    <Chip link>Chip with 'link' prop</Chip>
  </x.div>
);
