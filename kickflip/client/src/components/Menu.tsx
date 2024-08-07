import { Loader2, LogOut, User } from "lucide-react";
import { ReactNode, useState } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import useAuth from "../hooks/useAuth";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const Menu = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);

  const [showProfile, setShowProfile] = useState(false);
  const [details, setDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const { name, email } = details;

  const { updateError, updateLoading, handleUpdate, handleLogout } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    handleUpdate({ name, email });
    setShowProfile(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-[#d6d6d6]">
          <DropdownMenuLabel className="text-[#7F1310]">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setShowProfile(true)}
            >
              <User className="mr-2 h-5 w-5" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={updateError ? showProfile === true : showProfile}
        onOpenChange={setShowProfile}
      >
        <DialogContent
          className="max-w-[425px] bg-[#d6d6d6]"
          onOpenAutoFocus={(e: Event) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-[#7f1310]">Edit Profile</DialogTitle>
            <DialogDescription className="text-black">
              Update your profile information here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            {updateError ? (
              <div className="items-center flex justify-center">
                <p className="text-[#7f1310]">Error, please try again</p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSave}
              disabled={updateLoading}
              className="bg-[#292929] hover:bg-[#7F1310] hover:bg-opacity-90 hover:scale-110 transition duration-300 text-white hover:text-black"
            >
              {updateLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Menu;
