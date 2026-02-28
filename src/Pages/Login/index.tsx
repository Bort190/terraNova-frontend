import {Button} from "@/components/ui/button.tsx";

type LoginPagePropsType = {
    login?: (value: boolean) => void
}

export const LoginPage = ({login}: LoginPagePropsType) => {
    return (
        <div>
            loginPage
            <Button onClick={() => login ? login(true) : console.log("nothing") }>Login</Button>
        </div>
    );
};
