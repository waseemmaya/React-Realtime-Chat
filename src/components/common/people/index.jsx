import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import MessageBox from "../messageBox";
import GetDate from "../../../common/getDate";

const People = props => {
  if (!props.users) return false;
  const { users } = props;
  const sortUsers = users.sort((a, b) => (a.isLogin ? -1 : 1));
  return (
    <React.Fragment>
      {sortUsers.map((user, i) => {
        if (user.uid === props.currentUserUid) {
          return false;
        }
        let date = "";
        if (!user.isLogin) {
          date = GetDate(user.lastLogin);
        }
        return (
          <div className="item" key={i}>
            <MessageBox
              status={true}
              name={user.fullname}
              image={user.image}
              date={date}
              online={user.isLogin}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
};
//
// export default People;

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.firestore.ordered.users,
    currentUserUid: state.firebase.auth.uid
  };
};

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  firestoreConnect([{ collection: "users" }])
)(People);
