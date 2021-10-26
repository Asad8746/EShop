import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { setWebAdmin } from "../../actions";
import domains from "../../domains";
import { formatDate } from "../../utils";
import "./index.style.scss";

export const UserItem = ({ user }) => {
  let initialValue = user.isAdmin ? "yes" : "no";
  const history = useHistory();
  const [adminStatus, setAdminStatus] = useState(initialValue);

  useEffect(() => {
    if (typeof adminStatus !== "string") {
      setWebAdmin(user._id, adminStatus, (updatedAdminStatus) => {
        if (updatedAdminStatus !== adminStatus) {
          setAdminStatus(updatedAdminStatus);
        }
      });
    }
  }, [adminStatus]);
  return (
    <tr key={user._id}>
      <td className="center aligned admin__table-item admin__table-item--bold">
        {user.name}
      </td>
      <td className="center aligned admin__table-item admin__table-item--bold">
        {formatDate(user.createdAt)}
      </td>
      <td className="center aligned  admin__table-item--bold">{user.email}</td>

      <td className="center aligned">
        <div className="ui fitted slider checkbox">
          <input
            type="checkbox"
            checked={adminStatus === true || adminStatus === "yes" || false}
            onChange={(e) => {
              setAdminStatus(e.target.checked);
            }}
          />
          <label></label>
        </div>
      </td>
      <td className="center aligned">
        <div className="users-iconContainer">
          <i
            className="trash icon"
            onClick={() => {
              history.push(`${domains.deleteUser}/${user._id}`);
            }}
          ></i>
        </div>
      </td>
    </tr>
  );
};
UserItem.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    createdAt: PropTypes.string,
    email: PropTypes.string,
    isAdmin: PropTypes.bool,
  }),
};
