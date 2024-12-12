import React from "react";

import SettingsContent from "@/components/hooks/admin/settings/SettingsContent";

import { Toaster } from "react-hot-toast";

export async function generateMetadata() {
    return {
        title: `Settings Management`,
        description: `Manage settings section content and settings`,
    };
}

export default function Settings() {
    return (
        <>
            <Toaster />
            <SettingsContent />
        </>
    )
}
