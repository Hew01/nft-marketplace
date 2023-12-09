import { HeaderDashboard } from "@/components/Header/HeaderDashboard";
import { HeroDashboard } from "@/components/Hero/HeroDashboard";
import ModalRoot from "@/components/PopupModal/ModalRoot";

export const Dashboard = () => {
    return (
        <>
            <HeaderDashboard/>
            <HeroDashboard/>
            <ModalRoot />
        </>
    );
}