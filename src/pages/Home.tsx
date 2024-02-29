import backend from "backend";
import { FC } from "react";
import styled from "styled-components";
import { Searchbar } from "layouts";
import { formData } from "../constant/formData";
import { home } from "constant";

const Home: FC = () => {
  const { data } = backend.home();
  const content = home();

  return (
    <Container>
      <Content>
        <Searchbar />
        <main>
          <section className="s-1">
            <ul>
              {data.categories &&
                data.categories?.map((e: any) => {
                  return (
                    <li key={e.name}>
                      <div className="content">
                        <h3>{formData.specialization.get(e.name)}</h3>
                        <div>{content.specialization(e)}</div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>
        </main>
      </Content>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 50px 20px;
`;
const Content = styled.div`
  .s-1 {
    margin-top: 30px;

    ul {
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-auto-rows: auto;
      gap: 10px;

      li {
        cursor: pointer;

        .content {
          height: 100%;
          width: 100%;
          background: var(--element-background);
          border: 1px solid var(--border-color);
          padding: 15px;
          border-radius: 5px;
          color: var(--text-color);
          font-size: 14px;

          h3 {
            color: var(--title-color);
            font-family: var(--font-semiBold);
            font-size: 16px;
          }
        }
      }
    }
  }
`;
