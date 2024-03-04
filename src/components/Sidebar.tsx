import { FC } from "react";
import styled from "styled-components";
import { Filter, SidebarList } from "layouts";
import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";

const Sidebar: FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const post = searchParams.get("vacancy_post");

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
          <div className="p-1">
            <button className="btn">
              <span className="material-symbols-rounded icon">menu</span>
            </button>
            <ul>
              <li>
                <NavLink to={{ pathname: "/search/vacancy", search: "?page=1" }} className={"btn"}>
                  <span className="material-symbols-rounded icon">trip</span>
                  <p className="btn-label">Jobs</p>
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
          </div>
          <div className="p-2">
            <NavLink to={"/login"} className="btn">
              <div className="account">
                <img src="" alt="" />
              </div>
            </NavLink>
          </div>
        </Left>
        <Right>
          <div className="header">
            <Logo to="/">Constant</Logo>
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
  height: 100%;
`;

const Logo = styled(Link)`
  font-size: 25px;
  font-family: var(--font-semiBold);
  color: var(--element-color);
  font-weight: 700;
`;

const Left = styled.div`
  min-width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

    .account {
      height: 60%;
      aspect-ratio: 1/1;
      border-radius: 10px;
      overflow: hidden;
      background: var(--element-color);

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
`;

const Right = styled.div`
  width: 100%;

  .header {
    height: 70px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: var(--border-style);
    width: 100%;
  }

  .content {
    height: 100vh;
  }
`;
