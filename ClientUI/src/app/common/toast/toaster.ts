import { OverlayToaster } from "@blueprintjs/core";

const toaster = OverlayToaster.create({
    position: "top-right",
});

export const toast = {
    error: (message: string) =>
        toaster.show({
            message: message,
            intent: "danger",
            icon: "error",
            timeout: 2000,
        }),
};
