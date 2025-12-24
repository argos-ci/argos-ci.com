import {
  ChromiumIcon,
  FlaskConicalIcon,
  LinkIcon,
  MonitorSmartphoneIcon,
  MoonIcon,
  RefreshCcwIcon,
} from "lucide-react";

import { Chip } from "@/components/Chip";

export function TestContext() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Chip variant="primary" icon={ChromiumIcon} className="shadow-sm">
        Chrome
      </Chip>
      <Chip variant="warning" icon={RefreshCcwIcon} className="shadow-sm">
        Run 2/3
      </Chip>
      <Chip
        variant="primary"
        icon={MonitorSmartphoneIcon}
        className="shadow-sm"
      >
        1440x900
      </Chip>
      <Chip variant="primary" icon={MoonIcon} className="shadow-sm">
        Dark mode
      </Chip>
      <Chip variant="primary" icon={LinkIcon} className="shadow-sm">
        https://acme.com/checkout
      </Chip>
      <Chip variant="success" icon={FlaskConicalIcon} className="shadow-sm">
        checkout.spec.ts › Checkout flow
      </Chip>
    </div>
  );
}
