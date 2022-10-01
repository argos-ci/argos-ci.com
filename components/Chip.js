import { x } from "@xstyled/styled-components";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export function Chip({ children, link, ...props }) {
  return (
    <x.div
      backgroundColor="purple-50"
      color="purple-600"
      display="flex"
      alignItems="center"
      gap={1}
      borderRadius={20}
      w="fit-content"
      py={2}
      px={4}
      fontSize="sm"
      fontWeight="500"
      {...props}
    >
      {children}
      {link ? <x.div as={ChevronRightIcon} w={4} color="purple-400" /> : null}
    </x.div>
  );
}
