import { Container, Logo, LogoSmall, StyledHeader } from "./styled";

export const HeaderDashboard = () => {
    return (
        <StyledHeader>
            <Container>
                <a href="/">
                    <LogoSmall src="./src/assets/logo-small.svg" alt="Meowlink home" />
                    <Logo src="./src/assets/logo.svg" alt="Meowlink home" />
                </a>
            </Container>
        </StyledHeader>
    );
}

