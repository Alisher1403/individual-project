import { FC } from "react";
import styled from "styled-components";
import { Filter, SidebarList } from "layouts";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";

const Sidebar: FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const post = searchParams.get("post");

  const pageTitle = () => {
    if (location.pathname === "/search/vacancy") {
      if (post) {
        return "Jobs";
      } else {
        return "Filters";
      }
    }
  };

  function getContent() {
    if (!post && location.pathname.includes("search")) {
      return <Filter />;
    }
    if (post) {
      return <SidebarList />;
    }

    return <div></div>;
  }

  return (
    <Container>
      <Content>
        <Left>
          <button className="btn">
            <span className="material-symbols-rounded icon">menu</span>
          </button>
          <ul>
            <li>
              <NavLink to={{ pathname: "/search/vacancy", search: "?page=1" }} className={"btn"}>
                <span className="material-symbols-rounded icon">trip</span>
                <p className="btn-label">Vacancies</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/"} className="btn">
                <span className="material-symbols-rounded icon">data_loss_prevention</span>
                <p className="btn-label">CV's</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/"} className="btn">
                <span className="material-symbols-rounded icon">group</span>
                <p className="btn-label">People</p>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/"} className="btn">
                <span className="material-symbols-rounded icon">trip</span>
                <p className="btn-label">Jobs</p>
              </NavLink>
            </li>
          </ul>
        </Left>
        <Right>
          <div className="header">
            <h2 className="title">{pageTitle()}</h2>
          </div>
          <div className="content">
            {/* <Filter /> */}
            {getContent()}
          </div>
        </Right>
      </Content>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  border-right: var(--border-style);
  background: var(--element-background);
`;
const Content = styled.div`
  display: flex;
  width: 100%;
`;

const Left = styled.div`
  min-width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: var(--border-style);

  ul {
    width: 100%;
  }

  .btn {
    width: 100%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    background: transparent;
    transition: 0.1s;
    display: flex;
    flex-direction: column;
    color: var(--icon-color);

    &.active {
      color: var(--element-color);

      .icon {
        color: var(--element-color);
      }
    }

    &:hover {
      background: #e4e4e4;
    }

    .icon {
      font-size: 28px;
      color: var(--icon-color);
    }
  }
`;

const Right = styled.div`
  width: 100%;

  .header {
    padding: 22px 20px;
    border-bottom: var(--border-style);
    width: 100%;

    .title {
      font-size: 20px;
    }
  }

  .content {
    height: 100vh;
  }
`;
