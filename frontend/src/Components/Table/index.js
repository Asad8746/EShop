import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Message } from "../Message";
import { CustomLoader } from "../Loader";
import { useDispatch } from "react-redux";
export const Table = ({
  loading,
  error,
  headers,
  data,
  onInitialRender,
  renderItem,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (loading && data.length === 0) {
      dispatch(onInitialRender());
    }
  }, []);
  if (loading) {
    return (
      <div className="content-loader-container">
        <CustomLoader height={30} width={30} />
      </div>
    );
  }
  return (
    <>
      {error ? (
        <div className="error-container">
          <Message message={error} variant="error" />
        </div>
      ) : (
        <table className="ui celled table">
          <thead>
            <tr>
              {headers.map((item, idx) => {
                return (
                  <th className="center aligned" key={`${item}/${idx}`}>
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>{data.map((item) => renderItem(item))}</tbody>
        </table>
      )}
    </>
  );
};

Table.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  onInitialRender: PropTypes.func.isRequired,
};
