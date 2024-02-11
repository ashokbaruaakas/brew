import { showToast, Toast } from "@raycast/api";
import { brewUpgradeAll } from "./brew";
import { preferences } from "./preferences";
import { showActionToast, showFailureToast, wait } from "./utils";

export default async (): Promise<void> => {
  try {
    const abort = showActionToast({ title: "Upgrading formula & casks" + String.ellipsis, cancelable: true });
    await brewUpgradeAll(preferences.greedyUpgrades, abort);
    showToast(Toast.Style.Success, "Upgrade completed");
  } catch (err) {
    await showFailureToast("Upgrade failed", err as Error);
    // Wait around until user has had chance to click the Toast action.
    // Note this only works for "no view" commands (actions still break when popping a view based command).
    // See: https://raycastapp.slack.com/archives/C01E6LWGXJ8/p1642676284027700
    await wait(3000);
  }
};
