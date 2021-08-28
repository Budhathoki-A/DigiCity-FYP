import styled from "styled-components";
import { Button } from "./button";


const TWrapper = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  margin: ${(props) => (props.margin ? `${props.margin}` : "auto")};
  
`;
const T = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const THead = styled.thead`
  & > tr > th {
    text-align: center;
    border-bottom: 0.75px solid #95a3b3;
    padding: 0px 0px 17px 0px;
    text-transform: capitalize;
    min-width: 90px;
  }
`;

export const TRow = styled.tr`
  & > td {
    padding: 17px 0px;
    text-align: center;
    min-width: 90px;

    & > * {
      vertical-align: middle;
    }
  }
`;

const TFoot = styled.tfoot`
  text-align: center;

  & tr > td {
    padding-top: 40px;
  }
`;

export const TInfo = ({ totalColumn, children }) => (
  <TRow style={{ textAlign: "center" }}>
    <td colSpan={totalColumn}>{children}</td>
  </TRow>
);

export default function Table({
  showLoadMore = false,
  headers,
  children,
  onLoadMoreClick,
  loadMoreLoading = false,
  margin = null,
  onLoadAllClick,
  canLoadAll,
}) {
  return (
    <TWrapper margin={margin}>
      <T>
        {showLoadMore && (
          <TFoot>
            <tr>
              <td colSpan={headers.length}>
                <Button
                  buttonType="primary"
                  onClick={onLoadMoreClick}
                  disabled={loadMoreLoading}
                >
                  {loadMoreLoading ? "loading" : "Load more"}
                </Button>
              </td>
            </tr>
          </TFoot>
        )}
        <THead>
          <tr>
            {headers.map((t, i) => (
              <th key={i}>{t}</th>
            ))}
          </tr>
        </THead>
        <tbody>{children}</tbody>
      </T>
    </TWrapper>
  );
}
