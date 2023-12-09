import { ApproveModal } from "@/components/PopupModal/ApproveModal";
import { BuyTokenModal } from "@/components/PopupModal/BuyTokenModal";
import { ConfirmDisconnectModal } from "@/components/PopupModal/ConfirmDisconnectWallet";
import { CreateNftModal } from "@/components/PopupModal/CreateNFTModal";
import { DisplayWallets } from "@/components/PopupModal/DisplayWallets";
import { SellTokenModal } from "@/components/PopupModal/SellTokenModal";
import { SetPriceModal } from "@/components/PopupModal/SetPriceModal";

export const PopupModals: { [key: string]: React.ComponentType<any> } = {
    'CREATE_NFT': CreateNftModal,
    'APPROVE': ApproveModal,
    'DISPLAY_WALLET': DisplayWallets,
    'SET_PRICE': SetPriceModal,
    'SELL': SellTokenModal,
    'BUY': BuyTokenModal,
    'CONFIRM_DISCONNECT': ConfirmDisconnectModal,
    // Other modals...
  };