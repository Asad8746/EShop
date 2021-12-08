import { Container } from "../../Components";
import { ReactComponent as NotFoundSvg } from "../../images/404.svg";
import "./index.style.scss";
export const NotFound = () => {
  return (
    <Container>
      <div className="not-found">
        <NotFoundSvg className="not-found__svg" />
        <p className="not-found__message">Oops Page Not Found</p>
      </div>
    </Container>
  );
};
