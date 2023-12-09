import { Container, Logo, LogoSmall, StyledHeader } from "./styled";

export const HeaderDashboard = () => {
    return (
        <StyledHeader>
            <Container>
                <a href="/">
                    <LogoSmall src="./src/assets/logo-small.svg" alt="Metalink home" />
                    <Logo src="./src/assets/logo.svg" alt="Metalink home" />
                </a>
            </Container>
        </StyledHeader>
    );
}

