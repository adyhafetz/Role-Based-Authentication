import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function FlashMessage() {
    const page = usePage();

    useEffect(() => {
        if (page?.props?.message?.body) {
            toast(page.props.message.body, {
                position: "top-center",
                type: page.props.message.type,
            });
        }
    }, [page.props.message]);

    return <Toaster />;
}
